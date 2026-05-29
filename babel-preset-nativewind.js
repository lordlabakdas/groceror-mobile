// Local wrapper for nativewind/babel that omits react-native-worklets/plugin.
// That plugin is only needed for Reanimated 4 animated styles; this project
// doesn't use Reanimated so we drop it to avoid the missing-module error.
module.exports = function () {
  const cssInteropPlugin = require("react-native-css-interop/dist/babel-plugin").default;
  return {
    plugins: [
      cssInteropPlugin,
      [
        require.resolve("@babel/plugin-transform-react-jsx"),
        { runtime: "automatic", importSource: "react-native-css-interop" },
      ],
    ],
  };
};
