import { DefaultApi } from '../codegen';
import { getAccountInfoSync } from '@kqinfo/ui';
import axios from './axios';

const baseUrl =
  getAccountInfoSync().miniProgram.envVersion === 'release'
    ? 'https://wx.cqkqinfo.com/anticovid'
    : // : 'http://mock.anticovid.alpha.lyd.parsec.com.cn/wax-api';
      'https://lye.parsec.com.cn/stage-anticovid-api';

const apis = new DefaultApi(undefined, baseUrl, axios as any);

Object.getOwnPropertyNames(Object.getPrototypeOf(apis)).forEach(name => {
  if (typeof (apis as any)[name] === 'function') {
    (apis as any)[name] = (apis as any)[name].bind(apis);
  }
});

export default apis;

export * from '../codegen';
