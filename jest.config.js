module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./src', './tests'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
