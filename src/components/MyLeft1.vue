<template>
  <div
    class="silderwrap"
    :class="collapsed ? 'ant-menu-inline-collapsed' : 'leftsilder'"
  >
    <div class="logo">
      <span v-if="!collapsed">数智园区平台</span>
      <span v-else><a-icon type="snippets" /></span>
    </div>
    <a-menu
      :default-selected-keys="[$route.path]"
      :default-open-keys="openkeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      @openChange="openChange"
    >
      <template v-for="item in routelist">
        <template v-if="item.meta.show && item.children">
          <a-menu-item
            v-if="item.children.length === 1"
            :key="
              item.path === '/'
                ? `${item.path}${item.children[0].path}`
                : `${item.path}/${item.children[0].path}`
            "
          >
            <!-- 没有二级的 -->
            <!-- <a-icon type="pie-chart" /> -->
            <router-link
              :to="{
                path:
                  item.path === '/'
                    ? `${item.path}${item.children[0].path}`
                    : `${item.path}/${item.children[0].path}`,
              }"
              ><a-icon type="pie-chart" /><span v-if="!collapsed">{{
                item.meta.title
              }}</span></router-link
            >
          </a-menu-item>
          <a-sub-menu v-else :key="item.path">
            <span slot="title">
              <a-icon type="ordered-list" />
              <span>{{ item.meta.title }}</span>
            </span>

            <template v-for="subitem in item.children">
              <a-menu-item
                v-if="!subitem.children && subitem.meta.show"
                :key="item.path + '/' + subitem.path"
              >
                <router-link
                  style="display: block"
                  :to="item.path + '/' + subitem.path"
                  >{{ subitem.meta.title }}</router-link
                >
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import storage from "@/utils/storage";
export default {
  name: "",
  data() {
    return {
      SelectedKeys: [this.$route.path],
      routelist: [],
      openkeys: [],
    };
  },
  methods: {
    openChange(keys) {
      let keyarr = [];
      if (keys.length > 0) {
        keyarr.push(keys[keys.length - 1]);
      }
      this.openkeys = keyarr;
      window.sessionStorage.setItem("openKeys", JSON.stringify(keyarr));
    },
  },
  created() {
    const openkey = sessionStorage.getItem("openKeys");
    if (openkey) {
      this.openkeys = JSON.parse(openkey);
    }
    this.routelist = this.$router.options.routes;

    // this.routelist = storage.get("routeList");
    // console.log(this.routelist);
  },
  mounted() {},
  computed: {
    collapsed() {
      return this.$store.state.iscollapsed;
    },
  },
};
</script>
<style lang="less" scoped>
.leftsilder {
  flex: 0 0 200px;
}
.clostit {
  flex: 0 0 80px;
}
.silderwrap {
  transition: 0.1s;
  color: #fff;
  background: #001529;
  .logo {
    padding: 30px;
    font-size: 20px;
  }
}
.clostit {
  flex: 0 0 80px;
  .logo {
    display: inline-block;
    width: 80px;
  }
}
</style>
