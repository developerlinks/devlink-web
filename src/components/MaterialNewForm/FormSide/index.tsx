import React, { useCallback, useRef, useState } from 'react';
import { SideSheet, Button, Form, TagInput } from '@douyinfe/semi-ui';
import { debounce } from 'lodash';
import { addMaterial } from '@/api/material';
import { BaseDataItem } from '@douyinfe/semi-ui/lib/es/autoComplete';
import { Tag as TagIF } from '@/api/types/user';
import { GetTag } from '@/api/types/tag';
import { fetcher } from '@/utils/http';
import useSWR from 'swr';
import clsx from 'clsx';
import { AddMaterialParmas } from '@/api/types/material';

import styles from './index.module.scss';
import { GetGroup } from '@/api/types/group';
import { ToastSuccess } from '@/utils/common';

interface FormSideProps {
  visible: boolean;
  values: any;
  setFormSideVisible: (visible: boolean) => void;
  onSubmit: (values: AddMaterialParmas) => void;
}

const { Select, Input } = Form;
interface TagItem extends BaseDataItem, TagIF {}

const FormSide = ({
  values,
  visible,
  setFormSideVisible,
  onSubmit,
}: FormSideProps) => {
  const [tagDropdownVisible, setTagDropdownVisible] = useState(false);
  const [tagInputValue, setTagInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const searchTagRef = useRef(null);
  const [searchTagData, setSearchTagData] = useState<TagIF[]>([]);

  const { data: tagData, isLoading: tagIsLoading } = useSWR<GetTag>(
    '/tag',
    fetcher
  );

  const { data: GroupData, isLoading: groupIsLoading } = useSWR<GetGroup>(
    '/group',
    fetcher
  );
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
  const TagInputClientHeight = (searchTagRef.current as any)?.inputRef.current
    .parentNode.parentNode.clientHeight;

  const combinedValues = {
    ...values,
    tagIds,
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

  const renderTag = () => {
    if (tagIsLoading) return <>tag is loading</>;
    return (
      <div>
        <div className={clsx(styles.formItemRequired, styles.required)}>
          标签(最多6个)
        </div>
        <div className={styles.tagsContainer}>
          <TagInput
            allowDuplicates={false}
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

  return (
    <>
      <SideSheet
        title='发布物料'
        visible={visible}
        onCancel={() => setFormSideVisible(false)}
      >
        <div className={styles.sideContainer}>
          {renderGroup()}
          {renderTag()}
          <Input
            field='abstract'
            label={{ text: '摘要' }}
            style={{ width: '100%' }}
            placeholder='输入摘要'
          ></Input>
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
              onClick={() => onSubmit(combinedValues)}
            >
              发布
            </Button>
          </div>
        </div>
      </SideSheet>
    </>
  );
};

export default FormSide;
