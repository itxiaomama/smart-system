<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="top">
          <div class="search">
            <!-- 搜索 -->
            <a-input-search
              placeholder="快速搜索"
              style="width: 200px; margin-right: 20px"
            />
          </div>
          <div class="bottom">
            <!-- 新增 -->
            <a-button type="primary" @click="edit({},1)"> 新增 </a-button>
          </div>
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :columns="columns"
              :data-source="dataSource"
              :scroll="{ x: '150%' }"
              rowKey="id"
              :pagination="pagination"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <template slot="action" slot-scope="text, record">
                <!-- 编辑 -->
                <a href="javascript:;" @click="edit(record,2)">
                  <a-icon type="edit" theme="twoTone" />编辑
                </a>
                <a-divider type="vertical" />
                <!-- 删除 -->
                <a href="javascript:;">
                  <a-icon type="delete" theme="twoTone" />删除</a
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
  name: "JoinClient",
  data() {
    return {
      dataSource: [], //页面数据源
      columns: [
        {
          title: "所属园区",
          width: 150,
          fixed: "left",
          dataIndex: "address",
        },
        {
          title: "客户名称",
          dataIndex: "name",
          width: 200,
        },
        {
          title: "客户类型",
          dataIndex: "type_name",
        },
        {
          title: "客户状态",
          dataIndex: "customer_status_name",
        },
        {
          title: "所属行业",
          dataIndex: "sector",
        },
        {
          title: "联系人",
          dataIndex: "contacts",
        },
        {
          title: "联系电话",
          dataIndex: "phone",
          width: 150,
        },
        {
          title: "邮箱",
          dataIndex: "email",
          width: 150,
        },
        {
          title: "统一信用代码",
          dataIndex: "credit_no",
          width: 150,
        },
        {
          title: "工商注册号",
          dataIndex: "reg_no",
          width: 150,
        },
        {
          title: "经营状态",
          dataIndex: "status_name",
        },
        {
          title: "组织机构代码",
          dataIndex: "org_no",
          width: 150,
        },
        {
          title: "法人名",
          dataIndex: "oper_name",
        },
        {
          title: "公司类型",
          dataIndex: "channel_type_name",
        },
        {
          title: "成立日期",
          dataIndex: "start_date",
          width: 250,
        },
        {
          title: "操作",
          width: 150,
          fixed: "right",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ], //table表格表头数据
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
          this.ClientList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.ClientList();
        },
      }, // 页面显示数据分页内容
    };
  },
  created() {
    //获取客户列表
    this.ClientList();
  },
  methods: {
    //获取客户列表
    ClientList() {
      axios.get("/api/ics/customer?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    edit(form,type) {
       this.$router.push({
        path: "/merchants/clientdetail",
        query: {
          type:type,
          form:JSON.stringify(form),
          other:false
        },
      });
      
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
    .top {
      display: flex;
    }
  }
}
</style>
