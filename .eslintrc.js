module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
	"no-tabs": 0,
	"no-empty": 1,
	"indent": [
		"error",
		"tab"
	],
	"arrow-parens": 0,
  },
};
