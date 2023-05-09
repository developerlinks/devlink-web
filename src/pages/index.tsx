import { User } from '@/api/types/user';
import Welcome from '@/components/Welcome';
import Home from '@/components/Home';
import useUserStore from '@/store/user';
import { useEffect, useState } from 'react';

export default function Index() {
  const [userInfo, setUserInfo] = useState<User>();
  const { getUser } = useUserStore();

  useEffect(() => {
    getUser().then((data) => {
      setUserInfo(data);
    });
  }, []);

  return <main>{!!userInfo ? <Home /> : <Welcome />}</main>;
}
