<template>
  <div class="to-entrust">
    <!-- <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" /> -->
    <div class="main" v-if="status=='edit'">  
      <!-- <div style="color: red;">*温馨提示：请认真填写，房屋信息不全将延长租出时间</div> -->
      <div class="data-form">
        <div class="title">租客信息</div> 
        <van-cell v-model="ContractInfo.tenant.truename" title="姓名:" placeholder="请输入姓名" v-bind:disabled="diasabledInput"/>
        <van-cell v-model="ContractInfo.tenant.telphone" title="电话:" placeholder="请输入电话" v-bind:disabled="diasabledInput" />
        <van-cell v-model="ContractInfo.tenant.idcardcode" title="身份证:" placeholder="请输入身份证" /> 
        <van-cell title="起租时间:" :value="ContractInfo.tenant.start_time" @click="showRentTimeSelect = true" />
        <van-calendar v-model="showRentTimeSelect" color="#FFB640" @confirm="onConfirmRentTime"  :max-date="this.maxDate"/>    
        <van-field readonly clickable name="rentTerm" :value="userent" label="选择租期:"
           label-align="right" placeholder="选择租期" @click="showRentTerm = true" />
          <van-popup class="popup-select" v-model="showRentTerm" position="bottom" >
            <van-picker show-toolbar title="选择租期" :columns="rentTermList" @cancel="showRentTerm = false" @confirm="confirmRentTerm" />
          </van-popup> 
           <van-cell title="期望交房时间:" :value="ContractInfo.tenant.hope_time" @click="showEndTimeSelect = true" />
           <van-calendar v-model="showEndTimeSelect" color="#FFB640" @confirm="onConfirmEndTime"/>
        <!-- <van-field v-model="ContractInfo.tenant.use_time" label="租期:" placeholder="1年" /> -->
        <!-- <van-field  v-bind:disabled="diasabledInput" v-model="ContractInfo.tenant.end_time" label="结束时间:" placeholder="请输结束时间"  /> -->
        <p style="font-size:0.4rem">身份证照片:<span style="font-size: 0.35rem;color: #acabab;">（*请上传清晰完整照片，否则无法通过审核）</span></p>
            <div class="label">正面：</div>
            <div class="cardImg">
              <!-- <van-uploader :max-count="1" :after-read="onread1">
                  <img :src="ContractInfo.tenant.cardimg1" ref="goodsImg_1" />
              </van-uploader> -->
               <img :src="ContractInfo.tenant.cardimg1" @click="changeImg('img_1')" ref="goodsImg_1" />
              <div class="card-tips" v-if="cardTips_1">
                <p>图片正在上传请稍等......</p>
              </div> 

            </div>
        <div class="label">反面：</div>
        <div class="cardImg">
          <!-- <van-uploader :max-count="1" :after-read="onread2">
              <img :src="ContractInfo.tenant.cardimg2" ref="goodsImg_2" />
          </van-uploader>  -->
          <img :src="ContractInfo.tenant.cardimg2" @click="changeImg('img_2')" ref="goodsImg_2" />
              <div class="card-tips" v-if="cardTips_2">
                <p>图片正在上传请稍等......</p>
              </div> 
        </div>
        <div class="label">手持：</div>
        <div class="cardImg">
          <!-- <van-uploader :max-count="1" :after-read="onread3">
              <img :src="ContractInfo.tenant.cardimg3" ref="goodsImg_3" />
          </van-uploader>  -->
           <img :src="ContractInfo.tenant.cardimg3" @click="changeImg('img_3')" ref="goodsImg_3" />
              <div class="card-tips" v-if="cardTips_3">
                <p>图片正在上传请稍等......</p>
              </div>
         
        </div>
      </div>
      <div class="pic-area">
        <div class="label">房源信息：</div> 
        <div class="house_info">
            <p>位置：{{ContractInfo.house.house_position}}</p>
            <p><span>小区：{{ContractInfo.house.garden_name}}</span><span>房型：{{ContractInfo.house.house_layout}}</span></p>
            <p><span>面积：{{ContractInfo.house.area}}</span><span>付款方式：{{ContractInfo.house.pay_style}}</span></p>
            <p><span>租金：{{ContractInfo.house.rent_price}}</span><span>押金：{{ContractInfo.house.deposit}}</span></p>
        </div>
        <div class="label">房源描述:</div>
        <p class="text-left">{{ContractInfo.house.house_desc}}</p>
        <div class="label">账单明细:</div>
        <div class="order_list">
            <table cellpadding="0" cellspacing="0" >
              <thead>
                <tr><th>次数</th><th>付款时间</th><th>有效时限</th><th>合计</th></tr>
              </thead>
              <tbody v-for="(item,index) in ContractInfo.bill" :key="index">
                <tr>
                  <td rowspan="2">{{item.times}}</td>
                  <td>
                    {{item.pay_time}}
                  </td>
                  <td>
                     {{item.validity}}
                  </td>
                  <td rowspan="2"> {{item.total_price}}</td>
                </tr>
                <tr>
                  <td v-if="index!=0" colspan="2">                    
                    付款金额：{{item.pay_price}} <br/>
                    服务费：{{item.service}} 保险费：{{item.insurance}}
                  </td>
                  <td v-else colspan="2">
                    付款金额：{{item.pay_price}}
                  </td>
                </tr>               
              </tbody>
            </table>
        </div>
        <van-button style="margin: 0.625rem auto;width: 95%;border-radius: 0.3125rem;" type="primary" block color="#F8B729"
          size="small" @click="toConfirm">点击确认修改</van-button>
      </div>
    </div>
    <div class="main listConter" v-if="status=='end'">
      <img class="face" src="data:image/png;base64,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" alt="">
           <p class="tips">您的修改已经完成，我们会尽快为您审核！</p>
    </div>
  </div>

</template>

<script>
  import areaList from '../../../assets/js/area.js'
  //import shareApi from '../../../common/until'
  
  export default {
    name: 'HouseInfoInput',
    data() {
      return {
        title:'修改合同信息',
        whyedit:"您的身份证照片模糊，请修改。这里放置审核时提交的驳回原因",
        status:'edit',
        noticeIcon:'' ,
        value: '',
        showRentTerm: false,
        date:'',
        alueRentTerm: '',// 临时变量
       // maxDate:new Date(2020, 10, 26),
        rentTerm: '',
        rentTermList: ['一年','半年'],
        diasabledInput:true,
        //起租时间
        minstart_time:"",
        showRentTimeSelect: false,
        userent:'',
        choiceStartTime:'',
        statTime:"",
        //期望交房时间
        minhope_time:"",
        choiceEndTime:'',
        showEndTimeSelect: false,
        ContractInfo: {
          tenant:{
            truename: "",
            telphone: "",
            idcardcode: "",
            start_time: "",
            rent_time: "",
            cardimg1: "",
            cardimg2: "",
            cardimg3: ""
          },
          house:{
            id: null,
            house_position: "",
            garden_name: "",
            building_number: "",
            room_number: "",
            area: "",
            house_layout: "",
            rent_type: null,
            pay_style: null,
            rent_price: "",
            deposit: "",
            house_desc: "",
            house_img:[]
          },
          bill:[
              {
                times: "",
                pay_time:null,
                validity: "",
                pay_price: "",
                service: null,
                insurance: null,
                total_price: "",
              }
            ]
          
        },
 
        // 图片提示
        cardTips_1:false,
        cardTips_2:false,
        cardTips_3:false
        
      }
    },
    mounted(){
      document.title = "修改合同信息";
      this.init();
      //let time=this.FunGetDateStr(2);
      //this.maxDate=new Date(time);
      this.share();
    },
    computed: {
     // 计算属性的 getter
     maxDate(){
      let curDate = (new Date()).getTime();
      let one = 2 * 24 * 3600 * 1000;
      let oneYear = curDate + one;
      return new Date(oneYear);
     }
    },
    methods: {
      share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
      init(){
        //debugger
        // if(this.$store.state.entrust.houseInfo){
        //   this.houseInfo = this.$store.state.entrust.houseInfo;
        // }
        if(sessionStorage.getItem("orderId")){
          this.$store.state.locale.contractId=sessionStorage.getItem("orderId");
        }else{
          this.$router.back(-1);
        }
        let that = this;
        let param = {
          api_token: this.$store.state.global.api_token,
          order_id: this.$store.state.locale.contractId,
        };
        this.$http.post(this.$store.state.global.baseUrl + 'lease/again_lease', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.ContractInfo = res.data.data;
              that.userent=that.rentTermList[parseInt(res.data.data.tenant.rent_time)-1];
              that.choiceStartTime=parseInt(res.data.data.tenant.rent_time);
              let time=res.data.data.tenant.start_time;              
              that.statTime=that.getTimestamp(time);              
              //that.$store.state.locale.editHouseInfo = res.data.data;
            }else{
              that.$toast(res.data.msg);
              this.$router.back(-1);
            }
          }else{
            that.$toast('获取房源详情失败，请重试！');
            this.$router.back(-1);
            // setTimeout(() => {
            //     this.$router.back(-1);
            // }, 1000);
            return;
          }
        });
        
      },   
      formatDate(date,addy) {
        console.log(date)
        if(addy==2){
          if(date.getMonth()>5){
              // return `${date.getFullYear()+1}-${date.getMonth()-5}-${date.getDate()}`;
              return this.getTimes(date.getFullYear()+1,date.getMonth()-5,date.getDate())
          }else{
             //return `${date.getFullYear()}-${date.getMonth()+7}-${date.getDate()}`;
              return this.getTimes(date.getFullYear(),date.getMonth()+7,date.getDate())
          }          
        }else{
          // return `${date.getFullYear()+addy}-${date.getMonth() + 1}-${date.getDate()}`;
           return this.getTimes(date.getFullYear()+addy,date.getMonth()+1,date.getDate())
        }
        
      }, 
      getTimes(year,month,date) { //end时间加0计算
        // console.log(time+"time");
        if(month<10){
          month="0"+month
        }
        if(date<10){
          date="0"+date;
        }
        return year+"-"+month+"-" +date;
        },     
      // 确认起租时间
      onConfirmRentTime(date) {
        console.log(date);
        this.showRentTimeSelect = false;
        this.ContractInfo.tenant.start_time = this.formatDate(date,0);
        this.statTime=this.getTimestamp(date);
        this.ContractInfo.tenant.end_time= this.formatDate(date,this.choiceStartTime);
      },
      // 确认入住时间
      onConfirmEndTime(date) {
        let endTimeCode=this.getTimestamp(date);
        let startTimeCode=this.getTimestamp(this.ContractInfo.tenant.start_time);
        if(endTimeCode<startTimeCode){
          this.$toast("期望交房时间不能早于起租时间");
          return;
        };
        this.showEndTimeSelect = false;
        this.ContractInfo.tenant.hope_time = this.formatDate(date,0);        
      },
      // 确认租期
      confirmRentTerm(value,index){
        console.log(index);
        this.userent=value;
        this.ContractInfo.tenant.rent_time = index+1;
        this.choiceStartTime=index+1;
        let data= new Date(this.statTime*1000);        
        this.ContractInfo.tenant.end_time= this.formatDate(data,this.choiceStartTime)
        this.showRentTerm = false;        
      },
      //日期转换成时间戳用来计算结束日期
      getTimestamp(time) { //把时间日期转成时间戳
        // console.log(time+"time");
        return (new Date(time)).getTime() / 1000
        },

      // // 期望交房时间
      // onConfirmHandingTime(date){
      //   this.showHandingTimeSelect = false;
      //   this.expectHandingTime = this.formatDate(date);
      // },   
      // 提交信息
      toConfirm(){
       // debugger
        // this.$store.state.entrust.houseInfo = this.houseInfo;
        // this.$router.push({path : '/lookentrust'});
        let that = this;
        let param = {
          api_token: this.$store.state.global.api_token,
          order_id: this.$store.state.locale.contractId,
          cardimg1:this.ContractInfo.tenant.cardimg1,
          cardimg2:this.ContractInfo.tenant.cardimg2,
          cardimg3:this.ContractInfo.tenant.cardimg3,
          start_time:this.ContractInfo.tenant.start_time,
          end_time:this.ContractInfo.tenant.end_time,
          hope_time:this.ContractInfo.tenant.hope_time,
          rent_time:parseInt(this.ContractInfo.tenant.rent_time)+''
        };        
        this.$http.post(this.$store.state.global.baseUrl + 'lease/again_post', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.status="end";
              //that.ContractInfo = res.data.data;
              //that.$store.state.locale.editHouseInfo = res.data.data;

            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('获取房源详情失败，请刷新重试！');
            // setTimeout(() => {
            //     this.$router.back(-1);
            // }, 1000);
            return;
          }
        });

      },
      onClickLeft() {
        this.$router.back(-1);
      },
      changeImg(imgsrc){
         let that=this;
          wx.chooseImage({
            count: 1, //张数， 默认9
            sizeType: ["compressed"], //建议压缩图
            sourceType: ["album", "camera"], // 来源是相册、相机
            success: function (res) {
              if(imgsrc=="img_1"){
                that.cardTips_1=true;
                 that.$refs.goodsImg_1.src=res.localIds[0];
              }else if(imgsrc=="img_2"){
                that.cardTips_2=true;
                 that.$refs.goodsImg_2.src=res.localIds[0];
              }else if(imgsrc=="img_3"){
                that.cardTips_3=true;
                 that.$refs.goodsImg_3.src=res.localIds[0];
              }  else if(imgsrc=="img_4"){
                that.cardTips_4=true;
              }             
              that.uploadToWeixinServer(res.localIds[0],imgsrc);
            }
          });
      },
      uploadToWeixinServer(localId,imgsrc) {
        let that = this;
        wx.uploadImage({
          localId: localId,
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            //res.serverId 返回图片的微信服务器端ID
            // self.add_vip.serverId = res.serverId;
            console.log(res);
            let serverId=res.serverId;
             that.$http.post(that.$store.state.global.baseUrl + 'entrust/watermark', {media_id:serverId}).then(res => {
              console.log(res)
              if(res.status == 200) {
                if(res.data.code == 200){
                  let src=res.data.data;
                  if(imgsrc=="img_1"){
                      that.ContractInfo.tenant.cardimg1 =src;
                      that.$refs.goodsImg_1.src=src;
                      that.cardTips_1=false;
                    }else if(imgsrc=="img_2"){
                      that.ContractInfo.tenant.cardimg2=src;
                      that.$refs.goodsImg_2.src=src;
                      that.cardTips_2=false;
                    }else if(imgsrc=="img_3"){
                      that.ContractInfo.tenant.cardimg3=src;
                      that.$refs.goodsImg_3.src=src;
                      that.cardTips_3=false;
                    }
                }else{
                  //that.card2Tips=false;
                  that.tipsCz(imgsrc);
                  //that.num=false;
                  that.$toast(res.data.msg);
                }
              }else{
                 //let num="cardTips_"+parseInt(imgsrc);
                 //提示隐藏
                that.tipsCz(imgsrc);
                that.$toast('上传图片失败，请重新选择图片！');
                return;
              }
            });
          }
        });
      },      
      tipsCz(imgsrc){
        if(imgsrc=="img_1"){                     
            that.cardTips_1=false;
          }else if(imgsrc=="img_2"){                     
            that.cardTips_2=false;
          }else if(imgsrc=="img_3"){                     
            that.cardTips_3=false;
          }
      },    
    }
    
    
  }
</script>

<style scoped lang="less">
.to-entrust .van-nav-bar .van-icon,
  .to-entrust .van-nav-bar__title{
    color:#FFB640;
  }
  .to-entrust .van-nav-bar{
    border-bottom: .11rem solid #f5f5f5;
  }
  .to-entrust .main{
    width: 100%;
    // padding-top: 1.2rem;
  }
  .label{
    text-align: left;
    text-indent: 0.45rem;
    color: #323233;
  }
  .data-form{
    width: 95%;
    margin: 0 auto;
    font-size:0.4rem;
  }
  .text-left{text-align: left; width:85%; margin:0.3rem auto;}
  .order_list{width:90%; margin:0.2rem auto;}
  .order_list>table{border:1px solid #ccc; width: 100%;}
  .order_list th,.order_list td{border:1px solid #ccc; padding:0.2rem;}
  .order_list td.tableCols{border:0 none; padding:0;}
  .title{
    text-align: left;
    font-size: 0.5rem;
    color: #323233;
    text-indent: 0.45rem;
    margin: 0.3rem 0;
  }
  /deep/.van-cell{
    padding:0.166667rem 0.426667rem
  }
  /deep/.van-cell:not(:last-child)::after{
    border-bottom: none;
  }
  /deep/.van-field__control{
    color:#aaa;
  }
  /deep/textarea{
    background-color: #F5F5F5;
    border-radius: 0.3125rem;
    padding:0.1rem;
  }
/deep/.posting-uploader-item{
  position:relative;
}
  .pic-area{
    width: 95%;
    margin: 0 auto;
    font-size:0.4rem;
  }
  /deep/.id-front .van-uploader__upload{
    width: 8.75rem;
    height: 5rem;    
  }
  /deep/.id-front .van-icon{
    display: none;
  }
  /deep/.id-back .van-uploader__upload{
    width: 8.75rem;
    height: 5rem;    
  }
  /deep/.id-back .van-icon{
    display: none;
  }
  /deep/.house-cer .van-uploader__upload{
    width: 8.75rem;
    height: 5rem;
   
  }
  /deep/.house-cer .van-icon{
    display: none;
  }
  /deep/.id-front .van-uploader__preview-image{
    width: auto;
    height: auto;
  }
  /deep/.id-back .van-uploader__preview-image{
    width: auto;
    height: auto;
  }
  /deep/.house-cer .van-uploader__preview-image{
    width: auto;
    height: auto;
  }
  .house_info{
    text-align: left;
    width:80%;
    margin:0 auto;
    span{
      display:inline-block;
      width:50%;
      text-align: left;
    }
  }
  .ques-icon{
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    
    position: relative;
    top: 0.05rem;
  }
  .listConter img{width:22%;margin:2.5rem auto 0.4rem auto;}
  .tips{text-align: center; color:#666; font-size: 0.5rem; width:80%;margin:0 auto;}
  .cardImg{width:85%;margin:0.5rem auto; position:relative;}
   .card-tips{position:absolute;left:0; top:0; bottom:0; width:100%; background:rgba(0, 0, 0, 0.2); display:flex;align-items: center;
    justify-content: center; color: #000; box-sizing:border-box; padding:0.5rem;}
 /deep/.cardImg img{width:100%; }
  .add-service-cell div{
    display: inline-block;
    width: 25%;
    height: 1rem;
  }
  /deep/.van-cell__title{
     -webkit-flex:1;
    flex: 1;
  }
  /deep/.van-cell__value {
    /* -webkit-box-flex: 2; */
    -webkit-flex: 2;
    flex: 2;
    text-align:left;
}
 input[disabled],input:disabled,input.disabled{  
        background: #fff;
        -webkit-text-fill-color:#333;  
        -webkit-opacity:1;  
        opacity: 1;  
    }
</style>
