<template>
  <div>
    <div class="wrap">
      <div class="top">
        <div class="content">
          <div class="return" @click="btn_return">
            <a-icon type="left-circle" class="icon" />
          </div>
          <div class="chat">
            <a-button type="primary"
              ><router-link to="/home/Jallotdetailspace"
                >编辑</router-link
              ></a-button
            >
          </div>
          <a-divider class="divider" />
          <a-descriptions title="主要信息" style="">
            <a-descriptions-item label="主题名称">
              <p>测试线索主题</p>
            </a-descriptions-item>
            <a-descriptions-item label="线索来源">
              <p>现场接待</p>
            </a-descriptions-item>
            <a-descriptions-item label="状态">
              <p>已关闭</p>
            </a-descriptions-item>
            <a-descriptions-item label="对接人">
              <p>老王</p>
            </a-descriptions-item>
            <a-descriptions-item label="渠道分类">
              <p>中介公司</p>
            </a-descriptions-item>
            <a-descriptions-item label="关闭原因">
              <p>客户暂无需求</p>
            </a-descriptions-item>
            <a-descriptions-item label="渠道名称">
              <p>测试线索渠道</p>
            </a-descriptions-item>
            <a-descriptions-item label="详细描述">
              <p>--------</p>
            </a-descriptions-item>
            <a-descriptions-item label="关闭说明">
              <p>--------</p>
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="top">
        <div class="content">
          <a-divider class="dividera" />
          <a-descriptions title="主要信息" style="">
            <a-descriptions-item label="客户名称">
              <p>测试客户</p>
            </a-descriptions-item>
            <a-descriptions-item label="客户类型">
              <p>公司</p>
            </a-descriptions-item>
            <a-descriptions-item label="证件号">
              <p>-------</p>
            </a-descriptions-item>
            <a-descriptions-item label="所属行业">
              <p>-------</p>
            </a-descriptions-item>
            <a-descriptions-item label="联系人">
              <p>机器人</p>
            </a-descriptions-item>
            <a-descriptions-item label="联系电话">
              <p>客户暂无需求</p>
            </a-descriptions-item>
            <a-descriptions-item label="邮箱">
              <p>测试线索渠道</p>
            </a-descriptions-item>
            <a-descriptions-item label="通讯地址">
              <p>--------</p>
            </a-descriptions-item>
            <a-descriptions-item label="邮编">
              <p>--------</p>
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="top">
        <div class="content">
          <a-button type="primary"
            ><router-link to="/home/Jallotdetailtest"
              >跟进线索</router-link
            ></a-button
          >
          <a-button type="primary" style="margin-left: 30px"
            ><router-link to="/home/Pintentionpush"
              >签订合同</router-link
            ></a-button
          >
          <a-button style="margin-left: 30px" @click="up">关闭线索</a-button>
          <a-modal v-model="visible" title="分派">
            <div class="buildname" style="display: flex; margin-bottom: 40px">
              <span style="white-space: nowrap; line-height: 32px"
                >关闭原因：</span
              >
              <span>
                <a-select default-value="" style="width: 20vw">
                  <a-select-option value="lucy">电话打不通</a-select-option>
                  <a-select-option value="jack">客户暂无需求</a-select-option>
                  <a-select-option value="Yimi"
                    >客户需求已经满足</a-select-option
                  >
                  <a-select-option value="lucy">重复线索</a-select-option>
                  <a-select-option value="jack">其他</a-select-option>
                </a-select>
              </span>
            </div>
            <div class="buildname" style="display: flex; margin-bottom: 40px">
              <span style="white-space: nowrap; line-height: 32px"
                >关闭说明：</span
              >
              <a-textarea
                style="width: 20vw"
                placeholder="请详细说明关闭原因"
                :rows="6"
              />
            </div>
            <div
              class="btnant"
              style="
                padding: 10px 16px;
                text-align: right;
                background: transparent;
                border-top: 1px solid #e8e8e8;
                border-radius: 0 0 4px 4px;
              "
            >
              <a-button @click="handleOk" style="margin-right: 20px"
                >取消</a-button
              >
              <a-button type="primary" @click="showAdd">确定</a-button>
            </div>
          </a-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JoinAllotDetail",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    btn_return() {
      this.$router.push("/home/Jallot");
    },
    up() {
      this.visible = true;
    },
    showAdd() {
      this.visible = false;
    },
    handleOk() {
      this.visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  margin-top: 20px;
  .top {
    width: 85vw;
    background-color: #fff;
    border-radius: 10px;
    .content {
      .return {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 0;
        top: 36px;
        .icon {
          font-size: 24px;
        }
      }
      .chat {
        position: absolute;
        right: 30px;
        top: 86px;
      }
      margin: 20px;
      .divider {
        position: absolute;
        top: 50px;
      }
      .dividera {
        position: absolute;
        top: 16vw;
      }
    }
  }
}
</style>
