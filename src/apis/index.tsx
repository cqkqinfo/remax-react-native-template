import storage from '@/utils/storage';
import { request as req, login, showToast } from 'remax/wechat';
import createApiHooks from 'create-api-hooks';

const prodHost = 'prodHost';
const devHost = 'https://yapi.parsec.com.cn/mock/408';

const isDev = process.env.NODE_ENV === 'development';
const host = isDev ? devHost : prodHost;

let navigateLoginTimer: any;
let jumped = false;

function request<D>({
  url,
  ...arg
}: WechatMiniprogram.RequestOption): Promise<{ data: D }> {
  const token = storage.get('token');
  return req({
    url: `${host}${url}`,
    header: {
      Authorization: token ? `Bearer ${token}` : undefined
    },
    ...arg
  }).then(({ data, statusCode, data: { message = '网络请求失败' } }: any) => {
    if (statusCode === 401 || statusCode === 403) {
      if (!storage.get('token') && !jumped) {
        jumped = true;
        clearTimeout(navigateLoginTimer);
        navigateLoginTimer = setTimeout(() => (jumped = false), 3000);
        showToast({
          title: '请登录',
          icon: 'none'
        });
      }
    }
    if (statusCode >= 400) {
      showToast({
        title: message,
        icon: 'none'
      });
      return Promise.reject(data);
    }
    return { data: data as D };
  });
}

/**
 * 跟后端约定的列表请求数据
 */
export interface ListApiRequestParams {
  size?: number;
  page?: number;
}

/**
 * 跟后端约定的列表返回数据
 */
export interface ListApiResponseData<D> {
  list: D[];
  total: number;
  pageNum: number;
  pages: number;
}

export enum State {
  未知 = 1,
  已启用,
  未启用
}

export const StateObj = {
  [State.未知]: '未知',
  [State.已启用]: '已启用',
  [State.未启用]: '未启用'
};

interface ListData {
  name: string;
  age: number;
  sex: '男' | '女';
  state: State;
  id: number;
}

export default {
  login: createApiHooks(() =>
    login()
      .then(({ code }) =>
        request<{
          token: string;
          openid: string;
        }>({
          url: '/wx-login',
          method: 'POST'
        })
      )
      .then(response => {
        const {
          data: { token, openid }
        } = response;
        storage.set('token', token);
        storage.set('openId', openid);
        return response;
      })
  ),
  list: createApiHooks(
    (
      data: {
        [N in keyof ListData]?: ListData[N];
      } &
        ListApiRequestParams
    ) =>
      request<ListApiResponseData<ListData & { balance: number }>>({
        url: '/list',
        data
      })
  )
};
