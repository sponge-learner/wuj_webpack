(function hotModuleReplace() {
    let ws = new WebSocket("ws://localhost:3001/");
    //监听建立连接
    ws.onopen = function (res) {
        console.warn('websocket连接成功,热更新准备就绪');
    }

    const fileData = {}
    //监听服务端发来的消息
    ws.onmessage = function (res) {
        // eval(res.data)
        const {key = "", data = "", type = "change", path = ""} = JSON.parse(res.data);

        if (type === "remove") delete fileData[key]

        fileData[key] = () => {
            eval(`${data}
            //# sourceURL=${path}`)
        }
        fileData[key]()

        // const file = document.getElementById(key)
        // if (file && type === "remove") return file.parentNode.removeChild(file)
        // // 判断脚本是否已存在
        // if (file) {
        //     file.text = data;
        // } else {
        //     let src = document.createElement('script')
        //     src.id = key
        //     src.text = data
        //     let head = document.getElementsByTagName('head')
        //     if (head.length > 0) head[0].append(src)
        // }
    }

})();