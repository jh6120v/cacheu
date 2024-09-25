module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text', 'lcov', 'json'],
};
