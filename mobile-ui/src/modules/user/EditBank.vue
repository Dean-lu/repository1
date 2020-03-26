<template>
  <div class="confirm-rent">
    <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" />
     <div class="bindConter" >
        <p class="bindcard">请绑定本人的银行卡</p>  
       <van-form>           
        <van-field type="text"  label="卡号" label-align="right"  v-model="form.bank_card_no" />
        <van-field type="text" label="电话号码" label-align="right" v-model="form.bind_tel" />
        <div class="btn" @click="save">
              保 存
          </div>
       </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditBank",
  data() {
    return {
      is_show: "none",
      title: "绑定银行卡",
      form:{
          bank_card_no:'',
          bind_tel:'',
          api_token:this.$store.state.global.api_token
      }
    };
  },
  mounted() {
   // this.init()
  },
  methods: {
    init(){
        var that=this
         this.$http.post(this.$store.state.global.baseUrl + "user/bind_card",{
           api_token:this.$store.state.global.api_token
         })
        .then(res => {
          if (res.status == 200) {
            if (res.data.code == 200) {
              //todo 
              this.is_show='none'
            } else {
              that.$toast(res.data.msg);
            }
          } else {
            that.$toast("系统异常！");
          }
        });
    },
     onClickLeft() {
        this.$router.back(-1);
      },
    save(){
      var that = this;
      console.log(that.form.bank_card_no)
      if (!that.form.bank_card_no || !that.form.bind_tel) {
        that.$toast("填写银行卡号和手机号后才能提交");
        return false; 
      }
      if(!(/^1[3456789]\d{9}$/.test(that.form.bind_tel))){ 
        that.$toast('填写的手机号格式不正确');
        return false; 
      }
      this.$http
        .post(this.$store.state.global.baseUrl + "user/bind_card", this.form)
        .then(res => {
          if (res.status == 200) {
            if (res.data.code == 200) {
              that.$toast("提交成功");
              setTimeout(() => {
                that.$router.back(-1);
              }, 3000);
            } else {
              that.$toast(res.data.msg);
            }
          } else {
            that.$toast("系统异常！");
          }
        });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/user/login-b.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.button-container {
  position: relative;
  width: 83%;
  height: 61.5%;
  background-color: #ffffff;
  top: 61.8%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.3125rem;
  padding-top: 0.6125rem;
  color: #959595;
}
.link {
  color: #959595;
  width: 80%;
  margin: 0 auto;
  margin-top: 0.4125rem;
}
a:link {
  color: #df9d9d;
  text-decoration: underline;
}
/* .bindConter{
  margin-top:1rem;
} */
.van-cell {
  color: #959595;
  background-color: #f5f5f5;
  border-radius: 0.225rem;
  width: 90%;
  height: 1.2rem;
  margin: 0.15rem auto;
  line-height: 0.8rem;
}
.division {
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
.submit {
  width: 4.375rem;
  height: 0.9375rem;
  margin: 0 auto;
  margin-top: 6.25rem;
}
.van-button--small {
  font-size: 0.5rem;
}
.cont {
  text-align: center;
  width: 100%;
  height: 34px;
  position: fixed;
  bottom: 49px;
}
.btn {
  width: 6.763285024rem;
  height: 0.857487923rem;
  line-height: 0.857487923rem;
  color: white;
  background: #ffb640;
  font-size: 0.217391304rem;
  border-radius: 0.048309179rem;
  /* bottom: 49px; */
  display: block;
  margin: 0 auto;
  margin-top: 1.195652174rem;
}
.bindcard{
  width:100%;color:black;font-size: 0.217391304rem;margin-top: 1.63236715rem;
  text-align: left;padding-left: 0.169082126rem;
  margin-left:0.15rem;
}
input{
  width:7.971014493rem;
  height:0.857487923rem;
  font-size: 0.193236715rem;
  padding-left: 0.120772947rem;
  color:black;
  background:rgb(220, 221, 221);
  border-radius: 0.048309179rem;
  margin-top: 0.120772947rem;
}
</style>
