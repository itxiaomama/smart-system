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
      :open-keys="openKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      @openChange="openChange"
    >
      <template v-for="item in routelist">
        <template v-if="item.status == 1">
          <a-sub-menu :key="item.component">
            <span slot="title">
              <a-icon :type="item.icon" />
              <span>{{ item.menu_name }}</span>
            </span>
            <template v-for="subitem in item.children">
              <a-menu-item
                v-if="subitem.status == 1"
                :key="item.component + '/' + subitem.component"
              >
                <router-link v-if="item.component !== '/'" style="display: block"  :to="item.component + '/' + subitem.component" >{{ subitem.menu_name }}</router-link>
                <router-link v-else style="display: block"  :to="'/'" >{{ subitem.menu_name }}</router-link>
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
      rootSubmenuKeys:['/', '/tenant', '/park', '/settlement', '/merchants', '/contract', '/enterprise', '/property', '/system','/cost'],
      openKeys: ["/"],
    };
  },
  methods: {
    openChange(keys) {
      const lastkey = keys.find(key => this.openKeys.indexOf(key) === -1);
      if(this.rootSubmenuKeys.indexOf(lastkey) === -1){
        this.openKeys = keys;
      }else{
        this.openKeys = lastkey ? [lastkey] : []
      }
    },
  },
  created() {
    // this.routelist = this.$router.options.routes;
    this.routelist = storage.get("routeList");
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
.anticon{
  font-size: 20px!important;
}
</style>
