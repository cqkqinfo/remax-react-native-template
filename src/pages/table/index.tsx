import React, { useEffect, useState } from 'react';
import { Table, Space, PartTitle } from '@kqinfo/ui';

export default () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDataSource([
        { name: '项目名称1', result: 50, reference: 40, unit: 'U/L' },
        { name: '项目名称1', result: 50, reference: 40, unit: 'U/L' },
        { name: '项目名称1', result: 50, reference: 40, unit: 'U/L' },
        { name: '项目名称1', result: 50, reference: 40, unit: 'U/L' },
        { name: '项目名称1', result: 50, reference: 40, unit: 'U/L' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <Space vertical size={'10px'}>
      <PartTitle>基本用法</PartTitle>
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={[
          { title: '项目名称', dataIndex: 'name' },
          {
            title: '结果',
            dataIndex: 'result',
            render: v => <Space style={{ color: '#2780D9' }}>{v}</Space>
          },
          { title: '参考值', dataIndex: 'reference' },
          { title: '单位', dataIndex: 'unit' }
        ]}
      />
      <PartTitle>两端对齐</PartTitle>
      <Table
        align={'between'}
        loading={loading}
        dataSource={dataSource}
        columns={[
          { title: '项目名称', dataIndex: 'name' },
          {
            title: '结果',
            dataIndex: 'result',
            render: v => <Space style={{ color: '#2780D9' }}>{v}</Space>
          }
        ]}
      />
    </Space>
  );
};
