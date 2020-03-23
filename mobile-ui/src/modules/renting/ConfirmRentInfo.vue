<template>
  <div class="confirm-rent">
    <van-nav-bar
      :title="title"
      left-arrow
      :fixed="true"
      color="#FFB640"
      @click-left="onClickLeft"
    />
    <div class="division"></div>
    <div class="info-title">
      租客信息
    </div>
    <div class="info-detail">
      <span>姓名:</span>
      <span>电话:</span>
      <span>身份证号:</span>
      <span>起租时间:</span>
      <span>租期:</span>
      <span>身份证照片:(*请上传清晰完整照片，否则无法通过审核)</span>
      <div style="width: 100%; height: 0.625rem;"></div>
      <van-field name="idCardFront" label="正面:" label-width="1rem" label-align="left">
        <template #input>
          <van-uploader v-model="idCardFront" :max-count="1" />
        </template>
      </van-field>
      <van-field name="idCardBack" label="正面:" label-width="1rem" label-align="left">
        <template #input>
          <van-uploader v-model="idCardBack" :max-count="1" />
        </template>
      </van-field>
      <van-field name="idCardHand" label="正面:" label-width="1rem" label-align="left">
        <template #input>
          <van-uploader v-model="idCardHand" :max-count="1" />
        </template>
      </van-field>
    </div>
    <div style="width: 100%; height: 0.625rem;border-bottom: 0.125rem solid #F5F5F5;"></div>
    <div class="info-title">
      房源信息
    </div>
    <div class="info-cell">
      <span>位置:</span>
    </div>
    <div class="info-cell">
      <span>房型:</span>
      <span>面积:</span>
    </div>
    <div class="info-cell">
      <span>付款方式:</span>
      <span>租金:</span>
    </div>
    <div class="info-cell">
      <span>押金:</span>
    </div>
  </div>
</template>

<script>
   export default {
    name: 'ConfirmRentInfo',
    data () {
      return {
        title: '确认租房信息',
        idCardFront: [],
        idCardBack: [],
        idCardHand: [],
      }
    },
    mounted(){
      
    },
    methods:{
      // 返回
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
  .division{
    width: 100%;
    height: 1.3125rem;
    background-color: #F5F5F5;
  }
  .info-title{
    width: 90%;
    margin: 0 auto;
    height: 1.375rem;
    line-height: 1rem;
    font-size: 0.4rem;
    text-align: left;
    color: #FFB640;
  }
  .info-detail{
    width: 83%;
    text-align: left;
    color: #777;
    margin: 0 auto;
  }
  .info-detail span{
    display: block;
  }
  .van-cell{
    padding: 0;
  }
  .van-cell:not(:last-child)::after{
    border-bottom: none;
   }
   .info-cell{
     width: 83%;
     text-align: left;
     color: #777;
     margin: 0 auto;
   }
   .info-cell span{
     display: inline-block;
     width: 49%
   }
</style>
