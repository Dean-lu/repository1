<template>
  <div>
    <!-- <HeaderBar></HeaderBar> -->
    <!-- <div class="division"></div> -->
    <div class="remind">*温馨提示：请认真核对房源信息</div>
    <div class="house-info">
      <van-cell>
        <van-col span="8" class="text-align-right label">所属区域：</van-col>
        <van-col span="16" class="text">
          {{houseInfo.house_position}}
        </van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right label">小区名称：</van-col>
        <van-col span="16" class="text">{{houseInfo.garden_name}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right label">楼栋号：</van-col>
        <van-col span="16" class="text">{{houseInfo.building_number}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right label">房号：</van-col>
        <van-col span="16" class="text">{{houseInfo.room_number}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right label">面积：</van-col>
        <van-col span="16" class="text">{{houseInfo.area}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right label">户型：</van-col>
        <van-col span="16" class="text">{{houseInfo.house_layout}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right label">租金：</van-col>
        <van-col span="16" class="text">{{houseInfo.rent_price}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right label">押金：</van-col>
        <van-col span="16" class="text">{{houseInfo.deposit}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right label">付款方式：</van-col>
        <van-col span="16" class="text">{{valuePayStyle}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right label">装修状态：</van-col>
        <van-col span="16" class="text">{{valuetrimStatus}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right label">出租类型：</van-col>
        <van-col span="16" class="text">{{valueRentType}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right label">委托期限：</van-col>
        <van-col span="16" class="text">{{valueExpireYear}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right label label">房源描述：</van-col>
        <van-col span="16" class="text"></van-col>
      </van-cell>
      <van-cell>
        <van-field v-model="houseInfo.house_desc" rows="5" autosize label=" " type="textarea" placeholder="请输入留言"></van-field>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">房源照片：</van-col>
        <van-col span="16"></van-col>
      </van-cell>
      <div class="img" v-for="(item,index) in houseInfo.house_img" :key="index">
        <van-image :src="item"></van-image>
      </div>
      <van-cell>
        <van-col span="20" offset="3" class="text-align-left">身份证正面照片：</van-col>
      </van-cell>
      <div class="img">
        <van-image :src="houseInfo.cardimg1"></van-image>
      </div>
      <van-cell>
        <van-col span="20" offset="3" class="text-align-left">身份证反面照片：</van-col>
      </van-cell>
      <div class="img">
        <van-image :src="houseInfo.cardimg2"></van-image>
      </div>
      <van-cell>
        <van-col span="20" offset="3" class="text-align-left">购房合同或房产证照片：</van-col>
      </van-cell>
      <div class="img">
        <van-image :src="houseInfo.certifi_info"></van-image>
      </div>
      <van-divider></van-divider>
      <van-cell  v-if="houseInfo.added_service">
        <van-col span="20" offset="3" class="text-align-left"><span style="font-weight: bolder;color: #595757;font-size: 16px;">增值服务</span></van-col>
      </van-cell>
      <div class="add-serv">
         <van-cell v-for="(item,index) in houseInfo.added_service" :key="index">
          <van-col class="float-left">{{item.service_name}}</van-col>
          <van-col class="float-right">￥{{item.price}}</van-col>
        </van-cell>
      </div>
      <van-cell>
        <!-- <van-col span="20" class="text-align-right label">
          <a :href="'tel:'+houseInfo.telphone">联系房东</a>
          </van-col> -->
         <a :href="'tel:'+houseInfo.telphone"  class="btnOrange">联系房东</a>
      </van-cell>
      <div class="edit-btn" v-if="houseInfo.check_status == 0">
        <van-button square type="info" size="small" color="#F8B729" @click="toEditHouseInfo">编辑</van-button>
        <van-button square type="info" size="small" color="#F8B729" @click="rejectConfirm = true">驳回</van-button>
        <van-button square type="info" size="small" color="#F8B729" @click="passVerify">通过审核</van-button>
      </div>
    </div>
    <van-action-sheet v-model="rejectConfirm" :round="false" title="驳回原因" height="200px">
      <van-divider dashed></van-divider>
      <div class="confirm">
        <van-field v-model="rejectReason" rows="4" label="驳回原因" autosize type="textarea" maxlength="200"
         placeholder="请输入驳回原因" show-word-limit />
      </div>
      <div style="margin: 0.3125rem auto;">
        <van-button round type="info" size="small" color="#F8B729" @click="reject">确定驳回</van-button>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
 // import shareApi from '../../common/until'
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
        },
        //装修状态
        rejectConfirm: false,
        rejectReason: '',
        valuetrimStatus: '',
        trimStatusDesc: ['毛胚', '简装', '精装', '豪装'],
         //出租类型
        showRentType: false,
        valueRentType: '',
        rentTypeDesc: ['整租', '合租'],
        // 委托时间
        showExpireYear: false,
        valueExpireYear: '',
        expireYearDesc: ['三年', '四年', '五年'],
          // 付款方式显示控制
        showPayStyle :false,
        valuePayStyle: '',
        payStyleDesc: ['年付', '半年付', '季付', '月付'],
      }
    },
    mounted(){
      document.title = "房源信息";
      this.init();
      this.share();
    },
    methods: {
       share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
      init(){
        // 查看cookie中是都有业务员登录的api_token
        if(!this.$cookies.get('salesApiToken')){
          this.$toast("登录已失效，请重新登录！");
          this.$router.push({path : '/salesLogin'});
        }else{
          this.$store.state.locale.api_token = this.$cookies.get('salesApiToken');
        }
        console.log(this.$store.state.locale.houseId)
        //debugger
        // 获取房源详情
        
        let that = this;
        let param = {
          api_token: this.$store.state.locale.api_token,
          house_id: this.$store.state.locale.houseId
        };
        this.$http.post(this.$store.state.global.baseUrl + 'scene/house_details', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.houseInfo = res.data.data;
              that.$store.state.locale.editHouseInfo = res.data.data;
              that.valuetrimStatus= that.trimStatusDesc[res.data.data.trim_status-1]; 
              that.valueRentType= that.rentTypeDesc[res.data.data.rent_type-1]; 
              that.valueExpireYear= that.expireYearDesc[res.data.data.expire_year-3];
              that.valuePayStyle=that.payStyleDesc[res.data.data.pay_style-1];              
            }else{
             
              that.$toast(res.data.msg);
              if(res.data.msg == 'api_token错误或者不存在'){
                that.$router.push({path : '/salesLogin'});
              }
            }
          }else{
            that.$toast('获取房源详情失败，请刷新重试！');
            return;
          }
        });
        // locale.houseId
      },
      toEditHouseInfo(){
        if(!this.$store.state.locale.editHouseInfo.id){
          this.$store.state.locale.editHouseInfo = this.houseInfo;
        }
        this.$router.push({path : '/editHouseInfo'});
      },
      // 驳回
      reject(){
        let that = this;
        let param = {
          api_token: this.$store.state.locale.api_token,
          house_id: this.$store.state.locale.houseId + '',
          reason: this.rejectReason
        };
        this.$http.post(this.$store.state.global.baseUrl + 'scene/refuse_pass', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.$toast("驳回成功！");
              this.$router.push({path : '/entrustHouseSource'});
            }else{
              that.$toast(res.data.msg);
              if(res.data.msg == 'api_token错误或者不存在'){
                that.$router.push({path : '/salesLogin'});
              }
            }
          }else{
            that.$toast('获取房源详情失败，请刷新重试！');
            return;
          }
        });
      },
      // 通过审核
      passVerify(){
        let that = this;
        let param = {
          api_token: this.$store.state.locale.api_token,
          house_id: this.$store.state.locale.houseId + ''
        };
        this.$http.post(this.$store.state.global.baseUrl + 'scene/pass_house', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              // that.$toast(res.data.msg);
              that.$toast("审核通过");
              this.$router.push({path : '/entrustHouseSource'});
            }else{
              that.$toast(res.data.msg);
              if(res.data.msg == 'api_token错误或者不存在'){
                that.$router.push({path : '/salesLogin'});
              }
            }
          }else{
            that.$toast('获取房源详情失败，请刷新重试！');
            return;
          }
        });
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
  .remind{
    width: 100%;
    height: 0.8rem;
    text-align: center;
    font-size: 0.35rem;
    line-height: 0.8rem;
    color: #b5b5b6;
  }
  /deep/.van-cell{
    padding: 0;
    margin: 0.125rem 0;
    font-size: 16px;
  }
  .van-cell .label{
    color: #595757;
  }

  .van-cell .text{
    color: #9fa0a0;
  }
  /deep/.van-field__control{
    color: #9fa0a0;
    font-size:0.38rem;
  }
  .van-cell:not(:last-child)::after{
    border-bottom: none;
  }
  .img{
    width: 90%;
    // height: 3.125rem;
    margin: 0.3125rem auto;
  }
  .edit-btn{
    margin: 0.625rem auto;
    // display: flex;
  }
  /deep/.edit-btn button{
    margin: 0 5%;
    border-radius: 0.1875rem;
  }
  .add-serv{
    width: 60%;
    margin: 0 auto;
  }
  .btnOrange{
      width:60%;
      margin:0 auto 0.8rem auto;
      color:#fff;
      border:0 none;
      background: #f7b343;
      line-height:0.8rem;
      border-radius: 0.2rem;
      display: block;
      text-align:center;
  }
</style>
