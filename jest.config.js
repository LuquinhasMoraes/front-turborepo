module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    globals: {
      "ts-jest": {
        tsConfig: "apps/web/tsconfig.json" // Directly target the tsconfig shared across projects
      }
    }
  };