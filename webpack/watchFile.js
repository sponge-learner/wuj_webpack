const chokidar = require("chokidar")

exports.watchFile = function (dir, cb) {
    chokidar.watch(dir).on("all", (event, path) => {
        console.log("event--->", event);
        console.log("path--->", path);
        cb(event, path)
    })
}
