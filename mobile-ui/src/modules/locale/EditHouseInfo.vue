<template>
  <div>
    <HeaderBar></HeaderBar>
    <div class="division"></div>
    <div class="remind">*温馨提示：请认真核对房源信息</div>
    <div class="house-info">
      <van-cell>
        <van-col span="8" class="text-align-right">所属区域：</van-col>
        <van-col span="16">
          <van-field v-model="houseInfo.house_position"/>
        </van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">小区名称：</van-col>
        <van-col span="16">
          <van-field v-model="houseInfo.garden_name"/>
        </van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">楼栋号：</van-col>
        <van-col span="16">
          <van-field v-model="houseInfo.building_number"/>
        </van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">房号：</van-col>
        <van-col span="16">
          <van-field v-model="houseInfo.room_number"/>
        </van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">面积：</van-col>
        <van-col span="16">
          <van-field v-model="houseInfo.area"/>
        </van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">户型：</van-col>
        <van-col span="16">
          <van-field v-model="houseInfo.house_layout"/>
        </van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">租金：</van-col>
        <van-col span="16">
          <van-field v-model="houseInfo.rent_price"/>
        </van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">押金：</van-col>
        <van-col span="16">
          <van-field v-model="houseInfo.deposit"/>
        </van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">付款方式：</van-col>
        <van-col span="16">
          <van-field v-model="houseInfo.pay_style_name"/>
        </van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">房源描述：</van-col>
        <van-col span="16"></van-col>
      </van-cell>
      <van-cell>
        <div class="textarea float-right">
          <van-field v-model="houseInfo.house_desc" rows="5" autosize type="textarea" placeholder="请输入房屋描述"></van-field>
        </div>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">房源照片：</van-col>
        <van-col span="16"></van-col>
      </van-cell>
      <van-cell>
        <van-image :src="houseInfo.cardimg1"></van-image>
      </van-cell>
      <van-cell>
        <van-image :src="houseInfo.cardimg2"></van-image>
      </van-cell>
      <div class="">
        <van-button square type="info" size="small" color="#F8B729" @click="comitHouseInfo">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from '../../components/common/HeaderBar'
  export default {
    name: 'EditHouseInfo',
    components: {HeaderBar},
    data () {
      return {
        houseInfo:{}
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        this.houseInfo = this.$store.state.locale.editHouseInfo;
      },
      comitHouseInfo(){
        this.$toast('还没写哦！');
      }
    }
  }
</script>

<style scoped lang="less">
  .division{
    width: 100%;
    height: 1.4rem;
    background-color: #F5F5F5;
  }
  /deep/.van-cell{
    padding: 0;
    margin: 1px auto;
  }
  .van-cell:not(:last-child)::after{
    border-bottom: none;
  }
  /deep/.van-field__body{
    // background-color: #e4e4e445;
    border: 0.0625rem solid #e4e4e445;
  }
  /deep/.van-field__control{
    color: #777!important;
  }
  .house-info{
    width: 80%;
    margin: 0 auto;
  }
  .textarea{
    width: 85%;
  }
</style>
