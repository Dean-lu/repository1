<template>
<div class="main">
    <div class="top"></div>
    <div class="contact">
      <p>服务热线：400-167-0731<br/>
      周一到周日：07:00-24:00<br/>
      联系邮箱：fanggj2020@163.com</p>
    </div>
</div>    
</template>
<script>
export default {
   name: 'More',  
  data () {
    return{

    }
  },
  mounted(){
    this.share();
  },
  methods:{
    share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       }

  }
}

 
</script>
<style lang="less" scoped>
.contact{
  width:85%;
  margin:0 auto;
  text-align: left;
  line-height:1.2rem;
  font-size:0.5rem;
  margin-top:1rem;
}
.top{
    width: 100%;
    min-height: 6.25rem;
    background: url("../../assets/img/home/home-bg.png") no-repeat;
    background-size:100% 100%;
  }
</style>