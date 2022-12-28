<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <!-- 搜索功能 -->
          <a-input-search placeholder="快速搜索" style="width: 200px" />
        </div>
        <!-- 内容区域 -->
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              rowKey="id"
              :pagination="pagination"
            >
              <a slot="roomname" slot-scope="text">{{ text }}</a>
              <template slot="action" slot-scope="text,record">
                <div v-if="record.status == 0">
                <a href="javascript:;" @click="refundit(record)"
                  ><a-icon type="schedule" theme="twoTone" />确认退租</a
                >
                <a-divider type="vertical" />
                <a href="javascript:;" @click="edit(record)"><a-icon type="edit" theme="twoTone" />编辑</a>
                <a-divider type="vertical" />
                <a href="javascript:;"
                @click="delit(record)"
                  ><a-icon type="delete" theme="twoTone" />删除</a
                >
                </div>
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
  name: "My_P_Lease",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "退租时间",
          align: "center",
          dataIndex: "refund_date",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "退租单号",
          dataIndex: "sn",
        },
        {
          title: "客户名称",
          dataIndex: "contract.customer_name",
        },
        {
          title: "应收金额（元）",
          dataIndex: "receive_fee",
        },
        {
          title: "应退金额（元）",
          dataIndex: "refund_fee",
        },
        {
          title: "合计金额（元）",
          dataIndex: "total_fee",
        },
        {
          title: "退租状态",
          dataIndex: "status_name",
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
          this.leaseList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.leaseList();
        },
      }, // 页面显示数据分页内容
    };
  },
  methods: {
    leaseList() {
      axios.get("/api/ics/contractRefund?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    refundit(val){
      let that = this ;
      axios.patch('/api/ics/contractRefund/status',{
        id:val.id,
        version: val.version,
        status:1
      }).then((res) =>{
          this.$message.success("操作成功");
          that.leaseList();
      })
    },
    delit(val){
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/ics/contractRefund", {
              params: {
                id: val.id,
                version: val.version,
              },
            })
            .then((res) => {
              // 成功重新更新列表
              that.$message.success("删除成功");
              that.leaseList();
            });
        },
        onCancel() {},
      });
    },
    edit(val){
      this.$router.push({
        path:'/contract/withoutany',
        query:{
          id:val.id,
          type:2
        }
      })
    },
  },
  created() {
    this.leaseList();
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
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
}
</style>
