import React from 'react';
import { WebView, useTitle } from '@kqinfo/ui';
import styles from './index.module.less';

export default () => {
  useTitle('百度');
  return <WebView src={'https://www.baidu.com/'} className={styles.webView} />;
};
