module.exports = function (w) {
  return {
    files: [
      "dist/**/*",
      //   "webpack-loader.js",
      "**/*.flyde",
      "src/**/*.ts",
      "src/**/*.tsx",
      "src/**/*.js",
      { pattern: "src/**/*.spec.ts", ignore: true },
      { pattern: "src/**/*.spec.tsx", ignore: true },
      "fixture/**",
      { pattern: "node_modules", ignore: true },
    ],

    tests: ["src/**/*.spec.ts", "src/**/*.spec.tsx"],
    env: {
      type: "node",
      params: {
        env: "NODE_PATH=fixture/node_modules",
      },
    },
  };
};
