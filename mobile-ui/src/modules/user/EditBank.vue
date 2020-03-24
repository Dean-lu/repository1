<template>
  <div class="confirm-rent">
    <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" />
     <div>
       <p class="bindcard">请绑定本人的银行卡</p>
       <input type="text" placeholder="卡号" v-model="cardno" />
       <input type="text" placeholder="手机号" v-model="telphone">
        <div class="btn" @click="save">
              保 存
          </div>
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
          cardno:'',
          telphone:''
      }
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
        var that=this
         this.$http.post(this.$store.state.global.baseUrl + "user/bank", this.user)
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
      if (that.bankno == "" || that.telphone == undefined) {
        that.$toast("填写银行卡号和手机号后才能提交");
      }
      this.$http
        .post(this.$store.state.global.baseUrl + "user/bank", this.user)
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
    },
    onSubmit() {
      var that = this;
      if (that.advice == "" || that.advice == undefined) {
        that.$toast("填写投诉建议后才能提交");
      }
      this.$http
        .post(this.$store.state.global.baseUrl + "user/advice", this.user)
        .then(res => {
          if (res.status == 200) {
            if (res.data.code == 200) {
              that.$toast("提交成功");
              setTimeout(() => {
                that.$router.push({ path: "/mine" });
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
.link div {
}
a:link {
  color: #959595;
  text-decoration: underline;
}
.van-cell {
  color: #959595;
  background-color: #f5f5f5;
  border-radius: 0.625rem;
  width: 90%;
  height: 0.8rem;
  margin: 0.125rem auto;
  line-height: 0.4rem;
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
  width:100%;color:black;font-size: 0.217391304rem;margin-top: 1.93236715rem;
  text-align: left;padding-left: 0.169082126rem;
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
