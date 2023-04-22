import Layout from '@/components/Layout/Layout';
import Seo from '@/components/Seo';
import styles from './style/index.module.scss';
import { Form, Toast, Button } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { loginApi, register, sendCode } from '@/api/user';
import { LoginByPasswordParams, RegisterByEmail } from '@/api/types/user';
import { useState } from 'react';
import { ToastSuccess } from '@/utils/common';

interface handleSubmitParams extends LoginByPasswordParams {
  agree: boolean;
}

export default function Email() {
  const [loading, setLoading] = useState(false);

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
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const afterRegisterSuccess = (values: LoginByPasswordParams) => {
    // 判断权限
    push('/login/email');
  };

  return (
    <Layout>
      <Seo />
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
                      type='tertiary'
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
    </Layout>
  );
}
