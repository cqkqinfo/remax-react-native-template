// import 'raf/polyfill';
//
// console.log(global.requestAnimationFrame);
import { StyleSheet } from 'react-native';
import { rpxToPx } from '@kqinfo/ui';

global.navigator = { userAgent: '' };
global.window = {
  ...global,
  location: {
    host: '',
    href: ''
  }
};

Object.assign(process.env, {
  REMAX_PLATFORM: 'native'
  // NODE_ENV: 'production',
});

// require = (...arg) => {
//   const result = require(...arg);
//   result.default = result.default || result;
//   return result;
// };

StyleSheet.create = styles => {
  Object.entries(styles).forEach(([key, value]) => {
    if (typeof value === 'object') {
      Object.entries(value).forEach(([k, v]) => {
        if (
          typeof v === 'number' &&
          ['width', 'height', 'fontSize', 'lineHeight'].includes(k)
        ) {
          styles[key][k] = rpxToPx(v * 2);
        }
      });
    }
  });
  return styles;
};
