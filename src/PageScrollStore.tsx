import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';

export default createContainer(() => {
  const [scrollProps, setScrollProps] = useState<
    KeyboardAwareScrollViewProps & { need?: boolean }
  >({});
  return { scrollProps, setScrollProps };
});
