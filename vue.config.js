module.exports = {
  "publicPath": "./",
  "runtimeCompiler": false,
  "productionSourceMap": true,
  "parallel": true,
  "devServer": {
    "host": "0.0.0.0",
    "port": 8080,
    "https": false,
    "hotOnly": true,
  },
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config.module
      .rule('js')
      .exclude
      .add(/node_modules\/three\/build\/three.module.js/)
      .add(/public\/lib\/three.js/)
      .add(/public\/lib\/SVGLoader.js/)
      .add(/public\/lib\/state-machine.js/);
  }
}