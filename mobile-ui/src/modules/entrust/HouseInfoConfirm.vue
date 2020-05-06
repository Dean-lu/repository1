<template>
  <div class="house-confirm">
    <!-- <HeaderBar></HeaderBar> -->
    <!-- <div style="color: red;margin-top: 1.2rem;"></div> -->
    <div style="width: 100%;">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#F8B729" >
        <van-swipe-item v-for="(item, index) in houseInfo.house_img" :key="index">
          <van-image width="100%" fit="fill" height="6.125rem" :src="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-notice-bar :scrollable="false" text="*温馨提示：请核对房源信息是否无误" :left-icon="noticeIcon" />
    <div class="info-card">
      <div class="title">{{houseInfo.garden_name}}</div>
      <div class="area">{{houseInfo.house_position}}</div>
      <div>
        <div class="price">{{houseInfo.rent_price}}<span>元/月</span></div>
        <div class="add">增值服务：<span>{{houseInfo.totalAddPrice}}</span>元</div>
      </div>
    </div>
    <div class="data-form">
      <div class="title">房屋信息</div>
      <van-cell>
        <!-- <van-col span="12">
          <van-field readonly v-model="houseInfo.building_number" label="楼栋号:" label-width="2rem" label-align="left" />
        </van-col> -->
        <!-- <van-col span="12">
          <van-field readonly v-model="houseInfo.rentTypeDesc" label="类型" label-width="2rem" label-align="left" />
        </van-col> -->
      </van-cell>
      <van-cell>
        <van-col span="12">
          <van-field readonly v-model="houseInfo.house_layout" label="户型:" label-width="2rem" label-align="left" />
        </van-col>
        <van-col span="12">
          <van-field readonly v-model="houseInfo.room_number" label="房号:" label-width="2rem" label-align="left" />
        </van-col>
      </van-cell>
      <!-- <van-cell>
        <van-col span="12">
          <van-field readonly v-model="houseInfo.deposit" label="押金:" label-width="2rem" label-align="left" />
        </van-col>
        <van-col span="12">
          <van-field readonly v-model="houseInfo.payStyleDesc" label="付款方式" label-width="2rem" label-align="left" />
        </van-col>
      </van-cell> -->
      <van-cell>
        <van-col span="12">
          <van-field readonly v-model="houseInfo.expireYearDesc" label="委托期限:" label-width="2rem" label-align="left" />
        </van-col>
        
        <van-col span="12">
          <van-field readonly v-model="houseInfo.area" label="面积(㎡):" label-width="2rem" label-align="left" />
        </van-col>
      </van-cell>
      <van-cell>
        <van-col span="12">
          <van-field readonly v-model="houseInfo.house_number" label="产权编号:" label-width="2rem" label-align="left" />
        </van-col>
        <van-col span="12">
          <van-field readonly v-model="houseInfo.trimStatusDesc" label="装修状态:" label-width="2rem" label-align="left" />
        </van-col>
      </van-cell>
      <!-- <van-field readonly v-model="houseInfo.rent_price" label="租金" /> -->
      <div class="label">房源描述</div>
      <van-field v-model="houseInfo.house_desc" rows="6" autosize type="textarea" maxlength="200"
       placeholder="请在此处编辑您的描述(物业费、网络费、水电费、煤气费的支付方式等)" show-word-limit />
      <div class="title">证件信息</div>
      <div class="label">身份证正面照片：</div>
      <div class="img">
        <van-image height="3.125rem" fit="contain" :src="houseInfo.cardimg1" />
      </div>
      <div class="label">身份证反面照片：</div>
      <div class="img">
        <van-image height="3.125rem" fit="contain" :src="houseInfo.cardimg2" />
      </div>
      <div class="label">房产证或购房合同照片：</div>
      <div class="img">
        <van-image height="3.125rem" fit="contain" :src="houseInfo.certifi_info" />
      </div>
      <div class="title">增值服务</div>
      <div class="add-service">
        <div class="add-service-item" v-for="(item,index) in houseInfo.addedServiceSelect" :key="index">
          <div class="name">{{item.service_name}}</div>
          <div class="price">¥{{item.price}}</div>
        </div>
      </div>
      <div class="add-serv">*<span>管理服务费从委托合同签约成功起生效，平台将提供对应价格的服务，服务费从房屋出租的租金中扣除</span></div>
      <van-button style="margin: 0.625rem auto;width: 95%;border-radius: 0.625rem;font-size: 0.5rem;" type="primary" block color="#F8B729"
        size="large" @click="showConfirmF">确认信息无误</van-button>
    </div>
    
    <van-action-sheet v-model="showConfirm" :round="false" title="委托费用支付" height="200px">
      <van-divider dashed></van-divider>
      <div class="confirm">
        <van-cell v-for="(item,index) in safe_package" :key="index">
          <van-col class="float-left">{{item.service_name}}</van-col>
          <van-col class="float-right">￥{{item.service_price}}</van-col>
        </van-cell>
        <!-- <van-cell style="color: red;font-size: 0.25rem">*管理服务费从委托合同签约成功起生效，平台将提供对应价格的服务，服务费从房屋出租的租金中扣除</van-cell> -->
        <div class="add-serv">*<span>管理服务费从委托合同签约成功起生效，平台将提供对应价格的服务，服务费从房屋出租的租金中扣除</span></div>
        <div class="confirm-bottom">
          <div class="float-left">实付金额：<span style="font-size: 0.5rem;color: #F8B729 ;">￥{{sum_price}}</span></div>
          <div class="float-right">
            <van-button square type="info" size="small" color="#F8B729" style="border-radius: 0.1875rem;" @click="checkPay">确认支付</van-button>
          </div>
        </div>
      </div>
    </van-action-sheet>
    
    <van-popup class="pop-contract" v-model="showContract" :close-on-click-overlay="false">
      <!-- <van-nav-bar :left-arrow="false" :fixed="true" border title="委托合同签约">
        <van-icon name="cross" slot="right" color="#F8B729" size="0.5rem" @click="closeContract" />
      </van-nav-bar> -->
      <div id="pdfDom" style="width: 100%;margin: 0 auto;">
        <div style="width: 90%;margin: 0 auto;">
          <h2>委托出租服务协议</h2>
          <p class="text-align-left">委托方（甲方）：<span class="text-underline">&nbsp;&nbsp;&nbsp;{{user.truename}}&nbsp;&nbsp;&nbsp;</span></p>
          <p class="text-align-left">受托方（乙方）：湖南米花寓公寓管理有限公司</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">甲、乙双方根据《中华人民共和国合同法》等相关法律的规定，在平等、自愿的原则上，就甲方将房屋委托乙方独家出租事宜，协商一致签定本协议。</p>
          <h3 class="text-align-left" style="text-indent: 0.5rem;">一、房屋位置与产权人</h3>
          <p class="text-align-left" style="text-indent: 0.5rem;">1、房屋具体位置：<span class="text-underline">&nbsp;&nbsp;&nbsp;{{houseInfo.house_position}}&nbsp;&nbsp;&nbsp;</span><span class="text-underline">&nbsp;&nbsp;&nbsp;{{houseInfo.garden_name}}&nbsp;&nbsp;&nbsp;</span>小区</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">2、房号：<span class="text-underline">&nbsp;&nbsp;&nbsp;{{houseInfo.building_number}}&nbsp;&nbsp;&nbsp;</span>栋<span class="text-underline">&nbsp;&nbsp;&nbsp;{{houseInfo.house_number}}&nbsp;&nbsp;&nbsp;</span>号</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">3、房屋面积：<span class="text-underline">&nbsp;&nbsp;&nbsp;{{houseInfo.area}}&nbsp;&nbsp;&nbsp;</span>㎡</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">4、房屋户型：<span class="text-underline">&nbsp;&nbsp;&nbsp;{{houseInfo.house_layout}}&nbsp;&nbsp;&nbsp;</span></p>
          <p class="text-align-left" style="text-indent: 0.5rem;">5、房屋产权人姓名：（甲方须与产权人一致）：<span class="text-underline">&nbsp;&nbsp;&nbsp;{{user.truename}}&nbsp;&nbsp;&nbsp;</span></p>
          <p class="text-align-left" style="text-indent: 0.5rem;">6、产权人身份证号：<span class="text-underline">&nbsp;&nbsp;&nbsp;{{user.idcardcode}}&nbsp;&nbsp;&nbsp;</span></p>
          <p class="text-align-left" style="text-indent: 0.5rem;">7、房屋产权证号：<span class="text-underline">&nbsp;&nbsp;&nbsp;{{houseInfo.house_number}}&nbsp;&nbsp;&nbsp;</span></p>
          <h3 class="text-align-left" style="text-indent: 0.5rem;">二、委托期<span class="text-underline">&nbsp;&nbsp;&nbsp;{{houseInfo.expire_year}}&nbsp;&nbsp;&nbsp;</span>年，自本协议签署后开始计算。</h3>
          <h3 class="text-align-left" style="text-indent: 0.5rem;">三、委托事项：</h3>
          <p class="text-align-left" style="text-indent: 0.5rem;">（一）甲方将房屋委托乙方独家出租并由乙方提供免费出租服务，免费出租服务具体包括房屋拍照、上架推广、出租带看、出租签约、租金押金代收费的收付等，不包含设施设备维修、保洁、带看交房与退租收房、各项费用缴纳及各项问题处理、财产保险与人身意外伤害保险等租后服务内容，由甲方全部承担房屋出租过程中出现的各类事故，对此乙方不承担任何责任。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">（二）甲方独家授权乙方作为出租人与租客签署《房屋使用合同》（按乙方提供版本），由乙方收取租金（在《房屋使用合同》里指“房屋使用费”，不包含代收费、服务费等其他费用）、押金。其中租金到乙方账上后、由甲方上乙方线上平台系统业主端次日提取，押金则由乙方负责收取、保管、退还及处置等事宜。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">（三）本协议签订后，由乙方出租该房屋的，乙方免收甲方出租居间费；非乙方（包含甲方本人或甲方委托中介及朋友）租出且租客与乙方签署《房屋使用合同》并向乙方交纳押金、租金及相关代收和服务费用的，由乙方补贴甲方出租居间费，出租居间费补贴标准：租期满1年的，补贴月租金的50%；租期为6个月（含）以上1年以下的，补贴月租金的25%；其他租期的（一个月以上），补贴月租金的10%。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">（四）房屋首次租出、签约《房屋使用合同》后，由甲方、乙方和租客3方签署《房屋交接单》，办理房屋交接；退租收房由甲方委托乙方办理、以后租出时由乙方直接办理房屋交接。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">
            （五）甲方选择下列第<span class="text-underline">&nbsp;&nbsp;&nbsp;
            <span v-for="(item,index) in houseInfo.added_service_id" :key="index">{{item}}、</span>&nbsp;&nbsp;&nbsp;</span>项由乙方提供的租后服务：</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">1、“1元/天·（间）套”（合租房按间计）维修巡查服务——提供每月不定期巡查巡检房屋1次，报修后上门勘察、定损及提出解决方案，但维修的人工费和材料费由甲方承担（人为损坏的，协助甲方要求损坏人赔偿）。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">2、“5元/天·（间）套”（合租房按间计）维修及租后服务——提供出租带看、交房和收房服务；退租后保洁服务；各项费用代缴服务；提供每月不定期巡查巡检房屋1次，报修后上门勘察、定损、提出解决方案并承担维修人工费（但材料费和设施设备更换费用由甲方承担，人为损坏的，协助甲方要求损坏人赔偿）；购买该套房的房屋财产保险及租客人身意外伤害保险（受益人为甲方）；协调各方关系与问题处理；代为签署房屋使用过程中所有相关法律文件等。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">3、购买1980元/套“出租房安全包”——密码锁1把、网关1个、消防箱1座、灭火器1个、无线烟感器1座、逃生绳1把、防毒面具2个、太平洋《租房全能险》1份、出租警示标语17份。（注：不要密码锁的，为1480元/套）</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">4、购买“15元/月·套的太平洋《租房全能险》”——以甲方为受益人购买的房屋出租保险。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">（六）甲方不选择乙方任何租后服务、而自行提供服务的，须在接收到服务通知的1小时内响应，24小时内解决问题（重大问题不能及时解决的除外）；否则视为甲方默认接受由乙方提供的租后服务，由乙方服务团队解决问题，并完全同意按照乙方的服务项目收费标准向乙方支付所有费用（如租金足够，则可从租金中抵扣）。</p>
          <h3 class="text-align-left" style="text-indent: 0.5rem;">四、违约责任：</h3>
          <p class="text-align-left" style="text-indent: 0.5rem;">（一）委托期内，甲方不得提前解约，否则甲方应双倍退还乙方以往已支付过的所有出租居间费、退还已收但未发生的租金，承担应支付给租客提前解约的违约金。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">（二）委托期内，乙方不得提前解约或者不支付符合条件的中介费，否则乙方向甲方双倍支付月租金的50%作为违约金（已支付的出租居间费可抵违约金）。</p>
          <h3 class="text-align-left" style="text-indent: 0.5rem;">五、其它</h3>
          <p class="text-align-left" style="text-indent: 0.5rem;">本协议一式两份，经甲乙双方签章后生效，具有同等法律效力。本协议未尽事宜，可由双方另行协商签订补充协议。</p>
          <div style="width: 100%;height: 0.5rem;"></div>
          <div style="width: 100%;min-height: 2rem;">
            <van-col span="12">
              <div class="text-align-left">委托方（甲方）: </div>
              <div class="text-align-left signature-area">
                <van-image v-show="showSignatureImg" :src="signatureImg" />
              </div>
              <div class="text-align-left">身份证号：{{user.idcardcode}}</div>
              <div class="text-align-left">电话：{{user.telphone}}</div>
            </van-col>
            <van-col class="logo-parent" span="12">
              <div class="text-align-left">受托方（乙方）: </div>
              <div class="text-align-left" style="text-indent: 0.2rem;line-height: 1.6rem;">湖南米花寓公寓管理有限公司</div>
              <div class="text-align-left">签约代表：</div>
              <div class="text-align-left">电话：</div>
              <div class="mihua-logo"></div>
            </van-col>
          </div>
          <div class="text-align-right">时间：{{currDate.getFullYear()}}年{{currDate.getMonth() + 1}}月{{currDate.getDate()}}日</div>
        </div>
      </div>
      <div style="width: 90%;margin: 0 auto;">
        <van-button v-if="!showSignatureImg" square type="info" size="small" color="#F8B729" style="border-radius: 0.1875rem;" @click="showSignature = true">电子签名</van-button>
        <van-button v-if="generateContractBtn" square type="info" size="small" color="#F8B729" style="border-radius: 0.1875rem;" @click="generateContract">提交合同</van-button>
      </div>
    </van-popup>   
    
    <van-action-sheet v-model="showSignature" :round="false" title="电子签名" :close-on-click-overlay="false">
      <canvas ref="signHandle" class="canvas" id="canvas" />
      <div >
        <van-button size="mini" @touchstart="clearHandle">清空</van-button>
        <van-button type="info" size="mini" color="#F8B729" @touchstart="saveImg">确认</van-button>
      </div>
    </van-action-sheet>    
    
  </div>
</template>

<script>
  // import HeaderBar from '../../components/common/HeaderBar'
// 使用 <dingtalk></dingtalk> 在页面中调用
  import JsPDF from 'jspdf'
  //import shareApi from '../../common/until'
  export default {
    name: 'HouseInfoConfirm',
    // components: {HeaderBar},
    data() {
      return {
        user: {
          truename: '',
          idcardcode: '',
          telphone: '',
          court: ''
        },
        mobile: '15841526398',
        currDate : new Date(),
        showSignatureImg: false,
        signatureImg: null,
        // 合同名称
        htmlTitle: '委托出租服务协议',
        noticeIcon: require('../../assets/img/entrust/lingdang.png'),
        // 提交房源信息后返回start
        house_id: 0,
        sum_price: 0,
        issubmit:false,
        safe_package: [
          {
            "service_name": "init服务",
            "service_price": "10.33"
            },
        ],
        // 提交房源信息后返回end
        houseInfo:{
          house_position: '',
          garden_name: '',
          building_number: 1,
          expire_year: 3,
          expireYearDesc: '',
          room_number: 1001,
          area: 60,
          house_layout: '',
          rent_type: 1,
          rentTypeDesc: '',
          rent_price: 1500,
          deposit: 1500,
          pay_style: 3,
          payStyleDesc: '',
          house_desc: '',
          house_img: [],
          houseImg:[],
          certifi_info: null,
          cardimg1: null,
          cardimg2: null,
          added_service_id: [],
          //产权编号
          house_number:''
        },
        totalPay: 0,
        generateContractBtn: false,//生成合同按钮
        // 底部确认弹框
        showConfirm: false,
        // 合同展示
        showContract: false,
        // 签名显示
        showSignature: false,
        clickif:false,
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
      document.title = '房源信息确认';
      this.generationConfirm();
      this.clickif=false;
      this.share();
    },
    updated () {
        this.draw()
    },
    methods: {
     share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
      // 接受房源信息录入参数
      generationConfirm(){
        // 从vuex获取数据
        this.houseInfo = this.$store.state.entrust.houseInfo;
        this.user = this.$store.state.global.user;
        if(!this.houseInfo){
           this.$router.back(-1);
        }
      },
      showConfirmF(){
        
        var that = this;
        if(that.clickif){
          return false;
        }
        that.clickif=true;
        // 提交房源确认信息，成功->去支付
        
//         let houseImg = [];
//         // let houseImg = this.houseInfo.house_img[0];
//         var dd = this.houseInfo.houseImg;
//         for(let i =0; i < this.houseInfo.house_img.length; i++){
//           houseImg.push(this.houseInfo.house_img[i]);
//         }       
        let param = {
          api_token: this.$store.state.global.api_token,
          house_position:this.houseInfo.house_position,
          garden_name:this.houseInfo.garden_name,
          //building_number:this.houseInfo.building_number,
          expire_year:this.houseInfo.expire_year,
          room_number:this.houseInfo.room_number,
          area:this.houseInfo.area,
          //house_layout:this.houseInfo.house_layout,
          //rent_type:this.houseInfo.rent_type,
          //rent_price:this.houseInfo.rent_price,
          //deposit:this.houseInfo.deposit,
          //pay_style:this.houseInfo.pay_style,
          //trim_status:this.houseInfo.trim_status,
          house_desc:this.houseInfo.house_desc,
          house_img:JSON.stringify(this.houseInfo.house_img),
          certifi_info:this.houseInfo.certifi_info,
          cardimg1:this.houseInfo.cardimg1,
          cardimg2:this.houseInfo.cardimg2,
          added_service_id:JSON.stringify(this.houseInfo.added_service_id),
          //house_number:this.houseInfo.house_number
        };
       
        this.$http.post(this.$store.state.global.baseUrl + 'entrust/submit_entrust', param).then(res => {
          //debugger
          console.log(res.data)
          if(res.status == 200) {
            if(res.data.code == 200){
              // 记录上传后返回的house_id和sum_price
              console.log(res.data.data)
              that.house_id = res.data.data.house_id;// 支付时需要
              that.sum_price = res.data.data.sum_price;// 支付时需要
              that.safe_package = res.data.data.safe_package;// 支付时需要
              // 弹出支付确认框
              that.showConfirm = true;
              that.clickif=false;
            }else{
              that.$toast(res.data.msg);
              that.clickif=false;
            }
          }else{
            that.$toast('提交房源确认信息失败！');
            that.clickif=false;
            return;
          }
        });
        
        // debugger
        // this.totalPay = this.$math.format(this.$math.chain(this.$math.bignumber(this.houseInfo.totalAddPrice)).add(this.$math.bignumber(this.houseInfo.rent_price)).done());
      },
      // 检查支付
      checkPay(){
        //debugger
        var that = this;
        let param = {
          api_token: this.$store.state.global.api_token,
          sum_price: this.sum_price,
          house_id: this.house_id
        };
//         let param = {
//           api_token: 'lKSyjcUcZmYfLtXJiryaJUhMBqjJ4Th955rK8bLx6nNiMQ7J8cnD6ADpjMPlPRBFPJOoXMG2zxDhSk0Ra6dyfDREwECZWlw1zbkg',
//           sum_price: this.sum_price,
//           house_id: 10
//         };
        this.$http.post(this.$store.state.global.baseUrl + 'entrust/pay_entrust', param).then(res => {
          //debugger
          console.log(res.data)
          if(res.status == 200) {
            if(res.data.code == 200){
              if(res.data.is_pay == 1){// 需要支付
                if (typeof WeixinJSBridge == "undefined"){
                   if( document.addEventListener ){
                       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                   }else if (document.attachEvent){
                       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                   }
                }else{
                   that.onBridgeReady(res.data.data);
                }
//                 WeixinJSBridge.invoke(
//                     'getBrandWCPayRequest', res.data.data,
//                     function(res){
//                       debugger
//                       if(res.err_msg == "get_brand_wcpay_request:ok" ){
//                         // 使用以上方式判断前端返回,微信团队郑重提示：
//                         //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
//                         // that.showContract  = true;
//                         // 去vivi的签约页
//                         that.roHouseContact(that.house_id);
//                       }
//                     }
//                 );
              }else if(res.data.is_pay == 0){// 不需要支付，直接去签约
                // that.showContract  = true;
                // 去vivi的签约页
                that.roHouseContact(that.house_id);
              }
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('请求支付失败！');
            return;
          }
        });
      },
      onBridgeReady(params){
        var that = this;
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', params,
            function(res){
              //debugger
              if(res.err_msg == "get_brand_wcpay_request:ok" ){
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                // that.showContract  = true;
                that.$toast("支付成功，去签约");
                // 去vivi的签约页
                that.roHouseContact(that.house_id);
              }
            }
        );
      },
      roHouseContact(houseId){
        this.$store.state.locale.houseId = houseId;
         sessionStorage.setItem("locale_house",houseId);
        console.log(this.$store.state.locale.houseId)
        this.$router.push({path : '/HouseContact'});
      },
      closeContract(){
        this.showContract = false;
        this.showSignatureImg = false;
      },
      // 合同生成
      generateContract(){
        var that = this;
        this.generateContractBtn = false;// 隐藏生成合同按钮
        window.pageYOffset = 0;
        document.documentElement.scrollTop = 0;
        document.querySelector('#pdfDom').scrollTop = 0;
        document.body.scrollTop = 0;
        console.log("合同生成....")
        //debugger
        var title = this.htmlTitle;
        this.$html2Canvas(document.querySelector('#pdfDom'), {
          allowTaint: true,
          useCORS: true
        }).then(function(canvas) {
    //debugger
//           let contentWidth = canvas.width;
//           let contentHeight = canvas.height;
//           //一页pdf显示html页面生成的canvas高度;
//           let pageHeight = contentWidth / 592.28 * 841.89;
//           //未生成pdf的html页面高度
//           let leftHeight = contentHeight;
//           let position = 0;
//           let imgWidth = 595.28;
//           let imgHeight = 592.28 / contentWidth * contentHeight;
//           let pageData = canvas.toDataURL('image/JPEG', 1.0);  //压缩的base64，PDF文件
//           let PDF = new JsPDF('', 'pt', 'a4');
//           // PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, leftHeight);
//           if (leftHeight < pageHeight) {
//             PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
//           } else {
//             while (leftHeight > 0) {
//               PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
//               leftHeight -= pageHeight
//               position -= 841.89
//               if (leftHeight > 0) {
//                 PDF.addPage()
//               }
//             }
//           }
//           console.log(pageData)  //（获取压缩的PDF文件图片数据）
//           PDF.save(title + '.pdf') //导出PDF文件（导出PDF需要用这个）
            var contentWidth = canvas.width;
            var contentHeight = canvas.height;

            var pageData = canvas.toDataURL('image/jpeg', 1);

            var pdfWidth = (contentWidth + 10) / 2 * 0.75;
            var pdfHeight = (contentHeight + 200) / 2 * 0.75; // 500为底部留白

            var imgWidth = pdfWidth;
            var imgHeight = (contentHeight / 2 * 0.75); //内容图片这里不需要留白的距离

            var pdf = new JsPDF('', 'pt', [pdfWidth, pdfHeight]);
            pdf.addImage(pageData, 'jpeg', 0, 0, imgWidth, imgHeight);
            pdf.save(title + '.pdf');
            //debugger
            // var datauri = pdf.output('dataurlstring');
            //调用
            var blob = that.dataURLtoBlob(pageData);
            var file = that.blobToFile(blob, "contract_path_file");
            let param = new FormData();
            param.append("api_token",that.$store.state.global.api_token);
            param.append("house_id",that.house_id);
            // param.append("house_id",90);
            param.append("contract_path",file);
            let config = {
              headers:{'Content-Type':'multipart/form-data'}
            }; 
            that.$http.post(that.$store.state.global.baseUrl + 'entrust/signing', param, config).then(res => {
              //debugger
              if(res.status == 200) {
                if(res.data.code == 200){
                  console.log("合同上传成功！");
                  // that.$toast("恭喜您！您的房源已上架推广，同时会有工作人员联系您实地查勘。");
                  // 跳转到
                  that.$router.push({path : '/confirmSuccess'});
                }else{
                  that.$toast(res.data.msg);
                }
              }else{
                console.log("合同上传失败！");
                that.$toast("合同上传失败！");
                return;
              }
            });
            
            // pdf.save(title + '.pdf');
            
            
        })
      },
      dataURLtoBlob: function(dataurl) { 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
      },
      //将blob转换为file
      blobToFile: function(theBlob, fileName){
         theBlob.lastModifiedDate = new Date();
         theBlob.name = fileName;
         return theBlob;
      },
      // 添加绘制 line
      draw() {
        // debugger
        if(!this.$refs.signHandle){
          return
        }
        /* document.addEventListener('touchmove', e => e.preventDefault(), {
          passive: false
        }) */
        this.el = this.$refs.signHandle
        this.initCanvas()
      },
      // 初始化canvas配置
      initCanvas() {
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
        this.el.width = this.el.offsetParent.clientWidth * 0.98;
        // this.el.height = 250;
        let width = this.el.clientWidth;
        let height = this.el.clientHeight;
        
        // 设置背景色:白色
        this.ctx.fillStyle="#ffffff";
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
        this.signatureImg = imgBase64;
        console.log('保存签名成功' + imgBase64)
        this.showSignature = false;
        this.showSignatureImg = true;
        this.generateContractBtn = true;
      },
    }
  }
</script>

<style scoped lang="less">
  .house-confirm{
    background-color: #F5F5F5;
    overflow: hidden;
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
    width: 101%;
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
  .info-card{
    width: 90%;
    height: 3rem;
    margin: 0.625rem auto;
    background-color: white;
    border-radius: 0.3125rem;
    box-shadow: 0.1875rem #F4ECE4;
    padding-top: 0.5rem;
  }
  .info-card .title{
    font-size: 0.6rem;
    font-weight: bold;
    text-align: left;
    text-indent: 0.5rem;
  }
  .info-card .area{
    font-size: 0.4rem;
    text-align: left;
    text-indent: 0.5rem;
    
  }
  .info-card .price{
    width: 50%;
    display: inline-block;
    float: left;
    color: #F8B729;
    font-size: 0.6rem;
    line-height: 2rem;
    text-align: left;
    text-indent: 0.5rem;
  }
  .info-card .price span{
    font-size: 0.3rem;
  }
  .info-card .add{
    width: 50%;
    display: inline-block;
    line-height: 2rem;
    text-align: left;
    text-indent: 0.5rem;
  }
  .data-form{
    width: 90%;
    margin: 0 auto;
  }
  .data-form .van-cell{
    padding: 0.2rem 0;
    background-color: #F5F5F5;
  }
  /deep/textarea{
    background-color: white;
    border-radius: 0.3125rem;
  }
  .data-form .title{
    width: 100%;
    font-size: 0.5rem;
    text-align: left;
    line-height: 1rem;
    color: black;
  }
  .data-form .label{
    text-align: left;
    font-size: 0.3125rem;
    line-height: 0.8rem;
  }
  .data-form .img{
    overflow: hidden;
    border-radius: 0.3125rem;
  }
  .add-serv{
    width: 100%;
    color: #F8B729;
    font-size:0.35rem;
  }
  .add-serv span{
    color: #777;
  }
  .add-service{
    width: 100%;
  }
  .add-service-item{
    width: 95%;
    line-height: 1rem;
    font-size: 0.3125rem;
    margin: 0 auto;
  }
  .add-service-item .name{
    width: 49%;
    display: inline-block;
    text-align: left;
  }
  .add-service-item .price{
    width: 49%;
    display: inline-block;
    text-align: right;
  }
  /deep/p{
    margin-block-start: 0.2em;
    margin-block-end: 0.2em;
  }
  /deep/h3{
    margin-block-start: 0.2em;
    margin-block-end: 0.2em;
  }
  .van-nav-bar__title{
    color: #F8B729;
  }
  .signature-area{
    width: 90%;
    height: 1.6rem;
  }
  .logo-parent{
    position: relative;
  }
  .mihua-logo{
    position: absolute;
    width: 4rem;
    height: 4rem;
    bottom: -0.5rem;
    right: -0.5rem;
    background-image: url("../../assets/img/entrust/mihua-logo.png");
    background-repeat: no-repeat;
    background-size: cover; 
  }
  /deep/.van-picker__cancel, /deep/.van-picker__confirm{
    color: #F8B729;
  }
  /deep/.van-cell{
    font-size:0.4rem;
  }
</style>