<template>
  <div class="main">
    <div class="top">
      <div class="float-left">
        <van-icon v-show="user.court" name="location" color="white"/>
        <span>{{user.court}}</span>
      </div>
    </div>
    <van-notice-bar :text="noticeItem.title" :left-icon="icons[6]" />
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
      <h2>&nbsp;靓房出租&nbsp;<span style="color: #777;font-size: 0.3125rem;">为您精心挑选的家</span></h2>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell class="list-item" v-for="(item, index) in houseSource" :key="index" @click="toDetail(item.id)">
          <van-image :src="item.house_img" fill width="3.8rem" height="2rem" class="float-left" />
          <div class="float-left">
            <div class="house-item-title">{{item.garden_name}}</div>
            <div class="house-item-info">租金：{{item.rent_price}}</div>
            <div class="house-item-info">房型：{{item.house_layout}}</div>
            <div class="house-item-info">位置：{{item.house_position}}</div>
          </div>
        </van-cell>
      </van-list>
    </div>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
import FooterBar from '../../components/common/FooterBar'
export default {
  name: 'HomePage',
  components: {FooterBar},
  data () {
    return {
      location: "XXX小区",
      noticeList: [
        {
        id: -1,
        title: "五一佳节将至，维修大礼"
        }
      ],
      noticeItem: {
        id: 1,
        title: "五一佳节将至，维修大礼"
      },
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
        require('../../assets/img/home/laba.png')
      ],
      houseSource: [
        {
          garden_name:'房源1',
          rent_price:3200,
          house_layout:'三室一厅',
          house_position:'深圳市碧海湾...',
          mutet_ids:require('../../assets/img/demo/house-demo.png')
        }
      ],
      loading: false,
      finished: true
    }
  },
  mounted(){
    this.init();
    this.getNotice();
    this.createInterval();
    this.getHouseSource();
  },
  methods: {
    init(){
      // debugger
      if(!this.$store.state.global.loginStatus){
         this.$router.push({path : '/login'})
      }
      // 获取个人信息
      var that = this;
      this.$http.get(this.$store.state.global.baseUrl + 'user/edit_user?api_token=' + this.$store.state.global.api_token).then(res => {
        if(res.status == 200) {
          if(res.data.code == 200){
            that.user = res.data.data;
            that.$store.state.global.user = res.data.data;
          }else{
            that.$toast(res.data.msg);
          }
        }else{
          that.$toast("获取个人信息失败！");
        }
      });
    },
    // 获取首页公告数组
    getNotice(){
      var that = this;
      this.$http.post(this.$store.state.global.baseUrl + 'house/get_message').then(res => {
        if(res.status == 200 && res.data.code == 200) {
          that.noticeList = res.data.data;
        }else{
          return;
        }
      });
    },
    // 创建公告循环定时器
    createInterval(){
      // clearInterval(this.noticeInterval);
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
      this.$router.push({path : '/houseInfoInput'})
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
      this.$toast('暂无更多功能！');
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
    font-size: 0.4375rem;
  }
  .van-grid{
    border-bottom: 0.125rem solid #e7e7e72b;
  }
  .van-grid-item ::after{
    border: none;
  }
  .source-list h2 {
    text-align: left;
    margin: 0.3125rem;
  }
  .van-cell{
    width: auto;
    border-radius: 0.3125rem;
  }
  .list-item .van-image{
    display: inline-block;
    width: 50%;
    min-height: 2.8rem;
    margin-right: 0.3125rem;
    // box-shadow: 2px 2px 2px #E4E4E4,2px -2px 2px #E4E4E4,-2px 2px 2px #E4E4E4,-2px -2px 2px #E4E4E4;
    border: 0.03125rem solid #e4e4e445;
    border-radius: 0.625rem;
    overflow: hidden;
  }
  .list-item div{
    display: inline-block;
    width: 45%;
  }
  .house-item-title{
    display: block!important;
    font-weight: bolder!important;
    width: 100% !important;
    line-height: 1rem;
    font-size: 0.4rem;
  }
  .house-item-info{
    display: block!important;
    line-height: 0.625rem;
    text-align: left;
    color: #777;
    width: 100%!important;
  }
</style>
