// import 'raf/polyfill';
//
// console.log(global.requestAnimationFrame);
global.navigator = { userAgent: '' };
global.window = {
  ...global,
  location: {
    host: ''
  }
};

Object.assign(process.env, {
  REMAX_PLATFORM: 'native'
  // NODE_ENV: 'production',
});
