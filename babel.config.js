const isNative = !['web', 'wechat'].includes(process.env.REMAX_PLATFORM);

module.exports = {
  env: {
    production: {
      plugins: ['transform-remove-console']
    }
  },
  plugins: [
    [
      'import',
      {
        libraryName: '@kqinfo/ui',
        libraryDirectory: 'es'
      },
      '@kqinfo/ui'
    ],
    ...(isNative
      ? [
          [
            'module-resolver',
            {
              root: ['./src'],
              extensions: [
                '.ios.ts',
                '.android.ts',
                '.ts',
                '.ios.tsx',
                '.android.tsx',
                '.tsx',
                '.jsx',
                '.js',
                '.json'
              ],
              alias: {
                remax: 'remax-rn/src',
                classnames: 'remax-rn/src/utils/classNames',
                'antd-mobile': '@ant-design/react-native',
                '@': './src/'
              }
            }
          ],
          'react-native-classname-to-dynamic-style',
          [
            'react-native-platform-specific-extensions',
            {
              extensions: ['less']
            }
          ],
          [
            'babel-plugin-inline-import',
            {
              extensions: ['.svg']
            }
          ],
          ['import', { libraryName: '@ant-design/react-native' }]
        ]
      : [])
  ],
  presets: isNative ? ['module:metro-react-native-babel-preset'] : []
};
