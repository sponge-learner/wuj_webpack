module.exports = {
    proxy: {
        targets: {
            '/api/(.*)': {
                target: "https://blog.csdn.net/lihefei_coder/article/details/122078971",
                changeOrigin: true,
            }
        }
    }
}