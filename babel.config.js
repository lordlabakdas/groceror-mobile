// babel.config.js
module.exports = function (api) {
  api.cache(true);
  // nativewind/babel re-exports react-native-css-interop/babel which
  // unconditionally includes "react-native-worklets/plugin". Skip it in the
  // test environment since jsxImportSource handles the NativeWind JSX runtime.
  const isTest = process.env.NODE_ENV === "test";
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      ...(isTest ? [] : ["nativewind/babel"]),
    ],
  };
};
