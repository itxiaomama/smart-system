<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="top" style="margin-bottom:20px;">
          <div class="left">
            <a-input-search
              placeholder="快速搜索"
              style="width: 200px;"
            />
          </div>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :columns="columns"
              :data-source="dataSource"
              rowKey="id"
              :pagination="pagination"
            >
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
          dataIndex: "activity_name",
          scopedSlots: { customRender: "activity_name" },
        },
        {
          title: "申请人",
          align: "center",
          dataIndex: "user_name",
          scopedSlots: { customRender: "user_name" },
        },
        {
          title: "手机号",
          align: "center",
          dataIndex: "phone",
          scopedSlots: { customRender: "phone" },
        },
        {
          title: "报名时间",
          dataIndex: "sign_date",
          scopedSlots: { customRender: "sign_date" },
        }
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
          this.getlist(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.getlist();
        },
      }, // 页面显示数据分页内容
    };
  },
  methods: {
    getlist() {
      axios.get("/api/prop/activityDetail?per_page=9999").then((res) => {
        this.dataSource = res.data.data;
      });
    },
    toactive(form,type){
      this.$router.push({
        path:'/property/activitydetail',
        query:{
          form:JSON.stringify(form),
          type:type
        }
      })
    }
  },
  created() {
    this.getlist();
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
  }
}
</style>
