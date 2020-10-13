import { AxiosRequestConfig } from 'axios';
import storage from '@/utils/storage';
import Request from './request';
import { redirectTo, showToast } from 'remax/wechat';
import qs from 'qs';
import curlirize from 'axios-curlirize';

const { request, interceptors } = new Request({
  baseUrl: ''
});

const cloneObjWithoutNull = (obj: Record<string, any>): Record<string, any> => {
  const res: Record<string, any> = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined && obj[key] !== '') {
      res[key] = obj[key];
    }
  });
  return res;
};

const removeUselessParams = (url: string): string => {
  const data = url.split('?');
  const obj = qs.parse(data[1]);
  if (data.length === 1) {
    return url;
  }
  const res = cloneObjWithoutNull(obj);
  return `${data[0]}?${qs.stringify(res)}`;
};

interceptors.request.use(options => {
  if (storage.get('token')) {
    options.header = {
      ...(options.header || {}),
      Authorization: `Bearer ${storage.get('token')}`
    };
  }
  options.url = removeUselessParams(options.url);
  if (options.data && typeof options.data === 'object') {
    options.data = cloneObjWithoutNull(options.data);
  }
  return options;
});

interceptors.response.use(options => {
  if (options.statusCode >= 400) {
    showToast({ title: options?.data?.message || '请求失败', icon: 'none' });
    return Promise.reject(options);
  }
  if ([401, 403].includes(options.statusCode)) {
    if (!storage.get('token')) {
      redirectTo({ url: '/pages/login/doctor/index' });
    }
  }
  return options;
});

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
curlirize({ interceptors }, ({ command, object }) => {
  // console.log(object.request);
  // console.log('请复制以下curl =============');
  // console.log(command);
});

export default {
  request: ({ url = '', data, method }: AxiosRequestConfig) =>
    request({
      url,
      data,
      method: method as any
    })
};
