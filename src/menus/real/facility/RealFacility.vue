<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <div style="margin: 0 40px 16px 0">
                <a-input
                  placeholder="请输入设备名称"
                  addonBefore="设备名称"
                  style="width: 15vw"
                >
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
            <div class="bottom" style="margin-bottom: 20px">
              <div class="new">
                <a-button type="primary">+新增</a-button>
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
              <span slot="area" slot-scope="area">
                <a-tag
                  v-for="tag in area"
                  :key="tag"
                  :color="tag === '使用中' ? 'cyan' : 'volcano'"
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
              <span slot="action">
                <a><a-icon type="edit" theme="twoTone" />编辑</a>
                <a-divider type="vertical" />
                <a><a-icon type="delete" theme="twoTone" />删除</a>
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
  name: "RealFacility",
  data() {
    return {
      dataSource: [
        {
          key: "0",
          roomname: "投影仪",
          belongbuild: "政策服务",
          floor: "琪炜智创园",
          area: ["使用中"],
          brand: "惠普",
          location: "西边楼四楼会议室",
          sleuthtime: "2022.07.01-2032.07.01",
        },
        {
          key: "1",
          roomname: "计算机",
          belongbuild: "政策服务",
          floor: "琪炜智创园",
          area: ["使用中"],
          brand: "中兴",
          location: "西边楼四楼会议室",
          sleuthtime: "2022.07.01-2032.07.01",
        },
        {
          key: "2",
          roomname: "门禁",
          belongbuild: "政策服务",
          floor: "琪炜智创园",
          area: ["维修中"],
          brand: "中兴",
          location: "西边楼四楼会议室",
          sleuthtime: "2022.07.01-2032.07.01",
        },
      ],
      columns: [
        {
          title: "设备名称",
          dataIndex: "roomname",
          width: 200,
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "设备类别",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "所属园区",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "品牌",
          dataIndex: "brand",
          scopedSlots: { customRender: "brand" },
        },
        {
          title: "安装位置",
          dataIndex: "location",
          scopedSlots: { customRender: "location" },
        },
        {
          title: "保修起止日期",
          dataIndex: "sleuthtime",
          scopedSlots: { customRender: "sleuthtime" },
        },
        {
          title: "状态",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "操作",
          dataIndex: "action",
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
  }
  .bottom {
    display: flex;
    margin-top: 2px;
  }
}
</style>
