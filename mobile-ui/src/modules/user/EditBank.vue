<template>
  <div class="confirm-rent">
    <!-- <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" /> -->
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
    document.title = "绑定银行卡";
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
      // if(that.form.bank_card_no.length!=19 || that.form.bank_card_no.length!=16){
      //   that.$toast('请填写正确的银行卡号！');
      //   return false;
      // }
      this.$http
        .post(this.$store.state.global.baseUrl + "user/bind_card", this.form)
        .then(res => {
          if (res.status == 200) {
            if (res.data.code == 200) {
              that.$toast("提交成功");
              setTimeout(() => {
                that.$router.push({ path: "/Bank" });
              }, 1000);
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

<style scoped lang="less">

.confirm-rent .van-nav-bar .van-icon,
  .confirm-rent .van-nav-bar__title{
    color:#FFB640;
  }
  .confirm-rent .van-nav-bar{
    border-bottom: .11rem solid #f5f5f5;
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
/deep/.van-cell {
  color: #959595;
  background-color: #f5f5f5;
  border-radius: 0.225rem;
  width: 90%;
  height: 1.2rem;
  margin:0.4rem  auto;
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
/deep/.van-button--small {
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
  font-size: 0.417391304rem;
  border-radius: 0.048309179rem;
  /* bottom: 49px; */
  display: block;
  margin: 0 auto;
  margin-top: 1.195652174rem;
}
.bindcard{
  width:100%;color:black;
  font-size: 0.417391304rem;
  margin-top: 1.83236715rem;
  text-align: left;padding-left: 0.169082126rem;
  margin-left:0.15rem;
  line-height:0.8rem;
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
