module.exports = function (api) {
  api.cache(true);
  const isTest = process.env.NODE_ENV === "test";
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      // Use local wrapper instead of nativewind/babel to avoid react-native-worklets/plugin,
      // which is only needed for Reanimated 4 and is not resolvable in Metro's transform worker.
      ...(isTest ? [] : [require.resolve("./babel-preset-nativewind")]),
    ],
  };
};
