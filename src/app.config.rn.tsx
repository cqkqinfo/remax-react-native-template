import { AppConfig, PageConfig } from 'remax/wechat';
import { ImageSourcePropType } from 'react-native';

Object.assign(process.env, {
  REMAX_PLATFORM: 'wechat'
  // NODE_ENV: 'production',
});

type Config = Omit<AppConfig, 'pages' | 'tabBar'> & {
  pages?: (PageConfig & { component: () => JSX.Element; path: string })[];
  tabBar: {
    color: string;
    selectedColor: string;
    backgroundColor: string;
    list: {
      component: () => JSX.Element;
      path: string;
      text: string;
      navigationBarTitleText?: string;
      iconPath: ImageSourcePropType;
      selectedIconPath: ImageSourcePropType;
      navigationBarBackgroundColor?: string;
      backgroundTextStyle?: 'dark' | 'light';
    }[];
  };
};

const config: Config = {
  pages: [
    {
      component: require('@/pages/index/index').default,
      path: '/pages/index/index',
      navigationBarTitleText: '首页'
    }
  ],
  tabBar: {
    color: '#bebebe',
    selectedColor: '#2780d9',
    backgroundColor: '#fff',
    list: [
      {
        text: '首页',
        navigationBarTitleText: '健康秀山',
        iconPath: require('@/images/tabIcons/home-disable.png'),
        selectedIconPath: require('@/images/tabIcons/home.png'),
        component: require('@/pages/index/index').default,
        navigationBarBackgroundColor: '#2780D9',
        backgroundTextStyle: 'dark',
        path: '/pages/index/index'
      },
      {
        text: '问诊',
        iconPath: require('@/images/tabIcons/online-disable.png'),
        selectedIconPath: require('@/images/tabIcons/online.png'),
        component: require('@/pages/index/index').default,
        navigationBarBackgroundColor: '#fff',
        backgroundTextStyle: 'light',
        path: '/pages/index2/index'
      },
      {
        text: '我的',
        navigationBarTitleText: '个人中心',
        iconPath: require('@/images/tabIcons/mine-disable.png'),
        selectedIconPath: require('@/images/tabIcons/mine.png'),
        component: require('@/pages/index/index').default,
        navigationBarBackgroundColor: '#2780D9',
        backgroundTextStyle: 'dark',
        path: '/pages/index3/index'
      }
    ]
  },
  window: {
    navigationBarTitleText: '健康秀山',
    navigationBarBackgroundColor: '#fff',
    backgroundTextStyle: 'light'
  }
};

export default config;
