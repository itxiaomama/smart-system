<template>
  <a-modal title="操作" style="top: 20px" @ok="" :width="800" v-model="visible">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <icon-selector @change="handleIconChange" />
    </a-card>
  </a-modal>
</template>

<script>
import IconSelector from "./iconselector/iconselector.vue";

export default {
  name: "IconSelectorView",
  components: {
    IconSelector,
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    handleIconChange(icon) {
      // console.log('change Icon', icon)
      this.visible = false;
      this.$emit("ok", icon);
      // this.$message.info(<span>选中图标 <code>{icon}</code></span>)
    },
  },
};
</script>
