import { User } from '@/api/types/user';
import Layout from '@/components/Layout/Layout';
import Seo from '@/components/Seo';
import Welcome from '@/components/Welcome';
import Home from '@/components/Home';
import useUserStore from '@/store/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Index() {
  const [userInfo, setUserInfo] = useState<User>();
  const { getUser } = useUserStore();

  useEffect(() => {
    getUser().then((data) => {
      setUserInfo(data);
    });
  }, []);

  
  return (
    <Layout>
      <Seo />
      <main>
        {
          !!userInfo ? <Home /> : <Welcome />
        }
      </main>
    </Layout>
  );
}
