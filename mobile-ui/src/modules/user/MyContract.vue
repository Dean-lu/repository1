<template>
  <div class="main">
     <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" />
    <div class="list">
      <van-tabs color="#FFB640" v-model="active" @click="onClick">
        <van-tab v-for="(item, index) in tabs" :key="index" :title="item">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell class="list-item" v-for="(item, index) in contract" :key="index" >      
                <div @click="look(item.id)">
                    <div class="float-left">                        
                        <span>房屋租赁合同</span>
                    </div>
                    <div class="float-right">
                        <span v-if="item.order_status==0" class="contract_status">待审核</span>
                        <span v-if="item.order_status==1" class="contract_status">待修改</span>
                        <span v-if="item.order_status==2" class="contract_status">待支付</span>
                        <span v-if="item.order_status==3" class="contract_status">待签约</span> 
                        <span v-if="item.order_status==4" class="contract_status">带入住</span>                        
                        <van-icon name="arrow"/>
                    </div>
                </div>                
            </van-cell>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
  export default {
    name: 'MyContract',
    data () {
      return {
        title:'我的合同',
        areaKeyWord: '',
        roomNum: '',
        active: 0,
        tabs: ['全部','待审核','待修改','待支付','待签约','待入住','已出租'],
        tabsCode: ['all','0','1','2','3','4','-1'],
        loading:false,
        finished:true,
        checkType: 'all',
        contract: []
      }
    },
    mounted(){
      // this.changeStatus()
      this.contactSourct('all');
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1);
      },
      onLoad(){
        
      },
      onClick(name, title) {
       // this.$toast(title + this.tabsCode[this.active]);
        this.contactSourct(this.tabsCode[this.active]);
      },
      contactSourct(chenkType){
        var that = this;
        let param = {
          api_token: this.$store.state.global.api_token,
          order_status: chenkType
        };
        this.$http.post(this.$store.state.global.baseUrl + 'user/my_contract', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              //console.log(res.data.data.data);
              that.contract = res.data.data.data;

            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('获取合同信息失败，请刷新重试！');
            return;
          }
        });
      },      
      //去查看
      look(contractId){
        this.$store.state.locale.contractId = contractId;
        this.$router.push({path : '/HouseUseContact'});
      }
     
    }
  }
</script>

<style scoped lang="less">
.main .van-nav-bar .van-icon,
  .main .van-nav-bar__title{
    color:#FFB640;
  }
  .main .van-nav-bar{
    border-bottom: .11rem solid #f5f5f5;
  }
.main{
    padding-top:1.226667rem;
    box-sizing: border-box;
}
  .division{
    width: 100%;
    height: 1.4rem;
    background-color: #F5F5F5;
  }
  /deep/.van-tabs__nav{
  background:#f5f5f5
}
  /deep/.van-cell{
    padding: 0.125rem auto 0.2rem auto;   
  }
  /deep/.van-cell > div{
    position:relative;
  }
  .search{
    width: 100%;
    height: 1.25rem
  }
/deep/.van-field__control{
    background-color: #E4E4E4
  }
  .contract_status{
      color:#888;
  }
  .search button{
    width: 70%;
    position: relative;
    left: 0.8rem;
    top: 0.125rem;
    
  }
  .list{
    width:100%;
    min-height: 3rem;    
  }
  .list .title{
    text-align:  left;
    font-size: 0.5rem;
    line-height: 1rem;
    color: #FFB640;
  }
  .van-cell .van-image{
    display: inline-block;
    width: 50%;
    min-height: 3.125rem;
    margin-right: 0.3125rem;
    border: 0.03125rem solid #e4e4e445;
    border-radius: 0.625rem;
    overflow: hidden;
  }
  .list-item::after{
      clear:both;
  }
  .house-item{
    &-title{
        display: block!important;
        font-weight: bolder!important;
        width: 100% !important;
        line-height: 1.2rem;
        font-size: 0.5rem;
    }

  }
</style>
