import {
  Form,
  Toast,
  Button,
  Tag,
  Empty,
  AutoComplete,
  TagInput,
} from '@douyinfe/semi-ui';
import useSWR from 'swr';
import { loginApi } from '@/api/user';
import { LoginByPasswordParams, User } from '@/api/types/user';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ToastSuccess } from '@/utils/common';
import useUserStore from '@/store/user';
import { fetcher } from '@/utils/http';
import { GetTag } from '@/api/types/tag';
import { GetGroup } from '@/api/types/group';
import { Tag as TagIF } from '@/api/types/user';
import {
  AutoCompleteItems,
  BaseDataItem,
} from '@douyinfe/semi-ui/lib/es/autoComplete';
import { AddMaterialParmas } from '@/api/types/material';
import { debounce } from 'lodash';
import styles from './index.module.scss';
import { addMaterial } from '@/api/material';

interface TagItem extends BaseDataItem, TagIF {}
const { Select, Input } = Form;

export default function NewForm() {
  const [loading, setLoading] = useState(false);
  const { data: tagData, isLoading: tagIsLoading } = useSWR<GetTag>(
    '/tag',
    fetcher
  );
  const [tags, setTags] = useState<string[]>([]);
  const searchTagRef = useRef(null);
  const [searchTagData, setSearchTagData] = useState<TagIF[]>([]);
  const [tagDropdownVisible, setTagDropdownVisible] = useState(false);
  const [tagInputValue, setTagInputValue] = useState('');
  const [tagIds, setTagIds] = useState<string[]>([]);
  // useEffect(() => {
  //   setSearchTagData(tagData?.tags as TagIF[]);
  // }, [tagData?.tags.length]);

  const searchTagHandle = useCallback(
    debounce((value) => {
      let result: TagIF[] = [];
      if (value) {
        result = (tagData?.tags ?? []).filter(
          (item) => item.name.includes(value) && !tags.includes(item.name)
        ) as TagIF[];
      }
      setSearchTagData(result);
    }, 300),
    [tagData?.tags, tags]
  );

  const { data: GroupData, isLoading: groupIsLoading } = useSWR<GetGroup>(
    '/group',
    fetcher
  );

  const handleSubmit = (values: AddMaterialParmas) => {
    const data = {
      ...values,
      tagIds,
    };
    console.info('handleSubmit', data);
    setLoading(true);
    addMaterial(data)
      .then((res) => {
        // TODO: 跳转到详情页
        ToastSuccess('添加成功');
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  };

  const TagInputClientHeight = (searchTagRef.current as any)?.inputRef.current
    .parentNode.parentNode.clientHeight;
  const renderTag = () => {
    if (tagIsLoading) return <>tag is loading</>;
    return (
      <div>
        <div className={styles.formItemRequired}>标签(最多6个)</div>
        <div className={styles.tagsContainer}>
          <TagInput
            allowDuplicates={false}
            // field='tags'
            // label={{ text: '标签(最多6个)', required: true }}
            onFocus={() => setTagDropdownVisible(true)}
            value={tags}
            onRemove={(value) => {
              setTags(tags.filter((item) => item !== value));
            }}
            inputValue={tagInputValue}
            onInputChange={(value) => {
              setTagInputValue(value);
              searchTagHandle(value);
            }}
            ref={searchTagRef}
          />
          {tagDropdownVisible && renderAutoComplete()}
        </div>
      </div>
    );
  };

  const renderAutoComplete = useCallback(() => {
    return (
      <>
        {searchTagData.length !== 0 && (
          <div
            className={styles.tags}
            style={{
              top: `${TagInputClientHeight + 10}px`,
            }}
          >
            {searchTagData.map((item) => (
              <div
                className={styles.tagItem}
                key={item.id}
                onClick={(e) => {
                  setTagIds([...tagIds, item.id]);
                  setTags([...tags, item.name]);
                  setSearchTagData([]);
                  setTagDropdownVisible(false);
                  setTagInputValue('');
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </>
    );
  }, [TagInputClientHeight, tags, searchTagData]);

  const renderGroup = () => {
    if (groupIsLoading) return <div>renderGroup loading</div>;
    return (
      <Select
        field='groupIds'
        label={{ text: '分组', required: true }}
        style={{ width: '100%' }}
        multiple
        initValue={[GroupData?.groups[GroupData?.groups.length - 1].id]}
      >
        {GroupData?.groups.map((item) => (
          <Select.Option value={item.id} key={item.id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
  };
  return (
    <Form onSubmit={(values) => handleSubmit(values)} style={{ width: 400 }}>
      {({ formState, values, formApi }) => (
        <>
          <Input
            field='name'
            label={{ text: '物料名称', required: true }}
            style={{ width: '100%' }}
            placeholder='输入物料名称'
          ></Input>
          <Input
            field='npmName'
            label={{ text: 'npm 包名', required: true }}
            style={{ width: '100%' }}
            placeholder='输入npm 包名'
          ></Input>
          <Input
            field='version'
            label={{ text: 'npm 包版本', required: true }}
            style={{ width: '100%' }}
            placeholder='输入npm 包版本'
          ></Input>
          {renderGroup()}
          {renderTag()}
          <Input
            field='installCommand'
            label='安装依赖命令'
            style={{ width: '100%' }}
            placeholder='安装依赖命令, 例如 npm install'
          ></Input>
          <Input
            field='startCommand'
            label='启动命令'
            style={{ width: '100%' }}
            placeholder='输入启动命令，例如 npm run start'
          ></Input>
          <Form.Switch label='公开' field='isPrivate' initValue={true} />
          <Input
            field='ignore'
            label='忽略的目录'
            style={{ width: '100%' }}
            placeholder='输入忽略的目录'
          ></Input>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Form.Checkbox field='agree' noLabel>
              我已阅读并同意服务条款
            </Form.Checkbox>
            <Button
              disabled={!values.agree}
              htmlType='submit'
              type='primary'
              theme='solid'
              loading={loading}
            >
              发布
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
