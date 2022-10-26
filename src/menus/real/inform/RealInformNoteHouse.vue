<template>
  <div>
    <div class="wrap">
      <div class="text">
        <div class="supplier" style="display: flex">
          <span style="white-space: nowrap">所属物业：</span>
          <a-select
            default-value="请选择"
            style="width: 60vw"
            @change="handleChange"
          >
            <a-select-option value="lucy">1</a-select-option>
          </a-select>
        </div>
        <div class="supplier" style="display: flex">
          <span style="white-space: nowrap">所属主体：</span>
          <a-select
            default-value="请选择"
            style="width: 60vw"
            @change="handleChange"
          >
            <a-select-option value="lucy">1</a-select-option>
          </a-select>
        </div>
        <div class="supplier" style="display: flex">
          <span style="white-space: nowrap">通知主题：</span>
          <a-input placeholder="请输入通知主题" style="width: 60vw" />
        </div>
        <div class="brief" style="margin-left: 28px">
          <p>内容：</p>
          <a-textarea placeholder="请输入内容" :rows="4" />
        </div>
        <div class="site">
          <span>发布范围：</span>
          <div>
            <a-radio-group v-model="value" @change="onChange">
              <a-radio :value="1">全部</a-radio>
              <a-radio :value="2">指定楼宇</a-radio>
              <a-radio :value="3">指定单元</a-radio>
              <a-radio :value="4">指定房屋</a-radio>
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
  name: " RealInformNoteHouse",
  data() {
    return {
      value: 1,
    };
  },
  methods: {
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    btnA() {
      this.$router.push("Rinform");
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
