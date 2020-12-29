<template>
  <div class="to-entrust">
    <!-- <HeaderBar></HeaderBar> -->
    <div class="main">
      <!-- <div style="width: 100%;height: 1.2rem;"></div> -->
      <van-notice-bar  text="温馨提示：请认真填写，房屋信息不全将延长租出时间" :left-icon="noticeIcon" />
      <!-- <div style="color: red;">*温馨提示：请认真填写，房屋信息不全将延长租出时间</div> -->
      <div class="data-form">
        <div class="title">基本信息</div>
        <van-form >
          <van-field readonly clickable :value="houseInfo.house_position" label="*所属区域:" placeholder="点击选择省市区" @click="showHousePosition = true"  label-width="2rem"  />
          <van-popup v-model="showHousePosition" position="bottom">
            <van-area :area-list="areaList" title="选择省市区" @confirm="confirmArea" @cancel="showHousePosition = false" />
          </van-popup>
          
          <!-- <van-field v-model="houseInfo.house_number" label="产权编号:" placeholder="请输入产权编号"
            :rules="[{ validator, message: '请不要输入数字和英文字母' }]"/> -->
          
          <van-field v-model="houseInfo.garden_name" label="*小区名称:" label-width="2rem"  placeholder="请输入小区名称" />
          <van-cell>
            <van-col span="12">
              <van-field v-model="houseInfo.building_number" label="*楼栋号:" label-width="2rem"  placeholder="楼栋号" />
            </van-col>
            <van-col span="12">
              <van-field v-model="houseInfo.room_number" label="*房号:" label-width="1.2rem"  placeholder="房号" />
            </van-col>
          </van-cell>
          <van-cell>
            <van-col span="12">
              <van-field v-model="houseInfo.area" label="*面积(㎡):"  label-width="2rem" placeholder="房间面积"  type="number" />
            </van-col>
            <van-col span="12">
              <van-field readonly clickable name="houseInfo.house_layout" :value="houseInfo.house_layout" label="*户型:" placeholder="户型" @click="showHouseLayout = true" label-width="1.2rem"  />
              <van-popup class="popup-select" v-model="showHouseLayout" position="bottom" >
                <van-picker show-toolbar title="选择户型" :columns="houseLayouts" @cancel="showHouseLayout = false" @confirm="confirmHouseLayout" />
              </van-popup>
            </van-col>
          </van-cell>
          <!-- <van-field readonly clickable :value="valueRentType" label="*类型" placeholder="点击房屋类型" @click="showRentType = true" />
          <van-popup v-model="showRentType" position="bottom">
            <van-picker show-toolbar :columns="rentTypeDesc" @confirm="confirmRentType" @cancel="showRentType = false" />
          </van-popup>
          
          <van-field v-model="houseInfo.rent_price" label="*租金:" placeholder="请输入租金"  type="number"/>
          <van-field v-model="houseInfo.deposit" label="*押金:" placeholder="请输入押金"  type="number"/>
          <van-field readonly clickable :value="valuePayStyle" label="*付款方式" placeholder="点击选择付款方式" @click="showPayStyle = true" />
          <van-popup v-model="showPayStyle" position="bottom">
            <van-picker show-toolbar :columns="payStyleDesc" @confirm="confirmPayStyle" @cancel="showPayStyle = false" />
          </van-popup>
           <van-field readonly clickable :value="valuetrimStatus" label="*装修状态" placeholder="点击选择装修状态" @click="showrtrimStatus = true" />
          <van-popup v-model="showrtrimStatus" position="bottom">
            <van-picker show-toolbar :columns="trimStatusDesc" @confirm="trimStatusChoice" @cancel="showrtrimStatus = false" />
          </van-popup> -->
          <van-field readonly clickable :value="valueExpireYear" label="*委托期限" placeholder="点击选择委托期限" @click="showExpireYear = true"   label-width="2rem"/>
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
        <div class="label">*身份证正面照片(与产权人一致)：</div>
        <div class="id-front">          
          <!-- <van-uploader :after-read="uploadCardFront" :max-count="1">
              <img :src="CardFront" ref="goodsImg_1" />
          </van-uploader>  -->
          <img :src="CardFront" @click="changeImg('img_1')" ref="goodsImg_1" />
          <div class="card-tips" v-if="cardTips_1">
             <p>图片正在上传请稍等......</p>
          </div>            
        </div>
        <div class="label">*身份证反面照片(与产权人一致)：</div>
          <div class="id-front">          
          <!-- <van-uploader :after-read="uploadCardBack" :max-count="1">
              <img :src="CardBack" ref="goodsImg_2" />
          </!-->
           <img :src="CardBack" @click="changeImg('img_2')" ref="goodsImg_2" />
          <div class="card-tips" v-if="cardTips_2">
             <p>图片正在上传请稍等......</p>
          </div>          
        </div>
        <div class="label">*房产证或产权合同照片：</div>
        <div class="id-front">          
          <!-- <van-uploader :after-read="uploadCertificate" :max-count="1">
              <img :src="CardcertifiInfo" ref="goodsImg_3" />
          </van-uploader>   -->
          <img :src="CardcertifiInfo" @click="changeImg('img_3')" ref="goodsImg_3" />
          <div class="card-tips" v-if="cardTips_3">
             <p>图片正在上传请稍等......</p>
          </div>         
        </div>
        <div class="label">*房屋照片<span style="color: #acabab;">（*限8张)</span></div>
        <div class="ver-code-bottom-one-right-code">            
            <div class="ver-code-bottom-one-right-code manyPic">
              <div class="posting-uploader-item" v-for="(item,index) in houseInfo.house_img" :key="index">
                <van-image :src="item" width="2.5rem" height="2.5rem" fit="contain"  alt="图片" class="imgPreview" />
                <van-icon name="close" @click="delImg(index)" class="delte"/>                  
              </div>
              <div class="imgTips" v-if="cardTips_4">                 
                  {{showTipsTxt}}
                </div>
                <div class="manyImgBtn" @click="changeImg('img_4')">
                  <van-icon name="plus" />
                </div>
              <!-- <van-uploader :after-read="afterReadHouseImg" multiple :max-count="8" /> -->
            </div> 
        </div>
        <van-divider />
        <div style="text-align: left;font-size: 0.5rem;color: #323233;text-indent: 0.45rem;margin: 0.3rem 0;">
          增值服务<span style="font-size: 0.3rem;color: #acabab;">(*自愿选取)</span>
          <div class="ques-icon"  @click="showserver"></div>
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
        <div style="color: #acabab;">*管理服务费从委托合同签约成功起生效，平台将提供对应价格的服务，服务费从房屋出租的租金中扣除</div>
        <van-button style="margin: 0.625rem auto;width: 95%;border-radius: 0.3125rem;" type="primary" block color="#F8B729"
          size="small" @click="toConfirm">提交</van-button>
      </div>
    </div>
     <div class="closeBtn" v-if="showServerMain" @click="closeServerMain"><van-icon name="cross" /></div> 
     <van-popup class="pop-contract" v-model="showServerMain"
   style="width:90%; height:85%"  >
       
       
      <!-- <van-nav-bar :left-arrow="false" :fixed="true" border title="委托合同签约">
        <van-icon name="cross" slot="right" color="#F8B729" size="0.5rem" @click="closeContract" />
      </van-nav-bar> -->
      <div style="width: 100%;margin: 0 auto;">
        <div style="width: 90%;margin: 0 auto; font-size:0.35rem">
         
          <h2>爆米花房管家增值服务</h2>          
          <p class="text-align-left" style="text-indent: 0.5rem;">1、<span style="font-weight:bold">1元维修巡查服务：</span><span style="color:#f00">“1元/天·（间）套”（合租房按间计）</span>，提供每月不定期巡查巡检房屋1次，报修后上门勘察、定损及提出解决方案，但维修的人工费和材料费由甲方承担（人为损坏的，协助甲方要求损坏人赔偿）。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">2、<span style="font-weight:bold">5元出租无忧服务：</span><span style="color:#f00">“5元/天·（间）套”（合租房按间计）</span>，提供出租带看、交房和收房服务；退租后保洁服务；各项费用代缴服务；提供每月不定期巡查巡检房屋1次，报修后上门勘察、定损、提出解决方案并承担维修人工费（但材料费和设施设备更换费用由甲方承担，人为损坏的，协助甲方要求损坏人赔偿）；购买该套房的房屋财产保险及租客人身意外伤害保险（受益人为甲方）；协调各方关系与问题处理；代为签署房屋使用过程中所有相关法律文件等。</p>
           <p class="text-align-left" style="text-indent: 0.5rem;">3、<span style="font-weight:bold">出租房安全包——无忧版：</span><span style="color:#f00">“1980元/套”</span>，一包解决出租房屋所有后顾之忧，规避所有隐藏风险。</p>
         <p class="text-align-left" style="text-indent: 0.5rem;">4、<span style="font-weight:bold">出租房安全包——安心版：</span><span style="color:#f00">“1680元/套”</span>，包安装，为只想安装智能门锁的业主提供便捷服务。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">5、<span style="font-weight:bold">太平洋《租房全能险》：</span><span style="color:#f00">“15元/月·套”</span>，以甲方为受益人购买的房屋出租保险，最高可获得36万以上的理赔金。</p>
          <div class="order_list">
          
         <table cellpadding="0" cellspacing="0" >
              <thead>
                <tr>
                  <th width="20%">险种类型</th>
                  <th width="20%">家庭财产保险项目</th>
                  <th width="20%">有效时限财产赔偿限额</th>
                  <th width="40%">保障项目解析</th></tr>
              </thead>
              <tbody>
                <tr> 
                  <td rowspan="5">家庭财产保险</td>
                  <td>房屋主体</td>
                  <td>180000</td>
                  <td>因①、火灾、爆炸造成家庭财产的损失；② 雷击、台风、暴风、暴雨、龙卷风、洪水、雪灾、雹灾、冰凌、泥石流、崖崩、滑坡、地面突然塌陷造成家庭财产的损失；③飞行物体及其他空中运行物体坠落造成家庭财产的损失；④不属于被保险人所有或使用的建筑物、其他固定物体发生倒塌造成家庭财产的损失。保险事故发生后，为抢救保险财产或防止灾害蔓延，采取必要、合理的措施而造成保险财产的损失，及所支付的必要、合理的施救费用，也负责赔偿。</td>
                </tr>
                 <tr>                  
                  <td>室内财产</td>
                  <td>10000</td>
                  <td></td>
                </tr>
                <tr>                  
                  <td>室内装潢</td>
                  <td>30000</td>
                  <td></td>
                </tr>
                <tr>                  
                  <td>附加室内盗抢保险-A</td>
                  <td>5000</td>
                  <td>由于下列原因直接造成保险财产丢失、损毁保险公司负责赔偿：门窗有明显撬窃痕迹的盗窃；有明显翻墙掘壁痕迹的盗窃；入室抢劫。（室内财产盗抢包括家具、厨房用品、床上用品及服装、文体娱乐用品，包括门、窗、外墙、屋顶等房屋围护结构；锁具、报警设备因盗抢受到的损失，但不包括便携式家用电器、手机、相机、现金、金银珠宝等贵重物品。）公安机关立案之日起30天后仍未能追回的，保险公司按约定予以赔偿。</td>
                </tr>
                <tr>                  
                  <td>附加管道爆裂保险</td>
                  <td>10000</td>
                  <td>由于被保险人室内的管道（特指自来水管、暖气管、排水管和排污管）爆裂；或相邻住户室内的管道爆裂、管道渗漏家庭财产的直接损失，保险公司按约定予以赔偿。</td>
                </tr>
                <tr> 
                  <td rowspan="3">家庭责任保险</td>
                  <td>家庭责任保险项目</td>
                  <td>累计及每次赔偿限额</td>
                  <td>保障项目解析</td>
                </tr>
                <tr>                  
                  <td>家庭责任</td>
                  <td>10000</td>
                  <td>被保险人居所发生火灾、爆炸，致使第三者遭受人身伤亡或财产损失，依照法律应由被保险人或其家庭成员承担经济赔偿责任的，保险公司将约定予以赔偿。</td>
                </tr>
                <tr>                  
                  <td>附加管道爆裂渗漏责任保险</td>
                  <td>5000</td>
                  <td>被保险人居所的管道（特指自来水管、暖气管、排水管、排污管）发生爆裂或渗漏，致使第三者遭受财产损失，依照法律应由被保险人或其家庭成员承担经济赔偿责任的，保险公司根据约定赔偿。</td>
                </tr>
                <tr> 
                  <td rowspan="4">意外伤害保险</td>
                  <td>意外险保险项目</td>
                  <td>意外险赔偿限额</td>
                  <td>保障项目解析</td>
                </tr>
                <tr>                  
                  <td>意外伤害及伤残保险金额</td>
                  <td>100000</td>
                  <td  rowspan="3">保险期间内，被保险人在其承租的、且在与房屋租赁公司租赁合同中列明的出租屋内（如出租屋属于住宅小区则在小区范围内，以小区围墙为界）因意外伤害或遭受意外伤害导致身故、残疾或住院治疗的，符合保险条款的理赔事故，保险公司将按约定予以赔偿。</td>
                </tr>                
                <tr>                  
                  <td>意外伤害医疗保险金额</td>
                  <td>10000</td>                  
                </tr>
                <tr>                  
                  <td>意外住院津贴</td>
                  <td>50元/天</td>                  
                </tr>
              </tbody>
         </table>
         </div>
        </div>
      </div>
     
    </van-popup>   
  </div>
</template>

<script>
  // import HeaderBar from '../../components/common/HeaderBar'
  import areaList from '../../assets/js/area.js'
  //import shareApi from '../../common/until'
  export default {
    name: 'HouseInfoInput',
    // components: {HeaderBar},
    data() {
      return {
        noticeIcon: require('../../assets/img/entrust/lingdang.png'),
        value: '',
        showServerMain:false,
        showTips:false,
        showTipsTxt:'正在上传...',
        CardFront:require('../../assets/img/entrust/id-front.png'),
        CardBack:require('../../assets/img/entrust/id-back.png'),
        CardcertifiInfo:require('../../assets/img/entrust/ceri.png'),
        cardTips_1:false,
        cardTips_2:false,
        cardTips_3:false,
        cardTips_4:false,     
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
          trim_status:null,
          trimStatusDesc:null,
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
        rentTypeDesc: ['整租', '合租'],
        // 装修状态       
        showrtrimStatus: false,
        valuetrimStatus: '',
        trimStatusDesc: ['毛胚', '简装', '精装', '豪装'],
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
      this.share();
    },
    methods: {
      share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
       closeServerMain(){
         //console.log("a");
         this.showServerMain=false;
       },
      init(){
        document.title = '房源信息录入';
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
      //装修状态选择
       trimStatusChoice(value,index) {
        this.valuetrimStatus = value;
        this.houseInfo.trim_status = index + 1;
        this.houseInfo.trimStatusDesc = value;
        this.showrtrimStatus = false;
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
      changeImg(imgsrc){
         let that=this;
         let len=that.houseInfo.house_img.length;
         if(that.cardTips_4){
           len=len+1;
         }
         if(imgsrc=="img_4" && that.houseInfo.house_img && len>=8){
          that.$toast('最多只能上传8张图！');
           return ;
        }
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
                      that.houseInfo.cardimg1 =src;
                      that.$refs.goodsImg_1.src=src;
                      that.cardTips_1=false;
                    }else if(imgsrc=="img_2"){
                      that.houseInfo.cardimg2=src;
                      that.$refs.goodsImg_2.src=src;
                      that.cardTips_2=false;
                    }else if(imgsrc=="img_3"){
                      that.houseInfo.certifi_info=src;
                      that.$refs.goodsImg_3.src=src;
                      that.cardTips_3=false;
                    }else if(imgsrc=="img_4"){
                      that.houseInfo.house_img.push(src);                      
                      that.cardTips_4=false;
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
          }else if(imgsrc=="img_4"){                      
            that.cardTips_4=false;
          }
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
              //debugger
              for(let b = 0; b < checkboxs.length; b++){
                if(checkboxs[b].value == exclusionIds[a]){// 当前item对应的mutexid解禁
                  checkboxs[b].disabled = false;
                  indexArr.push(b);
                }
              }
            }
          }
          // 但还需检查其他item
          //debugger
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
      //增值服务
      showserver(){
        this.showServerMain=true;
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
        // console.log(this.houseInfo.rentTypeDesc)
        // if(!this.houseInfo.rentTypeDesc){
        //   this.$toast("必须选择类型");
        //   return;
        // }
        // if(!this.houseInfo.rent_price){
        //   this.$toast("请输入租金");
        //   return;
        // } 
        // if(!/^\d+(\.\d{0,2})?$/.test(this.houseInfo.rent_price)){
        //   this.$toast("租金只能是数字");
        //   return;
        // }
        // if(!this.houseInfo.deposit){
        //   this.$toast("请输入押金");
        //   return;
        // }
        // if(!/^\d+(\.\d{0,2})?$/.test(this.houseInfo.deposit)){
        //   this.$toast("押金只能是数字");
        //   return;
        // }
        // if(!this.houseInfo.pay_style){
        //   this.$toast("请选择付款方式");
        //   return;
        // }
        // if(!this.houseInfo.trim_status){
        //   this.$toast("请选择装修状态");
        //   return;
        // }
        
        // if(!this.houseInfo.house_desc){
        //   this.$toast("请输入房源描述");
        //   return;
        // }
        if(!this.houseInfo.expire_year){
          this.$toast("请选择委托时间");
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
  /deep/.label{
    text-align: left;
    text-indent: 0.45rem;
    color: #323233;
    font-size:0.4rem;
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

  .id-front{
    width: 8.75rem;
    // height: 5rem;
    // background-image: url("../../assets/img/entrust/id-front.png");
    // background-repeat: no-repeat;
    // background-size: cover; 
    margin:0.2rem auto;
    position:relative;
  }
  .pic-area .id-front img{
    width:100%
  }
  .id-front /deep/.van-uploader__upload-icon{
    display: none;
  }
  .id-back /deep/.van-uploader__upload{
    width: 8.75rem;
    height: 5rem;
    background-image: url("../../assets/img/entrust/id-back.png");
    background-repeat: no-repeat;
    background-size: cover; 
  }
  .id-back /deep/.van-uploader__upload-icon{
    display: none;
  }
  /deep/.van-col .van-cell.van-field{
    padding:0;
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
    width:0.5rem;
    height:0.5rem;
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
  /deep/.van-popup__close-icon{
    color: #000;
    border: 1px solid #000;
    border-radius: 50%;
    padding: 0.05rem;
  }
  .pic-area{
    width: 95%;
    margin: 0 auto;
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
.closeBtn{
  position:fixed; 
  top:0.2rem;
  right:0.2rem;
  width:0.75rem;
   height:0.75rem;
    color:#fff; 
    font-size:0.6rem; 
    z-index:9999;
    border: 0.04rem solid #fff; 
    border-radius: 50%; 
    line-height:0.75rem;
      .van-icon{
        vertical-align:middle;
      }
    }
  .pic-area img{width:85%; margin-bottom:0.5rem; height:100%;}
  .listConter img{width:22%;margin:2.5rem auto 0.4rem auto;}
  .tips{text-align: center; color:#666; font-size: 0.5rem;}
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
  /deep/.posting-uploader-item{
    position:relative;
    float:left;
    width:2.5rem;
    height:2.5rem;
    overflow: hidden;
    margin-right:0.2rem;
  }
  .manyPic{
    width:90%;
    margin:0 auto;
    // min-height:2.5rem;
    margin-top:0.25rem;
    display: block;
    overflow: hidden;
  }
  .manyPic::after{
    contain: "";
     display: block;
     height: 0;
     clear: both;
     visibility: hidden;
  }
  .order_list{padding-bottom: 1rem; box-sizing: border-box;}
 .order_list>table{border:1px solid #ccc; width: 100%;}
  .order_list th,.order_list td{border:1px solid #ccc; padding:0.05rem;}
  .order_list td.tableCols{border:0 none; padding:0;}
  .card-tips{position:absolute;left:0; top:0; bottom:0; width:100%; background:rgba(0, 0, 0, 0.2); display:flex;align-items: center;
    justify-content: center; color: #000; box-sizing:border-box; padding:0.5rem;}
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
