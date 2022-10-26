<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <a-input
                placeholder="请输入车牌号"
                addonBefore="车牌号"
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
            <div class="bottom" style="margin-bottom: 20px">
              <div class="new">
                <a-button type="primary" @click="btn_add"> +新增 </a-button>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
            >
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="cleamtime" slot-scope="cleamtime">
                <a-tag
                  v-for="tag in cleamtime"
                  :key="tag"
                  :color="tag.length > 1 ? 'cyan' : 'green'"
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
              <template slot="action" slot-scope="text, record">
                <a href="javascript:;" @click="btn_edit">
                  <a-icon type="edit" theme="twoTone" />编辑</a
                >
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
                <a-divider type="vertical" />
                <a href="javascript:;" @click="btn_mouth"
                  ><a-icon type="credit-card" theme="twoTone" />月卡</a
                >
                <a-modal v-model="visible" title="月卡登记" width="35%">
                  <div class="buildname">
                    <span>车主姓名：</span
                    ><a-input
                      placeholder="车主姓名"
                      style="width: 26vw"
                      @change="onChange"
                    ></a-input>
                  </div>
                  <div class="buildname" style="margin-top: 20px">
                    <span>手机号码：</span
                    ><a-input
                      placeholder="手机号码"
                      style="width: 26vw"
                      @change="onChange"
                    />
                  </div>
                  <div class="buildname" style="margin-top: 20px">
                    <span>车牌号码：</span
                    ><a-input
                      placeholder="车牌号码"
                      style="width: 26vw"
                      @change="onChange"
                    />
                  </div>
                  <div class="buildname" style="margin-top: 20px">
                    <span>开始日期：</span>
                    <a-month-picker
                      placeholder="请选择日期"
                      @change="onChange"
                      style="width: 26vw"
                    />
                  </div>
                  <div class="buildname" style="margin-top: 20px">
                    <span>结束日期：</span>
                    <a-month-picker
                      placeholder="请选择日期"
                      @change="onChange"
                      style="width: 26vw"
                    />
                  </div>
                  <div class="buildname" style="margin: 20px 0 0 28px">
                    <span>费用：</span
                    ><a-input
                      placeholder="费用"
                      style="width: 26vw"
                      @change="onChange"
                    />
                  </div>
                  <div
                    class="buildname"
                    style="
                      margin: 20px 0 20px 28px;
                      display: flex;
                      white-space: nowrap;
                    "
                  >
                    <span style="line-height: 24px">备注：</span>
                    <a-textarea
                      placeholder="请输入备注信息"
                      :rows="2"
                      style="width: 26vw"
                      @change="onChange"
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
                    <a-button @click="showCancel" style="margin-right: 20px"
                      >取消</a-button
                    >
                    <a-button type="primary" @click="showAdd">确定</a-button>
                  </div>
                </a-modal>
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
  name: "My_R_Car",
  data() {
    return {
      dataSource: [
        {
          key: "0",
          job: "琪炜智创园",
          roomname: "浙A12452",
          belongbuild: "老王头",
          floor: "15715815999",
          cleamtime: ["B区096"],
          area: "2025-01-01",
          condition: "备注",
        },
        {
          key: "1",
          job: "琪炜智创园",
          roomname: "浙A12452",
          belongbuild: "老王头",
          floor: "15715815999",
          cleamtime: ["B区056"],
          area: "2025-01-01",
          condition: "备注",
        },
        {
          key: "2",
          job: "琪炜智创园",
          roomname: "浙A12452",
          belongbuild: "老王头",
          floor: "15715815999",
          cleamtime: ["B区001"],
          area: "2025-01-01",
          condition: "备注",
        },
      ],
      columns: [
        {
          title: "所属主体",
          dataIndex: "job",
          scopedSlots: { customRender: "job" },
        },
        {
          title: "车牌号",
          dataIndex: "roomname",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "车主姓名",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "手机号",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "车位情况",
          dataIndex: "cleamtime",
          scopedSlots: { customRender: "cleamtime" },
        },
        {
          title: "有效日期",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "备注",
          dataIndex: "condition",
          scopedSlots: { customRender: "condition" },
        },
        {
          title: "操作",
          dataIndex: "action",
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
    btn_add() {
      this.$router.push("/home/Rcarpush");
    },
    btn_edit() {
      this.$router.push("/home/Rcaredit");
    },
    btn_mouth() {
      this.visible = true;
    },
    showCancel() {
      this.visible = false;
    },
    showAdd() {
      this.visible = false;
    },
    onDelete(key) {
      console.log(key);
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(
        (dataSource) => dataSource.key !== key
      );
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
  width: 87.3vw;
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
    margin-top: 10px;
  }
}
</style>
