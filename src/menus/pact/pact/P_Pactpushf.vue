<template>
  <div class="wrap">
    <div style="width: 90%; margin: 20px auto">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="content">
        <a-result status="success" title="提交成功！">
          <template #extra>
            <a-button key="buy"
              ><router-link to="/home/Ppact">返回</router-link></a-button
            >
          </template>
        </a-result>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "My_P_Pactpushf",
  data() {
    return {
      current: 2,
      steps: [
        {
          title: "填写基础信息",
        },
        {
          title: "填写费项信息",
        },
        {
          title: "完成",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.wrap {
  background-color: #fff;
  border-radius: 15px;
  width: 85vw;
  .content {
    width: 100%;
  }
}
</style>
