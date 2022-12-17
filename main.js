
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
/**
 * 请求包的加载
 */
import {$http}from"@escook/request-miniprogram"
/**
 * @param {Object} option挂载到uni实例
 */
uni.$http=$http;

/**
 * 设置请求根路径
 */
$http.baseUrl= 'https://api-hmugo-web.itheima.net'
/**
 * @param {Object} option请求拦截器
 */
$http.beforeRequest=function(option){
	uni.showLoading({
		title:"数据请求中...",
		
	})
}
/**
 * @param {Object} option请求之后
 */
$http.afterRequest=function(option){
	uni.hideLoading()
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif