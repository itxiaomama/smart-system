import Vue from 'vue'
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
  { path: '/', redirect: 'login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    meta: { requiresAuth: true },
    children: [
      // 园区管理
      { path: 'tenant', component: Tenant },
      { path: 'Bcarden', component: BCarden },
      { path: 'Glist', component: GList },
      { path: 'Garea', component: GArea },
      { path: 'Gbuild', component: GBuild },
      { path: 'Groom', component: GRoom },
      { path: 'Gstall', component: GStall },
      // 入驻管理
      { path: 'Epack', component: EPack },
      { path: 'Einto', component: EInto },
      { path: 'Eenter', component: EEnter },
      { path: 'Efirm', component: EFirm },
      // 物业管理
      { path: 'Ractivity', component: RActivity },
      { path: 'Ractivitypush', component: RActivitypush },
      { path: 'Ractivityedit', component: RActivityedit },
      { path: 'Rcar', component: RCar },
      { path: 'Rcarpush', component: RCarpush },
      { path: 'Rcaredit', component: RCaredit },
      { path: 'Rcomplaint', component: RComplaint },
      { path: 'Rcomplaintdetail', component: RComplaintdetail },
      { path: 'Rconpany', component: RConpany },
      { path: 'Rconpanypush', component: RConpanypush },
      { path: 'Rconpanyedit', component: RConpanyedit },
      { path: 'Rfacility', component: RFacility },
      { path: 'Rinform', component: RInform },
      { path: 'Rinformchat', component: RInformchat },
      { path: 'Rinformchath', component: RInformchath },
      { path: 'Rinformchats', component: RInformchats },
      { path: 'Rinformnote', component: RInformnote },
      { path: 'Rinformnoteh', component: RInformnoteh },
      { path: 'Rinformnotes', component: RInformnotes },
      { path: 'Rinformsend', component: RInformsend },
      { path: 'Rinformread', component: RInformread },
      { path: 'Rmatter', component: RMatter },
      { path: 'Rmatterdetail', component: RMatterdetail },
      { path: 'Rnews', component: RNews },
      { path: 'Rnewsadd', component: RNewsadd },
      { path: 'Rnewsread', component: RNewsread },
      { path: 'Rnewsedit', component: RNewsedit },
      { path: 'Rofforest', component: ROfforest },
      { path: 'Rofforestlpush', component: ROfforestlpush },
      { path: 'Rofforestledit', component: ROfforestledit },
      { path: 'ROfforestbpush', component: ROfforestbpush },
      { path: 'Rofforestbedit', component: ROfforestbedit },
      { path: 'Rofforestllog', component: ROfforestllog },
      { path: 'Rofforestblog', component: ROfforestblog },
      { path: 'Rstop', component: RStop },
      { path: 'Rvisitor', component: RVisitor },
      { path: 'Rpatorl', component: RPatorl },
      // 招商管理
      { path: 'Jclue', component: JClue },
      { path: 'Jcluepush', component: JCluepush },
      { path: 'Jcluedetail', component: JCluedetail },
      { path: 'Jcluedetailtest', component: JCluedetailtest },
      { path: 'Jfollow', component: JFollow },
      { path: 'Jallot', component: JAllot },
      { path: 'Jallotdetail', component: JAllotdetail },
      { path: 'Jallotdetailspace', component: JAllotdetailspace },
      { path: 'Jallotdetailtest', component: JAllotdetailtest },
      { path: 'Jmine', component: JMine },
      { path: 'Jminedetail', component: JMinedetail },
      { path: 'Jminedetailspace', component: JMinedetailspace },
      { path: 'Jminedetailtest', component: JMinedetailtest },
      { path: 'Jclient', component: JClient },
      { path: 'Jclientpush', component: JClientpush },
      { path: 'Jclientedit', component: JClientedit },
      // 合同管理
      { path: 'Pcharge', component: PCharge },
      { path: 'Pintention', component: PIntention },
      { path: 'PIntentiondetail', component: PIntentiondetail },
      { path: 'Pintentionpush', component: PIntentionpush },
      { path: 'Pintentionpusht', component: PIntentionpusht },
      { path: 'Pintentionpushf', component: PIntentionpushf },
      { path: 'Pintentionedit', component: PIntentionedit },
      { path: 'Pintentioneditt', component: PIntentioneditt },
      { path: 'Pintentioneditf', component: PIntentioneditf },
      { path: 'Ppact', component: PPact },
      { path: 'Ppactdetail', component: PPactdetail },
      { path: 'Ppactpush', component: PPactpush },
      { path: 'Ppactpusht', component: PPactpusht },
      { path: 'Ppactpushf', component: PPactpushf },
      { path: 'Ppactedit', component: PPactedit },
      { path: 'Ppacteditt', component: PPacteditt },
      { path: 'Ppacteditf', component: PPacteditf },
      { path: 'Pexamine', component: PExamine },
      { path: 'Pchange', component: PChange },
      { path: 'Pchangepush', component: PChangepush },
      { path: 'Please', component: PLease },
      { path: 'Pleasepush', component: PLeasepush },
      { path: 'Pleasedetail', component: PLeasedetail },
      // 企业服务
      { path: 'Fbanner', component: FBanner },
      { path: 'Fmobile', component: FMobile },
      { path: 'Forder', component: FOrder },
      { path: 'Fserve', component: FServe },
      { path: 'Fsubblier', component: FSubblier },
      //费用管理
      { path: 'Cbill', component: CBill },
      { path: 'Creport', component: CReport },
      //系统管理
      { path: 'Sdepactment', component: SDepactment },
      { path: 'Sline', component: SLine },
      { path: 'Smenu', component: SMenu },
      { path: 'Soperation', component: SOperation },
      { path: 'Sregist', component: SRegist },
      { path: 'Srole', component: SRole },
      { path: 'Suser', component: SUser },
      { path: 'Ssettime', component: SSettime },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
