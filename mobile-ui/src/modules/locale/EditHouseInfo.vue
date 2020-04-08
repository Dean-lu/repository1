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
            <van-field v-model="houseInfo.house_position"/>
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
            <van-field readonly clickable :value="houseInfo.pay_style_name" @click="showPayStyle = true" />
            <van-popup v-model="showPayStyle" position="bottom">
              <van-picker show-toolbar :columns="payStyleDesc" @confirm="confirmPayStyle" @cancel="showPayStyle = false" />
            </van-popup>
            <!-- <van-field v-model="houseInfo.pay_style_name"/> -->
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
        <van-uploader :after-read="afterZRead" :accept="'image/*'"  />
      </div>
      <div class="edit-btn">
        <van-button square type="info" size="small" color="#F8B729" @click="submitHouseInfo">确认修改</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from '../../components/common/HeaderBar'
  export default {
    name: 'EditHouseInfo',
    components: {HeaderBar},
    data () {
      return {
        houseInfo:{
          pay_style: 0,
          pay_style_name: ''
        },
        showHouseLayout: false,
        houseLayouts:['公寓','一室一厅','二室一厅','二室二厅','三室一厅','三室二厅','四室二厅','五室及以上'],
        payStyleDesc: ['年付', '半年付', '季付', '月付'],
        showPayStyle: false,
         // 装修状态       
        showrtrimStatus: false,
        valuetrimStatus: '',
        trimStatusDesc: ['毛胚', '简装', '精装', '豪装'],
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        this.houseInfo = this.$store.state.locale.editHouseInfo;
      },
      submitHouseInfo(){
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
            }
          }else{
            that.$toast('获取房源详情失败，请刷新重试！');
            return;
          }
        });
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
      // 确认付款方式
      confirmPayStyle(value,index) {
        this.houseInfo.pay_style_name = value;
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
       //多图上传
      afterZRead(file){
          //this.house_showImg=this.house_showImg;
          let param=new FormData;
          param.append("api_token", this.$store.state.locale.api_token),
          param.append("file",(file.file));         
          let that=this;
          this.$http.post(this.$store.state.global.baseUrl + 'entrust/watermark', param).then(res => {
            //debugger
            if(res.status == 200) {
              if(res.data.code == 200){
                console.log(res.data.data)
                
                let src=res.data.data;
                if(that.houseInfo.house_img==null && !that.houseInfo.house_img){
                  that.houseInfo.house_img=[]
                };
                that.houseInfo.house_img.push(src);
                console.log(that.houseInfo.house_img);       
              }else{
                that.$toast(res.data.msg);
              }
            }else{
              that.$toast('获取图片失败，请刷新重试！');            
              return;
            }
          });      
      }
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
  .manyPic,.img_are{width:85%; margin:0.5rem auto; position:relative;}
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
</style>
