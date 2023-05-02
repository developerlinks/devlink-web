import useSWR from 'swr';
import Layout from '@/components/FrontLayout/Layout';
import Seo from '@/components/Seo';
import UserInfoCard from '@/components/UserInfoCard';

import styles from './index.module.scss';
import { fetcher } from '@/utils/http';
import UserView from '@/components/UserView';
import MaterialView from '@/components/MaterialView';

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

  const user = material?.user;
  return (
    <main className={styles.materialPage}>
      <div className={styles.materialContainer}>
        <div className={styles.materialView}>
          <MaterialView material={material} />
        </div>
        <div className={styles.useInfoAside}>
          <UserInfoCard {...user} />
        </div>
      </div>
    </main>
  );
};

Material.getInitialProps = async ({ query }: { query: MaterialProps }) => {
  const { materialId } = query;
  return { materialId };
};

export default Material;
