<template>
  <div class="mine">
    <!-- header-->
    <div class="header">      
      <div class="header_pesonal"> 
        <div class="hearder_head">
          <!-- <van-icon name="user-o" /> -->
          <van-image :src="user.headimgurl"></van-image>
        </div>     
        <div class="float-left header_txt">  
          <span>{{user.truename}}</span>
          <div><span class="bg-white" @click="jump('Spread')">立即推广赚钱</span></div>
        </div>
      </div>
    </div>
    <van-row class="bgorange">
      <van-grid :column-num="3" :gutter="0" :border="false">
        <van-grid-item>
          <div>¥{{user.balance}}</div>
          <div>余额</div>
        </van-grid-item>
        <van-grid-item>
          <div>¥{{user.rent}}</div>
          <div>累计租金</div>
        </van-grid-item>
        <van-grid-item>
          <div>¥{{user.commission}}</div>
          <div>累计佣金</div>
        </van-grid-item>
      </van-grid>
    </van-row>
    <!-- 推广宣传图 -->
    <!-- <van-row>
      <van-image src="https://yanxuan.nosdn.127.net/3d1993dbd9f84de18716944d3682d62f.jpg?_width=750&_height=343"></van-image>
    </van-row> -->
    <div></div>
    <van-row class="mine-list">
      <ul>
        <li @click="jump('myInfo')">
          <div class="float-left">            
            <van-icon name="manager" />
            <span>完善个人信息</span>
          </div>
          <div class="float-right">
            <van-icon name="arrow" />
          </div>
        </li>
        <li @click="jump('MyEntrust')">
          <div class="float-left">
            <van-icon name="wap-home" />
            <span>我的委托</span>
          </div>
          <div class="float-right">
            <van-icon name="arrow" />
          </div>
        </li>
        <li @click="jump('MyContract')">
          <div class="float-left">
            <van-icon name="printer" />
            <span>我的合同</span>
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
        <li @click="jump('Spread')">
          <div class="float-left">
            <van-icon name="gold-coin" />
            <span>推广赚钱</span>
          </div>
          <div class="float-right">
            <van-icon name="arrow" />
          </div>
        </li>
        <li @click="jump('updateloginPass')">
          <div class="float-left">
            <van-icon name="lock" />
            <span>修改登录密码</span>
          </div>
          <div class="float-right">
            <van-icon name="arrow" />
          </div>
        </li>
        <li @click="jump('updatepayPass')">
          <div class="float-left">
            <van-icon name="send-gift"/>
            <span>修改支付密码</span>
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
          
        },
      }
    },
    mounted(){
      document.title = '个人中心';
      this.init();
    },
    methods:{
      init(){
        // debugger
        if(!this.$store.state.global.api_token){
          this.$router.push({path : '/login'})
        }
        let that = this;
          let param = {
              api_token: this.$store.state.global.api_token             
          };
          this.$http.get(this.$store.state.global.baseUrl + 'user/edit_user',{  params: {
            api_token: this.$store.state.global.api_token
            }}).then(res => {
                if(res.status == 200) {
                  if(res.data.code == 200){
                    that.user = res.data.data;
                  //that.$store.state.locale.editHouseInfo = res.data.data;
                  }else{
                    that.$toast(res.data.msg);
                    this.$router.push({path : '/login'})
                  }
              }else{
                  that.$toast('获取数据失败，请重试！');
                  
                  return;
              }
            });           
      },

      jump(type){
        this.$router.push({path:'/'+type})
      }
    }
  }
</script>

<style scoped lang="less">
  .mine{
    width: 100%;
    height: 100%;
  }
  .mine .header{
    min-height: 4rem;
    background:#f7b343;
    color:#fff;
    
  } 
  /deep/.bgorange .van-grid-item__content,.bgorange{
    background:#f7b343;    
    font-size:0.4rem;
  }
  .header_pesonal{
    position:absolute;
    top:1rem;
    left:1.2rem;
    font-size:0.4rem;
    line-height: 0.8rem;
  }
  .hearder_head{
    float:left;
    width:1.6rem;
    height:1.6rem;
    background:#fff;
    color:#898989;
    border-radius: 50%;
    margin-right:0.4rem;
    font-size:1rem;
    line-height:1.6rem;
    .van-icon{
      margin-top:9px;
    }    
  }
  /deep/.van-image__img{
    width: 1.6rem;
    height: 1.6rem;
    display: block;
    border-radius:0.8rem;
  }
  .header_txt{
    text-align: left;
  }
  .bg-white{
      background:#fff;
      color:#f7b343;
      font-size:0.35rem;
      padding:0.08rem; 
    }
  // .mine .van-image{
  //   width: auto;
  //   margin: 0.125rem;
  //   border-radius: 0.3125rem;
  // }
  .mine .van-hairline ::after{
    border: none !important;
  }
  .mine-list{
    font-size: 0.24rem;
    width: 100%;
    margin: 0.5rem auto 0 auto;
    margin-bottom: 0.5rem;
    font-size:0.4rem;
    
  }
  .mine-list ul li{
    display: block;
    min-height: 1rem;
    line-height: 1rem;
    border-bottom: 0.01rem solid #F5F5F5;
    padding: 0 0.7rem;
  }
</style>
