import {
  Nav,
  Dropdown,
  Button,
  Typography,
  DropdownDivider,
} from '@douyinfe/semi-ui';
import Image from 'next/image';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import useUserStore from '@/store/user';
import { useEffect, useState } from 'react';
import { User } from '@/api/types/user';
import Avatar from '../Avatar';
import SearchBar from '../SearchBar';

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
            <Dropdown.Item>退出</Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <Avatar
          src={userInfo?.profile.avatar ?? ''}
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
