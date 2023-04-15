import { Nav, Avatar, Dropdown, Select, Button } from '@douyinfe/semi-ui';
import Image from 'next/image';
import styles from './style/index.module.scss';

export default function NavBar() {
  const renderHorizontal = () => {
    return (
      <header className={styles.navbar}>
        <Nav
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
          footer={
            <>
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
          }
        />
      </header>
    );
  };
  return <div>{renderHorizontal()}</div>;
}
