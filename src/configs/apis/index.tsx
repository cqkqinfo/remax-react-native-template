import { DefaultApi } from '../codegen';
import { getWxEnv } from '@/utils/utils';

//TODO 正式环境需要配置
const baseUrl =
  getWxEnv() === 'release'
    ? 'https://www.yl958.cn/api'
    : 'https://lyd.yl958.cn/api';

const apis = new DefaultApi(undefined, baseUrl);

Object.getOwnPropertyNames(Object.getPrototypeOf(apis)).forEach(name => {
  if (typeof (apis as any)[name] === 'function') {
    (apis as any)[name] = (apis as any)[name].bind(apis);
  }
});

export default apis;

export * from '../codegen';
