const {WebSocketServer} = require('ws')
const {watchFile} = require('./watchFile')

const fs = require("fs")

const ws = new WebSocketServer({port: 3001});

//! 监听前后端链接事件  回调接收一个connection实例
ws.on('connection', function (connection) {
    console.log('websocket连接成功,热更新准备就绪');
    watchFile('../src', async (event, path) => {
        console.log("path---->", path)
        if (event == "addDir") return
        const {groups: {key}} = /..\/src\/(?<key>.*).js/.exec(path)
        if (event === "unlink") return connection.send(JSON.stringify({key, type: 'remove'}));
        try {
            let file = fs.readFileSync(path, {encoding: "utf-8", flag: "r"})
            connection.send(JSON.stringify({key, data: file, type: 'change'}));
            console.log("key:", key)
        } catch (e) {
            console.log("读取文件发生错误：" + path, e)
        }
    })
});