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
              <a-button type="primary" @click="toedit(0,1)"> 新增</a-button>
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
              rowKey="id"
              :pagination="pagination"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <template slot="action" slot-scope="text,record">
                <a href="javascript:;" @click="toedit(record.id,2)">
                  <a-icon type="edit" theme="twoTone" /> 编辑</a>
                <a-divider type="vertical" />

                <a href="javascript:;"  @click="delit(record)">
                  <!-- 删除功能 -->
                  <a-icon type="delete" theme="twoTone" />删除</a
                >

                <a-divider type="vertical" />
                <a href="javascript:;" @click="tocon(record)">
                  <!-- 内容详情 -->
                  <a-icon type="file-text" theme="twoTone" />详情</a>
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
          scopedSlots: { customRender: "name" },
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
          dataIndex: "sign_date",
          defaultSortOrder: 'descend', // 默认上到下为由大到小的顺序
          sorter: (a, b) => { return a.time> b.time? 1 : -1 },
        },
        {
          title: "租赁开始日期",
          align: "center",
          dataIndex: "start_date",
          defaultSortOrder: 'descend', // 默认上到下为由大到小的顺序
          sorter: (a, b) => { return a.time> b.time? 1 : -1 },
        },
        {
          title: "租赁结束日期",
          align: "center",
          dataIndex: "end_date",
          defaultSortOrder: 'descend', // 默认上到下为由大到小的顺序
          sorter: (a, b) => { return a.time> b.time? 1 : -1 },
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
      pagination: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = pageSize;
          this.IntentionList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.IntentionList();
        },
      }, // 页面显示数据分页内容
    };
  },
  methods: {
    tocon(val){
      this.$router.push({
        path:'/contract/intentioncon',
        query:{
          id:val.id
        }
      })
    },
    // 获取意向合同列表数据
    IntentionList() {
      axios.get("/api/ics/intentionContract?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    toedit(id,type){
      if(type == 1){
        this.$router.push({
          path:'/contract/intentiondetail',
          query:{
            type:type,
            othen:false
          }
        })
      }else{
        this.$router.push({
          path:'/contract/intentiondetail',
          query:{
            id:id,
            type:type,
            other:false
          }
        })
      }
    },
    delit(info){
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/ics/intentionContract", {
              params: {
                id: info.id,
                version: info.version,
              },
            })
            .then((res) => {
              if (res.message === "success") {
              } // 成功重新更新列表
              that.$message.success("删除成功");
              that.IntentionList();
            });
        },
        onCancel() {},
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
