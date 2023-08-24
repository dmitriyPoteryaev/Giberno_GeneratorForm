/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
  moduleDirectories: ["node_modules", "<rootDir>"],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
  },
  testEnvironmentOptions: {
    url: "http://localhost:3000",
  },

  moduleNameMapper: {
    "^@modules/(.*)": "<rootDir>/src/modules/$1",
    "^@components/(.*)": "<rootDir>/src/components/$1",
    "^@config/(.*)": "<rootDir>/src/config/$1",
    "^@styles/(.*)": "<rootDir>/src/styles/$1",
    "^@app/(.*)": "<rootDir>/src/App/$1",
    "^@utils/(.*)": "<rootDir>/src/utils/$1",
    "^@shared/(.*)": "<rootDir>/src/shared/$1",
    "^@assets/(.*)": "<rootDir>/src/assets/$1",
    "^@api/(.*)": "<rootDir>/src/api/$1",
    "^@hooks/(.*)": "<rootDir>/src/hooks/$1",
    "^@store/(.*)": "<rootDir>/src/store/$1",
    "\\.(css|less)$": "<rootDir>/styleMock.js",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/fileMock.js",
  },
};
