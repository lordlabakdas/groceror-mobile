module.exports = function (api) {
  api.cache(true);
  const isTest = process.env.NODE_ENV === "test";
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    ],
    // Inline the two relevant parts of nativewind/babel (react-native-css-interop/babel)
    // but omit "react-native-worklets/plugin" — it's only needed for Reanimated 4
    // animated styles, which this project doesn't use.
    plugins: isTest
      ? []
      : [require("react-native-css-interop/dist/babel-plugin").default],
  };
};
