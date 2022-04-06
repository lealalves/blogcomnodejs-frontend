module.exports = {
  devServer: {
    proxy: {
      "^/api/": {
        target: process.env.VUE_APP_URL,
        pathRewrite: { "^/api/": "" },
        changeOrigin: true,
        logLevel: "debug"
      }
    }
  }
};