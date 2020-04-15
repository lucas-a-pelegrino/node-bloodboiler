module.exports = {
  verbose: true,
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  globalSetup: './src/config/jest/setup.jest.js',
  globalTeardown: './src/config/jest/teardown.jest.js',
  automock: false,
  clearMocks: false,
  restoreMocks: false,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'app.js', 'tests'],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'yml'],
  resetModules: true,
  testPathIgnorePatterns: ['/node_modules/', '/config/'],
};
