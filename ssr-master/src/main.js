import Vue from 'vue'
import App from './App'
import WXrequest from './utils/request'
Vue.prototype.axios = WXrequest
Vue.config.productionTip = false
App.mpType = 'app'

// let domains = 'http://zhong.waterai.cn'; //测试地址
let domains = 'https://zhong.waterai.cn'; //正式地址
Vue.prototype.domains = domains;

const app = new Vue(App)
app.$mount()
