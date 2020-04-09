module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          assets: './src/assets',
          components: './src/components',
          constants: './src/constants',
          modules: './src/modules',
          styles: './src/styles',
          services: './src/services',
          utils: './src/utils',
          interfaces: './src/interfaces',
          styles: './src/styles',
          api: './src/api',
          test: './src/test',
          uses: './uses',
          'native-modules': './src/native-modules',
        },
        cwd: 'babelrc',
      },
    ],
  ],
};
