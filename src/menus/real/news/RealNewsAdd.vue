<template>
  <div>
    <div class="wrap">
      <div class="text">
        <div class="supplier" style="display: flex">
          <span style="white-space: nowrap">资讯分类：</span>
          <a-select
            default-value="请选择"
            style="width: 60vw"
            @change="handleChange"
          >
            <a-select-option value="菜单1"> 党建服务 </a-select-option>
            <a-select-option value="菜单2"> 政策服务 </a-select-option>
            <a-select-option value="菜单3"> 创业支持 </a-select-option>
            <a-select-option value="菜单4"> 产业发展 </a-select-option>
            <a-select-option value="菜单5"> 科技创新 </a-select-option>
            <a-select-option value="菜单6"> 转型升级 </a-select-option>
            <a-select-option value="菜单7"> 人才政策 </a-select-option>
            <a-select-option value="菜单9"> 融资支持 </a-select-option>
            <a-select-option value="菜单8"> 市场拓展 </a-select-option>
            <a-select-option value="菜单10"> 税收政策 </a-select-option>
          </a-select>
        </div>
        <div class="supplier" style="display: flex">
          <span style="white-space: nowrap">资讯名称：</span>
          <a-input placeholder="请输入资讯名称" style="width: 60vw" />
        </div>
        <div class="brief">
          <p>主题描述：</p>
          <a-textarea placeholder="请输入简单描述" :rows="4" />
        </div>
        <div class="site">
          <span>资讯详情：</span>
          <a-textarea placeholder="请输入资讯详情" :rows="8" />
        </div>
        <div class="site">
          <span>是否推荐：</span>
          <div>
            <a-radio-group v-model="valuea" @change="onChangea">
              <a-radio :value="1">推荐</a-radio>
              <a-radio :value="2">不推荐</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div class="site" style="margin-left: 28px">
          <span>状态：</span>
          <div>
            <a-radio-group v-model="valueb" @change="onChangeb">
              <a-radio :value="1">显示</a-radio>
              <a-radio :value="2">隐藏</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div class="action">
          <a-button type="primary">提交</a-button>
          <a-button @click="btnA" style="margin-left: 30px"
            ><a-icon type="rollback" />返回</a-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: " RealNewsAdd",
  data() {
    return {
      valuea: 1,
      valueb: 1,
    };
  },
  methods: {
    btnA() {
      this.$router.push("Rnews");
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  width: 85vw;
  background-color: #fff;
  border-radius: 10px;
  margin: 0px auto;
  .text {
    margin: 20px auto;
    .supplier {
      margin-top: 30px;
      span {
        line-height: 30px;
      }
    }
    .brief {
      margin-top: 30px;
      display: flex;
      p {
        white-space: nowrap;
      }
    }
    .pic {
      margin-top: 30px;
      display: flex;
      margin-left: -28px;
      p {
        white-space: nowrap;
      }
    }
    .site {
      margin-top: 30px;
      display: flex;
      span {
        white-space: nowrap;
      }
    }
    .business {
      margin-top: 30px;
      display: flex;
      span {
        white-space: nowrap;
      }
    }
    .picc {
      margin-top: 30px;
      margin-left: -28px;
      display: flex;
      p {
        white-space: nowrap;
      }
    }
    .action {
      margin: 20px 24vw;
      .button {
        margin-left: -20px;
      }
    }
  }
}
</style>
