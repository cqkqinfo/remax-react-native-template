import React from 'react';
import { Icon, Space, FormItem, TabBar, Platform } from '@kqinfo/ui';
import { navigateTo } from 'remax/one';

const tabData = [
  {
    icon: <Icon name={'kq-search'} />,
    index: 0,
    title: '首页'
  },
  {
    icon: <Icon name={'kq-loading'} />,
    index: 1,
    title: '工作台'
  },
  {
    icon: <Icon name={'kq-down'} />,
    index: 2,
    title: '我的'
  }
];

export default () => (
  <Space
    style={{ backgroundColor: '#fff', padding: '0 5px', minHeight: '100vh' }}
    vertical>
    <FormItem
      cell
      label={'表单组件'}
      onTap={() => navigateTo({ url: '/pages/form/index' })}
      after={<Icon name={'kq-right'} color={'#666'} />}
    />
    <FormItem
      cell
      label={'表格'}
      onTap={() => navigateTo({ url: '/pages/table/index' })}
      after={<Icon name={'kq-right'} color={'#666'} />}
    />
    <FormItem
      cell
      label={'空间间隔'}
      onTap={() => navigateTo({ url: '/pages/space/index' })}
      after={<Icon name={'kq-right'} color={'#666'} />}
    />
    <FormItem
      cell
      label={'测试'}
      onTap={() => navigateTo({ url: '/pages/test/index' })}
      after={<Icon name={'kq-right'} color={'#666'} />}
    />
    <Platform platform={['web']}>
      <Space flex={1} />
      <TabBar items={tabData} />
    </Platform>
  </Space>
);
