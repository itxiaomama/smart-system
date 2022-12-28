<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div>
          <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="合同信息">
              <div style="margin: 0 20px">
                <div style="margin-left: 10vw">
                  <a-descriptions title="主要信息" :column="{ xxl: 3 }">
                    <a-descriptions-item label="租金合同号"
                      >{{info.sn}}</a-descriptions-item
                    >
                    <a-descriptions-item label="物管合同号">
                      {{info.pm_sn}}
                    </a-descriptions-item>
                    <a-descriptions-item label="管理编号"
                      >GL46554987</a-descriptions-item
                    >
                    <a-descriptions-item label="合同名称">
                      {{info.name}}
                    </a-descriptions-item>
                    <a-descriptions-item label="合同状态">
                      {{info.status_name}}
                    </a-descriptions-item>
                    <a-descriptions-item label="租赁期限">
                      {{info.start_date}} ~{{info.end_date}}
                    </a-descriptions-item>
                    <a-descriptions-item label="签订日期">
                      {{info.sign_date}}
                    </a-descriptions-item>
                    <a-descriptions-item label="合同类型"
                      >{{info.lessor_type_name}}</a-descriptions-item
                    >
                    <a-descriptions-item label="经办人">
                      双方合同
                    </a-descriptions-item>
                    <a-descriptions-item label="合同版本">
                      哈哈哥
                    </a-descriptions-item>
                    <a-descriptions-item label="备注">
                      已完成
                    </a-descriptions-item>
                  </a-descriptions>
                </div>
                <a-divider />
                <div style="margin-left: 10vw">
                  <a-descriptions title="乙方" :column="{ sm: 2 }">
                    <a-descriptions-item label="客户名称"
                      >{{info.customer_name}}</a-descriptions-item
                    >
                    <br />
                    <a-descriptions-item label="租赁方">
                      HT1810000000
                    </a-descriptions-item>
                    <a-descriptions-item label="所属行业"
                      >{{info.sector}}</a-descriptions-item
                    >
                    <a-descriptions-item label="纳税人识别号">
                      {{info.credit_no}}
                    </a-descriptions-item>
                    <a-descriptions-item label="公司邮箱">
                      {{info.email}}
                    </a-descriptions-item>
                    <a-descriptions-item label="法人">
                      哈哈哥
                    </a-descriptions-item>
                    <a-descriptions-item label="联系电话">
                      {{info.phone}}
                    </a-descriptions-item>
                    <a-descriptions-item label="渠道名称">
                      {{info.channel_name}}
                    </a-descriptions-item>
                  </a-descriptions>
                </div>
                <a-divider />
                <div class="content">
                  <a-descriptions title="租赁场地" style="margin-left: 10vw" />
                  <a-table
                    style="width: 63vw; margin: 2vh auto"
                    :data-source="dataSource"
                    :columns="columns"
                    rowKey="index"
                  >
                    <a slot="name" slot-scope="text">{{ text }}</a>
                    <span slot="">
                      <a-tag color="cyan"></a-tag>
                    </span>
                  </a-table>
                </div>
                <a-divider />
                <div style="margin-left: 10vw">
                  <a-descriptions title="固定租金" :column="{ xxl: 3 }">
                    <a-descriptions-item label="租金单价"
                      >{{info.rent_price}}
                    </a-descriptions-item>
                    <a-descriptions-item label="日租金">
                      {{info.rent_increase_day}}
                    </a-descriptions-item>
                    <a-descriptions-item label="月租金"
                      >{{info.rent_increase_month}}</a-descriptions-item
                    >
                    <a-descriptions-item label="管理费单价"
                      >{{info.management_fee}}
                    </a-descriptions-item>
                    <a-descriptions-item label="日管理费">
                      {{info.management_fee_increase_day}}
                    </a-descriptions-item>
                    <a-descriptions-item label="月管理费"
                      >{{info.management_fee_increase_month}}</a-descriptions-item
                    >
                    <a-descriptions-item label="能耗费单价"
                      >{{info.energy_fee}}
                    </a-descriptions-item>
                    <a-descriptions-item label="日能耗费">
                      {{info.energy_fee_increase_day}}
                    </a-descriptions-item>
                    <a-descriptions-item label="月能耗费"
                      >{{info.energy_fee_increase_month}}</a-descriptions-item
                    >
                  </a-descriptions>
                </div>
                <div style="margin-left: 10vw">
                  <a-descriptions title="押金" :column="{ xxl: 4 }">
                    <a-descriptions-item label="金额"
                      >400元</a-descriptions-item
                    >
                  </a-descriptions>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="账单信息">
              <span>付款计划</span>
              <a-table
                :columns="columnsA"
                :data-source="dataSourceA"
                rowKey="index"
                style="margin-top: 20px"
              >
              </a-table>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div style="margin: 20px 36vw">
          <a-button style="margin-left: 20px" @click="btn_out">返回</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "My_P_Pactdetail",
  data() {
    return {
      info:{},
      dataSource: [],
      columns: [
        {
          title: "房间名称",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "所属园区",
          dataIndex: "park_name",
          scopedSlots: { customRender: "park_name" },
        },
        {
          title: "所属楼宇",
          dataIndex: "building_name",
          scopedSlots: { customRender: "building_name" },
        },
        {
          title: "所属楼层",
          dataIndex: "building_detail_name",
          scopedSlots: { customRender: "building_detail_name" },
        },
        {
          title: "收租面积（平方米）",
          dataIndex: "rent_area",
          scopedSlots: { customRender: "rent_area" },
        },
      ],
      dataSourceA: [],
      columnsA: [
        {
          title: "账单开始时间",
          dataIndex: "belong",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "账单结束时间",
          dataIndex: "roomname",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "账单收款日",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "租金",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "物业管理费",
          dataIndex: "collect",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "耗能费",
          dataIndex: "collect1",
          scopedSlots: { customRender: "collect1" },
        },
      ],
    };
  },
  mounted(){
    this.getInfo(this.$route.query.id);
    this.getbill(this.$route.query.id);
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    btn_out() {
      this.$router.go(-1);
    },
    getInfo(id){
      axios.get('/api/ics/customerContract?id='+id).then((res) =>{
          console.log(res)
          this.info = res.data ;
          this.dataSource = res.data.contract_room;
      })
    },
    getbill(id){
      axios.get('/api/ics/contractBill?id='+id).then((res) =>{
        console.log(res)
      })
    }
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
