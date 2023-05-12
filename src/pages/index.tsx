import Welcome from '@/components/Welcome';
import Home from '@/components/Home';
import useFetchUserInfo from '@/hooks/useFetchUserInfo';

export default function Index() {
  const userInfo = useFetchUserInfo();

  return <main>{!!userInfo ? <Home /> : <Welcome />}</main>;
}
