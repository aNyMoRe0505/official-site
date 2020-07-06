module.exports = {
  bail: true,
  moduleFileExtensions: ['jsx', 'js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};
