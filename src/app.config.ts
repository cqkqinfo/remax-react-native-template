export default {
  pages: [
    'pages/index/index',
    'pages/form/index',
    'pages/table/index',
    'pages/space/index',
    'pages/test/index'
  ],
  subpackages: [
    // {
    //   root: 'pages/step2/',
    //   pages: ['index']
    // }
  ],
  // tabBar: {
  //   backgroundColor: '#fff',
  //   color: '#CCCCCC',
  //   titleColor: '#CCCCCC',
  //   selectedColor: '#2780D9',
  //   activeTitleColor: '#2780D9',
  //   borderStyle: 'white',
  //   list: [
  //     {
  //       pagePath: 'pages/trends/index',
  //       text: '动态',
  //       iconPath: 'images/tab/dt2.png',
  //       selectedIconPath: 'images/tab/dt.png'
  //     },
  //     {
  //       pagePath: 'pages/index/index',
  //       text: '预约',
  //       iconPath: 'images/tab/yy2.png',
  //       selectedIconPath: 'images/tab/yy.png'
  //     }
  //   ]
  // },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于计算接种机构距离'
    }
  },
  window: {
    defaultTitle: '凯桥UI',
    navigationBarTitleText: '凯桥UI'
    // navigationBarBackgroundColor: '#2780D9'
  }
};
