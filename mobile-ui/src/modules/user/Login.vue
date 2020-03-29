<template>
  <div class="login">
    <div class="button-container">
      <div class="division"></div>
      <van-field v-model="user.username" name="用户名" label="账号" label-width="1.5rem"/>
      <van-field v-model="user.password" type="password" name="密码" label="密码" label-width="1.5rem" />
      <div class="link">
        <div class="float-left"><a href="javascript:;" @click="findPwd">忘记密码?</a></div>
        <div class="float-right"><a href="javascript:;" @click="toRegister">去注册</a></div>
      </div>
      <div class="submit" @click="onSubmit">
        <van-button round block size="small" color="#FFB640" native-type="submit">
          登录
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        user: {
          username:'',
          password: '',
          code:''
        },
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
        //吸底显示首页
        this.$store.state.global.isShowFooter = false;
        console.log(this.$store.state.global.urlParam);
        console.log(this.$store.state.global.urlParam.code);
      },
      onSubmit() {
        var that = this;
//         this.$toast('登陆成功');
//         this.$store.state.global.loginStatus = true;
//         this.$router.push({path : '/home'});
//         console.log(this.user)
        this.$http.post(this.$store.state.global.baseUrl + 'user/login_post',this.user).then(res => {
          if(res.status == 200) {
            if(res.data.code == 200){
              that.$toast('登陆成功');
              that.$store.state.global.api_token = res.data.api_token;
              that.$store.state.global.loginStatus = true;
              that.$router.push({path : '/home'});
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('系统异常！');
          }
        });
      },
      findPwd(){
        this.$router.push({path : '/resetPassword'});
      },
      toRegister(){
        this.$router.push({path : '/register'});
      }
    }
  }
</script>

<style scoped>
  .login{
    width: 100%;
    height: 100%;
    background-image: url("../../assets/img/user/login-b.png");
    background-repeat: no-repeat;
    background-size: cover; 
  }
  .button-container{
    position: relative;
    width: 83%;
    height: 61.5%;
    background-color: #FFFFFF;
    top: 61.8%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.3125rem;
    padding-top: 0.6125rem;
    color: #959595;
  }
  .link{
    color: #959595;
    width: 80%;
    margin: 0 auto;
    margin-top: 0.4125rem;
  }
  .link div{
    
  }
  a:link {
    color: #959595;
    text-decoration: underline;
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
  .division{
    position: absolute;
    width: 25%;
    height: 2rem;
    left: 0.125rem;
    z-index: 10;
    border-right: 0.03125rem solid white;
  }
  a:visited {
    color: #959595;
    text-decoration: underline;
  }
  a:hover {
    color: #959595;
    text-decoration: underline;
  }
  a:active {
    color: #959595;
    text-decoration: underline;
  }
  .submit{
    width: 4.375rem;
    height: 0.9375rem;
    margin: 0 auto;
    margin-top: 6.25rem;
  }
  .van-button--small{
    font-size: 0.5rem;
  }
</style>
