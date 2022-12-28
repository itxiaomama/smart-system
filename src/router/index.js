import Vue from 'vue'
import store from '../store'
// import { Message } from 'element-ui'
import VueRouter from 'vue-router'
// 登录首页
import Login from '@/views/Mylogin'
import Home from '@/views/MyHome'
import Tenant from '../menus/tenant/tenant/TheTenant'
// 园区管理
import BCarden from '../menus/bench/garden/BenchGarden'
import GArea from '../menus/garden/area/GardenArea'
import GBuild from '../menus/garden/build/GardenBuild'
import GList from '../menus/garden/list/GardenList'
import GStall from '../menus/garden/stall/GardenStall'
import GRoom from '../menus/garden/room/GardenRoom'
// 入驻管理
import EPack from '../menus/enter/pack/EnterPack'
import EInto from '../menus/enter/into/EnterInto'
import EEnter from '../menus/enter/enter/EnterEnter'
import EFirm from '../menus/enter/firm/EnterFirm'
// 物业管理
import RActivity from '../menus/real/activity/RealActivity'
import RActivitypush from '../menus/real/activity/RealActivityPush'
import RActivityedit from '../menus/real/activity/RealActivityEdit'
import RCar from '../menus/real/car/RealCar'
import RCarpush from '../menus/real/car/RealCarPush'
import RCaredit from '../menus/real/car/RealCarEdit'
import RComplaint from '../menus/real/complaint/RealComplaint'
import RComplaintdetail from '../menus/real/complaint/RealComplaintDetail'
import RConpany from '../menus/real/conpany/RealConpany'
import RConpanypush from '../menus/real/conpany/RealConpanyPush'
import RConpanyedit from '../menus/real/conpany/RealConpanyEdit'
import RFacility from '../menus/real/facility/RealFacility'
import RInform from '../menus/real/inform/RealInform'
import RInformchat from '../menus/real/inform/RealInformChat'
import RInformchath from '../menus/real/inform/RealInformChatHouse'
import RInformchats from '../menus/real/inform/RealInformChatShop'
import RInformnote from '../menus/real/inform/RealInformNote'
import RInformnoteh from '../menus/real/inform/RealInformNoteHouse'
import RInformnotes from '../menus/real/inform/RealInformNoteShop'
import RInformsend from '../menus/real/inform/RealInformSend'
import RInformread from '../menus/real/inform/RealInformRead'
import RMatter from '../menus/real/matter/RealMatter'
import RMatterdetail from '../menus/real/matter/RealMatterDetail'
import RNews from '../menus/real/news/RealNews'
import RNewsadd from '../menus/real/news/RealNewsAdd'
import RNewsread from '../menus/real/news/RealNewsRead'
import RNewsedit from '../menus/real/news/RealNewsEdit'
import ROfforest from '../menus/real/offorest/RealOfforest'
import ROfforestlpush from '../menus/real/offorest/RealOfforestGreenPush'
import ROfforestledit from '../menus/real/offorest/RealOfforestGreenEdit'
import ROfforestbpush from '../menus/real/offorest/RealOfforestCleanPush'
import ROfforestbedit from '../menus/real/offorest/RealOfforestCleanEdit'
import ROfforestllog from '../menus/real/offorest/RealOfforestGreenLog'
import ROfforestblog from '../menus/real/offorest/RealOfforestCleanLog'
import RStop from '../menus/real/stop/RealStop'
import RVisitor from '../menus/real/visitor/RealVisitor'
import RPatorl from '../menus/real/patorl/RealPatorl'
// 招商管理
import JClue from '../menus/join/clue/JoinClue'
import JCluepush from '../menus/join/clue/JoinCluePush'
import JCluedetail from '../menus/join/clue/JoinClueDetail'
import JCluedetailtest from '../menus/join/clue/JoinClueDetailTest'
import JFollow from '../menus/join/follow/JoinFollow'
import JAllot from '../menus/join/allot/JoinAllot'
import JAllotdetail from '../menus/join/allot/JoinAllotDetail'
import JAllotdetailspace from '../menus/join/allot/JoinAllotDetailSpace'
import JAllotdetailtest from '../menus/join/allot/JoinAllotDetailTest'
import JMine from '../menus/join/mine/JoinMine'
import JMinedetail from '../menus/join/mine/JoinMineDetail'
import JMinedetailspace from '../menus/join/mine/JoinMineDetailSpace'
import JMinedetailtest from '../menus/join/mine/JoinMineDetailTest'
import JClient from '../menus/join/client/JoinClient'
import JClientpush from '../menus/join/client/JoinClientPush'
import JClientedit from '../menus/join/client/JoinClientEdit'
// 合同管理
import PCharge from '../menus/pact/charge/P_Charge'
import PIntention from '../menus/pact/intention/P_Intention'
import PIntentiondetail from '../menus/pact/intention/P_Intentiondetail'
import PIntentionpush from '../menus/pact/intention/P_Intentionpush'
import PIntentionpusht from '../menus/pact/intention/P_Intentionpusht'
import PIntentionpushf from '../menus/pact/intention/P_Intentionpushf'
import PIntentionedit from '../menus/pact/intention/P_Intentionedit'
import PIntentioneditt from '../menus/pact/intention/P_Intentioneditt'
import PIntentioneditf from '../menus/pact/intention/P_Intentioneditf'
import PPact from '../menus/pact/pact/P_Pact'
import PPactdetail from '../menus/pact/pact/P_Pactdetail'
import PPactpush from '../menus/pact/pact/P_Pactpush'
import PPactpusht from '../menus/pact/pact/P_Pactpusht'
import PPactpushf from '../menus/pact/pact/P_Pactpushf'
import PPactedit from '../menus/pact/pact/P_Pactedit'
import PPacteditt from '../menus/pact/pact/P_Pacteditt'
import PPacteditf from '../menus/pact/pact/P_Pacteditf'
import PExamine from '../menus/pact/examine/P_Examine'
import PChange from '../menus/pact/change/P_Change'
import PChangepush from '../menus/pact/change/P_Changepush'
import PLease from '../menus/pact/lease/P_Lease'
import PLeasepush from '../menus/pact/lease/P_Leasepush'
import PLeasedetail from '../menus/pact/lease/P_Leasedetail'
// 企业服务
import FBanner from '../menus/firm/banner/FirmBanner'
import FMobile from '../menus/firm/mobile/FirmMobile'
import FOrder from '../menus/firm/order/FirmOrder'
import FServe from '../menus/firm/serve/FirmServe'
import FSubblier from '../menus/firm/subblier/FirmSubblier'
// 费用管理
import CBill from '../menus/cost/bill/CostBill'
import CReport from '../menus/cost/report/CostReport'
// 系统管理
import SDepactment from '../menus/system/depactment/SystemDepactment'
import SLine from '../menus/system/line/SystemLine'
import SMenu from '../menus/system/menu/SystemMenu'
import SRegist from '../menus/system/regist/SystemRegist'
import SRole from '../menus/system/role/SystemRole'
import SSettime from '../menus/system/settime/SystemSettime'
import SUser from '../menus/system/user/SystemUser'
import SOperation from '../menus/system/operation/SystemOperation'


Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: 'login' },
  {
    path: '/login',
    name: '登录',
    meta: {
      show: false,
      title: '登录'
    },
    component: () => import('@/views/Mylogin')
  },
  {
    path: '',
    meta: {
      title: '驾驶舱',
      show: true
    },
    component: Home,
    children: [
      {
        path: '',
        meta: {
          title: '首页',
          show: true
        },
        component: () => import('../menus/bench/garden/BenchGarden')
      }
    ]
  },
  {
    path: '/tenant',
    meta: {
      title: '租户管理',
      show: true
    },
    component: Home,
    children: [
      {
        path: '',
        meta: {
          title: '租户管理',
          show: true
        },
        component: () => import('../menus/tenant/tenant/TheTenant')
      }
    ]
  },
  {
    path: '/park',
    meta: {
      title: '园区管理',
      show: true
    },
    component: Home,
    redirect: '/park/list',
    children: [
      {
        path: 'list',
        meta: {
          title: '园区列表',
          show: true
        },
        component: () => import('../menus/garden/list/GardenList')
      },
      {
        path: 'area',
        meta: {
          title: '区域管理',
          show: true
        },
        component: () => import('../menus/garden/area/GardenArea')
      },
      {
        path: 'build',
        meta: {
          title: '楼宇管理',
          show: true
        },
        component: () => import('../menus/garden/build/GardenBuild')
      },
      {
        path: 'room',
        meta: {
          title: '房间管理',
          show: true
        },
        component: () => import('../menus/garden/room/GardenRoom')
      },
      {
        path: 'stall',
        meta: {
          title: '车位管理',
          show: true
        },
        component: () => import('../menus/garden/stall/GardenStall')
      },
    ]
  },
  {
    path: '/settlement',
    meta: {
      title: '入驻管理',
      show: true
    },
    redirect: '/settlement/pack',
    component: Home,
    children: [
      {
        path: 'pack',
        meta: {
          title: '入园申请',
          show: true
        },
        component: () => import('../menus/enter/pack/EnterPack')
      },
      {
        path: 'enter',
        meta: {
          title: '入驻申请',
          show: true
        },
        component: () => import('../menus/enter/enter/EnterEnter')
      },
      {
        path: 'into',
        meta: {
          title: '迁入申请',
          show: true
        },
        component: () => import('../menus/enter/into/EnterInto')
      },
      {
        path: 'firm',
        meta: {
          title: '入驻企业',
          show: true
        },
        component: () => import('../menus/enter/firm/EnterFirm')
      }
    ]
  },
  {
    path: '/property',
    meta: {
      title: '物业管理',
      show: true
    },
    redirect: '/property/inform',
    component: Home,
    children: [
      {
        path: 'inform',
        meta: {
          title: '物业通知',
          show: true
        },
        component: () => import('../menus/real/inform/RealInform')
      },
      {
        path: 'informdetail',
        meta: {
          title: '物业详情',
          show: false
        },
        component: () => import('../menus/real/inform/RealInformChat')
      },
      {
        path: 'messdetail',
        meta: {
          title: '物业详情',
          show: false
        },
        component: () => import('../menus/real/inform/RealInformNote')
      },
      {
        path: 'senddetail',
        meta: {
          title: '发送记录',
          show: false
        },
        component: () => import('../menus/real/inform/RealInformSend')
      },
      {
        path: 'readdetail',
        meta: {
          title: '阅读记录',
          show: false
        },
        component: () => import('../menus/real/inform/RealInformRead')
      },
      {
        path: 'news',
        meta: {
          title: '政策资讯',
          show: true
        },
        component: () => import('../menus/real/news/RealNews')
      },
      {
        path: 'newsdetail',
        meta: {
          title: '政策资讯详情',
          show: false
        },
        component: () => import('../menus/real/news/RealNewsAdd')
      },
      {
        path: 'newsread',
        meta: {
          title: '阅读记录',
          show: false
        },
        component: () => import('../menus/real/news/RealNewsRead')
      },
      {
        path: 'activity',
        meta: {
          title: '活动管理',
          show: true
        },
        component: () => import('../menus/real/activity/RealActivity')
      },
      {
        path: 'activitydetail',
        meta: {
          title: '活动详情',
          show: false
        },
        component: () => import('../menus/real/activity/RealActivityPush')
      },
      {
        path: 'detaillist',
        meta: {
          title: '活动报名',
          show: false
        },
        component: () => import('../menus/real/activity/detaillist.vue')
      },
      {
        path: 'matter',
        meta: {
          title: '报事报修',
          show: true
        },
        component: () => import('../menus/real/matter/RealMatter')
      },
      {
        path: 'matterdetail',
        meta: {
          title: '报事报修详情',
          show: false
        },
        component: () => import('../menus/real/matter/RealMatterDetail')
      },
      {
        path: 'complaint',
        meta: {
          title: '投诉建议',
          show: true
        },
        component: () => import('../menus/real/complaint/RealComplaint')
      },
      {
        path: 'complaintdetail',
        meta: {
          title: '投诉建议详情',
          show: false
        },
        component: () => import('../menus/real/complaint/RealComplaintDetail')
      },
      {
        path: 'company',
        meta: {
          title: '企业装修',
          show: true
        },
        component: () => import('../menus/real/conpany/RealConpany')
      },
      {
        path: 'companydetail',
        meta: {
          title: '企业装修详情',
          show: false
        },
        component: () => import('../menus/real/conpany/RealConpanyPush')
      },
      {
        path: 'offorest',
        meta: {
          title: '绿化保洁',
          show: true
        },
        component: () => import('../menus/real/offorest/RealOfforest')
      },
      {
        path: 'offorestdetail',
        meta: {
          title: '绿化保洁详情',
          show: false
        },
        component: () => import('../menus/real/offorest/RealOfforestGreenPush')
      },
      {
        path: 'cleanlog',
        meta: {
          title: '绿化记录',
          show: false
        },
        component: () => import('../menus/real/offorest/RealOfforestGreenLog')
      },
      {
        path: 'arrangedetail',
        meta: {
          title: '保洁详情',
          show: false
        },
        component: () => import('../menus/real/offorest/RealOfforestCleanPush')
      },
      {
        path: 'arrangelog',
        meta: {
          title: '安排记录',
          show: false
        },
        component: () => import('../menus/real/offorest/RealOfforestCleanLog')
      },
      {
        path: 'facility',
        meta: {
          title: '设备管理',
          show: true
        },
        component: () => import('../menus/real/facility/RealFacility')
      },
      {
        path: 'patrol',
        meta: {
          title: '巡防管理',
          show: true
        },
        component: () => import('../menus/real/patorl/RealPatorl')
      },
      {
        path: 'vistior',
        meta: {
          title: '访客管理',
          show: true
        },
        component: () => import('../menus/real/visitor/RealVisitor')
      },
      {
        path: 'car',
        meta: {
          title: '车辆管理',
          show: true
        },
        component: () => import('../menus/real/car/RealCar')
      },
      {
        path: 'cardetail',
        meta: {
          title: '车辆详情',
          show: false
        },
        component: () => import('../menus/real/car/RealCarPush')
      },
      {
        path: 'stop',
        meta: {
          title: '停车交费',
          show: true
        },
        component: () => import('../menus/real/stop/RealStop')
      },
    ]
  },
  {
    path: '/merchants',
    meta: {
      title: '招商管理',
      show: true
    },
    redirect: '/merchants/club',
    component: Home,
    children: [
      {
        path: 'club',
        meta: {
          title: '线索管理',
          show: true
        },
        component: () => import('../menus/join/clue/JoinClue')
      },
      {
        path: 'clubdetail',
        meta: {
          title: '操作',
          show: false
        },
        component: () => import('../menus/join/clue/JoinCluePush')
      },
      {
        path: 'clubdetailfollow',
        meta: {
          title: '线索详情',
          show: false
        },
        component: () => import('../menus/join/clue/JoinClueDetailTest')
      },
      {
        path: 'clubdetail1',
        meta: {
          title: '线索跟进',
          show: false
        },
        component: () => import('../menus/join/clue/JoinClueDetail')
      },
      {
        path: 'follow',
        meta: {
          title: '线索跟进',
          show: true
        },
        component: () => import('../menus/join/follow/JoinFollow')
      },
      {
        path: 'allot',
        meta: {
          title: '线索分派',
          show: true
        },
        component: () => import('../menus/join/allot/JoinAllot')
      },
      {
        path: 'clientdetail',
        meta: {
          title: '客户详情',
          show: false
        },
        component: () => import('../menus/join/client/JoinClientPush')
      },
      {
        path:'mine',
        meta:{
          title:'我的线索',
          show:true
        },
        component:() => import('../menus/join/mine/JoinMine')
      },
      {
        path: 'customer',
        meta: {
          title: '客户管理',
          show: true
        },
        component: () => import('../menus/join/client/JoinClient')
      },
    ]
  },
  {
    path: '/contract',
    meta: {
      title: '合同管理',
      show: true
    },
    component: Home,
    redirect: '/contract/charge',
    children: [
      {
        path: 'charge',
        meta: {
          title: '收费配置',
          show: true
        },
        component: () => import('../menus/pact/charge/P_Charge')
      },
      {
        path: 'intention',
        meta: {
          title: '意向合同',
          show: true
        },
        component: () => import('../menus/pact/intention/P_Intention')
      },
      {
        path: 'intentioncon',
        meta: {
          title: '意向合同',
          show: true
        },
        component: () => import('../menus/pact/intention/P_Intentiondetail.vue')
      },
      {
        path: 'intentiondetail',
        meta: {
          title: '意向合同详情',
          show: false
        },
        component: () => import('../menus/pact/intention/P_Intentionpush')
      },
      {
        path: 'intentiondetail1',
        meta: {
          title: '下一步',
          show: false
        },
        component: () => import('../menus/pact/intention/P_Intentionpusht')
      },
      {
        path: 'intentiondetail2',
        meta: {
          title: '提交',
          show: false
        },
        component: () => import('../menus/pact/intention/P_Intentionpushf')
      },
      {
        path: 'pact',
        meta: {
          title: '合同管理',
          show: true
        },
        component: () => import('../menus/pact/pact/P_Pact')
      },
      {
         path: 'pactdetail',
        meta: {
          title: '合同详情',
          show: true
        },
        component: () => import('../menus/pact/pact/P_Pactpush')
      },
      {
        path: 'pactdetail1',
        meta: {
          title: '合同详情',
          show: true
        },
        component: () => import('../menus/pact/pact/P_Pactpusht.vue')
      },
      {
        path: 'pactdetail2',
        meta: {
          title: '合同详情',
          show: true
        },
        component: () => import('../menus/pact/pact/P_Pactpushf.vue')
      },
      {
        path: 'kdetail',  
        meta: {
          title: '合同详情',
          show: true
        },
        component: () => import('../menus/pact/pact/P_Pactdetail')
      },
      {
        path: 'generateBill',
        meta: {
          title: '账单修改',
          show: false
        },
        component: () => import('../menus/pact/pact/generatebill.vue')
      },
      {
        path: 'examine',
        meta: {
          title: '合同审批',
          show: true
        },
        component: () => import('../menus/pact/examine/P_Examine')
      },
      {
        path: 'change',
        meta: {
          title: '合同变更',
          show: true
        },
        component: () => import('../menus/pact/change/P_Change')
      },
      {
        path: 'modify',
        meta: {
          title: '合同变更',
          show: false
        },
        component: () => import('../menus/pact/change/modify.vue')
      },
      {
        path: 'modify1',
        meta: {
          title: '合同变更',
          show: false
        },
        component: () => import('../menus/pact/change/modify1.vue')
      },
      {
        path: 'withoutany',
        meta: {
          title: '退租',
          show: false
        },
        component: () => import('../menus/pact/change/P_Changepush')
      },
      {
        path: 'without',
        meta: {
          title: '退租管理',
          show: true
        },
        component: () => import('../menus/pact/lease/P_Lease')
      },
      {
        path: 'withoutedit',
        meta: {
          title: '退租编辑',
          show: false
        },
        component: () => import('../menus/pact/lease/P_Leasepush')
      },
      {
        path: 'withoutdetail',
        meta: {
          title: '退租详情',
          show: false
        },
        component: () => import('../menus/pact/lease/P_Leasedetail')
      },
        {
          path: 'bill',
          meta: {
            title: '账单管理',
            show: true
          },
          component: () => import('../menus/cost/bill/CostBill')
        },
        {
          path: 'report',
          meta: {
            title: '账单报表',
            show: true
          },
          component: () => import('../menus/cost/report/CostReport')
        },
    ]
  },
  {
    path: '/enterprise',
    meta: {
      title: '企业服务',
      show: true
    },
    redirect: '/enterprise/subblier',
    component: Home,
    children: [
      {
        path: 'subblier',
        meta: {
          title: '供应商管理',
          show: true
        },
        component: () => import('../menus/firm/subblier/FirmSubblier')
      },
      {
        path: 'mobile',
        meta: {
          title: '菜单管理',
          show: true
        },
        component: () => import('../menus/firm/mobile/FirmMobile')
      },
      {
        path: 'banner',
        meta: {
          title: 'banner管理',
          show: true
        },
        component: () => import('../menus/firm/banner/FirmBanner')
      },
      {
        path: 'serve',
        meta: {
          title: '服务管理',
          show: true
        },
        component: () => import('../menus/firm/serve/FirmServe')
      },
      {
        path: 'order',
        meta: {
          title: '订单管理',
          show: true
        },
        component: () => import('../menus/firm/order/FirmOrder')
      },
    ]
  },
  {
    path: '/cost',
    meta: {
      title: '费用管理',
      show: true
    },
    component: Home,
    redirect: '/cost/bill',
    children: [
      {
        path: 'bill',
        meta: {
          title: '账单管理',
          show: true
        },
        component: () => import('../menus/cost/bill/CostBill')
      },
      {
        path: 'report',
        meta: {
          title: '账单报表',
          show: true
        },
        component: () => import('../menus/cost/report/CostReport')
      },
    ]
  },
  {
    path: '/system',
    meta: {
      title: '系统管理',
      show: true
    },
    component: Home,
    redirect: '/system/user',
    children: [
      {
        path: 'user',
        meta: {
          title: '用户管理',
          show: true
        },
        component: () => import('../menus/system/user/SystemUser')
      },
      {
        path: 'role',
        meta: {
          title: '角色管理',
          show: true
        },
        component: () => import('../menus/system/role/SystemRole')
      },
      {
        path: 'menu',
        meta: {
          title: '菜单管理',
          show: true
        },
        component: () => import('../menus/system/menu/SystemMenu')
      },
      {
        path: 'department',
        meta: {
          title: '部门管理',
          show: true
        },
        component: () => import('../menus/system/depactment/SystemDepactment')
      },
      {
        path: 'config',
        meta: {
          title: '配置管理',
          show: true
        },
        component: () => import('../menus/system/config/index.vue')
      },
      {
        path: 'line',
        meta: {
          title: '在线用户',
          show: true
        },
        component: () => import('../menus/system/line/SystemLine')
      },
      {
        path: 'settime',
        meta: {
          title: '定时任务',
          show: true
        },
        component: () => import('../menus/system/settime/SystemSettime')
      },
      {
        path: 'operate',
        meta: {
          title: '操作日志',
          show: true
        },
        component: () => import('../menus/system/operation/SystemOperation')
      },
      {
        path: 'login',
        meta: {
          title: '登录日志',
          show: true
        },
        component: () => import('../menus/system/regist/SystemRegist')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})
// router.beforeEach((to, from, next) => {
//   console.log(store.state.token)
//   const token = store.state.token;
//   if (token || JSON.parse(sessionStorage.getItem('store')).token) {
//     next()
//   } else {
//     next('/login')
//   }
// })

export default router
