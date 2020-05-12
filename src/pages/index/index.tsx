import * as React from 'react';
import { View, Text, Image } from 'remax/wechat';
import styles from './index.less';
import useApi, { StateObj } from '@/apis';

export default () => {
  const {
    data: { list }
  } = useApi.list({ initValue: { list: [] } });
  return (
    <View className={styles.app}>
      <View className={styles.header}>
        <Image
          src='https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*OGyZSI087zkAAAAAAAAAAABkARQnAQ'
          className={styles.logo}
        />
        <View className={styles.text}>
          编辑 <Text className={styles.path}>src/pages/index/index.js</Text>{' '}
          开始
        </View>
        {list.map(({ id, name, age, sex, state }) => (
          <View key={id}>
            {name} {age}岁 {sex} {StateObj[state]}
          </View>
        ))}
      </View>
    </View>
  );
};
