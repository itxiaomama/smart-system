<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="center">
              <div class="test">
                <a-input addonBefore="账单状态" style="width: 0" />
                <span>租赁状态：</span>
                <a-radio-group
                  default-value=""
                  button-style="solid"
                  style="margin-left: 10px"
                >
                  <a-radio-button value="a"> 未收 </a-radio-button>
                  <a-radio-button value="b"> 已收 </a-radio-button>
                  <a-radio-button value="c"> 部分 </a-radio-button>
                </a-radio-group>
              </div>
              <div class="test">
                <a-input addonBefore="账单类型" style="width: 0" />
                <span>租赁状态：</span>
                <a-radio-group
                  default-value=""
                  button-style="solid"
                  style="margin-left: 10px"
                >
                  <a-radio-button value="a"> 固定账单 </a-radio-button>
                  <a-radio-button value="b"> 其他账单 </a-radio-button>
                </a-radio-group>
              </div>
              <div class="test">
                <a-input addonBefore="是否逾期" style="width: 0" />
                <span>租赁状态：</span>
                <a-radio-group
                  default-value=""
                  button-style="solid"
                  style="margin-left: 10px"
                >
                  <a-radio-button value="a"> 是 </a-radio-button>
                  <a-radio-button value="b"> 否 </a-radio-button>
                </a-radio-group>
              </div>
            </div>
            <div class="right">
              <div class="sure">
                <a-button type="primary">确认收款</a-button>
              </div>
              <div class="test">
                <a-button type="primary">查询</a-button>
                <a-button style="margin-left: 20px">重置</a-button>
                <a-button style="margin-left: 20px">导出</a-button>
                <a-button style="margin-left: 20px">租金导入</a-button>
                <a-button style="margin-left: 20px">水电费导入</a-button>
              </div>
            </div>
          </div>
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :columns="columns"
              :data-source="dataSource"
              :scroll="{ x: '200%' }"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <a slot="area" slot-scope="text">{{ text }}</a>
              <template slot="action" slot-scope="text, record">
                <a @click="showmodal"
                  ><a-icon type="account-book" theme="twoTone" />确认收款</a
                >
                <a-modal
                  v-model="visible"
                  title="编辑园区"
                  width="40%"
                  class="puta"
                >
                  <div class="buildname" style="margin: 20px 0 40px">
                    <span>合计应收其他费用：</span>
                    <span>0</span>
                  </div>
                  <div class="put"><input type="text" /></div>
                  <a-table :columns="columnsa" :data-source="dataSourcea">
                    <a slot="" slot-scope="text">{{ text }}</a>
                  </a-table>
                  <div
                    class="remake"
                    style="display: flex; margin: 20px 0 40px 46px"
                  >
                    <span style="white-space: nowrap">备注：</span>
                    <a-textarea
                      placeholder="请输入备注信息"
                      :rows="6"
                      @change="onChange"
                      style="width: 30vw"
                    />
                  </div>
                  <div
                    class="btnant"
                    style="
                      padding: 10px 16px;
                      text-align: right;
                      background: transparent;
                      border-top: 1px solid #e8e8e8;
                      border-radius: 0 0 4px 4px;
                    "
                  >
                    <a-button style="margin-right: 20px" @click="showup"
                      >取消</a-button
                    >
                    <a-button type="primary" @click="showdown">确定</a-button>
                  </div>
                </a-modal>
                <a-divider type="vertical" />
                <a-popconfirm
                  v-if="dataSource.length"
                  title="确定删除?"
                  @confirm="() => onDelete(record.key)"
                >
                  <a href="javascript:;">
                    <a-icon type="delete" theme="twoTone" />删除</a
                  >
                </a-popconfirm>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CostBill",
  data() {
    return {
      dataSource: [
        {
          key: "0",
          belong: "2022-06-22~2022-07-01",
          roomname: "老王",
          belongbuild: "张三",
          floor: "ZD100102001",
          area: "HT10086100",
          collect: "WG165465456",
          newtime: "其他账单",
          boss: "已收",
          butt: "否",
          con: "2020",
          condi: "345",
          condit: "543",
          conditi: "65465",
          water: "125",
          energy: "65",
          other: "1280",
          out: "2112",
          management: "78789",
          bill: "7841",
          unreceived: "14596",
          received: "96520",
          remark: "备注",
        },
        {
          key: "1",
          belong: "2022-06-22~2023-07-01",
          roomname: "老王",
          belongbuild: "张三",
          floor: "ZD100102001",
          area: "HT10086100",
          collect: "WG165465456",
          newtime: "其他账单",
          boss: "已收",
          butt: "否",
          con: "2020",
          condi: "345",
          condit: "543",
          conditi: "65465",
          water: "125",
          energy: "65",
          other: "1280",
          out: "2112",
          management: "78789",
          bill: "7841",
          unreceived: "14596",
          received: "96520",
          remark: "备注",
        },
        {
          key: "2",
          belong: "2022-09-22~2022-07-01",
          roomname: "老王",
          belongbuild: "张三",
          floor: "ZD100102001",
          area: "HT10086100",
          collect: "WG165465456",
          newtime: "其他账单",
          boss: "已收",
          butt: "否",
          con: "2022",
          condi: "345",
          condit: "543",
          conditi: "65465",
          water: "125",
          energy: "65",
          other: "1280",
          out: "2112",
          management: "78789",
          bill: "7841",
          unreceived: "14596",
          received: "96520",
          remark: "备注",
        },
      ],
      columns: [
        {
          title: "账期",
          align: "center",
          defaultSortOrder: "(a,b)",
          sorter: (a, b) => {
            let aTimeString = a.belong;
            let bTimeString = b.belong;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          width: 200,
          fixed: "left",
          dataIndex: "belong",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "客户名称",
          dataIndex: "roomname",
          width: 180,
          fixed: "left",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "合同名称",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "账单编号",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "合同编号",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "物管合同号",
          dataIndex: "collect",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "账单类型",
          dataIndex: "newtime",
          scopedSlots: { customRender: "newtime" },
        },
        {
          title: "账单状态",
          dataIndex: "boss",
          scopedSlots: { customRender: "boss" },
        },
        {
          title: "是否逾期",
          dataIndex: "butt",
          scopedSlots: { customRender: "butt" },
        },
        {
          title: "收款截止日",
          dataIndex: "con",
          scopedSlots: { customRender: "con" },
        },
        {
          title: "应收租金（元）",
          dataIndex: "condi",
          scopedSlots: { customRender: "condi" },
        },
        {
          title: "押金（元）",
          dataIndex: "condit",
          scopedSlots: { customRender: "condit" },
        },
        {
          title: "已收租金（元）",
          dataIndex: "conditi",
          scopedSlots: { customRender: "conditi" },
        },
        {
          title: "水费（元）",
          dataIndex: "water",
          scopedSlots: { customRender: "water" },
        },
        {
          title: "电费（元）",
          dataIndex: "energy",
          scopedSlots: { customRender: "energy" },
        },
        {
          title: "其他费用（元）",
          dataIndex: "other",
          scopedSlots: { customRender: "other" },
        },
        {
          title: "退费（元）",
          dataIndex: "out",
          scopedSlots: { customRender: "out" },
        },
        {
          title: "物业管理费（元）",
          dataIndex: "management",
          scopedSlots: { customRender: "management" },
        },
        {
          title: "合计应收（元）",
          dataIndex: "bill",
          scopedSlots: { customRender: "bill" },
        },
        {
          title: "合计未收（元）",
          dataIndex: "unreceived",
          scopedSlots: { customRender: "unreceived" },
        },
        {
          title: "合计已收（元）",
          dataIndex: "received",
          scopedSlots: { customRender: "received" },
        },
        {
          title: "备注",
          dataIndex: "remark",
          scopedSlots: { customRender: "remark" },
        },
        {
          title: "操作",
          dataIndex: "action",
          width: 180,
          fixed: "right",
          scopedSlots: { customRender: "action" },
        },
      ],
      columnsa: [
        {
          title: "收费名称",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "应收（元）",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "已收（元）",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "待收（元）",
          dataIndex: "collect",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "收到的金额（元）",
          dataIndex: "newtime",
          scopedSlots: { customRender: "newtime" },
        },
      ],
      dataSourcea: [
        {
          belongbuild: "张三",
          floor: "ZD100102001",
          area: "HT10086100",
          collect: "WG165465456",
        },
      ],
      visible: false,
    };
  },
  methods: {
    onChange() {
      console.log();
    },
    onDelete(key) {
      console.log(key);
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(
        (dataSource) => dataSource.key !== key
      );
    },
    showmodal() {
      this.visible = true;
    },
    showup() {
      this.visible = false;
    },
    showdown() {
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
  width: 85vw;
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
    .left {
      display: flex;
      div {
        margin-right: 4vw;
      }
      .leftt {
        position: relative;
        margin-left: 4vw;
        p {
          position: absolute;
          top: 0;
          left: -70px;
          text-align: center;
        }
      }
    }
    .right {
      display: flex;
      margin-right: 40px;
      margin-top: 4vh;
      .test {
        margin-left: 14.5vw;
      }
      .state {
        margin-left: 40px;
      }
    }
  }
  .bottom {
    display: flex;
    margin-top: 10px;
  }
  .center {
    display: flex;
    .test {
      width: 15vw;
      height: 5vh;
      margin-right: 4vw;
      margin-top: 4vh;
    }
  }
}
.puta {
  position: relative;
  .put {
    position: absolute;
    top: 228px;
    right: 26px;
    input {
      border: 1px solid rgba(148, 146, 146, 0.253);
    }
  }
}
</style>
