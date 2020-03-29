<template>
  
  <div class="house-confirm">
    <HeaderBar></HeaderBar>
    <div style="color: red;margin-top: 1.5rem;">*温馨提示：请核对房源信息</div>
    <div style="width: 100%;">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#F8B729" >
        <van-swipe-item v-for="(image, index) in houseInfo.house_img" :key="index">
          <van-image width="100%" fit="contain" :src="image.content" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="data-form">
      <van-field readonly v-model="houseInfo.house_position" label="所属区域:" />
      <van-field readonly v-model="houseInfo.garden_name" label="小区名称:" />
      <van-field readonly v-model="houseInfo.building_number" label="楼栋号:" />
      <van-field readonly v-model="houseInfo.room_number" label="房号:" />
      <van-field readonly v-model="houseInfo.area" label="面积(㎡):" />
      <van-field readonly v-model="houseInfo.house_layout" label="户型" />
      <van-field readonly v-model="houseInfo.rent_price" label="租金" />
      <van-field readonly v-model="houseInfo.deposit" label="押金:" />
      <van-field readonly v-model="houseInfo.payStyleDesc" label="付款方式" />
      <div class="label">房源描述:</div>
      <van-field v-model="houseInfo.house_desc" rows="6" autosize type="textarea" maxlength="200"
       placeholder="请在此处编辑您的描述(物业费、网络费、水电费、煤气费的支付方式等)" show-word-limit />
      <div class="label">身份证正面照片</div>
      <van-image v-for="(item, index) in houseInfo.cardimg1" :key="index" width="90%" height="3.125rem" fit="contain" :src="item.content" />
      <div class="label">身份证反面照片</div>
      <van-image v-for="(item, index) in houseInfo.cardimg2" :key="index" width="90%" height="3.125rem" fit="contain" :src="item.content" />
      <div class="label">房产证或购房合同照片</div>
      <van-image v-for="(item, index) in houseInfo.certifi_info" :key="index" width="90%" height="3.125rem" fit="contain" :src="item.content" />
      <van-divider />
      <div style="text-align: left;font-weight: bold;font-size: 0.3125rem;line-height: 0.5rem;">增值服务</div>
      <!-- <van-checkbox-group v-model="houseInfo.result">
        <van-cell-group>
          <van-cell :v-show="aria-checked"  v-for="(item, index) in houseInfo.list" clickable :key="index" :title="`${item.serviceName}`">
            <van-col>{{item.servicePrice}}</van-col>
            <van-checkbox disabled slot="right-icon" :name="item" ref="checkboxes" shape="square" checked-color="#F8B729" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group> -->
      <div style="color: red;">*管理服务费从委托合同签约成功起生效，平台将提供对应价格的服务，服务费从房屋出租的租金中扣除</div>
      <van-button style="margin: 0.625rem auto;width: 95%;border-radius: 0.3125rem;" type="primary" block color="#F8B729"
        size="small" @click="showConfirm = true">提交</van-button>
    </div>
    
    <van-action-sheet v-model="showConfirm" :round="false" title="委托费用支付" height="200px">
      <van-divider dashed></van-divider>
      <div class="confirm">
        <van-cell>
          <van-col class="float-left">安全包</van-col>
          <van-col class="float-right">￥20.00</van-col>
        </van-cell>
        <van-cell>
          <van-col class="float-left">管理服务费</van-col>
          <van-col class="float-right">￥1.00/天</van-col>
        </van-cell>
        <!-- <van-cell style="color: red;font-size: 0.25rem">*管理服务费从委托合同签约成功起生效，平台将提供对应价格的服务，服务费从房屋出租的租金中扣除</van-cell> -->
        <div style="color: red;">*管理服务费从委托合同签约成功起生效，平台将提供对应价格的服务，服务费从房屋出租的租金中扣除</div>
        <div class="confirm-bottom">
          <div class="float-left">实付金额：￥20.00</div>
          <div class="float-right">
            <van-button square type="info" size="small" color="#F8B729" style="border-radius: 0.1875rem;" @click="showContract = true">确认支付</van-button>
          </div>
        </div>
      </div>
    </van-action-sheet>
    
    <van-popup class="pop-contract" v-model="showContract" :close-on-click-overlay="false">
      <van-nav-bar :left-arrow="false" :fixed="true" border title="委托合同签约">
        <van-icon name="cross" slot="right" color="#474747" size="0.5rem" @click="showContract = false" />
      </van-nav-bar>
      <div style="width: 90%;margin: 0 auto;padding-top: 1rem;">
        <h3>房屋委托合同</h3>
        <p style="text-indent: 0.5rem;text-align: left;">今收到房东 唐先生  委托，将位于  天元涉外景园1期 12 栋 1808 委托给我司出租，租金为 2800 元每月，押金为 2800 元，以下是合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容今收到房东 唐先生  委托，将位于  天元涉外景园1期 12 栋 1808 委托给我司出租，租金为 2800 元每月，押金为 2800 元，以下是合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同其他内容合同</p>
      </div>
      <div style="width: 90%;margin: 0 auto;">
        <van-button square type="info" size="small" color="#F8B729" style="border-radius: 0.1875rem;" @click="showSignature = true">打开签名版</van-button>
      </div>
    </van-popup>   
    <van-action-sheet v-model="showSignature" :round="false" title="电子签名" :close-on-click-overlay="false">
      <canvas ref="signHandle" class="canvas" id="canvas" />
      <div >
        <van-button size="mini" @touchstart="clearHandle">清空</van-button>
        <van-button type="info" size="mini" @touchstart="saveImg">确认</van-button>
      </div>
    </van-action-sheet>    
    <!-- <div class="dialog" @touchmove.prevent>
        <canvas ref="signHandle" class="canvas" id="canvas" />
        <div>
          <van-button size="mini" @touchstart="clearHandle">清空</van-button>
          <van-button type="info" size="mini" @touchstart="saveImg">确认</van-button>
        </div>
    </div> -->
  </div>
</template>

<script>
  import HeaderBar from '../../components/common/HeaderBar'

// 使用 <dingtalk></dingtalk> 在页面中调用
  export default {
    name: 'HouseInfoConfirm',
    components: {HeaderBar},
    data() {
      return {
        testUrl:'',
        houseInfo:{
          house_position: '',
          garden_name: '',
          building_number: 1,
          expire_year: 3,
          room_number: 1001,
          area: 60,
          house_layout: '',
          rent_type: 1,
          rent_price: 1500,
          deposit: 1500,
          pay_style: 3,
          payStyleDesc: '',
          house_desc: '',
          house_img: [],
          certifi_info: null,
          cardimg1: null,
          cardimg2: null,
          added_service_id: [],
          //产权编号
          house_number:''
        },
        // 底部确认弹框
        showConfirm: false,
        // 合同展示
        showContract:false,
        // 签名显示
        showSignature: false,
        /* */
        el: '', // canvas dom
        ctx: '', // canvas context
        background: '#fff', // canvas background-color 白色
        color: '#000', // 绘制时线条的颜色
        linewidth: 3, // 线条的宽度
        /* */
        value: null,
        options:{
            isSign: true, //签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
            isShowBorder: true, //是否显示边框 [可选]
        }
      }
    },
    created() {},
    mounted() {
      // 接受房源信息录入参数
      this.generationConfirm();
    },
    updated () {
        this.draw()
    },
    methods: {
      // 接受房源信息录入参数
      generationConfirm(){
        // 从vuex获取数据
        this.houseInfo = this.$store.state.entrust.houseInfo;
      },
      // 添加绘制 line
      draw() {
        // debugger
        if(!this.$refs.signHandle){
          return
        }
        document.addEventListener('touchmove', e => e.preventDefault(), {
          passive: false
        })
        this.el = this.$refs.signHandle
        this.initCanvas()
      },
      // 初始化canvas配置
      initCanvas() {
        debugger
        this.ctx = this.el.getContext('2d')
        
        // 解构设备的宽度, 和 高度
        const { clientWidth, clientHeight } = document.documentElement
        
        var w1 = window.outerWidth;
        var h1 = window.outerHeight;
        var w1 = window.pageXOffset;
        var w2 = window.pageYOffset;
        var c =  document.body.clientHeight;
        // 计算偏移量
        var ss = $("#canvas");
//         var y = ss.offset().top;
//         var x = ss.offset().left;
        let x = 0;
        let y = clientHeight - this.el.offsetParent.clientHeight + this.el.offsetTop;
        // let y2 = document.body.clientHeight - this.el.offsetParent.clientHeight + this.el.offsetTop;
        debugger
        this.el.width = this.el.offsetParent.clientWidth * 0.98;
        // this.el.height = 250;
        let width = this.el.clientWidth;
        let height = this.el.clientHeight;
        
        // 设置背景色:白色
        this.ctx.fillStyle="#CCCCCC";
        // this.ctx.fillStyle = this.background;
        // 设置线条颜色
        this.ctx.strokeStyle = this.color;
        // 设置线宽
        this.ctx.lineWidth = this.linewidth;
        // 设置线条两头的结束点和开始点是圆形的
        this.ctx.lineCap = 'round';
        // 初始化画布
        this.ctx.fillRect( 0, 0, width, height );
        this.drawStart(x,y);
        this.drawing(x,y);
        this.drawEnd();
      },
      // 开始绘制
      drawStart(x,y) {
        this.el.addEventListener('touchstart',e => {
          debugger
          console.log(y)
          this.ctx.beginPath();
          this.ctx.moveTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY - y );
        },false)
      },
      // 绘制中
      drawing(x,y) {
        this.el.addEventListener('touchmove',e => {
          this.ctx.lineTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY - y  );
          this.ctx.stroke();
        },false)
      },
      // 绘制结束
      drawEnd() {
        this.el.addEventListener('touchend', () => this.ctx.closePath(), false)
      },
      // 清空
      clearHandle() {
        this.initCanvas()
      },
      // 保存信息
      saveImg() {
        const imgBase64 = this.el.toDataURL()
        console.log('保存签名成功' + imgBase64)
      },
    }
  }
</script>

<style scoped>
  .confirm-content{
    padding: 1rem 1rem 10rem;
  }
  .confirm{
    width: 80%!important;
    margin: 0 auto;
  }
  .confirm-bottom{
    margin: 0.3125rem auto;
    overflow: hidden;
  }
  .confirm-bottom .float-left{
    font-weight: bolder;
    font-size: 0.3125rem;
    line-height: 0.75rem;
  }
  .pop-contract{
    width: 100%;
    height: 100%;
  }
  .pop-contract .head{
    font-size: 0.5rem;
    text-align: center;
    height: 1rem;
    position: fixed;
  }
  
  .signHandle {
    background-color: white;
    padding: 0;
  }
  .canvas{
    border: 0.03125rem solid lightgray;
  }
  .dialog{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    outline: 0;
    -webkit-overflow-scrolling: touch;
    background-color: rgb(0, 0, 0);  
    filter: alpha(opacity=60);  
    background-color: rgba(0, 0, 0, 0.6); 
    z-index: 9999;
  }
  /* .dialog .back{
    background-color: white;
  } */
</style>