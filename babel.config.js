module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          components: './example/components',
          constants: './example/constants',
          modules: './example/modules',
          styles: './example/styles',
          services: './example/services',
          utils: './example/utils',
          interfaces: './example/interfaces',
          styles: './example/styles',
          api: './example/api',
          test: './example/test',
          uses: './uses',
          'native-modules': './example/native-modules',
        },
        cwd: 'babelrc',
      },
    ],
  ],
};
