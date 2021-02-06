const less = require('@remax/plugin-less');
const sass = require('@remax/plugin-sass');
// const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  one: true,
  output: 'dist/' + process.env.REMAX_PLATFORM,
  plugins: [less(), sass()],
  configWebpack({ config }) {
    config.resolve.alias.merge({
      axios: path.resolve(__dirname, 'src/configs/apis/axios')
    });
    // 详细配置参考 copy-webpack-plugin
    // config.plugin('copy').use(CopyPlugin, [
    //   {
    //     patterns: [{ from: 'src/images', to: 'images' }]
    //   }
    // ]);
  }
};
