module.exports = {
  root: true,
  env: {
    browser: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  plugins: ['html'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};
