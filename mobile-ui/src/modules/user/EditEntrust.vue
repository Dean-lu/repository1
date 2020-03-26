<template>
  <div>
    <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" />
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
    name: 'EntrustHouseInfo',
    components: {HeaderBar},
    data () {
      return {
        houseInfo: {
          id: 1,
          house_position: "长沙市岳麓区大学城",
          garden_name: "麓谷明珠",
          building_number: "2",
          room_number: "1201",
          area: "60.00",
          house_layout: "两室一厅",
          rent_price: "1500.00",
          deposit: "1500.00",
          pay_style: 3,
          pay_style_name: "季付",
          house_desc: "临近地铁口，周边配套齐全",
          house_img: "[\"storage\\/house\\/dIviIePV0PYTjsieH2KH7J3jRiFBAPK20jY9EfYf.jpeg\"]",
          cardimg1: "http://house.growingsale.cn/storage/safeimgs/ExbbYXQ6BhOruDWql0DTQZN4AWcUD3gtAgTMvbSx.jpeg",
          cardimg2: "http://house.growingsale.cn/storage/safeimgs/ExbbYXQ6BhOruDWql0DTQZN4AWcUD3gtAgTMvbSx.jpeg",
          certifi_info: "http://house.growingsale.cn/storage/safeimgs/ExbbYXQ6BhOruDWql0DTQZN4AWcUD3gtAgTMvbSx.jpeg",
          added_service:[
            {
            id: 1,
            service_name: "服务1",
            price: "10.33"
            }
          ],
          expire_year: 3,
          house_number: null
        }
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        console.log(this.$store.state.locale.houseId)
        //debugger
        // 获取房源详情
        let that = this;
        let param = {
          api_token: this.$store.state.global.api_token,
          house_id: this.$store.state.locale.houseId,
        };
        this.$http.post(this.$store.state.global.baseUrl + 'scene/house_details', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.houseInfo = res.data.data;
              that.$store.state.locale.editHouseInfo = res.data.data;
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('获取房源详情失败，请刷新重试！');
            return;
          }
        });
        // locale.houseId
      },
      onClickLeft(){
        this.$router.back(-1);
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
