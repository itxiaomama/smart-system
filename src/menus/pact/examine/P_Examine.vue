<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <div class="nam">
                <a-input
                  placeholder="请输入合同名称"
                  addonBefore="合同名称"
                  style="width: 15vw"
                />
              </div>
              <div class="nam">
                <a-input
                  placeholder="请输入合同编号"
                  addonBefore="合同编号"
                  style="width: 15vw"
                />
              </div>
              <div class="nam">
                <a-input
                  placeholder="请输入客户名称"
                  addonBefore="客户名称"
                  style="width: 15vw"
                />
              </div>
            </div>
            <div class="right">
              <div class="test">
                <a-button type="primary">查询</a-button>
                <a-button style="margin-left: 20px">重置</a-button>
              </div>
            </div>
          </div>
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :columns="columns"
              :data-source="dataSource"
              :scroll="{ x: '120%' }"
              :pagination="pagination"
            >
              <a slot="floor" slot-scope="text">
                <span>{{ text }}</span>
              </a>
              <a slot="action" slot-scope="text,record" href="javascript:;">
                <a href="javascript:;" @click="btnadd(record)"
                  ><a-icon type="safety-certificate" theme="twoTone" />审批</a
                >
              </a>
            </a-table>
          </div>
        </div>
      </div>
    </div>

    <a-modal v-model="visible" title="审批合同">
      <div class="buildname" style="display:flex;">
        <span>审批意见：</span>
        <dict  style="width:200px" :keyValue="'ics_contract_approval'" v-model="status" />
      </div>
      <div class="remake" style="display: flex; margin: 28px 0 20px 28px">
        <span style="white-space: nowrap">原因：</span>
        <a-textarea
          placeholder="请输入备注信息"
          :rows="6"
          v-model="remark"
          style="width: 20vw"
        />
      </div>
      <template slot="footer">
        <div class="btnant">
          <a-button style="margin-right: 20px" @click="showup">取消</a-button>
          <a-button type="primary" @click="showdown">确定</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import axios from 'axios';
import dict from '@/components/common/dict.vue'
export default {
  name: "My_P_Examine",
  components:{
    dict
  },
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "合同名称",
          dataIndex: "name",
          width: 220,
          fixed: "left",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "合同类型",
          dataIndex: "type_name",
          scopedSlots: { customRender: "type_name" },
        },
        {
          title: "合同状态",
          dataIndex: "status_name",
          scopedSlots: { customRender: "status_name" },
        },
        {
          title: "合同编号",
          dataIndex: "sn",
          scopedSlots: { customRender: "sn" },
        },
        {
          title: "物管合同号",
          dataIndex: "pm_sn",
          scopedSlots: { customRender: "pm_sn" },
        },
        {
          title: "签订日期",
          align: "center",
          dataIndex: "sign_date",
          scopedSlots: { customRender: "sign_date" },
        },
        {
          title: "租赁开始日期",
          align: "center",
          defaultSortOrder: "(a,b)",
          dataIndex: "start_date",
          scopedSlots: { customRender: "start_date" },
        },
        {
          title: "租赁结束日期",
          align: "center",
          dataIndex: "end_date",
          scopedSlots: { customRender: "end_date" },
        },
        {
          title: "租赁方",
          dataIndex: "lessor_type_name",
          scopedSlots: { customRender: "lessor_type_name" },
        },
        {
          title: "客户名称",
          dataIndex: "customer_name",
          scopedSlots: { customRender: "customer_name" },
        },
        {
          title: "联系电话",
          dataIndex: "phone",
          scopedSlots: { customRender: "phone" },
        },
        {
          title: "操作",
          dataIndex: "action",
          width: 100,
          fixed: "right",
          scopedSlots: { customRender: "action" },
        },
      ],
      visible: false,
      record:{},
      status:'1',
      remark:'',
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
          this.getList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.getList();
        },
      }, // 页面显示数据分页内容
    };
  },
  mounted(){
    this.getList();
  },
  methods: {
    getList(){
      axios.get('/api/ics/customerContract?status=0&per_page=9999').then((res) =>{
        console.log(res)
        this.dataSource = res.data.data;
      })
    },
    btnadd(record) {
      this.record = record;
      this.visible = true;
    },
    showup() {
      this.status = '1';
      this.remark = '';
      this.visible = false;
    },
    showdown() {
      axios.patch('/api/ics/customerContract/status',{
        id:this.record.id,
        version: this.record.version,
        status_remark:this.remark,
        status: this.status
      }).then((res) =>{
        this.getList();
        this.showup();
      })
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
    .left {
      display: flex;
      .nam {
        margin-right: 4vw;
      }
    }
    .right {
      display: flex;
      margin-right: 40px;
      margin-top: 20px;
    }
  }
}
</style>
