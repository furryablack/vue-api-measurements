module.exports = {
  testRegex: ".*\\.test\\.ts$",
  moduleFileExtensions: ["js", "ts"],
  modulePaths: ["<rootDir>/src", "<rootDir>/node_modules"],
  transformIgnorePatterns: ["/node_modules/"],

  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],

  coverageDirectory: "coverage",
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts}"],
  coveragePathIgnorePatterns: ["^.+\\.d\\.ts$"],
  cacheDirectory: "<rootDir>/tmp/cache/jest",
  timers: "fake",
  testEnvironment: "jsdom",
};
