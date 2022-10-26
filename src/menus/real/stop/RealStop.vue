<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <a-input
                placeholder="请输入车牌号码"
                addonBefore="车牌号码"
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
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
            >
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="floor" slot-scope="floor">
                <a-tag
                  v-for="tag in floor"
                  :key="tag"
                  :color="tag.length > 2 ? 'geekblue' : 'green'"
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RealStop",
  data() {
    return {
      dataSource: [
        {
          key: "0",
          belong: "琪炜智创园",
          roomname: "西边楼停车场",
          belongbuild: "浙A12452",
          floor: ["月卡"],
          job: "老王头",
          area: "15915915999",
          cleamtime: "50.00",
          condition: "月卡有效期:2022-04-14 00:00~2022-04-14 00:00 ",
        },
        {
          key: "1",
          belong: "琪炜智创园",
          roomname: "西边楼停车场",
          belongbuild: "浙A12452",
          floor: ["临时车"],
          job: "老王头",
          area: "15915915999",
          cleamtime: "50.00",
          condition: "临时车",
        },
        {
          key: "2",
          belong: "琪炜智创园",
          roomname: "西边楼停车场",
          belongbuild: "浙A12452",
          floor: ["月卡"],
          job: "老王头",
          area: "15915915999",
          cleamtime: "50.00",
          condition: "月卡有效期:2022-04-14 00:00~2022-04-14 00:00 ",
        },
      ],
      columns: [
        {
          title: "所属主体",
          dataIndex: "belong",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "停车场",
          dataIndex: "roomname",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "车牌号码",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "缴费类别",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "姓名",
          dataIndex: "job",
          scopedSlots: { customRender: "job" },
        },
        {
          title: "手机号码",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "金额",
          dataIndex: "cleamtime",
          scopedSlots: { customRender: "cleamtime" },
        },
        {
          title: "备注",
          dataIndex: "condition",
          scopedSlots: { customRender: "condition" },
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
