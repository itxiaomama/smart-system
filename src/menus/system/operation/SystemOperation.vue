<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <div style="">
                <a-input
                  placeholder="请输入"
                  addonBefore="操作人员"
                  style="margin-right: 40px"
                />
              </div>
              <div style="margin: 0 40px 20px 20px">
                <a-input default-value="操作类型" style="width: 13vw">
                  <a-select
                    slot="addonAfter"
                    default-value="请选择"
                    style="width: 8vw"
                  >
                    <a-select-option value="菜单1"> 全部 </a-select-option>
                    <a-select-option value="菜单2"> 新增 </a-select-option>
                    <a-select-option value="菜单3"> 修改 </a-select-option>
                    <a-select-option value="菜单4"> 删除 </a-select-option>
                    <a-select-option value="菜单5"> 授权 </a-select-option>
                    <a-select-option value="菜单6"> 导入 </a-select-option>
                    <a-select-option value="菜单7"> 导出 </a-select-option>
                    <a-select-option value="菜单8"> 强退 </a-select-option>
                    <a-select-option value="菜单9"> 生成代码 </a-select-option>
                    <a-select-option value="菜单10"> 清空数据 </a-select-option>
                  </a-select>
                </a-input>
              </div>
              <div style="margin-bottom: 16px">
                <a-input default-value="操作状态" style="width: 13vw">
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
                <a-range-picker @change="onChange" />
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
                <a-button type="danger" ghost>
                  <a-icon type="close" />清空
                </a-button>
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
              <span slot="action">
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
  name: "SystemOperation",
  data() {
    return {
      dataSource: [
        {
          key: "0",
          roomname: "1",
          belongbuild: "用户管理",
          area: "修改",
          collect: "manager",
          colle: "4546465",
          time: "113.89.233.173",
          belang: "成功",
          tem: times,
          stat: "4小时前",
        },
        {
          key: "1",
          roomname: "2",
          belongbuild: "用户管理",
          area: "修改",
          collect: "manager",
          colle: "4546465",
          time: "113.89.233.173",
          belang: "成功",
          tem: times,
          stat: "4小时前",
        },
        {
          key: "2",
          roomname: "3",
          belongbuild: "菜单管理",
          area: "删除",
          collect: "manager",
          colle: "4546465",
          time: "113.89.233.173",
          belang: "成功",
          tem: times,
          stat: "6小时前",
        },
      ],
      columns: [
        {
          title: "日志编号",
          dataIndex: "roomname",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "系统模块",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "操作类型",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "操作人员",
          dataIndex: "collect",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "主机",
          dataIndex: "time",
          scopedSlots: { customRender: "time" },
        },
        {
          title: "操作地点",
          dataIndex: "colle",
          scopedSlots: { customRender: "colle" },
        },
        {
          title: "状态",
          dataIndex: "belang",
          scopedSlots: { customRender: "belang" },
        },
        {
          title: "操作时间",
          align: "center",
          defaultSortOrder: "(a,b)",
          sorter: (a, b) => {
            let aTimeString = a.tem;
            let bTimeString = b.tem;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "tem",
          scopedSlots: { customRender: "tem" },
        },
        {
          title: "操作",
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
  width: 85vw;
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
