<template>
<div class="main">
    <!-- <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" /> -->
    <div id="contactMain" ref="contactMain">    
        <h1>委托出租服务协议</h1>
        <div>
            <p>委托方（甲方）：<span>{{contact.name}}</span></p>
            <p>受托方（乙方）：湖南米花寓公寓管理有限公司</p>
        </div>        
        <div>
             <p>甲、乙双方根据《中华人民共和国合同法》等相关法律的规定，在平等、自愿的原则上，就甲方将房屋委托乙方独家出租事宜，协商一致签定本协议。</p>
        </div>
        <div class="housePosition">
            <h2>一、房屋位置与产权人</h2>
            <p>
                1、房屋具体位置：<span>{{contact.house_position}}{{contact.garden_name}}</span><br/>
                2、房号：<span>{{contact.building_number}}</span>栋<span>{{contact.room_number}}</span>号<br/>
                3、房屋面积:<span>{{contact.area}}㎡</span> <br/>
                4、房屋户型：<span>{{contact.house_layout}}</span> <br/>
                5、房屋产权人姓名：（甲方须与产权人一致）：<span>{{contact.name}}</span><br/>
                6、产权人身份证号：<span>{{contact.idcardcode}}</span><br/>             
                7、房屋产权证号：<span>{{contact.house_number}}</span>
            </p>            
        </div>
        <h2>二、委托期<span>{{contact.expire_year}}</span>年，自本协议签署后开始计算。</h2>
        <div class="houseNotice">
            <h2>三、委托事项：</h2>
            <p>
                （一）甲方将房屋委托乙方独家出租并由乙方提供免费出租服务，免费出租服务具体包括房屋拍照、上架推广、出租带看、出租签约、租金押金代收费的收付等，不包含设施设备维修、保洁、带看交房与退租收房、各项费用缴纳及各项问题处理、财产保险与人身意外伤害保险等租后服务内容，由甲方全部承担房屋出租过程中出现的各类事故，对此乙方不承担任何责任。<br/>
                （二）甲方独家授权乙方作为出租人与租客签署《房屋使用合同》（按乙方提供版本），由乙方收取租金（在《房屋使用合同》里指“房屋使用费”，不包含代收费、服务费等其他费用）、押金。其中租金到乙方账上后、由甲方上乙方线上平台系统业主端次日提取，押金则由乙方负责收取、保管、退还及处置等事宜。
                <br/>
                （三）本协议签订后，由乙方出租该房屋的，乙方免收甲方出租居间费；非乙方（包含甲方本人或甲方委托中介及朋友）租出且租客与乙方签署《房屋使用合同》并向乙方交纳押金、租金及相关代收和服务费用的，由乙方补贴甲方出租居间费，出租居间费补贴标准：租期满1年的，补贴月租金的50%；租期为6个月（含）以上1年以下的，补贴月租金的25%；其他租期的（一个月以上），补贴月租金的10%。
                <br/>
                （四）房屋首次租出、签约《房屋使用合同》后，由甲方、乙方和租客3方签署《房屋交接单》，办理房屋交接；退租收房由甲方委托乙方办理、以后租出时由乙方直接办理房屋交接。
                <br/>                
            </p>
            <p>（五）甲方选择下列第1项由乙方提供的租后服务：</p>
            <p>
                1、“1元/天·（间）套”（合租房按间计）维修巡查服务——提供每月不定期巡查巡检房屋1次，报修后上门勘察、定损及提出解决方案，但维修的人工费和材料费由甲方承担（人为损坏的，协助甲方要求损坏人赔偿）。<br/>
                2、“5元/天·（间）套”（合租房按间计）维修及租后服务——提供出租带看、交房和收房服务；退租后保洁服务；各项费用代缴服务；提供每月不定期巡查巡检房屋1次，报修后上门勘察、定损、提出解决方案并承担维修人工费（但材料费和设施设备更换费用由甲方承担，人为损坏的，协助甲方要求损坏人赔偿）；购买该套房的房屋财产保险及租客人身意外伤害保险（受益人为甲方）；协调各方关系与问题处理；代为签署房屋使用过程中所有相关法律文件等。<br/>
                3、购买1980元/套“出租房安全包”——密码锁1把、网关1个、消防箱1座、灭火器1个、无线烟感器1座、逃生绳1把、防毒面具2个、太平洋《租房全能险》1份、出租警示标语17份。（注：不要密码锁的，为1480元/套）<br/>
                 4、购买“15元/月·套的太平洋《租房全能险》”——以甲方为受益人购买的房屋出租保险。
            </p>
            <p>（六）甲方不选择乙方任何租后服务、而自行提供服务的，须在接收到服务通知的1小时内响应，24小时内解决问题（重大问题不能及时解决的除外）；否则视为甲方默认接受由乙方提供的租后服务，由乙方服务团队解决问题，并完全同意按照乙方的服务项目收费标准向乙方支付所有费用（如租金足够，则可从租金中抵扣）。</p>            
        </div>  
        <div>
            <h2>四、违约责任：</h2>
            <p>
                （一）委托期内，甲方不得提前解约，否则甲方应双倍退还乙方以往已支付过的所有出租居间费、退还已收但未发生的租金，承担应支付给租客提前解约的违约金。<br/>
                （二）委托期内，乙方不得提前解约或者不支付符合条件的中介费，否则乙方向甲方双倍支付月租金的50%作为违约金（已支付的出租居间费可抵违约金）。
            </p>
        </div>
        <div>
            <h2>五、其它：</h2>
            <p>
                本协议一式两份，经甲乙双方签章后生效，具有同等法律效力。本协议未尽事宜，可由双方另行协商签订补充协议。
            </p>
        </div>
        <div class="housesign">           
            <div style="width: 100%;min-height: 2rem;">
            <van-col span="12">
              <div class="text-align-left">委托方（甲方）: </div>
              <div class="text-align-left signature-area">
                <van-image v-show="showSignatureImg" :src="signatureImg" />
              </div>
              <div class="text-align-left">身份证号：{{contact.idcardcode}}</div>
              <div class="text-align-left">电话：{{contact.telphone}}</div>
            </van-col>
            <van-col class="logo-parent" span="12">
              <div class="text-align-left">受托方（乙方）: </div>
              <div class="text-align-left" style="text-indent: 0.2rem;line-height: 1.6rem;">湖南米花寓公寓管理有限公司</div>
              <div class="text-align-left">签约代表：</div>
              <div class="text-align-left">电话：</div>
              <div class="mihua-logo"></div>
            </van-col>
          </div>
            <p>时间：<span>{{contact.date}}</span></p>
        </div>
        <div style="width: 100%;height: 0.5rem;"></div>
    </div>
    <div class="buttons">
        <button @click="showSign" v-if="signbtn=='sign'" class="btnOrange">打开签名版</button>
        <button @click="submitSign" v-if="signbtn=='submit' && generateContractBtn" class="btnOrange">提交合同</button>
    </div>
    <van-action-sheet disable-scroll v-model="showSignature" :round="false" title="电子签名" :close-on-click-overlay="false">
        <div class="cavas">
          <canvas :disable-scroll="true" ref="signHandle" class="canvas" id="canvas" />
      </div>
      <div class="cancvas-btn">
        <van-button size="mini" @touchstart="clearHandle">清空</van-button>
        <van-button type="info" color="#F8B729" size="mini" @touchstart="saveImg">确认</van-button>
      </div>
    </van-action-sheet>
    <van-dialog v-model="showSuc" confirmButtonColor="#F8B729" :beforeClose="signSuc">
      <div class="listConter">
        <img class="face" src="data:image/png;base64,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" alt="">
             <p class="tips">恭喜您！签约成功<br/>
              您的委托已经提交，工作人员将联系您实地勘查房源，审核通过后即可免费上架推广出租
             </p>
      </div>
    </van-dialog>
    <van-popup v-model="tipsshow" :close-on-click-overlay="false">
        <div style="padding:2rem 1rem">正在保存信息,请耐心等待.....</div>
    </van-popup>
</div>
</template>
<script>
import html2Canvas from 'html2canvas' ;
import Vue from 'vue'; 
import JsPDF from 'jspdf';
//import shareApi from '../../../common/until'
export default {
    data(){
        return {
            title:'委托房屋合同签约',
            tipsshow:false,
            diasabledInput:true,
            showSignature:false,
            signbtn:"sign",
            signatureImg:"",
            showSignatureImg:false,
            status:'start',
            htmlTitle: '委托出租服务协议',
            generateContractBtn: false,
            contact:{
               
            },
            showSuc: false,
            signTest:true
        }
    },
    mounted(){
        document.title = "委托房屋合同签约";
        this.init();
        this.share();
    },    
    updated () {
      if(this.signTest){
        this.draw();
      }
      
    },
    methods:{
      share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
        submitList(){           
            this.$router.push({path : '/HouseBag'});
        },
        onClickLeft() {
            this.$router.back(-1);
        },
        init(){
            console.log(this.$store.state.locale.houseId)
            //debugger
            // 获取房源详情
            let that = this;
            let param = {
                api_token: this.$store.state.global.api_token,
                house_id: this.$store.state.locale.houseId,
            };
            this.$http.post(this.$store.state.global.baseUrl + 'base/contract_details', param).then(res => {
            //debugger
            if(res.status == 200) {
                if(res.data.code == 200){
                that.contact = res.data.data;
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
            // locale.houseId
        },
        // 签名成功
        signSuc(){
          // this.$router.push({path:'/MyEntrust'});
          this.$router.push({path:'/home'});
        },
        draw() {
        // debugger
        if(!this.$refs.signHandle){
          return
        }
        // document.addEventListener('touchmove', e => e.preventDefault(), {
        //   passive: false
        // })
        this.el = this.$refs.signHandle
        this.initCanvas()
      },
      // 初始化canvas配置
      initCanvas() {
        //debugger
        this.ctx = this.el.getContext('2d')
        
        // 解构设备的宽度, 和 高度
        const { clientWidth, clientHeight } =  document.documentElement
        
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
        //debugger
        this.el.width = this.el.offsetParent.clientWidth * 0.90-2;
       // this.el.height = this.el.offsetParent.clientHeight*0.90-2;
        console.log(this.el.offsetParent.clientHeight)
         this.el.height = 150;
        let width = this.el.clientWidth;
        let height = this.el.clientHeight;
        
        // 设置背景色:白色
        this.ctx.fillStyle="#fff";
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
          //debugger
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
      showSign(){
        this.showSignature=true;
        
      },
      // 保存信息
      saveImg() {       
        const imgBase64 = this.el.toDataURL();
        this.signatureImg=imgBase64;
        this.signbtn="submit";
        this.generateContractBtn = true;
       this.showSignature=false;
        this.showSignatureImg=true;        
        // console.log('保存签名成功' + imgBase64);  
         console.log('保存签名成功')
         this.signTest=false;
        // document.removeEventListener('touchmove', e => e.preventDefault(), {
        //   passive: true
        // })
        
        
      },      
      // 合同生成
      submitSign(){
        var that = this;       
        this.generateContractBtn = false;// 隐藏生成合同按钮
        window.pageYOffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        console.log("合同生成....");
        that.tipsshow=true;
        //debugger
        var title = this.htmlTitle;
        console.log(document.querySelector('#contactMain'));
       // let element=document.getElementById('contactMain');
       let element=that.$refs.contactMain;
       console.log("element")
       console.log(element);
        this.$html2Canvas(element, {
          allowTaint: true,
          useCORS: true
        }).then(function(canvas) {    
            console.log(canvas.width);
             console.log(canvas.height)
            let contentWidth = canvas.width;            
            let contentHeight = canvas.height;
            let pageData = canvas.toDataURL('image/jpeg', 0.4);

            let pdfWidth = (contentWidth + 10) / 2 * 0.75;
            let pdfHeight = (contentHeight + 200) / 2 * 0.75; // 500为底部留白

            let imgWidth = pdfWidth;
            let imgHeight = (contentHeight / 2 * 0.75); //内容图片这里不需要留白的距离

            let pdf = new JsPDF('', 'pt', [pdfWidth, pdfHeight]);
            pdf.addImage(pageData, 'jpeg', 0, 0, imgWidth, imgHeight);
            
            //debugger
            // var datauri = pdf.output('dataurlstring');
            //调用
            var blob = that.dataURLtoBlob(pageData);
            var file = that.blobToFile(blob, "contract_path_file");
            console.log(file);
            let param = new FormData();
            param.append("api_token",that.$store.state.global.api_token);
            // param.append("house_id",that.house_id);
            param.append("house_id",that.$store.state.locale.houseId);
            param.append("contract_path",file);
            let config = {
              headers:{'Content-Type':'multipart/form-data'}
            }; 
            that.$http.post(that.$store.state.global.baseUrl + 'entrust/signing', param, config).then(res => {
              //debugger
              console.log(file);
              if(res.status == 200) {
                if(res.data.code == 200){
                  console.log("合同上传成功！");                  
                  that.showSuc = true;// 弹出上传成功弹框
                  that.tipsshow=false;
                }else{
                  that.$toast(res.data.msg); 
                  that.tipsshow=false;                
                }
              }else{
                console.log("合同上传失败！");
                that.tipsshow=false;
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
      }
     

    }
}
</script>
<style  scoped lang="less">
.main .van-nav-bar .van-icon,
  .main .van-nav-bar__title{
    color:#FFB640;
  }
.main .van-nav-bar{
    border-bottom: .11rem solid #f5f5f5;
  }
.pay_conter{padding-bottom:1rem;}
.cavas{border:1px solid #ccc;width:90%; margin:0.5rem auto;height:4.2rem}
#contactMain{
    text-align: left;
    width:100%;
    margin:0 auto;
    line-height:0.5rem;
    font-size:0.3rem;
    padding:1.25rem 5% 0 5%;
    box-sizing:border-box;
    position:relative;
    overflow-y:auto;
    h1{
        font-size:0.6rem;
        text-align: center;
        padding:0.2rem;
    }
    .housesign::after{
        clear:both;
    }
    .housesign>div{
        padding:0.2rem 0; 
        box-sizing: border-box;
    }
    .housesign>p{
        text-align: right;
        padding:0.2rem 0; 
        box-sizing: border-box;
    }
    .housesign input,.housesign span{
        border-bottom:0 none;
        text-align:left;        
    }
    span,input{
        border:0 none;
        border-bottom:1px solid #f00;
        text-align: center;
        padding:0 0.2rem;
    }
    input[disabled],input:disabled,input.disabled{  
        background: #fff;
        -webkit-text-fill-color:#333;  
        -webkit-opacity:1;  
        opacity: 1;  
    }
    input.small{
        width: 1rem;
    }
    input.center{
        width:2rem;
    }
    input.long{
        width: 3.5rem;
    }
    input.card{
        width: 4rem;
    }
    
}
.buttons .btnOrange{
        width:60%;
        margin:0 auto 0.8rem auto;
        color:#fff;
        border:0 none;
        background: #f7b343;
        line-height:0.8rem;
        border-radius: 0.2rem;
        display: block;
    }
    .listConter{
        margin-bottom: 0.2rem;
    }
    .listConter img{
        width:22%;margin: 0.5rem auto;
    }
    .tips{text-align: center; color:#666; font-size: 0.5rem; width:80%;margin:0 auto;}
    .logo-parent{position:relative;}
    .signature-area{ height:1.6rem;}
    /deep/.signature-area img{height:1.6rem; max-width:100%;}
    .mihua-logo{
    position: absolute;
    width: 4rem;
    height: 4rem;
    bottom: -0.5rem;
    right: -0.5rem;
    background-image: url("../../../assets/img/entrust/mihua-logo.png");
    background-repeat: no-repeat;
    background-size: cover; 
  }
  .cancvas-btn button{
      margin-bottom: 20px;
      font-size: 0.4rem;
      padding: 0 0.4rem;
      line-height: 0.8rem;
      height: 0.8rem;
  }
</style>