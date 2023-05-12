import { Button, Input, Select } from '@douyinfe/semi-ui';
import styles from './index.module.scss';
import { IconSearch } from '@douyinfe/semi-icons';
import { useEffect, useState, useMemo } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/utils/http';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput, stringify } from 'querystring';

export interface QueryIF extends ParsedUrlQueryInput {
  groupIds?: string[] | string;
  name?: string;
  collectorId?: string;
  authorId?: string;
  userId?: string;
}

export interface ListIf {
  value: string;
  label: string;
  otherKey: string;
}

interface SearchFilterBarProps {
  type: 'person' | 'collection';
  _key: string;
}

const SearchFilterBar = ({ type: typeProp, _key }: SearchFilterBarProps) => {
  const fetchUrl = useMemo(
    () => (typeProp === 'person' ? '/group' : '/collection_group'),
    [typeProp]
  );
  // FIXME: 应该改为查询他的分组，而不是查询自己的
  const { data: groupData, isLoading, error } = useSWR(fetchUrl, fetcher);
  const [list, setList] = useState<ListIf[]>([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState<string[]>([]);
  const { pathname, query, push } = useRouter();

  const formatTypes = (ids) => (typeof ids === 'string' ? [ids] : ids);

  useEffect(() => {
    if (groupData) {
      setList(
        groupData[typeProp === 'person' ? 'groups' : 'collectionGroups'].map(
          (item) => ({
            value: item.id,
            label: item.name,
            otherKey: item.id,
          })
        )
      );

      setTimeout(() => {
        const { groupIds, collectionGroupIds, name } = query;
        if (name && typeof name === 'string') {
          setSearch(name);
        }
        if (typeProp === 'person' && groupIds) {
          setType(formatTypes(groupIds));
        } else if (typeProp === 'collection' && collectionGroupIds) {
          setType(formatTypes(collectionGroupIds));
        } else {
          setType([]);
        }
      }, 0);
    }
  }, [isLoading, groupData, _key]);

  const searchHandle = () => {
    push({
      pathname,
      query: {
        ...query,
        name: search,
        [typeProp === 'person' ? 'groupIds' : 'collectionGroupIds']:
          type.length > 0 ? type : [],
      },
    });
  };

  const groupAddUrl = useMemo(
    () => `/${typeProp === 'person' ? 'group' : 'collection-group'}/add`,
    [typeProp]
  );

  if (error) return <>获取分组失败，请刷新页面重试</>;

  return (
    <div className={styles.searchFilterBar}>
      <Input
        prefix={<IconSearch />}
        placeholder='请输入物料名'
        showClear
        value={search}
        onChange={setSearch}
      />
      <div className={styles.filterBox}>
        <Select
          filter
          multiple
          showClear
          placeholder='请选择分组'
          style={{ width: 160 }}
          optionList={list}
          value={type}
          onChange={(type) => setType(type as string[])}
          loading={isLoading}
          outerBottomSlot={
            <div className={styles.slotNode}>
              <span
                style={{ color: 'var(--semi-color-link)' }}
                onClick={() => open(groupAddUrl)}
              >
                新建分组
              </span>
            </div>
          }
        />
        <Button onClick={searchHandle}>查询</Button>
      </div>
    </div>
  );
};

export default SearchFilterBar;
