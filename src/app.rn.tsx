import React, { useEffect, useState } from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  useIsFocused
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
  useHeaderHeight
} from '@react-navigation/stack';
import appConfig from './app.config.rn';
import { StatusBar, Linking, Platform, Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getStorageSync, setStorageSync } from 'remax/wechat';
import styles from './app.less';
import PageScrollStore from './PageScrollStore';
import PortalProvider from 'parsec-hooks/lib/PortalProvider';
import { Provider } from '@ant-design/react-native';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { IImageInfo } from 'react-native-image-zoom-viewer/src/image-viewer.type';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { usePageEvent } from 'remax/macro';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ConfigProvider } from '@kqinfo/ui';

const { window, tabBar } = appConfig;

const PageScroll = ({
  children,
  navigationBarBackgroundColor
}: {
  children: React.ReactNode;
  navigationBarBackgroundColor?: string;
}) => {
  const isFocused = useIsFocused();
  const { scrollProps } = PageScrollStore.useContainer();
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'always'}
      keyboardDismissMode={'on-drag'}
      {...scrollProps}>
      {isFocused && (
        <StatusBar backgroundColor={navigationBarBackgroundColor} />
      )}
      {children}
    </KeyboardAwareScrollView>
  );
};

const getPage = (
  Component: () => JSX.Element,
  {
    navigationBarBackgroundColor = window?.navigationBarBackgroundColor,
    barStyle = 'light-content'
  }: {
    navigationBarBackgroundColor?: string;
    barStyle?: 'light-content' | 'dark-content';
  }
) => {
  return (props: any) => {
    appData.navigatorProps = props;
    appData.headerHeight = useHeaderHeight();
    usePageEvent('onShow', () => StatusBar.setBarStyle(barStyle));
    useEffect(() => {
      return props.navigation.addListener('focus', () => {
        appData.navigatorProps = props;
      });
    }, [props]);
    return (
      <Provider>
        <PortalProvider>
          <PageScrollStore.Provider>
            <PageScroll
              navigationBarBackgroundColor={navigationBarBackgroundColor}>
              <Component />
            </PageScroll>
          </PageScrollStore.Provider>
        </PortalProvider>
      </Provider>
    );
  };
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const appData = {
  headerHeight: 0,
  navigatorProps: {} as StackScreenProps<any, any>,
  tabBarNavigatorProps: {} as StackScreenProps<any, any>,
  setPreviewImages: {} as (imgs: IImageInfo[]) => void,
  setPreviewImagesVisible: {} as (visible: boolean) => void,
  setPreviewImagesCurrent: {} as (current: number) => void
};

const Tabs = (props: any) => {
  if (props) {
    appData.tabBarNavigatorProps = props;
  }
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 13
        }
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const { iconPath, selectedIconPath } =
            tabBar.list.find(({ path }) => route.name === path) ||
            tabBar.list[0];
          if (iconPath && selectedIconPath) {
            return (
              <Image
                className={styles.tabIcon}
                source={focused ? selectedIconPath : iconPath}
              />
            );
          }
        }
      })}>
      {tabBar.list.map(
        ({
          component,
          path,
          text,
          backgroundTextStyle,
          navigationBarBackgroundColor
        }) => {
          return (
            <Tab.Screen key={path} name={path} options={{ title: text }}>
              {getPage(component, {
                navigationBarBackgroundColor,
                barStyle:
                  backgroundTextStyle === 'dark'
                    ? 'light-content'
                    : 'dark-content'
              })}
            </Tab.Screen>
          );
        }
      )}
    </Tab.Navigator>
  );
};

const getScreenOptions = ({
  title,
  backgroundColor,
  backgroundTextStyle
}: {
  title?: string;
  backgroundColor?: string;
  backgroundTextStyle?: 'dark' | 'light';
}) => ({
  cardStyle: { backgroundColor: '#fff' },
  headerBackTitleVisible: false,
  headerBackImage: Platform.select({
    ios: () => (
      <Image
        source={
          backgroundTextStyle === 'dark'
            ? require('@/images/icons/back.png')
            : require('@/images/icons/back2.png')
        }
        style={{ width: 30, height: 30, marginLeft: 10 }}
      />
    )
  }),
  headerStyle: {
    backgroundColor: backgroundColor || window?.navigationBarBackgroundColor,
    shadowRadius: 0,
    elevation: 0,
    shadowOpacity: 0,
    shadowOffset: {
      height: 0
    }
  } as any,
  headerTitleStyle: {
    color: backgroundTextStyle === 'dark' ? '#fff' : '#000',
    fontSize: 18
  },
  title: title || ''
});

function App() {
  const [isReady, setIsReady] = useState(process.env.NODE_ENV === 'production');
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = getStorageSync('PERSISTENCE_KEY');
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  const [previewImages, setPreviewImages] = useState<IImageInfo[]>([]);
  const [previewImagesVisible, setPreviewImagesVisible] = useState(false);
  const [previewImagesCurrent, setPreviewImagesCurrent] = useState(0);
  appData.setPreviewImages = setPreviewImages;
  appData.setPreviewImagesVisible = setPreviewImagesVisible;
  appData.setPreviewImagesCurrent = setPreviewImagesCurrent;

  if (!isReady) {
    return null;
  }
  return (
    <ConfigProvider.Provider>
      <SafeAreaProvider>
        <PortalProvider>
          <Modal visible={previewImagesVisible} transparent={true}>
            <ImageViewer
              loadingRender={() => (
                <Text style={{ color: '#fff' }}>加载中...</Text>
              )}
              enableSwipeDown
              onCancel={() => setPreviewImagesVisible(false)}
              imageUrls={previewImages}
              index={previewImagesCurrent}
            />
          </Modal>
          <NavigationContainer
            initialState={initialState}
            onStateChange={state =>
              setStorageSync('PERSISTENCE_KEY', JSON.stringify(state))
            }>
            <Stack.Navigator>
              <Stack.Screen
                name='home'
                component={Tabs}
                options={({ route }) => {
                  const pagePath = getFocusedRouteNameFromRoute(route);
                  const {
                    text,
                    navigationBarBackgroundColor,
                    backgroundTextStyle,
                    navigationBarTitleText
                  } =
                    tabBar.list.find(({ path }) => path === pagePath) ||
                    tabBar.list[0];
                  return getScreenOptions({
                    title: navigationBarTitleText || text,
                    backgroundColor: navigationBarBackgroundColor,
                    backgroundTextStyle
                  });
                }}
              />
              {appConfig.pages?.map(
                ({
                  component,
                  path,
                  backgroundTextStyle = window?.backgroundTextStyle,
                  navigationBarBackgroundColor,
                  navigationBarTitleText
                }) => {
                  return (
                    <Stack.Screen
                      key={path}
                      name={path}
                      options={() =>
                        getScreenOptions({
                          backgroundColor: navigationBarBackgroundColor,
                          title: navigationBarTitleText
                        })
                      }>
                      {getPage(component, {
                        navigationBarBackgroundColor: navigationBarBackgroundColor,
                        barStyle:
                          backgroundTextStyle === 'light'
                            ? 'dark-content'
                            : 'light-content'
                      })}
                    </Stack.Screen>
                  );
                }
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </PortalProvider>
      </SafeAreaProvider>
    </ConfigProvider.Provider>
  );
}

export default App;
