<template>
<div class="main">
    <!-- <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" /> -->
    <div  v-if="status=='start'"> 
      <div v-if="contactstatus=='start'">
        <div class="contactMain"  ref="contactMain">
          <h1>房屋使用合同</h1>
          <div>
              <p>出租人（以下简称甲方）：湖南米花寓公寓经营管理有限公司</p>
              <p>承租人（以下简称乙方）：<span>{{contact.truename}}</span>
              <br/>
              身份证号码：<span>{{contact.idcardcode}}</span>
              </p>            
          </div>        
          <div>
              <p>根据《中华人民共和国合同法》、《中华人民共和国民事诉讼法》及相关法律法规的规定，甲、乙双方在平等、自愿的基础上，就甲方将房屋给乙方使用事宜，为明确双方权利义务，经协商一致，订立本合同。</p>
          </div>
          <div class="housePosition">
              <h2>一、房屋基本情况</h2>
              <p>
                  <!-- <input type="text" v-model="contact.name" class="long" v-bind:disabled="diasabledInput"/> -->
                  1、甲方将位于<span>{{contact.house_position}}{{contact.garden_name}}</span>
                  小区<span>{{contact.building_number}}</span>栋<span>{{contact.room_number}}</span>号房住房（以下简称该房屋）代房东转租给乙方使用；<br/>
                  2、房屋使用期为<span v-if="contact.use_time==1">1年</span><span v-if="contact.use_time==2">半年</span>，自<span>{{contact.end_time}}</span>止。合同签订之日起计算房屋使用费（包含房屋租金、设施设备使用费和房屋运营管理服务费），乙方于本合同签订之日办理完毕支付房屋使用费、押金支付及房屋验收、设施设备接收等手续后甲方将房屋交付给乙方；
                  <br/>
                  3、该房屋每月房屋使用费为人民币大写）<span>{{contact.price}}</span>（其中<span>{{contact.other_price}}</span>，剩余部分为房屋租金）；支付方式为：预付押金为人民币（大写）<span>{{contact.deposit}}</span><br/>
                  4、合同签订时，乙方向甲方一次性支付押金及预付房屋使用费，此后房屋使用费每<span>{{contact.pay_style}}</span>个月支付一次，房屋使用费到期前半个月支付下一周期房屋使用费至甲方指定账户（如6月8日房屋使用费到期，则须在5月23日前支付下一周期的房屋使用费，密码锁设定的失效时间即为5月23日，交纳房屋使用费后即重新发送新的密码给乙方），乙方转账时须备注好房号、房屋使用人姓名；乙方拖欠房屋使用费超过3天的，甲方有权解除本合同并不退押金，采取包括但不限于断水、断电、断网、切断房屋门锁密码等措施要求乙方搬走；或者由甲方进行物品清点、打包清运至甲方指定地点（由乙方支付清运费100元/次，保管费10元/天），给甲方造成损失的，将追究乙方的违约责任。                 
              </p>            
          </div>
          <div>
              <h2>二、房屋使用约定</h2>
              <p>
                  1、合法使用：该房屋仅作乙方居住使用，乙方不得改变居住用途，例如不得存放危险用品、不得从事商业活动、不得进行违法违纪活动、不得容留违法人员及容留超过2人居住；未与甲方办理相关手续，乙方不得私自转给他人使用、转借、转租该房屋，否则，甲方有权单方解除本合同并不退押金，乙方已支付但未使用期间的房屋使用费甲方有权不予退还；<br/>
                  2、正退<br/>
                  2.1 合同期满不续约的，乙方须提前一个月与甲方确定，并提前一周与甲方预约物业交割时间，满足正退条件即转入退房流程，除抵扣应由乙方承担的费用、房屋使用费及乙方应当承担的违约赔偿责任及损坏甲方物品赔偿费外，所交押金的剩余部分于7个工作日内无息返还至乙方名下指定银行账户。<br/>
                  2.2 清退符合条件：<br/>
                  （1）乙方须自行做好房屋清洁，恢复房间至入住前的状态，否则，甲方另行委托第三方清理所发生的全部费用均由乙方承担；<br/>
                  （2）缴清物业租赁相关费用；<br/>
                  （3）甲方上门验房做物业交割，乙方保证无正常使用之外的房间及物品损坏；如有损坏，可选择自行修缮（超过租期的房屋使用费由乙方额外支付）或联系甲方报修，维修费用参照《爆米花物业维修收费标准》。<br/>
                  2.3 超期3天内办理房屋交割手续的，按天计算房屋使用费，同时须不得影响下一个房屋使用人入住；超期3天外未办理解约及房屋交割手续的，计算一个月房屋使用费，甲方有权收回房屋且没收押金作为没有及时履行合同义务的违约金，乙方留存在房屋内的物品视为乙方遗弃物，甲方有权予以清除丢弃。<br/>
                  3、续约<br/>
                    合同期满续约的，乙方须提前一个月与甲方确定，并签署续约合同；提前一个月以上办理好续约手续的免服务费，合同期满前一个月内办理续约手续的，甲方按照100元/间收取服务费；<br/>
                    4、换房<br/>
                    在房源条件允许的前提下，提供从A房间换到B房间服务，但乙方须提前一个月与甲方预约换房意向，并参照正退流程办理好A房间的物业交割，乙方须另行支付服务费100元/间；房屋使用费按新价格执行、多退少补。<br/>
                    5、乙方违约提前退房<br/>
                    5.1如乙方自行找到第三方与甲方签约（乙方私自转租无效，不受保障），则在乙方结清相关费用、且第三方与甲方签约后，则无息退还剩余押金，房屋使用费自使用之日起至第三方与甲方签约之日止按时结算。乙方另须支付100元违约金作为合同变更费，提前一周预约甲方与新房屋使用人签约并参照正退流程办理物业交割；<br/>
                    5.2 如乙方委托甲方协助转租的，甲方找到第三方签约，乙方结清相关费用后，无息退还剩余押金，房屋使用费自使用之日起至第三方与甲方签约之日止按时结算。乙方另须支付房屋使用费的40%作为转租服务费，和100元违约金作为合同变更费，并参照正退流程办理物业交割；甲方仅提供转租服务，不承担未转租成功的责任。<br/>
                    5.3乙方违约提前退房，除扣除押金和结算房屋使用费外，还要承担一个月租金标准的违约金，代收费不足一月的按一月计算，还须将全部已享受的优惠（含租期变更优惠、促销优惠等）金额退还给甲方。<br/>                  
              </p>
          </div>        
          <div class="houseNotice">
              <h2>三、房屋使用期间相关费用承担：</h2>
              <p>
                  1、乙方应与其它房屋使用人共同承担物业管理费、网络使用费、公共卫生费，以上几项费用统称代收费；甲方为乙方提供物业费、网络费、水费等代收代缴、提供专业的客服答疑解难、巡查维修（人为损坏维修费用另算）等服务，向乙方收取30元/月/间（套）的服务费；为保障乙方租住期间的财产与人身安全，投保太平洋“租房全能险”，保险费15元/月/人，最高可获得360000元理赔金额；以上代收费、服务费、保险费均与同期房屋使用费同步预付，该房屋每月固定代收费见《缴费明细表》中的预存费，乙方无故拖欠上述费用超过3天的，甲方有权解除本合同并不退押金，采取包括但不限于断水、断电、断网、切断房屋门锁密码等措施要求乙方搬走，或者由甲方进行物品清点、打包清运至甲方指定地点（由乙方支付清运费100元/次，保管费10元/天），给甲方造成损失的，将追究乙方的违约责任。<br/>
                  2、房间用电为智能独立电表，水表和燃气表（部分公寓使用燃气）均为共用；公摊水费30元/月/间，公摊燃气30元/月/间，该费用随房租一起缴纳，；电费（含公摊电费）按实结算，计算方式为：实际使用度数×1.00元/度（由上海蜂电4009908619提供用电服务和咨询）。                            
              </p>                      
          </div>  
          <div>
              <h2>四、房屋使用重要说明</h2>
              <p>
                  1、对于房屋的装修环境及环保问题，乙方已于本合同签订前对房屋进行实地查看，乙方知晓并完全接受房屋现状，并无任何异议。本合同签订后，乙方不得以房屋不符合要求为由要求解除本合同。<br/>
                  2、该房屋现有装修及设施、设备情况详见《电子交割单》。签订本合同时，乙方应认真核对该附件清单并签字确认，该附件作为甲方按照本合同约定交付乙方使用和乙方在本合同使用期满交还该房屋时的验收依据。<br/>
                  3、甲方作为该房屋的使用权所有者，已经取得该房屋产权所有者的授权，该房屋业主同意甲方将该房屋按间（套）招募房屋使用人，乙方签订本合同即表示其完全知晓并认可甲方有权转让该房屋使用权。<br/>
                  4、房屋使用期间安全问题不可存侥幸心理，乙方知晓并完全同意甲方在公共部位设置监控，同时遵守如下安全约定：<br/>
                  4.1遵纪守法，遵守物业管理规定，不做任何有违法律或者人文道德之事，不得扰民，要维护好邻里关系，不出现打架斗殴、吸毒卖淫、容留违法人员、存放违禁危险物品等违法违纪行为；
                  <br/>
                  4.2珍爱生命，因乙方自身原因（包含疾病或自我伤害）产生的一切事故和法律后果，由乙方自行承担全部法律责任，甲方对此不承担任何法律责任；<br/>
                  4.3进出房门请随手锁门，注意防火防盗。安全使用天然气，装有热水器的房屋使用人在使用时，一定要维持室内通风。出现偷盗现象、居住期间被盗及因使用热水器导致的安全事故和人身伤害事故，由乙方自行承担全部责任；<br/>
                  4.4注意用电安全，注意防火，不乱接乱搭，严禁使用电烤炉等大功率电器，因违规操作和使用引发的火灾等安全事故，由乙方承担全部责任；甲方有权在通知乙方的情况下进入房间巡查，并对发现的电烤炉等大功率电器暂时收走代为保管（退房时退还），对此乙方表示无异议并完全接受；<br/>
                  4.5注意用水安全，节约用水，人走即关水，因个人忘记关水龙头等使用原因导致房屋积水渗水漏水，乙方须承担全部责任；<br/>
                  4.6不往阳台和窗外乱扔垃圾和杂物，个人垃圾请带出放置物业指定垃圾站点，如有往窗外扔垃圾和杂物造成伤人伤物者，须承担全部责任；<br/>
                  4.7不得靠近和倚靠、攀爬窗户和栏杆，不得以不正当方式使用窗户和栏杆，由此产生的任何法律责任，由使用者承担；<br/>
                  4.8乙方不得利用网络发布危害国家安全的信息和程序。<br/>
                  4.9出现以上违法乱纪行为、问题和事故，由乙方自行承担全部责任（包括承担法律责任、修缮、恢复原状及经济赔偿），甲方有权立即解除本合同，收回该房屋，将全部押金作为违约金，如该违约金不足以弥补损失的，房屋使用人还应承担赔偿责任，甲方保留追究因房屋使用人原因导致各类损失的权利，触犯法律的，由政府机关追究其法律责任。
                  <br/>
                  5、使用期间，乙方积极参与公共空间秩序和卫生的维护，并遵守如下清洁约定：<br/>                
                  5.1个人房间卫生：不损坏、污染房屋墙面及家具，自己房间自己负责，以清洁为宜；房间内卫生间、淋浴房、洗漱台、橱柜、阳台等下水位置，注意及时清理，避免下水道堵塞，如发生堵塞须自行负责疏通；乙方可通知甲方疏通，但乙方须按照本合同附件五约定的费用标准支付疏通费用。<br/>
                  5.2公共空间卫生：包括共享区、厨房、公共卫生间、过道等公用部分（不同房型公共空间不同），甲方聘请保洁负责清洁服务，请爱惜保洁的劳动成果，公共空间、房屋入口、楼梯间、电梯间均不堆弃垃圾和杂物，个人垃圾均自行带下楼至小区固定垃圾投放点；<br/>
                  5.3公共卫生间将不设纸篓，女性居民特殊的日子里请自行处理好必需品，避免造成卫生间堵塞，公共卫生间堵塞，由该套房的全体房屋使用人自行处理，甲方不负责该事项处理；<br/>
                  5.4公共厨房清洁以“谁使用谁清洁”为原则，饭后必须及时清除产生的垃圾、剩菜、污垢等，并对操作台、洗菜池等进行清洁、避免堵塞，如出现堵塞，则由房屋使用人自行处理，如委托甲方处理，则由所有做饭的房间共同分摊疏通费；做饭产生的垃圾由使用者自行归纳至垃圾袋并带到物业指定垃圾站点。<br/>
                  6、房屋使用期间，乙方须遵守如下音量控制约定：<br/>
                  6.1尽量不要太晚回来，注意自身安全，同时注意勿扰他人休息；晚十点到早八点间，请不要公共区域大声嬉闹、喧哗，音响声音调至本房间听见即可；<br/>
                  6.2如朋友、同学来访，应尽量保持安静，以不干扰邻居学习、生活为宜；
                  <br/>
                  6.3在公共区域走动请一定要放轻脚步，回到房间移动桌椅等请轻拿轻放,楼下也有老人小孩需要好好休息,如影响到楼下住户引来投诉带来不良后果的,经核实情况无误后,甲方有权收回房间,并有权不予退还押金,押金不足以弥补所造成的损失的,责任方还须承担全部责任；<br/>
                  6.4禁止养宠物，如因吵闹等原因影响其他房屋使用人正常生活休息的，甲方接到投诉两次及以上，经核实情况无误后，甲方有权收回房间，并有权不予退还押金。出现宠物伤人事件，由乙方承担全部责任，甲方有权单方面解除合同，收回房屋，押金及未使用部分房屋使用费不退，并追究由此导致的所有损失。<br/>
                  6.5未经甲方书面同意，严禁私接乱搭电线、网线、水管，如发现有私接乱搭现象，甲方有权单方面解除合同，收回房屋，押金及未使用部分房屋使用费不退，由此导致的事故和损失由乙方承担全部责任。<br/>
                  6.6 禁止高空抛物，如因乙方向窗外抛物导致的和损失由乙方承担全部责任。<br/>
                  7、房屋使用期间，乙方须遵守如下公共设施使用约定：<br/>
                  7.1爱惜使用设施设备，因使用不当造成设施设备出现故障或损坏，须自行负责维修（保修期内由设施设备提供商免费保修），如因出现无法修复的损伤和损坏须照本合同附件清单价格赔偿或自行购买等价商品替换；<br/>
                  7.2公共区域不得放置私人物品，如放置后发生损坏和丢失，由自己承担全部责任；公共区域的物品使用务必需要大家的共同爱护；个人损坏者，按价赔偿或自行购买等价商品替换；如损坏物品找不到责任方，由该套房全体房屋使用人共同承担，按价平均分摊赔偿金；赔偿品牌及价格请参照《房屋设施设备交接清单》，如未在清单之列的，按照该物品采购和安装价格赔偿；<br/>
                  7.3不得在未经甲方书面同意的情况下，私自对房屋进行装修或装饰（不影响房屋结构及墙面原风格的装饰品和可移动的家具电器除外），严重损坏房屋，由乙方承担全部赔偿责任；<br/>
                  7.4合理使用水电，减少浪费；<br/>
                  7.5抽油烟机用完后，随手关闭；燃气用完随时关掉，安全永远是最重要的，节约也很关键；<br/>
                  7.6宽带的使用不限时间，建议周一到周五晚上22：00点以前及周六、周日全天，请尽量不要使用迅雷、快车等下载工具，以免影响邻居正常使用。<br/>
                  <br/>
                  8、房屋使用期间须注意人身安全，如发生任何安全事故和意外事故，全部由乙方自行负责，甲方不承担由此造成的任何责任和损失；乙方购买太平洋“租房全能险”的，如发生意外安全事故，按照太平洋的理赔程序理赔；“租房全能险”为团体险，保费低，理赔额度高，保险自签约起租日起20日内完成代办并生效，投保、受益人均为乙方本人，如有他人与乙方同住，可另行购买保险，未购买不能享受保险权益；<br/>
                  9、交房入住时，乙方验收房屋内所有设施、设备，有问题的当场提出，由甲方安排处理。验收没有问题后，甲乙双方在《电子交割单》上签字确认。在房屋使用期内该房屋设备设施的损耗、质量问题、自然老化、人为损坏等均由乙方自行维修，费用由乙方承担。在保修期内的设施设备由乙方自行向对应的售后服务商保修。过了保修期的，乙方可选择报售后服务商或甲方维修，费用由乙方承担。没有保修期的或人为损坏的，乙方可联系甲方维修，按甲方房屋使用期服务项目收费标准执行，费用由乙方承担。属于公共部分的，在保修期内由售后服务商提供维修保养，不在保修期内的维修保养产生的费用由该房全体租户平均分摊。乙方对此无任何异议，并表示完全理解和同意。（详情请见房屋使用期自行处理项目表和房屋使用期服务项目价格表）<br/>
                  10、退房时，乙方需将房间卫生及家具电器摆放恢复到入住时的原样，保证房间干净整洁，违约者扣300元卫生费，乙方对此表示完全同意。<br/>
                  11、因不可抗力、国家政策需要拆除或改造已签约的房屋、导致甲方需要提前解除本合同的，如甲方提前一个月通知乙方的，双方互不承担责任，导致终止合同的，房屋使用费按照实际使用时间计算，不足整月的按天数计算，多退少补；因甲方原因需要立即提前解除本合同的，甲方应一次性全额退还乙方交纳的押金和未发生的房屋使用费并给予乙方壹个月房屋使用费的补偿。<br/>
                  12、甲方委托本合同签字的代表人代表甲方签定本合同，并代表甲方向乙方办理房屋交割手续。<br/>
                  13、乙方如不满意甲方的服务，可以打电话4001670731投诉，但不得进行不实传播，由此给甲方造成恶劣影响和损失的，甲方保留追究乙方法律责任的权利。                
              </p>
          </div>
          <div>
              <h2>五、特别约定</h2>
              <p>
                  1、乙方无条件同意和配合甲方根据国家、省、市关于房屋租赁的治安管理规定，办理承租人的个人信息申报等手续。<br/>
                  2、乙方郑重承诺：本人在居住期间按时足额提前将房屋使用费、代收费交给甲方；完全接受《爆米花青年公寓管理公约》和甲方开门密码发送方式。如违约退房，则不满一个月按一个月计算房屋使用费；如有其它情况，按原合同的违约责任处理，如违约金不足以弥补甲方损失，则完全接受甲方要求的赔偿。<br/>
                  3、双方确认，本合同所述房屋使用费是不含税的。如乙方需要填报个税减免手续的，应事先征得甲方书面同意，并向甲方支付由此产生的税及费，方可填报甲方的相关信息。
              </p>
          </div>
          <div>
              <h2>六、其它：</h2>
              <p>
                  1、本合同未尽事宜，甲、乙双方协商解决。附件与本合同具有同等法律效力。<br/>
                  2、本合同及附件一式贰份，双方签字盖章后生效。由甲、乙双方各执壹份，具有同等法律效力。乙方身份证复印件作为本合同附件，仅作为本次房屋使用身份证明。<br/>
                  3、因履行本合同发生纠纷，双方应协商解决，协商不成的，双方均可以向合同签订地人民法院提起诉讼。<br/>
                  4、本合同中所载当事人联系方式和联系信息适用于双方往来联系、书面文件送达及争议解决时的法律文件送达。乙方保证本合同约定送达地址、联系方式等联络信息真实、有效，并明确知晓甲方、仲裁机构或者人民法院按照本合同约定送达地址送达函件、文书等，即使送达不成，亦具有视为送达的法律后果。乙方联络信息如有变更，应提前十五天书面通知甲方并经甲方确认，否则，甲方、仲裁机构或者人民法院根据乙方指定通讯地址、联系方式等送达的文件均为有效送达，由于乙方未及时通知甲方联络信息变更而产生的一切风险及损失均由乙方自行承担。<br/>
                  （此项以下无正文）
              </p>
          </div>
          
          <div class="housesign">
              <div style="width: 100%;min-height: 2rem;">
                <van-col class="logo-parent" span="12">
                <div class="text-align-left">委托方（甲方）: </div>
                <div class="text-align-left" style="text-indent: 0.2rem;line-height: 1.6rem;">湖南米花寓公寓管理有限公司</div>
                <div class="text-align-left">签约代表：</div>
                <div class="text-align-left">电话：</div>
                <div class="mihua-logo"></div>
              </van-col>
              <van-col span="12">
                <div class="text-align-left">受托方（乙方）: </div>
                <div class="text-align-left signature-area">
                  <van-image v-show="showSignatureImg" :src="signatureImg" />
                </div>
                <div class="text-align-left">身份证号：{{contact.idcardcode}}</div>
                <div class="text-align-left">电话：{{contact.telphone}}</div>
              </van-col>
              
            </div>
              <p>时间：<span>{{currDate.getFullYear()}}年{{currDate.getMonth() + 1}}月{{currDate.getDate()}}日</span></p>
          </div>
        </div>
      </div>
        <!-- <div v-if="contactstatus=='end'"  ref="contactMain3">
           <van-image :src="contactsImg1" />
           <van-image :src="contactsImg2" />
        </div> -->
        <!-- <button v-if="contract.order_status==1" @click="editList" class="btnOrange">修改合同信息</button> -->
        <div v-if="btnstatus=='enter'">
          <button v-if="contact.order_status==2" @click="paypg=true" class="btnOrange">点击支付</button>        
          <button v-if="contact.order_status==3" @click="sign" class="btnOrange">打开签约字板</button>
          <button v-if="contact.order_status==4" @click="submitList" class="btnOrange">提交房屋清单</button>
          <button v-if="contact.order_status==1" @click="editList" class="btnOrange">
              修改合同信息
          </button>
        </div>
        <div v-if="btnstatus=='submit'">
          <button @click="submitSign" class="btnOrange">提交合同</button>
        </div>
    </div>
    <van-action-sheet v-model="paypg" :round="false" title="合同费用支付" height="200px">
      <van-divider dashed></van-divider>
      <div class="confirm">        
        <div class="confirm-bottom">
          <div class="pay_conter">实付金额：{{contact.first_pay}}
               <p class="pay_wrong">{{pay_wrong}}</p>
          </div>
         
          <div>
            <van-button square type="info" size="small" color="#F8B729" style="border-radius: 0.1875rem; margin-bottom:1rem" @click="payfor">确认支付</van-button>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <van-action-sheet v-model="showSignature" :round="false" title="电子签名" :close-on-click-overlay="false">
        <div class="cavas">
      <canvas ref="signHandle" class="canvas" id="canvas" />
      </div>
      <div class="cancvas-btn">
        <van-button size="mini" @touchstart="clearHandle">清空</van-button>
        <van-button type="info" size="mini" @touchstart="saveImg">确认</van-button>
      </div>
    </van-action-sheet>
    <div class="listConter" v-if="status=='end'">
      <img class="face" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAADECAYAAADApo5rAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kc8rRFEUxz8zQ+RHo1hYWEwaVmhQYqOMhJKmMcqvzcybNzNq3szrvSfJVtkqSmz8WvAXsFXWShEpWVlYExum57x5UyOZe7v3fO73nnM691zwxrKKZlaFQMtZRnQ8HJibXwjUvOCjlVqZnrhi6iORyBQVx+c9Hsfedju5Kvv9O+qTqqmAp1Z4WNENS3hCeGrV0h3eEW5RMvGk8JlwlyEFCt85esLlV4fTLn87bMSio+BtEg6kf3HiFysZQxOWlxPUsitKqR7nJQ1qbnZGbLusNkyijBMmwCRjjDJAL0OyD9BNHz1yokJ8qBg/TV5iFdl11jBYJk0Giy5RVyS7KjYluiozy5rT/799NVP9fW72hjBUP9v2ewfUbENhy7a/jmy7cAy+J7jMlePzhzD4IfpWWQsegH8Dzq/KWmIXLjah9VGPG/Gi5JPlTaXg7RQa56H5BuoW3Z6V7jl5gNi6fNU17O1Dp/j7l34A1GVno4O/7IoAAAAJcEhZcwAACxMAAAsTAQCanBgAACAASURBVHic7Z173F3Dufi/ed2JRENQUfd7CVWlJTRtRbSl4dQlVNpZHNRBe04vcTsuLdXqhVPVH35OzWiJS1ERdeqWRN1OiEvlcIoQFIlIUyIkEknOH8+8+91Za/Zea+89a+299jvfzycfH3tmr3neNc+z5/bM8wwgkCvamIHAJsAQYH1gPWAgsCawLrBK7CvLgHeBxcBC4G3g78B84I1IqYXFSN4/GdBuAboBbcxmwI7A9sC2wFbAFsDHEKX3ybvA34CXgZeAF4DngP+NlHrVc1v9jmAQDaKN2Rz4NLAn8ElgV+RXvxN4G/gL8DjwKDAtUurltkpUMoJBpKCN2RL4PLA/MALYtL0SNcxrwIPAvcDkSKlZbZanowkGEUMbsxqwH3AQ8GVkCtRNvAD8EZgEPBAptbTN8nQUwSCoGMH+wFjEEIZ4evQHwOvAHGAuMA+Z1vQulpcDC2LfGQT00Lf4Xg/YANgQ2BgYBqzhSb75wB3ADcC9wTj6uUFoY/YAFHAkonTNsAJZ3M4AngGeB2YCs4A5kVIrWpe0D23MAMQwtgS2AbYDPg7sgizmm+3TecCNgImUmu5B1FLS7wxCGzMI+DpwAqJEjfImMif/b2Aa8FSk1Lv+JGwebcy6wG7AXsjCfwSwUROPmgH8f+C3kVLxEayr6TcGoY3ZDvg2YgwDG/jqAuA+4B5kUfpcDuLlhjZme2RTYBTwBWRKlpWFwG+BX0ZKPZ+DeB1H1xuENuYzwBnIArkn49deBW4FJgIPdcvc2q6V9gHGAP8EbJbxq8uRhfiPI6UeyUm8jqBrDUIb81ngPGBkxq/MBq4HbgIe9T337zTsWmRP4AjgKOCjGb86FTgvUur+nERrK11nEHZEuJBshrAEGQV+g+yyLMtRtI5FG7MKsst2HDJ6rJ7ha1OBM7ttxOgag7BrhIuAQzJUfxW4HLg6UmpuroKVDG3MhsCxwElkm1LdBpzWLWuM0huENuYjwDnAycBqKdUfBX4B3Bop9WHespUZbcyqyDrju8jUqh5LgV8DP4yU+kfesuVJaQ3CzoEV8BPk0KoeU5HOmpKzWF2JNuZzyI/OyJSqc4HTkbOMUq7BSmkQdivxKmDflKpT6eIFYNE0sFHxAHB82baooWQGYYfx8civVT33haeA8ZFS9xQiWD9DGzMK+ClyCFiLD4AfAj8t0/S0NAZhR4VrgT3qVJsNnImcsC4vRLB+ijamBznkvJD6W7bTgWPKMlp0vEHYtcI3kcXwWjWqLQX+Azi/U9wo+gvWXeRs4F+pvamxCFmcX9Hpa4uONghtzBBAA1+pU+1h4MRIqf8pRqqAC23MzsCVwN51qk0Ejo2Uml+MVI2T1ZWhcLQxnwKepLYxLAS+BewbjKH92D7YF+mTWve+xwBP2r7tSDpyhNDGHA9cRu0T0weBb0RKvVScVIGsaGO2Aq5BvG1dLAFOiZS6qjipstFRBqGNWR24FDixRpWlwLnIzkW/dLMoC9YdZDzwA2qvLa4EvhUptaQwwVLoGIOw64VbqL3HPQs4KlJqWmFCBVpGG7MX4jS5ZY0qU4Gvdsq6oiMMwg6xdyJhXFxMQqZIpXYL6K9Y95prgINrVHkO+FInTIHbvqjWxnwSeAS3MSxHtvTGBGMoL7bvxiB96Tof2h54xOpCW2nrCGF9ZG7DfYvrXeDoSKk7ipUqkCfamIOACbgDuC0ADmmnz1nbDEIbczByGWdNR/GrwEGRUjOKlSpQBNqYXZBoHy738sXAEZFSk4qVSmiLQVhjuBn3tuqTyHxyTrFSBYpEG7Mxsm78hKN4CXBYO4yi8DVEijHcB4wMxtD92D4eifR5nNWBm62uFEqhBpFiDH9ARoZ+FfakP2P7+ktI38dpi1EUNmWyC+g/4nbQuw7ZVg2Hbf0Qe4h3DfA1R/Ei4MtFLbQLMQhtzCeAKcBgR3EwhkCaUbwDfC5S6sm85cjdILQxWyDnDBs7ioMxBCqkGMUc4DN5h/fP1SDsCeXDwA6O4onIkX0whkAFaxS3IAd5cf4K7J3nIW1ui2p73fMm3MYwBTgyGEMgjtWJIxEdibMDcJPVrVzIc5fpEiT4VZyngEMjpT7Ise1AibG6cSiiK3H2R3QrF3KZMmljIuBqR9HfgE9HSr2RR7uB7kIbswkSZf1jjuJjI6W07za9G4TdUXqYpEvGe8CISCmX1QcCTrQxuyEXwtaJFS1G1hNed568Tpm0MYOB35M0hhXAuGAMgUaxOjMO0aFq1gR+b3XOG77XEFcBWzs+vyBSynUaGQikYnXnAkfR1khiF294MwhtzHHA4Y6iPyHR3gKBVjgP0aU4R1jd84KXNYQ2ZmtkRyCemec14BORUvN8tBPo32hjNkC8oeOpkRcCu/q4cdfyCGEjuGmSxrAMuQMdjCHgBatLRyG6Vc1AwFhdbAkfU6ZTcQcd/lGk1IMenh8IVLA69SNH0b6ILrZESwZh/ZQudBQ9BpzfyrMDgTqcj+hYnAutTjZNqyPEFcDasc8WI1uspYn4HCgXVrfGIbpWzdpIZqimadogtDGHA6MdReeWJdJzoLxYHTvXUXSg1c2maMogtDHr4PYneQK4uFlhAoEGuRjRucTnVkcbptkR4gxgWOyz5UgU7jBVChSC1bUTScZ62hTR0YZp+BxCG7MZ4pcevwp6RaTUSc0IEQi0gjbmciSHSDWLgB0ipV5t5FnNjBAXkDSG+cBZTTwrEPDBWYgOVrMWbnePujRkENqY4biv953XKcFqA/0Pq3vnOYq+ZnU2M42OED9wfOd5WtzqCgQ8cDmii9X0IDqbmcwGYf3SXfdczwgL6UC7sTroWkiPsbqbiUZGiHNJLsIfxx1kKhBoB39AdLKaAbjPK5xk2mWyCfWedtQ/MFLqrqyNBQJ5o40ZTdJNfAUwPEsuwqwjxHiSxvBYMIZAp2F1Mu7nNADR4VRSDUIbMwwJCxLH5dQXCHQCLt080upyXbKMEP9CMjjxX4HbM3w3EGgHtyM6Ws3qiC7Xpa5BaGPWAI53FF0cKeVKjRQItB2rmy6fuuOtTtckbYQ4HBga++zvwLXZxQsE2sK1iK5WMxQ4rN6X0gzCNTr8JlJqUQOCBQKFY3XUFSzPpdMVahqENmYbkldDlyOXggKBMnA5SU/Y/axuO6kXNPbrJLdap0RKzWpSuI5CGzMU2J2+MP1zgemRUm+1T6rise9hD2BD+9Ec4IlueA+RUrO0MVOAL1R9PADR7XNc33EezGljBgAzga1iRUdHSl3vQda2YVM0fQfYj+QIuQIJm/jzSKmu3kXTxnwF+B4wgqQeLAf+jGyetCUbqC+0MUchaYCreQnYJlIqHg2w5gixJ0ljWIDklC4lNleFxu2P1csAZJq4rzbmDiSZS1d58WpjhiBJSQ6qU60HSYg4UhszEYjyzMmQM7chuludC30rRMenxSvXWkO47qT+oayLaTstuJ/6xhDnIOBB+92uwP4tD1LfGOKMAe4v63uwOuvyt3Peu65lEF91fFbKqVJVRppdmvj6jsBteSboKAr7N9yG/E2Nsgtwi32XZcSluy4dTxqENmZXYIvYx/8AJrcsVnv4Ju5AalnZGzjFkyzt5BTkb2mWfUle0ywLkxEdrmYLq+sr4RohXHmB/xgptdSHZEWijVkNONPDo07Xxrhya5cCK/vpHh51pn2npcLq7h8dRQlddxnEFx2fTWxVqDYxEtjEw3M2wp0erCzsj/wNrbIJ8k7LiEuHE7q+kkFoY9YD9orV+RC4159chbKfx2eN8PisovEpu893WiT3IrpczV5W5yvER4jPAvGF0yORUm97Fq4oXMlbOuFZRdPv34PV4UdiH6+C6HyFuEGMdDyrrKMDJMPltEJp1xD4ld3nOy0aly6PrP4f1wgR5z5f0rSBuR6fVdaDKfAru893WjQuXXaPENqYdYF4DJvFwHT/chXGjA59VtGk3iVugDK/h+kkI4YP18ZUkv1UjxB7kFw/TC95gvU7SWavbBbXtl1ZuMPTc1Yg77SUWF2O/8Cvgug+sLJB7Ol4RnwRUipszjEfgRAmR0rFg2CVBiu7j4PVu3zkcWszLp2u7KxWG8TujoqPeheneE4DWjlU/BDxCi073yO57dgIS5F3WXZcOl3R/WqDSBxjIxkfS02k1NOIu3ezjI+U6ob38CQZQ7HU4Dv2XZYdV19WdL8HQBuzJhC/RbQA8RsvPZFSlwHfp7H1xArg7EgpV2KYUmL/lrNp/D18377DbuAlRLer2cbaQGWE2J7kgvpZ1wWKshIp9XPgAOCFDNVnIlEJGw6n3unYv+lA5G9M4wXgAPvuugKr08/GPl4FsYGKQezg+G78S6UnUupeYCfE9XcCohTv2X8zETfhw4EdI6XubpeceWP/th2Rv/V6ku9hAvKOdrLvrNtw6fb20HdjbltHhXigp67ARom+1f7rt9j3cLP9199w6fZ20DdCbOmokGVIDQTKyIuOz7aEPoPY3FHh5bykCQTajCtyzObQZxCbOio0lKwuECgRLt3eFGobxOJIqXgYwECgK7C6HfdpGgbQo41ZG4gnuZ5dhGCBQBuJ6/hAbczaPSSDGUO5XXwDgSy4dHxoD7C+o6CrgnMFAg5cOj6kB1jXUVDmyzCBQBZcOj5oVWA9R8G7eUigjRmELOBfi5SK+5MEAhUK0BWXjg9eFXBlVPEaslIbMxj4FTAWWA1Yqo25ETglUuodn20Fyo3VlcuQvIa9unIDcKpnXXHp+Jo9uC+NexshtDE9wCRgHPIHYv97DDDJlgcC1bpyDCvryjj864pLx9eq1cAyjw0fRO1QkvvSWODdQHdTpK44dbyIX+fPpJS3Em800F2k6UKaLrVMEQaxZkp53ayQgX5Fmi6k6VLLFGEQrdzjDQSqyV2XahmEz1/thSnlg1LKA/2HwSnlabrUCE4d76HGattjw3Enqjhre2wrUG7S9M7ncYBzd7UHcAUiG+j4rFnSDlVcB4OB/kmaLvg8MHbp+Ac9uBXW5c7RLGl+US5fqkD/JE0XfPrYuabqC3oAV6j7j3hsOC3fsY+EJoHuYFhKuc/c2a7R6O0e3Fbn81c77W7FRt2Q1DDQGlYHNkyp5vOezgaOz+b3APMcBR/12PDrKeWr4r7CGuhfbErtvOm9pOlSI2zs+Gxej42IHB8lhvryG7Geimlzv3iS+ED/I00H5vvyerW6Hb8YNz9S6oNepY8PRavhJ0lfL66wH9U0kzs50F2k6UCaDjXCRvQ5D/YyG/oO5lxRCDbzKMBzKeU7e2wrUE7SdCBNhxrBFXbpVegziJcdFXwm10sLi7mbx7YC5SRNB3yGVnVNz2ZBn0G4ovTFo4G3QloY9V3LmBA84Afb9650DNX4DMXv0u0Xob5BbO9RgKdSytcijBL9md1Id9vwmaPDpdszoc8gXPOznXy1Hin1OulbZvv4ai9QOtL6/vVIqTc8tufS7eegzyBeJOnTtKPnA7OHU8o/77GtQLlI6/uHfDVkp2dxg/iA6imTDY0eX7Ssgd/t0AdSykdqY8qcHD3QBLbPR6ZUe9BjkzuQTGT/rLWBle5DuOZoezg+a5a0LJjrEqZN/ZF9SHcm9ZFBtReXTld0v9ogHndU/JRHQZ4l3RdljMf2AuUgrc9n43fL1aXTFd2vNojHHBW9BQCwub3SckYfqo0Z4KvNQGdj+/rQlGp3ec516NLpiu5XG8RfSN5I2tkGjvLF7Snlm1FAZIVAx/AZ0j0i0nQmM1aX4yfiixDdB6oMIlJqCcmk1qsAI3wJBNxD+jXAcR7bC3Q2aX29CNEZX4wgmW33Uav7QDLIgGsn6HO+pImUWgjcmVJtrDbG553uQAdi85KMTal2p9UZX7h0eSWdjxvEfY4vjPImjnB9Svl6SLrYQHdzGOl3qNN0pVFcurySzscN4r+B92OfDdfG+LzAcwfp4fZP9theoDNJ6+N/ILriBavDw2Mfv4/ofIWVDCJSajEw1fG8L/oSzF5ImpBSbU9tTFhcdym2b/dMqTbB6oovXDo81ep8BdetONcc3/f5wFUZ6nzPc5uBziFL32bRkUZw6XBC110G4Rqm9ve5/Rop9RfS/VMO0caEm3Rdhu3TQ1KqPWR1xFebg4H9HUUJXU8YRKTUKyRPrdcADvYiXR+XppT3AOd4bjPQfs4hPaZwmm40ysEkQ1c+bnV9JWoJdpvjs7Qtska5FfdNvWqO0MakXRwJlATbl0ekVHsZ0Q2fuHTXpeM1DcK13XWANsaVwrcprHfhz1Kq9QAX+Woz0HYuIn10+Fmv56kPrM4e4Chybuk6hYuUepGkb9NqwNEtSZdEk+7wN1obc6DndgMFY/twdEq12YhO+ORokhE2HrM6nqCetf7O8dmxzUrlIlJqEfCTDFUv1caExColxfZdlnXBT6xO+OQ4x2cu3QbqG8T1wJLYZ8O1MXs1I1UdriB9LbEtMN5zu4HiGI/0YT1eRnTBG1ZXd4l9vIQ6J+A1DSJSah5uT8OTmpKudjtLgH/PUPUsbYzPwAeBArB9dlaGqv9e7WTnCZeuTrS67SRtgeOy2LHamLSgtI0yAZiWUmcNwGhj4t6KgQ7F9pUhPSPVNNK9Fxpte0Pcu0tX1vtemkFMBp6PfbYG8M3soqVjL4B8C1ieUvXTwBk+2w7kyhlIn9VjOfAtz5eAQEaHuCE+T8p11LoGYYW8zFF0im8X7UipR8l2XH+uNibtJQfajO2jczNUvcr2vc+218LtPPirNMPLEuFbk0yqMhSIsonXEKcDc1LqrArcqI0ZkkP7AQ/YvrmR9PD2c5A+901EMrr328j0rS6pBmEvaLjmXaf5DhsTKfU22aZjmwHXhfVE52H7ZALZgmV/0/a5z/ZXB05zFF2Z5bJR1hwQvySZTXQzchglIqUmUmefuIoDgQt9tx9omR+TfgAH8Dvb176JSBrjIkSHU8lkEJFSs3EPN2dqY/LILn8qkHC8cjBeG+P1sDDQPLYvvp+h6itIH/tuf03gTEfRNVaHU2kkS9CFJA/qNsPzuQRApNQ7yJF7Fp+WK7QxWX6RAjli+yDLwdqHwFG2j31zEsnRYQkNzCQyG0Sk1N9w7wKdpY3xnms6Uuph3NYeZzXgVm1M2g2sQE7Yd38rSZ8hF2dGSj2Sgwzr4T4AvMrqbiYazSP3I5J3rtcHzm7wOVn5OdlcgdcG7tbGhJD6BWPf+d1IH6RxK9KneXA2yey57yE6m5mGDMLOwy52FJ2ijdmukWdlbG8FoIAZGaoPRoxid99yBNzYd3038u7TmAF8I4cDOKzuneIouiTr2qGXZjKN/hR4M/bZ6mRcxTdKpNS7yI2nuRmqDwUmh4O7/LHveDLJ/X4Xc4GDPcdYquZSkhG930R0tSEaNgiroK652oHamFziKdmrfgeRnK65GAzcF+5Q5Ic25otIPKMsI8P7wEGu65qeZDkc9zbvWVZXG6LZXNQamO74/Jd5LLABIqUeQwKYZfGIXBuYpI05IQ9Z+jP2nd5OtjXDEuAw23d5yLIe7pnJdJq8aNSUQURKLUd8ReLOeB8l/Vpo00RK3YkcvCzLUH1V4EptzCXhRLt1tDGraGMuQbwWsmSWWgZEkVL/laNYP0N0rprlwMlWRxum2RGi1xnPte98nDbGdYfVC5FSE4ATgKyLs39FFtu+Xdb7Dfbd3Y28yyysAI63fZWXTAfgvg13RSvOgk0bhOUMkskUBwBX5+l8Fyl1NXKdNctIAZLD7AltzH55ydSt2Hf2BNlzAC4Djo2U8n03ulqmIcDViK5V8zotXg9oySAipRYgv9ZxhgGXt/LsDG0bJJx61ltWw5AdqAtCTux0tDGraWMuQHaShmX82hJgnO2bPLkct0wnWJ1sGi/ZerQxGjkviPPPkVK/8dFGnbYPBG4G1mnga08Bymd0uG7Cxk8yNJY7/D1kAf2nXISyaGOOA/7TUWQipVp2NvVlEIORLCybx4reA/aKlHrGRzt12v8kEpZw4wa+thT4BXB+pFSW7dyux+ZsOBuJvdpISuY5wJcjpZ7IRTCLNmZnJFp3/MfvFWBXH/5R3vK5aWNGIJHD4zs6zwGfamZPuMH2P4ZsBzbqvvEK4qF5cx6nqGXA5no7DNm1if+opfEkMKYRf6Fm0Masi8QKiweaWAaMjJTykrq31UV1BSuQy29ke+CavJMp2g4ZgdzUaoTNgZuAB7Qx3pJMlgX7Nz+AvINGjeFGYN8CjGEAcA1JYwC4wJcxQGPDYhZ+COxHMhH3ochQ/EPP7a1EpNR7SFSQR5Bj+0Zu9O0DPKSN+RNwXqRUWhSQUmNjFp2HXLRqlCXA+EipXNx1HJyNO1vpFOB8nw15/9XWxmyMbNPFD0xWAEdGSv3ed5s15NgDCUi1TZOPuA/xzPSdFrZt2F/a0cga4QtNPmYmMDZSypXX3DvWNeNGkro6G9g9UirtDn5D5DKNscPwFJK/0O8D++fhD19DjoHIwvl4mv9bn0O2+X4XKTXfl2xFYvftxyEXaJoN9rYCuQ/z3Ryd9FbCZhq6l6SbyBLgc/bOjFdym9dbnxdXcIK3gH0ipV7Iq22HLKOQrbosF99rsRiYCFwL3OM53ZN3bDzVUcAxSIKSVmLjvopsoftMkVsXbcy2SFIdlzftCZFSvjMMATkaBIA25pdIALI4s5DFWPyUO09ZBiJz5m/T+trpHWASsqt1j+/IEc1ind1GAV9BXOZbzfr0IeI8d15RowKANmYYstDf0lF8aaTUt/NqO2+DWAX5Vf2yo3gG8IVIqbfylMEh08cR//msrghpLEO2A6cCf0YSgf/d07Proo1ZH0le2LuR8SmS297NMhmJqJfrGVIcm8/hPpJBikHOmg6JlMrqstMwuRoEgDZmHURZ9nAUP4nMBfO4cF4XbczBSCj+nXJ4/EvIQeUM4AVkIfoy8GajC3S7EN4I2ALZINgWUZZdga28SdzHs8DpkVKTcnh2XewB7xTgE47i6ch5w3t5ypC7QUDF6h/GveMzDRjdJqNYFfgaEn282d2oRliKrKH+juRhXkjSF2t1YCDwEeSO8FCyXd5vlZnABcB1PjP4ZMUaw12AK93CTGDvImYThRgEgDZmc+BBwJUE/i/AqKKnT71YwxiLRHzbuR0ytJEZyJnNDe0wBKj8YN6DjHpxXgNG5HXjLk5hBgGpOwfPICNFYQvtOHZ6MgrZCPgiHk/yO4zlwH8ha6l72nnOYhfQdwEfdxQXviNZqEFAxUGr1uX0V4ADIqXiIfgLRxuzJXLnQuEe1crIa4gX69WRUrPaLEtvtIy7cbuMvAV8PlLqf4qUqXCDgFSjmIc4i3k/dGkGbUwP8Fkknew/AWW7eTcXiYd0E3B/s1crfWMPbycCGziK22IM0CaDANDGbI3sPrl+fRcj93FvKFSoFOw28j7IHv9o3FuDncAMZBoyCXgoz23KZtDGjEWCALjiAr+G7CY5s4TmTdsMAiou2/cCriBnKxDv2XM75VctjvXb+ixyDrAXsij07TCZxofIpsQ05Bzkft/+Pb6wo+0PkDBGLt17HnHtydV7th5tNQio7DBMwr3dBnIYM65TToPrYTPX7AQMR3artgW2Rs4QsoRtqcf7yFnGi4jiPAM8DTwTKRVPVdBx2FP03yHxtVxMQ4KZtWWnsZe2GwRUbmpNAMbUqPIi8NUyX/nUxnwEudG3PjAEcatYk6ShvI9MGd8B5iNnFnMipf5RnLR+sVdSb0F+HFxMBI7uhJuLHWEQUJmfXwR8t0aVxbbs8m5xx+527Db2SYjHca08Ir8ATuuUdU7HGEQv2hiFxHuq5Z15O+J52dahNVAfOxX+T8TR0MUHSEotU5hQGeg4g4BKvoGbgY/VqPImcGJOKZkCLaKNGYO4/m9Uo8rfkAgdXrOP+qAjDQIqvzDXAvWiAF4H/FsYLToD22eXIP5htbgbOKZT+6xjDQIq23SnIXexa21nzkOuRP42rC3ag10rfB25cus6aAPZHj4HuKhTt9Ghww2iF3sh/lrqe6Q+iAS5fboYqQIA2pjhwK+RiCe1mImMCh0fuKEUBgGVG28XIbsWteRehizkzo2Uiid1CXhEG7MRcsj2z9S+lLQCuY9+WpE37lqhNAbRizbm84jSu64X9rIQCbp1cVk6oizYH6bvIMHdBtapOgs4LlJqSiGCeaJ0BgGVg7wfIOHZ67lKzEPmtb8OhtEa1hBORtZrtdYJIGuF/0BG6bYftDVKKQ2iF+s1+2vEl6ge85BkkZeXwQWkk7AuFycho0I9QwDxpTq5HV6qvii1QUBlh+NI5H50WijGd5HYQr+KlHo5Z9FKjTZmC+BUJKbVuinVXwFOB24s+05f6Q2iF+tYdyqSMCMtz91yxKHwSiQyX8duAxaJ3eYeDZyIuLin3Rh8G/gx8gOzKGfxCqFrDKIX60Q3HslbXG/R18srSCDd37bLB7/d2LspXwe+QbaAxwuBy4Cfltnp0EXXGUQv2pgNEGfAfwEGZfjKCsQF+Trg1kipN3IUr+1oYzZBbgB+DXG9z6ILC4D/B/wiUmpejuK1ja41iF6qFoWnkgzAXIsVwKOIW/KdwNNlnxvbtdZw4EuIm/2eZO//2cCv6AebEl1vEL1oY1ZHFt+nIMrQCG8gN/smA3/uhAv6WbCBEvZDohTuD2zS4CMeRQzhpkiprLn8Sk2/MYhqtDG7IwvHsWSbTsV5Awm8Nh14HHiq3VMIO0XcDfgkEiVxbxo3AJBp0Q3AlXmnyOpE+qVB9GLDbB6CRMgeRWtxUecgYSD/Sl/oyleQVLFzW51y2SnPhkj2zc2Rk/qtgR2Qa6uN5NeLswwJFHYtcFve4SI7mX5tENXY5OSHAl9FAgf7DB/5IXI42BvCcgFyA7BWCtlByA2zQfSFtNwAvwEMliJRT24B/hApNdfjs0tLMAgHdiE+GlmAjqb2RZeyMQe5j3Ancv7S1QvkZggGkYKdquyEjBojkbhMwVJ+jAAAAIhJREFUWXer2s1sJHToVPvv2bLvluVNMIgmsG4NeyAL2F2R7cxh7ZQJWas8jcRoehyYHtxTGicYhCfsNGs7+29LJBbTpvbfUGQN0Oz7XoGsQd5CItu9hizaZyExmp4P0x8/BIMoCOsnNARZKA8C1kEWyavS52KyEFmAfwi8hyy6FwDzg79VMfwfEWSJ+m9uu08AAAAASUVORK5CYII=" alt="">
           <p class="tips">{{tips}}</p>
    </div>
    <van-popup v-model="tipsshow" :close-on-click-overlay="false">
        <div style="padding:2rem 1rem">正在保存信息,请耐心等待.....</div>
    </van-popup>
</div>
</template>
 <script src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js" type="text/javascript"></script> 
<script>
import html2Canvas from 'html2canvas' ;
import Vue from 'vue'; 
import JsPDF from 'jspdf';
//import shareApi from '../../../common/until'
export default {
    data(){
        return {
            currDate : new Date(),
            title:'合同详情',
            tipsshow:false,
            diasabledInput:true,
            contract:"1",
            paypg:false, 
            status:"start",    
            tips:"",      
            pay_wrong:"", 
            btnstatus:"enter",
            isShowSign: false,// 是否打开签名版
            htmlTitle:"房屋使用合同",      
            contactDetai_img:"",   
            contactstatus:"start",
            contact:{
                order_status: null,
                house_position: "",
                garden_name: "",
                building_number: "",
                room_number: "",
                use_time:null,
                start_time: "",
                end_time: "",
                price: null,
                other_price: "",
                first_pay: null,
                deposit: null,
                truename: "",
                idcardcode: "",
                telphone: "",
                date: "",
            },
            showSignature:false,
            signatureImg:'',
            showSignatureImg:false,
            signTest:true,
            contactsImg1:"",
            contactsImg2:""
        }
    },
    mounted() {
      document.title = "合同详情";
      this.share();
      this.init();
    },
    methods:{
      share(){
        let link="https://house.growingsale.cn/wxindex/"+ this.$store.state.global.pidshare;
        let that=this;
        this.$shareApi.wxShare(link);
       },
        init(){
        //debugger
        let that = this;
        let param = {
          api_token: this.$store.state.global.api_token,
          order_id: this.$store.state.locale.contractId,
        };
        this.$http.post(this.$store.state.global.baseUrl + 'base/lease_contract', param).then(res => {
          //debugger
          if(res.status == 200) {
            if(res.data.code == 200){
              that.contact = res.data.data;
              console.log(res.data.data);
               if(res.data.data.order_status==4 || res.data.data.order_status==5){
                that.signatureImg=res.data.data.contact_path;
                that.showSignatureImg=true; 
                //that.$refs.contactDetai_img.src=res.data.data.contact_path;
                console.log(res.data.data.contact_path)
              }
              //that.$store.state.locale.editHouseInfo = res.data.data;             
            }else{
              that.$toast(res.data.msg);
            }
          }else{
            that.$toast('获取合同详情失败，请刷新重试！');
            // setTimeout(() => {
            //     this.$router.back(-1);
            // }, 1000);
            return;
          }
        });
        
      },
      //打开签名
        sign () {           
            this.showSignature=true;
        },        
        submitList(){           
            this.$router.push({path : '/HouseBag'});
        },
        editList(){
            this.$router.push({path : '/EditContract'});
        },
        onClickLeft() {
            this.$router.back(-1);
        },
       
      payfor(){
            let that = this;
            let param = {
                api_token: this.$store.state.global.api_token,
                order_id: this.$store.state.locale.contractId,
            };
            this.$http.post(this.$store.state.global.baseUrl + 'user/pay_rent_house', param).then(res => {
            //debugger
                if(res.status == 200) {
                    if(res.data.code==200){
                       const pay_params=res.data.data;
                       if (typeof WeixinJSBridge == "undefined"){
                            if( document.addEventListener ){
                                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                            }else if (document.attachEvent){
                                document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                            }
                        }else{
                            that.onBridgeReady(pay_params);
                        }
                    }else{
                        console.log(res.data.msg);
                        that.pay_wrong=res.data.msg +",请联系工作人员";
                        //that.$toast(); 
                    }
                   
                }else{                    
                    //that.pay_wrong=res.msg;
                    that.$toast('获取合同详情失败，请刷新重试！');
                    // setTimeout(() => {
                    //     this.$router.back(-1);
                    // }, 1000);
                    return;
                }
            });
           
        },
        onBridgeReady(params){
            var that = this;
            //const pay_params = JSON.parse(params);
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', params,
                function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ){
                      that.status="end";
                      that.tips="恭喜支付成功！1-2个工作日会有工作人员联系您!";
                    //that.$toast('支付成功');
                    that.paypg = false;
                    that.contact.order_status = 3;
                    that.isShowSign = true;
                } 
            }); 
        },
        //绘图
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
        //debugger
        this.el.width = this.el.offsetParent.clientWidth * 0.90-2;
        // this.el.height = 250;
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
      // 保存签名信息
      saveImg() {
        const imgBase64 = this.el.toDataURL();
        this.signatureImg=imgBase64;
        this.btnstatus="submit";
        this.showSignature=false;
        this.showSignatureImg=true;       
        // console.log('保存签名成功' + imgBase64);    
        console.log('保存签名成功')
        this.signTest=false;
      },
       // 合同生成
  //     submitSign(){
  //       var that = this;       
  //       this.generateContractBtn = false;// 隐藏生成合同按钮
  //       window.pageYOffset = 0;
  //       //document.documentElement.scrollTop = 0;
  //       //document.body.scrollTop = 0;
  //       console.log("合同生成....");
  //       that.tipsshow=true;
  //       //debugger
  //       var title = this.htmlTitle;
  //       let element=this.$refs.contactMain;
  //       this.$html2Canvas(element, {
  //         allowTaint: true,
  //         useCORS: true
  //       }).then(function(canvas) {    
  //           console.log("修改了allowTaint");
  //           console.log(canvas.width);
  //           console.log(canvas.height);
  //           // canvas.width=canvas.width*0.35;
  //           // canvas.width=canvas.height*0.35;
  //           let contentWidth = canvas.width;
  //           let contentHeight = canvas.height;
  //           let pageData = canvas.toDataURL('image/jpeg', 0.1);
  //           console.log(pageData);
  //           console.log("pageData");
  //           let pdfWidth = (contentWidth + 10) / 2 * 0.75;
  //           let pdfHeight = (contentHeight + 200) / 2 * 0.75; // 200为底部留白

  //           let imgWidth = pdfWidth;
  //           let imgHeight = (contentHeight / 2 * 0.75); //内容图片这里不需要留白的距离
  //           console.log("生成pdf");
  //           let pdf = new JsPDF('', 'pt', [pdfWidth, pdfHeight]);
  //           console.log("pdf已生成");
  //           pdf.addImage(pageData, 'jpeg', 0, 0, imgWidth, imgHeight);
  //           console.log("pdf添加图片");
  //           //debugger
  //           // var datauri = pdf.output('dataurlstring');
  //           //调用
            
  //           var blob = that.dataURLtoBlob(pageData);
  //           var file = that.blobToFile(blob, "contract_path_file");
  //           console.log(file);
              // let param = new FormData();
              //         param.append("api_token",that.$store.state.global.api_token);
              //         // param.append("house_id",that.house_id);
              //         param.append("order_id",that.$store.state.locale.contractId);
              //         param.append("file",file1);
              //         let config = {
              //           headers:{'Content-Type':'multipart/form-data'}
              //         }; 
              //         that.$http.post(that.$store.state.global.baseUrl + 'user/sign_post', param, config).then(res => {
              //           //debugger
              //           console.log(file);
              //           that.tipsshow=false;
              //           if(res.status == 200) {
              //             if(res.data.code == 200){
              //               console.log("合同上传成功！");
              //               // that.$toast("恭喜您！您的房源已上架推广，同时会有工作人员联系您实地查勘。");
              //               // 跳转到
              //               that.status="end";
              //               that.tips="恭喜您！合同签约成功，1-2个工作日会有工作人员联系您!"
              //             }else{
              //               that.$toast(res.data.msg);
              //             }
              //           }else{
              //             console.log("合同上传失败！");
              //             that.$toast("合同上传失败！");
              //             that.tipsshow=false;
              //             return;
              //           }
              //         });            
  //          // pdf.save(title + '.pdf');  
  //       })
  //     },
      submitSign(){
      var that = this;  
      that.tipsshow=true;     
      var blob = that.dataURLtoBlob(this.signatureImg);
      var file = that.blobToFile(blob, "contract_path_file");
      console.log(file);
      let param = new FormData();
      param.append("api_token",that.$store.state.global.api_token);
      // param.append("house_id",that.house_id);
      param.append("order_id",that.$store.state.locale.contractId);
      param.append("file",file);
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      }; 
      that.$http.post(that.$store.state.global.baseUrl + 'user/sign_post', param, config).then(res => {
        //debugger
        console.log(file);
        that.tipsshow=false;
        if(res.status == 200) {
          if(res.data.code == 200){
            console.log("合同上传成功！");
            // that.$toast("恭喜您！您的房源已上架推广，同时会有工作人员联系您实地查勘。");
            // 跳转到
            that.status="end";
            that.tips="恭喜您！合同签约成功，1-2个工作日会有工作人员联系您!"
            that.tipsshow=false; 
          }else{
            that.$toast(res.data.msg);
            that.tipsshow=false; 
          }
        }else{
          console.log("合同上传失败！");
          that.$toast("合同上传失败！");          
          that.tipsshow=false;
          return;
        }
      });            

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
    },
    updated () {
      if(this.signTest){
        this.draw();
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
.cavas{border:1px solid #ccc;width:90%; margin:0.5rem auto;}
.contactMain{
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
.logo-parent{position:relative;}
.signature-area{ height:1.6rem;}
/deep/.signature-area img{height:1.6rem; max-width:100%;}
.mihua-logo{
    position: absolute;
    width: 4rem;
    height: 4rem;
    top: -0.5rem;
    left: -0.5rem;
    background-image: url("../../../assets/img/entrust/mihua-logo.png");
    background-repeat: no-repeat;
    background-size: cover; 
  }
 .listConter img{width:22%;margin:2.5rem auto 0.4rem auto;}
  .tips{text-align: center; color:#666; font-size: 0.5rem; width:80%;margin:0 auto;}
 .cancvas-btn button{
      margin-bottom: 20px;
      font-size: 0.4rem;
      padding: 0 0.4rem;
      line-height: 0.8rem;
      height: 0.8rem;
  }
</style>