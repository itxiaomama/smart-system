<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <!-- 搜索功能 -->
              <a-input-search
                placeholder="快速搜索"
                style="width: 200px; margin-right: 20px"
              />
            </div>
            <div class="right">
              <a-button>导出</a-button>
            </div>
          </div>
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :rowKey="(record, id) => id"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CostReport",
  data() {
    return {
      // 页面数据源
      dataSource: [],
      columns: [
        {
          title: "客户名称",
          dataIndex: "customer_name",
          scopedSlots: { customRender: "" },
        },
        {
          title: "应收租金（元）",
          dataIndex: "rent_total",
        },
        {
          title: "已收租金（元）",
          dataIndex: "receive_rent",
        },
        {
          title: "应收物业费（元）",
          dataIndex: "management_total",
        },
        {
          title: "已收物业费（元）",
          dataIndex: "receive_management",
        },
        {
          title: "应收电费（元）",
          dataIndex: "energy_total",
        },
        {
          title: "已收电费（元）",
          dataIndex: "receive_energy",
        },
        {
          title: "应收水费（元）",
          dataIndex: "pay_refund",
        },
        {
          title: "已收水费（元）",
          dataIndex: "receive_other",
        },
        {
          title: "其他费用（元）",
          dataIndex: "other_total",
        },
        {
          title: "退费（元）",
          dataIndex: "pay_refund",
        },
        {
          title: "合计应收（元）",
          dataIndex: "total",
        },
        {
          title: "合计未收（元）",
          dataIndex: "not_receive_total",
        },
        {
          title: "合计已收（元）",
          dataIndex: "receive_total",
        },
      ],
    };
  },
  created() {
    // 获取账单报表列表
    this.reportList();
  },
  methods: {
    // 获取账单报表列表
    reportList() {
      axios.get("/api/ics/billReport").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
  },
  computed: {
    rowSelection() {
      return {
        onChange: () => {},
      };
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  width: 87.3vw;
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
    display: flex;
  }
}
</style>
