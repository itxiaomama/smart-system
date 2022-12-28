<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <!-- 搜索功能 -->
              <a-input-search
                placeholder="快速搜索"
                style="width: 200px; margin-right: 20px"
              />
            </div>
            <div class="right">
              <a-button type="primary"  @click="toedit(0,1)">
                <!-- 新增功能 -->
                新增
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
              :scroll="{ x: '140%' }"
              rowKey="id"
              :pagination="pagination"
            >
              <!-- 查看详情 -->
              <a slot="floor" slot-scope="text,record" @click="btn_detail(record)">{{text}}</a>
              <template slot="action" slot-scope="text,record">
                <div v-if="record.status !== 3 || record.status !== 4 || record.status !== 5">
                <div v-if="record.status == 2 || record.status == 9">
                <a href="javascript:;"  @click="toedit(record.id,2)"
                  ><a-icon type="edit" theme="twoTone" />
                  <!-- 编辑功能 -->
                  编辑</a>
                <!-- <a-divider type="vertical" /> -->
                <!-- 删除功能 -->
                <!-- <a href="javascript:;"   @click="delit(record)"
                  ><a-icon type="delete" theme="twoTone" />删除</a
                > -->
                <a-divider type="vertical" />
                <a href="javascript:;" @click="commit(record)"
                  ><a-icon type="check-square" theme="twoTone" />提交</a
                >
                </div>
                <div v-if="record.status == 1">
                  <a @click="generate(record)">生成账单</a>
                </div>
                </div>
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
  name: "My_P_Pact",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "合同名称",
          dataIndex: "name",
          width: 220,
          fixed: "left",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "合同类型",
          dataIndex: "type_name",
        },
        {
          title: "合同状态",
          dataIndex: "status_name",
        },
        {
          title: "合同编号",
          dataIndex: "credit_no",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "物管合同号",
          dataIndex: "pm_sn",
        },
        {
          title: "签订日期",
          dataIndex: "sign_date",
          defaultSortOrder: 'descend', // 默认上到下为由大到小的顺序
          sorter: (a, b) => { return a.time> b.time? 1 : -1 },
        },
        {
          title: "租赁开始日期",
          align: "center",
          dataIndex: "start_date",
          defaultSortOrder: 'descend', // 默认上到下为由大到小的顺序
          sorter: (a, b) => { return a.time> b.time? 1 : -1 },
        },
        {
          title: "租赁结束日期",
          align: "center",
          dataIndex: "end_date",
          defaultSortOrder: 'descend', // 默认上到下为由大到小的顺序
          sorter: (a, b) => { return a.time> b.time? 1 : -1 },
        },
        {
          title: "租赁方",
          dataIndex: "lessor_type_name",
        },
        {
          title: "客户名称",
          dataIndex: "customer_name",
        },
        {
          title: "联系电话",
          dataIndex: "phone",
        },
        {
          title: "操作",
          dataIndex: "action",
          width: 210,
          fixed: "right",
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
          this.packList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.packList();
        },
      }, // 页面显示数据分页内容
      
    };
  },
  methods: {
    generate(info){
      this.$router.push({
        path:'/contract/generateBill',
        query:{
          id:info.id
        }
      })
    },
    // 提交
    commit(info){
      axios.patch('/api/ics/customerContract/status',{
        id:info.id,
        version: info.version,
        status: 0,
        status_remark:info.status_remark
      }).then((res) =>{
        console.log(res)
        this.$message.success('操作成功！')
        this.packList();
      })

    },
    toedit(id,type){
      if(type == 1){
        this.$router.push({
          path:'/contract/pactdetail',
          query:{
            type:type,
            renewal:0
          }
        })
      }else{
        this.$router.push({
          path:'/contract/pactdetail',
          query:{
            id:id,
            type
          }
        })
      }
    },
    btn_detail(val) {
      this.$router.push({
        path:'/contract/kdetail',
        query:{
          id:val.id
        }
      });
    },
    // 获取合同数据
    packList() {
      axios.get("/api/ics/customerContract?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    delit(info){
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/ics/customerContract", {
              params: {
                id: info.id,
                version: info.version,
              },
            })
            .then((res) => {
              if (res.message === "success") {
              } // 成功重新更新列表
              that.$message.success("删除成功");
              that.packList();
            });
        },
        onCancel() {},
      });
    },
  },
  created() {
    this.packList();
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
  .top {
    display: flex;
  }
}
</style>
