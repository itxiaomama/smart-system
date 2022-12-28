<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <a-input
                placeholder="请输入任务名称"
                addonBefore="任务名称"
                style="margin-right: 40px"
              />
              <div style="margin-bottom: 16px; margin-right: 40px">
                <a-input default-value="任务组名" style="width: 15vw">
                  <a-select
                    slot="addonAfter"
                    default-value="请选择任务组名"
                    style="width: 10vw"
                  >
                    <a-select-option value="菜单1"> 默认 </a-select-option>
                    <a-select-option value="菜单2"> 系统 </a-select-option>
                  </a-select>
                </a-input>
              </div>
              <div style="margin-bottom: 16px">
                <a-input default-value="任务状态" style="width: 15vw">
                  <a-select
                    slot="addonAfter"
                    default-value="请选择任务状态"
                    style="width: 10vw"
                  >
                    <a-select-option value="菜单2"> 正常 </a-select-option>
                    <a-select-option value="菜单3"> 暂停 </a-select-option>
                  </a-select>
                </a-input>
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
                <a-button
                  type="primary"
                  @click="showModal({}, 1, '新增定时任务')"
                >
                  +新建
                </a-button>
              </div>
              <a-button type="danger" style="margin-left: 20px">
                删除
              </a-button>
            </div>
          </div>
        </div>
        <div class="content">
          <div>
            <a-table
              :columns="columns"
              :data-source="data"
              :row-selection="rowSelection"
              :pagination="{ pageSize: 500 }"
            >
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="stats"
                ><a-switch
                  checked-children="正常"
                  un-checked-children="暂停"
                  default-checked
              /></span>
              <template slot="actions" slot-scope="record">
                <a @click="todoit(record)">执行一次</a>
                <a-divider type="vertical" />
                <a @click="showModal(record, 2, '编辑定时任务')">编辑</a>
                <a-divider type="vertical" />
                <a>删除</a>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>

    <a-modal v-model="visible" :title="title">
      <div class="build" style="margin: 20px 20px 20px 10px; display: flex">
        <span style="white-space: nowrap">任务名称：</span>
        <a-input placeholder="请输入任务名称" style="width: 19.4vw" />
      </div>
      <div class="inputG" style="display: flex; margin: 20px 20px 20px 10px">
        <span class="spanA">任务分组：</span>
        <a-input-group style="width: 15vw" compact>
          <a-cascader
            style="width: 19.4vw"
            :options="property"
            placeholder="请选择"
          />
        </a-input-group>
      </div>
      <div class="buildname" style="margin: 20px 10px; display: flex">
        <span style="white-space: nowrap">调用方法：</span>
        <a-input placeholder="请输入调用目标" style="width: 19.4vw" />
      </div>
      <div class="inputG" style="display: flex; margin: 20px 20px 20px 38px">
        <span class="spanA">状态：</span>
        <a-input-group style="width: 15vw" compact>
          <a-cascader
            style="width: 19.4vw"
            :options="property"
            placeholder="请选择"
          />
        </a-input-group>
      </div>
      <div style="display: flex; margin: 20px 20px 20px 10px">
        <span style="white-space: nowrap">错误策略：</span>
        <div>
          <a-radio-group v-model="value" @change="onChange">
            <a-radio-button value="a"> 立即执行 </a-radio-button>
            <a-radio-button value="b"> 执行一次 </a-radio-button>
            <a-radio-button value="c"> 放弃执行 </a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div style="display: flex; margin: 20px 20px 20px 10px">
        <span style="white-space: nowrap">是否并发：</span>
        <div>
          <a-radio-group v-model="value" @change="onChange">
            <a-radio-button value="a"> 允许 </a-radio-button>
            <a-radio-button value="b"> 禁止 </a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div style="display: flex; margin: 20px 20px 20px 38px">
        <span style="white-space: nowrap">状态：</span>
        <div>
          <a-radio-group v-model="value" @change="onChange">
            <a-radio :value="1"> 是 </a-radio>
            <a-radio :value="2"> 否 </a-radio>
          </a-radio-group>
        </div>
      </div>
      <template slot="footer">
        <div class="btnant" style="margin-top: 20px">
          <a-button style="margin-right: 20px" @click="Addserve">取消</a-button>
          <a-button type="primary" @click="AddChargeSure">确定</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  {
    title: "任务编号",
    dataIndex: "roomname",
    scopedSlots: { customRender: "roomnames" },
  },
  {
    title: "任务名称",
    dataIndex: "belongbuild",
    scopedSlots: { customRender: "belongbuilds" },
  },
  {
    title: "任务组名",
    dataIndex: "area",
    scopedSlots: { customRender: "areas" },
  },
  {
    title: "调用目标字符串",
    dataIndex: "collect",
    scopedSlots: { customRender: "collects" },
  },
  {
    title: "cron执行表达式",
    dataIndex: "time",
    scopedSlots: { customRender: "times" },
  },
  {
    title: "计划执行错误策略",
    dataIndex: "belang",
    scopedSlots: { customRender: "belangs" },
  },
  {
    title: "任务组名",
    dataIndex: "tem",
    scopedSlots: { customRender: "tem" },
  },
  {
    title: "状态",
    dataIndex: "stat",
    scopedSlots: { customRender: "stats" },
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
    roomname: "1",
    belongbuild: "系统默认",
    area: "默认",
    collect: "ryTask.ryNoParams",
    time: "0/10 * * * * ?",
    belang: "1",
    tem: "0",
    stat: "0",
  },
  {
    key: "2",
    roomname: "2",
    belongbuild: "系统默认",
    area: "默认",
    collect: "ryTask.ryNoParams",
    time: "0/10 * * * * ?",
    belang: "1",
    tem: "0",
    stat: "0",
  },
];
export default {
  name: "SystemSettime",
  data() {
    return {
      type: null,
      title: null,
      data,
      columns,
      visible: false,
      value: "",
      form: {},
      property: [],
    };
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.value}`);
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    AddChargeSure(form, type, title) {
      this.type = type;
      this.title = title;
      this.form = { ...form };
      this.visible = false;
    },
    Addserve() {
      this.visible = false;
    },

    todoit(record) {
      console.log(record);
      this.$confirm({
        title: "警告",
        content: "确认要立即执行一次",
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log("Oops errors!"));
        },
        onCancel() {},
      });
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
