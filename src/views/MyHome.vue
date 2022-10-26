<template>
  <div>
    <div class="left">
      <MyLeft></MyLeft>
    </div>
    <div class="routerview">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MyLeft from "@/components/MyLeft.vue";
export default {
  name: "MyHome",
  components: {
    MyLeft,
  },
};
</script>

<style lang="less" scoped>
.left {
  position: relative;
}
.routerview {
  position: absolute;
  top: 130px;
  left: 11vw;
  min-height: 200px;
}
</style>
