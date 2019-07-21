module.exports = {
    publicPath: '', // 部署域名的子路径，尽量避免相对路径
    outputDir: 'dist', // 打包后生成的文件目录
    lintOnSave: false,
    // lintOnSave: process.env.NODE_ENV !== 'production',
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        host: '0.0.0.0',
        port: '8020' // 监听端口
    },
    productionSourceMap: false // 生产环境不生成source map,加速生产环境构建
}
