import Dashboard from '@/components/Dashboard';
import Home from './home';
import useUserStore from '@/store/user';

export default function Index() {
  const { user } = useUserStore();

  return <main>{user ? <Dashboard /> : <Home />}</main>;
}
