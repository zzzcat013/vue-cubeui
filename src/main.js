import Vue from 'vue'
import  './cube-ui'
import App from './App.vue'
import router from './route'
import axios from 'axios'        //引入组件
import store from './store'  //在main.js中引用新建的store.js,并在实例化 Vue对象时加入 index 对象
import VueCookies from 'vue-cookies'
import SvgIcon from 'vue-svgicon'


// Default tag name is 'svgicon'
Vue.use(SvgIcon, {
    tagName: 'svg-icon'
})
Vue.use(VueCookies)

//Vue.prototype.$axios = axios     //全局注册
import Vueaxios from 'vue-axios' //引入组件
Vue.use(Vueaxios, axios)         //全局注册

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,//使用store
    render: h => h(App)
})//.$mount('#app');
