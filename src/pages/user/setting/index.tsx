import useSWR from 'swr';
import Seo from '@/components/Seo';
import { fetcher } from '@/utils/http';
import Layout from '@/components/Layout/Layout';
import { Anchor } from '@douyinfe/semi-ui';
import UserNameSettingCard from '@/components/SettingPageComps/components/UserName';
import EmailSettingCard from '@/components/SettingPageComps/components/Email';
import AddressSettingCard from '@/components/SettingPageComps/components/Address';
import DescriptionSettingCard from '@/components/SettingPageComps/components/Description';

import styles from './style/index.module.scss';
import DeviceMange from '@/components/SettingPageComps/components/DeviceMange';
import ThirdPartyLoginInfoCard from '@/components/ThirdPartyLoginInfoCard';
import AvatarettingCard from '@/components/SettingPageComps/components/Avatar';

const Setting = () => {
  const { data: user, error, isLoading } = useSWR('user/userinfo', fetcher);

  if (isLoading) return <div>用户信息获取中...</div>;
  if (error) return <div>用户信息获取失败</div>;
  console.log('user', user);
  const getContainer = () => {
    return document.querySelector('window') as HTMLElement | Window;
  };
  return (
    <Layout>
      <Seo />
      <main className={styles.settingPage}>
        <div className={styles.settingContainer}>
          <div className={styles.settingNav}>
            <Anchor
              getContainer={getContainer}
              offsetTop={100}
              targetOffset={100}
              railTheme='tertiary'
              scrollMotion
              defaultAnchor='#normalInfo'
              style={{
                position: 'fixed',
                left: '260px',
                top: '100px',
                width: '200px',
                zIndex: 3,
                fontSize: '18px',
              }}
            >
              <Anchor.Link href='#normalInfo' title='基本信息' />
              <Anchor.Link href='#thirdPartyLogin' title='第三方登录' />
              <Anchor.Link href='#deviceMange' title='设备管理' />
            </Anchor>
          </div>
          <div className={styles.settingView}>
            <div id='normalInfo'>
              <div className={styles.settingBaseTitle}>基本信息</div>
              <div className={styles.settingViewItem}>
                <AvatarettingCard />
              </div>
              <div className={styles.settingViewItem}>
                <UserNameSettingCard />
              </div>
              <div className={styles.settingViewItem}>
                <EmailSettingCard />
              </div>
              <div className={styles.settingViewItem}>
                <DescriptionSettingCard />
              </div>
              <div className={styles.settingViewItem}>
                <AddressSettingCard />
              </div>
            </div>
            <div id='thirdPartyLogin'>
              <ThirdPartyLoginInfoCard />
            </div>
            <div id='deviceMange'>
              <DeviceMange />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Setting;
