<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <a-input
                placeholder="请输入所属主体"
                addonBefore="所属主体"
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
                <a-button type="primary">
                  <router-link to="/home/Rconpanypush">+新增</router-link>
                </a-button>
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
              <span slot="condition" slot-scope="condition">
                <a-tag
                  v-for="tag in condition"
                  :key="tag"
                  :color="
                    tag === '已验收'
                      ? 'pink'
                      : tag === '待验收'
                      ? 'red'
                      : tag === '待支付'
                      ? 'cyan'
                      : tag === '待审核'
                      ? 'DarkGray'
                      : 1
                  "
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
              <template slot="action" slot-scope="text, record">
                <a
                  ><a-icon type="edit" theme="twoTone" />
                  <router-link to="/home/Rconpanyedit">编辑</router-link></a
                >
                <a-divider type="vertical" />
                <a-popconfirm
                  v-if="dataSource.length"
                  title="确定删除?"
                  @confirm="() => onDelete(record.key)"
                >
                  <a href="javascript:;"
                    ><a-icon type="delete" theme="twoTone" />删除</a
                  >
                  <a-divider type="vertical" />
                  <a> <a-icon type="box-plot" theme="twoTone" />完成</a>
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
  name: "RealConpany",
  data() {
    return {
      dataSource: [
        {
          key: "0",
          belong: "琪炜智创园",
          roomname: "西边楼",
          belongbuild: "1单元",
          floor: "422软件部",
          cleamtime: "1天",
          nowtime: "2022-07-01~2022-07-02",
          boss: "5000",
          page: "备注",
          condition: ["已验收"],
        },
        {
          key: "1",
          belong: "琪炜智创园",
          roomname: "西边楼",
          belongbuild: "1单元",
          floor: "422软件部",
          cleamtime: "1天",
          nowtime: "2022-07-01~2022-07-02",
          boss: "5000",
          page: "备注",
          condition: ["待验收"],
        },
        {
          key: "2",
          belong: "琪炜智创园",
          roomname: "西边楼",
          belongbuild: "1单元",
          floor: "422软件部",
          cleamtime: "1天",
          nowtime: "2022-07-01~2022-07-02",
          boss: "5000",
          page: "备注",
          condition: ["待支付"],
        },
        {
          key: "3",
          belong: "琪炜智创园",
          roomname: "西边楼",
          belongbuild: "1单元",
          floor: "422软件部",
          cleamtime: "1天",
          nowtime: "2022-07-01~2022-07-02",
          boss: "5000",
          page: "备注",
          condition: ["待审核"],
        },
      ],
      columns: [
        {
          title: "所属主体",
          dataIndex: "belong",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "楼宇",
          dataIndex: "roomname",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "单元",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "房产",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "预计工期",
          dataIndex: "cleamtime",
          scopedSlots: { customRender: "cleamtime" },
        },
        {
          title: "预估日期",
          dataIndex: "nowtime",
          scopedSlots: { customRender: "nowtime" },
        },
        {
          title: "装修保证金",
          dataIndex: "boss",
          scopedSlots: { customRender: "boss" },
        },
        {
          title: "备注",
          dataIndex: "page",
          scopedSlots: { customRender: "page" },
        },
        {
          title: "状态",
          dataIndex: "condition",
          scopedSlots: { customRender: "condition" },
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  methods: {
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
  border-radius: 10px;
  background-color: #fff;
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
