import { getGithubUser } from '@/api/github';
import { generateDeviceInfo } from '@/utils/device';
import React, { useEffect } from 'react';
import useUserStore from '@/store/user';
import { User } from '@/api/types/user';
import { useRouter } from 'next/router';
import { ToastSuccess } from '@/utils/common';

const GithubRedirect = () => {
  const { setUser } = useUserStore();
  const { push } = useRouter();

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

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      generateDeviceInfo(code).then((res) => {
        const { deviceId, deviceType } = res;
        const params = {
          code,
          deviceId,
          deviceType,
        };
        getGithubUser(params)
          .then((res) => {
            const { accessToken, user } = res.data;
            localStorage.setItem('bearerToken', accessToken);
            afterLoginSuccess(user);
          })
          .catch(() => {});
      });
    } else {
      // 导航到登录界面，显示错误信息
    }
  }, []);

  return <div>Signing in with Github...</div>;
};

export default GithubRedirect;
