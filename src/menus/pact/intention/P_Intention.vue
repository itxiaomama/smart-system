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
            <div class="bottom">
              <a-button type="primary">
                <!-- 新增功能 -->
                <router-link to="/home/Pintentionpush">新增</router-link>
              </a-button>
            </div>
          </div>
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              :row-selection="rowSelection"
              bordered
              :columns="columns"
              :data-source="dataSource"
              :rowKey="(record, id) => id"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <template slot="action" slot-scope="">
                <a href="javascript:;">
                  <a-icon type="edit" theme="twoTone" />
                  <!-- 编辑功能 -->
                  <router-link to="/home/Pintentionedit">编辑</router-link></a
                >
                <a-divider type="vertical" />

                <a href="javascript:;">
                  <!-- 删除功能 -->
                  <a-icon type="delete" theme="twoTone" />删除</a
                >

                <a-divider type="vertical" />
                <a href="javascript:;">
                  <!-- 内容详情 -->
                  <a-icon type="file-text" theme="twoTone" /><router-link
                    to="/home/Pintentiondetail"
                    >详情</router-link
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
  name: "My_P_Intention",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "意向名称",
          dataIndex: "name",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "意向类型",
          dataIndex: "type_name",
        },
        {
          title: "意向编号",
          dataIndex: "manage_sn",
        },
        {
          title: "签订日期",
          align: "center",
          defaultSortOrder: "(a,b)",
          sorter: (a, b) => {
            let aTimeString = a.floor;
            let bTimeString = b.floor;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "sign_date",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "租赁开始日期",
          align: "center",
          defaultSortOrder: "(a,b)",
          sorter: (a, b) => {
            let aTimeString = a.area;
            let bTimeString = b.area;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "start_date",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "租赁结束日期",
          align: "center",
          defaultSortOrder: "(a,b)",
          sorter: (a, b) => {
            let aTimeString = a.collect;
            let bTimeString = b.collect;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "end_date",
          scopedSlots: { customRender: "collect" },
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
          title: "意向金（元）",
          dataIndex: "intention_money",
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
      visible: false,
    };
  },
  methods: {
    // 获取意向合同列表数据
    IntentionList() {
      axios.get("/api/ics/intentionContract").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
  },
  created() {
    this.IntentionList();
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
