// jest.config.js
module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|nativewind|tailwindcss)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};
