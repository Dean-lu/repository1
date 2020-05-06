<template>
  <div class="house-detail">
    <!-- <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" /> -->
    <div class="swipe">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in houseDetail.house_img" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="house-info">
      <div class="house-Main clearfix">
        <div class="float-left house-price">{{houseDetail.deposit}}元/月</div>
        <div class="float-right">{{houseDetail.pay_style_desc}}</div>
      </div>
      <div class="text-align-left black-text house-title">
        {{houseDetail.house_position}}{{houseDetail.garden_name}}
        {{houseDetail.building_number}}栋{{houseDetail.room_number}}号
      </div>
       <div class="house-introduce">
        <van-col span="6">
          <div>            
              <span class="black-text">{{houseDetail.house_layout}}</span><br/>
              房型    
          </div>     
        </van-col>
        <van-col span="12">
          <span class="black-text">{{houseDetail.area}}㎡</span><br/>
          面积         
        </van-col>
        <van-col span="6">          
          <span class="black-text">￥{{houseDetail.deposit}}</span><br/>
          押金         
        </van-col>
      </div>      
    </div>
    <div class="division"></div>
    <div class="house-desc">
      <div class="title">
        房源描述
      </div>
      <div class="desc-detail">
        {{houseDetail.house_desc}}
      </div>
    </div>

  </div>
</template>

<script>
//import shareApi from '../../common/until'
  export default {
    name: 'RentDetail',
    data () {
      return {
        id:0,
        // header标题
        title: '',
        houseDetail: {},
      }
    },
    mounted(){
      document.title = this.title;
      this.init();
      this.share();
    },
    updated() {
    	document.title = this.title;
    },
    methods: {
      share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
      init(){
        // 获取房源详情
        let that = this;
        let param = {house_id: 1};
        this.$http.post(this.$store.state.global.baseUrl + 'house/house_details', param).then(res => {
          if(res.status == 200) {
            if(res.data.code == 200){
              that.houseDetail = res.data.data;
              that.title = that.houseDetail.garden_name + "靓房出租";
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('获取房源详情失败，请刷新重试！');
            return;
          }
        });
      },
      onClickLeft() {
        this.$router.back(-1);
      }
    }
  }
</script>

<style scoped >
 
  .van-nav-bar__text{
    color: #FFB640;
  }
  .van-nav-bar__title{
    color: #FFB640;
  }
  .van-nav-bar .van-icon{
    color: #FFB640!important;
    font-size: 0.7rem;
  }
  .swipe{
    width: 100%;
    height: 7.875rem;
  }
  .van-swipe{
    width: 100%;
    height:7.875rem;
  }
  .van-swipe img{
    width:100%;
    }
   
 .house-info{
    width: 85%;
    height: 4.75rem;
    margin: 0 auto;
    line-height: 0.75rem;
    color: lightgrey;
    display: block;
    color: #777;
    padding:0.3rem 0;
    box-sizing:border-box;
    font-size:0.38rem;
    
  }
  .house-price{
      color:#f00;
      font-weight:bold;
      font-size:0.4rem;
    }
    .black-text{
      font-weight:bold;      
      color:#000;
    }
    .house-title{
      padding:0.3rem 0;
      font-size:0.4rem;
    }
  .price-title{
    color: #FFB640;
    font-size: 0.5rem;
    line-height: 4.75rem;
  }
  .division{
    width: 100%;
    height: 0.1875rem;
    background-color: #F5F5F5;
  }
  .house-desc{
    width: 85%;
    margin: 0 auto;
    padding-top:0.2rem;
  }
  .house-desc .title{
    text-align:  left;
    font-size: 0.4rem;
    line-height: 1rem;
    color: #000;
    font-weight: bold;
  }
  .house-desc .desc-detail{
    width: 85%;
    min-height: 2.0rem;
    margin: 0 auto;
    text-align: left;
    color:#777;
    font-size:0.38rem;
    /* text-indent: 0.3rem; */
  }
  .clearfix:after{
    content: "." ;
    display: block ;
    height: 0 ;
    clear: both ;
    visibility: hidden ;
  }
</style>
