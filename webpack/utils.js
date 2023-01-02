const child_process = require("child_process")

exports.openURL = function (url) {
    // 判断平台
    switch (process.platform) {
        // Mac 使用open
        case "darwin":
            child_process.spawn('open', [url]);
            break;
        // Windows使用start
        case "win32":
            child_process.spawn('start', [url]);
            break;
        // Linux等使用xdg-open
        default:
            child_process.spawn('xdg-open', [url]);
    }
};

