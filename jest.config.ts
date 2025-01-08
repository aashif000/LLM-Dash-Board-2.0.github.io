module.exports = {
  preset: 'ts-jest', // Required for TypeScript files
  testEnvironment: 'jest-environment-jsdom', // Correct test environment
  setupFilesAfterEnv: ['./src/test/setup.ts'], // Global setup file
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { isolatedModules: true }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Module alias for the src folder
    '\\.(css|less)$': 'identity-obj-proxy', // Mock CSS/LESS files
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
};
