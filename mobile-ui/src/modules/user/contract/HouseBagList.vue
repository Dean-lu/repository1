<template>
    <div class="main">
        <!-- <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" /> -->
    
    <div id="listConter" v-if="houseList=='submit'">
        <h2>房屋清单描述：</h2>
         <textarea
          name="advice"
          v-model="listdec"
          id="advice"
          cols="30"
          rows="10"
          placeholder="请写下您的房屋清单"
        ></textarea>        
        <h2>房屋物品照片：</h2>      

        <div class="pic-area">            
            <div class="manyPic">
              <div class="uploader-item" v-for="(item,index) in house_img" :key="index">
                <img :src="item"  alt="图片" class="imgPreview">
                <van-icon name="close" @click="delImg(index)" class="delte"/>
              </div>
              <div class="imgTips" v-if="showTips">                 
                  图片正在上传......
                </div>
                <div class="manyImgBtn" @click="changeImg">
                  <van-icon name="plus" />
                </div>
              <!-- <van-uploader :after-read="afterZRead" :accept="'image/*'"  /> -->
            </div> 
        </div>   
        <button class="btnOrange" @click="submitList"> 提交 </button>
    </div>
    <!-- <div class="listConter" v-if="houseList=='haveBag'">

    </div> -->
        <div class="listConter" v-if="houseList=='end'">
           <img class="face" src="data:image/png;base64,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" alt="">
           <p class="tips">您的清单已提交成功！</p>
        </div>
       
    </div>
</template>
<script>
 // import shareApi from '../../../common/until'
export default {
    name:'HouseBagList',
    data(){
        return {
            houseList:'submit',
            title:"房屋清单",
            listdec:'',
            house_img:[],
            showTips:false         
        }
    },
    mounted() {
      document.title = "房屋清单";
      this.share();
      if(sessionStorage.getItem("orderId")){
        this.$store.state.locale.contractId=sessionStorage.getItem("orderId");
      }else{
        this.$router.back(-1);
      }
    },
    methods:{
      share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
        submitList(){
            if(!this.listdec || this.houseImg){
                 this.$toast("请填写入住清单描述或图片");
                 return false;
            }
            console.log(this.$store.state.locale.contractId);
              let parms={
                api_token:this.$store.state.global.api_token,
                order_id:this.$store.state.locale.contractId,
                house_items:this.listdec,
                house_items_imgs:this.house_img
              }
             let that = this;
            //  let config = {
            //     headers:{'Content-Type':'multipart/form-data'}
            //   }; 
        this.$http.post(this.$store.state.global.baseUrl + 'user/check_in', parms).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.houseList="end";
            }else{
              that.$toast(res.data.msg);
            }
            
          }else{
            that.$toast('房屋清单提交失败，请重试！');            
            // setTimeout(() => {
            //     this.$router.back(-1);
            // }, 1000);
            return;
          }
        });
        }, 
         changeImg(){
         let that=this;
          wx.chooseImage({
            count: 1, //张数， 默认9
            sizeType: ["compressed"], //建议压缩图
            sourceType: ["album", "camera"], // 来源是相册、相机
            success: function (res) {
              that.showTips=true;          
              that.uploadToWeixinServer(res.localIds[0]);
            }
          });
      },
      uploadToWeixinServer(localId) {
        let that = this;
        wx.uploadImage({
          localId: localId,
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            //res.serverId 返回图片的微信服务器端ID
            // self.add_vip.serverId = res.serverId;
            console.log(res);
            let serverId=res.serverId;
             that.$http.post(that.$store.state.global.baseUrl + 'entrust/watermark', {media_id:serverId}).then(res => {
              console.log(res)
              if(res.status == 200) {
                if(res.data.code == 200){
                  let src=res.data.data;                  
                  that.house_img.push(src);  
                  console.log(that.house_img);                     
                  that.showTips=false;                     
                }else{
                  that.showTips=false; 
                  that.$toast(res.data.msg);
                }
              }else{
                 //提示隐藏
                that.showTips=false;
                that.$toast('上传图片失败，请重新选择图片！');
                return;
              }
            });
          }
        });
      },      
      //多图上传
      afterZRead(file){
          //this.house_showImg=this.house_showImg;
          this.showTips=true;
          this.watermark(file.file);         
      },
      //水印
      watermark(res){
        console.log("res",res)
        let fileMain=res;
        let param=new FormData;
        param.append("api_token", this.$store.state.global.api_token),
        param.append("file",fileMain)         
        let that=this;
        this.$http.post(this.$store.state.global.baseUrl + 'entrust/watermark', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
             console.log(res.data.data);              
              let src=res.data.data;
              that.house_img.push(src);
              console.log(that.house_img); 
              that.showTips=false;  
            }else{
              that.$toast(res.data.msg);
              that.showTips=false;
            }
          }else{
            that.$toast('获取图片失败，请刷新重试！');  
            that.showTips=false;          
            return;
          }
        });
      }, 
      //删除图片
      delImg(index){
       console.log(index);
        if(isNaN(index) || index >= this.house_img.length){
          return false;
        }
         let tmp = [];        
        for(let i=0,len = this.house_img.length;i<len;i++){
          if (i!=index) {
            tmp.push(this.house_img[i]);            
          }
        }
        this.house_img = tmp;       
      },     
      //返回上一页
        onClickLeft() {
            this.$router.back(-1);
        }
        
    }
}
</script>
<style lang="less" scoped>
.main .van-nav-bar .van-icon,
  .main .van-nav-bar__title{
    color:#FFB640;
  }
.main .van-nav-bar{
    border-bottom: .11rem solid #f5f5f5;
  }
.main{
    // padding-top:1.2rem;
    box-sizing:border-box;
    width:100%;
    #listConter{
        width:90%;
        margin:0 auto;
        text-align: left;
        textarea{
            width:100%;
            margin:0 auto;
            padding:0.1rem;
            border:1px solid #888;
            box-sizing: border-box;
        }
        h2{
            font-size:0.4rem;            
        }
    }   
    .addimg{
        width:30%;
    }
    .btnOrange{
        width:60%;
        margin:0.8rem auto;
        color:#fff;
        border:0 none;
        background: #f7b343;
        line-height:0.8rem;
        border-radius: 0.2rem;
        display: block;
    }
    .pic-area{position:relative;}
    /deep/.delte{
    position:absolute;
    right:8%;
    top: 2%;
    font-size: 0.6rem;
    color:#fff;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
  }
  .pic-area img{width:85%; margin-bottom:0.5rem;}
  .listConter img{width:22%;margin:2.5rem auto 0.4rem auto;}
  .tips{text-align: center; color:#666; font-size: 0.5rem;}
  .uploader-item{
    position:relative;
    float:left;
    width:2.5rem; 
    height:2.5rem;
    margin-right:0.2rem;
    margin-top:0.2rem;
    overflow:hidden;
    
    img{width:2.5rem; height:2.5rem;}
    }
  .imgTips{
    float: left;
    height:2.5rem;
    width:2.5rem;
    font-size:0.4rem;
    color:#fff;
    Justify-content:center;  // 子元素水平居中 
    align-items:center;       //子元素垂直居中    
    display:-webkit-flex;   
    padding:0 0.1rem;
    box-sizing: border-box;
    background:rgba(0,0,0,0.4);
    margin-right:0.2rem;
  }

}
.manyPic{
  width:95%; margin:0.5rem auto; position:relative;
  display: block;
  overflow: hidden;
}
.manyImgBtn{
    background:#f3f3f3;
    width:2.5rem;
    height:2.5rem;
    align-items: center;
    justify-content: center; 
    font-size:2rem;
    line-height:3rem;
    float:left;
    margin-right:0.2rem;
    margin-top:0.2rem;
    text-align: center;
    /deep/ .van-icon{
      color:#ccc
    }
}
</style>