<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search" style="margin-bottom: 20px">
          <a-input-search
            placeholder="快速搜索"
            style="width: 200px; margin-right: 40px"
          />
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
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <span slot="action" slot-scope="action">
                <a-tag
                  v-for="tag in action"
                  :key="tag"
                  :color="tag.length < 3 ? 'cyan' : 'orange'"
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
import axios from "axios";
export default {
  name: "JoinFollow",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "跟进人",
          dataIndex: "belong",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "跟进时间",
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
          title: "意向水平",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "跟进方式",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "跟进记录",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "计划跟进时间",
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
          title: "客户名称",
          dataIndex: "newtime",
          scopedSlots: { customRender: "newtime" },
        },
        {
          title: "主题",
          dataIndex: "boss",
          scopedSlots: { customRender: "boss" },
        },
        {
          title: "联系电话",
          dataIndex: "butt",
          scopedSlots: { customRender: "butt" },
        },
        {
          title: "线索来源",
          dataIndex: "con",
          scopedSlots: { customRender: "con" },
        },
        {
          title: "创建时间",
          align: "center",
          defaultSortOrder: "(a,b)",
          sorter: (a, b) => {
            let aTimeString = a.condi;
            let bTimeString = b.condi;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "condi",
          scopedSlots: { customRender: "condi" },
        },
        {
          title: "分派时间",
          align: "center",
          defaultSortOrder: "(a,b)",
          sorter: (a, b) => {
            let aTimeString = a.condit;
            let bTimeString = b.condit;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "condit",
          scopedSlots: { customRender: "condit" },
        },
        {
          title: "更新时间",
          align: "center",
          defaultSortOrder: "(a,b)",
          sorter: (a, b) => {
            let aTimeString = a.conditi;
            let bTimeString = b.conditi;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "conditi",
          scopedSlots: { customRender: "conditi" },
        },
        {
          title: "创建人",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  methods: {
    FollowList() {
      axios.get("/api/ics/clue/follow?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
  },
  created() {
    this.FollowList();
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
}
</style>