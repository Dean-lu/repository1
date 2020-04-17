import Vue from 'vue'
import Router from 'vue-router'
import NoLogin from '@/modules/home/NoLogin'
import HomePage from '@/modules/home/HomePage'
import Mine from '@/modules/mine/Mine'
import Login from '@/modules/user/Login'
import Register from '@/modules/user/Register'
import RegisterSuc from '@/modules/user/RegisterSuc'
import ResetPassword from '@/modules/user/ResetPassword'
import HouseInfoInput from '@/modules/entrust/HouseInfoInput'
import HouseInfoConfirm from '@/modules/entrust/HouseInfoConfirm'
import ConfirmSuccess from '@/modules/entrust/ConfirmSuccess'
import HouseSourceCenter from '@/modules/renting/HouseSourceCenter'
import HouseDetail from '@/modules/renting/HouseDetail'
import ConfirmRentInfo from '@/modules/renting/ConfirmRentInfo'
import AuditRemind from '@/modules/renting/AuditRemind'
import SalesLogin from '@/modules/locale/SalesLogin'
import EntrustHouseSource from '@/modules/locale/EntrustHouseSource'
import EntrustHouseInfo from '@/modules/locale/EntrustHouseInfo'
import EditHouseInfo from '@/modules/locale/EditHouseInfo'
import Advice from '@/modules/user/Advice'
import Bank from '@/modules/user/Bank'
import EditBank from '@/modules/user/EditBank'
import Spread from '@/modules/user/Spread'
import Qrcode from '@/modules/user/Qrcode'
import Enstuctlist from '@/modules/user/Enstuctlist'
import Rentlist from '@/modules/user/Rentlist'
import RentDetail from '@/modules/user/RentDetail'
import Draw from '@/modules/user/Draw'
import MyEntrust from '@/modules/user/MyEntrust'
import EditEntrust from '@/modules/user/EditEntrust'
import LookEntrust from '@/modules/user/LookEntrust'
import MyContract from '@/modules/user/MyContract'
import HouseBag from '@/modules/user/contract/HouseBagList'
import HouseContact from '@/modules/user/contract/HouseContact'
import HouseUseContact from '@/modules/user/contract/HouseUseContact'
import EditContract from '@/modules/user/contract/EditContract'
import updateLoginPass from '@/modules/user/updateLoginPass'
import updatePayPass from '@/modules/user/updatePayPass'
import myInfo from '@/modules/user/MyInfo'
import More from '@/modules/home/More'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HomePage',
            component: HomePage,
            meta: {
                title: '首页',
                showHeader: false,
                footerActive: 0
            }
        },
        {
            path: '/noLogin',
            name: 'NoLogin',
            component: NoLogin,
            meta: {
                title: '首页',
                showHeader: false,
            }
        },
        {
            path: '/home',
            name: 'HomePage',
            component: HomePage,
            meta: {
                title: '首页',
                showHeader: false,
                footerActive: 0
            }
        },
        {
            path: '/mine',
            name: 'Mine',
            component: Mine,
            meta: {
                title: '个人中心',
                showHeader: false,
                footerActive: 1
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                title: '登录',
                showHeader: false
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                title: '注册',
                showHeader: true
            }
        },
        {
            path: '/registerSuc',
            name: 'RegisterSuc',
            component: RegisterSuc,
            meta: {
                title: '注册成功',
                showHeader: true
            }
        },
        {
            path: '/resetPassword',
            name: 'ResetPassword',
            component: ResetPassword,
            meta: {
                title: '密码重置',
                showHeader: true
            }
        },
        {
            path: '/more',
            name: 'more',
            component: More,
            meta: {
                title: '联系我们',
                showHeader: true
            }
        },
        {
            path: '/houseInfoInput',
            name: 'HouseInfoInput',
            component: HouseInfoInput,
            meta: {
                title: '房源信息录入',
                showHeader: true
            }
        },
        {
            path: '/houseInfoConfirm',
            name: 'HouseInfoConfirm',
            component: HouseInfoConfirm,
            meta: {
                title: '房源信息确认',
                showHeader: true
            }
        },{
          path: '/confirmSuccess',
          name: 'ConfirmSuccess',
          component: ConfirmSuccess,
          meta:{
            title: '我要委托-签约成功',
            showHeader: false
          }
        },
        {
            path: '/houseSourceCenter',
            name: 'HouseSourceCenter',
            component: HouseSourceCenter,
            meta: {
                title: '房源中心',
                showHeader: true
            }
        },
        {
            path: '/houseDetail',
            name: 'HouseDetail',
            component: HouseDetail,
            meta: {
                showHeader: false
            }
        },
        {
            path: '/confirmRentInfo',
            name: 'ConfirmRentInfo',
            component: ConfirmRentInfo,
            meta: {
                showHeader: false
            }
        },
        {
            path: '/salesLogin',
            name: 'SalesLogin',
            component: SalesLogin,
            meta: {
                title: '业务员登录',
                showHeader: true
            }
        },
        {
            path: '/entrustHouseSource',
            name: 'EntrustHouseSource',
            component: EntrustHouseSource,
            meta: {
                title: '委托房源',
                showHeader: true
            }
        },
        {
            path: '/entrustHouseInfo',
            name: 'EntrustHouseInfo',
            component: EntrustHouseInfo,
            meta: {
                title: '房源信息',
                showHeader: true
            }
        },
        {
            path: '/editHouseInfo',
            name: 'EditHouseInfo',
            component: EditHouseInfo,
            meta: {
                title: '房源信息编辑',
                showHeader: true
            }
        },
        {
            
            path: '/myentrust',
            name: 'MyEntrust',
            component: MyEntrust,
            meta: {
                title: '我的委托',
                showHeader: true
            }
        },
        {
            path: '/editentrust',
            name: 'EditEntrust',
            component: EditEntrust,
            meta: {
                title: '我的委托编辑',
                showHeader: true
            }
        },
        {
            path: '/lookentrust',
            name: 'LookEntrust',
            component: LookEntrust,
            meta: {
                title: '我的委托编辑',
                showHeader: true
            }
        },
        {
            path: '/mycontract',
            name: 'MyContract',
            component: MyContract,
            meta: {
                title: '我的合同',
                showHeader: true
            }
        }, 
        {
            path: '/editcontract',
            name: 'EditContract',
            component: EditContract,
            meta: {
                title: '我的合同编辑',
                showHeader: true
            }
        },       
        {
            path: '/housecontact',
            name: 'HouseContact',
            component: HouseContact,
            meta: {
                title: '房屋出租服务合同',
                showHeader: true
            }
        },
        {
            path: '/houseusecontact',
            name: 'HouseUseContact',
            component: HouseUseContact,
            meta: {
                title: '房屋使用合同',
                showHeader: true
            }
        },
        {
            path: '/housebag',
            name: 'HouseBag',
            component: HouseBag,
            meta: {
                title: '房屋清单',
                showHeader: true
            }
        },
        {
            path: '/advice',
            name: 'Advice',
            component: Advice,
            meta: {
                title: '投诉建议',
                showHeader: true
            }
        },
        {
            path: '/bank',
            name: 'Bank',
            component: Bank,
            meta: {
                title: '我的银行卡',
                showHeader: true
            }
        },
        {
            path: '/editbank',
            name: 'EditBank',
            component: EditBank,
            meta: {
                title: '编辑银行卡',
                showHeader: true
            }
        },
        {
            path: '/spread',
            name: 'Spread',
            component: Spread,
            meta: {
                title: '推广赚钱',
                showHeader: true
            }
        },
        {
            path: '/qrcode',
            name: 'Qrcode',
            component: Qrcode,
            meta: {
                title: '我的二维码',
                showHeader: true
            }
        },
        {
            path: '/enstuctlist',
            name: 'Enstuctlist',
            component: Enstuctlist,
            meta: {
                title: '委托推荐',
                showHeader: true
            }
        },
        {
            path: '/rentlist',
            name: 'Rentlist',
            component: Rentlist,
            meta: {
                title: '出租推荐',
                showHeader: true
            }
        },
        {
            path: '/rentDetail',
            name: 'RentDetail',
            component: RentDetail,
            meta: {
                title: '出租详情',
                showHeader: true
            }
        },
        {
            path: '/draw',
            name: 'Draw',
            component: Draw,
            meta: {
                title: '我要提现',
                showHeader: true
            }
        },
        {
            path: '/updateloginPass',
            name: 'updateLoginPass',
            component: updateLoginPass,
            meta: {
                title: '修改登录密码',
                showHeader: true
            }
        },
        {
            path: '/updatepayPass',
            name: 'updatePayPass',
            component: updatePayPass,
            meta: {
                title: '修改支付密码',
                showHeader: true
            }
        },
        {
            path: '/myInfo',
            name: 'myInfo',
            component: myInfo,
            meta: {
                title: '完善个人信息',
                showHeader: true
            }
        },
        {
          path: '/auditRemind',
          name: 'AuditRemind',
          component: AuditRemind,
          meta:{
            title: '租房提交审核确认页',
            showHeader: false
          }
        }
    ]
})
