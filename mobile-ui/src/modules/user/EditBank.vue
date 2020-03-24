<template>
  <div class="confirm-rent">
    <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" />
     <div>
      <!-- 没有银行卡信息 -->
      <div v-if="is_show==='none'">

      </div>
      <!-- 有银行卡信息 -->
      <div v-if="is_show=='has'">

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
      title: "编辑银行卡",
      form:{
          
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
  width: 124px;
  height: 33.5px;
  line-height: 33.5px;
  color: white;
  background: #ffb640;
  font-size: 18px;
  border-radius: 4px;
  bottom: 49px;
  display: block;
  margin: 0 auto;
}
textarea {
  width: 90%;
  min-height: 200px;
  background: #e3e3e3;
  margin-top: 100px;
  padding: 6px;
  border-radius: 6px;
  color: black;
  font-size: 18px;
  border: none;
}
</style>
