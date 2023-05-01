import useSWR from 'swr';
import Layout from '@/components/Layout/Layout';
import Seo from '@/components/Seo';
import UserInfoCard from '@/components/UserInfoCard';

import styles from './style/index.module.scss';
import { fetcher } from '@/utils/http';
import UserView from '@/components/UserView';

interface MaterialProps {
  materialId: string;
}

const Material = ({ materialId }: MaterialProps) => {
  const {
    data: material,
    error,
    isLoading,
  } = useSWR(`/material/detail?id=${materialId}`, fetcher);

  if (isLoading) return <div>用户信息获取中...</div>;
  if (error) return <div>用户信息获取失败</div>;

  console.log('material', material);
  const user = material?.user;
  return (
    <Layout>
      <Seo />
      <main className={styles.materialPage}>
        <div className={styles.materialContainer}>
          <div className={styles.materialView}>materialView</div>
          <div className={styles.useInfoAside}>
            <UserInfoCard {...user} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

Material.getInitialProps = async ({ query }: { query: MaterialProps }) => {
  const { materialId } = query;
  return { materialId };
};

export default Material;
