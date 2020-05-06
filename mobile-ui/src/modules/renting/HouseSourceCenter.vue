<template>
  <div class="house-center">
    <!-- <HeaderBar></HeaderBar> -->
    <!-- <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      :fixed="true"
      color="#FFB640"
      @click-left="onClickLeft"
    /> -->
    <!-- <div class="img-head">
      
    </div> -->
    <div class="search-area">
      <form action="/">
      <van-col span="8">
        <div class="popup-select">
          <van-field readonly clickable name="house_positionshow" :value="house_positionshow" placeholder="区域" @click="showHousePosition = true" />
          <van-popup class="popup-select" v-model="showHousePosition" position="bottom" >
            <van-area :area-list="areaList" title="选择区域" @confirm="confirmHousePosition" @cancel="showHousePosition = false" />
          </van-popup>
        </div>
      </van-col>
      <van-col span="8">
         <div class="popup-select">
          <van-field readonly clickable name="search.house_layout" :value="search.house_layout" placeholder="户型" @click="showHouseLayout = true" />
          <van-popup class="popup-select" v-model="showHouseLayout" position="bottom" >
            <van-picker show-toolbar title="选择户型" :columns="houseLayouts" @cancel="showHouseLayout = false" @confirm="confirmHouseLayout" />
          </van-popup>
        </div>
      </van-col>
      <van-col span="8">
        <div class="popup-select">
          <van-field readonly clickable name="search.rent_type" :value="valueRentType"  placeholder="类型" @click="showRentType = true" />
          <van-popup class="popup-select" v-model="showRentType" position="bottom" >
            <van-picker show-toolbar title="选择类型" :columns="RentTypes" @cancel="showRentType = false" @confirm="confirmRentType" />
          </van-popup>
        </div>
      </van-col>      
      <!-- <van-col span="12">
        <div class="popup-input">
          <van-field v-model="search.room_number" label="房号:" label-width="1rem" placeholder="输入房间号" />
        </div>
      </van-col> -->      
      <van-col span="24">
       <van-search
          v-model="search.garden_name"
          show-action     
          left-icon=''    
          placeholder="请输入小区名称"
          @search="searchHouseSource">
          <template #action>
            <div @click="searchHouseSource" class="search_btn">
              <img src="../../assets/img/renting/search_inco.jpg"/>
            </div>
          </template>
        </van-search>
      </van-col>
      </form>      
    </div>
    <div class="divisiodaxian"></div>
    <div class="list">
      <!-- <div class="title">
        好房推荐
      </div> -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="10"  :error.sync="error" error-text="请求失败，点击重新加载"  >
        <van-cell class="list-item" v-for="(item, index) in houseSource" :key="index" @click="toDetail(item.id)">
          <van-image :src="item.house_img" fill width="3.8rem" height="3rem" class="position_img" />
          <div>
            <div class="house-item-title"><span>{{item.garden_name}}</span></div>            
            <div class="house-item-info">房型：{{item.house_layout}}</div>
            <div class="house-item-info">位置：{{item.house_position}}</div>
            <div class="house-item-price"><span>{{item.rent_price}}</span>元/月</div>
          </div>
        </van-cell>
        
      </van-list>
    </div>
  </div>
</template>

<script>
  // import HeaderBar from '../../components/common/HeaderBar'
  import areaList from '../../assets/js/area.js'
  //import shareApi from '../../common/until'
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
        //上拉刷新
        loading: false,// 是否处于加载状态
        finished: true,// 是否加载完毕
        error: false,    
        PageIndex:1,
        lastPage:0,
        house_positionshow:'',
        list:[],
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
        RentTypes:['整租','合租'],
        showRentType: false,
        // 列表参数
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
      document.title="房源中心";
      this.searchHouseSource();
      this.share();
    },
    methods: {
      share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
      // 组件：确认区域选择
      confirmHousePosition(values) {
        console.log(values);
        this.house_positionshow=values[2].name;
        this.search.house_position = values.map(item => item.name).join('');
        this.showHousePosition = false;
      },
      confirmHouseLayout(value){
        // this.valueHouseLayout = value;
        this.search.house_layout = value;
        this.showHouseLayout = false;
      },
      confirmRentType(value,index){
        this.valueRentType = value;
        this.search.rent_type = index +1;
        this.showRentType = false;
      },
      // 获取房源信息列表
      searchHouseSource(){
        let that = this;
        //debugger
        this.$http.post(this.$store.state.global.baseUrl + 'house/get_house_list', that.search).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.houseSource = res.data.data.data;
              that.lastPage=res.data.data.last_page;
              // 加载状态结束
              that.loading = false;  
              that.finished = false;            
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('获取房源信息失败，请刷新重试！');
            return;
          }
        });
      },
      onLoad() {
        if(this.PageIndex >= this.lastPage){
          this.loading = true;
          this.finished = true;
          return false;          
        }
        this.PageIndex++;
         let that = this;
        this.$http.post(this.$store.state.global.baseUrl + 'house/get_house_list',{
              Status: 1,
              page: that.PageIndex,
              PageSize: 10,
         }).then(res => {
          if(res.status == 200) {
            if(res.data.code == 200){
              for(let j=0,len=res.data.data.data.length;j<len;j++){
                  that.houseSource.push(res.data.data.data[j]);
              }             
              // 加载状态结束
              that.loading = false;
              if(!res.data.data.data ){
                that.finished = true;
              }
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('获取房源信息失败，请刷新重试！');
            return;
          }
        });
    },
    
      // 房源详情
      toDetail(id){
        
        this.$store.state.renting.id = id;
        console.log(this.$store.state.renting.id)
        sessionStorage.setItem("houseId", id); 
        this.$router.push({path : '/houseDetail'});
      },
      resetSearch(){
        this.valueRentType = '';
        this.search = {
          house_position: '',
          house_layout: '',
          rent_type: '',
          garden_name: '',
          room_number: ''
        }
      },
      onClickLeft() {
        this.$router.push({path : '/home'});
      }
    }
  }
</script>

<style scoped lang="less">
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
    // height: 4rem;
  }
  /deep/.popup-select .van-field__control{
    background: url('../../assets/img/renting/arrow.png') no-repeat scroll right center ;
    text-align: left;
    text-indent: 0.2rem;
    padding-right: 0.5rem;
    color:#000;
  }
  /deep/ .popup-input .van-field__control{
    background: #E5E5E5;
    text-align: left;
    text-indent: 0.2rem;
  }
  .button-submit button{
    display: inline-block;
    width: 40%;
    margin: 0.25rem auto 0 auto;
    font-size:0.4rem;
    padding:0.1rem;
    height:0.7rem;
//     position: relative;
//     left: 0.6125rem;
//     top: 0.25rem;
  }
  /deep/.van-search__content{
    background:#dcdcdc;
    .van-cell{
      padding:6px 10px;
    }
  }
  // /deep/.van-search{
  //    background: #f5f5f5;
  // }
  /deep/.van-search__action{
    padding:0 8px 0 0;   
       
  }

  .search_btn{
    // padding:10px 0;
    background: #f5f5f5;
    // line-height:32px;
    vertical-align: middle;
    img{
       vertical-align: middle;
    }
  }
  .division{
    width: 100%;
    height: 0.1875rem;
    background-color: #F5F5F5;
  }
  .list{
   
    min-height: 3rem;
  }
  .list .title{
    text-align:  left;
    font-size: 0.5rem;
    line-height: 1rem;
    color: #FFB640;
    padding:0 0.5rem;
  }
  /deep/.van-cell {
    font-size:0.4rem;
    line-height:0.6rem;
    padding: 10px;
  }
  .van-cell .van-image{
    display: inline-block;
    width: 50%;
    min-height: 3rem;
    margin-right: 0.3125rem;
    border: 0.03125rem solid #e4e4e445;
    // border-radius: 0.625rem;
    overflow: hidden;
  }
  .list-item div{
    display: inline-block;
   
  }
  .list-item .van-cell__value{position:relative; min-height:3.3rem; padding-left:4.23rem; box-sizing:border-box;}
  
  /deep/.position_img{
    position:absolute;
     left:0; top:0; 
     width:3.8rem;
     height:3rem;
     }
  .house-item-title{
    display: block!important;
    font-weight: bolder!important;
    width: 100% !important;
    height:1.2rem;
    font-size: 0.45rem;
    color: #494949;
    line-height:0.6rem;
    display:flex;
    align-items:center;
    span{
      font-size: 0.45rem;
      overflow:hidden;
      text-overflow:-o-ellipsis-lastline;
      text-overflow:ellipsis;
      display:-webkit-box;
      -webkit-line-clamp:2;
      line-clamp:2;
      -webkit-box-orient:vertical;
    }
  }
  .house-item-info{
    display: block!important;
    line-height: 0.6rem;
    text-align: left;
    color: #9fa0a0;
    width: 100%!important;
    font-size: 0.38rem;
  }
  .house-item-price{
    line-height: 0.6rem;
    text-align: left;
    color: #f00;
    width: 100%!important;
    font-size: 0.35rem;
    font-weight:bold;
    span{
      font-size: 0.4rem;
    }
  }
  /deep/.van-picker__cancel, /deep/.van-picker__confirm{
    color: #F8B729;
  }
</style>
