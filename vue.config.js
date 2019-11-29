const path = require('path')
const resolve = dir => path.join(__dirname,dir);

module.exports = {
    lintOnSave : false,
    chainWebpack:config =>{
        config.resolve.alias
            .set("@",resolve("src"))
            .set("_c",resolve("src/components"))
    },
    productionSourceMap: false, //打包时,不生成.map文件
    devServer: {
        port: 9191, // 端口号
        host: 'localhost',
        https: false,
        open: true, 
    }
};
