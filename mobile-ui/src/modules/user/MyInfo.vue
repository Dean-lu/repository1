<template>
  <div class="login-pwd pwd myinfo">
    <!-- <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" /> -->
    <!-- 写外面才能保证下拉框样式 -->
    <div>
       <!-- <van-field readonly clickable :value="position" label="所属区域:" placeholder="点击选择省市区" @click="showPositionSelect = true" /> -->
       <van-popup v-model="showPositionSelect" position="bottom">
         <van-area :area-list="areaList" title="选择省市区" @confirm="confirmPosition" @cancel="showPositionSelect = false" />
       </van-popup>
    </div>
    <div class="form-container">
      <iframe id="geoPage" width=0 height=0 frameborder=0  style="display:none;" scrolling="no"
              src="https://apis.map.qq.com/tools/geolocation?key=2DLBZ-VR63O-BVEWV-STDA3-ZL5AH-U4F7T&referer=house">
      </iframe>
      <div class="input-item">
        <van-field v-model="truename" label="姓名" label-width="2.5rem" /> 
<!--       
        <label>姓名</label>
        <input type="text" name="truename" id="truename" v-model="truename"/> -->
      </div>
      <div class="input-item">
        <van-field v-model="telphone" label="手机号" maxlength="11" label-width="2.5rem" /> 
        <!-- <input type="text" name="telphone" id="telphone" readonly="readonly" v-model="telphone"/> -->
      </div>
      <div class="input-item">
        <van-field v-model="idcardcode" label="身份证号" maxlength="18"  label-width="2.5rem" /> 
        <!-- <label>身份证号</label>
        <input type="text" name="idcardcode" id="idcardcode" v-model="idcardcode" /> -->
      </div>
      <!-- <div class="input-item">
         <label>小区</label>
         <input type="text" name="court" id="court" v-model="court" />
       </div>-->
      <div class="input-item">
        <van-field v-model="court" label="小区"  label-width="2.5rem" readonly /> 
        <!-- <label>小区</label>
        <input type="text" name="area" id="area" v-model="court" readonly="readonly"/> -->
        <input type="hidden" v-model="garden_id"/>
      </div>
      <!-- input显示区域-->
      <div>
         <van-field readonly clickable :value="position" label="所属区域" placeholder="点击选择省市区" @click="showPositionSelect = true" />
      </div>
      <div class="garden">
        <div class="bm-header-search-box" style="background-color:#fff">
          <input type="text" name="keyword" placeholder="请输入关键字搜索小区" class="bm-header-search" v-model="keyword">
          <button type="button" id="sub" class="sub" @click="getGardenInfo">
            <i class="bm-icon bm-icon-small-search"></i>
          </button>
        </div>
        <div class="garden_list" v-if="gardenList && gardenList.length > 0">
          <ul>
            <li v-for="(garden,index) in gardenList" :key="index" @click="selectGarden(garden.id,garden.garden_name)"><span v-text="garden.garden_name"></span></li>
          </ul>
        </div>
        <div class="garden_list" v-if="gardenList.length == 0">
          <ul>
            <li><span>未搜索到小区</span></li>
          </ul>
        </div>
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
  import areaList from '../../assets/js/area.js'
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
        gardenList:[],
        keyword:'',
        garden_id:'',
        adcode: '',
        position:'',
        showPositionSelect: false,
        areaList: areaList,
        province_name:'',
        city_name:'',
        district_name:'',
        loc:''
      }
    },
    mounted(){
      document.title = "完善个人信息";
      this.init();
      var that= this;
      window.addEventListener('message', function(event) {
        // 接收位置信息
        that.loc = event.data;
        console.log(that.loc);
      }, false);
    },
    methods:{
      onClickLeft() {
        this.$router.back(-1);
      },
      delTip(){
        this.is_show=false;
        this.$router.push({path : '/home'});
      },
      getposition:function(){
        var that = this;
        if(that.loc.adcode > 0) {
            that.adcode = that.loc.adcode;
            that.position = that.loc.province + that.loc.city + that.loc.district;
            that.province_name = that.loc.province;
            that.city_name = that.loc.city;
            that.district_name = that.loc.district;
            that.getGardenInfo();
        }
      },
      getGardenInfo: function () {
        var that = this;
        let param = {};
        param.district_id = that.adcode;
        param.keyword = that.keyword;
        this.$http.post(this.$store.state.global.baseUrl + 'base/get_garden_info',param).then(res => {
          if(res.status == 200){
            if(res.data.code == 200){
              var res_data = res.data.data;
              that.gardenList = res_data;
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('系统异常！');
          }
        });
      },
      selectGarden:function(id,name){
        this.garden_id = id;
        this.court = name;
      },
      init(){
        var that = this;
        var api_token = this.$store.state.global.api_token;
        this.$http.get(this.$store.state.global.baseUrl + 'user/edit_user?api_token='+api_token).then(res => {
          if(res.status == 200) {
            if(res.data.code == 200){
              let re_data = res.data.data;
              that.telphone = re_data.telphone;
              that.truename = re_data.truename;
              that.idcardcode = re_data.idcardcode;
              that.court = re_data.court;
              that.garden_id = re_data.garden_id;
              that.adcode = re_data.adcode;
              that.province_name = re_data.province_name;
              that.city_name = re_data.city_name;
              that.district_name = re_data.district_name;
              if(that.garden_id == null || that.garden_id == ''){
                that.getposition();
              }else{
                that.position = that.province_name+that.city_name+that.district_name;
                that.getGardenInfo();
              }
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
        param.garden_id = this.garden_id;
        param.province_name = this.province_name;
        param.city_name = this.city_name;
        param.district_name = this.district_name;
        this.$http.post(this.$store.state.global.baseUrl + 'user/edit_user',param).then(res => {
          if(res.status == 200){
            if(res.data.code == 200){
              that.is_show=true;
              //that.$toast('个人信息编辑成功');
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
       /* if(!this.court){
          this.$toast('小区名不能为空');
          return false;
        }*/
        if(!this.isCard(this.idcardcode)){
          this.$toast('请输入正确的身份证号');
          return false;
        }
        return true;
      },
      isCard(code){
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";``
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
            if(code[17]=='x') code[17] = code[17].toUpperCase();
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
      // 组件：区域确认
      confirmPosition(values){
        // 省
        let provinceCode = values[0].code;
        let provinceText = values[0].name;
         // 市
        let cityCode = values[1].code;
        let cityText = values[1].name;
         // 区
        let regionCode = values[2].code;
        let regionText = values[2].name;
        // this.position = values.map(item => item.name).join('');// 地区级联
        this.adcode = values[2].code;
        //this.position = values[2].name;
        this.province_name = provinceText;
        this.city_name = cityText;
        this.district_name = regionText;
        this.position = values.map(item => item.name).join('');
        this.getGardenInfo();
        // 隐藏弹框
        this.showPositionSelect = false;
      }
    },
  }
</script>

<style scoped lang="less">
/deep/.van-cell{
  line-height:0.8rem;
  font-size:0.4rem;
  padding:0.2rem 0;
}
/deep/.van-field__value{
  background: #dcdddd;
  padding-left: 0.4rem;
}
  .pwd .van-nav-bar .van-icon,
  .pwd .van-nav-bar__title{
    color:#FFB640;
  }
  .pwd .van-nav-bar{
    border-bottom: .11rem solid #f5f5f5;
  }
  .form-container{
    position: relative;
    width: 88%;
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
  .input-item::after{
    content:""; 
   display: block; 
   clear:both; 
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
    display: inline-block;

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
  .bm-header-search-box{
    background-color: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: .1rem;
    position: relative;
  }
  .bm-header-search-box input.bm-header-search{
    line-height: .6rem;
    padding: .15rem;
    font-size: 0.24rem;
    height: .6rem;
    width: 83%;
    border: 0;
  }
  .bm-header-search-box .sub {
    float: right;
    width: 12%;
    height: .9rem;
    overflow: hidden;
    line-height: .6rem;
    background: #fff;
    border-top-right-radius: .1rem;
    border-bottom-right-radius: .1rem;
    border: 0;
    padding: 0;
    box-sizing: content-box;
  }
  .bm-header-search-box .bm-icon-small-search{
    width: .37rem;
    height: .36rem;
    background: url(../../assets/img/user/search.png) no-repeat;
    background-size: 100%;
    position: absolute;
    right: 0.15rem;
    bottom: .2rem;
  }
  .form-container .garden{
    border:.03rem solid #dddddd;
    border-radius:10px;
    padding: .15rem .25rem;
    margin-top: 0.5rem;
  }
  .form-container .garden .bm-header-search-box{
    border: .03rem solid #dddddd;
    border-radius: 5px;
    margin-bottom:.2rem;
  }
  .form-container .garden .garden_list{
    max-height: 4rem;
    overflow: scroll;
    text-align: left;
    font-size: .35rem;
  }
  .form-container .garden .garden_list ul li{
    padding: .1rem 0.1rem;
    border-bottom:0.01rem dotted #e6e6e6;
  }
  /deep/.van-picker__cancel, /deep/.van-picker__confirm{
    color: #F8B729;
  }
</style>
