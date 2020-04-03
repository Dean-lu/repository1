<template>
  <div class="to-entrust">
    <HeaderBar></HeaderBar>
    <div class="main">
      <div style="width: 100%;height: 1.2rem;"></div>
      <van-notice-bar :scrollable="false" text="温馨提示：请认真填写，房屋信息不全将延长租出时间" :left-icon="noticeIcon" />
      <!-- <div style="color: red;">*温馨提示：请认真填写，房屋信息不全将延长租出时间</div> -->
      <div class="data-form">
        <div class="title">基本信息</div>
        <van-form >
          <van-field readonly clickable :value="houseInfo.house_position" label="所属区域:" placeholder="点击选择省市区" @click="showHousePosition = true" />
          <van-popup v-model="showHousePosition" position="bottom">
            <van-area :area-list="areaList" title="选择省市区" @confirm="confirmArea" @cancel="showHousePosition = false" />
          </van-popup>
          
          <van-field v-model="houseInfo.house_number" label="产权编号:" placeholder="请输入产权编号"
            :rules="[{ validator, message: '请不要输入数字和英文字母' }]"/>
          
          <van-field v-model="houseInfo.garden_name" label="小区名称:" placeholder="请输入小区名称" />
          <van-field v-model="houseInfo.building_number" label="楼栋号:" placeholder="请输入楼栋号" />
          <van-field v-model="houseInfo.room_number" label="房号:" placeholder="请输入房号" />
          <van-field v-model="houseInfo.area" label="面积(㎡):" placeholder="请输房间面积(㎡)"  type="number" />
          
          <van-field readonly clickable name="houseInfo.house_layout" :value="houseInfo.house_layout" label="户型:" placeholder="户型" @click="showHouseLayout = true" />
          <van-popup class="popup-select" v-model="showHouseLayout" position="bottom" >
            <van-picker show-toolbar title="选择户型" :columns="houseLayouts" @cancel="showHouseLayout = false" @confirm="confirmHouseLayout" />
          </van-popup>
          
          <van-field readonly clickable :value="valueRentType" label="类型" placeholder="点击房屋类型" @click="showRentType = true" />
          <van-popup v-model="showRentType" position="bottom">
            <van-picker show-toolbar :columns="rentTypeDesc" @confirm="confirmRentType" @cancel="showRentType = false" />
          </van-popup>
          
          <van-field v-model="houseInfo.rent_price" label="租金:" placeholder="请输入租金"  type="number"/>
          <van-field v-model="houseInfo.deposit" label="押金:" placeholder="请输入押金"  type="number"/>
          <van-field readonly clickable :value="valuePayStyle" label="付款方式" placeholder="点击选择付款方式" @click="showPayStyle = true" />
          <van-popup v-model="showPayStyle" position="bottom">
            <van-picker show-toolbar :columns="payStyleDesc" @confirm="confirmPayStyle" @cancel="showPayStyle = false" />
          </van-popup>
          
          <van-field readonly clickable :value="valueExpireYear" label="委托期限" placeholder="点击选择委托期限" @click="showExpireYear = true" />
          <van-popup v-model="showExpireYear" position="bottom">
            <van-picker show-toolbar :columns="expireYearDesc" @confirm="confirmExpireYear" @cancel="showExpireYear = false" />
          </van-popup>
          
          <div class="label">房源描述:</div>
          <van-field v-model="houseInfo.house_desc" rows="6" autosize type="textarea" maxlength="200"
           placeholder="请在此处编辑您的描述(物业费、网络费、水电费、煤气费的支付方式等)" show-word-limit />
        </van-form>
      </div>
      <div class="pic-area">
        <div class="title">证件信息</div>
        <div class="label">身份证正面照片(与产权人一致)：</div>
        <div class="id-front">
          <van-field name="houseInfo.idcardFront">
            <template #input>
              <van-uploader v-model="houseInfo.idcardFront" :after-read="uploadCardFront" :max-count="1" />
            </template>
          </van-field>
        </div>
        <div class="label">身份证反面照片(与产权人一致)：</div>
        <div class="id-back">
          <van-field name="houseInfo.idcardBack">
            <template #input>
              <van-uploader v-model="houseInfo.idcardBack" :after-read="uploadCardBack" :max-count="1" />
            </template>
          </van-field>
        </div>
        <div class="label">房产证或产权合同照片：</div>
        <div class="house-cer">
          <van-field name="houseInfo.certifiInfo">
            <template #input>
              <van-uploader v-model="houseInfo.certifiInfo" :after-read="uploadCertificate" :max-count="1" />
            </template>
          </van-field>
        </div>
        <div class="label">房屋照片（*限8张)</div>
        <div class="ver-code-bottom-one-right-code pic-area">            
            <div class="ver-code-bottom-one-right-code manyPic">
              <div class="posting-uploader-item" v-for="(item,index) in houseInfo.house_img" :key="index">
                <img :src="item"  alt="图片" class="imgPreview">
                <van-icon name="close" @click="delImg(index)" class="delte"/>
              </div>
              <van-uploader :after-read="afterReadHouseImg" multiple :max-count="8" />
            </div> 
        </div>
        <!-- <div>
          <van-field name="houseInfo.house_img">
            <template #input>
              <van-uploader :after-read="afterReadHouseImg" multiple :max-count="8" />
            </template>
          </van-field>
        </div> -->
        <van-divider />
        <div style="text-align: left;font-size: 0.5rem;color: #323233;text-indent: 0.45rem;margin: 0.3rem 0;">
          增值服务<span style="font-size: 0.3rem;">(*自愿选取)</span>
          <div class="ques-icon"></div>
        </div>
        <div class="add-service">
          <div class="add-service-cell" v-for="(item, index) in addedService" :key="index">
            <div>{{item.service_name}}</div>
            <div>¥{{item.price}}</div>
            <div>
              <input type="checkbox" :value="item.id" @click="checkExclusion(item,index)" />
            </div>
          </div>
        </div>
        <div style="color: red;">*管理服务费从委托合同签约成功起生效，平台将提供对应价格的服务，服务费从房屋出租的租金中扣除</div>
        <van-button style="margin: 0.625rem auto;width: 95%;border-radius: 0.3125rem;" type="primary" block color="#F8B729"
          size="small" @click="toConfirm">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from '../../components/common/HeaderBar'
  import areaList from '../../assets/js/area.js'
  export default {
    name: 'HouseInfoInput',
    components: {HeaderBar},
    data() {
      return {
        noticeIcon: require('../../assets/img/entrust/lingdang.png'),
        value: '',
        houseInfo:{
          initMark: '0x10',
          house_position: '',
          garden_name: '',
          building_number: null,
          expire_year: null,
          expireYearDesc: '',
          room_number: null,
          area: null,
          house_layout: '',
          rent_type: null,
          rentTypeDesc: '',
          rent_price: null,
          deposit: null,
          pay_style: null,
          payStyleDesc: '',
          house_desc: '',
          house_img: [],
          houseImg:[],
          // 带水印的房产证/合同照片url
          certifi_info: null,
          // 房产证file
          certifiInfo: [],
          // 带水印的身份证正面照url
          cardimg1: null,
          // 身份证正面file
          idcardFront: [],
          // 带水印的身份证反面照url
          cardimg2: null,
          // 身份证反面file
          idcardBack: [],
          added_service_id: [],
          //产权编号
          house_number:'',
          // 增值服务总价
          totalAddPrice: 0.0,
          addedServiceSelect: [],
          
        },
        imgFormData: new FormData(),
        // areaList: require('../../assets/js/area.js'), // 数据格式见 Area 组件文档
        areaList: areaList,
        // 区域选择参数
        valueHousePosition: '',
        showHousePosition: false,
        // 户型选择参数
        valueHouseLayout: '',
        houseLayouts:['公寓','一室一厅','二室一厅','二室二厅','三室一厅','三室二厅','四室二厅','五室及以上'],
        showHouseLayout: false,
        // 付款方式显示控制
        showPayStyle :false,
        valuePayStyle: '',
        payStyleDesc: ['年付', '半年付', '季付', '月付'],
        // 付款方式
        showRentType: false,
        valueRentType: '',
        rentTypeDesc: ['整租', '合租', '转租'],
        // 委托时间
        showExpireYear: false,
        valueExpireYear: '',
        expireYearDesc: ['三年', '四年', '五年'],
        // 增值服务包
        addedService: [
          
        ]
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        if(this.$store.state.entrust.houseInfo && this.$store.state.entrust.houseInfo.initMark == '0x10'){
          this.houseInfo = this.$store.state.entrust.houseInfo;
        }
        // 获取增值服务
        var that =this;
        let param = {api_token: this.$store.state.global.api_token};
        this.$http.post(this.$store.state.global.baseUrl + 'entrust/get_add_values', param).then(res => {
          if(res.status == 200) {
            if(res.data.code == 200){
              that.addedService = res.data.data;
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            console.log("获取增值服务失败！")
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
      // 户型选择
      confirmHouseLayout(value){
        this.valueHouseLayout = value;
        this.houseInfo.house_layout = this.valueHouseLayout;
        this.showHouseLayout = false;
      },
      // 确认付款方式
      confirmPayStyle(value,index) {
        this.valuePayStyle = value;
        this.houseInfo.pay_style = index + 1;
        this.houseInfo.payStyleDesc = value;
        this.showPayStyle = false;
      },
      // 确认委托时间
      confirmExpireYear(value,index){
        this.valueExpireYear = value;
        this.houseInfo.expire_year = index + 3;
        this.houseInfo.expireYearDesc = value;
        this.showExpireYear = false;
      },
      // 确认类型
      confirmRentType(value, index){
        this.valueRentType = value;
        this.houseInfo.rent_type = index + 1;
        this.houseInfo.rentTypeDesc = value;
        this.showRentType = false;
      },
      toggle(index) {
        this.$refs.checkboxes[index].toggle();
      },
      // 上传身份证正面照
      uploadCardFront(file){
        var that = this;
        let param = new FormData();
        param.append('api_token', this.$store.state.global.api_token);
        param.append('file', file.file);
        this.$http.post(this.$store.state.global.baseUrl + 'entrust/watermark', param, {
            headers: { 'Content-Type':'multipart/form-data' }
          }).then(res => {
          console.log(res.data)
          if(res.status == 200) {
            if(res.data.code == 200){
              // 记录上传后返回的URL
              console.log(res.data.data)
              that.houseInfo.cardimg1 = res.data.data;
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('上传图片失败，请重新选择图片！');
            return;
          }
        });
      },
      // 上传身份证反面照
      uploadCardBack(file){
        var that = this;
        let param = new FormData();
        param.append('api_token', this.$store.state.global.api_token);
        param.append('file', file.file);
        //设置请求头
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }; 
        this.$http.post(this.$store.state.global.baseUrl + 'entrust/watermark', param, config).then(res => {
          console.log(res)
          if(res.status == 200) {
            if(res.data.code == 200){
              console.log(res.data.data)
              // 记录上传后返回的URL
              that.houseInfo.cardimg2 = res.data.data;
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('上传图片失败，请重新选择图片！');
            return;
          }
        });
      },
      // 上传房产证/合同
      uploadCertificate(file){
        var that = this;
        let param = new FormData();
        param.append('api_token', this.$store.state.global.api_token);
        param.append('file', file.file);
        //设置请求头
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }
        this.$http.post(this.$store.state.global.baseUrl + 'entrust/watermark', param, config).then(res => {
          console.log(res)
          if(res.status == 200) {
            if(res.data.code == 200){
              console.log(res.data.data)
              // 记录上传后返回的URL
              that.houseInfo.certifi_info = res.data.data;
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('上传图片失败，请重新选择图片！');
            return;
          }
        });
      },
      // 读取房屋图片
      afterReadHouseImg(file){
        let param=new FormData;
        param.append("api_token", this.$store.state.global.api_token),
        param.append("file",file.file)         
        let that=this;
        //设置请求头
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }
        this.$http.post(this.$store.state.global.baseUrl + 'entrust/watermark', param, config).then(res => {
          //debugger
          console.log(res);   
          if(res.status == 200) {
            if(res.data.code == 200){
              that.houseInfo.house_img.push(res.data.data);
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('获取图片失败，请刷新重试！');            
            return;
          }
        });
        
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
//       afterRead(file){
//         debugger
//         this.imgFormData.append("")
//       },
      // 检查增值服务互斥项
      checkExclusion(item,clickIndex){
        if(!this.houseInfo.totalAddPrice){
          this.houseInfo.totalAddPrice = 0.0;
        }
        console.log(item)
        // 互斥项禁用
        let checkboxs = $(".add-service-cell input");
        let exclusionIds = item.mutex_ids;
        if(checkboxs[clickIndex].checked == true){// 勾选事件
          if(item.mutex_ids && item.mutex_ids.length > 0){
            for(let i = 0; i < exclusionIds.length; i++){
              for(let j = 0; j < checkboxs.length; j++){
                if(checkboxs[j].value == exclusionIds[i]){
                  checkboxs[j].disabled = true;
                }
              }
            }
          }
          this.houseInfo.addedServiceSelect.push(item);
          this.houseInfo.totalAddPrice = Math.round((this.houseInfo.totalAddPrice + parseFloat(this.addedService[clickIndex].price))*100)/100;
          // this.houseInfo.totalAddPrice = this.$math.format(this.$math.chain(this.$math.bignumber(this.houseInfo.totalAddPrice)).add(this.$math.bignumber(this.addedService[clickIndex].price)).done());
          // this.houseInfo.totalAddPrice = this.$math.add(this.houseInfo.totalAddPrice, this.addedService[clickIndex].price) ;
          // this.houseInfo.totalAddPrice += parseFloat(this.addedService[clickIndex].price);
        }else{// 反选事件
          let indexArr = [];
          if(exclusionIds && exclusionIds.length > 0){
            for(let a = 0; a < exclusionIds.length; a++){
              debugger
              for(let b = 0; b < checkboxs.length; b++){
                if(checkboxs[b].value == exclusionIds[a]){// 当前item对应的mutexid解禁
                  checkboxs[b].disabled = false;
                  indexArr.push(b);
                }
              }
            }
          }
          // 但还需检查其他item
          debugger
          for(let e = 0; e < indexArr.length; e++){
            for(let c = 0; c < this.addedService.length; c++){
              if(c == clickIndex){
                continue;
              }
              let mutexIdsElse = this.addedService[c].mutex_ids;
              if(mutexIdsElse && mutexIdsElse.length > 0){
                for(let d = 0; d < mutexIdsElse.length; d++){
                  if(checkboxs[indexArr[e]].value == mutexIdsElse[d] && checkboxs[c].checked == true){
                    checkboxs[indexArr[e]].disabled = true;
                  }
                }
              }
            }
          }
          
          
          for(let c = 0; c < this.houseInfo.addedServiceSelect.length; c++){
            if(item.id == this.houseInfo.addedServiceSelect[c].id){
              this.houseInfo.addedServiceSelect.splice(c,1);
            }
          }
          if(this.houseInfo.totalAddPrice >= parseFloat(this.addedService[clickIndex].price)){
            this.houseInfo.totalAddPrice = Math.round((this.houseInfo.totalAddPrice - parseFloat(this.addedService[clickIndex].price))*100)/100;
          }
          // this.houseInfo.totalAddPrice = this.$math.format(this.$math.chain(this.$math.bignumber(this.houseInfo.totalAddPrice)).subtract(this.$math.bignumber(this.addedService[clickIndex].price)).done());
          // this.houseInfo.totalAddPrice = this.$math.subtract(this.houseInfo.totalAddPrice, this.addedService[clickIndex].price);
        }
        // console.log(this.houseInfo.totalAddPrice);
        this.houseInfo.added_service_id = [];
        for(let i = 0; i < checkboxs.length; i++){
          if(checkboxs[i].checked == true){
            this.houseInfo.added_service_id.push(checkboxs[i].value);
            
          }
        }
      },
      // 根据值刷新checkBox
      checkIds(){
        if(this.houseInfo.added_service_id && this.houseInfo.added_service_id.length > 0){
          let checkboxs = $(".add-service-cell input");
          for(let i = 0; i < this.houseInfo.added_service_id.length; i++){
            for(let j = 0; j < checkboxs.length; j++){
              if(checkboxs[j].value == this.houseInfo.added_service_id[i]){
                checkboxs[j].checked = true;
                // 检查互斥
                if(this.addedService[j].mutex_ids && this.addedService[j].mutex_ids.length > 0){
                  let mutexIds = this.addedService[j].mutex_ids;
                  for(let k = 0; k < mutexIds.length; k++){
                    checkboxs[parseInt(mutexIds[k]) - 1].disabled = true;
                  }
                }
              }
            }
          }
        }
        
      },
      validator(val){
        return /^[0-9a-zA-Z_]{1,}$/.test(val);
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
        if(!this.houseInfo.expire_year){
          this.$toast("请选择委托时间");
          return;
        }
        if(!this.houseInfo.house_desc){
          this.$toast("请输入房源描述");
          return;
        }
        if(!this.houseInfo.certifi_info){
          this.$toast("请上传房产证或购房合同照片");
          return;
        }
        if(!this.houseInfo.cardimg1){
          this.$toast("请上传身份证正面照");
          return;
        }
        if(!this.houseInfo.cardimg2){
          this.$toast("请上传身份证反面照");
          return;
        }
        if(!this.houseInfo.house_img || this.houseInfo.house_img.length == 0){
          this.$toast("请上传房源照片");
          return;
        }
        this.$store.state.entrust.houseInfo = this.houseInfo;
        this.$router.push({path : '/houseInfoConfirm'});
      }
    },
    updated: function () {
      this.checkIds();
    }
  }
</script>

<style scoped lang="less">
  .to-entrust .main{
    width: 100%;
  }
  .label{
    text-align: left;
    text-indent: 0.45rem;
    color: #323233;
  }
  .data-form{
    width: 95%;
    margin: 0 auto;
  }
  .title{
    text-align: left;
    font-size: 0.5rem;
    color: #323233;
    text-indent: 0.45rem;
    margin: 0.3rem 0;
  }
  /deep/.van-field__label{
    text-align: left;
  }
  /deep/textarea{
    background-color: #F5F5F5;
    border-radius: 0.3125rem;
  }
  .pic-area{
    width: 95%;
    margin: 0 auto;
  }
  /deep/.id-front .van-uploader__upload{
    width: 8.75rem;
    height: 5rem;
    background-image: url("../../assets/img/entrust/id-front.png");
    background-repeat: no-repeat;
    background-size: cover; 
  }
  /deep/.id-front .van-uploader__upload-icon{
    display: none;
  }
  /deep/.id-back .van-uploader__upload{
    width: 8.75rem;
    height: 5rem;
    background-image: url("../../assets/img/entrust/id-back.png");
    background-repeat: no-repeat;
    background-size: cover; 
  }
  /deep/.id-back .van-uploader__upload-icon{
    display: none;
  }
  /deep/.house-cer .van-uploader__upload{
    width: 8.75rem;
    height: 5rem;
    background-image: url("../../assets/img/entrust/ceri.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  /deep/.house-cer .van-uploader__upload-icon{
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
  .ques-icon{
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background-image: url("../../assets/img/entrust/ques-icon.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    top: 0.05rem;
  }
  .add-service-cell div{
    display: inline-block;
    width: 25%;
    height: 1rem;
  }
  /deep/.van-picker__cancel, /deep/.van-picker__confirm{
    color: #F8B729;
  }
  .pic-area{position:relative;}
    /deep/.delte{
    position:absolute;
    right:8%;
    top: 2%;
    font-size: 0.6rem;
    color:#fff;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
  }
  .pic-area img{width:85%; margin-bottom:0.5rem;}
  .listConter img{width:22%;margin:2.5rem auto 0.4rem auto;}
  .tips{text-align: center; color:#666; font-size: 0.5rem;}
  /deep/.posting-uploader-item{position:relative;float:left;width:3rem; height:3rem;}
  /* .add-service-cell input{
    position: absolute;
    visibility: hidden;
  }
  .Checkbox+label {
    position:absolute;
    width: 16px;
    height: 16px;
    border: 1px solid #A6A6A6;
    border-radius: 50%;
    background-color:#DEDEDE;
  } 
  .Checkbox:checked+label:after {
      content: "";
      position: absolute;
      left: 2px;
      top:2px;
      width: 9px;
      height: 4px;
      border: 2px solid #424242;
      border-top-color: transparent;
      border-right-color: transparent; 
      transform: rotate(-45deg);
      -ms-transform: rotate(-60deg);
      -moz-transform: rotate(-60deg);
      -webkit-transform: rotate(-60deg);
  } */
</style>
