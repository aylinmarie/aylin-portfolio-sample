module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@data': './src/data',
          '@theme': './src/theme',
        },
      },
    ],
  ],
};
