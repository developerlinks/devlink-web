import Layout from '@/components/Layout/Layout';
import Seo from '@/components/Seo';
import styles from './style/index.module.scss';
import { Form, Toast, Button } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { loginApi } from '@/api/user';
import { LoginByPasswordParams } from '@/api/types/user';
import { useState } from 'react';
import { ToastSuccess } from '@/utils/common';

interface handleSubmitParams extends LoginByPasswordParams {
  agree: boolean;
}

export default function Email() {
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();
  const handleSubmit = (values: handleSubmitParams) => {
    loginApi(values)
      .then((res) => {
        const { status } = res.data;
        if (status === 0) {
          const { data } = res.data;
          localStorage.setItem('bearerToken', data.access_token);
          afterLoginSuccess(values);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const afterLoginSuccess = (values: LoginByPasswordParams) => {
    // 判断权限
    push('/');
    ToastSuccess('欢迎回来👏');
  };

  return (
    <Layout>
      <Seo />
      <main className={styles.loginScreen}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h1 className={styles.title}>密码登录</h1>
          </div>
          <div className={styles.loginPath}>
            <Form
              onSubmit={(values) => handleSubmit(values)}
              style={{ width: 400 }}
            >
              {({ formState, values, formApi }) => (
                <>
                  <Form.Input
                    field='email'
                    label='邮箱'
                    style={{ width: '100%' }}
                    placeholder='输入你的邮箱'
                  ></Form.Input>
                  <Form.Input
                    field='password'
                    label='密码'
                    style={{ width: '100%' }}
                    placeholder='输入密码'
                  ></Form.Input>
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
                        onClick={() => push('/login/forger')}
                      >
                        忘记密码
                      </Button>
                    </p>
                    <Button
                      disabled={!values.agree}
                      htmlType='submit'
                      type='tertiary'
                      loading={loading}
                    >
                      登录
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
