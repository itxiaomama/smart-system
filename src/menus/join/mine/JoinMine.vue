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
              <span slot="action" slot-scope="text,record">
              <a @click="todetail(record)"><a-icon type="file-text" theme="twoTone" />详情</a>
              </span>
              <span slot="act" slot-scope="act">
                <a-tag
                  v-for="tag in act"
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
  name: "JoinMine",
  data() {
    return {
      dataSource: [],
      columns: [
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
        {
          title: "联系电话",
          dataIndex: "phone",
          scopedSlots: { customRender: "phone" },
        },
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
          scopedSlots: { customRender: "created_at" },
        },
        {
          title: "分派时间",
          align: "center",
          dataIndex: "assignment_time",
          defaultSortOrder: 'descend', // 默认上到下为由大到小的顺序
          sorter: (a, b) => { return a.time> b.time? 1 : -1 },
          scopedSlots: { customRender: "assignment_time" },
          ellipsis: true
        },
        {
          title: "更新时间",
          align: "center",
          dataIndex: "updated_at",
          defaultSortOrder: 'descend', // 默认上到下为由大到小的顺序
          sorter: (a, b) => { return a.time> b.time? 1 : -1 },
          scopedSlots: { customRender: "updated_at" },
        },
        {
          title: "创建人",
          dataIndex: "create_by",
          scopedSlots: { customRender: "create_by" },
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
      visible: false,
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
          this.MineList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.MineList();
        },
      }, // 页面显示数据分页内容
    };
  },
  methods: {
    // 获取我的线索列表
    MineList() {
      axios.get("/api/ics/clue/my?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    todetail(val){
      this.$router.push({
        path:'/merchants/clubdetail1',
        query:{
          id:val.id
        }
      })
    }
  },
  created() {
    this.MineList();
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {},
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
