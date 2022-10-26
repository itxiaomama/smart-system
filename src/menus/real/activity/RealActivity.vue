<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="top">
          <div class="left">
            <a-input-search
              placeholder="快速搜索"
              style="width: 200px; margin-right: 20px"
            />
          </div>
          <div class="bottom" style="margin-bottom: 20px">
            <a-button type="primary">
              <router-link to="/home/Ractivitypush">新增</router-link>
            </a-button>
          </div>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :rowKey="(record, id) => id"
            >
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="area" slot-scope="area">
                <a-tag
                  v-for="tag in area"
                  :key="tag"
                  :color="
                    tag === '报名中'
                      ? 'green'
                      : tag === '已满额'
                      ? 'blue'
                      : tag === '活动结束'
                      ? 'red'
                      : 1
                  "
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
              <span slot="collect"
                ><a-switch
                  checked-children="是"
                  un-checked-children="否"
                  default-checked
              /></span>
              <template slot="action" slot-scope="">
                <a
                  ><router-link to="/home/Ractivityedit">
                    <a-icon type="edit" theme="twoTone" />编辑</router-link
                  ></a
                >
                <a-divider type="vertical" />
                <a href="javascript:;"
                  ><a-icon type="delete" theme="twoTone" />删除</a
                >
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RealActivity",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "活动名称",
          dataIndex: "name",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "报名时间",
          align: "center",
          defaultSortOrder: "(a,b)",
          sorter: (a, b) => {
            let aTimeString = a.roomname;
            let bTimeString = b.roomname;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "roomname",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "活动时间",
          align: "center",
          defaultSortOrder: "(a,b)",
          sorter: (a, b) => {
            let aTimeString = a.belongbuild;
            let bTimeString = b.belongbuild;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "报名人数",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "状态",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "是否上架",
          dataIndex: "collect",
          scopedSlots: { customRender: "collect" },
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
    activityList() {
      axios.get("/api/prop/activity").then((res) => {
        this.dataSource = res.data;
      });
    },
  },
  created() {
    this.activityList();
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
  }
}
</style>