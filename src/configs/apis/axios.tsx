import storage from '@/utils/storage';
import { showToast, axios } from '@kqinfo/ui';
import { redirectTo } from 'remax/one';
import qs from 'qs';

const request = axios.create({
  baseURL: ''
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

request.interceptors.request.use(options => {
  if (storage.get('token')) {
    options.headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${storage.get('token')}`
    };
  }
  options.url = removeUselessParams(options.url || '');
  if (options.data && typeof options.data === 'object') {
    options.data = cloneObjWithoutNull(options.data);
  }
  return options;
});

request.interceptors.response.use(
  undefined,
  (options: {
    response: { data: any; status: number; config: { url: string } };
  }) => {
    const {
      response: {
        status,
        data: { message }
      }
    } = options;
    if (status >= 400) {
      showToast({ title: message || '请求失败', icon: 'none' });
      return Promise.reject(options);
    }
    if ([401, 403].includes(status)) {
      if (!storage.get('token')) {
        redirectTo({ url: '/pages/login/doctor/index' });
      }
    }
    return options;
  }
);

export default request;
