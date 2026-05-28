module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/__tests__/**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": ["babel-jest", { configFile: "./babel.config.unit.js" }],
  },
};
