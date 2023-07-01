import {
  addMaterialToCollectionGroup,
  addMaterialToGroup,
  removeMaterialFromCollectionGroup,
  removeMaterialFromGroup,
} from '@/api/group';
import { Material } from '@/types/user';
import { ListIf } from '@/components/UserView/components/SearchFilterBar';
import { NoticeSuccess, compareArrays } from '@/utils/common';
import { fetcher } from '@/utils/http';
import { IconTreeTriangleDown } from '@douyinfe/semi-icons';
import { Button, CheckboxGroup, Dropdown, Spin } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import qs from 'querystring';
import { CollectionGroupMaterialDto, GroupMaterialDto } from '@/types/group';

interface GroupActionBtnProps {
  material: Material;
  isSelf: boolean;
  type: 'person' | 'collection';
  children?: React.ReactNode;
}

const GroupActionBtn = ({
  material,
  isSelf,
  type,
  children,
}: GroupActionBtnProps) => {
  const calculatedType = isSelf ? type : 'collection';
  const { id, groups, collectedInGroups } = material;
  const [list, setList] = useState<ListIf[]>([]);
  const fetchUrl = calculatedType === 'person' ? '/group' : '/collection_group';
  const { data, isLoading, error } = useSWR(fetchUrl, fetcher);
  const [Loading, setLoading] = useState(false);

  const userId = material.user.id;
  const router = useRouter();
  const { query, pathname } = router;

  const [SWRKey, setSWRKey] = useState(`/material?authorId=${userId}`);

  useEffect(() => {
    const queryData = query;
    const queryString = qs.stringify(queryData);
    if (pathname === '/') {
      setSWRKey(`/material`);
    } else if (pathname === '/material/[materialId]') {
      setSWRKey(`/material/detail?id=${query.materialId}`);
    } else {
      setSWRKey(`/material?authorId=${userId}&${queryString}`);
    }
  }, [query]);

  const defaultValue =
    calculatedType === 'person'
      ? groups.map((item) => item.id)
      : collectedInGroups.map((item) => item.id);

  useEffect(() => {
    if (data) {
      const groupList = data[
        calculatedType === 'person' ? 'groups' : 'collectionGroups'
      ].map((item) => ({
        value: item.id,
        label: item.name,
        otherKey: item.id,
      }));
      setList(groupList);
    }
  }, [isLoading, data]);

  const addFunc =
    calculatedType === 'person'
      ? addMaterialToGroup
      : addMaterialToCollectionGroup;
  const removeFunc =
    calculatedType === 'person'
      ? removeMaterialFromGroup
      : removeMaterialFromCollectionGroup;
  const onChange = (value: string[]) => {
    const change = compareArrays(defaultValue, value);

    if (change) {
      setLoading(true);
      const { action, item } = change;
      const params: CollectionGroupMaterialDto | GroupMaterialDto =
        calculatedType === 'person'
          ? { groupId: item, materialId: id }
          : { collectionGroupId: item, materialId: id };

      if (action === 'added') {
        // @ts-ignore
        addFunc(params)
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
        // @ts-ignore
        removeFunc(params)
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

  const btnVal = isSelf && type === 'person' ? '分组' : '收藏';

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
        {children || (
          <Button
            style={{ padding: '8px 4px' }}
            theme='light'
            type='primary'
            icon={<IconTreeTriangleDown />}
            iconPosition='right'
          >
            {btnVal}
          </Button>
        )}
      </Dropdown>
    </>
  );
};
export default GroupActionBtn;
