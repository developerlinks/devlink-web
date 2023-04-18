import {
  Nav,
  Avatar,
  Dropdown,
  Select,
  Button,
  Typography,
} from '@douyinfe/semi-ui';
import Image from 'next/image';
import styles from './style/index.module.scss';
import { useRouter } from 'next/router';

export default function NavBar() {
  const { push } = useRouter();
  const navRightBox = () => {
    const { Text } = Typography;
    /**
     * <>
              <Dropdown
                position='bottomRight'
                render={
                  <Dropdown.Menu>
                    <Dropdown.Item>详情</Dropdown.Item>
                    <Dropdown.Item>退出</Dropdown.Item>
                  </Dropdown.Menu>
                }
              >
                <Avatar size='small' color='light-blue' style={{ margin: 4 }}>
                  BD
                </Avatar>
                <span>devlink</span>
              </Dropdown>
            </>
     */
    return (
      <div>
        <div className={styles.unAuth}>
          <Text type='primary' link onClick={() => push('/login')}>
            登录
          </Text>
          <Button type='primary' theme='solid' onClick={() => push('/login/register')}>注册</Button>
        </div>
      </div>
    );
  };

  const renderHorizontal = () => {
    return (
      <header className={styles.navbarContainer}>
        <Nav
          className={styles.navbar}
          mode={'horizontal'}
          onSelect={(key) => console.log(key)}
          header={{
            logo: (
              <Image
                src={'/images/devlink_d_black.svg'}
                alt='logo'
                width={40}
                height={40}
              />
            ),
          }}
          footer={navRightBox()}
        />
      </header>
    );
  };
  return <div>{renderHorizontal()}</div>;
}
