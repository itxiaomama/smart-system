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
            <a-button type="primary">
              <router-link to="/home/Jclientpush">新增</router-link>
            </a-button>
          </div>
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :scroll="{ x: '150%' }"
              :rowKey="(record, id) => id"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <template slot="action" slot-scope="">
                <!-- 编辑 -->
                <a href="javascript:;">
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
    };
  },
  created() {
    //获取客户列表
    this.ClientList();
  },
  methods: {
    //获取客户列表
    ClientList() {
      axios.get("/api/ics/customer").then((res) => {
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
    .top {
      display: flex;
    }
  }
}
</style>
