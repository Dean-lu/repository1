<template>
  <div class="main">
    <HeaderBar></HeaderBar>
    <div class="division"></div>
    <div class="search">
      <div style="width: 90%;margin: 0 auto;">
        <van-col span="12">
          <van-field v-model="keyword" placeholder="请输入小区名称关键词" />
        </van-col>
        <van-col span="6">
          <van-field v-model="roomNumber" placeholder="请输入房号" />
        </van-col>
        <van-col span="6">
          <van-button block size="mini" color="#FFB640" native-type="submit" @click="query">
            搜索
          </van-button>
        </van-col>
      </div>
    </div>
    <div class="list">
      <van-tabs color="#FFB640" v-model="active" @click="onClick">
        <van-tab v-for="(item, index) in tabs" :key="index" :title="item">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell class="list-item" v-for="(item, index) in houseSource" :key="index" @click="toEntrustHouseInfo(item.id)">
              <van-image src="item.house_img" fill width="3.8rem" height="2rem" class="float-left" />
              <div class="float-left">
                <div class="house-item-title">{{item.garden_name}}</div>
                <div class="house-item-info">租金：¥{{item.rent_price}}</div>
                <div class="house-item-info">房型：{{item.house_layout}}</div>
                <!-- <div class="house-item-info">位置：{{item.house_position}}</div> -->
              </div>
            </van-cell>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import HeaderBar from '../../components/common/HeaderBar'
  export default {
    name: 'EntrustHouseSource',
    components: {HeaderBar},
    data () {
      return {
        // 小区名称搜索
        keyword: '',
        // 房号搜索
        roomNumber: '',
        // tab
        active: 0,
        tabs: ['全部','待初审','待复审','已审核'],
        tabsCode: ['all','0','1','2'],
        loading:false,
        finished:true,
        checkType: 'all',
        houseSource: [
          {
            id: 0,
            garden_name: "",
            house_layout: "",
            house_position: "",
            rent_price: "",
            // house_img: "[\"storage\\/house\\/house\\/dIviIePV0PYTjsieH2KH7J3jRiFBAPK20jY9EfYf.jpeg\"]",
            mutet_ids: ""
          }
        ]
      }
    },
    mounted(){
      this.queryHouseSource('all');
    },
    methods: {
      onLoad(){
        
      },
      onClick(name, title) {
        this.queryHouseSource(this.tabsCode[this.active]);
      },
      query(){
        this.queryHouseSource(this.tabsCode[this.active]);
      },
      queryHouseSource(chenkType){
        var that = this;
        let param = {
          api_token: that.$store.state.locale.api_token,
          check_type: chenkType,
          garden_name: this.keyword,
          room_number: this.roomNumber
        };
        this.$http.post(this.$store.state.global.baseUrl + 'scene/scene_index', param).then(res => {
          if(res.status == 200) {
            if(res.data.code == 200){
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
      // 去到详情
      toEntrustHouseInfo(houseId){
        this.$store.state.locale.houseId = houseId;
        console.log(this.$store.state.locale.houseId)
        this.$router.push({path : '/entrustHouseInfo'});
      }
    }
  }
</script>

<style scoped lang="less">
  .division{
    width: 100%;
    height: 1.4rem;
    background-color: #F5F5F5;
  }
  .van-cell{
    padding: 0.125rem;
  }
  .search{
    width: 100%;
    height: 1.25rem
  }
  /deep/.van-field__control{
    background-color: #E4E4E4
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
  .list-item div{
    display: inline-block;
    width: 45%;
  }
  .house-item-title{
    display: block!important;
    font-weight: bolder!important;
    width: 100% !important;
    line-height: 1rem;
    font-size: 0.4rem;
  }
  .house-item-info{
    display: block!important;
    line-height: 0.625rem;
    text-align: left;
    color: lightgrey;
    width: 100%!important;
  }
</style>
