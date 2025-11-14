const path = require('path')

module.exports = {
  "publicPath": "./",
  "runtimeCompiler": false,
  "productionSourceMap": false,
  "parallel": true,
  "devServer": {
    "host": "0.0.0.0",
    "port": 8080,
    "https": false,
    "hotOnly": true,
    before: function(app, server) {
      const fs = require('fs')
      app.get('/twha/', function(req, res) {
        res.sendFile(path.join(__dirname, 'twha/index.html'))
      })
      app.get('/twha/*', function(req, res, next) {
        const relativePath = req.path.replace('/twha', '')
        const filePath = path.join(__dirname, 'twha', relativePath)
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          res.sendFile(filePath)
        } else {
          next()
        }
      })
    },
  },
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config.module
      .rule('js')
      .exclude
      .add(/src\/lib\/three.module.js/)
      .add(/src\/twha\/js\/regions.js/)
      .add(/node_modules\/three\/build\/three.module.js/)
      .add(/public\/lib\/three.js/)
      .add(/public\/lib\/SVGLoader.js/)
      .add(/public\/lib\/state-machine.js/);
  }
};