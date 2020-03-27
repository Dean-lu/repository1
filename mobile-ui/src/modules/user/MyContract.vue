<template>
  <div class="main">
     <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" />
    <div class="list">
      <van-tabs color="#FFB640" v-model="active" @click="onClick">
        <van-tab v-for="(item, index) in tabs" :key="index" :title="item">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell class="list-item" v-for="(item, index) in contract" :key="index" >              
                <div v-if="item.rent_status==1" @click="edit(item.id)">
                    <div class="float-left">                        
                        <span>{{item.name}}</span>
                    </div>
                    <div class="float-right">
                        <span class="contract_status">{{item.contact_status}}</span>
                        <van-icon name="arrow"/>
                    </div>                    
                </div>
                <div v-else  @click="look(item.id)">
                    <div class="float-left">                        
                        <span>{{item.name}}</span>
                    </div>
                    <div class="float-right">
                        <span class="contract_status">{{item.contact_status}}</span>
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
        contract: [
          {
            id: 0,
            name:"房屋租赁合同1",            
            rent_status:2,
            contact_status:1
          },
          {
            id: 0,
            name:"房屋租赁合同2",            
            rent_status:1,
            contact_status:0
          },
          {
            id: 0,
            name:"房屋租赁合同3",            
            rent_status:1,
            contact_status:1
          }
        ]
      }
    },
    mounted(){
       this.changeStatus()
      //this.contactSourct('all');
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1);
      },
      onLoad(){
        
      },
      onClick(name, title) {
        this.$toast(title + this.active);
        this.contactSourct(this.tabsCode[this.active]);
      },
      query(){
        this.$toast(title + this.active);
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
              //that.houseSource = res.data.data.data;
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('获取房源信息失败，请刷新重试！');
            return;
          }
        });
      },      
      // 去编辑
      edit(contractId){
       this.$store.state.locale.contractId = contractId;
        this.$router.push({path : '/HouseContact'});
      },
      //去查看
      look(contractId){
        this.$store.state.locale.contractId = contractId;
        this.$router.push({path : '/HouseContact'});
      },
      Status(res){
            console.log(res);
            let status=Number(res);
            switch (status) {
                case 0:
                    return "待审核"
                case 1:
                    return "待修改"
                case 2:
                    return "待支付"
                case 3:
                    return "待签约"
                case 4:
                    return "待入住"
                default:
                    return "待审核"
            }             
      },
      changeStatus(){
          const that=this;
          for(let j=0,len=that.contract.length;j<len;j++){ 
              console.log(len +"len");
              that.contract[j].contact_status=that.Status(that.contract[j].contact_status);
              Vue.set(that.contract,j,that.contract[j])
            }  
      }
    }
  }
</script>

<style scoped lang="less">
.main{
    padding-top:1.226667rem;
    box-sizing: border-box;
}
  .division{
    width: 100%;
    height: 1.4rem;
    background-color: #F5F5F5;
  }
  .van-cell{
    padding: 0.125rem auto 0.2rem auto;   
  }
  .van-cell > div{
    position:relative;
  }
  .search{
    width: 100%;
    height: 1.25rem
  }
.van-field__control{
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
    width: 90%;
    min-height: 3rem;
    margin: 0 auto;
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
