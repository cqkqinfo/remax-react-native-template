const pages = ['pages/index/index'];

const subPackages = [
  // {
  //   root: 'pages/addAddress/',
  //   pages: ['index']
  // }
];

module.exports.ali = {
  pages,
  subPackages,
  window: {
    defaultTitle: 'Remax Ali Template',
    titleBarColor: '#282c34'
  }
};

module.exports.wechat = {
  pages,
  subPackages,
  window: {
    navigationBarTitleText: 'Remax wechat Template',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black'
  }
};

module.exports.toutiao = {
  pages,
  subPackages,
  window: {
    navigationBarTitleText: 'Remax Toutiao Template',
    navigationBarBackgroundColor: '#282c34',
    backgroundTextStyle: 'light'
  }
};

module.exports.web = {
  pages,
  title: 'Remax Web Template',
  subPackages,
  router: {
    // history 类型，支持 hash 和 browser
    // type: 'browser'
  }
};
