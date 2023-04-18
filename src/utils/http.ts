import axios from 'axios';
import { ToastError } from '@/utils/common';
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

http.interceptors.request.use(
  (config) => {
    const bearerToken = localStorage.getItem('bearerToken') || '';
    if (bearerToken.length !== 0) {
      config.headers['authorization'] = 'Bearer ' + bearerToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => response,
  (err) => {
    const { response } = err;
    // TODO: 错误处理
    let errorMsg = response?.data.message.message;
    errorMsg = Array.isArray(errorMsg) ? errorMsg[0] : errorMsg;
    ToastError(errorMsg);
  }
);
export default http;
