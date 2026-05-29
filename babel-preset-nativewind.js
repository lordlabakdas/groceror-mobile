// Local wrapper for nativewind/babel (react-native-css-interop/babel).
// The upstream includes "react-native-worklets/plugin" (Reanimated 4),
// but we're on Reanimated 3.x so we use "react-native-reanimated/plugin" instead.
module.exports = function () {
  return {
    plugins: [
      require("react-native-css-interop/dist/babel-plugin").default,
      [
        require.resolve("@babel/plugin-transform-react-jsx"),
        { runtime: "automatic", importSource: "react-native-css-interop" },
      ],
      require.resolve("react-native-reanimated/plugin"),
    ],
  };
};
