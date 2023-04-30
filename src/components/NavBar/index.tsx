import { Nav, Dropdown, Button, Typography } from '@douyinfe/semi-ui';
import Image from 'next/image';
import styles from './style/index.module.scss';
import { useRouter } from 'next/router';
import useUserStore from '@/store/user';
import { useEffect, useState } from 'react';
import { User } from '@/api/types/user';
import Avatar from '../Avatar';

export default function NavBar() {
  const [userInfo, setUserInfo] = useState<User>();
  const { push, pathname } = useRouter();
  const { getUser, user } = useUserStore();
  
  useEffect(() => {
    if (!pathname.includes('login')) {
      getUser().then((data) => {
        setUserInfo(data);
      });
    }
  }, [user]);

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

  const AuthRightBox = () => (
    <>
      <Dropdown
        position='bottomRight'
        render={
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => push(`/user/${userInfo?.id}`)}>
              个人主页
            </Dropdown.Item>
            <Dropdown.Item onClick={() => push('/user/setting')}>
              个人设置
            </Dropdown.Item>
            <Dropdown.Item>退出</Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <Avatar
          avatar={userInfo?.profile.avatar ?? ''}
          username={userInfo?.username as string}
          size='small'
          style={{ marginRight: 8 }}
        />
        <span>{userInfo?.username}</span>
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
            <Image
              src={'/images/devlink_white.svg'}
              alt='logo'
              width={127}
              height={35}
              style={{ cursor: 'pointer' }}
              onClick={() => push('/')}
            />
          }
          footer={navRightBox()}
        />
      </header>
    );
  };
  return <div>{renderHorizontal()}</div>;
}
