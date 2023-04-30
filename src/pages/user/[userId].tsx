import useSWR from 'swr';
import Layout from '@/components/Layout/Layout';
import Seo from '@/components/Seo';
import UserInfoCard from '@/components/UserInfoCard';

import styles from './style/index.module.scss';
import { fetcher } from '@/utils/http';
import UserView from '@/components/UserView';

interface UserProps {
  userId: string;
}

const User = ({ userId }: UserProps) => {
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(`/user/profile?id=${userId}`, fetcher);

  if (isLoading) return <div>用户信息获取中...</div>;
  if (error) return <div>用户信息获取失败</div>;

  return (
    <Layout>
      <Seo />
      <main className={styles.userPage}>
        <div className={styles.userContainer}>
          <div className={styles.useInfoAside}>
            <UserInfoCard {...user} />
          </div>
          <div className={styles.userView}>
            <UserView userId={userId} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

User.getInitialProps = async ({ query }: { query: UserProps }) => {
  const { userId } = query;
  return { userId };
};

export default User;
