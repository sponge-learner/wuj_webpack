#! /usr/bin/env node

const proxy = require('koa2-proxy-middleware');
const utils = require("./utils")
const koaStatic = require("koa-static")
const Koa = require("koa")
const fs = require('fs')
const path = require("path")


let webpackConfig = null;
try {
    webpackConfig = require('../webpack.config')
} catch (e) {
    console.error('未发现webpack.config.js文件')
}


require('./hotUpdata')

const app = new Koa();
app.use(koaStatic("../public", {extensions: ["html"]})) //访问静态html文件

if (webpackConfig) {
    if (webpackConfig?.proxy) {
        console.log(webpackConfig.proxy)
        app.use(proxy(webpackConfig.proxy))
        // logger
        app.use(async (ctx, next) => {
            console.log(ctx.url)
            ctx.set("Access-Control-Allow-Origin", "*");
            if (ctx.url == "/") {
                await next();
            } else {
                console.error('日志处理')
                // const html = await fs.readFileSync(path.resolve(__dirname + "/public/index.html"));
                // ctx.body = html.toString();
            }

        })

        // error-handling
        app.on('error', (err, ctx) => {
            console.error('server error', err, ctx)
        });

    }
}


app.listen(3000, () => {
    utils.openURL("http://127.0.0.1:3000")
    console.log("服务已启动")
})
