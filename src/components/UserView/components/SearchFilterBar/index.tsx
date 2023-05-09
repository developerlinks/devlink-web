import { Button, Input, Select } from '@douyinfe/semi-ui';
import styles from './index.module.scss';
import { IconSearch } from '@douyinfe/semi-icons';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/utils/http';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import { debounce } from 'lodash';

export interface QueryIF extends ParsedUrlQueryInput {
  groupIds?: string[] | string;
  name?: string;
}

export interface ListIf {
  value: string;
  label: string;
  otherKey: string;
}
const SearchFilterBar = () => {
  const { data: groupData, isLoading, error } = useSWR('/group', fetcher);
  const [list, setList] = useState<ListIf[]>([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState<string[]>([]);
  const { pathname, query, push } = useRouter();

  useEffect(() => {
    if (groupData) {
      const groupList = groupData.groups.map((item) => ({
        value: item.id,
        label: item.name,
        otherKey: item.id,
      }));
      setList(groupList);
    }
  }, [isLoading, groupData]);

  if (error) return <>获取分组失败，请刷新页面重试</>;

  const searchHandle = () => {
    const newQuery: QueryIF = { ...query, name: search };

    newQuery.groupIds = type.length > 0 ? type : [];

    push({
      pathname,
      query: newQuery,
    });
  };

  const outSlotNode = (
    <div className={styles.slotNode}>
      <span
        style={{ color: 'var(--semi-color-link)' }}
        onClick={() => open('/group/add')}
      >
        新建分组
      </span>
    </div>
  );

  return (
    <div className={styles.searchFilterBar}>
      <Input
        prefix={<IconSearch />}
        placeholder='请输入物料名'
        showClear
        value={search}
        onChange={(val) => setSearch(val)}
      ></Input>
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
          outerBottomSlot={outSlotNode}
        ></Select>
        <Button onClick={searchHandle}>查询</Button>
      </div>
    </div>
  );
};

export default SearchFilterBar;
