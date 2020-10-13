/**
 * 获取当前环境
 */
export const getWxEnv = () => {
  if (typeof __wxConfig === 'object') {
    return __wxConfig.envVersion;
  }
  return 'release';
};
