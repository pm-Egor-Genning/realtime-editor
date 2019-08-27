module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6
  },
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  globals: {
    expect: true
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ['warn', 'always'],
    'vue/script-indent': ['warn', 4, { 'baseIndent': 1 }],
    'comma-dangle': ['warn', 'always-multiline'],
    'no-unused-vars': ['warn'],
    'spaced-comment': ['warn'],
  },
  overrides: [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ]
};
