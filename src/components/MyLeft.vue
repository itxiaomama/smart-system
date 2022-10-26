<template>
  <div class="wrap">
    <a-layout id="components-layout-demo-fixed-sider" style="min-height: 100vh">
      <a-layout-sider
        breakpoint="xxl"
        collapsed-width="1"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
        style="min-width: 10vw"
      >
        <div class="logo"><span id="logo">数智园区平台</span></div>
        <a-menu
          theme="dark"
          mode="inline"
          :openKeys="openKeys"
          @openChange="onOpenChange"
        >
          <a-sub-menu key="sub1">
            <span slot="title" style="font-size: 18px !important">
              <a-icon type="appstore" /><span>工作台</span>
            </span>
            <a-menu-item key="1">
              <router-link to="/home/Bcarden">工作台</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub10">
            <span slot="title">
              <a-icon type="hdd" /><span>租户管理</span>
            </span>
            <a-menu-item key="2">
              <router-link to="/home/tenant">租户管理</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="hdd" /><span>园区管理</span>
            </span>
            <a-menu-item key="4">
              <router-link to="/home/Glist">园区列表</router-link>
            </a-menu-item>
            <a-menu-item key="51">
              <router-link to="/home/Garea">区域管理</router-link>
            </a-menu-item>
            <a-menu-item key="5">
              <router-link to="/home/Gbuild">楼宇管理</router-link>
            </a-menu-item>
            <a-menu-item key="6">
              <router-link to="/home/Groom">房间管理</router-link>
            </a-menu-item>
            <a-menu-item key="7">
              <router-link to="/home/Gstall">车位管理</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="user-add" /><span>入驻管理</span>
            </span>
            <a-menu-item key="8">
              <router-link to="/home/Epack">入园申请</router-link>
            </a-menu-item>
            <a-menu-item key="9">
              <router-link to="/home/Eenter">入驻申请</router-link>
            </a-menu-item>
            <a-menu-item key="10">
              <router-link to="/home/Einto">迁入申请</router-link>
            </a-menu-item>
            <!-- <a-menu-item key="50">
              <router-link to="/home/Efirm">入驻企业</router-link>
            </a-menu-item> -->
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title">
              <a-icon type="tool" /><span>物业管理</span>
            </span>
            <a-menu-item key="11">
              <router-link to="/home/Rinform">物业通知</router-link>
            </a-menu-item>
            <a-menu-item key="12">
              <router-link to="/home/Rnews">政策资讯</router-link>
            </a-menu-item>
            <a-menu-item key="13">
              <router-link to="/home/Ractivity">活动管理</router-link>
            </a-menu-item>
            <a-menu-item key="14">
              <router-link to="/home/Rmatter">报事报修</router-link>
            </a-menu-item>
            <a-menu-item key="15">
              <router-link to="/home/Rcomplaint">投诉建议</router-link>
            </a-menu-item>
            <a-menu-item key="16">
              <router-link to="/home/Rconpany">企业装修</router-link>
            </a-menu-item>
            <a-menu-item key="17">
              <router-link to="/home/Rofforest">绿化保洁</router-link>
            </a-menu-item>
            <a-menu-item key="18">
              <router-link to="/home/Rfacility">设备管理</router-link>
            </a-menu-item>
            <a-menu-item key="19">
              <router-link to="/home/Rpatorl">巡防管理</router-link>
            </a-menu-item>
            <a-menu-item key="20">
              <router-link to="/home/Rvisitor">访客管理</router-link>
            </a-menu-item>
            <a-menu-item key="21">
              <router-link to="/home/Rcar">车辆管理</router-link>
            </a-menu-item>
            <a-menu-item key="22">
              <router-link to="/home/Rstop">停车交费</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub5">
            <span slot="title">
              <a-icon type="phone" /><span>招商管理</span>
            </span>
            <a-menu-item key="24">
              <router-link to="/home/Jclue">线索管理</router-link>
            </a-menu-item>
            <a-menu-item key="25">
              <router-link to="/home/Jfollow">线索跟进</router-link>
            </a-menu-item>
            <a-menu-item key="26">
              <router-link to="/home/Jallot">线索分派</router-link>
            </a-menu-item>
            <a-menu-item key="27">
              <router-link to="/home/Jmine">我的线索</router-link>
            </a-menu-item>
            <a-menu-item key="23">
              <router-link to="/home/Jclient">客户管理</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub6">
            <span slot="title">
              <a-icon type="file-text" /><span>合同管理</span>
            </span>
            <a-menu-item key="28">
              <router-link to="/home/Pcharge">收费配置</router-link>
            </a-menu-item>
            <a-menu-item key="29">
              <router-link to="/home/Pintention">意向合同</router-link>
            </a-menu-item>
            <a-menu-item key="30">
              <router-link to="/home/Ppact">合同管理</router-link>
            </a-menu-item>
            <a-menu-item key="31">
              <router-link to="/home/Pexamine">合同审批</router-link>
            </a-menu-item>
            <a-menu-item key="32">
              <router-link to="/home/Pchange">合同变更</router-link>
            </a-menu-item>
            <a-menu-item key="33">
              <router-link to="/home/Please">退租管理</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub7">
            <span slot="title">
              <a-icon type="pushpin" /><span>企业服务</span>
            </span>
            <a-menu-item key="34">
              <router-link to="/home/Fsubblier">供应商管理</router-link>
            </a-menu-item>
            <a-menu-item key="35">
              <router-link to="/home/Fmobile">菜单管理</router-link>
            </a-menu-item>
            <a-menu-item key="36">
              <router-link to="/home/Fbanner">banner管理</router-link>
            </a-menu-item>
            <a-menu-item key="37">
              <router-link to="/home/Fserve">服务管理</router-link>
            </a-menu-item>
            <a-menu-item key="38">
              <router-link to="/home/Forder">订单管理</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub8">
            <span slot="title">
              <a-icon type="calculator" /><span>费用管理</span>
            </span>
            <a-menu-item key="39">
              <router-link to="/home/Cbill">账单管理</router-link>
            </a-menu-item>
            <a-menu-item key="40">
              <router-link to="/home/Creport">账单报表</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub9">
            <span slot="title">
              <a-icon type="global" /><span>系统管理</span>
            </span>
            <a-menu-item key="41">
              <router-link to="/home/Suser">用户管理</router-link>
            </a-menu-item>
            <a-menu-item key="42">
              <router-link to="/home/Srole">角色管理</router-link>
            </a-menu-item>
            <a-menu-item key="43">
              <router-link to="/home/Smenu">菜单管理</router-link>
            </a-menu-item>
            <a-menu-item key="44">
              <router-link to="/home/Sdepactment">部门管理</router-link>
            </a-menu-item>
            <!-- <a-menu-item key="45"> -->
            <!-- <router-link to="/home/Shelp">帮助中心</router-link> -->
            <!-- </a-menu-item> -->
            <a-menu-item key="46">
              <router-link to="/home/Sline">在线用户</router-link>
            </a-menu-item>
            <a-menu-item key="47">
              <router-link to="/home/Ssettime">定时任务</router-link>
            </a-menu-item>
            <a-menu-item key="48">
              <router-link to="/home/Soperation">操作日志</router-link>
            </a-menu-item>
            <a-menu-item key="49">
              <router-link to="/home/Sregist">登录日志</router-link>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header theme="dark" style="height: 48px">
          <div class="set">
            <div class="heada" @click="showDrawer"></div>
            <span style="margin-right: 20px"
              >欢迎您，<a href="javascript:;">张学友</a></span
            >
            <a-drawer
              title="我的"
              placement="right"
              :closable="false"
              :visible="visible"
              :after-visible-change="afterVisibleChange"
              @close="onClose"
            >
              <p>个人中心</p>
              <p>个人设置</p>
              <p @click="btn_out">退出登录</p>
            </a-drawer>
          </div>
        </a-layout-header>
        <a-layout-header
          theme="light"
          style="
            height: 64px;
            background-color: #fff;
            margin-top: 8px;
            border-radius: 10px;
          "
        >
          <div
            style="
              margin: -10px 0px 0 -30px;
              display: flex;
              justify-content: space-between;
            "
          >
            <div>
              <a-breadcrumb style="margin: 16px 0">
                <a-breadcrumb-item>首页</a-breadcrumb-item>
                <a-breadcrumb-item>工作台</a-breadcrumb-item>
                <a-breadcrumb-item>工作台</a-breadcrumb-item>
              </a-breadcrumb>
              <a-breadcrumb style="margin-top: -16px">
                <a-breadcrumb-item
                  ><p>
                    <strong style="font-size: 20px">工作台</strong>
                  </p></a-breadcrumb-item
                >
              </a-breadcrumb>
            </div>
            <div class="btnquanping">
              <img
                v-if="!screenFlag"
                @click="screen"
                src="../assets/fangda.png"
                style="width: 60px; padding-top: 10px"
              />
              <img
                v-else
                @click="screen"
                src="../assets/suoxiao.png"
                style="width: 60px; padding-top: 10px"
              />
            </div>
          </div>
        </a-layout-header>
        <a-layout-content style="height: 100%"></a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import screenfull from "screenfull";
export default {
  name: "MyLeft",
  data() {
    return {
      collapsed: false,
      visible: false,
      openKeys: [""],
      screenFlag: false,
    };
  },
  methods: {
    // 全屏
    screen() {
      console.log("screenfull>>>>>>", screenfull);
      this.screenFlag = !this.screenFlag;
      if (!screenfull.isEnabled) {
        this.$message({
          message: "Your browser does not work",
          type: "warning",
        });
        return false;
      }
      screenfull.toggle();
    },
    onOpenChange(openKeys) {
      if (openKeys.length !== 0) {
        this.openKeys = [openKeys[1]];
      } else {
        this.openKeys = [""];
      }
    },
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint() {
      console.log();
    },
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    btn_out() {
      this.$router.push("/login");
    },
  },

  mounted() {
    var logo = document.querySelector("#logo");
    var browerWidth = window.innerWidth; //浏览器可视宽度
    if (browerWidth < 1600) {
      logo.style.display = "none";
    }
    window.addEventListener("fullscreenchange", (e) => {
      if (screenfull.isFullscreen) {
        this.screenFlag = true;
      } else {
        this.screenFlag = false;
      }
    });
  },
};
</script>
<style></style>
<style lang="less" scoped>
.ant-menu-inline .ant-menu-submenu .ant-menu-submenu-title {
  font-size: 15px !important;
}
.ant-menu-inline .ant-menu-item {
  font-size: 15px !important;
}
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  margin: 16px;
}
.wrap {
  height: "100%";
  position: relative;
  background: rgba(255, 255, 255, 0.2);
  .selution {
    margin-top: 8px;
  }

  .set {
    position: absolute;
    right: 20px;
    top: -9px;
    span {
      color: #fff;
    }
  }

  .heada {
    position: absolute;
    top: 18px;
    right: 140px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgb(18, 151, 228);
    background-image: url(../assets/a82ed3a325fbf0b85756c69e34f0684.png);
    background-size: cover;
  }
  .test {
    background-color: skyblue;
  }
  .pic {
    width: 50px;
    height: 50px;
    background-color: red;
    border-radius: 50%;
    background-image: url(../assets/5206133a907f6ee42281b06cd75773b.png);
    background-size: cover;
    // -webkit-background-size: cover;
    margin: 0 auto;
  }
  .logo {
    color: #fff;
    line-height: 32px;
    text-align: center;
    font-size: 20px;
  }
  .ant-menu-item-active {
    background-color: rgba(177, 217, 250, 0.65) !important;
  }
  .ant-menu-item {
    font-size: 15px !important;
  }
  .ant-menu-inline .ant-menu-submenu-title {
    span {
      font-size: 17px !important;
    }
  }
}
</style>
