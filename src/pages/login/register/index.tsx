import Layout from '@/components/FrontLayout/Layout';
import Seo from '@/components/Seo';
import styles from './index.module.scss';
import { Form, Toast, Button } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { loginApi, register, sendCode } from '@/api/user';
import { LoginByPasswordParams, RegisterByEmail, User } from '@/api/types/user';
import { useState } from 'react';
import { ToastSuccess } from '@/utils/common';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { generateHash } from '@/utils/generateHash';
import useUserStore from '@/store/user';
import { generateDeviceInfo } from '@/utils/device';

interface handleSubmitParams extends LoginByPasswordParams {
  agree: boolean;
}

export default function Email() {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserStore();
  const { push } = useRouter();

  const sendCodeHandle = (email: string) => {
    sendCode(email)
      .then(() => {
        Toast.success('发送成功');
      })
      .catch((err) => {});
  };
  const handleSubmit = (values: RegisterByEmail) => {
    register(values)
      .then(() => {
        ToastSuccess('注册成功');
        return Promise.resolve();
      })
      .then(async () => {
        const { deviceId, deviceType } = await generateDeviceInfo(values.email);
        if (deviceId && deviceType) {
          const params: LoginByPasswordParams = {
            ...values,
            deviceId,
            deviceType,
          };
          return loginApi(params);
        }
        return Promise.reject();
      })
      .then((res) => {
        const { user, accessToken } = res.data;
        localStorage.setItem('bearerToken', accessToken);
        afterLoginSuccess(user);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const afterLoginSuccess = (user: User) => {
    const { roles } = user;
    setUser(user);
    const isAdmin =
      roles.findIndex(
        (item) => item.name === 'super' || item.name === 'admin'
      ) !== -1;
    // 判断权限
    push(isAdmin ? '/admin' : '/');
    ToastSuccess('欢迎 👏');
  };

  return (
    <main className={styles.loginScreen}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1 className={styles.title}>注册</h1>
        </div>
        <div className={styles.loginPath}>
          <Form
            onSubmit={(values) => handleSubmit(values)}
            style={{ width: 400 }}
          >
            {({ formState, values, formApi }) => (
              <>
                <Form.Input
                  field='username'
                  label='用户名'
                  style={{ width: '100%' }}
                  placeholder='输入用户名'
                ></Form.Input>
                <Form.Input
                  field='email'
                  label='邮箱'
                  style={{ width: '100%' }}
                  placeholder='请输入邮箱'
                ></Form.Input>
                <Form.Input
                  field='password'
                  label='密码'
                  type='password'
                  mode='password'
                  style={{ width: '100%' }}
                  placeholder='请输入密码'
                ></Form.Input>
                <Form.Input
                  field='code'
                  label='验证码'
                  placeholder='请输入验证码'
                  showClear
                  suffix={
                    <Button
                      block
                      theme='borderless'
                      type='tertiary'
                      onClick={() => sendCodeHandle(values.email)}
                    >
                      发送
                    </Button>
                  }
                />

                <Form.Checkbox field='agree' noLabel>
                  我已阅读并同意服务条款
                </Form.Checkbox>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <p>
                    <Button
                      theme='borderless'
                      style={{
                        color: 'var(--semi-color-primary)',
                        cursor: 'pointer',
                      }}
                      onClick={() => push('/login/email')}
                    >
                      登录
                    </Button>
                  </p>
                  <Button
                    disabled={!values.agree}
                    htmlType='submit'
                    type='primary'
                    theme='solid'
                    loading={loading}
                  >
                    提交
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </main>
  );
}
