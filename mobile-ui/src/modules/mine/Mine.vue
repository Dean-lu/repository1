<template>
  <div class="mine">
    <!-- header-->
    <div class="header">
      <div><van-image></van-image></div>
      <div>
        <van-image></van-image>
        <van-image></van-image>
        <span>{{user.userName}}</span>
        <div>立即推广赚钱</div>
      </div>
    </div>
    <van-row>
      <van-grid :column-num="3">
        <van-grid-item>
          <div>1000.00</div>
          <div>余额</div>
        </van-grid-item>
        <van-grid-item>
          <div>1000.00</div>
          <div>房租</div>
        </van-grid-item>
        <van-grid-item>
          <div>1000.00</div>
          <div>佣金</div>
        </van-grid-item>
      </van-grid>
    </van-row>
    <!-- 推广宣传图 -->
    <van-row>
      <van-image src="https://yanxuan.nosdn.127.net/3d1993dbd9f84de18716944d3682d62f.jpg?_width=750&_height=343"></van-image>
    </van-row>
    <van-row class="mine-list">
      <ul>
        <li @click="jump('MyEntrust')">
          <div class="float-left">
            <van-icon name="wap-home" />
            <span>我的委托</span>
          </div>
          <div class="float-right">
            <van-icon name="arrow" />
          </div>
        </li>
        <li>
          <div class="float-left">
            <van-icon name="printer" />
            <span>我的租房</span>
          </div>
          <div class="float-right">
           <van-icon name="arrow" />
          </div>
        </li>
        <li @click="jump('Bank')">
          <div class="float-left">
           <van-icon name="card" />
           <span>银行卡</span>
          </div>
          <div class="float-right">
           <van-icon name="arrow" />
          </div>
        </li>
        <li @click="jump('Draw')">
          <div class="float-left">
            <van-icon name="bill" />
            <span>我要提现</span>
          </div>
          <div class="float-right">
            <van-icon name="arrow" />
          </div>
        </li>
        <li @click="jump('Advice')">
          <div class="float-left">
            <van-icon name="chat" />
            <span>投诉建议</span>
          </div>
          <div class="float-right">
            <van-icon name="arrow" />
          </div>
        </li>
        <li>
          <div class="float-left">
            <van-icon name="volume" />
            <span>推广赚钱</span>
          </div>
          <div class="float-right">
            <van-icon name="arrow" />
          </div>
        </li>
      </ul>
    </van-row>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
  import FooterBar from '../../components/common/FooterBar'
  export default {
    name: 'Mine',
    components: {FooterBar},
    data () {
      return {
        user: {
          userName:'氪24K金VIP用户'
        },
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
        // debugger
        if(!this.$store.state.global.loginStatus){
          this.$router.push({path : '/login'})
        }
      },
      jump(type){
        this.$router.push({path:'/'+type})
      }
    }
  }
</script>

<style scoped>
  .mine .header{
    min-height: 4rem;
  }
  .mine .van-image{
    width: auto;
    margin: 0.125rem;
    border-radius: 0.3125rem;
  }
  .mine .van-hairline ::after{
    border: none !important;
  }
  .mine-list{
    font-size: 0.4rem;
    width: auto;
    margin: 0.125rem;
    border-radius: 0.3125rem;
  }
  .mine-list ul li{
    display: block;
    min-height: 0.625rem;
  }
</style>
