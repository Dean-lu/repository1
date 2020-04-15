//分享
import Axios from 'axios'
export const wxShare=function({link}){
    let that=this;
    this.$http.post(this.$store.state.global.baseUrl + "base/share",{
        api_token:this.$store.state.global.api_token
      }).then(
        res=>{
            if(res.data.code==200){
                var share_config = res.data.app;                
                this.$store.state.global.pidshare=res.data.pid;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。　　
                    appId: share_config.appId, // 必填，公众号的唯一标
                    timestamp: share_config.timestamp, // 必填，生成签名的时间戳
                    nonceStr: share_config.nonceStr, // 必填，生成签名的随机串
                    signature: share_config.signature,// 必填，签名
                    jsApiList: [
                        'updateAppMessageShareData',
                        'updateTimelineShareData',
                    ] // 必填，需要使用的JS接口列表
                });
                //通过ready接口处理成功验证
                wx.ready((res) => {   //需在用户可能点击分享按钮前就先调用
                    wx.updateAppMessageShareData ({
                        title: '爆米花房管家', // 分享标题  
                        desc:"您身边的租房专家", // 分享描述
                        //link: window.location.href,
                        imgUrl: 'https://house.growingsale.cn/images/share.jpg', // 分享图标
                        link: link||window.location.href,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        success: function () {
                        }
                    })
                    wx.updateTimelineShareData({
                        title: '爆米花房管家', // 分享标题  
                        desc:"您身边的租房专家", // 分享描述
                        //link: window.location.href,
                        imgUrl: 'https://house.growingsale.cn/images/share.jpg', // 分享图标
                        link: link||window.location.href,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        success: function () {
                        }
                    })
                });
            }
        }
    )
}