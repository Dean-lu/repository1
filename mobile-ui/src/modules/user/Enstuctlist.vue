<script src="../../store/renting/state.js"></script>
<template>
  <div class="confirm-rent">
    <!-- <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" /> -->
    <!-- <div style="height:1.226667rem;border-bottom: .11rem solid #f5f5f5;"></div> -->
    <van-list class="enstuct_list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell class="item" v-for="(item, index) in enstuctList" :key="index">
        <div class="title-status">
          <span class="title" v-text="item.garden_name"></span>
          <span class="status float-right" v-text="item.check_status_name"></span>
        </div>
        <div class="txt-box">
          <div v-if="item.commission_money == '未分佣'">佣金:<span v-text="item.commission_money"></span></div>
          <div v-if="item.commission_money > '0'">佣金:￥<span v-text="item.commission_money"></span></div>
          <div>位置:<span v-text="item.house_position"></span></div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "Enstuctlist",
  data() {
    return {
      is_show: true,
      title: "委托推荐",
      enstuctList:[],
      loading: false,
      finished: true
    };
  },
  mounted() {
    document.title = "委托推荐";
    this.getEnstuctList();
  },
  methods: {
    onClickLeft() {
        this.$router.back(-1);
      },
    getEnstuctList(){
      var that=this;
      var p={api_token:this.$store.state.global.api_token};
      this.$http.post(this.$store.state.global.baseUrl + 'spread/enstuct_list',p).then(res => {
        if(res.status == 200) {
          if(res.data.code == 200){
            that.enstuctList = res.data.data.data;
          }else{
            that.$toast(res.data.msg);
          }
        }else{
          that.$toast('获取我的委托推荐失败，请刷新重试！');
          return;
        }
      });
    },
    onLoad() {
      // 异步更新数据
      this.getEnstuctList();
    },
  }
};
</script>

<style scoped  lang="less">
.enstuct_list .item{
  padding: .4rem;
  text-align: left;
}
.enstuct_list .item .title-status{
  margin:.1rem 0;
}
.enstuct_list .item .title{
  color: #494949;
  font-size: .4rem;
  font-weight: bold;
}
.enstuct_list .item .status{
  font-size: 0.24rem;
  color: #fff;
  background: #f7b343;
  display: inline-block;
  padding: .06rem .2rem;
}
.enstuct_list .item .txt-box{
  font-size: .24rem;
  color: #9fa0a0;
  line-height: 0.55rem;
}
</style>
