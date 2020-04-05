<template>
  <div class="sales-login">
    <!-- <HeaderBar></HeaderBar> -->
    <div class="button-container">
      <div class="division"></div>
      <van-field v-model="username" label="工号:" label-width="1.5rem" placeholder="输入工号" />
      <van-field v-model="password" type="password" label="密码:" label-width="1.5rem" placeholder="输入密码" />
    </div>
    <div class="submit" @click="onSubmit">
      <van-button block size="small" color="#FFB640" native-type="submit">
        登录
      </van-button>
    </div>
  </div>
</template>

<script>
  // import HeaderBar from '../../components/common/HeaderBar'
  export default {
    name: 'SalesLogin',
    // components: {HeaderBar},
    data () {
      return {
        username: '',
        password: ''
      }
    },
    mounted(){
      document.title = '业务员登录';
    },
    methods: {
      // 业务员登录
      onSubmit(){
        if(!this.username){
          this.$toast('请输入工号!');
        }
        if(!this.password){
          this.$toast('请输入密码!');
        }
        let that = this;
        let param = {
          job_number: this.username,
          password: this.password
        };
        this.$http.post(this.$store.state.global.baseUrl + 'scene/login_post', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.$store.state.locale.api_token = res.data.api_token;
              that.$toast("登录成功！");
              this.$router.push({path : '/entrustHouseSource'});
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('登录失败！');
            return;
          }
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .sales-login{
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
  }
  .button-container{
    position: relative;
    width: 60%;
    height: 20%;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #959595;
  }
  .van-cell{
    background-color: #F5F5F5;
  }
  .van-cell input{
    background-color: #666;
  }
  /deep/.van-field__control{
    background-color: #E4E4E4;
  }
  .submit{
    position: relative;
    width: 100%;
    height: 3.125rem;
    top: 65%;
  }
  .submit button{
    width: 35%;
    height: 1rem;
    margin: 0 auto;
    font-size: 0.5rem;
    line-height: 0.5rem;
    border-radius: 0.125rem;
  }
</style>
