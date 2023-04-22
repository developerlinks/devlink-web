import axios, { AxiosError } from 'axios';
import { ToastError, ToastWaring } from '@/utils/common';
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
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      const errorData = error.response.data;
      const { status } = errorData;
      let {
        message: { message },
      } = errorData;
      // TODO: 错误信息处理，后端返回的错误信息格式不统一 数组 or 对象
      message = Array.isArray(message) ? message[0] : message;
      switch (status) {
        case 400:
          ToastError(`${message}`);
          console.error(`错误请求: ${message}`);
          break;
        case 401:
          ToastError(message);
          window.location.href = '/login';
          break;
        case 403:
          ToastError(message);
          break;
        case 404:
          ToastError(message);
          break;
        case 500:
          ToastError(`网络发生波动，请联系管理员`);
          break;
        default:
          ToastError(message);
      }
    } else if (error.request) {
      ToastWaring(`网络发生波动,未收到响应,请稍后再试`);
      console.error(`${error.message}`)
    } else {
      ToastError(error.message);
      console.error(`Request configuration error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);
export default http;

export const fetcher = (url: string) => http.get(url).then(res => res.data)