import { AppConfig, PageConfig } from 'remax/wechat';
import { ImageSourcePropType } from 'react-native';

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
      ...require('@/pages/index/index.config').default
    },
    {
      component: require('@/pages/form/index').default,
      path: '/pages/form/index',
      ...require('@/pages/form/index.config').default
    },
    {
      component: require('@/pages/table/index').default,
      path: '/pages/table/index',
      ...require('@/pages/table/index.config').default
    },
    {
      component: require('@/pages/space/index').default,
      path: '/pages/space/index',
      ...require('@/pages/space/index.config').default
    },
    {
      component: require('@/pages/test/index').default,
      path: '/pages/test/index',
      ...require('@/pages/test/index.config').default
    }
  ],
  tabBar: {
    color: '#bebebe',
    selectedColor: '#2780d9',
    backgroundColor: '#fff',
    list: [
      {
        text: '首页',
        navigationBarTitleText: '凯桥UI',
        iconPath: require('@/images/tabIcons/home-disable.png'),
        selectedIconPath: require('@/images/tabIcons/home.png'),
        component: require('@/pages/index/index').default,
        navigationBarBackgroundColor: '#2780D9',
        backgroundTextStyle: 'dark',
        path: '/pages/index/index'
      },
      {
        text: 'tab2',
        navigationBarTitleText: 'tab2',
        iconPath: require('@/images/tabIcons/online-disable.png'),
        selectedIconPath: require('@/images/tabIcons/online.png'),
        component: require('@/pages/index/index').default,
        navigationBarBackgroundColor: '#fff',
        backgroundTextStyle: 'light',
        path: '/pages/index2/index'
      },
      {
        text: 'tab3',
        navigationBarTitleText: 'tab3',
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
    navigationBarTitleText: '凯桥UI',
    navigationBarBackgroundColor: '#fff',
    backgroundTextStyle: 'light'
  }
};

export default config;
