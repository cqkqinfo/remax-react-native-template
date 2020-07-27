const less = require('@remax/plugin-less');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [less()],
  configWebpack({ config }) {
    // 详细配置参考 copy-webpack-plugin
    config
      .plugin('copy')
      .use(CopyPlugin, [[{ from: 'src/images', to: 'images' }]]);
  }
};
