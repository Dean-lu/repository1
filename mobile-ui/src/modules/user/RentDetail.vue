<template>
  <div class="house-detail">
    <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" />
    <div class="swipe">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in houseDetail.house_img" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="house-info">
      <van-col span="12">
        <div class="text-align-left">位置:{{houseDetail.house_position}}</div>
        <div class="text-align-left">房型:{{houseDetail.house_layout}}</div>
        <div class="text-align-left">面积:{{houseDetail.house_position}}</div>
        <div class="text-align-left">付款方式:{{houseDetail.pay_style}}</div>
        <div class="text-align-left">租金:{{houseDetail.deposit}}</div>
      </van-col>
      <van-col span="12">
        <div class="price-title">
          ¥{{houseDetail.deposit}}
        </div>
      </van-col>
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
      this.init();
    },
    methods: {
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

<style scoped>
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
    margin-top: 1.226667rem;
  }
 .house-info{
    width: 90%;
    height: 3.75rem;
    margin: 0 auto;
    line-height: 0.625rem;
    color: lightgrey;
    display: block;
  }
  .price-title{
    color: #FFB640;
    font-size: 0.5rem;
    line-height: 3.75rem;
  }
  .division{
    width: 100%;
    height: 0.1875rem;
    background-color: #F5F5F5;
  }
  .house-desc{
    width: 90%;
    margin: 0 auto;
  }
  .house-desc .title{
    text-align:  left;
    font-size: 0.5rem;
    line-height: 1rem;
    color: #FFB640;
  }
  .house-desc .desc-detail{
    width: 85%;
    min-height: 3.0rem;
    margin: 0 auto;
    text-align: left;
    color:lightgrey;
    /* text-indent: 0.3rem; */
  }
  .sign-btn{
    width: 100%;
    height: 1.0rem;
  }
  .sign-btn button{
    width: 3.0rem;
    font-size: 0.5rem;
    margin: 0 auto;
  }
  .chooseRentItem{
    width: 80%;
    height: 2.5rem;
    margin: 0 auto;
  }
  .van-cell__title{
    text-align: right;
    padding-right: 0.4rem;
  }
  .van-cell__value{
    text-align: left;
  }
  /deep/.van-cell{
    line-height: 0.5rem!important;
    padding: 0.1rem 0;
  }
  .van-cell:not(:last-child)::after{
    border-bottom: none!important;
  }
  .confirm-bottom{
    width: 100%;
    height: 1.25rem;
    margin-top: 1.25rem;
  }
  .confirm-bottom button{
    width: 3.125rem;
    border-radius: 0.125rem;
    font-size: 0.5rem;
  }
</style>
