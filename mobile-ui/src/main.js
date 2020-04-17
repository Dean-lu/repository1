// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// vuex
import store from './store'

import $ from 'jquery'

// import SignCanvas from 'sign-canvas';
// Vue.use(SignCanvas);

import "./assets/css/iconfont.css";

import shareApi from '@/common/until';
Vue.prototype.$shareApi=shareApi;

// h5转pdf依赖
import html2Canvas from 'html2canvas'
Vue.prototype.$html2Canvas = html2Canvas

// 移动端自动适配
import 'lib-flexible'

// 按需引入vant
import {Button, Col, Row, Icon, Divider, Swipe, SwipeItem, NoticeBar, Grid, GridItem,
Tabbar, TabbarItem, List, Cell, CellGroup, NumberKeyboard, Image, Field, Form, Toast,
Notify, NavBar, Area, Popup, Picker, Uploader, Checkbox, CheckboxGroup, Lazyload,
ImagePreview, ActionSheet, Radio, RadioGroup, Calendar, Search, Tab, Tabs } from 'vant';

Vue.use(Button).use(Col).use(Row).use(Icon).use(Divider).use(Swipe).use(SwipeItem)
.use(NoticeBar).use(Grid).use(GridItem).use(Tabbar).use(TabbarItem).use(List).use(Cell)
.use(CellGroup).use(NumberKeyboard).use(Image).use(Field).use(Form).use(Toast).use(Notify)
.use(NavBar).use(Area).use(Popup).use(Picker).use(Uploader).use(Checkbox).use(CheckboxGroup)
.use(Lazyload, {lazyComponent: true}).use(ImagePreview).use(ActionSheet).use(Radio).use(RadioGroup)
.use(Calendar).use(Search).use(Tab).use(Tabs);

// axios
import axios from "axios";
import qs from "qs";
axios.defaults.baseURL = store.state.global.baseUrl;
Vue.prototype.$http = axios;

let search = window.location.search.replace('?','')
let urlParam = {}
if(search != ''){
  urlParam = qs.parse(search);
  console.log(urlParam);
  store.state.global.urlParam = urlParam;
}
// 获取LocalStorage参数
if(localStorage.getItem('api_token')){
  store.state.global.api_token = localStorage.getItem('api_token');
  localStorage.removeItem('api_token')
}
if(localStorage.getItem('openid')){
  store.state.global.openid = localStorage.getItem('openid');
  localStorage.removeItem('openid')
}
if(localStorage.getItem('pid')){
  store.state.global.pid = localStorage.getItem('pid');
  localStorage.removeItem('pid')
}



// 路由守卫：全局api_token为空，强制去登陆
router.beforeEach((to,from,next)=>{
  if(to.path == '/' || to.path == '/home' || to.path == '/login' || to.path == '/register' || to.path == '/resetPassword' || to.path == '/salesLogin' 
    || to.path == '/editHouseInfo' || to.path == '/entrustHouseInfo' || to.path == '/entrustHouseSource' || to.path == '/houseDetail' || to.path == '/more' || to.path=='/houseSourceCenter'  || store.state.global.api_token){
    next();
  }else{
    Vue.prototype.$toast('您还没有登录，请先登录');
    next('/login'); 
  }
})

/* 开发环境vconsole */
import VConsole  from  'vconsole'
// if (process.env.NODE_ENV === "development"){
  const vConsole = new VConsole()
  //}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
