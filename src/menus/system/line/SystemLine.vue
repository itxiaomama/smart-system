<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <a-input
                placeholder="请输入登录账号"
                addonBefore="登录账号"
                style="margin-right: 40px"
              />
              <a-input
                placeholder="请输入登录IP地址"
                addonBefore="登录IP地址"
                style="margin-right: 40px"
              />
            </div>
            <div class="right">
              <div class="test">
                <a-button type="primary"> 查询 </a-button>
                <a-button style="margin-left: 20px">重置</a-button>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="bottom"></div>
          </div>
        </div>
        <div class="content">
          <div>
            <a-table :columns="columns" :data-source="data">
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="areas"
                ><a-switch
                  checked-children="启用"
                  un-checked-children="禁用"
                  default-checked
              /></span>
              <span slot="actions">
                <a>编辑</a>
                <a-divider type="vertical" />
                <a>新增</a>
                <a-divider type="vertical" />
                <a>删除</a>
              </span>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: "ID",
    dataIndex: "roomname",
    scopedSlots: { customRender: "roomnames" },
  },
  {
    title: "用户编号",
    dataIndex: "belongbuild",
    scopedSlots: { customRender: "belongbuilds" },
  },
  {
    title: "登录账号",
    dataIndex: "area",
    scopedSlots: { customRender: "areas" },
  },
  {
    title: "部门名称",
    dataIndex: "collect",
    scopedSlots: { customRender: "collects" },
  },
  {
    title: "登录IP地址",
    dataIndex: "time",
    scopedSlots: { customRender: "times" },
  },
  {
    title: "登录地点",
    dataIndex: "login",
    scopedSlots: { customRender: "logins" },
  },
  {
    title: "浏览器类型",
    dataIndex: "teap",
    scopedSlots: { customRender: "teaps" },
  },
  {
    title: "操作系统",
    dataIndex: "acsty",
    scopedSlots: { customRender: "acstys" },
  },
  {
    title: "登录时间",
    dataIndex: "logintime",
    scopedSlots: { customRender: "logintimes" },
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "actions" },
  },
];
const data = [
  {
    key: "1",
    roomname: "运营部",
    belongbuild: "1",
    area: "admin ",
    collect: "软件部",
    time: "127.129.000.202",
    login: "0.0.0.0.0",
    teap: "Chrome 10",
    acsty: "Windows 10",
    logintime: "2022-07-14 12:03:28",
  },
  {
    key: "2",
    roomname: "市场部",
    belongbuild: "2",
    area: "User ",
    collect: "否",
    time: "2022-07-05 10:12:22",
    login: "0.0.0.0.0",
    teap: "Firefox 10",
    acsty: "Windows 8",
    logintime: "2022-07-14 13:03:28",
  },
];
export default {
  name: "SystemLine",
  data() {
    return {
      data,
      columns,
      visible: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
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
        getCheckboxProps: (record) => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name,
          },
        }),
      };
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  border-radius: 10px;
  padding-right: 20px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px 0 0 20px;
  }
  .top {
    display: flex;
    .left {
      display: flex;
    }
    .right {
      display: flex;
      margin-left: 40px;
      .state {
        margin-left: 40px;
      }
    }
  }
  .bottom {
    display: flex;
    margin-top: 10px;
  }
}
</style>
