module.exports = {
  preset: "ts-jest", // Handle TypeScript files
  testEnvironment: "jsdom",
  // Simulate a DOM environment for React testing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Recognize file extensions
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"], // Match test files
  transformIgnorePatterns: ["node_modules/(?!nanoid/)"],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)<span class="math-inline">':
      "<rootDir>/\\__mocks__/fileMock.js",
  },
};
