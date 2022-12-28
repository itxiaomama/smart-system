<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <div>
                <a-input
                  placeholder="请输入"
                  addonBefore="登录地址"
                  style="margin-right: 20px; width: 13vw"
                />
              </div>
              <div style="margin: 0 40px 20px 20px">
                <a-input
                  placeholder="请输入"
                  addonBefore="登录名称"
                  style="margin-right: 20px; width: 13vw"
                />
              </div>
              <div style="">
                <a-input default-value="登录状态" style="width: 13vw">
                  <a-select
                    slot="addonAfter"
                    default-value="请选择"
                    style="width: 8vw"
                  >
                    <a-select-option value="菜单1"> 全部 </a-select-option>
                    <a-select-option value="菜单2"> 成功 </a-select-option>
                    <a-select-option value="菜单3"> 失败 </a-select-option>
                  </a-select>
                </a-input>
              </div>
              <div style="margin-left: 20px">
                <span>操作时间：</span>
                <a-range-picker />
              </div>
            </div>
            <div class="right">
              <div class="test">
                <a-button type="primary"> 查询 </a-button>
                <a-button style="margin-left: 20px">重置</a-button>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="bottom">
              <div class="new">
                <a-popover trigger="click">
                  <template slot="content">
                    <p>确认清空吗？</p>
                    <p>
                      <a-button size="small">确认</a-button>
                      <a-button type="primary" size="small">取消</a-button>
                    </p>
                  </template>
                  <a-button type="danger" ghost>
                    <a-icon type="close" />清空
                  </a-button>
                </a-popover>
              </div>
              <a-button type="primary" style="margin-left: 20px">
                <a-icon type="rollback" /> 导出
              </a-button>
            </div>
          </div>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :columns="columns"
              :data-source="dataSource"
              :row-selection="rowSelection"
              :pagination="{ pageSize: 500 }"
              :scroll="{ y: 560 }"
            >
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="">
                <a>详情</a>
              </span>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let yy = new Date().getFullYear();
let mm = new Date().getMonth() + 1;
let dd = new Date().getDate();
let hh = new Date().getHours();
let mf =
  new Date().getMinutes() < 10
    ? "0" + new Date().getMinutes()
    : new Date().getMinutes();
let ss =
  new Date().getSeconds() < 10
    ? "0" + new Date().getSeconds()
    : new Date().getSeconds();
let times = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
export default {
  name: "SystemRegist",
  data() {
    return {
      dataSource: [
        {
          key: "0",
          roomname: "1",
          belongbuild: "admin",
          area: "183.129.138.202",
          collect: ".0.0.0.0",
          time: "Firefox 10",
          belang: "Windows 10",
          tem: "成功",
          value: "登录成功",
          action: times,
        },
        {
          key: "1",
          roomname: "2",
          belongbuild: "admin",
          area: "183.129.138.202",
          collect: ".0.0.0.0",
          time: "Firefox 10",
          belang: "Windows 10",
          tem: "成功",
          value: "登录成功",
          action: "2022-07-17 16:15:55",
        },
        {
          key: "2",
          roomname: "3",
          belongbuild: "username",
          area: "183.129.295.202",
          collect: ".0.0.0.0",
          time: "Firefox 10",
          belang: "Windows 10",
          tem: "成功",
          value: "登录成功",
          action: "2022-07-17 16:15:55",
        },
      ],
      columns: [
        {
          title: "访问编号",
          dataIndex: "roomname",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "登录名称",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "登录地址",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "登录地点",
          dataIndex: "collect",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "浏览器",
          dataIndex: "time",
          scopedSlots: { customRender: "time" },
        },
        {
          title: "操作系统",
          dataIndex: "belang",
          scopedSlots: { customRender: "belang" },
        },
        {
          title: "状态",
          dataIndex: "tem",
          scopedSlots: { customRender: "tem" },
        },
        {
          title: "操作信息",
          dataIndex: "value",
          scopedSlots: { customRender: "value" },
        },
        {
          title: "操作时间",
          dataIndex: "action",
          width: 180,
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  methods: {},
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
            disabled: record.name === "Disabled User",
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
  background-color: #fff;
  border-radius: 10px;
  .wrapA {
    width: 100%;
    margin: 20px;
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
    margin-bottom: 10px;
  }
}
</style>
