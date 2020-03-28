<template>
  <div class="to-entrust">
    <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" />
    <div class="main" v-if="status=='edit'">  
      <!-- <div style="color: red;">*温馨提示：请认真填写，房屋信息不全将延长租出时间</div> -->
      <div class="data-form">
        <div class="title">租客信息</div> 
        <van-field v-model="ContractInfo.tenant.truename" label="姓名:" placeholder="请输入姓名" />
        <van-field v-model="ContractInfo.tenant.telphone" label="电话:" placeholder="请输入电话" />
        <van-field v-model="ContractInfo.tenant.idcardcode" label="身份证:" placeholder="请输入身份证" />
        <van-field v-model="ContractInfo.tenant.start_time" label="起租时间:" placeholder="请输起租时间"  />
        
        <van-field v-model="ContractInfo.tenant.use_time" label="租期:" placeholder="1年" />
        <p>身份证照片:（*请上传清晰完整照片，否则无法通过审核）</p>
            <div class="label">正面：</div>
            <div class="cardImg">
              <van-uploader :max-count="1" :after-read="onread1">
                  <img :src="ContractInfo.tenant.cardimg1" ref="goodsImg" />
              </van-uploader>
            </div>
        <div class="label">反面：</div>
        <div class="cardImg">
          <van-uploader :max-count="1" :after-read="onread2">
              <img :src="ContractInfo.tenant.cardimg2" ref="goodsImg_2" />
          </van-uploader> 
        </div>
        <div class="label">手持：</div>
        <div class="cardImg">
          <van-uploader :max-count="1" :after-read="onread3">
              <img :src="ContractInfo.tenant.cardimg3" ref="goodsImg_3" />
          </van-uploader> 
         
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
                  <td colspan="2">{{item.pay_price}}</td>
                </tr>               
              </tbody>
            </table>
        </div>
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
        title:'修改合同信息',
        whyedit:"您的身份证照片模糊，请修改。这里放置审核时提交的驳回原因",
        status:'edit',
        noticeIcon:'' ,
        value: '',
        ContractInfo: {
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
      this.init();
    },
    methods: {
      init(){
        //debugger
        // if(this.$store.state.entrust.houseInfo){
        //   this.houseInfo = this.$store.state.entrust.houseInfo;
        // }
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

      },
      onClickLeft() {
        this.$router.back(-1);
      },
       onread1(file){
        console.log(file)
        this.$refs.goodsImg.src=file.content;
        //this.watermark(file.content,this.ContractInfo.tenant.imgcard1);
        this.ContractInfo.tenant.imgcard1=file.content;
      },
      onread2(file){
        this.$refs.goodsImg_2.src=file.content;
        //this.watermark(file.content);
        this.ContractInfo.tenant.imgcard2=file.content;
      },
      onread3(file){
        this.$refs.goodsImg_3.src=file.content;
        this.ContractInfo.tenant.certifi_info=file.content;
      },
      watermark(res,img){
        let param = {
          api_token: this.$store.state.global.api_token,
          file: res
        };
        let that=this;
        this.$http.post(this.$store.state.global.baseUrl + 'entrust/watermark', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
             console.log(res.data)
              //that.$store.state.locale.editHouseInfo = res.data.data;
              img=res.data.data.src;
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
 /deep/.cardImg img{width:85%; margin:0.5rem auto;}
  .add-service-cell div{
    display: inline-block;
    width: 25%;
    height: 1rem;
  }
 
</style>
