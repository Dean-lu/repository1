<template>
  <div class="confirm-rent">
    <!-- <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" /> -->
    <!-- 提现初始页面 -->
    <div v-if="status=='init'">
      <!-- 到账银行卡 -->
      <div class="card-cr"></div>
      <div class="card">
        <span class="info">到账银行卡</span>
        <!-- <span class="bank">{{bank}}</span> -->
        <div class="bank">
          <!-- <select>
            <option v-for="(item ,index) in bank" :key="index">
               {{item}}
            </option>
          </select> -->
          <van-field readonly clickable name="choiceBank" :value="choiceBank" placeholder="选择银行卡" @click="showBankLayout = true" />
          <van-popup class="popup-select" v-model="showBankLayout" position="bottom" >
            <van-picker show-toolbar title="选择银行卡" :columns="bank" @cancel="showBankLayout = false" @confirm="DrawBankLayout" />
          </van-popup>
        </div>
        <span class="hour">2小时内到账</span>
      </div>
      <!-- 提现金额 -->
      <p class="drawtip">提现金额</p>
      <div>
        <img
          src="data:image/png;base64,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"
          alt
          class="moneyImg"
        />
        <input type="number" v-model="money" class="money" />
      </div>
      <!-- 提示 -->
      <div class="tips">
        当前可提现金额为{{can}}元，
        <strong @click="drawmoneyall">全部提现</strong>
      </div>
      <!-- 按钮 -->
      <div class="btn" @click="drawmoneyb">提现</div>
    </div>
    <!-- 提现申请成功 -->
    <div class="success" v-if="status=='success'">
      <img
        @click="close"
        class="close"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kc8rRFEUxz8zQ+RHo1hYWEwaVmhQYqOMhJKmMcqvzcybNzNq3szrvSfJVtkqSmz8WvAXsFXWShEpWVlYExum57x5UyOZe7v3fO73nnM691zwxrKKZlaFQMtZRnQ8HJibXwjUvOCjlVqZnrhi6iORyBQVx+c9Hsfedju5Kvv9O+qTqqmAp1Z4WNENS3hCeGrV0h3eEW5RMvGk8JlwlyEFCt85esLlV4fTLn87bMSio+BtEg6kf3HiFysZQxOWlxPUsitKqR7nJQ1qbnZGbLusNkyijBMmwCRjjDJAL0OyD9BNHz1yokJ8qBg/TV5iFdl11jBYJk0Giy5RVyS7KjYluiozy5rT/799NVP9fW72hjBUP9v2ewfUbENhy7a/jmy7cAy+J7jMlePzhzD4IfpWWQsegH8Dzq/KWmIXLjah9VGPG/Gi5JPlTaXg7RQa56H5BuoW3Z6V7jl5gNi6fNU17O1Dp/j7l34A1GVno4O/7IoAAAAJcEhZcwAACxMAAAsTAQCanBgAAAFMSURBVDiNpdOhTwMxFMfxb3du6PFX9OQ8GxpJmoMET2aQ8BfAEixBo5qnIRAECw78rqDmwLCAI4FMgOBGjm3Xa8dPNe+1n7w0rQLIjOkAh8CGFRmzRDJjEuAMGFqRvsqMaQO3QBMYAuuxeAndLkq9BuCA+6KQAjeZMa1/oE/AtSqaTeAc6BbNoMkr0DUrMlKlTVG4DwVQM5uD8Dp0Dg7BQ9CFsA8H3kLQStiDPwCmDvXCFfg0XhQg8cG5c5NU61dga6a1Y0XufGfrJu4AF/z8ynLGQNeK5FVnGxHoAXBarFvAIDNGR8EL0H0rcgT0QvG5O65A+wC5c6RaXwKrQBtYATZTra9y514qYR86TSj+C4egMXgSi4biahm0nMwYBZwAu0VpDHQawDswWQYFsCJf/H0tn8BHkjv3nGo9AB6tyHEMOk3pWhJgz4qMvgEnj9aOj9+7SQAAAABJRU5ErkJggg=="
        alt
      />
      <img
        class="cg"
        src="data:image/png;base64,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"
        alt
      />
      <div class="text">提现申请成功</div>
    </div>
    <div class="bg" v-if="status=='success'"></div>
    <!-- 支付密码 -->
    <div class="pay-tool" v-if="status=='keyword'">
      <div class="pay-tool-title border-bottom">
        <span class="van-icon van-icon-cross van-nav-bar__arrow icon icon-back" @click="backHandle"></span>
        <strong>输入支付密码</strong>
        <p>提现金额</p>
        <p>￥{{money}}元</p>
        <p>
          <span style="float:left;">服务费</span>
          <span style="float:right">{{fee}}元</span>
        </p>
      </div>
      <div class="pay-tool-content">
        <div class="pay-tool-inputs">
          <div class="item" v-for="i in items" :key="i">
            <span class="icon_dot" v-if="password[i]">●</span>
          </div>
        </div>
        <!-- <div class="pay-tool-link"><router-link class="link" to="/getP">忘记密码？</router-link></div> -->
      </div>
      <div class="pay-tool-keyboard">
        <ul>
          <li @click="keyUpHandle($event)" v-for="val in keys" :key="val">{{ val }}</li>
          <li class="del" @click="delHandle">
            <span class="icon-del van-icon van-icon-arrow-left van-nav-bar__arrow" style="font-size:0.8rem"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
//import shareApi from '../../common/until'
const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0];
export default {
  name: "Draw",
  data() {
    return {
      status: "init",
      title: "提现",
      can: 0,
      choiceBank:'',
      bank:[],
      items: [0, 1, 2, 3, 4, 5],
      keys: keys(),
      password: [],
      bankId:'',
      bankAll:'',
      fee:0,
      drawmoney:0,
      showBankLayout:false,
      money:null
    };
  },
  mounted() {
    document.title = "提现";
    this.init();
    this.share();
  },
  methods: {
    share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
    backHandle() {
      this.clearPasswordHandle(); // 返回时清除password
      //this.$emit("backFnc"); // 返回上级
      this.status='init'
    },
    keyUpHandle(e) {
      let text = e.currentTarget.innerText;
      let len = this.password.length;
      if (!text || len > 6)  return false;
      this.password.push(text);
      this.ajaxData();
    },
    delHandle() {
      if (this.password.length <= 0) return false;
      this.password.pop();
    },
    ajaxData() {
      let that=this;
      if (this.password.length >= 6) {
         console.log(parseInt(this.password.join(" ").replace(/\s/g, "")));
         that.password=parseInt(this.password.join(" ").replace(/\s/g, ""));
         that.$http.post(that.$store.state.global.baseUrl + "user/withdraw",{
              api_token:that.$store.state.global.api_token,
              money:that.money,
              bank_card_id:that.bankId,
              pay_password:that.password
            })
          .then(res => {
            if (res.status == 200) {
              if (res.data.code == 200) {
                //todo
                that.$toast("提现完成");
                that.backHandle();
                that.init();
              } else {
                that.$toast(res.data.msg);
                that.clearPasswordHandle();
              }
            } else {
              that.$toast("系统异常,请重试！");
              that.backHandle();
            }
          });
      }
       
      return false;
    },
    clearPasswordHandle: function() {
      this.password = [];
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    drawmoneyall(){      
      if(this.can==0 || this.can==0.00){
        this.$toast("没有可提现金额");
        return false;
      }
      this.money=this.can;
      this.status='keyword'
    },
    drawmoneyb() {
      //todo 执行提现申请      
      if(!this.money) {
        this.$toast("请输入提现金额");
        return false;
      }else if(this.money==0 || this.money==0.00){
        this.$toast("没有可提现金额");
        return false;
      }else if(this.money > this.can){
         this.$toast("提现金额不能大于可提现金额");
         return false;
      }else{
        this.status='keyword'
      }   
     
    },
    init() {
      //todo 获取可提现金额、银行类型等
      var that=this;
       this.$http.post(this.$store.state.global.baseUrl + "base/pre_withdraw",{
           api_token:this.$store.state.global.api_token
         })
      .then(res => {
        if (res.status == 200) {
          if(res.data.code==401){
            //that.$toast("您还没绑定银行卡，请去绑定银行卡");
            that.$dialog.confirm({
              title: "绑定银行卡",
              message: "您还没绑定银行卡，立即去绑定银行卡",
              confirmButtonText: "确定", //改变确认按钮上显示的文字
              cancelButtonText: "取消" //改变取消按钮上显示的文字
            }).then(()=> {
              that.$router.push({path:'/EditBank'});
            }).catch(() => {
              that.$router.push({path:'/mine'});
            })

            return;
          }else if(res.data.code==402){
            //that.$toast("您还没设置支付密码，请设置支付密码");
            that.$dialog.confirm({
              title: "支付密码",
              message: "您还没设置支付密码，立即去支付密码",
              confirmButtonText: "确定", //改变确认按钮上显示的文字
              cancelButtonText: "取消" //改变取消按钮上显示的文字
            }).then(()=> {
              that.$router.push({path:'/updatepayPass'});
            }).catch(() => {
              that.$router.push({path:'/mine'});
            })
            return;
          }else if(res.data.code == 200) {            
            //todo            
            for(let i=0,len=res.data.data.length; i<len;i++){
              that.bank.push(res.data.data[i].bank_card_no);              
            }
            that.bankId=res.data.data[0].id;
            that.bankAll=res.data.data;
            that.can=res.data.balance;
            that.choiceBank=res.data.data[0].bank_card_no;
          } else {
            that.$toast(res.data.msg);
          }
        } else {
          that.$toast("系统异常！");
        }
      });
    },
    close() {
      this.$router.back(-1);
    },
    // 银行卡选择
      DrawBankLayout(value){
        this.choiceBank = value;
        //this.houseInfo.house_layout = this.valueHouseLayout;
        for(let i=0,len=this.bankAll.length;i<len;i++){
          if(this.bankAll[i].bank_card_no==value){
            this.bankId=this.bankAll[i].id;
          }
        }
        console.log(this.bankId);
        this.showBankLayout = false;
      }
    
  }
};
</script>

<style scoped lang="less">
.confirm-rent .van-nav-bar .van-icon,
  .confirm-rent .van-nav-bar__title{
    color:#FFB640;
  }
  .confirm-rent .van-nav-bar{
    border-bottom: .11rem solid #f5f5f5;
  }
.button-container {
  position: relative;
  width: 83%;
  height: 61.5%;
  background-color: #ffffff;
  top: 61.8%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.3125rem;
  // padding-top: 0.6125rem;
  color: #959595;
}

/deep/.van-cell {
  color: #959595;
  background-color: #f5f5f5;
  border-radius:0;
  width:100%;
  height: 100%;
  margin:0;
  line-height: 0.4rem;
  background:rgb(247, 248, 248);
  padding:0;
  color:red;
  
}
/deep/.van-field__control{
    color:red
  }
  .card-cr{
    width: 100%;
    height: 1.573913043rem;
  }
.card {
  width: 9.034rem;
  height: 1.769323671rem;
  margin-left: 0.483091787rem;
  // padding-top: 1.573913043rem;
  background: rgb(247, 248, 248);
  position: relative;
}
.card .info {
  position: absolute;
  width: 1.969323671rem;
  left: 0.736714976rem;
  top: 0.373188406rem;
  text-align: left;
}
.card .bank {
  position: absolute;
  width: 4.0942029rem;
  /* height:0.332125604rem; */
  top: 0.373188406rem;
  left: 3.669082126rem;
  color: red;
  text-align: left;
}
.card .hour {
  position: absolute;
  width:  4.0942029rem;
  top: 0.964975845rem;
  left:  3.669082126rem;
  text-align: left;
}
.cont {
  text-align: center;
  width: 100%;
  height: 0.821256039rem;
  position: fixed;
  bottom: 1.183574879rem;
}
.drawtip {
  /* width:0.833333333rem; */
  height: 0.905797101rem;
  position: fixed;
  left: 1.328502415rem;
  top: 3.157487923rem;
  font-size: 0.35rem;
}
.moneyImg {
  width: 0.833333333rem;
  height: 0.905797101rem;
  position: fixed;
  left: 1.328502415rem;
  top: 4.157487923rem;
}
.money {
  width: 3rem;
  height: 0.905797101rem;
  position: fixed;
  left: 3.328502415rem;
  top: 4.157487923rem;
  font-size: 0.6rem;
}
.tips {
  width:8.047101449rem;
  position: fixed;
  left: 1.194444444rem;
  top: 5.90410628rem;
  text-align: left;
}
.btn {
  width: 7.363285024rem;
  height: 0.857487923;
  line-height: 0.857487923rem;
  color: white;
  background: #ffb640;
  font-size: 0.434782609rem;
  border-radius: 0.096618357rem;
  /* left:1.147342995rem; */
  bottom: 1.183574879rem;
  display: block;
  margin: 0 auto;
  margin-top: 3.3rem;
}
.success {
  z-index: 999;
  width: 7.763285024rem;
  height: 4.239130435rem;
  position: fixed;
  left: 1.147342995rem;
  top: 1.594202899rem;
  background: white;
  text-align: center;
  border-radius: 4px;
}
.success .close {
  position: absolute;
  width: 0.265700483rem;
  height: 0.265700483rem;
  top: 0.446859903rem;
  right: 0.410628019rem;
}
.success .cg {
  width: 1.473429952rem;
  height: 1.473429952rem;
  margin-top: 1.086956522rem;
}
.bg {
  width: 100%;
  height: 18.11111111rem;
  z-index: 1;
  background: rgb(197, 198, 198);
  padding-top:1.2rem;
  box-sizing: border-box;
  
}
.pay-tool {
  position: relative;
  // height: 18.93333333rem;
  background-color: #fff;
  overflow: hidden;
  position:fixed;
  left:0; top:0;
  bottom:0;
  z-index: 9;
  right:0;  
  &-title {
    width: 100%;
    //height: 1.08888888rem;
    padding: 0 0.8rem;
    //line-height: 1.08888888rem;
    text-align: center;
    overflow: hidden;
    margin-top: 1.3rem;
    font-size: 0.6rem;
    box-sizing: border-box;   
    .icon {
      float: right; 
      margin-top:0.4rem;     
    }
    strong {
      font-size: 0.4rem;
       line-height:1rem;
    }
    p{
      color:#666;
      font-size:0.35rem;
      padding:0.1111rem 0;
      margin:0;
    }
  }
  &-title::after{
    clear:both
  }
  &-content {
    .pay-tool-inputs {
      width:90%;
      height: 1.314492754rem;
      margin: 0.2rem auto 0;
      border: 1px solid #b9b9b9;
      border-radius: 0.26666666rem;
      box-shadow: 0 0 1px #e6e6e6;
      display: flex;
      .item {
        width: 16.66666666%;
        height: 1.314492754rem;
        border-right: 1px solid #b9b9b9;
        line-height: 1.314492754rem;
        text-align: center;
        &:last-child {
          border-right: none;
        }
        .icon_dot {
          display: inline-block;
          width: 0.51111111rem;
          height: 0.51111111rem;
          // background: url("../../assets/images/icon_dot.png") no-repeat;
          background-size: cover;
          font-size:0.8rem;
        }
      }
    }
    .pay-tool-link {
      padding: 0.53333333rem 0.8rem 0;
      text-align: right;
      .link {
        font-size: 0.66666666rem;
        color: #3c8cfb;
      }
    }
  }
  .pay-tool-keyboard {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 33.1333%;
        height: 2.25442834rem;
        line-height: 2.25442834rem;
        text-align: center;
        border-right: 1px solid #aeaeae;
        border-bottom: 1px solid #aeaeae;
        font-size: 0.8rem;
        font-weight: bold;
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3) {
          border-top: 1px solid #eee;
        }
        &:nth-child(3),
        &:nth-child(6),
        &:nth-child(9),
        &:nth-child(12) {
          border-right: none;
        }
        &:nth-child(10),
        &:nth-child(11),
        &:nth-child(12) {
          border-bottom: none;
        }
        &:nth-child(10),
        &:nth-child(12),
        &:active {
          background-color: #d1d4dd;
        }
        &:nth-child(12):active {
          background-color: #fff;
        }
      }
    }
  }
}
</style>
