//分享
import Vue from 'vue'
import App from '../App'
import router from '../router'
// axios
import axios from "axios";
import qs from "qs";
// axios.defaults.baseURL = store.state.global.baseUrl;
// Vue.prototype.$http = axios;
import $ from 'jquery'
// vuex
import store from '../store'



var myfunction = { 
    wxShare:function({link}){       
    axios.post(store.state.global.baseUrl + "base/share",{
        api_token:store.state.global.api_token,
        hrefurl:window.location.href
      }).then(
        res=>{
            console.log(res);            
                var share_config = res.data.app;                                
                var pid_share=res.data.pid;  
                console.log(res.data.app)              
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。　　
                    appId: share_config['appId'], // 必填，公众号的唯一标
                    timestamp: share_config['timestamp'], // 必填，生成签名的时间戳
                    nonceStr: share_config['nonceStr'], // 必填，生成签名的随机串
                    signature: share_config['signature'],// 必填，签名
                    jsApiList: [
                        'updateAppMessageShareData',
                        'updateTimelineShareData',
                        "chooseImage", //拍照或从手机相册中选图接口
                        "previewImage", //预览图片接口
                        "uploadImage", //上传图片接口
                        "downloadImage" //下载图片接口
                    ] // 必填，需要使用的JS接口列表
                });
                //通过ready接口处理成功验证
                wx.ready((res) => {   //需在用户可能点击分享按钮前就先调用
                    wx.updateAppMessageShareData ({
                        title: '爆米花房管家', // 分享标题  
                        desc:"您身边的租房专家", // 分享描述
                        //link: window.location.href,
                        imgUrl: 'https://house.growingsale.cn/images/share.jpg', // 分享图标
                        //link: link||window.location.href,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        link:'https://house.growingsale.cn/wxindex/'+pid_share,
                        success: function () {
                        }
                    })
                    wx.updateTimelineShareData({
                        title: '爆米花房管家', // 分享标题  
                        desc:"您身边的租房专家", // 分享描述
                        //link: window.location.href,
                        imgUrl: 'https://house.growingsale.cn/images/share.jpg', // 分享图标
                        link:'https://house.growingsale.cn/wxindex/'+pid_share,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        success: function () {
                        }
                    })
                });
            
        }
    )
}
}

export default myfunction
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })