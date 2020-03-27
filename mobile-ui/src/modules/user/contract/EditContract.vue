<template>
  <div class="to-entrust">
    <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" />
    <div class="main" v-if="status=='edit'">  
      <!-- <div style="color: red;">*温馨提示：请认真填写，房屋信息不全将延长租出时间</div> -->
      <div class="data-form">
        <div class="title">租客信息</div> 
        <van-field v-model="houseInfo.garden_name" label="姓名:" placeholder="请输入姓名" />
        <van-field v-model="houseInfo.building_number" label="电话:" placeholder="请输入电话" />
        <van-field v-model="houseInfo.room_number" label="身份证:" placeholder="请输入身份证" />
        <van-field v-model="houseInfo.area" label="起租时间:" placeholder="请输起租时间"  />
        
        <van-field v-model="houseInfo.rent_price" label="租期:" placeholder="1年" />
        <van-field v-model="houseInfo.deposit" label="押金:" placeholder="请输入押金" />
        <p>身份证照片:（*请上传清晰完整照片，否则无法通过审核）</p>
            <van-field name="houseInfo.cardimg1"  label="正面：">
            <template #input>
              <van-uploader v-model="houseInfo.cardimg1" :max-count="1" />
            </template>
          </van-field>
           <van-field name="houseInfo.cardimg2"  label="反面：">
            <template #input>
              <van-uploader v-model="houseInfo.cardimg2" :max-count="1" />
            </template>
          </van-field>
          <van-field name="houseInfo.certifi_info"  label="手持：">
            <template #input>
              <van-uploader v-model="houseInfo.certifi_info" :max-count="1" />
            </template>
          </van-field>
      </div>
      <div class="pic-area">
        <div class="label">房源信息：</div> 
        <div>
            <p>位置：{{houseInfo.house_layout}}</p>
            <p><span>房型：{{houseInfo.house_layout}}</span><span>面积：{{houseInfo.area}}</span></p>
            <p><span>付款方式：</span><span>租金：</span></p>
            <p><span>押金：</span></p>
        </div>
        <div class="label">房源描述:</div>
        <p>{{houseInfo.house_desc}}</p>
        <div class="label">账单明细:</div>
        <p></p>
        <p></p>
        <van-button style="margin: 0.625rem auto;width: 95%;border-radius: 0.3125rem;" type="primary" block color="#F8B729"
          size="small" @click="toConfirm">点击确认查看</van-button>
      </div>
    </div>
    <div class="main" v-if="status=='end'">
       您的修改已经完成，我们会尽快为您审核。
    </div>
  </div>

</template>

<script>
  import areaList from '../../../assets/js/area.js'
  export default {
    name: 'HouseInfoInput',
    data() {
      return {
        title:'修改房源信息',
        whyedit:"您的身份证照片模糊，请修改。这里放置审核时提交的驳回原因",
        status:'edit',
        noticeIcon:'' ,
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
          cardimg1: null,
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
    padding-top: 1.2rem;
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
  .ques-icon{
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    
    position: relative;
    top: 0.05rem;
  }
  .add-service-cell div{
    display: inline-block;
    width: 25%;
    height: 1rem;
  }
 
</style>
