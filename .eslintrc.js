module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['jest.setup.js', '__tests__/**', '**/*.test.*'],
      env: {
        jest: true,
      },
    },
  ],
};
