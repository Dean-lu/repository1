<template>
  <div class="main">
    <!-- <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" /> -->
    <!-- <div class="division"></div> -->
    <!-- <div class="remind">*温馨提示：请认真核对房源信息</div> -->
    <div class="house-info">
      <van-cell>
        <van-col span="8" class="text-align-right">所属区域：</van-col>
        <van-col span="16">
          {{houseInfo.house_position}}          
        </van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">小区名称：</van-col>
        <van-col span="16">{{houseInfo.garden_name}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">楼栋号：</van-col>
        <van-col span="16">{{houseInfo.building_number}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">房号：</van-col>
        <van-col span="16">{{houseInfo.room_number}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">房产编号：</van-col>
        <van-col span="16">{{houseInfo.house_number}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">面积：</van-col>
        <van-col span="16">{{houseInfo.area}}㎡</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">户型：</van-col>
        <van-col span="16">{{houseInfo.house_layout}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">委托年限：</van-col>
        <van-col span="16">{{valueExpireYear}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">出租类型：</van-col>
        <van-col span="16">{{valueRentType}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">租金：</van-col>
        <van-col span="16">{{houseInfo.rent_price}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">押金：</van-col>
        <van-col span="16">{{houseInfo.deposit}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">付款方式：</van-col>
        <van-col span="16">{{houseInfo.pay_style_name}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">装修状态：</van-col>
        <van-col span="16">{{valuetrimStatus}}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">房源描述：</van-col>
        <van-col span="16">{{houseInfo.house_desc}}</van-col>
      </van-cell>
      <van-cell>

        <!-- <van-field v-model="houseInfo.house_desc" rows="5" autosize label=" " type="textarea" placeholder="请输入留言"></van-field> -->
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">身份证正面照:</van-col>
        <van-col span="16"></van-col>
      </van-cell>
      <van-cell>
        <van-image :src="houseInfo.cardimg1"></van-image>
      </van-cell>      
      <van-cell>
        <van-col span="8" class="text-align-right">身份证反面照:</van-col>
        <van-col span="16"></van-col>
      </van-cell>
      <van-cell>
        <van-image :src="houseInfo.cardimg2"></van-image>
      </van-cell>     
      <van-cell>
        <van-col span="2"></van-col>
        <van-col span="18" class="text-align-left">房产证或产权合同照片：</van-col>
      </van-cell>
      <van-cell>
        <van-image :src="houseInfo.certifi_info"></van-image>
      </van-cell>
      <van-cell>
        <van-col span="8" class="text-align-right">房源照片：</van-col>
        <van-col span="16"></van-col>
      </van-cell>
      <van-cell v-for="(item,index) in houseInfo.house_img" :key="index">
        <van-image :src="item"></van-image>
      </van-cell>  
      <div style="text-align: left;font-size: 0.5rem;color: #323233;text-indent: 0.45rem;margin: 0.3rem 0;">
          增值服务
          <div class="ques-icon"></div>
        </div>
        <div class="add-service">          
            <div class="add-service-cell"  v-for="(item,index) in houseInfo.added_service" :key="index">
              <div>{{item.service_name}}:<span> ￥ {{item.price}} 元</span></div>                        
            </div> 
        </div>
        <div style="color: #acabab;">*管理服务费从委托合同签约成功起生效，平台将提供对应价格的服务，服务费从房屋出租的租金中扣除</div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from '../../components/common/HeaderBar'
  //import shareApi from '../../common/until'
  export default {
    name: 'EntrustHouseInfo',
    components: {HeaderBar},
    data () {
      return {
        title:"查看委托房屋详情",
        houseInfo: {},
        //委托年限
        valueExpireYear: '',
        expireYearDesc: ['三年', '四年', '五年'],
        //出租类型
        valueRentType: '',
        rentTypeDesc: ['整租', '合租', '转租'],
        //装修状态
        valuetrimStatus: '',
        trimStatusDesc: ['毛胚', '简装', '精装', '豪装'] 
      }
    },
    mounted(){
      document.title = "查看委托房屋详情";
      this.init();
      this.share()
    },
    methods: {
      share(){
        let link="https://house.growingsale.cn/wxindex/"+this.$store.locale.houseId+"/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },      
      init(){
        console.log(this.$store.state.locale.houseId)
        //debugger
        // 获取房源详情
        let that = this;
        let param = {
          api_token: this.$store.state.global.api_token,
          house_id: this.$store.state.locale.houseId,
        };
        this.$http.post(this.$store.state.global.baseUrl + 'user/see_entrust', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.houseInfo = res.data.data;
              that.valueExpireYear=that.expireYearDesc[res.data.data.expire_year-3];
              that.valueRentType=that.rentTypeDesc[res.data.data.rent_type-1];
              that.valuetrimStatus= that.trimStatusDesc[res.data.data.trim_status-1];
              //that.$store.state.locale.editHouseInfo = res.data.data;
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('获取房源详情失败，请刷新重试！');
            // setTimeout(() => {
            //     this.$router.back(-1);
            // }, 1000);
            return;
          }
        });
        // locale.houseId
      },
       onClickLeft() {
        this.$router.back(-1);
      }
    }
  }
</script>

<style scoped lang="less">
.main{
  padding:0.5rem 0;
  box-sizing: border-box;
}
.main .van-nav-bar .van-icon,
  .main .van-nav-bar__title{
    color:#FFB640;
  }
  .main .van-nav-bar{
    border-bottom: .11rem solid #f5f5f5;
  }
  .remind{
    line-height:1rem;
    font-size:0.4rem;
    color:#b5b5b6;
    text-align: left;
    padding-left:0.6rem; 
    box-sizing: border-box;
  }
  .division{
    width: 100%;
    height: 1.4rem;
    background-color: #F5F5F5;
  }
  /deep/.van-cell{
    padding: 0;
    line-height:0.8rem;
  }
  /deep/.van-image{
    width:85%;
    margin:0 auto 0.5rem auto;
    display:block;
  }
  /deep/.van-cell:not(:last-child)::after{
    border-bottom: none;
  }
  /deep/.van-col--16{
    color:#aaa;
  }
</style>
