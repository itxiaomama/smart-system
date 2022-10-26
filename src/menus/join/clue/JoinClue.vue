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
                <router-link to="/home/Jcluepush">新增</router-link>
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
              :rowKey="(record, id) => id"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <span slot="action" slot-scope="text, record">
                <a @click="clueDetail(record.id)">
                  <a-icon type="file-text" theme="twoTone" />详情</a
                >
                <a-divider type="vertical" />
                <a @click="deleteClue(record.id, record.version)">
                  <a-icon type="delete" theme="twoTone" />删除{{ record.id
                  }}{{ record.version }}</a
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
          dataIndex: "",
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
          sorter: (a, b) => {
            let aTimeString = a.collect;
            let bTimeString = b.collect;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "created_at",
        },
        {
          title: "更新时间",
          align: "center",
          sorter: (a, b) => {
            let aTimeString = a.newtime;
            let bTimeString = b.newtime;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "updated_at",
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
        path: "/home/Jcluedetail",
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
}
</style>
