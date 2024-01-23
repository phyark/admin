module.export = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    './.eslintrc-auto-import.json',
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended', // 添加prettier插件，确保代码格式化正确。
  ],
  rules: {
    'prettier/prettier': 'error',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
}
