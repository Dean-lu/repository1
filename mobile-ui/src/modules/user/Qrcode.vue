<template>
  <div class="confirm-rent">
    <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" />
    <div style="height:1.226667rem;border-bottom: .11rem solid #f5f5f5;"></div>
    <div class="qrcode-bg"></div>
    <div class="my-qrcode">
     <van-image width="100%" :src="qrcode" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Qrcode",
  data() {
    return {
      is_show: true,
      title: "我的二维码",
      qrcode:''
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    onClickLeft() {
        this.$router.back(-1);
      },
    init(){
      var that=this;
      this.$http.get(this.$store.state.global.baseUrl + "spread/my_qrcode?api_token="+this.$store.state.global.api_token)
          .then(res => {
            that.qrcode = res.data;
          });
    },
  }
};
</script>

<style scoped lang="less">
  #app{
    background: #595757;
  }
  .qrcode-bg{
    background: #595757;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .my-qrcode{
    width: 5rem;
    height: 5rem;
    margin: 0 auto;
    margin-top: 25%;
  }
</style>
