<template>
  <div class="main">
     <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" />
    <div class="list">
      <van-tabs color="#FFB640" v-model="active" @click="onClick">
        <van-tab v-for="(item, index) in tabs" :key="index" :title="item">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell class="list-item" v-for="(item, index) in houseSource" :key="index" >
              <div class="float-left" width="3.8rem" height="2rem" v-for="(items, index) in item.house_img" v-if="(index===0)">
                <van-image :src="items"  fill width="3.8rem" height="2rem" />
              </div>
              
              <div class="house-item float-left">
                <div class="house-item-title">{{item.garden_name}}</div>
                <div class="house-item-info">租金：¥{{item.rent_price}}</div>
                <div class="house-item-info">房型：{{item.house_layout}}</div>
                <div class="house-item-info">位置：{{item.house_position}}</div>
                <button v-if="item.current_status==4" class="house-item-edit" @click="look(item.id)">查看</button>
                <button v-if="item.current_status==-1" class="house-item-edit" @click="sign(item.id)">签约</button>
                <button v-else class="house-item-edit" @click="edit(item.id)">修改</button>               
                </div>
               
            </van-cell>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyEntrust',
    data () {
      return {
        title:'我的委托',
        areaKeyWord: '',
        roomNum: '',
        active: 0,
        tabs: ['全部','初审中','复审中','待修改','已审核','已出租','待签约'],
        tabsCode: ['all','0','1','2','3','4','-1'],
        loading:false,
        finished:true,
        checkType: 'all',
        houseSource: []
      }
    },
    mounted(){
      this.queryHouseSource('all');
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1);
      },
      onLoad(){
        
      },
      onClick(name, title) {
        //this.$toast(title +this.tabsCode[this.active]);
        this.queryHouseSource(this.tabsCode[this.active]);
      },
      query(){
        this.queryHouseSource(this.tabsCode[this.active]);
      },
      queryHouseSource(chenkType){
        var that = this;
        let param = {
          api_token: this.$store.state.global.api_token,
          check_status: chenkType
        };
        this.$http.post(this.$store.state.global.baseUrl + 'user/my_entrust', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              //console.log(res.data.data.data);
              that.houseSource = res.data.data.data;
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
      edit(houseId){
        this.$store.state.locale.houseId = houseId;
        console.log(this.$store.state.locale.houseId)
        this.$router.push({path : '/EditEntrust'});
      },
      //去查看
      look(houseId){
        this.$store.state.locale.houseId = houseId;
        console.log(this.$store.state.locale.houseId)
        this.$router.push({path : '/LookEntrust'});
      },
      sign(houseId){
        this.$store.state.locale.houseId = houseId;
        console.log(this.$store.state.locale.houseId)
        this.$router.push({path : '/HouseContact'});
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
/deep/.van-tabs__nav{
  background:#f5f5f5
}
  .division{
    width: 100%;
    height: 1.4rem;
    background-color: #F5F5F5;
  }
 
  /deep/.van-cell > div{
    position:relative;
  }
  .search{
    width: 100%;
    height: 1.25rem
  }
  .van-field__control{
    background-color: #E4E4E4
  }
  /deep/.van-cell:not(:last-child)::after{
    left:0;
    border-bottom: 0.11rem  solid #f5f5f5;
  }
  .search button{
    width: 70%;
    position: relative;
    left: 0.8rem;
    top: 0.125rem;
    
  }
  .list{
    width: 100%;
    min-height: 3rem;
    // margin: 0 auto;
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
    border-radius: 0.425rem;
    overflow: hidden;
  }
  .list-item::after{
      clear:both;
  }
  .list-item div{
    display: inline-block;
    width: 45%;    
  }
  .list-item > div{
      position:relative;
      // padding-bottom:0.8rem;
  }
  .house-item{
    &-title{
        display: block!important;
        font-weight: bolder!important;
        width: 100% !important;
        line-height: 1rem;
        font-size: 0.4rem;
    }
    &-info{
        display: block!important;
        line-height: 0.625rem;
        text-align: left;
        color: #9fa0a0;
        width: 100%!important;
    }
    &-edit{
        // position:absolute;
        // right:0;
        // bottom:0;
        float:right;
        background: #f7b343;
        width: 1.5rem;
        border:0 none;
        color:#fff;
        border-radius:0.12rem;
    }
  }
</style>
