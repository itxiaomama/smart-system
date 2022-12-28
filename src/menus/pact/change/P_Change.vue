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
              rowKey="id"
              :pagination="pagination"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>

              <template slot="action" slot-scope="text,record">
                <a href="javascript:;"  @click="modify(record)"
                  ><a-icon type="security-scan" theme="twoTone" />变更</a
                >
                <a-divider type="vertical" />
                <a href="javascript:;" @click="voidit(record)"
                  ><a-icon type="file-excel" theme="twoTone" />作废</a
                >
                <a-divider type="vertical" />
                <a href="javascript:;" @click="refund(record)"><a-icon type="code" theme="twoTone" />退租</a>

                <a-divider type="vertical" />
                <a href="javascript:;"  @click="renewal(record)"
                  ><a-icon type="code" theme="twoTone" />续签</a
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
          width: 300,
          fixed: "right",
          scopedSlots: { customRender: "action" },
        },
      ],
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
          this.changeList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.changeList();
        },
      }, // 页面显示数据分页内容
    };
  },
  methods: {
    refund(val){
      this.$router.push({
        path:'/contract/withoutany',
        query:{
          id:val.id,
          type:1
        }
      })
    },
    changeList() {
      axios.get("/api/ics/contractChange?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    // 合同变更
    modify(val){
      this.$router.push({
        path:'/contract/modify',
        query:{
          id:val.id,
          type: 2
        }
      })
    },
    // 作废
    voidit(val){
      console.log(val)
      // /api/ics/customerContract/status
      axios.patch('/api/ics/customerContract/status',{
        id:val.id,
        version: val.version,
        status:3
      }).then((res) =>{
        this.changeList();
      })

    },
    // 续签
    renewal(val){
      this.$router.push({
        path:'/contract/pactdetail',
        query:{
          type:1,
          renewal:1
        }
      })
    }
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
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
}
</style>
