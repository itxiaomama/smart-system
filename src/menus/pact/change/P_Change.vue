<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <a-input-search
            placeholder="快速搜索"
            style="width: 200px; margin-right: 40px"
          />
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :scroll="{ x: '140%' }"
              :rowKey="(record, id) => id"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>

              <template slot="action" slot-scope="">
                <a href="javascript:;"
                  ><a-icon type="security-scan" theme="twoTone" />变更</a
                >
                <a-divider type="vertical" />
                <a href="javascript:;"
                  ><a-icon type="file-excel" theme="twoTone" />作废</a
                >
                <a-divider type="vertical" />
                <a href="javascript:;"
                  ><router-link to="/home/Pchangepush"
                    ><a-icon type="code" theme="twoTone" />退租</router-link
                  ></a
                >
              </template>
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
  name: "My_P_Change",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "合同名称",
          dataIndex: "name",
          width: 220,
          fixed: "left",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "合同类型",
          dataIndex: "type_name",
        },
        {
          title: "合同状态",
          dataIndex: "status_name",
        },
        {
          title: "合同编号",
          dataIndex: "sn",
        },
        {
          title: "物管合同号",
          dataIndex: "pm_sn",
        },
        {
          title: "签订日期",
          align: "center",
          dataIndex: "sign_date",
        },
        {
          title: "租赁开始日期",
          align: "center",
          dataIndex: "start_date",
        },
        {
          title: "租赁结束日期",
          align: "center",
          dataIndex: "end_date",
        },
        {
          title: "租赁方",
          dataIndex: "lessor_type_name",
        },
        {
          title: "客户名称",
          dataIndex: "customer_name",
        },
        {
          title: "联系电话",
          dataIndex: "phone",
        },
        {
          title: "操作",
          dataIndex: "action",
          width: 200,
          fixed: "right",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  methods: {
    changeList() {
      axios.get("/api/ics/contractChange").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
  },
  created() {
    this.changeList();
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
}
</style>
