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
              rowKey="id"
              :pagination="pagination"
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
          dataIndex: "follow_name",
          scopedSlots: { customRender: "follow_name" },
        },
        {
          title: "跟进时间",
          align: "center",
          dataIndex: "investigation_time",
          defaultSortOrder: 'descend', // 默认上到下为由大到小的顺序
          sorter: (a, b) => { return a.time> b.time? 1 : -1 },
        },
        {
          title: "意向水平",
          dataIndex: "intention_state_name",
          scopedSlots: { customRender: "intention_state_name" },
        },
        {
          title: "跟进方式",
          dataIndex: "investigation_mode_name",
          scopedSlots: { customRender: "investigation_mode_name" },
        },
        {
          title: "跟进记录",
          dataIndex: "plan_detailed",
          scopedSlots: { customRender: "plan_detailed" },
        },
        {
          title: "计划跟进时间",
          align: "center",
          dataIndex: "plan_time",
          defaultSortOrder: 'descend', // 默认上到下为由大到小的顺序
          sorter: (a, b) => { return a.time> b.time? 1 : -1 },
        },
        {
          title: "客户名称",
          dataIndex: "customer_name",
          scopedSlots: { customRender: "customer_name" },
        },
        {
          title: "主题",
          dataIndex: "clue_name",
          scopedSlots: { customRender: "clue_name" },
        },
        // {
        //   title: "联系电话",
        //   dataIndex: "butt",
        //   scopedSlots: { customRender: "butt" },
        // },
        {
          title: "线索来源",
          dataIndex: "source_name",
          scopedSlots: { customRender: "source_name" },
        },
        {
          title: "创建时间",
          align: "center",
          dataIndex: "created_at",
          defaultSortOrder: 'descend', // 默认上到下为由大到小的顺序
          sorter: (a, b) => { return a.time> b.time? 1 : -1 },
        },
        {
          title: "分派时间",
          align: "center",
          defaultSortOrder: "(a,b)",
          dataIndex: "assignment_time",
          defaultSortOrder: 'descend', // 默认上到下为由大到小的顺序
          sorter: (a, b) => { return a.time> b.time? 1 : -1 },
        },
        {
          title: "更新时间",
          align: "center",
          dataIndex: "updated_at",
          defaultSortOrder: 'descend', // 默认上到下为由大到小的顺序
          sorter: (a, b) => { return a.time> b.time? 1 : -1 },
        },
        {
          title: "创建人",
          dataIndex: "create_by",
          scopedSlots: { customRender: "create_by" },
        },
      ],
      pagination: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = pageSize;
          this.FollowList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.FollowList();
        },
      }, // 页面显示数据分页内容
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
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
}
</style>
