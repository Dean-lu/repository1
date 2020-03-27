<template>
  <div class="to-entrust">
    <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" />
    <div class="main" v-if="status=='edit'">
      <div style="width: 100%;height: 1.2rem;"></div>
      <div class="remind">*温馨提示：{{whyedit}}</div>
      <!-- <div style="color: red;">*温馨提示：请认真填写，房屋信息不全将延长租出时间</div> -->
      <div class="data-form">
        <div class="title">基本信息</div>
        <van-field readonly clickable :value="houseInfo.house_position" label="所属区域:" placeholder="点击选择省市区" @click="showHousePosition = true" />
        <van-popup v-model="showHousePosition" position="bottom">
          <van-area :area-list="areaList" title="选择省市区" @confirm="confirmArea" @cancel="showHousePosition = false" />
        </van-popup>
        
        <van-field v-model="houseInfo.garden_name" label="小区名称:" placeholder="请输入小区名称" />
        <van-field v-model="houseInfo.building_number" label="楼栋号:" placeholder="请输入楼栋号" />
        <van-field v-model="houseInfo.room_number" label="房号:" placeholder="请输入房号" />
        <van-field v-model="houseInfo.area" label="面积(㎡):" placeholder="请输房间面积(㎡)"  />
        
        <van-field readonly clickable name="houseInfo.house_layout" :value="houseInfo.house_layout" label="户型:" placeholder="户型" @click="showHouseLayout = true" />
        <van-popup class="popup-select" v-model="showHouseLayout" position="bottom" >
          <van-picker show-toolbar title="选择户型" :columns="houseLayouts" @cancel="showHouseLayout = false" @confirm="confirmHouseLayout" />
        </van-popup>
        
        <van-field v-model="houseInfo.rent_price" label="租金:" placeholder="请输入租金" />
        <van-field v-model="houseInfo.deposit" label="押金:" placeholder="请输入押金" />
        <van-field readonly clickable :value="houseInfo.pay_style_name" label="付款方式" placeholder="点击选择付款方式" @click="showPayStyle = true" />
        <van-popup v-model="showPayStyle" position="bottom">
          <van-picker show-toolbar :columns="payStyleDesc" @confirm="confirmPayStyle" @cancel="showPayStyle = false" />
        </van-popup>
        
        <div class="label">房源描述:</div>
        <van-field v-model="houseInfo.house_desc" rows="6" autosize type="textarea" maxlength="200"
         placeholder="请在此处编辑您的描述(物业费、网络费、水电费、煤气费的支付方式等)" show-word-limit />
      </div>
      <div class="pic-area">
        <div class="title">证件信息</div>
        <div class="label">身份证正面照片(与产权人一致)：</div>
        <div class="id-front">
          <van-cell>
            <van-image :src="houseInfo.cardimg1"></van-image>
          </van-cell>
          <van-field name="houseInfo.cardimg1">
            <template #input>
              <van-uploader v-model="houseInfo.cardimg1" :max-count="1" />
            </template>
          </van-field>
        </div>
        <div class="label">身份证反面照片(与产权人一致)：</div>
        <div class="id-back">
          <van-cell>
            <van-image :src="houseInfo.cardimg2"></van-image>
          </van-cell>
          <van-field name="houseInfo.cardimg2">
            <template #input>
              <van-uploader v-model="houseInfo.cardimg2" :max-count="1" />
            </template>
          </van-field>
        </div>
        <div class="label">房产证或产权合同照片：</div>
        <div class="house-cer">
          <van-cell>
            <van-image :src="houseInfo.certifi_info"></van-image>
          </van-cell>
          <van-field name="houseInfo.certifi_info">
            <template #input>
              <van-uploader v-model="houseInfo.certifi_info" :max-count="1" />
            </template>
          </van-field>
        </div>
        <div class="test">
          <div class="test1"></div>
          <div class="test2"></div>
        </div>
        <div class="label">房屋照片（*限8张)</div>
        <div>
          <van-field name="houseInfo.house_img">
            <template #input>
              <van-uploader v-model="houseInfo.house_img" :max-count="8" />
            </template>
          </van-field>
        </div>
        <van-divider />
        <div style="text-align: left;font-size: 0.5rem;color: #323233;text-indent: 0.45rem;margin: 0.3rem 0;">
          增值服务
          <div class="ques-icon"></div>
        </div>
        <div class="add-service">
          <!-- <div class="add-service-cell" >
            <div>{{houseInfo.addedService.service_name}}</div>
            <div>{{houseInfo.addedService.price}}</div>            
          </div> -->

          <!-- v-if="houseInfo.addedService.length==1"-->
            <div class="add-service-cell"   v-for="(item, index) in houseInfo.addedService" :key="index">
            <div>{{item.service_name}}</div>
            <div>{{item.price}}</div>            
          </div> 
        </div>
        <!-- <van-checkbox-group v-model="houseInfo.result">
          <van-cell-group>
            <van-cell v-for="(item, index) in list" clickable :key="index" :title="`${item.serviceName}`" @click="toggle(index)" >
              <van-col>{{item.servicePrice}}</van-col>
              <van-checkbox slot="right-icon" :name="item" ref="checkboxes" shape="round" checked-color="#F8B729" />
            </van-cell>
          </van-cell-group>
        </van-checkbox-group> -->
        <div style="color: red;">*管理服务费从委托合同签约成功起生效，平台将提供对应价格的服务，服务费从房屋出租的租金中扣除</div>
        <van-button style="margin: 0.625rem auto;width: 95%;border-radius: 0.3125rem;" type="primary" block color="#F8B729"
          size="small" @click="toConfirm">点击修改</van-button>
      </div>
    </div>
    <div class="main" v-if="status=='end'">
       您的修改已经完成，我们会尽快为您审核。
    </div>
  </div>

</template>

<script>
  import areaList from '../../assets/js/area.js'
  export default {
    name: 'HouseInfoInput',
    data() {
      return {
        title:'修改房源信息',
        whyedit:"您的身份证照片模糊，请修改。这里放置审核时提交的驳回原因",
        status:'edit',
        noticeIcon: require('../../assets/img/entrust/lingdang.png'),
        value: '',
        houseInfo: {
          id: 1,
          house_position: "长沙市岳麓区大学城",
          garden_name: "麓谷明珠",
          building_number: "2",
          room_number: "1201",
          area: "60.00",
          house_layout: "两室一厅",
          rent_price: "1500.00",
          deposit: "1500.00",
          pay_style: 3,
          pay_style_name: "季付",
          house_desc: "临近地铁口，周边配套齐全",
          house_img: ['\"storage\\/house\\/dIviIePV0PYTjsieH2KH7J3jRiFBAPK20jY9EfYf.jpeg\"'],
          cardimg1: "http://house.growingsale.cn/storage/safeimgs/ExbbYXQ6BhOruDWql0DTQZN4AWcUD3gtAgTMvbSx.jpeg",
          cardimg2: "http://house.growingsale.cn/storage/safeimgs/ExbbYXQ6BhOruDWql0DTQZN4AWcUD3gtAgTMvbSx.jpeg",
          certifi_info: "http://house.growingsale.cn/storage/safeimgs/ExbbYXQ6BhOruDWql0DTQZN4AWcUD3gtAgTMvbSx.jpeg",
          added_service:[
            {
            id: 1,
            service_name: "服务1",
            price: "10.33"
            },
            {
            id: 1,
            service_name: "服务1",
            price: "10.33"
            }
          ],
          expire_year: 3,
          house_number: null
        },
        // areaList: require('../../assets/js/area.js'), // 数据格式见 Area 组件文档
        areaList: areaList,
        // 区域选择参数
        valueHousePosition: '',
        showHousePosition: false,
        // 户型选择参数
        valueHouseLayout: '',
        houseLayouts:['公寓','一室一厅','一室一厅','二室二厅','二室二厅','三室一厅','三室二厅','四室二厅','五室及以上'],
        showHouseLayout: false,
        // 付款方式显示控制
        showPayStyle :false,
        valuePayStyle: '',
        payStyleDesc: ['年付', '半年付', '季付', '月付'],
        // 增值服务包
        
      }
    },
    mounted(){
      //this.init();
    },
    methods: {
      init(){
        //debugger
        if(this.$store.state.entrust.houseInfo){
          this.houseInfo = this.$store.state.entrust.houseInfo;
        }
       
        
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
      confirmPayStyle(value,index) {
        this.valuePayStyle = value;
        this.houseInfo.pay_style = index + 1;
        this.houseInfo.pay_style_name = value;
        this.showPayStyle = false;
      },
      toggle(index) {
        this.$refs.checkboxes[index].toggle();
      },     
      // 提交信息
      toConfirm(){
       // debugger
        // this.$store.state.entrust.houseInfo = this.houseInfo;
        // this.$router.push({path : '/lookentrust'});
        let that = this;
        let param = {
          api_token: this.$store.state.global.api_token,
          house_id: this.$store.state.locale.houseId,
          houseInfo: this.houseInfo
        };
        this.$http.post(this.$store.state.global.baseUrl + 'user/edit_myentrust', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.status="end"
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
  /deep/.id-front .van-icon{
    display: none;
  }
  /deep/.id-back .van-uploader__upload{
    width: 8.75rem;
    height: 5rem;
    background-image: url("../../assets/img/entrust/id-back.png");
    background-repeat: no-repeat;
    background-size: cover; 
  }
  /deep/.id-back .van-icon{
    display: none;
  }
  /deep/.house-cer .van-uploader__upload{
    width: 8.75rem;
    height: 5rem;
    background-image: url("../../assets/img/entrust/ceri.png");
    background-repeat: no-repeat;
    background-size: cover;
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
