// babel.config.js
if (process.env.REMAX_PLATFORM) {
  module.exports = {
    plugins: [
      [
        'import',
        { libraryName: '@kqinfo/ui', libraryDirectory: 'es' },
        '@kqinfo/ui'
      ],
      [
        'import',
        {
          libraryName: 'parsec-hooks',
          camel2DashComponentName: false,
          customName: name => {
            if (/^(use)/.test(name)) {
              return `parsec-hooks/lib/${name
                .replace(/^(use)/, '')
                .replace(/^\S/, s => s.toLowerCase())}Hooks`;
            } else {
              return `parsec-hooks/lib/utils/${name}`;
            }
          }
        },
        'parsec-hooks'
      ]
    ]
  };
} else {
  module.exports = {
    env: {
      production: {
        plugins: ['transform-remove-console']
      }
    },
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
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
            remax: 'remax-rn/es',
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
      ['import', { libraryName: '@ant-design/react-native' }],
      [
        'import',
        { libraryName: '@kqinfo/ui', libraryDirectory: 'es' },
        '@kqinfo/ui'
      ],
      [
        'import',
        {
          libraryName: 'parsec-hooks',
          camel2DashComponentName: false,
          customName: name => {
            if (/^(use)/.test(name)) {
              return `parsec-hooks/lib/${name
                .replace(/^(use)/, '')
                .replace(/^\S/, s => s.toLowerCase())}Hooks`;
            } else {
              return `parsec-hooks/lib/utils/${name}`;
            }
          }
        },
        'parsec-hooks'
      ]
    ]
  };
}
