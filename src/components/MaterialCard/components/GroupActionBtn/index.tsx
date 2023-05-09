import { addMaterialToGroup, removeMaterialFromGroup } from '@/api/group';
import { Material } from '@/api/types/user';
import { ListIf } from '@/components/UserView/components/SearchFilterBar';
import { NoticeSuccess, compareArrays } from '@/utils/common';
import { fetcher } from '@/utils/http';
import { IconTreeTriangleDown } from '@douyinfe/semi-icons';
import { Button, CheckboxGroup, Dropdown, Spin } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import qs from 'querystring';

interface GroupActionBtnProps {
  material: Material;
  isSelf: boolean;
}

const GroupActionBtn = ({ material, isSelf }: GroupActionBtnProps) => {
  const { id, groups } = material;
  const [list, setList] = useState<ListIf[]>([]);
  const { data, isLoading, error } = useSWR('/group', fetcher);
  const [Loading, setLoading] = useState(false);

  const userId = material.user.id;
  const router = useRouter();
  const { query } = router;

  const [SWRKey, setSWRKey] = useState(`/material?authorId=${userId}`);

  useEffect(() => {
    const queryData = query;
    const queryString = qs.stringify(queryData);
    setSWRKey(`/material?authorId=${userId}&${queryString}`);
  }, [query]);

  const defaultValue = groups.map((item) => item.id);
  useEffect(() => {
    if (data) {
      const groupList = data.groups.map((item) => ({
        value: item.id,
        label: item.name,
        otherKey: item.id,
      }));
      setList(groupList);
    }
  }, [isLoading, data]);

  const onChange = (value: string[]) => {
    const change = compareArrays(defaultValue, value);

    if (change) {
      setLoading(true);
      const { action, item } = change;
      if (action === 'added') {
        addMaterialToGroup({ groupId: item, materialId: id })
          .then(() => {
            const groupName = list.find((val) => val.value === item)?.label;
            NoticeSuccess('添加成功', `${material.name}添加到${groupName}中`);
            return mutate(SWRKey);
          })
          .catch(() => {})
          .finally(() => {
            setLoading(false);
          });
      } else {
        removeMaterialFromGroup({ groupId: item, materialId: id })
          .then(() => {
            const groupName = list.find((val) => val.value === item)?.label;
            NoticeSuccess('移除成功', `${material.name}从${groupName}中移除`);
            return mutate(SWRKey);
          })
          .catch(() => {})
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  if (isLoading) return <>分组获取中</>;
  if (error) return <>分组获取失败</>;

  return (
    <>
      <Dropdown
        trigger='click'
        position='bottomRight'
        render={
          Loading ? (
            <Spin />
          ) : (
            <CheckboxGroup
              options={list}
              defaultValue={defaultValue}
              onChange={onChange}
              aria-label='分组'
              style={{ padding: '10px' }}
            />
          )
        }
      >
        <Button
          style={{ padding: '8px 4px' }}
          theme='light'
          type='primary'
          icon={<IconTreeTriangleDown />}
          iconPosition='right'
        >
          {isSelf ? '分组' : '收藏'}
        </Button>
      </Dropdown>
    </>
  );
};
export default GroupActionBtn;
