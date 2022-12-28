<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <a-input-search
                placeholder="快速搜索"
                style="width: 200px; margin-right: 40px"
                @click="ShowEdit(true)"
                v-model="inputVal"
              />
            </div>
            <div class="right">
              <div class="test">
                <a-button type="primary" style="margin-right: 20px">
                  线索导出
                </a-button>
              </div>
            </div>
            <div class="bottom">
              <a-button type="primary">
                <router-link to="/merchants/clubdetail">新增</router-link>
              </a-button>
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
              rowKey="id"
              :pagination="pagination"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <span slot="action" slot-scope="text, record">
                <a @click="clueDetail(record.id)">
                  <a-icon type="file-text" theme="twoTone" />详情</a
                >
                <a-divider type="vertical" />
                <a @click="deleteClue(record.id, record.version)">
                  <a-icon type="delete" theme="twoTone" />删除</a
                >
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
  name: "JoinClue",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "客户名称",
          dataIndex: "customer_name",
        },
        {
          title: "主题名称",
          dataIndex: "clue_name",
        },
        {
          title: "联系人",
          dataIndex: "contacts",
        },
        {
          title: "联系电话",
          dataIndex: "phone",
        },
        {
          title: "线索来源",
          dataIndex: "source_name",
        },
        {
          title: "创建时间",
          align: "center",
          dataIndex: "created_at",
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
        },
        {
          title: "对接人",
          dataIndex: "user_name",
        },
        {
          title: "状态",
          dataIndex: "customer_status_name",
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      pagination:{
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
          this.clueList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.clueList();
        },
      }
    };
  },
  created() {
    this.clueList();
  },
  watch: {
    inputVal(newValue) {
      if (newValue) {
        this.ShowEdit(true);
      } else {
        this.ShowEdit(false);
      }
    },
  },
  methods: {
    // 获取线索列表数据
    clueList() {
      axios.get("/api/ics/clue?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    // 删除
    deleteClue(id, version) {
      axios
        .delete("/api/ics/clue", { params: { id: id, version: version } })
        .then(() => {
          this.$message.success("删除线索成功");
          this.clueList(); // 更新表
        });
    },
    // 查询
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/ics/clue", { params: { clue_name: paramName } })
          .then((res) => {
            console.log(res);
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.clueList(); // 更新表
      }
    },
    // 详情
    clueDetail(id) {
      this.$router.push({
        path: "/merchants/clubdetail1",
        query: { id: id },
      });
    },
  },
  computed: {
    rowSelection() {
      return {
        onChange: () => {},
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
  }
}
</style>
