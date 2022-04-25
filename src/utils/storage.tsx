import { storage } from '@kqinfo/ui';

/** 其中键为key类型，值为data的类型 */
type DataType = {
  token: string;
};

export default storage.create<DataType>({
  //格式化key值，如原始key为 name, 实际存储值为before-name-after
  formatKey: v => `before-${v}-after`,
  //异常处理器
  errorHandler: err => console.log(err)
});
