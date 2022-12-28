<template>
    <div class="wrap" style="position:relative;overflow-x: hidden;">
      <div class="wrapA" style="position:absolute;width:100%;">
          <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="合同信息">
              <div style="margin: 0 20px">
                <div>
                  <a-descriptions title="基本信息" :column="{ xxl: 4 }">
                    <a-descriptions-item label="合同编号"
                      >{{info.sn}}</a-descriptions-item
                    >
                    <!-- <a-descriptions-item label="意向编号">
                      HT1810000000
                    </a-descriptions-item> -->
                    <a-descriptions-item label="合同名称"
                      >{{info.name}}</a-descriptions-item
                    >
                    <a-descriptions-item label="意向状态">
                      {{info.status_name}}
                    </a-descriptions-item>
                    <a-descriptions-item label="意向时间">
                      {{info.need_start_date}} ~ {{info.need_end_date}}
                    </a-descriptions-item>
                    <a-descriptions-item label="租赁期限">
                      {{info.start_date}} ~ {{info.end_date}}
                    </a-descriptions-item>
                    <a-descriptions-item label="签订日期">
                      {{info.sign_date}}
                    </a-descriptions-item>
                    <a-descriptions-item label="合同类型"
                      >{{info.type_name}}</a-descriptions-item
                    >
                    <a-descriptions-item label="意向金">
                      {{info.intention_money}}
                    </a-descriptions-item>
                    <!-- <a-descriptions-item label="经办人">
                      {{info.create_by}}
                    </a-descriptions-item> -->
                    <!-- <a-descriptions-item label="合同版本">
                      哈哈哥
                    </a-descriptions-item> -->
                    <a-descriptions-item label="备注">
                      {{info.remark}}
                    </a-descriptions-item>
                  </a-descriptions>
                </div>
                <a-divider />
                <div>
                  <a-descriptions title="乙方" :column="{ sm: 2 }">
                    <a-descriptions-item label="客户名称"
                      >{{info.customer_name}}</a-descriptions-item
                    >
                    <br />
                    <a-descriptions-item label="租赁方">
                      {{info.lessor_type_name}}
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
                      {{info.oper_name}}
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
                <div class="content" style="padding-right:20px;">
                  <a-descriptions title="租赁场地"  />
                  <a-table
                    style=" margin: 2vh auto"
                    :data-source="dataSource"
                    :columns="columns"
                  >
                    <span slot="">
                      <a-tag color="cyan"></a-tag>
                    </span>
                  </a-table>
                </div>
                <a-divider />
                <div>
                  <a-descriptions title="固定租金" :column="{ xxl: 4 }">
                    <a-descriptions-item label="租金单价"
                      >{{info.rent_price}}{{info.rent_price_unit_name}}
                    </a-descriptions-item>
                    <a-descriptions-item label="日租金">
                      {{info.rent_increase_day}}
                    </a-descriptions-item>
                    <a-descriptions-item label="月租金"
                      >{{info.rent_increase_month}}</a-descriptions-item
                    >
                  </a-descriptions>
                </div>
                <div>
                  <a-descriptions title="押金" :column="{ xxl: 4 }">
                    <a-descriptions-item label="金额"
                      >{{info.deposit}}元</a-descriptions-item
                    >
                  </a-descriptions>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="账单信息">
              <!-- <span>付款计划</span> -->
              <div class="content" style="padding-right:40px;">
              <a-table
                 rowKey="id"
                :columns="columnsA"
                :data-source="dataSourceA"
                style="margin-top: 20px"
              >
              </a-table>
              </div>
            </a-tab-pane>
          </a-tabs>

        <div style="margin: 20px 36vw; padding-bottom: 40px">
          <a-button type="primary" @click="toPact">
           转成合同</a-button
          >
          <a-button style="margin-left: 20px" @click="btn_out">返回</a-button>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "My_P_Intentiondetail",
  data() {
    return {
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
           title: "账单时间",
          dataIndex: "bill_date",
          scopedSlots: { customRender: "bill_date" },
          width:200
        },
        {
          title: "账单开始时间",
          dataIndex: "bill_start_date",
          scopedSlots: { customRender: "bill_start_date" },
          width:200
        },
        {
          title: "账单结束时间",
          dataIndex: "bill_end_date",
          scopedSlots: { customRender: "bill_end_date" },
        },
        {
          title: "账单收款日",
          dataIndex: "receive_rent_date",
          scopedSlots: { customRender: "receive_rent_date" },
        },
        {
          title: "租金",
          dataIndex: "rent_total_price",
          scopedSlots: { customRender: "rent_total_price" },
        },
        {
          title: "物业管理费",
          dataIndex: "management_total_fee",
          scopedSlots: { customRender: "management_total_fee" },
        },
        {
          title: "能耗费",
          dataIndex: "energy_total_fee",
          scopedSlots: { customRender: "energy_total_fee" },
        },
      ],
      info:{}
    };
  },
  mounted(){
    this.getInfo(this.$route.query.id);
  },
  methods: {
    toPact(id){
      this.$router.push({
        path:'/contract/pactdetail',
        query:{
          id:this.info.id,
          type:2
        }
      })
    },
    callback(key) {
      console.log(key);
    },
    btn_out() {
      this.$router.go(-1);
    },
    getInfo(id){
      axios.get('/api/ics/intentionContract?id='+id).then((res) =>{
        console.log(res)
        this.info = res.data ;
        this.dataSource = res.data.contract_room ;
        this.dataSourceA = res.data.contract_bill;
      })
    }
  },
};
</script>

<style lang="less" scoped>
.wrap {
  background-color: #fff;
  border-radius: 10px;
  height: 85vh;
  overflow-x: auto;
  .wrapA {
    margin: 20px;
  }
}
</style>
