<template>
  <div class="register">
    <!-- <HeaderBar></HeaderBar> -->
    <div class="form-container">
      <div class="division"></div>
      <van-field v-model="telphone" center clearable label="手机号" maxlength="11" label-width="2.2rem" >           
      
      </van-field>
      <van-field v-model="code" label="验证码" center label-width="2.2rem" >
        <template #button>
          <van-button slot="button" size="large" :disabled="msgBtnLock" type="primary" color="#FFB640" id="verify-btn" @click="sendMsg" >
        {{sendMsgBtnTxt}}&nbsp;&nbsp;
      </van-button>
      </template> 
      </van-field>
      <van-field v-model="password" type="password" label="密码" maxlength="18" label-align="right" label-width="2rem"  @blur="checkPwd" />
      <van-field v-model="enter_password" type="password" maxlength="18" label="确认密码" label-align="right" label-width="2/2rem" @blur="checkEnterPwd" />
      <!-- <van-field v-model="truename" label="姓名" label-align="right" maxlength="20" label-width="2rem" />
      <van-field v-model="idcardcode" label="身份证" label-align="right" maxlength="18" label-width="2rem" />
      <van-field v-model="username" label="账号" label-align="right" maxlength="20" label-width="2rem" @blur="checkUserName" />
      
      <van-field v-model="pay_password" type="password" label="支付密码" maxlength="18" label-align="right" label-width="2rem" />
      
      </van-field> -->      
      <div class="link">
        <div class="float-right"><a href="javascript:;" @click="toLogin">已有账号?去登陆</a></div>
      </div>
      <div class="submit" >
        <van-button round block size="small" color="#FFB640" native-type="submit" @click="doRegister" >
          提交
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from '../../components/common/HeaderBar'
  export default {
    name: 'Register',
    components: {HeaderBar},
    data() {
      return {
        value1: '',
        value2: '',
        value3: '',
        pattern: /\d{6}/,
        truename: '',
        idcardcode: '',
        username: '',
        password: '',
        enter_password: '',
        telphone: '',
        openid: '',
        pid: '',
        pay_password: '',
        code: '',
        sendMsgBtnTxt: '发送验证码',
        // 短信倒计时
        countDownNum: 60,
        // 定时器
        msgInterval:{},
        msgBtnLock: false,
        isreg:false
      }
    },
    mounted(){
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
        this.openid = this.$store.state.global.openid;
        this.pid = this.$store.state.global.pid;
      },
      // 校验函数返回 true 表示校验通过，false 表示不通过
      validator(val) {
        return /1\d{10}/.test(val);
      },
      // 异步校验函数返回 Promise
      asyncValidator(val) {
        return new Promise(resolve => {
          Toast.loading('验证中...');

          setTimeout(() => {
            Toast.clear();
            resolve(/\d{6}/.test(val));
          }, 1000);
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
        var that = this;
        console.log("sendMsg")
        if(!this.chenckTel()){
          return;
        }
        let param = {};
        param.telphone = this.telphone;
        this.countDown();
        this.sendMsgBtnTxt = this.countDownNum +"s后重发";
        this.msgBtnLock = true;
        this.$http.post(this.$store.state.global.baseUrl + 'base/set_code',param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.$toast('发送成功!');
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('发送验证码失败，请重试！');
            return;
          }
        });
      },
      // 注册
      doRegister() {
        var that = this;
        // 校验
        if(!this.checkValid()){
          return;
        }
        if(this.isreg){return}
        this.isreg=true;
        let param = {};
        // param.truename = this.truename;
        // param.idcardcode = this.idcardcode;
        // param.username = this.username;
        param.password = this.password;
        param.enter_password = this.enter_password;
        param.telphone = this.telphone;
        param.openid =this.openid;
        param.pid = this.pid;        
        param.code = this.code;
        this.$http.post(this.$store.state.global.baseUrl + 'user/register_post',param).then(res => {
          if(res.status == 200) {
            if(res.data.code == 200){
              that.$store.state.global.api_token = res.data.api_token;
              that.$store.state.global.loginStatus = true;
              that.$toast('注册成功!');
              that.$router.push({path : '/registerSuc'});
              that.isreg=false;
            }else{
              that.$toast(res.data.msg);
              that.isreg=false;
            }
          }else{
            that.$toast('注册失败，请刷新重试！');
            that.isreg=false;
            return;
          }
        });
      },
      // checkUserName(){
      //   if(!this.username){
      //     this.$toast('账号不能为空');
      //     return false;
      //   }
      //   if(!/^\w{1,20}$/.test(this.username)){
      //     this.$toast('账号只能包含字母和数字');
      //     return false;
      //   }
      //   return true;
      // },
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
      // checkIdcard(){
      //   if(!this.idcardcode){
      //     this.$toast('身份证不能为空');
      //     return false;
      //   }
      //   if(!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.idcardcode)
      //    && !/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/.test(this.idcardcode)){
      //     this.$toast('身份证不合法');
      //     return false;
      //   }
      //   return true;
      // },
      chenckTel(){
        if(!(/^1[3456789]\d{9}$/.test(this.telphone))){ 
          this.$toast('手机号格式不正确');
          return false; 
        }
        return true;
      },
      checkValid(){
        
        if(!this.telphone){
          this.$toast('手机号不能为空');
          return false;
        }
        if(!this.code){
          this.$toast('验证码不能为空');
          return false;
        }        
        if(!this.chenckTel()){
          return false;
        }
        if(!this.checkPwd()){
          return false;
        }
        if(!this.checkEnterPwd()){
          return false;
        }
        return true;
        // if(!this.pay_password){
        //   this.$toast('支付密码不能为空');
        //   return false;
        // }        
        
      },
      toLogin(){
        this.$router.push({path : '/login'});
      }
    },
    beforeDestroy () {
      // 离开页面销毁定时器，不然返回之后会加速
      clearInterval(this.msgInterval);
    }
  }
</script>

<style scoped>
  .register{
    width: 100%;
    height: 100%;
    background-image: url('../../assets/img/user/register-b.png');
    background-repeat: no-repeat;
    background-size: 100% auto; 
    background-color: #f5f5f5;
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
    padding-top: 1.2125rem;
    color: #959595;
  }
  .van-cell{
    color: #959595;
    background-color: #F5F5F5;
    border-radius: 0.625rem;
    width: 90%;
    height: 1rem;
    margin: 0.5rem auto;
    line-height: 0.6rem;
    font-size:0.38rem;
    padding:10px;
  }
  .van-field__label--right{
    padding-right:0;
  }
  #verify-btn{
    position: relative;
    left: 0.5rem;
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
    margin-top: 1.375rem;
  }
  .link{
    color: #959595;
    width: 80%;
    margin: 0 auto;
    margin-top: 0.4125rem;
    font-size:0.35rem;
  }
  a:link {
    color: #959595;
    text-decoration: underline;
  }
</style>
