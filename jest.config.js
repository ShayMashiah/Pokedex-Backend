/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',         
  testEnvironment: 'node',   
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/tests/**/*.test.ts'], 
  transform: {
    '^.+\\.ts$': 'ts-jest',   
  },
  transformIgnorePatterns: ['/node_modules/'],
};
