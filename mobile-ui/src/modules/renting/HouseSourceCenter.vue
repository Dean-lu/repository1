<template>
  <div class="house-center">
    <!-- <HeaderBar></HeaderBar> -->
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      :fixed="true"
      color="#FFB640"
      @click-left="onClickLeft"
    />
    <div class="img-head">
      
    </div>
    <div class="search-area">
      <van-col span="12">
        <div class="popup-select">
          <van-field readonly clickable name="search.house_position" :value="valueHousePosition" label="区域:" label-width="1rem" placeholder="区域" @click="showHousePosition = true" />
          <van-popup class="popup-select" v-model="showHousePosition" position="bottom" >
            <van-area :area-list="areaList" title="选择区域" @confirm="confirmHousePosition" @cancel="showHousePosition = false" />
          </van-popup>
        </div>
      </van-col>
      <van-col span="12">
         <div class="popup-select">
          <van-field readonly clickable name="search.house_layout" :value="valueHouseLayout" label="户型:" label-width="1rem" placeholder="户型" @click="showHouseLayout = true" />
          <van-popup class="popup-select" v-model="showHouseLayout" position="bottom" >
            <van-picker show-toolbar title="选择户型" :columns="houseLayouts" @cancel="showHouseLayout = false" @confirm="confirmHouseLayout" />
          </van-popup>
        </div>
      </van-col>
      <van-col span="12">
        <div class="popup-select">
          <van-field readonly clickable name="search.rent_type" :value="valueRentType" label="类型:" label-width="1rem" placeholder="类型" @click="showRentType = true" />
          <van-popup class="popup-select" v-model="showRentType" position="bottom" >
            <van-picker show-toolbar title="选择类型" :columns="RentTypes" @cancel="showRentType = false" @confirm="confirmRentType" />
          </van-popup>
        </div>
      </van-col>
      <van-col span="12">
        <div class="popup-input">
          <van-field v-model="search.garden_name" label="小区:" label-width="1rem" placeholder="输入小区名称" />
        </div>
      </van-col>
      <van-col span="12">
        <div class="popup-input">
          <van-field v-model="search.room_number" label="房号:" label-width="1rem" placeholder="输入房间号" />
        </div>
      </van-col>
      <van-col span="12">
        <div class="button-submit">
          <van-button block size="mini" color="#FFB640" native-type="submit" @click="searchHouseSource">搜索</van-button>
        </div>
      </van-col>
    </div>
    <div class="division"></div>
    <div class="list">
      <div class="title">
        好房推荐
      </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell class="list-item" v-for="(item, index) in houseSource" :key="index" @click="toDetail(item.id)">
          <van-image :src="item.mutet_ids" fill width="3.8rem" height="2rem" class="float-left" />
          <div class="float-left">
            <div class="house-item-title">{{item.garden_name}}</div>
            <div class="house-item-info">租金：{{item.rent_price}}</div>
            <div class="house-item-info">房型：{{item.house_layout}}</div>
            <div class="house-item-info">位置：{{item.house_position}}</div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
  // import HeaderBar from '../../components/common/HeaderBar'
  import areaList from '../../assets/js/area.js'
  export default {
    name: 'HouseSourceCenter',
    // components: {HeaderBar},
    data () {
      return {
        title: '房源中心',
        search: {
          house_position: '',
          house_layout: '',
          rent_type: '',
          garden_name: '',
          room_number: ''
        },
        // 区域列表
        areaList: areaList,
        valueHousePosition: '',
        housePositions: ['岳麓区','雨花区','望城区'],
        showHousePosition: false,
        valueHouseLayout: '',
        houseLayouts:['公寓','一室一厅','一室一厅','二室二厅','二室二厅','三室一厅','三室二厅','四室二厅','五室及以上'],
        showHouseLayout: false,
        valueRentType: '',
        // 付款方式1年付 2半年付 3季付 4月付 租期 1一年 2半年  类型。 1整租 2合租 3转租
        RentTypes:['整租','零租'],
        showRentType: false,
        // 列表参数
        loading: false,// 是否处于加载状态
        finished: true,// 是否加载完毕
        houseSource: [
          {
            id: 0,
            garden_name: "",
            house_layout: "",
            house_position: "",
            rent_price: "",
            // house_img: "[\"storage\\/house\\/house\\/dIviIePV0PYTjsieH2KH7J3jRiFBAPK20jY9EfYf.jpeg\"]",
            mutet_ids: "http://house.growingsale.cn/storage/house/house/dIviIePV0PYTjsieH2KH7J3jRiFBAPK20jY9EfYf.jpeg"
          }
        ]
      }
    },
    mounted(){
      this.searchHouseSource();
    },
    methods: {
      // 组件：确认区域选择
      confirmHousePosition(values) {
        this.valueHousePosition = values.map(item => item.name).join('');
        this.search.house_position = this.valueHousePosition;
        this.showHousePosition = false;
      },
      confirmHouseLayout(value){
        this.valueHouseLayout = value;
        this.showHouseLayout = false;
      },
      confirmRentType(value){
        this.valueRentType = value;
        // this.search.rent_type = value;
        this.showRentType = false;
      },
      // 获取房源信息列表
      searchHouseSource(){
        let that = this;
        this.$http.post(this.$store.state.global.baseUrl + 'house/get_house_list', this.search).then(res => {
          debugger
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
      onLoad(){
        this.searchHouseSource();
      },
      // 房源详情
      toDetail(id){
        
        this.$store.state.renting.id = id;
        console.log(this.$store.state.renting.id)
        this.$router.push({path : '/houseDetail'});
      },
      onClickLeft() {
        this.$router.push({path : '/home'});
      }
    }
  }
</script>

<style scoped lang="less">
  .house-center{
    
  }
  .van-nav-bar__text{
    color: #FFB640;
  }
  .van-nav-bar__title{
    color: #FFB640;
  }
  .van-nav-bar .van-icon{
    color: #FFB640!important;
  }
  .img-head{
    width: 100%;
    height: 5.625rem;
    background-image: url('../../assets/img/renting/house-center-h.png');
    background-repeat: no-repeat;
    background-size: cover; 
  }
  .search-area{
    width: 100%;
    height: 4rem;
  }
  /deep/.popup-select .van-field__control{
    background: url('../../assets/img/renting/arrow.png') no-repeat scroll right center #E5E5E5;
    text-align: left;
    text-indent: 0.2rem;
    padding-right: 0.5rem;
  }
  /deep/ .popup-input .van-field__control{
    background: #E5E5E5;
    text-align: left;
    text-indent: 0.2rem;
  }
  .button-submit button{
    width: 50%;
    margin: 0 auto;
    position: relative;
    left: 0.6125rem;
    top: 0.25rem;
  }
  .division{
    width: 100%;
    height: 0.1875rem;
    background-color: #F5F5F5;
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
    min-height: 3rem;
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
