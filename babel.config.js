// babel.config.js
module.exports = {
  plugins: [
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
      }
    ],
    [
      'import',
      {
        libraryName: '@kqinfo/ui',
        libraryDirectory: 'es'
      },
      '@kqinfo/ui'
    ]
  ]
};
