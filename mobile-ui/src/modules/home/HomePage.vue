<template>
  <div class="main">
    <div class="top">
      <div class="float-left">
        <van-icon v-show="user.court" name="location" size="16" color="white"/>
        <span style="font-size: 0.38rem;">{{user.court}}</span>
      </div>
    </div>
    <div class="notice">
       <van-notice-bar :text="noticeItem.title" :left-icon="icons[6]" />  
      <div class="notice_swipe">
        <van-swipe style="height: 0.8rem;overflow: hidden;line-height: 0.8rem;" :duration="1000" :autoplay="3000" :touchable="false" :show-indicators="false" vertical>
          <van-swipe-item  v-for="(item ,index ) in noticeList" :key="index" >
          <p style="text-align:left;">{{item.title}}</p>
          </van-swipe-item>
        </van-swipe>  
      </div>
       
    </div>
    <van-row>
      <van-grid :column-num="4">
        <van-grid-item :icon="icons[0]" text="我要委托" @click="toHouseInfoInput" />
        <van-grid-item :icon="icons[1]" text="我要租房" @click="toHouseSourceCenter" />
        <van-grid-item :icon="icons[2]" text="现场勘查" @click="toSalesLogin" />
        <!-- <van-grid-item :icon="icons[3]" text="委托代理" /> -->
        <!-- <van-grid-item :icon="icons[4]" text="出租代理" /> -->
        <van-grid-item :icon="icons[5]" text="更多" @click="more" />
      </van-grid>
    </van-row>
    <div class="source-list">
      <div>
        <span class="t1">靓房出租</span><span class="t2">为您精心挑选的家</span>
      </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell class="list-item" v-for="(item, index) in houseSource" :key="index" @click="toDetail(item.id)">
          <van-image :src="item.house_img" fit="fill" width="3.8rem" height="3rem" class="position_img" />
          <div>
            <div class="house-item-title">
              <span>{{item.garden_name}}靓房出租</span>
            </div>
            <div class="house-item-info">房型：{{item.house_layout}}</div>        
            <div class="house-item-info">位置：{{item.house_position}}</div>
            <div class="house-item-price"><span>{{item.rent_price}}</span>元/月</div>
          </div>
        </van-cell>
      </van-list>
    </div>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
import FooterBar from '../../components/common/FooterBar'
//import shareApi from '../../common/until'
export default {
  name: 'HomePage',
  components: {
    FooterBar
  },
  data () {
    return {
      location: "XXX小区",
      noticeList: [],
      noticeItem: {
        
      },
       noticeListMain: [
        {
        id: 1,
        title: "五一佳节将至，维修大礼"
        },
        {
        id: 2,
        title: "佳节促销大礼"
        }
      ],
      isInterval: false,
      noticeInterval: {},
      user: {
        userName:'氪24K金VIP用户'
      },
      icons: [
        require('../../assets/img/home/icon-weituo.png'),
        require('../../assets/img/home/icon-zufang.png'),
        require('../../assets/img/home/icon-search.png'),
        require('../../assets/img/home/icon-weituodaili.png'),
        require('../../assets/img/home/icon-chuzudaili.png'),
        require('../../assets/img/home/icon-more.png'),
        require('../../assets/img/home/laba.png'),
        require('../../assets/img/home/location.png')
      ],
      houseSource: [
        {
          // garden_name:'房源1',
          // rent_price:3200,
          // house_layout:'三室一厅',
          // house_position:'深圳市碧海湾...',
          // mutet_ids:require('../../assets/img/demo/house-demo.png')
        }
      ],
      loading: false,
      finished: true
    }
  },
  mounted(){
    document.title = '爆米花房管家';
    this.init();
    this.getNotice();
    //this.createInterval();
    this.getHouseSource();
    this.share()
  },
  methods: {
    share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
    init(){
      // debugger
//       if(!this.$store.state.global.api_token){
//          this.$router.push({path : '/login'})
//       }
      // 获取个人信息
      var that = this;
      this.$http.get(this.$store.state.global.baseUrl + 'user/edit_user?api_token=' + this.$store.state.global.api_token).then(res => {
        if(res.status == 200) {
          if(res.data.code == 200){
            that.user = res.data.data;
            that.$store.state.global.user = res.data.data;
          }else{
            // that.$toast(res.data.msg);
            // window.location.href = 'http://house.growingsale.cn/wxindex';
            // this.$router.push({path : '/noLogin'})
          }
        }else{
          // that.$toast("获取个人信息失败！");
          
        }
      });
      this.$store.state.entrust.houseInfo = {};
    },
    // 获取首页公告数组
    getNotice(){
      var that = this;
      this.$http.post(this.$store.state.global.baseUrl + 'house/get_message').then(res => {
        if(res.status == 200 && res.data.code == 200) {
          that.noticeList = res.data.data; 
          //that.noticeList =that.noticeListMain         
        }else{
          return;
        }
      });
    },
    // 创建公告循环定时器
    createInterval(){
      const that=this;
      // for(let i=0,len=that.noticeList.length;i<len;i++){      
      //   that.noticeItem.title+= that.noticeList[i].title
      // }
      clearInterval(this.noticeInterval);
      this.noticeInterval = setInterval(() => {
        let that = this;
        that.isInterval = true;
        if(that.noticeItem.id == that.noticeList[that.noticeList.length - 1].id){
          that.noticeItem = that.noticeList[0];
          console.log(that.noticeItem.id)
          console.log(that.noticeItem.title)
          return;
        }else{
          for(let i = 0; i < that.noticeList.length; i ++){
            if(that.noticeItem.id == that.noticeList[i].id){
              that.noticeItem = that.noticeList[i + 1];
              console.log(that.noticeItem.id)
              console.log(that.noticeItem.title)
              return;
            }
          }
        }
      },3000);
    },
    // 获取首页优质房源
    getHouseSource(){
      var that = this;
      this.$http.post(this.$store.state.global.baseUrl + 'house/get_better_house').then(res => {
        // debugger
        if(res.status == 200) {
          if(res.data.code == 200){
            that.houseSource = res.data.data;
          }else{
            that.$toast(res.data.msg);
          }
        }else{
          that.$toast('获取房源信息失败，请刷新重试！');
          return;
        }
      });
    },
    onLoad() {
      // 异步更新数据
      this.getHouseSource();
    },
    // 点击我的委托
    toHouseInfoInput(){
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
              setTimeout(()=>{
                 that.$router.push({path : '/myInfo'});
              },1000);  
            }else{
              that.$router.push({path : '/houseInfoInput'})
            }            
          }else{
            that.$toast('获取个人信息失败，请刷新重试！');
            return;
          }
        });      
    },
    // 点击我要租房
    toHouseSourceCenter(){
      this.$router.push({path : '/houseSourceCenter'})
    },
    // 点击现场勘查
    toSalesLogin(){
      this.$router.push({path : '/salesLogin'})
    },
    more(){
      this.$router.push({path : '/more'});
    },
    // 房源详情
    toDetail(id){
      this.$store.state.renting.id = id;
      console.log(this.$store.state.renting.id)
      this.$router.push({path : '/houseDetail'});
    },
  },
  beforeDestroy () {
    // 离开页面销毁定时器，不然返回之后会加速
    clearInterval(this.noticeInterval);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .top{
    width: 100%;
    min-height: 6.25rem;
    background: url("../../assets/img/home/home-bg.png") no-repeat;
    background-size:100% 100%;
  }
  .top div{
    height: 0.9375rem;
    line-height: 0.9375rem;
    margin: 0.125rem;
    color: white;
    font-size: 0.625rem;
  }
  .top div span{
    font-size: 0.4rem;
  }
  /deep/.van-grid-item__text{
    font-size: 0.4rem;
  }
  .van-notice-bar{
    font-size: 0.35rem;
    color: #494949;
    text-indent: 0.1rem;
    background-color: #FFFFFF;
    height: 0.8rem;
  }
  /deep/.van-notice-bar__content{
    padding-left: 0.2rem!important;
  }
  .van-grid-item__text{
    color: #494949;
  }
  .van-grid{
    border-top: 0.1rem solid #e7e7e72b;
    border-bottom: 0.1rem solid #e7e7e72b;
  }
  .van-grid-item ::after{
    border: none;
  }
  .list-item .van-cell__value{position:relative; min-height:3.3rem; padding-left:4.23rem; box-sizing:border-box;}
  
  /deep/.position_img{
    position:absolute;
     left:0; top:0; 
     width:3.8rem;
     height:3rem;
     }
  .source-list{
    text-align: left;
    // text-indent: 0.23rem
  }
  .source-list .t1 {
    display: inline-block;
    text-align: left;
    font-weight: bold;
    margin: 0.3125rem;
    font-size: 0.4rem;
    color: #494949;
  }
  .source-list .t2{
    text-align: left;
    font-size: 0.35rem;
    color:#acabab;
    padding-left:0.2rem;
  }
  .van-cell{
    width: auto;
    border-radius: 0.3125rem;
  }
  .notice{
    position:relative;
    width:100%;
  }
  .notice_swipe{
    position: absolute;
    width:88%;
    top:0; 
    height:0.8rem;
    bottom:0;
    left:12%;
    overflow:hidden;
  }
  .notice_swipe p{
    padding:0;
    margin:0;
    font-size:0.35rem;
  }
  .list-item .van-image{
    display: inline-block;
    width: 50%;
    min-height: 2.8rem;
    margin-right: 0.3125rem;
    // box-shadow: 2px 2px 2px #E4E4E4,2px -2px 2px #E4E4E4,-2px 2px 2px #E4E4E4,-2px -2px 2px #E4E4E4;
    border: 0.03125rem solid #e4e4e445;
    // border-radius: 0.625rem;
    overflow: hidden;
  }
  .list-item div{
    display: inline-block;
  }
  .house-item-title{
    display: block!important;
    font-weight: bolder!important;
    width: 100% !important;    
    height:1.2rem;
    font-size: 0.45rem;
    color: #494949;
    line-height:0.6rem;
    display:flex;
    align-items:center;
    span{
      font-size: 0.45rem;
      overflow:hidden;
      text-overflow:-o-ellipsis-lastline;
      text-overflow:ellipsis;
      display:-webkit-box;
      -webkit-line-clamp:2;
      line-clamp:2;
      -webkit-box-orient:vertical;
    }
  }
  .house-item-info{
    display: block!important;
    line-height: 0.6rem;
    text-align: left;
    color: #9fa0a0;
    width: 100%!important;
    font-size: 0.38rem;
  }
  .house-item-price{
    line-height: 0.6rem;
    text-align: left;
    color: #f00;
    width: 100%!important;
    font-size: 0.35rem;
    font-weight:bold;
    span{
      font-size: 0.4rem;
    }
  }
</style>
