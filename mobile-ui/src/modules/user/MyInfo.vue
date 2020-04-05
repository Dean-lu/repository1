<template>
  <div class="login-pwd pwd myinfo">
    <!-- <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" /> -->
    <div class="form-container">
      <div class="input-item">
        <label>账号</label>
        <input type="text" name="truename" id="truename" v-model="truename"/>
      </div>
      <div class="input-item">
        <label>手机号</label>
        <input type="text" name="telphone" id="telphone" readonly="readonly" v-model="telphone"/>
      </div>
      <div class="input-item">
        <label>身份证号</label>
        <input type="text" name="idcardcode" id="idcardcode" v-model="idcardcode" />
      </div>
      <div class="input-item">
        <label>小区</label>
        <input type="text" name="court" id="court" v-model="court" />
      </div>

      <div class="submit" >
        <van-button round block size="middle" color="#FFB640" native-type="submit" @click="doUpdateInfo">
          提交
        </van-button>
      </div>
    </div>
    <!-- 提交成功呈现 -->
    <div v-if="is_show==true">
      <div class="notice">
        <div class="bg"></div>
        <div class="tip-content">
          <div class="tip">
            <div class="del" @click="delTip"></div>
            <div class="icon"></div>
            <div class="text">个人信息编辑成功</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'myInfo',
    data () {
      return {
        is_show: false,
        title: '完善个人信息',
        truename:'',
        idcardcode:'',
        telphone:'',
        court:'',
      }
    },
    mounted(){
      document.title = "完善个人信息";
      this.init();
    },
    methods:{
      onClickLeft() {
        this.$router.back(-1);
      },
      delTip(){
        this.is_show=false;
      },
      init(){
        var that = this;
        var api_token = this.$store.state.global.api_token;
        this.$http.get(this.$store.state.global.baseUrl + 'user/edit_user?api_token='+api_token).then(res => {
          if(res.status == 200) {
            if(res.data.code == 200){
              that.telphone = res.data.data.telphone;
              that.truename = res.data.data.truename;
              that.idcardcode = res.data.data.idcardcode;
              that.court = res.data.data.court;
            }else{
              that.$toast(res.data.msg);
            }
          }
        });
      },
      doUpdateInfo(){
        var that = this;
        // 校验
        if(!this.checkValid()){
          return;
        }
        let param = {};
        param.api_token = this.$store.state.global.api_token;
        param.truename = this.truename;
        param.idcardcode = this.idcardcode;
        param.court = this.court;
        this.$http.post(this.$store.state.global.baseUrl + 'user/edit_user',param).then(res => {
          if(res.status == 200){
            if(res.data.code == 200){
              that.is_show=true;
              that.$toast('个人信息编辑成功');
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('系统异常！');
          }
        });
      },
      checkValid(){
        if(!this.truename){
          this.$toast('真实姓名不能为空');
          return false;
        }
        if(!this.idcardcode){
          this.$toast('身份证号不能为空');
          return false;
        }
        if(!this.court){
          this.$toast('小区名不能为空');
          return false;
        }
        if(!this.isCard(this.idcardcode)){
          this.$toast('请输入正确的身份证号');
          return false;
        }
        return true;
      },
      isCard(code){
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass= true;
        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
          tip = "身份证号格式错误";
          pass = false;
        }

        else if(!city[code.substr(0,2)]){
          tip = "地址编码错误";
          pass = false;
        }
        else{
          //18位身份证需要验证最后一位校验位
          if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
              ai = code[i];
              wi = factor[i];
              sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
              tip = "校验位错误";
              pass =false;
            }
          }else{
            pass =false;
          }
        }
        if(!pass) return false;/* 身份证格式错误*/
        return true;/* 身份证格式正确*/
      },
    },
  }
</script>

<style scoped>
  .pwd .van-nav-bar .van-icon,
  .pwd .van-nav-bar__title{
    color:#FFB640;
  }
  .pwd .van-nav-bar{
    border-bottom: .11rem solid #f5f5f5;
  }
  .form-container{
    position: relative;
    width: 83%;
    height: 61.5%;
    background-color: #FFFFFF;
    position: absolute;
    top: 44.8%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.3125rem;
    /* padding-top: 0.6125rem; */
    color: #959595;
  }
  .input-item{
    position: relative;
    margin-bottom: .2rem;
  }
  .input-item label{
    color: #727171;
    width: 2rem;
    font-size: .42rem;
    line-height: 1rem;
    text-align: right;
    display: inline-block;
  }
  .input-item input{
    font-size: .36rem;
    width: 5.8rem;
    margin-left: .2rem;
    background: #dcdddd;
    border: 0;
    border-radius: 3px;
    height: 1rem;
    line-height: 1rem;
    padding-left: .3rem;
    color: #000;
    box-sizing: border-box;
  }
  #verify-btn{
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 0.3125rem;
    width: 2rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
  }
  .des{
    margin-top: .5rem;
    font-size: .24rem;
  }
  .submit{
    width: 60%;
    text-align: center;
    margin: 0 auto;
    margin-top: 2rem;
  }
  .submit button{
    border-radius:3px;
    font-size:0.5rem;
  }
  .notice .bg{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
  }
  .notice .tip-content{
    position: absolute;
    top: 35%;
    width: 100%;
    z-index: 9999;
  }
  .notice .tip-content .tip{
    background: #fff;
    width: 70%;
    height: 4.28rem;
    text-align: center;
    margin: 0 auto;
    border-radius: 5px;
    position: relative;
  }
  .notice .tip-content .del{
    background: url(../../assets/img/user/del.png);
    width: .32rem;
    height: .31rem;
    background-size: 100% 100%;
    display: inline-block;
    position: absolute;
    top: .3rem;
    right: .3rem;
  }
  .notice .tip-content .icon{
    background: url(../../assets/img/user/succ.png);
    width: 1.5rem;
    height: 1.5rem;
    background-size: 100% 100%;
    display: inline-block;
    margin: 1rem 0 .5rem;
  }
  .notice .tip-content .text{
    color: #9fa0a0;
    font-size: .4rem;
  }
</style>
