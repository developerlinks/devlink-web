import {
  Nav,
  Dropdown,
  Button,
  Typography,
  DropdownDivider,
  Spin,
} from '@douyinfe/semi-ui';
import Image from 'next/image';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import useUserStore from '@/store/user';
import { useEffect, useState } from 'react';
import { User } from '@/api/types/user';
import Avatar from '../CustomAvatar';
import SearchBar from '../SearchBar';
import { logout } from '@/api/user';
import { NoticeSuccess, clearUserinfo } from '@/utils/common';

export default function NavBar() {
  const [userInfo, setUserInfo] = useState<User>();
  const { push, pathname } = useRouter();
  const { getUser, user, clearUser } = useUserStore();
  const [logoutIsLoading, setLogoutIsLoading] = useState(false);
  const isLoginPage = pathname.includes('login');

  useEffect(() => {
    if (!isLoginPage || (!user && !isLoginPage)) {
      getUser().then((data) => {
        setUserInfo(data);
      });
    }
  }, [user, pathname]);

  const UnAuthRightBox = () => {
    const { Text } = Typography;

    return (
      <div className={styles.unAuth}>
        <Text type='primary' link onClick={() => push('/login')}>
          登录
        </Text>
        <Button
          type='primary'
          theme='solid'
          onClick={() => push('/login/register')}
        >
          注册
        </Button>
      </div>
    );
  };

  const logoutHandle = () => {
    setLogoutIsLoading(true);
    logout()
      .then(() => {
        NoticeSuccess('退出成功', user?.username);
        clearUserinfo();
        clearUser();
        push('/login');
      })
      .catch(() => {})
      .finally(() => {
        setLogoutIsLoading(false);
      });
  };

  const AuthRightBox = () => (
    <>
      {/* TODO: */}
      <Dropdown
        position='bottomLeft'
        render={
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => push(`/user/${userInfo?.id}`)}>
              个人主页
            </Dropdown.Item>
            <Dropdown.Item onClick={() => push('/user/setting')}>
              个人设置
            </Dropdown.Item>
            <DropdownDivider />
            <Dropdown.Item onClick={() => push('/admin')}>
              后台管理
            </Dropdown.Item>
            <DropdownDivider />
            <Dropdown.Item onClick={logoutHandle}>
              {logoutIsLoading && <Spin />}
              退出
            </Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <Avatar
          src={userInfo?.profile?.avatar ?? ''}
          username={userInfo?.username as string}
          size='small'
          style={{ marginRight: 8 }}
        />
        <div />
      </Dropdown>
    </>
  );

  const navRightBox = () => {
    return <div>{!!userInfo ? AuthRightBox() : UnAuthRightBox()}</div>;
  };

  const renderHorizontal = () => {
    return (
      <header className={styles.navbarContainer}>
        <Nav
          className={styles.navbar}
          mode={'horizontal'}
          onSelect={(key) => console.log(key)}
          style={{ padding: 0 }}
          header={
            <>
              <Image
                src={'/images/devlink_white.svg'}
                alt='logo'
                width={127}
                height={35}
                style={{ cursor: 'pointer' }}
                onClick={() => push('/')}
              />
              {!!userInfo && <SearchBar />}
            </>
          }
          footer={navRightBox()}
        />
      </header>
    );
  };
  return <div>{renderHorizontal()}</div>;
}
