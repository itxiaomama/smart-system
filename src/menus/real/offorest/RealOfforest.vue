<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <a-input
                placeholder="请输入园区地段"
                addonBefore="园区地段"
                style="margin-right: 40px"
              />
              <a-input
                placeholder="请输入植被编号"
                addonBefore="植被编号"
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
          <div class="matter">
            <a-tabs default-active-key="1">
              <a-tab-pane key="1">
                <a-button
                  type="primary"
                  style="margin-bottom: 20px"
                  @click="btnl_add(1)"
                  >+新增</a-button
                >
                <span slot="tab">
                  <a-icon type="contacts" />
                  绿化安排
                </span>
                <div class="car">
                  <a-table
                    bordered
                    :row-selection="rowSelection"
                    :columns="columnsB"
                    :data-source="dataB"
                  >
                    <a slot="name" slot-scope="text">{{ text }}</a>
                    <span slot="condion" style="font-size: 28px">
                      <a-icon
                        style="font-size: 28px"
                        type="file-text"
                        theme="twoTone"
                        @click="btnl_log"
                      />
                    </span>
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

                    <template slot="action" slot-scope="text, record">
                      <a href="javascript:;" @click="btnl_add(2)">
                        <a-icon type="edit" theme="twoTone" />编辑</a
                      >
                      <a-divider type="vertical" />
                      <a-popconfirm
                        v-if="dataB.length"
                        title="确定删除?"
                        @confirm="() => onDeleteB(record.key)"
                      >
                        <a href="javascript:;"
                          ><a-icon type="delete" theme="twoTone" />删除</a
                        >
                      </a-popconfirm>
                    </template>
                  </a-table>
                </div>
              </a-tab-pane>
              <a-tab-pane key="2">
                <a-button
                  type="primary"
                  style="margin-bottom: 20px"
                  @click="btnb_add(1)"
                  >+新增</a-button
                >
                <span slot="tab">
                  <a-icon type="car" />
                  保洁安排
                </span>
                <div class="car">
                  <a-table
                    bordered
                    :row-selection="rowSelection"
                    :columns="columnsA"
                    :data-source="dataA"
                  >
                    <a slot="name" slot-scope="text">{{ text }}</a>
                    <span slot="titl" style="font-size: 28px">
                      <a-icon
                        style="font-size: 28px"
                        type="file-text"
                        theme="twoTone"
                        @click="btnb_log"
                      />
                    </span>
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
                    <template slot="action" slot-scope="text, record">
                      <a href="javascript:;" @click="btnb_add(2)">
                        <a-icon type="edit" theme="twoTone" />编辑</a
                      >
                      <a-divider type="vertical" />
                      <a-popconfirm
                        v-if="dataA.length"
                        title="确定删除?"
                        @confirm="() => onDeleteA(record.key)"
                      >
                        <a href="javascript:;"
                          ><a-icon type="delete" theme="twoTone" />删除</a
                        >
                      </a-popconfirm>
                    </template>
                  </a-table>
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RealOfforest",
  data() {
    return {
      dataB: [
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
      columnsB: [
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
          title: "绿化记录",
          dataIndex: "condion",
          align: "center",
          scopedSlots: { customRender: "condion" },
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
      dataA: [
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
      columnsA: [
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
          title: "保洁记录",
          dataIndex: "titl",
          align: "center",
          scopedSlots: { customRender: "titl" },
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
    btnl_add(type) {
      this.$router.push({
        path: "/property/offorestdetail",
        query: {
          type: type,
        },
      });
    },
    btnb_add(type) {
      this.$router.push({
        path: "/property/arrangedetail",
        query: {
          type: type,
        },
      });
    },
    btnl_log() {
      this.$router.push("/property/cleanlog");
    },
    btnb_log() {
      this.$router.push("/property/arrangelog");
    },
    onDeleteB(key) {
      console.log(key);
      const dataSource = [...this.dataB];
      this.dataB = dataSource.filter((dataB) => dataB.key !== key);
    },
    onDeleteA(key) {
      console.log(key);
      const dataSource = [...this.dataA];
      this.dataA = dataSource.filter((dataA) => dataA.key !== key);
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
  .matter {
    margin-top: 10px;
    .carcase {
      width: 100%;
      height: 40px;
      border: 1px solid rgb(185, 231, 250);
      display: flex;
      margin: 0 auto;
      .carleft {
        width: 60%;
        border-right: 1px solid rgb(185, 231, 250);
        text-align: center;
        line-height: 40px;
        span {
          letter-spacing: inherit;
        }
      }
      .carright {
        margin: auto;
      }
    }
  }
}
</style>
