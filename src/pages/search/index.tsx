import useSWR from 'swr';
import Seo from '@/components/Seo';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import Layout from '@/components/FrontLayout/Layout';
import CateGory from '@/components/SearchPageComps/Category';
import { SearchConsiderations } from '@/components/SearchPageComps/SearchConsiderations';
import ResultList from '@/components/SearchPageComps/ResultList';
import { fetcher } from '@/utils/http';
import { Spin } from '@douyinfe/semi-ui';

import { Tag, Material, User } from '@/api/types/user';

export interface SearchItemData {
  items: Material[] | User[] | Tag[];
  reason: string;
  total: number;
  totalPage: number;
}

export interface SearchData {
  data: SearchItemData[];
}

export default function Search({ keyword, type }) {
  const router = useRouter();

  const { data, isLoading, error } = useSWR(
    `/user/fuzzy_query?page=1&limit=10&keyword=${keyword}`,
    fetcher
  );

  if (isLoading || router.isFallback) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Spin size='large' />
      </div>
    );
  }

  if (error) return <>error，请刷新重试</>;

  return (
    <main>
      <div className={styles.searchContainer}>
        <div className={styles.categoryAside}>
          <CateGory data={data} />
        </div>
        <div className={styles.resultAside}>
          <div className={styles.resultContainer}>
            <ResultList type={type} data={data} />
          </div>
          <div className={styles.noticeContainer}>
            <SearchConsiderations />
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { keyword, type } = query;

  // const searchResults = await fetchSearchResults(keyword, type);

  return {
    props: {
      keyword,
      type,
      // searchResults,
    },
  };
}
