<template>
  <div>
    <div class="wrap">
      <div class="top">
        <div class="content">
          <div class="return" @click="btn_return">
            <a-icon type="left-circle" class="icon" />
          </div>
          <a-divider class="divider" />
          <a-descriptions title="主要信息" style="">
            <a-descriptions-item label="主题名称">
              <p>{{ FromDetail.clue_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="线索来源">
              <p>{{ FromDetail.source_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="状态">
              <p>{{ FromDetail.customer_status_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="对接人">
              <p>{{ FromDetail.user_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="渠道分类">
              <p>{{ FromDetail.channel_category_name }}</p>
            </a-descriptions-item>
            <!-- <a-descriptions-item label="关闭原因">
              <p>客户暂无需求</p>
            </a-descriptions-item> -->
            <a-descriptions-item label="渠道名称">
              <p>{{ FromDetail.channel_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="详细描述">
              <p>{{ FromDetail.remark }}</p>
            </a-descriptions-item>
            <!-- <a-descriptions-item label="关闭说明">
              <p>--------</p>
            </a-descriptions-item> -->
          </a-descriptions>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="top">
        <div class="content">
          <a-divider class="dividera" />
          <a-descriptions title="客户信息" style="">
            <a-descriptions-item label="客户名称">
              <p>{{ FromDetail.customer_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="客户类型">
              <p>{{ FromDetail.customer_type_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="证件号">
              <p>{{ FromDetail.park_id }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="所属行业">
              <p>{{ FromDetail.sector }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="联系人">
              <p>{{ FromDetail.customer_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="联系电话">
              <p>{{ FromDetail.phone }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="邮箱">
              <p>{{ FromDetail.email }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="通讯地址">
              <p>{{ FromDetail.mail_address }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="邮编">
              <p>{{ FromDetail.credit_no }}</p>
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="top">
        <div class="content">
          <a-button type="primary"
            ><router-link to="/home/Jcluedetailtest"
              >跟进线索</router-link
            ></a-button
          >
          <a-button type="primary" style="margin-left: 30px">
            <router-link to="/home/Pintentionpush"
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
            <div class="btnant">
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
import axios from "axios";
export default {
  name: "JoinClueDetail",
  data() {
    return {
      visible: false,
      FromDetail: [],
      proId: 0,
    };
  },
  methods: {
    btn_return() {
      this.$router.push("/home/Jclue");
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
  mounted() {
    this.proId = this.$router.history.current.query.id;
    axios.get("/api/ics/clue?per_page=9999").then((res) => {
      this.FromDetail = res.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
.btnant {
  padding: 10px 16px;
  text-align: right;
  background: transparent;
  border-top: 1px solid #e8e8e8;
  border-radius: 0 0 4px 4px;
}
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
