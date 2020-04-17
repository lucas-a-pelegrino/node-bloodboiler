module.exports = {
  verbose: true,
  testEnvironment: 'node',
  globalSetup: './src/config/jest/setup.jest.js',
  globalTeardown: './src/config/jest/teardown.jest.js',
  automock: false,
  clearMocks: false,
  restoreMocks: false,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'app.js', 'tests'],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'yml'],
  testPathIgnorePatterns: ['/node_modules/', '/config/'],
};
