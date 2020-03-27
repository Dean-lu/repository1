<template>
<div class="main">
    <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" />
    <div id="contactMain">    
        <h1>委托出租服务协议</h1>
        <div>
            <p>委托方（甲方）：<input type="text" v-model="contact.name" class="long" v-bind:disabled="diasabledInput"/></p>
            <p>受托方（乙方）：湖南米花寓公寓管理有限公司</p>
        </div>        
        <div>
             <p>甲、乙双方根据《中华人民共和国合同法》等相关法律的规定，在平等、自愿的原则上，就甲方将房屋委托乙方独家出租事宜，协商一致签定本协议。</p>
        </div>
        <div class="housePosition">
            <h2>一、房屋位置与产权人</h2>
            <p>
                1、房屋具体位置：<input class="long" v-model="contact.house_position" type="text" v-bind:disabled="diasabledInput"/><br/>
                2、房号：<input type="text" v-model="contact.building_number"  class="small" v-bind:disabled="diasabledInput"/>栋<input type="text" v-model="contact.room_number" class="small" v-bind:disabled="diasabledInput"/>号<br/>
                3、房屋面积:<input v-model="contact.area"  class="long" type="text" v-bind:disabled="diasabledInput"/> <br/>
                4、房屋户型：<input class="long" v-model="contact.house_layout" type="text" v-bind:disabled="diasabledInput"/> <br/>
                5、房屋产权人姓名：（甲方须与产权人一致）：<input v-model="contact.certifi_name" class="small" type="text" v-bind:disabled="diasabledInput"/> <br/>
                6、产权人身份证号：<input v-model="contact.certifi_id"  class="card" type="text" v-bind:disabled="diasabledInput"/> <br/>             
                7、房屋产权证号：<input v-model="contact.certifi_info"  class="long" type="text" v-bind:disabled="diasabledInput"/> 
            </p>            
        </div>
        <h2>二、委托期<input  class="small" v-model="contact.contactYear" type="text" v-bind:disabled="diasabledInput"/>年，自本协议签署后开始计算。</h2>
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
            <p>（五）甲方选择下列第<input v-model="contact.choiceServe" class="small" type="text" v-bind:disabled="diasabledInput"/>项由乙方提供的租后服务：</p>
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
            <div>
                委托方（甲方）:  <input  type="text" v-bind:disabled="diasabledInput"/><br/>
                身份证号： <input  type="text" v-bind:disabled="diasabledInput"/><br/>
                电话:  <input  type="text" v-bind:disabled="diasabledInput"/>  <br/>              
            </div>
            <div>
                受托方（乙方）: 湖南米花寓公寓管理有限公司<br/>
                签约代表： <input  type="text" v-bind:disabled="diasabledInput"/><br/>
                电话:  <input  type="text" v-bind:disabled="diasabledInput"/>    <br/>            
            </div>
            <p>时间：<input type="text" class="small" /> 年<input type="text" class="small" /> 
            月<input type="text" class="small" />  日</p>
        </div>
        <button @click="submitList" class="btnOrange">提交房屋清单</button>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            title:'合同详情',
            diasabledInput:true,
            contact:{
                name:"李房东",
                house_position: "长沙市岳麓区大学城",
                garden_name: "麓谷明珠",
                building_number: "2",
                room_number: "1201",
                area: "60.00",
                house_layout: "两室一厅",
                certifi_name:"李房东",
                certifi_id:"123456789098765543",
                certifi_info:"334556567",
                contactYear:'4',
                choiceServe:"1"
            }
        }
    },
    mounted(){

    },
    methods:{
        submitList(){           
            this.$router.push({path : '/HouseBag'});
        },
        onClickLeft() {
            this.$router.back(-1);
        }
    }
}
</script>
<style  scoped lang="less">
#contactMain{
    text-align: left;
    width:90%;
    margin:0 auto;
    line-height:0.5rem;
    font-size:0.3rem;
    padding-top:1.25rem;
    box-sizing:border-box;
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
    .housesign input{
        border-bottom:0 none;
        text-align:left;        
    }
    input{
        border:0 none;
        border-bottom:1px solid #f00;
        text-align: center;
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
    input.long{
        width: 3.5rem;
    }
    input.card{
        width: 4rem;
    }
    .btnOrange{
        width:60%;
        margin:0 auto 0.8rem auto;
        color:#fff;
        border:0 none;
        background: #f7b343;
        line-height:0.8rem;
        border-radius: 0.2rem;
        display: block;
    }
}

</style>