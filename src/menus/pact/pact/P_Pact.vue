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
              <a-button type="primary">
                <!-- 新增功能 -->
                <router-link to="/home/Ppactpush">新增</router-link>
              </a-button>
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
              :scroll="{ x: '140%' }"
              :rowKey="(record, id) => id"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <!-- 查看详情 -->
              <a slot="floor" slot-scope="text" @click="btn_detail">{{
                text
              }}</a>
              <template slot="action" slot-scope="">
                <a href="javascript:;"
                  ><a-icon type="edit" theme="twoTone" />
                  <!-- 编辑功能 -->
                  <router-link to="/home/Ppactedit">编辑</router-link></a
                >
                <a-divider type="vertical" />
                <!-- 删除功能 -->
                <a href="javascript:;"
                  ><a-icon type="delete" theme="twoTone" />删除</a
                >
                <a-divider type="vertical" />
                <a href="javascript:;"
                  ><a-icon type="check-square" theme="twoTone" />提交</a
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
  name: "My_P_Pact",
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
          dataIndex: "credit_no",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "物管合同号",
          dataIndex: "pm_sn",
        },
        {
          title: "签订日期",
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
          width: 210,
          fixed: "right",
          scopedSlots: { customRender: "action" },
        },
      ],
      visible: false,
    };
  },
  methods: {
    btn_detail() {
      this.$router.push("/home/Ppactdetail");
    },
    // 获取合同数据
    packList() {
      axios.get("/api/ics/customerContract").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
  },
  created() {
    this.packList();
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
      };
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  width: 85vw;
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