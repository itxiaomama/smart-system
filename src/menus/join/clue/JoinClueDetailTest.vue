<template>
  <div class="www">
    <div class="wrap">
      <div class="wrapA" style="margin-top: 48px">
        <div class="leftb">
          <p>意向状态：</p>
          <a-select default-value="" style="width: 50vw">
            <a-select-option value="lucya">强烈</a-select-option>
            <a-select-option value="lucyb">一般</a-select-option>
            <a-select-option value="lucyc">无</a-select-option>
            <a-select-option value="lucyd">未知</a-select-option>
          </a-select>
        </div>
        <div class="leftb">
          <p>跟进日期：</p>
          <a-date-picker />
        </div>
        <div class="leftb">
          <p>跟进方式：</p>
          <a-select default-value="" style="width: 50vw">
            <a-select-option value="lucya">客户上门</a-select-option>
            <a-select-option value="lucyb">主动拜访</a-select-option>
            <a-select-option value="lucyc">客户来电</a-select-option>
            <a-select-option value="lucyd">主动电访</a-select-option>
            <a-select-option value="lucye">短信</a-select-option>
            <a-select-option value="lucyf">微信</a-select-option>
            <a-select-option value="lucyg">邮件</a-select-option>
            <a-select-option value="lucyh">其他</a-select-option>
          </a-select>
        </div>
        <div class="leftb">
          <p>跟进记录：</p>
          <a-textarea style="width: 50vw" placeholder="" :rows="8" />
        </div>
        <div class="leftb" style="margin-left: -28px">
          <p>计划跟进时间：</p>
          <a-date-picker />
        </div>
        <div class="leftb" style="margin-left: -28px">
          <p>计划跟进记录：</p>
          <a-textarea style="width: 50vw" placeholder="" :rows="8" />
        </div>
        <div class="last" style="text-align: center; margin-top: 20px">
          <div class="inpN" style="margin-left: 4vw">
            <a-button type="primary"> 确定 </a-button>
            <a-button style="margin-left: 40px" @click="btnN">
              <a-icon type="rollback" />关闭
            </a-button>
          </div>
        </div>
      </div>
    </div>
    <a-divider class="divider" orientation="left">跟进信息</a-divider>
  </div>
</template>

<script>
export default {
  name: "JoinClueDetailTest",
  methods: {
    btnN() {
      this.$router.push("/home/Jcluedetail");
    },
  },
};
</script>

<style lang="less" scoped>
.www {
  position: relative;
  .divider {
    position: absolute;
    top: 10px;
  }
}
.wrap {
  width: 85vw;
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    margin: 20px auto;
    .leftb {
      display: flex;
      margin-top: 20px;
    }
  }
}
</style>
