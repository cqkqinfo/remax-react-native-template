import React from 'react';
import { Button, Space, PartTitle } from '@kqinfo/ui';

export default () => (
  <Space vertical size={'10px'}>
    <PartTitle>横排分割</PartTitle>
    <Space size={'10px'} flexWrap={'nowrap'}>
      <Button block={false}>1</Button>
      <Button>2</Button>
      <Button type={'primary'}>3</Button>
    </Space>
    <PartTitle>竖排分割</PartTitle>
    <Space vertical size={'10px'} alignItems={'flex-start'}>
      <Button block={false}>1</Button>
      <Button>2</Button>
      <Button type={'primary'}>3</Button>
    </Space>
    <PartTitle>构建列表子项布局</PartTitle>
    <Space
      size={'10px'}
      style={{ backgroundColor: '#fff', color: '#333' }}
      alignItems={'center'}>
      <Space style={{ backgroundColor: '#eee', width: 50, height: 50 }} />
      <Space flex={1} size={'10px'} vertical>
        <Space>名称</Space>
        <Space>描述</Space>
      </Space>
      <Space style={{ marginRight: 10 }}>操作</Space>
    </Space>
    <PartTitle>网格布局</PartTitle>
    <Space ignoreNum={4} flexWrap={'wrap'} size={'14px'}>
      {new Array(6).fill(0).map((_, i) => (
        <Space
          vertical
          style={{ width: '21%' }}
          size={'10px'}
          alignItems={'center'}>
          <Space
            style={{ width: '100%', height: '50px', backgroundColor: '#eee' }}
          />
          <Space
            style={{
              width: '100%',
              height: '10px',
              backgroundColor: '#eee',
              marginBottom: '20px'
            }}
          />
        </Space>
      ))}
    </Space>
  </Space>
);
