import { StackScreenProps } from '@react-navigation/stack';
import { IImageInfo } from 'react-native-image-zoom-viewer/src/image-viewer.type';

const appData = {
  headerHeight: 0,
  navigatorProps: {} as StackScreenProps<any, any>,
  tabBarNavigatorProps: {} as StackScreenProps<any, any>,
  setPreviewImages: {} as (imgs: IImageInfo[]) => void,
  setPreviewImagesVisible: {} as (visible: boolean) => void,
  setPreviewImagesCurrent: {} as (current: number) => void
};

export default appData;
