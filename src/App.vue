<template>
  <div>
    <router-view></router-view>
  </div>

  <!--  id="app"
    :style="{
      transform: `scale(${scalesNum}) translate(-50%,0)`,
      '-webkit-transform': `scale(${scalesNum}) translate(-50%,0)`,
      '-moz-transform': `scale(${scalesNum}) translate(-50%,0)`,
      '-o-transform': `scale(${scalesNum}) translate(-50%,0)`,
      '-ms-transform': `scale(${scalesNum}) translate(-50%,0)`,
    }" -->
</template>

<script>
export default {
  name: "MyApp",
  data() {
    return {
      // scalesNum: 1, // 缩放比例
    };
  },
  // mounted() {
  //   var browerWidth = window.innerWidth; //浏览器可视宽度
  //   var baseWidth = 1920; //设计稿宽度
  //   var zoomValue = browerWidth / baseWidth; //缩放比例计算
  //   document.getElementById("mainContainer").style.transform =
  //     "scale(" + zoomValue + "," + zoomValue + ")"; //mainContainer为主容器id
  //   window.onresize = function () {
  //     //窗口尺寸变化时，重新计算和缩放
  //     browerWidth = window.innerWidth;
  //     zoomValue = browerWidth / baseWidth;
  //     document.getElementById("mainContainer").style.transform =
  //       "scale(" + zoomValue + "," + zoomValue + ")";
  //   };
  // },
  //   mounted() {
  //     // 计算缩放比例
  //     this.resize_window();
  //     window.addEventListener("resize", () => {
  //       this.resize_window();
  //     });
  //   },
  //   methods: {
  //     resize_window() {
  //       // 因为设计图是带1920*1080的，但是浏览器本身带顶部工具栏，所以缩放到时候稍微更小一点，这样不会有滚动条，这个值可以选择更大些，比如2300，这样左右两边会有空白
  //       let myWidth = document.documentElement.clientWidth;
  //       let myHeight = document.documentElement.clientHeight;
  //       if (myHeight / 1920 !== 0 && myWidth / 1920 / (myHeight / 1080) >= 1) {
  //         console.log();
  //         this.scalesNum = myHeight / 1080;
  //       } else {
  //         this.scalesNum = myWidth / 1920;
  //       }
  //     },
  //   },
};
</script>

<style scoped>
/* #app {
  margin: 0;
  padding: 0;
  transform-origin: 0 0;
  position: relative;
  width: 1920px;
  height: 969px;
  left: 50%;
  overflow: hidden;
} */
</style>
<style>
.ant-modal-content {
  position: relative;
  background-color: #fff;
  background-clip: padding-box;
  border: 0;
  border-radius: 2px;
  pointer-events: auto;
  max-width: 1000px;
  display: inline-block;
}
</style>
