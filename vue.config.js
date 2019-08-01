const  appData= require('./data.json')
const seller = appData.seller
const goods= appData.goods

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: false,
      theme: false
    }
  },
  devServer:{
    port: 8085, // 端口号
    host: "0.0.0.0",
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    before(app){
      app.get('/api/seller',function (req,res) {
        res.json({
          errno:0,
          data: seller
        })
      })
      app.get('/api/goods',function (req,res) {
        res.json({
          errno:0,
          data: goods
        })
      })
    }
  }
}
