import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

//引入SVG需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/

//mock插件提供的方法
import {viteMockServe} from 'vite-plugin-mock'
export default defineConfig(({command})=>{  //command用于获取当前开发的环境
  return{
    plugins: [vue(), 
      createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    viteMockServe({
      localEnabled: command === 'serve',  //保证开发阶段可以使用mock接口
    })
  ],
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
    },
    //scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  }
})
