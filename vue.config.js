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