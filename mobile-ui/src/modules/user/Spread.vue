<template>
  <div class="confirm-rent">
    <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" />
    <div>
      <div class="top-info">
        <div class="info-box">
          <div class="info">
            <p>可用余额</p>
            <p v-text="balance"></p>
            <p class="tolink" @click="jump('Draw')">去提现</p>
          </div>
        </div>
      </div>
      <div class="nav">
        <van-row class="mine-list">
          <ul>
            <li @click="jump('Qrcode')">
              <div class="float-left">
                <span>我的二维码</span>
              </div>
              <div class="float-right">
                <van-icon name="arrow" />
              </div>
            </li>
            <li @click="jump('Enstuctlist')">
              <div class="float-left">
                <span>委托推荐</span>
              </div>
              <div class="float-right">
                <van-icon name="arrow" />
              </div>
            </li>
            <li @click="jump('Rentlist')">
              <div class="float-left">
                <span>出租推荐</span>
              </div>
              <div class="float-right">
                <van-icon name="arrow" />
              </div>
            </li>
            <li>
              <div class="float-left">
                <span>资金明细</span>
              </div>
            </li>
          </ul>
        </van-row>
      </div>
          <div class="info-list" ref="bsDom">
          <div style="-webkit-overflow-scrolling : touch; position: relative;">
            <ul>
              <li class="border-1px flex" v-for="item in group.list" v-cloak="">
                <div class="txt-content">
                  <p class="float-left" v-if="item.type == 1">提现</p>
                  <p class="float-left" v-if="item.type == 2">分佣</p>
                  <div class="count float-right" :class="{increase:item.type == 1}">{{item.type == 1 ? '-' : '+'}}{{item.money}}</div>
                  <span v-text="item.created_at"></span>
                </div>

              </li>
            </ul>
            <p class="loading-line" v-show="loading == true"><i></i><span>正在加载中</span><i></i></p>
            <p class="loading-line" v-show="loading == false && group.loaded == false" v-cloak=""><i></i><span>加载更多</span><i></i></p>
            <p class="loading-line" v-show="loading == false && group.loaded == true" v-cloak=""><i></i><span>没有更多了</span><i></i></p>
          </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "Spread",
  data() {
    return {
      is_show: true,
      title: "推广赚钱",
      balance:'0.00',
      group:{
        page:1,
        lastpage: 0,
        limit: 15,
        list:[],
        loaded:false
      },
      loading: false,
      scroll:null,
    };
  },
  mounted() {
    this.getList();
    this.init();
  },
  methods: {
    onClickLeft() {
        this.$router.back(-1);
      },
    init(){
      var that = this;
      var api_token = this.$store.state.global.api_token;
      this.$http.get(this.$store.state.global.baseUrl + 'user/edit_user?api_token='+api_token).then(res => {
        if(res.status == 200) {
          if(res.data.code == 200){
            that.balance = res.data.data.balance;
          }else{
            that.$toast(res.data.msg);
          }
        }
      });
    },
    getList(){
      var that = this,group = that.group;
      if(that.loading || that.lastpage)return;
      if(group.loaded) return ;
      this.loading = true;
      var p={api_token:this.$store.state.global.api_token,page:group.page,};
      this.$http.post(this.$store.state.global.baseUrl + 'spread/spread_center',p).then(res => {
        if(res.status == 200) {
          that.loading = false;
          if(res.data.code == 200){
            var list = res.data.data.data,groupLength = group.list.length;
            that.group.lastpage = res.data.data.last_page;
            if(res.data.data.last_page != res.data.data.page)that.group.page++;//如果不是最后一页当前页码加1
            group.loaded = list.length < group.limit;
            group.list = group.list.concat(list);
            that.loading = false;
          }else{
            that.$toast(res.data.msg);
          }
        }else{
          that.$toast('获取我的委托推荐失败，请刷新重试！');
          return;
        }
      });
    },
    jump(type){
      this.$router.push({path:'/'+type})
    }

  }
};
</script>

<style scoped>
  .van-nav-ba{
    border-bottom:.11rem solid #f5f5f5;
  }
  .top-info{
    background:url('../../assets/img/user/spreadbg.jpg') no-repeat;
    background-size:100%;
    position: relative;
    width: 100%;
    height: 4.2rem;
    margin-top: 1.226667rem;
  }
  .top-info .info-box{
    position: absolute;
    width: 100%;
    top: 33%;
  }
  .top-info .info{
    color: #fff;
    font-size: .4rem;
  }
  .top-info .info p{
    padding: 0;
    margin: 0;
  }
  .top-info .info p:nth-child(2){
    font-weight: bold;
    padding:.2rem 0;
  }
  .top-info .info p.tolink{
    color:#f7b343;
    background: #ffffff;
    display: inline-block;
    padding: .06rem .1rem;
  }
  .mine-list{
    font-size: 0.5rem;
    width: auto;
    margin: 0.125rem;
    border-radius: 0.3125rem;
  }
  .mine-list ul li{
    display: block;
    color: #595757;
    font-size: .44rem;
    padding: .15rem .4rem;
    line-height: .6rem;
    clear: both;
    overflow: hidden;
    border-bottom:.11rem solid #f5f5f5;
  }
  .info-list{
    text-align: left;
  }
  .info-list li {
    padding: .2rem 0;
    font-size: .4rem;
    color: #595757;
    line-height: 1.5;
    position: relative;
    border-bottom:.05rem solid #f5f5f5;
    padding: .15rem .4rem;
    line-height: .6rem;
  }
  .info-list li p{
    margin: 0;
  }
  .info-list li span {
    clear: both;
    display:block;
    font-size: .35rem;
    padding-top: .15rem;
    color: #9fa0a0;
  }
  .info-list li .count {
    font-size: .4rem;
    color: #595757;
  }
  .loading-line {
    background-color: #fff;
    height: .7rem;
    line-height: .7rem;
    text-align: center;
  }
  .loading-line i {
    display: inline-block;
    width: .3rem;
    height: 1px;
    background-color: #333;
    vertical-align: middle;
  }
</style>
