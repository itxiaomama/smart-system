<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <a-divider orientation="left">保洁记录</a-divider>
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

              <span slot="leavetime" slot-scope="leavetime">
                <a-tag
                  v-for="tag in leavetime"
                  :key="tag"
                  :color="
                    tag === '按天'
                      ? 'red'
                      : tag === '按周'
                      ? 'cyan'
                      : tag === '按月'
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
  name: "RealOfforestCleanLog",
  data() {
    return {
      dataSource: [
        {
          key: "0",
          roomname: "琪炜物业",
          belongbuild: "琪炜智创园",
          floor: "老李头",
          collect: "一尘不染",
          newtime: "西区-B-1栋-1单元",
          boss: "西边楼宇公共区域",
          leavetime: ["按周"],
          con: "每周一",
          condi: "2022-07-01 10:00:00",
          outtime: "2022-07-01 10:00:00",
        },
        {
          key: "1",
          roomname: "琪炜物业",
          belongbuild: "琪炜智创园",
          floor: "老李头",
          collect: "一尘不染",
          newtime: "西区-B-1栋-1单元",
          boss: "西边楼宇公共区域",
          leavetime: ["按天"],
          con: "每周一",
          condi: "2022-07-01 10:00:00",
          outtime: "2022-07-01 10:00:00",
        },
        {
          key: "2",
          roomname: "琪炜物业",
          belongbuild: "琪炜智创园",
          floor: "老李头",
          collect: "一尘不染",
          newtime: "西区-B-1栋-1单元",
          boss: "西边楼宇公共区域",
          leavetime: ["按月"],
          con: "每周一",
          condi: "2022-07-01 10:00:00",
          outtime: "2022-07-01 10:00:00",
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
          title: "负责人",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "清洁要求",
          dataIndex: "collect",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "清洁地段",
          dataIndex: "newtime",
          scopedSlots: { customRender: "newtime" },
        },
        {
          title: "清洁内容",
          dataIndex: "boss",
          scopedSlots: { customRender: "boss" },
        },
        {
          title: "类型",
          dataIndex: "leavetime",
          scopedSlots: { customRender: "leavetime" },
        },
        {
          title: "周期",
          dataIndex: "con",
          scopedSlots: { customRender: "con" },
        },
        {
          title: "开始时间",
          dataIndex: "condi",
          scopedSlots: { customRender: "condi" },
        },
        {
          title: "结束时间",
          dataIndex: "outtime",
          scopedSlots: { customRender: "outtime" },
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
