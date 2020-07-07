const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    /*修改窗口图标*/
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    // 关闭内置Eslint检查
    lintOnSave: false,
    // 打包输出路径
    // publicPath: process.env.NODE_ENV === 'production' ? '/test/guohua/' : '/',    //2019.9.16 zwh测试打包以后资源路径问题注释
    // // publicPath: './', //2019.9.16 zwh测试打包以后资源路径问题添加
    // productionSourceMap: false,//不要打包以后的map文件-zwh
    devServer: {
        // open: true, // 启动服务后是否打开浏览器
        // host: 'localhost',// 设置主机地址
        // port: 8080, // 设置默认端口
        //     https: false,
        //     hotOnly: false,
        proxy: {
            '/api': {     //这里最好有一个 /
                target: 'http://159.138.58.253:8080',  // 后台接口域名
                // target: 'http://139.159.224.207:60057',  // 后台接口域名
                // ws: true,        //如果要代理 websockets，配置这个参数
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
    //     before: app => {}
    // },
    //
    // /**这里之后，还有第一行的path是跟svg有关系的配置**/

    chainWebpack: config => {
        const svgRule = config.module.rule('svg')
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()
        svgRule
            .test(/\.svg$/)
            .include.add(path.resolve(__dirname, './src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        const fileRule = config.module.rule('file')
        fileRule.uses.clear()
        fileRule
            .test(/\.svg$/)
            .exclude.add(path.resolve(__dirname, './src/icons'))
            .end()
            .use('file-loader')
            .loader('file-loader')

        config.resolve.alias
            .set('@', resolve('src'))
            .set('@components', resolve('src/components'))
            .set('@static', resolve('src/static'))

    },
}




