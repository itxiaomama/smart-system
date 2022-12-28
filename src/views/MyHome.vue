<template>
  <div class="container">
    <MyLeft />
    <div class="routerview">
      <myHeader />
      <router-view class="newview"></router-view>
    </div>
  </div>
</template>

<script>
import MyLeft from "@/components/MyLeft.vue";
import myHeader from "@/components/header.vue";
export default {
  name: "MyHome",
  components: {
    MyLeft,
    myHeader,
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  overflow-x: hidden;
  height: 100%;
}
.routerview {
  flex: 1;
  background: #eee;
}
.newview {
  min-height: 80vh;
  overflow-y: auto;
  margin: 20px;
}
</style>
