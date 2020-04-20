<template>
     <div>
        <img style="width:100%" :src="contactDetai_img" ref="contactDetai_img">
         <button v-if="contact.order_status==4" @click="submitList" class="btnOrange">提交房屋清单</button>
         <div class="tips" v-if="showTips">
            正在载入签约合同,请稍等..... 
         </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            contactDetai_img:"",
            showTips:true
        }
    },
    mounted(){
        this.share();
        this.init();
    },
    methods:{
         share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
        init(){
        //debugger
        let that = this;
        let param = {
          api_token: this.$store.state.global.api_token,
          order_id: this.$store.state.locale.contractId,
        };
        this.$http.post(this.$store.state.global.baseUrl + 'base/lease_contract', param).then(res => {          //debugger
         
          if(res.status == 200) {
             that.showTips=false;
            if(res.data.code == 200){
              that.contact = res.data.data;
              console.log(res.data.data);
              if(res.data.data.order_status==4 || res.data.data.order_status==5){
                that.contactDetai_img=res.data.data.contact_path;
                that.$refs.contactDetai_img.src=res.data.data.contact_path;
                console.log(res.data.data.contact_path)
              }
              
              //that.$store.state.locale.editHouseInfo = res.data.data;             
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('获取合同详情失败，请刷新重试！');            
            // setTimeout(() => {
            //     this.$router.back(-1);
            // }, 1000);
            return;
          }
        });
        
      },
      submitList(){
        this.$router.push({path : '/HouseBag'});
      }
    }
}
</script>
<style lang="less" scoped>
.btnOrange{
    width:60%;
    margin:0.8rem auto;
    color:#fff;
    border:0 none;
    background: #f7b343;
    line-height:0.8rem;
    border-radius: 0.2rem;
    display: block;
}
.tips{
  font-size:0.6rem;
  line-height: 1rem;
  width:80%;
  margin:0 auto;
}
</style>