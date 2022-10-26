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
          <span style="white-space: nowrap">车牌号码：</span>
          <a-input placeholder="请输入车牌号码" style="width: 60vw" />
        </div>
        <div class="supplier" style="display: flex">
          <span style="white-space: nowrap">车主姓名：</span>
          <a-input placeholder="请输入业主姓名" style="width: 60vw" />
        </div>
        <div class="supplier" style="display: flex">
          <span style="white-space: nowrap">手机号码：</span>
          <a-input placeholder="请输入手机号码" style="width: 60vw" />
        </div>
        <div class="supplier" style="display: flex">
          <span style="white-space: nowrap">车位情况：</span>
          <a-input placeholder="请输入车位情况" style="width: 60vw" />
        </div>
        <div class="supplier" style="display: flex; margin-left: -28px">
          <span style="white-space: nowrap">停车开始日期：</span>
          <a-month-picker
            placeholder="请选择日期"
            @change="onChange"
            style="width: 60vw"
          />
        </div>
        <div class="supplier" style="display: flex; margin-left: -28px">
          <span style="white-space: nowrap">停车结束日期：</span>
          <a-month-picker
            placeholder="请选择日期"
            @change="onChange"
            style="width: 60vw"
          />
        </div>
        <div class="brief" style="margin-left: 28px">
          <p>内容：</p>
          <a-textarea placeholder="请输入内容" :rows="4" />
        </div>
        <div class="action">
          <a-button type="primary">提交</a-button>
          <a-button @click="btnA" style="margin-left: 40px"
            ><a-icon type="rollback" />返回</a-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: " RealCarEdit",
  methods: {
    btnA() {
      this.$router.go(-1);
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
      margin: 20px 26vw;
      .button {
        margin-left: -20px;
      }
    }
  }
}
</style>
