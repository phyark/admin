import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { resolve } from "path";

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), ".", dir);
};
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
  },
  // 插件
  plugins: [
    vue(),
    AutoImport({
      // 要转换的目标
      include: [
        /\.[tj]sx?$/, // .ts .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],

      // 全局导入
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          'axios': [
            ['default', 'axios']
          ]
        }
      ],

      // 为目录下的默认模块导出启用按文件名自动导入
      defaultExportByFilename: false,

      // 目录下模块导出的自动导入
      // 默认情况下，它只扫描目录下的一级模块
      dirs: [
        // './hooks',
        // './composables' // only root modules
        // './composables/**', // all nested modules
        // ...
      ],

      // 生成相应.d.ts文件的文件路径。
      // 本地安装 typescript 时 默认导入'/auto-imports.d.ts'
      // 设为 false 时禁用
      dts: 'src/types/auto-imports.d.ts',

      // 在vue模板中自动导入
      // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
      vueTemplate: false,

      // 自定义解析器, 与"unplugin-vue"组件兼容
      // see https://github.com/antfu/unplugin-auto-import/pull/23/
      resolvers: [
        /* ... */
      ],
      // 在其他导入导入结束时注入导入
      injectAtEnd: true,

      // 生成相应的.eslintrc-auto-import.json文件
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: false, // 默认 false
        filepath: './.eslintrc-auto-import.json', // 默认 `./.eslintrc-auto-import.json`
        globalsPropValue: true, // 默认 `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    })
  ],
  base: './',
  server: {
    host: "0.0.0.0",
    port: 3324
  }
});
