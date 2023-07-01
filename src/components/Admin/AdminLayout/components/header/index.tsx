import React, { FC, useEffect, useState } from 'react';
import {
  Layout,
  Nav,
  Button,
  Badge,
  Dropdown,
  RadioGroup,
  Radio,
} from '@douyinfe/semi-ui';
import { IconBell, IconHelpCircle } from '@douyinfe/semi-icons';
import useStore from '@/store/common/global';
import useUserStore from '@/store/user';
import { User } from '@/types/user';
import { useRouter } from 'next/router';
import CustomAvatar from '@/components/CustomAvatar';

const { Header } = Layout;

const Index: FC = () => {
  const locale = useStore((state) => state.locale);
  const changeLocale = useStore((state) => state.changeLocale);
  const { user } = useUserStore();

  if (!user) return null;

  const selectLocale = (locale: 'zh_CN' | 'en_GB') => {
    changeLocale(locale);
    localStorage.setItem('semi_locale', locale);
  };

  const question = () => {
    window.open('https://github.com/developerlinks/devlink-web/issues');
  };
  return (
    <Header className='layout-header'>
      <Nav
        mode='horizontal'
        footer={
          <>
            <Button
              theme='borderless'
              icon={<IconHelpCircle size='large' />}
              style={{
                color: 'var(--semi-color-text-2)',
                marginRight: '12px',
              }}
              onClick={question}
            />
            <Badge count={5} type='danger'>
              <Button
                theme='borderless'
                icon={<IconBell />}
                style={{
                  color: 'var(--semi-color-text-2)',
                  marginRight: '12px',
                }}
              />
            </Badge>

            <Dropdown
              render={
                <Dropdown.Menu>
                  <Dropdown.Item>个人中心</Dropdown.Item>
                  <Dropdown.Item>个人设置</Dropdown.Item>
                  <Dropdown.Item>退出登录</Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <CustomAvatar
                username={user?.username as string}
                src={user?.profile.avatar}
                size='small'
              />
              <div />
            </Dropdown>

            <RadioGroup
              type='button'
              defaultValue={locale}
              style={{ marginLeft: '20px' }}
            >
              <Radio value={'zh_CN'} onChange={() => selectLocale('zh_CN')}>
                中文
              </Radio>
              <Radio value={'en_GB'} onChange={() => selectLocale('en_GB')}>
                EN
              </Radio>
            </RadioGroup>
          </>
        }
      ></Nav>
    </Header>
  );
};

export default Index;
