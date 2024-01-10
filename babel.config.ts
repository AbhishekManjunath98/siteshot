module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};

// module.exports =  {
//   presets: ["@babel/preset-react"],
//   overrides: [
//     {
//       test: "*.vue",
//       presets: [["@babel/preset-typescript"], { ignoreExtensions: false }],
//     },
//   ],
// };
