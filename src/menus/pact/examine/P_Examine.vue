<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <div class="nam">
                <a-input
                  placeholder="请输入合同名称"
                  addonBefore="合同名称"
                  style="width: 15vw"
                />
              </div>
              <div class="nam">
                <a-input
                  placeholder="请输入合同编号"
                  addonBefore="合同编号"
                  style="width: 15vw"
                />
              </div>
              <div class="nam">
                <a-input
                  placeholder="请输入客户名称"
                  addonBefore="客户名称"
                  style="width: 15vw"
                />
              </div>
            </div>
            <div class="right">
              <div class="test">
                <a-button type="primary">查询</a-button>
                <a-button style="margin-left: 20px">重置</a-button>
              </div>
            </div>
          </div>
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :scroll="{ x: '120%' }"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <a slot="floor" slot-scope="text">{{ text }}</a>
              <span slot="butt" slot-scope="butt">
                <a-tag
                  v-for="tag in butt"
                  :key="tag"
                  :color="tag === '公司租赁' ? 'volcano' : 'cyan'"
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
              <a slot="action" slot-scope="" href="javascript:;">
                <a href="javascript:;" @click="btnadd"
                  ><a-icon type="safety-certificate" theme="twoTone" />审批</a
                >
                <a-modal v-model="visible" title="审批合同">
                  <div class="buildname">
                    <span>审批意见：</span>
                    <a-select default-value="" style="width: 20vw">
                      <a-select-option value="lucy">审批通过</a-select-option>
                      <a-select-option value="jack">拒绝通过</a-select-option>
                    </a-select>
                  </div>
                  <div
                    class="remake"
                    style="display: flex; margin: 28px 0 20px 28px"
                  >
                    <span style="white-space: nowrap">原因：</span>
                    <a-textarea
                      placeholder="请输入备注信息"
                      :rows="6"
                      @change="onChange"
                      style="width: 20vw"
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
              </a>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "My_P_Examine",
  data() {
    return {
      dataSource: [
        {
          key: "0",
          belong: "萧山学友科技有限公司",
          roomname: "正式合同",
          belongbuild: "待审批",
          floor: "HT4545664",
          area: "WG10086100",
          collect: "2022-07-01",
          newtime: "2022-07-01",
          boss: "2022-07-01",
          butt: ["公司租赁"],
          con: "老王",
          condi: "34512112125",
        },
        {
          key: "1",
          belong: "杭州学友科技有限公司",
          roomname: "正式合同",
          belongbuild: "待审批",
          floor: "HT4545664",
          area: "WG10086100",
          collect: "2022-05-01",
          newtime: "2022-01-01",
          boss: "2022-09-01",
          butt: ["公司租赁"],
          con: "老王",
          condi: "34512112125",
        },
        {
          key: "2",
          belong: "浙江学友科技有限公司",
          roomname: "正式合同",
          belongbuild: "待审批",
          floor: "HT4545664",
          area: "WG10086100",
          collect: "2022-09-01",
          newtime: "2022-09-01",
          boss: "2022-01-01",
          butt: ["个人租赁"],
          con: "老王",
          condi: "34512112125",
        },
      ],
      columns: [
        {
          title: "合同名称",
          dataIndex: "belong",
          width: 220,
          fixed: "left",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "合同类型",
          dataIndex: "roomname",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "合同状态",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "合同编号",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "物管合同号",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "签订日期",
          align: "center",
          defaultSortOrder: "(a,b)",
          sorter: (a, b) => {
            let aTimeString = a.collect;
            let bTimeString = b.collect;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "collect",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "租赁开始日期",
          align: "center",
          defaultSortOrder: "(a,b)",
          sorter: (a, b) => {
            let aTimeString = a.newtime;
            let bTimeString = b.newtime;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "newtime",
          scopedSlots: { customRender: "newtime" },
        },
        {
          title: "租赁结束日期",
          align: "center",
          defaultSortOrder: "(a,b)",
          sorter: (a, b) => {
            let aTimeString = a.boss;
            let bTimeString = b.boss;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "boss",
          scopedSlots: { customRender: "boss" },
        },
        {
          title: "租赁方",
          dataIndex: "butt",
          scopedSlots: { customRender: "butt" },
        },
        {
          title: "客户名称",
          dataIndex: "con",
          scopedSlots: { customRender: "con" },
        },
        {
          title: "联系电话",
          dataIndex: "condi",
          scopedSlots: { customRender: "condi" },
        },
        {
          title: "操作",
          dataIndex: "action",
          width: 100,
          fixed: "right",
          scopedSlots: { customRender: "action" },
        },
      ],
      visible: false,
    };
  },
  methods: {
    onChange() {
      console.log();
    },
    btnadd() {
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
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
    .left {
      display: flex;
      .nam {
        margin-right: 4vw;
      }
    }
    .right {
      display: flex;
      margin-right: 40px;
      margin-top: 20px;
    }
  }
}
</style>
