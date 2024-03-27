module.exports = {
  preset: 'react-native',
  "setupFiles": [
    "<rootDir>/src/jestSetup.tsx",

    "./node_modules/react-native-gesture-handler/jestSetup.js",

  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!react-native|react-navigation)/"
  ]
};
