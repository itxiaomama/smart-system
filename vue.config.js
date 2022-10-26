const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/admin/',
  devServer: {
    proxy: {
      // 配置跨域
      '/api': {
        target: 'https://park.cngiantech.com/api/', // 接口的域名
        ws: true, // 是否启用websockets
        changOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    // host: '192.168.0.159',
    // port: 8080
  },
})
// // 引入等比适配插件
// const px2rem = require('postcss-px2rem')

// // 配置基本大小
// const postcss = px2rem({
//   // 基准大小 baseSize，需要和rem.js中相同
//   remUnit: 16
// })

// // 使用等比适配插件
// module.exports = {
//   lintOnSave: true,
//   css: {
//     loaderOptions: {
//       postcss: {
//         plugins: [
//           postcss
//         ]
//       }
//     }
//   }
// }
