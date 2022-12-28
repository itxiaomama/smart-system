<template>
  <a-layout class="headerwrap">
    <a-layout-header theme="dark" style="height: 64px">
      <div class="set">
        <a-icon type="menu-fold" @click="collapseit" />
        <div style="display: flex">
          <div class="heada"></div>
          <span style="color: #fff" @click="showDrawer"
            >欢迎您，<a href="javascript:;">{{ name }}</a></span
          >
        </div>
        <a-drawer
          title="我的"
          placement="right"
          :closable="false"
          :visible="visible"
          :after-visible-change="afterVisibleChange"
          @close="onClose"
        >
          <!-- <p>个人中心</p>
          <p>个人设置</p> -->
          <p class="logout" @click="btn_out">退出登录</p>
        </a-drawer>
      </div>
    </a-layout-header>
    <a-layout-header theme="light" class="breadwrap">
      <div>
        <div>
          <a-breadcrumb>
            <a-breadcrumb-item
              v-for="(item, index) in $route.matched"
              :key="index"
            >
              <router-link :to="item.path">{{ item.meta.title }}</router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
          <div class="name">{{ title }}</div>
        </div>
        <!-- <div class="btnquanping">
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
        </div> -->
      </div>
    </a-layout-header>
    <a-layout-content style="height: 100%"></a-layout-content>
  </a-layout>
</template>
<script>
import storage from "@/utils/storage";
export default {
  name: "MyLeft",
  data() {
    return {
      visible: false,
      openKeys: [""],
      screenFlag: false,
      title: "",
      name: "",
    };
  },
  methods: {
    collapseit() {
      this.$store.commit("collapsed");
    },
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
      this.$store.commit("del_token");
      // storage.removeAll();
      this.$router.replace("/login");
    },
  },
  watch: {
    $route(newval, oldval) {
      this.title = newval.meta.title;
    },
  },

  mounted() {
    this.title = this.$route.meta.title;
    this.name = storage.get("userInfo").login_name;

    //   var logo = document.querySelector("#logo");
    //   var browerWidth = window.innerWidth; //浏览器可视宽度
    //   if (browerWidth < 1600) {
    //     logo.style.display = "none";
    //   }
    //   window.addEventListener("fullscreenchange", (e) => {
    //     if (screenfull.isFullscreen) {
    //       this.screenFlag = true;
    //     } else {
    //       this.screenFlag = false;
    //     }
    //   });
  },
};
</script>
<style lang="less" scoped>
.headerwrap {
  .ant-layout-header:first-child {
    padding-left: 0 !important;
  }
  .set {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    .anticon {
      font-size: 24px;
      margin-left: 20px;
    }
  }
  .heada {
    width: 40px;
    height: 40px;
    background: pink;
    border-radius: 50%;
    margin-right: 20px;
    margin-top: 10px;
  }
  .breadwrap {
    height: 89px;
    padding: 20px;
    background: #fff;
  }
  .name {
    font-size: 20px;
    font-weight: bold;
    line-height: 2;
  }
}
.logout {
  cursor: pointer;
}
</style>
