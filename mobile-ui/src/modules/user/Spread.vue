<template>
  <div class="confirm-rent">
    <!-- <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" /> -->
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
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="10"  :error.sync="error" error-text="请求失败，点击重新加载">
          <div style="-webkit-overflow-scrolling : touch; position: relative;">
            <ul>
              <li class="border-1px flex" v-for="(item,index) in list" :key="index">
                <div class="txt-content">
                  <p class="float-left">{{item.desc}}</p>
                  <!-- <p class="float-left" v-if="item.type == 2">分佣</p> -->
                  <div class="count float-right" :class="{increase:item.type == 1}">{{item.type == 1 ? '-' : '+'}}{{item.money}}</div>
                  <span v-text="item.created_at"></span>
                </div>

              </li>
            </ul>
          </div>
        </van-list>
      </div>


    </div>
  </div>
</template>

<script>
//import shareApi from '../../common/until'
  export default {
    name: "Spread",
    data() {
      return {
        is_show: true,
        title: "推广赚钱",
        balance:'0.00',
        //上拉刷新
        loading: false,// 是否处于加载状态
        finished: true,// 是否加载完毕
        error: false,
        PageIndex:1,
        lastPage:0,
        list:[],
      };
    },
    mounted() {
      document.title = "推广赚钱";
      this.getList();
      this.init();
      this.share();
    },
    methods: {
      share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
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
        var that = this;
        var p={api_token:this.$store.state.global.api_token};
       // var p={api_token:"AOb63rV2N54HOhMSnVCyzssRXFHNyzTWArh1mjP0s6wgaHyKLuCqeWVlKvbZ2PE3x1UMObqjZfh2DDZyiiYkPHAC7rqi30o16wEX"}
        this.$http.post(this.$store.state.global.baseUrl + 'spread/spread_center',p).then(res => {
          if(res.status == 200) {
            if(res.data.code == 200){
              that.list = res.data.data.data;
              that.lastPage=res.data.data.last_page;
              // 加载状态结束
              that.loading = false;
              that.finished = false;
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('获取资金明细失败，请刷新重试！');
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
        this.$http.post(this.$store.state.global.baseUrl + 'spread/spread_center',{
          api_token:this.$store.state.global.api_token,
          page: that.PageIndex,
          PageSize: 10,
        }).then(res => {
          if(res.status == 200) {
            if(res.data.code == 200){
              for(let j=0,len=res.data.data.data.length;j<len;j++){
                that.list.push(res.data.data.data[j]);
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
            that.$toast('获取资金明细失败，请刷新重试！');
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
  .confirm-rent{
    /* overflow: hidden; */
  }
  .van-nav-ba{
    border-bottom:.11rem solid #f5f5f5;
  }
  .top-info{
    background:url('../../assets/img/user/spreadbg.jpg') no-repeat;
    background-size:100%;
    position: relative;
    width: 100%;
    height: 4.2rem;
    /* margin-top: 1.226667rem; */
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
    padding: .06rem;
    font-size:0.35rem;
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
