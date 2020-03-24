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
import HouseSourceCenter from '@/modules/renting/HouseSourceCenter'
import HouseDetail from '@/modules/renting/HouseDetail'
import ConfirmRentInfo from '@/modules/renting/ConfirmRentInfo'
import SalesLogin from '@/modules/locale/SalesLogin'
import EntrustHouseSource from '@/modules/locale/EntrustHouseSource'
import EntrustHouseInfo from '@/modules/locale/EntrustHouseInfo'
import EditHouseInfo from '@/modules/locale/EditHouseInfo'
import Advice from '@/modules/user/Advice'
import Bank from '@/modules/user/Bank'
import EditBank from '@/modules/user/EditBank'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'NoLogin',
            component: NoLogin,
            meta: {
                title: '首页',
                showHeader: false,
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
        }
    ]
})