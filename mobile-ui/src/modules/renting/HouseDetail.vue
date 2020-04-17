<template>
  <div class="house-detail">
    <!-- <div class="header">
      <van-nav-bar
        :title="title"
        left-arrow
        :fixed="true"
        color="#FFB640"
        @click-left="onClickLeft"
      />
    </div> -->
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
      <div class="sign-btn">
        <van-button block size="small" color="#FFB640" native-type="submit" @click="signcheck">
          马上签约
        </van-button>
      </div>
    </div>
    <van-action-sheet v-model="showSignPopup" round title="选择租期" height="200px">
      <div class="chooseRentItem">
        <van-cell title="起租时间:" :value="startRentTime" @click="showRentTimeSelect = true" />
        <van-cell>
          <van-field readonly clickable name="rentTerm" :value="valueRentTerm" label="租期:" label-width="4.2rem"
           label-align="right" placeholder="选择租期" @click="showRentTerm = true" />
          
        </van-cell>
        <!-- <van-cell title="期望交房时间:" :value="expectHandingTime" /> -->
        <!-- @click="showHandingTimeSelect = true" -->
        <!-- <van-calendar v-model="showHandingTimeSelect" color="#FFB640" @confirm="onConfirmHandingTime" /> -->
        <van-cell title="期望交房时间:" :value="EnterRentTime" @click="showEndTimeSelect = true" />
      </div>
      <div style="color: #777; font-size:0.35rem; width:85%;margin:0 auto;">起租时间请设置为您入住的日期，实际入住时间不晚于{{actualRentTimeLimit}}</div>
      <div class="confirm-bottom">
        <van-button square type="info" size="small" color="#F8B729" @click="toConfirmRentInfo">下一步</van-button>
      </div>
    </van-action-sheet>
    <div style="position：absolute;z-index:9999;">
      <van-popup class="popup-select" v-model="showRentTerm" position="bottom"  >
          <van-picker show-toolbar title="选择租期" :columns="rentTermList" @cancel="showRentTerm = false" @confirm="confirmRentTerm"/>
        </van-popup>
    </div>
    <div style="position：absolute;z-index:9999;">
      <van-calendar v-model="showRentTimeSelect" color="#FFB640" @confirm="onConfirmRentTime" :max-date="maxDate"/>
    </div>
     <div style="position：absolute;z-index:9999;">
      <van-calendar v-model="showEndTimeSelect" color="#FFB640" @confirm="onConfirmEndTime" />
    </div>
  </div>
</template>

<script>
  import HeaderBar from '../../components/common/HeaderBar'
  //import shareApi from '../../common/until.js'
  export default {
    name: 'HouseDetail',
    components: {HeaderBar},
    data () {
      return {
        id:0,
        // header标题
        title: '',
        houseDetail: {
          id: 1,
          house_position: "长沙市岳麓区大学城",
          garden_name: "麓谷明珠",
          building_number: "2",
          room_number: "1201",
          area: "60.00",
          house_layout: "两室一厅",
          rent_type: 1,
          pay_style: 3,
          rent_price: "1500.00",
          deposit: "1500.00",
          house_desc: "临近地铁口，周边配套齐全",
          house_img: "http:\\/\\/house.growingsale.cn\\/storage\\/house\\/house\\/dIviIePV0PYTjsieH2KH7J3jRiFBAPK20jY9EfYf.jpeg",
          mutet_ids: "[\"http:\\/\\/house.growingsale.cn\\/storage\\/house\\/house\\/dIviIePV0PYTjsieH2KH7J3jRiFBAPK20jY9EfYf.jpeg\"]"
        },
        // 签约确认弹框
        showSignPopup: false,
        // 起租租期
        showRentTimeSelect: false,
        startRentTime: '选择起租时间',
        startRentDate: new Date(),
        actualRentTimeLimit: '',
        // startRentTime: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear() + 1}`,
        maxDate: new Date(2020, 10, 26),
        // 租期
        showRentTerm: false,
        valueRentTerm: '',// 临时变量
        rentTerm: '',
        rentTermList: ['一年','半年'],
        // 期望交房时间
        showHandingTimeSelect: false,
        expectHandingTime: '',
        //入住时间
        EnterRentTime:'选择期望交房时间',
        endRentDate: new Date(),
        showEndTimeSelect: false,
      }
    },
    mounted(){     
      this.init();
      //this.FunGetDateStr(2);
      //let time=this.funGetDateStr(2);
      //this.maxDate=new Date(time);
      this.share();
    },
    updated() {
      document.title= this.title;    
    },
    methods: {
      share(){
        let link="https://house.growingsale.cn/wxindex/"+this.$store.state.renting.id+"/"+  this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link,that);
       },
      funGetDateStr(p_count){
            let dd = new Date();
            console.log("dd");
            console.log(dd);
            dd.setDate(dd.getDate() + p_count);//获取p_count天后的日期
            let y = dd.getFullYear();
            let m = dd.getMonth() + 1;//获取当前月份的日期
            if( m <10){
                m = '0'+m;
            }
            let d = dd.getDate();
            if( d <10){
                d = '0'+d;
            }
            return y + "," + m + "," + d;
      },
      init(){       
        // 获取房源详情
        let that = this;
        let param = {house_id: this.$store.state.renting.id};
        this.$http.post(this.$store.state.global.baseUrl + 'house/house_details', param).then(res => {
          //debugger
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
        // 检查vuex
        // if(this.$store.state.renting.startRentTime){
        //   this.startRentTime = this.$store.state.renting.startRentTime;
        // }
        // if(this.$store.state.renting.rentTerm){
        //   this.rentTerm = this.$store.state.renting.rentTerm;
        // }
        // if(this.$store.state.renting.expectHandingTime){
        //   this.expectHandingTime = this.$store.state.renting.expectHandingTime;
        // }
        // if(this.$store.state.renting.EnterRentTime){
        //   this.EnterRentTime = this.$store.state.renting.EnterRentTime;
        // }
        
        this.actualRentTimeLimit = this.dateAddFormat(new Date(),2);
      },
      //签约之前判断个人信息是否完善
      signcheck(){
        if(!this.$store.state.global.api_token){
          this.$toast('您还没有登录，请先登录');          
          setTimeout(()=>{
              this.$router.push({path : '/login'});
          },1000);
          return false;
        }  
        const that=this;
        this.$http.post(this.$store.state.global.baseUrl + 'base/pre_solve', {
          api_token: this.$store.state.global.api_token
        }).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 400){
              //去完善个人信息
              that.$toast('请先完善个人信息');
              that.$router.push({path : '/myInfo'});  
            }else{
              that.signhouse();
            }            
          }else{
            that.$toast('获取个人信息失败，请刷新重试！');
            return;
          }
        });
      },
      //马上签约按钮
      signhouse(){        
        // 获取房源详情
        let that = this;
        let param = {
          api_token: this.$store.state.global.api_token,
          house_id: this.$store.state.renting.id
        };
        this.$http.post(this.$store.state.global.baseUrl + 'lease/pre_sign', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.showSignPopup = true;
            }else{
              that.$toast(res.data.msg);
            }            
          }else{
            that.$toast('获取房源详情失败，请刷新重试！');
            return;
          }
        });
      },
      formatDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      },
      // 返回date+3day后的日期
      dateAddFormat(date,day){
        let seconds = date.getTime();
        console.log(seconds)
        let newDate = new Date(seconds + day * 1000 * 60 * 60 * 24);
        return `${newDate.getFullYear()}年${newDate.getMonth() + 1}月${newDate.getDate()}日`;
      },
      // 确认起租时间
      onConfirmRentTime(date) {
        this.showRentTimeSelect = false;
        this.startRentDate = date;
        this.endRentDate=date;
        this.startRentTime = this.formatDate(date);
        //this.actualRentTimeLimit = this.dateAddFormat(this.startRentDate,3);
        if(this.rentTerm==1){
          this.expectHandingTime = `${this.startRentDate.getFullYear() + 1}-${this.startRentDate.getMonth() + 1}-${this.startRentDate.getDate()}`;
        }else if(this.rentTerm==2){
          if(this.startRentDate.getMonth()>5){
            this.expectHandingTime = `${this.startRentDate.getFullYear()+1}-${this.startRentDate.getMonth() -5}-${this.startRentDate.getDate()}`;
          }else{
            this.expectHandingTime = `${this.startRentDate.getFullYear()}-${this.startRentDate.getMonth()+7}-${this.startRentDate.getDate()}`;
          }         
        }else{
          this.expectHandingTime = this.formatDate(date);
        }
        
      },
      // 确认租期
      confirmRentTerm(value,index){
        this.valueRentTerm = value;
        this.rentTerm = index + 1;
        this.showRentTerm = false;
        // 计算交房时间（退房时间）
        console.log("index:"+index)
        if(index==0){
          this.expectHandingTime = `${this.startRentDate.getFullYear() + this.rentTerm}-${this.startRentDate.getMonth() + 1}-${this.startRentDate.getDate()}`;
        }else if(index==1){         
          if(this.startRentDate.getMonth()>5){
            this.expectHandingTime = `${this.startRentDate.getFullYear()+1}-${this.startRentDate.getMonth() -5}-${this.startRentDate.getDate()}`;
          }else{
            this.expectHandingTime = `${this.startRentDate.getFullYear()}-${this.startRentDate.getMonth()+7}-${this.startRentDate.getDate()}`;
          }
          
        }
        
      },
      // 期望交房时间
      onConfirmHandingTime(date){
        this.showHandingTimeSelect = false;
        this.expectHandingTime = this.formatDate(date);
      },
      // 确认入住时间
      onConfirmEndTime(date) {
        this.showEndTimeSelect = false;
        this.endRentDate = date;
        this.EnterRentTime = this.formatDate(date);
      },
      toConfirmRentInfo(){
        console.log("起租时间：" + this.startRentTime);
        if(!this.startRentTime || this.startRentTime=="选择起租时间"){
          this.$toast("请选择起租时间！");
          return false;
        }
        if(!this.rentTerm){
          this.$toast("请选择租期！");
          return false;
        }
        if(!this.EnterRentTime || this.EnterRentTime=="选择期望交房时间"){
          this.$toast("请选择期望交房时间！");
          return false;
        }
        this.$store.state.renting.startRentTime = this.startRentTime;
        this.$store.state.renting.rentTerm = this.rentTerm;
        this.$store.state.renting.expectHandingTime = this.expectHandingTime;
        this.$store.state.renting.EnterRentTime = this.EnterRentTime;
        this.$router.push({path : '/confirmRentInfo'})
      },
      onClickLeft() {
        this.$router.back(-1);
      }
    }
  }
</script>

<style scoped lang="less">

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
    /deep/.van-swipe__indicator--active{
      background-color:#FFB640
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
    // height: 2.5rem;
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
  /deep/.van-action-sheet__header{
    font-size: 0.5rem;
  }
  /deep/.van-cell__title,.van-cell__value{
    font-size:0.4rem;
    line-height: 0.6rem;
  }
  .van-cell:not(:last-child)::after{
    border-bottom: none!important;
  }
  .house-Main{
    width:100%;
  }
  .clearfix:after{
    content: "." ;
    display: block ;
    height: 0 ;
    clear: both ;
    visibility: hidden ;
  }
  .confirm-bottom{
    width: 100%;
    height: 1.25rem;
    margin-top:0.6rem;
  }
  .confirm-bottom button{
    width: 3.125rem;
    border-radius: 0.125rem;
    font-size: 0.5rem;
  }
  /deep/.van-picker__cancel, /deep/.van-picker__confirm{
    color: #F8B729;
  }
</style>
