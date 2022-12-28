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
              <span slot="action" slot-scope="text, record">
                <a @click="todetail(record)"><a-icon type="file-text" theme="twoTone" />详情</a>
                <a-divider type="vertical" />
                <a @click="showModal(record)">
                  <a-icon type="tag" theme="twoTone" />分派</a
                >
              </span>
            </a-table>
          </div>
        </div>
      </div>
    </div>

    <a-modal v-model="visible" title="分派">
        <div
          class="buildname"
          style="display: flex; margin-bottom: 40px"
        >
          <span style="white-space: nowrap; line-height: 32px"
            >对接人员：</span
          >
           <a-select style="width: 230px" v-model="userid">
              <a-select-option v-for="item in uselist" :key="item.id" :value="item.id">
                {{item.user_name}}
              </a-select-option>
            </a-select>
        </div>
        <template slot="footer">
        <div>
          <a-button @click="handleOk" style="margin-right: 20px"
            >取消</a-button
          >
          <a-button type="primary" @click="showAdd">确定</a-button>
        </div>
      </template>
  </a-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "JoinAllot",
  data() {
    return {
      userid:null,
      record:{},
      dataSource: [],
      uselist:[],
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
          title: "对接人",
          dataIndex: "contacts",
          scopedSlots: { customRender: "contacts" },
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
          this.AllotList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.AllotList();
        },
      }, // 页面显示数据分页内容
    };
  },
  methods: {
    //获取线索分派列表
    AllotList() {
      axios.get("/api/ics/clue/assignment?per_page=9999").then((res) => {
        // if (res.status_code == 200) {
          this.dataSource = res.data.data;
        // }
      });
    },
    todetail(record){
      this.$router.push({
        path:'/merchants/clubdetail1',
        query:{
          id:record.id
        }
      })
    },
    showModal(record) {
      this.record = record;
      this.getuserlist();
      this.visible = true;
    },
    handleOk() {
      this.userid = null;
      this.visible = false;
    },
    showAdd() {
      console.log(this.userid)
      if(this.userid == null){
        this.$message.error('请选择对接人！')
        return false ;
      }
      let data = {
        id:this.record.id,
        version: this.record.version,
        user_id:this.userid
      }
      axios.patch('/api/ics/clue/assignment',data).then((res) =>{
        this.AllotList();
        this.visible = false;
      })
    
    },
    getuserlist(){
      axios.get("/api/system/user?per_page=9999").then((res) => {
          this.uselist = res.data.data;
      });
    },
  },
  created() {
    this.AllotList();
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
