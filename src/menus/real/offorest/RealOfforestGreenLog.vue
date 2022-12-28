<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <a-divider orientation="left">绿化记录</a-divider>
          <div class="return" @click="btn_return">
            <a-icon type="left-circle" class="icon" />
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
              <a slot="" slot-scope="text">{{ text }}</a>
              <span slot="collect" slot-scope="collect">
                <a-tag
                  v-for="tag in collect"
                  :key="tag"
                  :color="
                    tag === '银杏树'
                      ? 'green'
                      : tag === '桂花树'
                      ? 'blue'
                      : tag === '杨梅树'
                      ? 'cyan'
                      : 1
                  "
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
              <span slot="newtime" slot-scope="newtime">
                <a-tag
                  v-for="tag in newtime"
                  :key="tag"
                  :color="
                    tag === '果木类'
                      ? 'red'
                      : tag === '花木类'
                      ? 'orange'
                      : tag === '叶木类'
                      ? 'pink'
                      : 1
                  "
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
              <span
                slot="action"
                style="display: flex"
                slot-scope="text, record"
              >
                <a-popconfirm
                  v-if="dataSource.length"
                  title="Sure to delete?"
                  @confirm="() => onDelete(record.key)"
                >
                  <a href="javascript:;">删除</a>
                </a-popconfirm>
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
  name: "RealOfforestGreenLog",
  data() {
    return {
      dataSource: [
        {
          key: "0",
          roomname: "琪炜物业",
          belongbuild: "琪炜智创园",
          butt: "东区-西边楼-1单元",
          floor: "老王头",
          area: "007",
          collect: ["银杏树"],
          newtime: ["叶木类"],
          boss: "3年",
          leaveday: "12",
          con: "2022-07-01 10:00:00",
          condi: "2022-07-01 10:00:00",
        },
        {
          key: "1",
          roomname: "琪炜物业",
          belongbuild: "琪炜智创园",
          butt: "东区-西边楼-1单元",
          floor: "老王头",
          area: "007",
          collect: ["桂花树"],
          newtime: ["花木类"],
          boss: "3年",
          leaveday: "12",
          con: "2022-07-01 10:00:00",
          condi: "2022-07-01 10:00:00",
        },
        {
          key: "2",
          roomname: "琪炜物业",
          belongbuild: "琪炜智创园",
          butt: "东区-西边楼-1单元",
          floor: "老王头",
          area: "007",
          collect: ["杨梅树"],
          newtime: ["果木类"],
          boss: "3年",
          leaveday: "12",
          con: "2022-07-01 10:00:00",
          condi: "2022-07-01 10:00:00",
        },
      ],
      columns: [
        {
          title: "所属公司",
          dataIndex: "roomname",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "园区",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "地段",
          dataIndex: "butt",
          scopedSlots: { customRender: "butt" },
        },
        {
          title: "负责人",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "植被编号",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "植被名称",
          dataIndex: "collect",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "种类",
          dataIndex: "newtime",
          scopedSlots: { customRender: "newtime" },
        },
        {
          title: "树龄",
          dataIndex: "boss",
          scopedSlots: { customRender: "boss" },
        },
        {
          title: "数量",
          dataIndex: "leaveday",
          scopedSlots: { customRender: "leaveday" },
        },
        {
          title: "开始时间",
          dataIndex: "con",
          scopedSlots: { customRender: "con" },
        },
        {
          title: "结束时间",
          dataIndex: "condi",
          scopedSlots: { customRender: "condi" },
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
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter((item) => item.key !== key);
    },
    btn_return() {
      this.$router.go(-1);
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
.return {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 4px;
  top: 14px;
  .icon {
    font-size: 28px;
  }
}
.wrap {
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 0 20px 20px 20px;
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
