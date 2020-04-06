<template>
  <div class="reset-pwd">
    <!-- <HeaderBar></HeaderBar> -->
    <div class="form-container">
      <div class="division"></div>
      <van-field v-model="username" label="账号" label-align="right" label-width="2rem" />
      <van-field v-model="password" type="password" label="密码" maxlength="18" label-align="right" label-width="2rem" @blur="checkPwd" />
      <van-field v-model="enter_password" type="password" label="确认密码" maxlength="18" label-align="right" label-width="2rem" @blur="checkEnterPwd" />
      <van-field v-model="telphone" center clearable label="手机号" maxlength="11" label-width="2rem" >
        <van-button slot="button" size="large" :disabled="msgBtnLock" type="primary" color="#FFB640" id="verify-btn" @click="sendMsg" >
          {{sendMsgBtnTxt}}&nbsp;&nbsp;
        </van-button>
      </van-field>
      <van-field v-model="code" type="password" label="验证码" label-align="right"
        :rules="[{ required: true, message: '验证码' }]" label-width="2rem" />
      <div class="submit" >
        <van-button round block size="small" color="#FFB640" native-type="submit" @click="doResetPwd">
          提交
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from '../../components/common/HeaderBar'
  export default {
    name: 'ResetPassword',
    components: {HeaderBar},
    data () {
      return {
        user: {
          
        },
        username:'',// 用户名：不需要
        password: '',// 密码
        enter_password: '',// 确认密码
        telphone: '',// 手机号
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
      this.init();
    },
    methods:{
      init(){
        this.$store.state.global.isShowFooter = false;// 不显示吸底
      },
      // 倒计时
      countDown(){
        // 设置倒计时
        this.msgInterval = setInterval(() => {
          debugger
            if(this.countDownNum <= 0) {
              debugger
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
        if(!this.chenckTel()){
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
          debugger
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
      doResetPwd(){
        if(!this.checkValid()){
          return;
        }
        var that = this;
        let param = {};
        param.password = this.password;
        param.enter_password = this.enter_password;
        param.telphone = this.telphone;
        param.code = this.code;
        this.$http.post(this.$store.state.global.baseUrl + 'user/forget_post',param).then(res => {
          debugger
          if(res.status == 200){
            if(res.data.code == 200){
              that.$toast('重置密码成功');
              that.$store.state.global.api_token = res.data.api_token;
              that.$store.state.global.loginStatus = true;
              that.$router.push({path : '/login'});
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('系统异常！');
          }
        });
      },
      checkPwd(){
        if(!this.password){
          this.$toast('密码不能为空');
          return false;
        }
        if(!/^\w{6,18}$/.test(this.password)){
          this.$toast('请输入6-18位密码(由字母及数字组成)');
          return false;
        }
        if(this.password && this.enter_password && this.password != this.enter_password){
          this.$toast('密码与确认密码不一致');
          return false;
        }
        return true;
      },
      checkEnterPwd(){
        if(!this.enter_password){
          this.$toast('确认密码不能为空');
          return false;
        }
        if(!/^\w{6,18}$/.test(this.enter_password)){
          this.$toast('请输入6-18位确认密码(由字母及数字组成)');
          return false;
        }
        if(this.password && this.enter_password && this.password != this.enter_password){
          this.$toast('密码与确认密码不一致');
          return false;
        }
        return true;
      },
      chenckTel(){
        if(!(/^1[3456789]\d{9}$/.test(this.telphone))){ 
          this.$toast('手机号格式不正确');
          return false; 
        }
        return true;
      },
      checkValid(){
        if(!this.username){
          this.$toast('账号不能为空');
          return false; 
        }
        if(!this.checkPwd()){
          return false;
        }
        if(!this.checkEnterPwd()){
          return false;
        }
        if(!this.chenckTel()){
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
  .reset-pwd{
    width: 100%;
    height: 100%;
    background-image: url('../../assets/img/user/resetpwd-b2.png');
    background-repeat: no-repeat;
    background-size: cover; 
  }
  .form-container{
    position: relative;
    width: 83%;
    height: 61.5%;
    background-color: #FFFFFF;
    position: absolute;
    top: 61.8%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.3125rem;
    padding-top: 0.6125rem;
    color: #959595;
  }
  .van-cell{
    color: #959595;
    background-color: #F5F5F5;
    border-radius: 0.625rem;
    width: 90%;
    height: 0.8rem;
    margin: 0.125rem auto;
    line-height: 0.4rem;
  }
  #verify-btn{
    position: relative;
    left: 0.625rem;
    font-size: 0.3125rem;
    width: 2rem;
  }
  .van-button--small{
    font-size: 0.5rem;
  }
  .submit{
    width: 3.7rem;
    height: 0.9375rem;
    margin: 0 auto;
    margin-top: 4.5rem;
  }
  .division{
    position: absolute;
    width: 30%;
    height: 5rem;
    left: 0.125rem;
    z-index: 10;
    border-right: 0.03125rem solid white;
  }
</style>
