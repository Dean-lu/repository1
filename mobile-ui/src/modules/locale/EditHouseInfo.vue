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
          <van-field readonly clickable name="houseInfo.house_layout" :value="houseInfo.house_layout" @click="showHouseLayout = true" />
          <van-popup class="popup-select" v-model="showHouseLayout" position="bottom" >
            <van-picker show-toolbar title="选择户型" :columns="houseLayouts" @cancel="showHouseLayout = false" @confirm="confirmHouseLayout" />
          </van-popup>
          <!-- <van-field v-model="houseInfo.house_layout"/> -->
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
          <van-field readonly clickable :value="houseInfo.pay_style_name" @click="showPayStyle = true" />
          <van-popup v-model="showPayStyle" position="bottom">
            <van-picker show-toolbar :columns="payStyleDesc" @confirm="confirmPayStyle" @cancel="showPayStyle = false" />
          </van-popup>
          <!-- <van-field v-model="houseInfo.pay_style_name"/> -->
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
      <div class="img" v-for="(item,index) in houseInfo.house_img" :key="index">
        <van-image :src="item"></van-image>
      </div>
      <div class="edit-btn">
        <van-button square type="info" size="small" color="#F8B729" @click="submitHouseInfo">确认修改</van-button>
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
        houseInfo:{
          pay_style: 0,
          pay_style_name: ''
        },
        showHouseLayout: false,
        houseLayouts:['公寓','一室一厅','二室一厅','二室二厅','三室一厅','三室二厅','四室二厅','五室及以上'],
        payStyleDesc: ['年付', '半年付', '季付', '月付'],
        showPayStyle: false
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        this.houseInfo = this.$store.state.locale.editHouseInfo;
      },
      submitHouseInfo(){
        debugger
        let that = this;
        let param = {
          api_token: this.$store.state.locale.api_token,
          house_id: this.$store.state.locale.houseId,
          house_position: this.houseInfo.house_position,
          garden_name: this.houseInfo.garden_name,
          building_number: this.houseInfo.building_number,
          room_number: this.houseInfo.room_number,
          area: this.houseInfo.area,
          house_layout: this.houseInfo.house_layout,
          rent_type: this.houseInfo.rent_type,
          rent_price: this.houseInfo.rent_price,
          deposit: this.houseInfo.deposit,
          pay_style: this.houseInfo.pay_style,
          house_desc: this.houseInfo.house_desc,
          expire_year: this.houseInfo.expire_year
        }
        this.$http.post(this.$store.state.global.baseUrl + 'scene/edit_house', param).then(res => {
          debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.$toast('修改房源信息成功！');
              this.$router.push({path : '/entrustHouseInfo'});
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('获取房源详情失败，请刷新重试！');
            return;
          }
        });
      },
      // 户型选择
      confirmHouseLayout(value){
        this.valueHouseLayout = value;
        this.houseInfo.house_layout = this.valueHouseLayout;
        this.showHouseLayout = false;
      },
      // 确认付款方式
      confirmPayStyle(value,index) {
        this.houseInfo.pay_style_name = value;
        this.houseInfo.pay_style = index + 1;
        this.showPayStyle = false;
      },
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
  /deep/.van-picker__cancel,/deep/.van-picker__confirm{
    color: #FFB640;
  }
  .img{
    width: 100%;
    height: 3.125rem;
    margin: 0.3125rem auto;
  }
  .edit-btn{
    margin: 0.625rem auto;
  }
</style>
