<template>
  <div class="confirm-rent">
    <!-- <van-nav-bar
      :title="title"
      left-arrow
      :fixed="true"
      color="#FFB640"
      @click-left="onClickLeft"
    /> -->
    <!-- <div class="division"></div> -->
    <div class="info-title">
      租客信息
    </div>
    <div class="info-detail">
      <span class="span-cell">姓名:{{tenant.truename}}</span>
      <span class="span-cell">电话:{{tenant.telphone}}</span>
      <span class="span-cell">身份证号:{{tenant.idcardcode}}</span>
      <span class="span-cell">起租时间:{{tenant.start_time}}</span>
      <span class="span-cell">租期:{{tenant.rent_time}}</span>
      <!-- <span class="span-cell">期望交房时间:{{tenant.hope_time}}</span> -->
      <span class="span-cell">身份证照片:(*请上传清晰完整照片，否则无法通过审核)</span>
      <div style="width: 100%; height: 0.625rem;"></div>
      <div class="label">正面：</div>
      <div class="id-front">
        <van-field name="idCardFront">
          <template #input>
            <van-uploader v-model="idCardFront" :after-read="uploadCardFront" :max-count="1" />
          </template>
        </van-field>
      </div>
      <div class="label">反面：</div>
      <div class="id-back">
        <van-field name="idCardBack">
          <template #input>
            <van-uploader v-model="idCardBack" :after-read="uploadCardBack" :max-count="1" />
          </template>
        </van-field>
      </div>
      <div class="label">手持：</div>
      <div class="house-cer">
        <van-field name="idCardHand">
          <template #input>
            <van-uploader v-model="idCardHand" :after-read="uploadCardHand" :max-count="1" />
          </template>
        </van-field>
      </div>
    </div>
    <div style="width: 100%; height: 0.625rem;border-bottom: 0.125rem solid #F5F5F5;"></div>
    <div class="info-title">
      房源信息
    </div>
    <div class="info-cell">
      位置:{{houseInfo.house_position}}
    </div>
    <div class="info-cell">
      <span class="span-cell">房型:{{houseInfo.house_layout}}</span>
      <span class="span-cell">面积:{{houseInfo.area}}㎡</span>
    </div>
    <div class="info-cell">
      <span class="span-cell">付款方式:{{houseInfo.pay_style_desc}}</span>
      <span class="span-cell">租金:¥{{houseInfo.rent_price}}</span>
    </div>
    <div class="info-cell">
      <span class="span-cell">押金:¥{{houseInfo.deposit}}</span>
    </div>
    <div class="house-desc">
      <div class="title">
        描述：
      </div>
      <div class="desc-detail">
        {{houseInfo.house_desc}}
      </div>
    </div>
    <div style="width: 100%; height: 0.625rem;border-bottom: 0.125rem solid #F5F5F5;"></div>
    <div class="info-title">
      账单明细
    </div>
    <div class="bill-table">
      <table cellpadding="0" cellspacing="0" >
        <thead>
          <tr>
            <th>次数</th>
            <th>付款时间</th>
            <th>有效时限</th>
            <th>合计</th>
          </tr>
        </thead>
        <tbody v-for="(item,index) in bill" :key="index">
          <tr>
            <td rowspan="2">{{item.times}}</td>
            <td>{{item.pay_time}}</td>
            <td>{{item.validity}}</td>
            <td rowspan="2">{{item.total_price}}</td>
          </tr>
          <tr>
            <td colspan="2">付款金额:{{item.pay_price}}&nbsp;服务费：{{item.service}}&nbsp;保险：{{item.insurance}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="width: 50%;margin: 0.625rem auto;">
      <van-button square type="info" size="large" color="#F8B729" style="border-radius: 0.1875rem;" @click="lookContact">查看合同</van-button>
    </div>
    
    <van-popup class="pop-contract" v-model="showLeaseAgreement" :close-on-click-overlay="false">
      <van-nav-bar left-arrow :fixed="true" color="#FFB640" border title="租赁合同确认" @click-left="showLeaseAgreement = false">
        <!-- <van-icon name="cross" slot="right" color="#F8B729" size="0.5rem" @click="closeContract" /> -->
      </van-nav-bar>
      <div id="pdfDom" style="width: 100%;margin: 0 auto;padding-top: 1rem;overflow: hidden;">
        <div style="width: 90%;margin: 0 auto;">
          <h2>房屋使用合同</h2>
          <p class="text-align-left">出租人（以下简称甲方）：湖南米花寓公寓经营管理有限公司</p>
          <p class="text-align-left">承租人（以下简称乙方）：         
            <span class="text-underline">&nbsp;&nbsp;&nbsp;{{tenant.truename}}&nbsp;&nbsp;&nbsp;
          <br/></span>身份证号码：
            <span class="text-underline">&nbsp;&nbsp;&nbsp;{{tenant.idcardcode}}&nbsp;&nbsp;&nbsp;</span>
            </p>
          
          <p class="text-align-left" style="text-indent: 0.5rem;">根据《中华人民共和国合同法》、《中华人民共和国民事诉讼法》及相关法律法规的规定，甲、乙双方在平等、自愿的基础上，就甲方将房屋给乙方使用事宜，为明确双方权利义务，经协商一致，订立本合同。</p>
          <h3 class="text-align-left" style="text-indent: 0.5rem;">一、房屋基本情况</h3>
          <p class="text-align-left" style="text-indent: 0.5rem;">1、1、甲方将位于
            <span class="text-underline">&nbsp;&nbsp;&nbsp;{{houseInfo.house_position}}&nbsp;&nbsp;&nbsp;(区)
            &nbsp;&nbsp;&nbsp;{{houseInfo.garden_name}}&nbsp;&nbsp;&nbsp;(小区)&nbsp;&nbsp;&nbsp;{{houseInfo.building_number}}&nbsp;&nbsp;&nbsp;栋&nbsp;&nbsp;&nbsp;{{houseInfo.house_number}}&nbsp;&nbsp;&nbsp;{{houseInfo.room_number}}号
            房住房（以下简称该房屋）代房东转租给乙方使用；</span></p>
          <p class="text-align-left" style="text-indent: 0.5rem;">2、房屋使用期为<span class="text-underline" v-if="list.use_time==1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            1年&nbsp;&nbsp;&nbsp;</span><span class="text-underline" v-if="list.use_time==2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            半年&nbsp;&nbsp;&nbsp;</span>，自<span class="text-underline">{{list.start_time}}</span>起至<span class="text-underline">{{list.end_time}}</span>止。合同签订之日起计算房屋使用费（包含房屋租金、设施设备使用费和房屋运营管理服务费），乙方于本合同签订之日办理完毕支付房屋使用费、押金支付及房屋验收、设施设备接收等手续后甲方将房屋交付给乙方；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">3、该房屋每月房屋使用费为人民币<span class="text-underline">{{list.price}}</span>元整（其中<span class="text-underline">{{list.other_price}}</span>，剩余部分为房屋租金）；支付方式为：预付<span class="text-underline">{{list.first_pay}}</span>；押金为人民币<span class="text-underline">{{list.deposit}}</span>元整；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">4、合同签订时，乙方向甲方一次性支付押金及预付房屋使用费，此后房屋使用费每 <span class="text-underline">{{tenant.pay_style}}</span>个月支付一次，房屋使用费到期前半个月支付下一周期房屋使用费至甲方指定账户（如6月8日房屋使用费到期，则须在5月23日前支付下一周期的房屋使用费，密码锁设定的失效时间即为5月23日，交纳房屋使用费后即重新发送新的密码给乙方），乙方转账时须备注好房号、房屋使用人姓名；乙方拖欠房屋使用费超过3天的，甲方有权解除本合同并不退押金，采取包括但不限于断水、断电、断网、切断房屋门锁密码等措施要求乙方搬走；或者由甲方进行物品清点、打包清运至甲方指定地点（由乙方支付清运费100元/次，保管费10元/天），给甲方造成损失的，将追究乙方的违约责任。</p>
          <h3 class="text-align-left" style="text-indent: 0.5rem;">二、房屋使用约定</h3>
          <p class="text-align-left" style="text-indent: 0.5rem;">1、合法使用：该房屋仅作乙方居住使用，乙方不得改变居住用途，例如不得存放危险用品、不得从事商业活动、不得进行违法违纪活动、不得容留违法人员及容留超过2人居住；未与甲方办理相关手续，乙方不得私自转给他人使用、转借、转租该房屋，否则，甲方有权单方解除本合同并不退押金，乙方已支付但未使用期间的房屋使用费甲方有权不予退还；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">2、正退</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">2.1 合同期满不续约的，乙方须提前一个月与甲方确定，并提前一周与甲方预约物业交割时间，满足正退条件即转入退房流程，除抵扣应由乙方承担的费用、房屋使用费及乙方应当承担的违约赔偿责任及损坏甲方物品赔偿费外，所交押金的剩余部分于7个工作日内无息返还至乙方名下指定银行账户。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">2.2 清退符合条件：</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">（1）乙方须自行做好房屋清洁，恢复房间至入住前的状态，否则，甲方另行委托第三方清理所发生的全部费用均由乙方承担；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">（2）缴清物业租赁相关费用；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">（3）甲方上门验房做物业交割，乙方保证无正常使用之外的房间及物品损坏；如有损坏，可选择自行修缮（超过租期的房屋使用费由乙方额外支付）或联系甲方报修，维修费用参照《爆米花物业维修收费标准》。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">2.3 超期3天内办理房屋交割手续的，按天计算房屋使用费，同时须不得影响下一个房屋使用人入住；超期3天外未办理解约及房屋交割手续的，计算一个月房屋使用费，甲方有权收回房屋且没收押金作为没有及时履行合同义务的违约金，乙方留存在房屋内的物品视为乙方遗弃物，甲方有权予以清除丢弃。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">3、续约</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">合同期满续约的，乙方须提前一个月与甲方确定，并签署续约合同；提前一个月以上办理好续约手续的免服务费，合同期满前一个月内办理续约手续的，甲方按照100元/间收取服务费；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;"> 4、换房</p>
          <p class="text-align-left" style="text-indent: 0.5rem;"> 在房源条件允许的前提下，提供从A房间换到B房间服务，但乙方须提前一个月与甲方预约换房意向，并参照正退流程办理好A房间的物业交割，乙方须另行支付服务费100元/间；房屋使用费按新价格执行、多退少补。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;"> 5、乙方违约提前退房</p>
          <p class="text-align-left" style="text-indent: 0.5rem;"> 5.1如乙方自行找到第三方与甲方签约（乙方私自转租无效，不受保障），则在乙方结清相关费用、且第三方与甲方签约后，则无息退还剩余押金，房屋使用费自使用之日起至第三方与甲方签约之日止按时结算。乙方另须支付100元违约金作为合同变更费，提前一周预约甲方与新房屋使用人签约并参照正退流程办理物业交割；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;"> 5.2 如乙方委托甲方协助转租的，甲方找到第三方签约，乙方结清相关费用后，无息退还剩余押金，房屋使用费自使用之日起至第三方与甲方签约之日止按时结算。乙方另须支付房屋使用费的40%作为转租服务费，和100元违约金作为合同变更费，并参照正退流程办理物业交割；甲方仅提供转租服务，不承担未转租成功的责任。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;"> 5.3乙方违约提前退房，除扣除押金和结算房屋使用费外，还要承担一个月租金标准的违约金，代收费不足一月的按一月计算，还须将全部已享受的优惠（含租期变更优惠、促销优惠等）金额退还给甲方。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;"> 5、乙方违约提前退房</p>
          
          <h3 class="text-align-left" style="text-indent: 0.5rem;">三、房屋使用期间相关费用承担</h3>
          <p class="text-align-left" style="text-indent: 0.5rem;">1、乙方应与其它房屋使用人共同承担物业管理费、网络使用费、公共卫生费，以上几项费用统称代收费；甲方为乙方提供物业费、网络费、水费等代收代缴、提供专业的客服答疑解难、巡查维修（人为损坏维修费用另算）等服务，向乙方收取30元/月/间（套）的服务费；为保障乙方租住期间的财产与人身安全，投保太平洋“租房全能险”，保险费15元/月/人，最高可获得360000元理赔金额；以上代收费、服务费、保险费均与同期房屋使用费同步预付，该房屋每月固定代收费见《缴费明细表》中的预存费，乙方无故拖欠上述费用超过3天的，甲方有权解除本合同并不退押金，采取包括但不限于断水、断电、断网、切断房屋门锁密码等措施要求乙方搬走，或者由甲方进行物品清点、打包清运至甲方指定地点（由乙方支付清运费100元/次，保管费10元/天），给甲方造成损失的，将追究乙方的违约责任。。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">2、房间用电为智能独立电表，水表和燃气表（部分公寓使用燃气）均为共用；公摊水费30元/月/间，公摊燃气30元/月/间，该费用随房租一起缴纳，；电费（含公摊电费）按实结算，计算方式为：实际使用度数×1.00元/度（由上海蜂电4009908619提供用电服务和咨询）。</p>
          <h3 class="text-align-left" style="text-indent: 0.5rem;">四、房屋使用重要说明</h3>
          <p class="text-align-left" style="text-indent: 0.5rem;">1、对于房屋的装修环境及环保问题，乙方已于本合同签订前对房屋进行实地查看，乙方知晓并完全接受房屋现状，并无任何异议。本合同签订后，乙方不得以房屋不符合要求为由要求解除本合同。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">2、该房屋现有装修及设施、设备情况详见《电子交割单》。签订本合同时，乙方应认真核对该附件清单并签字确认，该附件作为甲方按照本合同约定交付乙方使用和乙方在本合同使用期满交还该房屋时的验收依据。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">3、甲方作为该房屋的使用权所有者，已经取得该房屋产权所有者的授权，该房屋业主同意甲方将该房屋按间（套）招募房屋使用人，乙方签订本合同即表示其完全知晓并认可甲方有权转让该房屋使用权。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">4、房屋使用期间安全问题不可存侥幸心理，乙方知晓并完全同意甲方在公共部位设置监控，同时遵守如下安全约定：</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">4.1遵纪守法，遵守物业管理规定，不做任何有违法律或者人文道德之事，不得扰民，要维护好邻里关系，不出现打架斗殴、吸毒卖淫、容留违法人员、存放违禁危险物品等违法违纪行为；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">4.2珍爱生命，因乙方自身原因（包含疾病或自我伤害）产生的一切事故和法律后果，由乙方自行承担全部法律责任，甲方对此不承担任何法律责任；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">4.3进出房门请随手锁门，注意防火防盗。安全使用天然气，装有热水器的房屋使用人在使用时，一定要维持室内通风。出现偷盗现象、居住期间被盗及因使用热水器导致的安全事故和人身伤害事故，由乙方自行承担全部责任；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">4.4注意用电安全，注意防火，不乱接乱搭，严禁使用电烤炉等大功率电器，因违规操作和使用引发的火灾等安全事故，由乙方承担全部责任；甲方有权在通知乙方的情况下进入房间巡查，并对发现的电烤炉等大功率电器暂时收走代为保管（退房时退还），对此乙方表示无异议并完全接受；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">4.5注意用水安全，节约用水，人走即关水，因个人忘记关水龙头等使用原因导致房屋积水渗水漏水，乙方须承担全部责任；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">4.6不往阳台和窗外乱扔垃圾和杂物，个人垃圾请带出放置物业指定垃圾站点，如有往窗外扔垃圾和杂物造成伤人伤物者，须承担全部责任；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">4.7不得靠近和倚靠、攀爬窗户和栏杆，不得以不正当方式使用窗户和栏杆，由此产生的任何法律责任，由使用者承担；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">4.8乙方不得利用网络发布危害国家安全的信息和程序。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">4.9出现以上违法乱纪行为、问题和事故，由乙方自行承担全部责任（包括承担法律责任、修缮、恢复原状及经济赔偿），甲方有权立即解除本合同，收回该房屋，将全部押金作为违约金，如该违约金不足以弥补损失的，房屋使用人还应承担赔偿责任，甲方保留追究因房屋使用人原因导致各类损失的权利，触犯法律的，由政府机关追究其法律责任。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">5、使用期间，乙方积极参与公共空间秩序和卫生的维护，并遵守如下清洁约定： </p>
          <p class="text-align-left" style="text-indent: 0.5rem;">5.1个人房间卫生：不损坏、污染房屋墙面及家具，自己房间自己负责，以清洁为宜；房间内卫生间、淋浴房、洗漱台、橱柜、阳台等下水位置，注意及时清理，避免下水道堵塞，如发生堵塞须自行负责疏通；乙方可通知甲方疏通，但乙方须按照本合同附件五约定的费用标准支付疏通费用。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">5.2公共空间卫生：包括共享区、厨房、公共卫生间、过道等公用部分（不同房型公共空间不同），甲方聘请保洁负责清洁服务，请爱惜保洁的劳动成果，公共空间、房屋入口、楼梯间、电梯间均不堆弃垃圾和杂物，个人垃圾均自行带下楼至小区固定垃圾投放点；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">5.3公共卫生间将不设纸篓，女性居民特殊的日子里请自行处理好必需品，避免造成卫生间堵塞，公共卫生间堵塞，由该套房的全体房屋使用人自行处理，甲方不负责该事项处理；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">5.4公共厨房清洁以“谁使用谁清洁”为原则，饭后必须及时清除产生的垃圾、剩菜、污垢等，并对操作台、洗菜池等进行清洁、避免堵塞，如出现堵塞，则由房屋使用人自行处理，如委托甲方处理，则由所有做饭的房间共同分摊疏通费；做饭产生的垃圾由使用者自行归纳至垃圾袋并带到物业指定垃圾站点。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">6、房屋使用期间，乙方须遵守如下音量控制约定：</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">6.1尽量不要太晚回来，注意自身安全，同时注意勿扰他人休息；晚十点到早八点间，请不要公共区域大声嬉闹、喧哗，音响声音调至本房间听见即可；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">6.2如朋友、同学来访，应尽量保持安静，以不干扰邻居学习、生活为宜；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">6.3在公共区域走动请一定要放轻脚步，回到房间移动桌椅等请轻拿轻放,楼下也有老人小孩需要好好休息,如影响到楼下住户引来投诉带来不良后果的,经核实情况无误后,甲方有权收回房间,并有权不予退还押金,押金不足以弥补所造成的损失的,责任方还须承担全部责任；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">6.4禁止养宠物，如因吵闹等原因影响其他房屋使用人正常生活休息的，甲方接到投诉两次及以上，经核实情况无误后，甲方有权收回房间，并有权不予退还押金。出现宠物伤人事件，由乙方承担全部责任，甲方有权单方面解除合同，收回房屋，押金及未使用部分房屋使用费不退，并追究由此导致的所有损失。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">6.5未经甲方书面同意，严禁私接乱搭电线、网线、水管，如发现有私接乱搭现象，甲方有权单方面解除合同，收回房屋，押金及未使用部分房屋使用费不退，由此导致的事故和损失由乙方承担全部责任。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">6.6 禁止高空抛物，如因乙方向窗外抛物导致的和损失由乙方承担全部责任。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">7、房屋使用期间，乙方须遵守如下公共设施使用约定：</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">7.1爱惜使用设施设备，因使用不当造成设施设备出现故障或损坏，须自行负责维修（保修期内由设施设备提供商免费保修），如因出现无法修复的损伤和损坏须照本合同附件清单价格赔偿或自行购买等价商品替换；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">7.2公共区域不得放置私人物品，如放置后发生损坏和丢失，由自己承担全部责任；公共区域的物品使用务必需要大家的共同爱护；个人损坏者，按价赔偿或自行购买等价商品替换；如损坏物品找不到责任方，由该套房全体房屋使用人共同承担，按价平均分摊赔偿金；赔偿品牌及价格请参照《房屋设施设备交接清单》，如未在清单之列的，按照该物品采购和安装价格赔偿；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">7.3不得在未经甲方书面同意的情况下，私自对房屋进行装修或装饰（不影响房屋结构及墙面原风格的装饰品和可移动的家具电器除外），严重损坏房屋，由乙方承担全部赔偿责任；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">7.4合理使用水电，减少浪费；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">7.5抽油烟机用完后，随手关闭；燃气用完随时关掉，安全永远是最重要的，节约也很关键；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">7.6宽带的使用不限时间，建议周一到周五晚上22：00点以前及周六、周日全天，请尽量不要使用迅雷、快车等下载工具，以免影响邻居正常使用。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">8、房屋使用期间须注意人身安全，如发生任何安全事故和意外事故，全部由乙方自行负责，甲方不承担由此造成的任何责任和损失；乙方购买太平洋“租房全能险”的，如发生意外安全事故，按照太平洋的理赔程序理赔；“租房全能险”为团体险，保费低，理赔额度高，保险自签约起租日起20日内完成代办并生效，投保、受益人均为乙方本人，如有他人与乙方同住，可另行购买保险，未购买不能享受保险权益；</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">9、交房入住时，乙方验收房屋内所有设施、设备，有问题的当场提出，由甲方安排处理。验收没有问题后，甲乙双方在《电子交割单》上签字确认。在房屋使用期内该房屋设备设施的损耗、质量问题、自然老化、人为损坏等均由乙方自行维修，费用由乙方承担。在保修期内的设施设备由乙方自行向对应的售后服务商保修。过了保修期的，乙方可选择报售后服务商或甲方维修，费用由乙方承担。没有保修期的或人为损坏的，乙方可联系甲方维修，按甲方房屋使用期服务项目收费标准执行，费用由乙方承担。属于公共部分的，在保修期内由售后服务商提供维修保养，不在保修期内的维修保养产生的费用由该房全体租户平均分摊。乙方对此无任何异议，并表示完全理解和同意。（详情请见房屋使用期自行处理项目表和房屋使用期服务项目价格表）</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">10、退房时，乙方需将房间卫生及家具电器摆放恢复到入住时的原样，保证房间干净整洁，违约者扣300元卫生费，乙方对此表示完全同意。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">11、因不可抗力、国家政策需要拆除或改造已签约的房屋、导致甲方需要提前解除本合同的，如甲方提前一个月通知乙方的，双方互不承担责任，导致终止合同的，房屋使用费按照实际使用时间计算，不足整月的按天数计算，多退少补；因甲方原因需要立即提前解除本合同的，甲方应一次性全额退还乙方交纳的押金和未发生的房屋使用费并给予乙方壹个月房屋使用费的补偿。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">12、甲方委托本合同签字的代表人代表甲方签定本合同，并代表甲方向乙方办理房屋交割手续。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">13、乙方如不满意甲方的服务，可以打电话4001670731投诉，但不得进行不实传播，由此给甲方造成恶劣影响和损失的，甲方保留追究乙方法律责任的权利。</p>
          <h3 class="text-align-left" style="text-indent: 0.5rem;">五、特别约定</h3>
          <p class="text-align-left" style="text-indent: 0.5rem;">1、乙方无条件同意和配合甲方根据国家、省、市关于房屋租赁的治安管理规定，办理承租人的个人信息申报等手续。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">2、乙方郑重承诺：本人在居住期间按时足额提前将房屋使用费、代收费交给甲方；完全接受《爆米花青年公寓管理公约》和甲方开门密码发送方式。如违约退房，则不满一个月按一个月计算房屋使用费；如有其它情况，按原合同的违约责任处理，如违约金不足以弥补甲方损失，则完全接受甲方要求的赔偿。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">3、双方确认，本合同所述房屋使用费是不含税的。如乙方需要填报个税减免手续的，应事先征得甲方书面同意，并向甲方支付由此产生的税及费，方可填报甲方的相关信息。</p>
          <h3 class="text-align-left" style="text-indent: 0.5rem;">六、其它</h3>
          <p class="text-align-left" style="text-indent: 0.5rem;">1、本合同未尽事宜，甲、乙双方协商解决。附件与本合同具有同等法律效力。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">2、本合同及附件一式贰份，双方签字盖章后生效。由甲、乙双方各执壹份，具有同等法律效力。乙方身份证复印件作为本合同附件，仅作为本次房屋使用身份证明。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">3、因履行本合同发生纠纷，双方应协商解决，协商不成的，双方均可以向合同签订地人民法院提起诉讼。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">4、本合同中所载当事人联系方式和联系信息适用于双方往来联系、书面文件送达及争议解决时的法律文件送达。乙方保证本合同约定送达地址、联系方式等联络信息真实、有效，并明确知晓甲方、仲裁机构或者人民法院按照本合同约定送达地址送达函件、文书等，即使送达不成，亦具有视为送达的法律后果。乙方联络信息如有变更，应提前十五天书面通知甲方并经甲方确认，否则，甲方、仲裁机构或者人民法院根据乙方指定通讯地址、联系方式等送达的文件均为有效送达，由于乙方未及时通知甲方联络信息变更而产生的一切风险及损失均由乙方自行承担。</p>
          <p class="text-align-left" style="text-indent: 0.5rem;">（此项以下无正文）</p>
          
          <div style="width: 100%;height: 0.5rem;"></div>
          <div style="width: 100%;min-height: 2rem;">
            <van-col class="logo-parent"  span="12">
              <div class="text-align-left">委托方（甲方）: </div>
              <div class="text-align-left" style="text-indent: 0.2rem;line-height: 0.8rem;height:1.6rem">湖南米花寓公寓管理有限公司</div>
              <div class="text-align-left">代表人：</div>
              <div class="text-align-left">联系电话：</div>
              <div class="mihua-logo"></div>
            </van-col>
            <van-col span="12">
              <div class="text-align-left">受托方（乙方）: </div>
              <div class="text-align-left signature-area">
                <!-- <van-image v-show="showSignatureImg" :src="signatureImg" /> -->
              </div>
              <div class="text-align-left">身份证号：{{tenant.idcardcode}}</div>
              <div class="text-align-left">电话：{{tenant.telphone}}</div>
            </van-col>
          </div>
          <div class="text-align-right">签订时间：{{currDate.getFullYear()}}年{{currDate.getMonth()}}月{{currDate.getDate()}}日</div>
        </div>
      </div>
      <div style="width: 100%;">
        <div style="width: 90%;margin: 0 auto;">
          <van-button v-if="!showSignatureImg" square type="info" size="small" color="#F8B729" style="border-radius: 0.1875rem;" @click="showSignature = true">电子签名</van-button>
          <van-button type="info" color="#F8B729" style="border-radius: 0.1875rem;margin:0.5rem 0;" @click="submitConfirm">提交审核</van-button>
        </div>
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
//import shareApi from '../../common/until'
   export default {
    name: 'ConfirmRentInfo',
    data () {
      return {
        title: '确认租房信息',
        list:{},
        tenant: {
          truename: '',
          telphone: '',
          idcardcode: ''
        },
        contractDetails: {
          house_position: "",
          garden_name: "",
          building_number: "",
          room_number: "",
          area: "",
          house_layout: "",
          house_number: null,
          expire_year: 0,
          name: "",
          idcardcode: "",
          telphone: "",
          date: ""
        },
        // 返回的房屋信息
        houseInfo: {},
        // 返回的bill
        bill: {},
        idCardFront: [],
        cardimg1: '',
        idCardBack: [],
        cardimg2: '',
        idCardHand: [],
        cardimg3: '',
        // 合同名称
        htmlTitle: '房屋使用合同',
        // 显示租房合同
        showLeaseAgreement: false,
        // 显示签名区域
        showSignatureImg: true,
        // 显示签名框
        showSignature: false,
        // 生成合同按钮
        generateContractBtn:false,
        // 签名图片
        signatureImg: '',
         /* */
        el: '', // canvas dom
        ctx: '', // canvas context
        background: '#fff', // canvas background-color 白色
        color: '#000', // 绘制时线条的颜色
        linewidth: 3, // 线条的宽度
        /* */
        currDate: new Date()
      }
    },
    mounted(){
      document.title = this.title;
      this.init();
      this.share();
    },
    updated () {
      this.draw();
    },
    methods:{
      share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
      // 我要租房--确认租房方式后的数据渲染
      init(){
        //debugger
        var that = this;
        let param = {
          api_token: this.$store.state.global.api_token,
          house_id: this.$store.state.renting.id,
          start_time: this.$store.state.renting.startRentTime,
          rent_time: this.$store.state.renting.rentTerm + '',
          hope_time: this.$store.state.renting.EnterRentTime
        };
        // 我要租房--确认租房方式后的数据渲染
        this.$http.post(this.$store.state.global.baseUrl + 'lease/enter_lease', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.tenant = res.data.data.tenant;
              that.houseInfo = res.data.data.house;
              that.bill = res.data.data.bill;
              that.list=res.data.list;
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('获取房源信息失败，请刷新重试！');
            return;
          }
        });
        // 合同详情
//         this.$http.post(this.$store.state.global.baseUrl + 'base/contract_details', param).then(res => {
//           debugger
//           if(res.status == 200) {
//             if(res.data.code == 200){
//               that.contractDetails = res.data.data;
//             }else{
//               that.$toast(res.data.msg);
//             }
//           }else{
//             that.$toast('获取房源信息失败，请刷新重试！');
//             return;
//           }
//         });
      },
      lookContact(){
        if(!this.cardimg1){
          this.$toast("请上传身份证正面照！");
          return false;
        }
        if(!this.cardimg2){
          this.$toast("请上传身份证反面照！");
          return false;
        }
        if(!this.cardimg3){
          this.$toast("请上传身份证手持照！");
          return false;
        }
        this.showLeaseAgreement=true;
      },
      uploadCardFront(file){
        var that = this;
        let param = new FormData();
        param.append('api_token', this.$store.state.global.api_token);
        param.append('file', file.file);
        //设置请求头
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }; 
        this.$http.post(this.$store.state.global.baseUrl + 'entrust/watermark', param, config).then(res => {
          console.log(res.data)
          if(res.status == 200) {
            if(res.data.code == 200){
              // 记录上传后返回的URL
              console.log(res.data.data)
              that.cardimg1 = res.data.data;
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('上传图片失败，请重新选择图片！');
            return;
          }
        });
      },
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
          console.log(res.data)
          if(res.status == 200) {
            if(res.data.code == 200){
              // 记录上传后返回的URL
              console.log(res.data.data)
              that.cardimg2 = res.data.data;
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('上传图片失败，请重新选择图片！');
            return;
          }
        });
      },
      uploadCardHand(file){
        var that = this;
        let param = new FormData();
        param.append('api_token', this.$store.state.global.api_token);
        param.append('file', file.file);
        //设置请求头
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }; 
        this.$http.post(this.$store.state.global.baseUrl + 'entrust/watermark', param, config).then(res => {
          console.log(res.data)
          if(res.status == 200) {
            if(res.data.code == 200){
              // 记录上传后返回的URL
              console.log(res.data.data)
              that.cardimg3 = res.data.data;
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('上传图片失败，请重新选择图片！');
            return;
          }
        });
      },
      submitConfirm(){
        var that = this;
        let param = new FormData();
        param.append("api_token",that.$store.state.global.api_token);
        // param.append("house_id",that.house_id);
        param.append("house_id",that.$store.state.renting.id);
        param.append("start_time",that.$store.state.renting.startRentTime);
        param.append("rent_time",that.$store.state.renting.rentTerm);// 租期 1一年 2半年
        param.append("end_time",that.$store.state.renting.expectHandingTime);// 交房时间
        param.append("hope_time",that.$store.state.renting.EnterRentTime);// 交房时间
        param.append("cardimg1",that.cardimg1);// 身份证正面
        param.append("cardimg2",that.cardimg2);// 身份证反面
        param.append("cardimg3",that.cardimg3);// 身份证手持照
        // param.append("contract_path",file);// 合同文件
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }; 
        that.$http.post(that.$store.state.global.baseUrl + 'lease/enter_post', param, config).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              //console.log("提交租房申请成功！");
              that.$toast("提交租房申请成功！");
              // 跳转到租赁合同审核中提示页
              this.$router.push({path : '/auditRemind'});              
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            console.log("合同上传失败！")
            that.$toast("合同上传失败！");
            return;
          }
        });
      },
      generateContract(){
        var that = this;
        this.generateContractBtn = false;// 隐藏生成合同按钮
        window.pageYOffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        console.log("合同生成....")
        //debugger
        var title = this.htmlTitle;
        this.$html2Canvas(document.querySelector('#pdfDom'), {
          allowTaint: true,
          useCORS: true
        }).then(function(canvas) {
          //debugger
          var contentWidth = canvas.width;
          var contentHeight = canvas.height;

          var pageData = canvas.toDataURL('image/jpeg', 0.4);

          var pdfWidth = (contentWidth + 10) / 2 * 0.75;
          var pdfHeight = (contentHeight + 200) / 2 * 0.75; // 500为底部留白

          var imgWidth = pdfWidth;
          var imgHeight = (contentHeight / 2 * 0.75); //内容图片这里不需要留白的距离

          var pdf = new JsPDF('', 'pt', [pdfWidth, pdfHeight]);
          pdf.addImage(pageData, 'jpeg', 0, 0, imgWidth, imgHeight);
        
          //debugger
          // var datauri = pdf.output('dataurlstring');
          //调用
          var blob = that.dataURLtoBlob(pageData);
          var file = that.blobToFile(blob, "contract_path_file");
          
          // param.append("contract_path",file);// 合同文件
          
          
        
          pdf.save(title + '.pdf');
        })
      },
      // 添加绘制 line
      draw(){
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
      // 返回
      onClickLeft() {
        this.$router.back(-1);
      }
    }
  }
</script>

<style scoped lang="less">
  .van-nav-bar__text{
    color: #FFB640;
  }
  .van-nav-bar__title{
    color: #FFB640;
  }
  .van-nav-bar .van-icon{
    color: #FFB640!important;
    font-size: 0.7rem;
  }
  .division{
    width: 100%;
    height: 1.3125rem;
    background-color: #F5F5F5;
  }
  .confirm-rent{
    font-size: 0.4rem;
    line-height: 0.8rem;
  }
  .info-title{
    width: 90%;
    margin: 0 auto;
    height: 1.375rem;
    line-height: 1rem;
    font-size: 0.4rem;
    text-align: left;
    color: #FFB640;
  }
  .info-detail{
    width: 83%;
    text-align: left;
    color: #777;
    margin: 0 auto;
  }
  .info-detail span{
    display: block;
  }
  .van-cell{
    padding: 0;
  }
  .van-cell:not(:last-child)::after{
    border-bottom: none;
   }
   .info-cell{
     width: 83%;
     text-align: left;
     color: #777;
     margin: 0 auto;
   }
   .info-cell span{
     display: inline-block;
     width: 49%
   }
   .van-popup--center{
     width: 101%;
   }
   /deep/p{
     margin-block-start: 0.2em;
     margin-block-end: 0.2em;
   }
   /deep/h3{
     margin-block-start: 0.2em;
     margin-block-end: 0.2em;
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
   .label{
     text-align: left;
     // text-indent: 0.45rem;
     color: #323233;
     line-height: 1rem;
   }
   /deep/.id-front .van-uploader__upload{
     width: 8.2rem;
     height: 5rem;
     background-image: url("../../assets/img/entrust/id-front.png");
     background-repeat: no-repeat;
     background-size: cover; 
   }
   /deep/.id-front .van-uploader__upload-icon{
     display: none;
   }
    /deep/.id-back .van-uploader__upload{
     width: 8.2rem;
     height: 5rem;
     background-image: url("../../assets/img/entrust/id-back.png");
     background-repeat: no-repeat;
     background-size: cover; 
   }
   /deep/.id-back .van-uploader__upload-icon{
     display: none;
   }
   /deep/.house-cer .van-uploader__upload{
     width: 8.2rem;
     height: 5rem;
     background-image: url("../../assets/img/entrust/ceri.png");
     background-repeat: no-repeat;
     background-size: contain;
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
   /deep/.van-uploader__upload{
     background-color: white;
   }
   .van-cell{
     overflow: visible;
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
     top: -0.5rem;
     left: -0.5rem;
     background-image: url("../../assets/img/entrust/mihua-logo.png");
     background-repeat: no-repeat;
     background-size: cover; 
   }
   .span-cell{
     line-height: 0.8125rem;
   }
   /deep/.van-picker__cancel, /deep/.van-picker__confirm{
     color: #F8B729;
   }
   .house-desc{
     width: 90%;
     margin: 0 auto;
   }
   .house-desc .title{
     text-align:  left;
     line-height: 1rem;
     text-indent: 0.3125rem;
   }
   .house-desc .desc-detail{
     width: 85%;
     min-height: 2.0rem;
     margin: 0 auto;
     text-align: left;
     color:#777;
     /* text-indent: 0.3rem; */
   }

   .bill-table{width:90%; margin:0.2rem auto;}
  .bill-table>table{border:1px solid #ccc; width: 100%;}
  .bill-table th,.bill-table td{border:1px solid #ccc; padding:0.1rem;}
  .bill-table td.tableCols{border:0 none; padding:0;}
</style>
