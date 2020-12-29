<template>
  <div>
    <!-- <HeaderBar></HeaderBar> -->
    <!-- <div class="division"></div> -->
    <div class="remind">*温馨提示：请认真核对房源信息</div>
    <div class="house-info">
      <van-form>
        <van-cell>
          <van-col span="8" class="text-align-right label">所属区域：</van-col>
          <van-col span="16" class="text">
            <van-field readonly clickable :value="houseInfo.house_position" placeholder="点击选择省市区" @click="showHousePosition = true"  label-width="2rem"  />
          <van-popup v-model="showHousePosition" position="bottom">
            <van-area :area-list="areaList" title="选择省市区" @confirm="confirmArea" @cancel="showHousePosition = false" />
          </van-popup>
          </van-col>
        </van-cell>
        <van-cell>
          <van-col span="8" class="text-align-right label">小区名称：</van-col>
          <van-col span="16" class="text">
            <van-field v-model="houseInfo.garden_name"/>
          </van-col>
        </van-cell>
        <van-cell>
          <van-col span="8" class="text-align-right label">楼栋号：</van-col>
          <van-col span="16" class="text">
            <van-field v-model="houseInfo.building_number"/>
          </van-col>
        </van-cell>
        <van-cell>
          <van-col span="8" class="text-align-right label">房号：</van-col>
          <van-col span="16" class="text">
            <van-field v-model="houseInfo.room_number"/>
          </van-col>
        </van-cell>
        <van-cell>
          <van-col span="8" class="text-align-right label">面积：</van-col>
          <van-col span="16" class="text">
            <van-field v-model="houseInfo.area" type="number"/>
          </van-col>
        </van-cell>
        <van-cell>
          <van-col span="8" class="text-align-right label">户型：</van-col>
          
          <van-col span="16" class="text">
            <van-field readonly clickable name="houseInfo.house_layout" :value="houseInfo.house_layout" @click="showHouseLayout = true" />
            <van-popup class="popup-select" v-model="showHouseLayout" position="bottom" >
              <van-picker show-toolbar title="选择户型" :columns="houseLayouts" @cancel="showHouseLayout = false" @confirm="confirmHouseLayout" />
            </van-popup>
            <!-- <van-field v-model="houseInfo.house_layout"/> -->
          </van-col>
        </van-cell>
        <van-cell>
           <van-col span="8" class="text-align-right label">出租类型：</van-col>
          <van-col span="16" class="text">
          <van-field readonly clickable :value="valueRentType" @click="showRentType = true" />
          <van-popup v-model="showRentType" position="bottom">
            <van-picker show-toolbar :columns="rentTypeDesc" @confirm="confirmRentType" @cancel="showRentType = false" />
          </van-popup>
          </van-col>
        </van-cell>
        <van-cell>
          <van-col span="8" class="text-align-right label">租金：</van-col>
          <van-col span="16" class="text">
            <van-field v-model="houseInfo.rent_price" type="number"/>
          </van-col>
        </van-cell>
        <van-cell>
          <van-col span="8" class="text-align-right label">押金：</van-col>
          <van-col span="16" class="text">
            <van-field v-model="houseInfo.deposit" type="number"/>
          </van-col>
        </van-cell>
        <van-cell>
          <van-col span="8" class="text-align-right label">付款方式：</van-col>
          <van-col span="16" class="text">
            <van-field readonly clickable :value="valuePayStyle" @click="showPayStyle = true" placeholder="选择付款方式" />
            <van-popup v-model="showPayStyle" position="bottom">
              <van-picker show-toolbar :columns="payStyleDesc" @confirm="confirmPayStyle" @cancel="showPayStyle = false" />
            </van-popup>
            <!-- <van-field v-model="houseInfo.pay_style_name"/> -->
          </van-col>
        </van-cell>
        <van-cell>
           <van-col span="8" class="text-align-right label">委托期限：</van-col>
          <van-col span="16" class="text">
          <van-field readonly clickable :value="valueExpireYear" @click="showExpireYear = true"   placeholder="选择委托期限" label-width="2rem"/>
          <van-popup v-model="showExpireYear" position="bottom">
            <van-picker show-toolbar :columns="expireYearDesc" @confirm="confirmExpireYear" @cancel="showExpireYear = false" />
          </van-popup>
          </van-col>
        </van-cell>
        <van-cell>
          <van-col span="8" class="text-align-right label">装修状态：</van-col>
          <van-col span="16" class="text">
        <van-field readonly clickable :value="valuetrimStatus" placeholder="点击选择装修状态" @click="showrtrimStatus = true" />
          <van-popup v-model="showrtrimStatus" position="bottom">
            <van-picker show-toolbar :columns="trimStatusDesc" @confirm="trimStatusChoice" @cancel="showrtrimStatus = false" />
          </van-popup>
          </van-col>
        </van-cell>
        <van-cell>
          <van-col span="8" class="text-align-right label">房源描述：</van-col>
          <van-col span="16"></van-col>
        </van-cell>
        <van-cell>
          <div class="textarea float-right">
            <van-field v-model="houseInfo.house_desc" rows="5" autosize type="textarea" placeholder="请输入房屋描述"></van-field>
          </div>
        </van-cell>
      </van-form>
      <van-cell>
        <van-col span="8" class="text-align-right label">房源照片：</van-col>
        <van-col span="16"></van-col>
      </van-cell>
      <!-- <div class="img" v-for="(item,index) in houseInfo.house_img" :key="index">
        <van-image :src="item"></van-image>
      </div> -->
      <div class="ver-code-bottom-one-right-code manyPic">
        <div class="posting-uploader-item" v-for="(item,index) in houseInfo.house_img" :key="index">
          <van-image width="2.5rem" height="2.5rem" fit="contain" :src="item"  alt="图片" class="imgPreview"/>
          <van-icon name="close" @click="delImg(index)" class="delte"/>
        </div>
        <div class="imgTips" v-if="showTips">                 
          图片正在上传......
        </div>
        <!-- <van-uploader :after-read="afterZRead" :accept="'image/*'"  /> -->
        <div class="manyImgBtn" @click="changeImg">
                  <van-icon name="plus" />
                </div>
      </div>     
      <div class="edit-btn">
        <van-button square type="info" size="small" color="#F8B729" @click="submitHouseInfo">确认修改</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from '../../components/common/HeaderBar'
  //import shareApi from '../../common/until'
  import areaList from '../../assets/js/area.js'
  export default {
    name: 'EditHouseInfo',
    components: {HeaderBar},
    data () {
      return {
        houseInfo:{
          pay_style: 0,
          pay_style_name: ''
        },
        showTips:false,
        showHouseLayout: false,
        houseLayouts:['公寓','一室一厅','二室一厅','二室二厅','三室一厅','三室二厅','四室二厅','五室及以上'],
        payStyleDesc: ['年付', '半年付', '季付', '月付'],
        showPayStyle: false,
        valuePayStyle: '',
         // 区域选择参数
         areaList: areaList,
        valueHousePosition: '',
        showHousePosition: false,
         // 装修状态       
        showrtrimStatus: false,
        valuetrimStatus: '',
        trimStatusDesc: ['毛胚', '简装', '精装', '豪装'],
        //出租类型
        showRentType: false,
        valueRentType: '',
        rentTypeDesc: ['整租', '合租'],
        // 委托时间
        showExpireYear: false,
        valueExpireYear: '',
        expireYearDesc: ['三年', '四年', '五年'],
      }
    },
    mounted(){
      this.init();
      this.share();
    },
    methods: {
      share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
      init(){
        // 查看cookie中是都有业务员登录的api_token
        if(!this.$cookies.get('salesApiToken')){
          this.$toast("登录已失效，请重新登录！");
          this.$router.push({path : '/salesLogin'});
        }else{
          this.$store.state.locale.api_token = this.$cookies.get('salesApiToken');
        }
        if(!this.$store.state.locale.editHouseInfo){
          this.$router.push({path : '/entrustHouseInfo'});
        }
        this.houseInfo = this.$store.state.locale.editHouseInfo;
        this.valuetrimStatus=this.trimStatusDesc[this.houseInfo.trim_status-1]; 
        this.valueRentType=this.rentTypeDesc[this.houseInfo.rent_type-1]; 
        this.valueExpireYear=this.expireYearDesc[this.houseInfo.expire_year-3];
        this.valuePayStyle=this.payStyleDesc[this.houseInfo.pay_style-1]; 
      },
       // 去到提交确认页面
      toConfirm(){
        // 校验参数
        if(!this.houseInfo.house_position){
          this.$toast("请选择所属区域");
          return;
        }
        if(!this.houseInfo.garden_name){
          this.$toast("请填写小区名称");
          return;
        }
        if(!this.houseInfo.building_number){
          this.$toast("请填写楼栋号");
          return;
        }
        if(!this.houseInfo.room_number){
          this.$toast("请填写房间号");
          return;
        }
        if(!this.houseInfo.area){
          this.$toast("请填写房间面积");
          return;
        }
        if(!/^\d+(\.\d{0,2})?$/.test(this.houseInfo.area)){
            this.$toast("面积只能是数字");
            return;
          }
        if(!this.houseInfo.house_layout){
          this.$toast("请选择户型");
          return;
        }        
        if(!this.houseInfo.rent_type){
          this.$toast("必须选择类型");
          return;
        }
        if(!this.houseInfo.rent_price){
          this.$toast("请输入租金");
          return;
        } 
        if(!/^\d+(\.\d{0,2})?$/.test(this.houseInfo.rent_price)){
          this.$toast("租金只能是数字");
          return;
        }
        if(!this.houseInfo.deposit){
          this.$toast("请输入押金");
          return;
        }
        if(!/^\d+(\.\d{0,2})?$/.test(this.houseInfo.deposit)){
          this.$toast("押金只能是数字");
          return;
        }
        if(!this.houseInfo.pay_style){
          this.$toast("请选择付款方式");
          return;
        }
        if(!this.houseInfo.trim_status){
          this.$toast("请选择装修状态");
          return;
        }
        if(!this.houseInfo.expire_year){
          this.$toast("请选择委托时间");
          return;
        }
        
        if(!this.houseInfo.house_img || this.houseInfo.house_img.length == 0){
          this.$toast("请上传房源照片");
          return;
        }
        // this.$store.state.entrust.houseInfo = this.houseInfo;
        // this.$router.push({path : '/houseInfoConfirm'});
      },  
      submitHouseInfo(){
        this.toConfirm();
        //debugger
        let that = this;
        let param = {
          api_token: this.$store.state.locale.api_token,
          house_id: this.$store.state.locale.houseId,
          house_position: this.houseInfo.house_position,
          garden_name: this.houseInfo.garden_name,
          building_number: this.houseInfo.building_number,
          room_number: this.houseInfo.room_number,
          area: this.houseInfo.area,
          house_layout: this.houseInfo.house_layout,
          rent_type: this.houseInfo.rent_type,
          rent_price: this.houseInfo.rent_price,
          deposit: this.houseInfo.deposit,
          pay_style: this.houseInfo.pay_style,
          house_desc: this.houseInfo.house_desc,
          trim_status:this.houseInfo.trim_status,
          expire_year: this.houseInfo.expire_year,
          house_img: this.houseInfo.house_img
        }
        this.$http.post(this.$store.state.global.baseUrl + 'scene/edit_house', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.$toast('修改房源信息成功！');
              this.$router.push({path : '/entrustHouseInfo'});
            }else{
              that.$toast(res.data.msg);
              if(res.data.msg == 'api_token错误或者不存在'){
                that.$router.push({path : '/salesLogin'});
              }
            }
          }else{
            that.$toast('获取房源详情失败，请刷新重试！');
            return;
          }
        });
      },
      // 组件：确认区域选择
      confirmArea(values) {
        this.valueHousePosition = values.map(item => item.name).join('');
        this.houseInfo.house_position = this.valueHousePosition;
        this.showHousePosition = false;
      },
      //装修状态选择
       trimStatusChoice(value,index) {
        this.valuetrimStatus = value;
        this.houseInfo.trim_status = index + 1;
        this.houseInfo.trimStatusDesc = value;
        this.showrtrimStatus = false;
      },      
      // 户型选择
      confirmHouseLayout(value){
        this.valueHouseLayout = value;
        this.houseInfo.house_layout = this.valueHouseLayout;
        this.showHouseLayout = false;
      },
      // 出租类型
      confirmRentType(value, index){
        this.valueRentType = value;
        this.houseInfo.rent_type = index + 1;
        this.houseInfo.rentTypeDesc = value;
        this.showRentType = false;
      },
       // 确认委托时间
      confirmExpireYear(value,index){
        this.valueExpireYear = value;
        this.houseInfo.expire_year = index + 3;
        this.houseInfo.expireYearDesc = value;
        this.showExpireYear = false;
      },
      // 确认付款方式
      confirmPayStyle(value,index) {
        this.valuePayStyle = value;
        this.houseInfo.pay_style = index + 1;
        this.showPayStyle = false;
      },
      //删除图片
      delImg(index){
       console.log(index);
        if(isNaN(index) || index >= this.houseInfo.house_img.length){
          return false;
        }
         let tmp = [];        
        for(let i=0,len = this.houseInfo.house_img.length;i<len;i++){
          if (i!=index) {
            tmp.push(this.houseInfo.house_img[i]);            
          }
        }
        this.houseInfo.house_img = tmp;       
      },
      changeImg(){
         let that=this;
         let len=that.houseInfo.house_img.length;
         if(that.showTips){
           len=len+1;
         }
         if(that.houseInfo.house_img && len>=8){
          that.$toast('最多只能上传8张图！');
           return ;
        }
          wx.chooseImage({
            count: 1, //张数， 默认9
            sizeType: ["compressed"], //建议压缩图
            sourceType: ["album", "camera"], // 来源是相册、相机
            success: function (res) {
              that.showTips=true;          
              that.uploadToWeixinServer(res.localIds[0]);
            }
          });
      },
      uploadToWeixinServer(localId) {
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
                  that.houseInfo.house_img.push(src);                      
                  that.showTips=false;                     
                }else{
                  that.showTips=false; 
                  that.$toast(res.data.msg);
                }
              }else{
                 //提示隐藏
                that.showTips=false;
                that.$toast('上传图片失败，请重新选择图片！');
                return;
              }
            });
          }
        });
      },      
      //  //多图上传
      // afterZRead(file){
      //     //this.house_showImg=this.house_showImg;
      //     this.showTips=true;
      //     let param=new FormData;
      //     param.append("api_token", this.$store.state.locale.api_token),
      //     param.append("file",(file.file));         
      //     let that=this;
      //     this.$http.post(this.$store.state.global.baseUrl + 'entrust/watermark', param).then(res => {
      //       //debugger
      //       if(res.status == 200) {
      //         if(res.data.code == 200){
      //           console.log(res.data.data)
                
      //           let src=res.data.data;
      //           if(that.houseInfo.house_img==null && !that.houseInfo.house_img){
      //             that.houseInfo.house_img=[]
      //           };
      //           that.houseInfo.house_img.push(src);
      //           console.log(that.houseInfo.house_img);  
      //           that.showTips=false;     
      //         }else{
      //           that.$toast(res.data.msg);
      //           that.showTips=false;
      //           if(res.data.msg == 'api_token错误或者不存在'){
      //             that.$router.push({path : '/salesLogin'});
      //           }
      //         }
      //       }else{
      //         that.$toast('获取图片失败，请刷新重试！'); 
      //         that.showTips=false;           
      //         return;
      //       }
      //     });      
      // }
    }
  }
</script>

<style scoped lang="less">
  .division{
    width: 100%;
    height: 1.4rem;
    background-color: #F5F5F5;
  }
  .remind{
    width: 100%;
    height: 0.8rem;
    text-align: center;
    font-size: 0.35rem;
    line-height: 0.8rem;
    color: #b5b5b6;
  }
  .van-cell .label{
    color: #595757;
  }
  .van-cell .text{
    color: #9fa0a0;
  }
  /deep/.van-field__control{
    color: #9fa0a0;
    font-size: 0.38rem;
  }
  /deep/.van-cell{
    padding: 0;
    margin: 1px auto;
    font-size:0.4rem;
  }
  .van-cell:not(:last-child)::after{
    border-bottom: none;
  }
  /deep/.van-field__body{
    // background-color: #e4e4e445;
    border: 0.0625rem solid #e4e4e445;
    input,textarea{
      padding:0 0.15rem;
    }
  }
  /deep/.van-field__control{
    color: #777!important;
  }
  /deep/.posting-uploader-item{
    position:relative;
    float:left;
    width:2.5rem;
    height:2.5rem;
    margin-bottom:0.35rem;
    overflow: hidden;
    margin-right:0.3rem;
  }
  .imgTips{
    float: left;
    height:2.5rem;
    width:2.5rem;
    font-size:0.4rem;
    color:#fff;
    Justify-content:center;  // 子元素水平居中 
    align-items:center;       //子元素垂直居中    
    display:-webkit-flex;   
    padding:0.1rem;
    box-sizing: border-box;
    background:rgba(0,0,0,0.4);
    margin-left:0.2rem;
  }
  .house-info{
    width: 80%;
    margin: 0 auto;
  }
  .textarea{
    width: 85%;
  }
  /deep/.van-picker__cancel,/deep/.van-picker__confirm{
    color: #FFB640;
  }
  .img{
    width: 85%;
    // height: 3.125rem;
    margin: 0.3125rem auto;
    display: block;
  }
  .edit-btn{
    margin: 0.625rem auto;
  }
  /deep/.van-button--small{
    font-size:0.4rem;
  }
  .remind{padding:0.2rem 0;}
  .manyPic,.img_are{width:85%; margin:0.5rem auto; position:relative;display: block;
    overflow: hidden;}
  .manyPic::after{
    content: "";
    height:0;
    clear:both;
    visibility: hidden;
  }
  .manyPic img,.img_are img{
    width:100%;
    margin-bottom:0.35rem;
  }
  
  /deep/.delte{
    position:absolute;
    right:8%;
    top: 2%;
    font-size: 0.6rem;
    color:#fff;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
  }
  .manyImgBtn{
      background:#f3f3f3;
      width:2.5rem;
      height:2.5rem;
      align-items: center;
      justify-content: center; 
      font-size:2rem;
      line-height:3rem;
      float:left;
      margin-left:0.2rem;
      /deep/ .van-icon{
        color:#ccc
      }
  }
</style>
