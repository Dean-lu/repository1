<template>
  <div class="main">
    <!-- <van-nav-bar :left-arrow="false" :fixed="true" border title="委托合同签约">
      <van-icon name="cross" slot="right" color="#F8B729" size="0.5rem" @click="toHome" />
    </van-nav-bar> -->
    <div class="remind">
      <div class="title">
        <van-col span="8" offset="2">
          <van-icon size="1.5rem" :name="logo" />
        </van-col>
        <van-col span="14">
          <div style="line-height: 1.5rem;" >签约成功</div>
        </van-col>
      </div>
      <div class="division"></div>
      <div class="msg">您的委托已经提交，工作人员将联系您实地勘查房源，审核通过后即可免费上架推广出租</div>
    </div>
  </div>
</template>

<script>
import shareApi from '../../common/until'
  export default {
    name: 'ConfirmSuccess',
    data () {
      return {
        logo: require('../../assets/img/entrust/entrust-suc.png'),
      }
    },
    mounted(){
      document.title = '委托合同签约';
      this.share();
    },
    methods: {
      share(){
          let link="https://house.growingsale.cn/wxindex/"+ this.$store.global.pidshare;
          this.wxShare({
            link:link      
          });
        },
      toHome(){
        this.$store.state.global.houseInfo = {
          initMark: '0x10',
          house_position: '',
          garden_name: '',
          building_number: null,
          expire_year: null,
          expireYearDesc: '',
          room_number: null,
          area: null,
          house_layout: '',
          rent_type: null,
          rentTypeDesc: '',
          rent_price: null,
          deposit: null,
          pay_style: null,
          payStyleDesc: '',
          house_desc: '',
          house_img: [],
          houseImg:[],
          // 带水印的房产证/合同照片url
          certifi_info: null,
          // 房产证file
          certifiInfo: [],
          // 带水印的身份证正面照url
          cardimg1: null,
          // 身份证正面file
          idcardFront: [],
          // 带水印的身份证反面照url
          cardimg2: null,
          // 身份证反面file
          idcardBack: [],
          added_service_id: [],
          //产权编号
          house_number:'',
          // 增值服务总价
          totalAddPrice: 0.0,
          addedServiceSelect: [],
          
        };
        this.$router.push({path : '/home'});
      }
    }
  }
</script>

<style scoped lang="less">
  .van-nav-bar__title{
    color: #F8B729;
  }
  .main{
    width: 100%;
    height: 100%;
  }
  .remind{
    position: relative;
    width: 80%;
    height: 20%;
    text-align: left;
    background-color: #FFFFFF;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #959595;
    font-size: 0.4rem;
  }
  .title{
    font-size: 0.8rem;
    line-height: 1rem;
  }
  .division{
    width: 100%;
    height: 3.25rem;
  }
  .msg{
    font-size: 0.32rem;
  }
</style>
