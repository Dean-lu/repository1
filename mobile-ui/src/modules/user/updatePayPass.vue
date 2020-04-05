<template>
  <div class="login-pwd pwd">
    <!-- <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" /> -->
    <div class="form-container">
      <div class="input-item">
        <label>支付密码</label>
        <input type="password" name="pay_password" id="password" v-model="pay_password"/>
      </div>
      <div class="input-item">
        <label>验证码</label>
        <input type="text" name="code" id="code" v-model="code" />
        <van-button slot="button" size="large" :disabled="msgBtnLock" type="primary" color="#FFB640" id="verify-btn" @click="sendMsg" >
          {{sendMsgBtnTxt}}&nbsp;&nbsp;
        </van-button>
      </div>
      <div class="des">*系统将向您的尾号<span v-text="tel"></span>发送验证码，请查收</div>
      <div class="submit" >
        <van-button round block size="middle" color="#FFB640" native-type="submit" @click="doUpdateLoginPwd">
          提交
        </van-button>
      </div>
    </div>
    <!-- 提交成功呈现 -->
    <div v-if="is_show==true">
      <div class="notice">
        <div class="bg"></div>
        <div class="tip-content">
          <div class="tip">
            <div class="del" @click="delTip"></div>
            <div class="icon"></div>
            <div class="text">支付密码重置成功</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'updatePayPass',
    data () {
      return {
        is_show: false,
        title: '重置支付密码',
        telphone:'15084732515',
        tel:'8888',
        pay_password: '',// 密码
        code:'',//验证码
        sendMsgBtnTxt: '发送验证码',
        // 短信倒计时
        countDownNum: 60,
        // 定时器
        msgInterval:{},
        msgBtnLock: false
      }
    },
    mounted(){
      document.title = '重置支付密码';
      this.init();
    },
    methods:{
      onClickLeft() {
        this.$router.back(-1);
      },
      delTip(){
        this.is_show=false;
      },
      init(){
        var that = this;
        var api_token = this.$store.state.global.api_token;
        this.$http.get(this.$store.state.global.baseUrl + 'user/edit_user?api_token='+api_token).then(res => {
          if(res.status == 200) {
            if(res.data.code == 200){
              that.telphone = res.data.data.telphone;
              that.tel = res.data.data.telphone.substr(7,4);
            }else{
              that.$toast(res.data.msg);
            }
          }
        });
      },
      // 倒计时
      countDown(){
        // 设置倒计时
        this.msgInterval = setInterval(() => {
          if(this.countDownNum <= 0) {
            // 重置btn提示信息
            this.sendMsgBtnTxt = "发送验证码";
            // 重置倒计时状态
            this.countDownNum = 60;
            // 更改btn状态
            this.msgBtnLock = false;
            // 清除定时器
            clearInterval(this.msgInterval)
            return;
          };
          // 倒计时
          this.countDownNum -- ;
          this.sendMsgBtnTxt = this.countDownNum + 's后重发';
        }, 1000);
      },
      // 获取短信验证码
      sendMsg(){
        if(!(/^1[3456789]\d{9}$/.test(this.telphone))){
          this.$toast('手机号格式不正确');
          return;
        }
        var that = this;
        console.log("sendMsg")
        let param = {};
        param.telphone = this.telphone;
        this.countDown();
        this.sendMsgBtnTxt = this.countDownNum +"s后重发";
        this.msgBtnLock = true;
        this.$http.post(this.$store.state.global.baseUrl + 'base/set_code',param).then(res => {
          if(res.status == 200){
            if(res.data.code == 200){
              that.$toast('验证码已发送');
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('系统异常！');
          }
        });
      },
      doUpdateLoginPwd(){
        var that = this;
        // 校验
        if(!this.checkValid()){
          return;
        }
        let param = {};
        param.api_token = this.$store.state.global.api_token;
        param.pay_password = this.pay_password;
        param.code = this.code;
        this.$http.post(this.$store.state.global.baseUrl + 'user/edit_paypass',param).then(res => {
          if(res.status == 200){
            if(res.data.code == 200){
              that.$toast('修改密码成功');
              that.is_show=true;
              that.$store.state.global.api_token = res.data.api_token;
              that.$store.state.global.loginStatus = true;
              //that.$router.push({path : '/home'});
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('系统异常！');
          }
        });
      },
      checkValid(){
        if(!this.pay_password){
          this.$toast('支付密码不能为空');
          return false;
        }
        if(!this.code){
          this.$toast('验证码不能为空');
          return false;
        }
        return true;
      }
    },
    beforeDestroy () {
      // 离开页面销毁定时器，不然返回之后会加速
      clearInterval(this.msgInterval);
    }
  }
</script>

<style scoped>
  .pwd .van-nav-bar .van-icon,
  .pwd .van-nav-bar__title{
    color:#FFB640;
  }
  .pwd .van-nav-bar{
    border-bottom: .11rem solid #f5f5f5;
  }
  .form-container{
    position: relative;
    width: 83%;
    height: 61.5%;
    background-color: #FFFFFF;
    position: absolute;
    top: 44.8%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.3125rem;
    padding-top: 0.6125rem;
    color: #959595;
  }
  .input-item{
    position: relative;
    margin-bottom: .2rem;
  }
  .input-item label{
    color: #727171;
    width: 2rem;
    font-size: .42rem;
    line-height: 1rem;
    text-align: right;
    display: inline-block;
  }
  .input-item input{
    font-size: .36rem;
    width: 5.8rem;
    margin-left: .2rem;
    background: #dcdddd;
    border: 0;
    border-radius: 3px;
    height: 1rem;
    line-height: 1rem;
    padding-left: .3rem;
    color: #fff;
    box-sizing: border-box;
  }
  #verify-btn{
    position: absolute;
    right: 0.1rem;
    bottom: 0;
    font-size: 0.3125rem;
    width: 2rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
  }
  .des{
    margin-top: .5rem;
    font-size: .24rem;
  }
  .submit{
    width: 90%;
    text-align: center;
    margin: 0 auto;
    margin-top: 2rem;
  }
  .submit button{
    border-radius:3px;
    font-size:0.5rem;
  }
  .notice .bg{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
  }
  .notice .tip-content{
    position: absolute;
    top: 35%;
    width: 100%;
    z-index: 9999;
  }
  .notice .tip-content .tip{
    background: #fff;
    width: 70%;
    height: 4.28rem;
    text-align: center;
    margin: 0 auto;
    border-radius: 5px;
    position: relative;
  }
  .notice .tip-content .del{
    background: url(../../assets/img/user/del.png);
    width: .32rem;
    height: .31rem;
    background-size: 100% 100%;
    display: inline-block;
    position: absolute;
    top: .3rem;
    right: .3rem;
  }
  .notice .tip-content .icon{
    background: url(../../assets/img/user/succ.png);
    width: 1.5rem;
    height: 1.5rem;
    background-size: 100% 100%;
    display: inline-block;
    margin: 1rem 0 .5rem;
  }
  .notice .tip-content .text{
    color: #9fa0a0;
    font-size: .4rem;
  }
</style>
