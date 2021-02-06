// postcss.config.js
module.exports = ({ options }) => {
  const plugins = {};
  Object.keys(options.plugins).forEach(i => {
    if (!/postcss-px2units/.test(i)) {
      plugins[i] = options.plugins[i];
    }
  });
  return {
    plugins: {
      // 继承 remax 默认的插件配置
      ...plugins,
      'postcss-px-to-viewport': {
        viewportWidth: 750,
        exclude: /(antd-mobile)/
      }
    }
  };
};
