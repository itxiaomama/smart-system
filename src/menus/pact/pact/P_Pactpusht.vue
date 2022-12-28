<template>
  <div class="wrap">
    <div style="width: 90%; margin: 20px auto">
      <a-steps :current="current" style="margin-bottom: 20px">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
       <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="签订日期：" class="leftitem" prop="sign_date">
          <a-date-picker
            style="width: 300px"
            placeholder="签订日期"
            formdate="YYYY-MM-DD"
            v-model="form.sign_date"
          />
        </a-form-model-item>

        <a-form-model-item label="租赁期限：" class="leftitem" prop="start_date">
          <a-date-picker
            style="float: left; margin-top: 4px"
            v-model="form.start_date"
            formdate="YYYY-MM-DD"
            placeholder="开始时间"
          />
          <a-form-model-item style="float: left" prop="end_date">
            <a-date-picker
              v-model="form.end_date"
              formdate="YYYY-MM-DD"
              placeholder="结束时间"
            />
          </a-form-model-item>
        </a-form-model-item>

        <a-form-model-item label="快捷选择：" class="leftitem">
          <a-radio-group default-value="1" v-model="form.rent_increase_way"  button-style="solid">
            <a-radio-button value="1">1年</a-radio-button>
            <a-radio-button value="2">2年</a-radio-button>
            <a-radio-button value="3">3年</a-radio-button>
            <a-radio-button value="4">4年</a-radio-button>
            <a-radio-button value="5">5年</a-radio-button>
          </a-radio-group>
        </a-form-model-item>

        <div class="content">
          <a-divider orientation="left">固定租金</a-divider>
          <div class="mytable">
            <div class="title">计算方式：按单元面积 租赁面积：200</div>
            <div class="item">
              <div class="left same">
                <a-form-model-item label="租金单价：" prop="rent_price">
                  <div class="flex">
                    <a-input-number
                      :min="1"
                      v-model="form.rent_price"
                      @blur="changeRent"
                    />
                    <dict
                      v-model="form.rent_price_unit"
                      :keyValue="'ics_contract_unit'"
                      style="width: 180px"
                    />
                  </div>
                </a-form-model-item>
              </div>
              <div class="right same">
                <a-form-model-item label="日租金：" prop="rent_increase_day">
                  <div class="flex">
                    <a-input-number
                      :min="1"
                      v-model="form.rent_increase_day"
                    /><span class="text1">元/天</span>
                  </div>
                </a-form-model-item>
              </div>
            </div>

            <div class="item">
              <div class="left same">
                <a-form-model-item label="月租金计算方式：">
                  <a-radio-group v-model="form.rent_increase_way">
                    <a-radio value="1"> 按固定租金 </a-radio>
                    <a-radio value="2"> 按实际天数 </a-radio>
                  </a-radio-group>
                </a-form-model-item>
              </div>
              <div class="right same">
                <a-form-model-item label="月租金：" prop="rent_increase_month">
                  <div class="flex">
                    <a-input-number
                      :min="1"
                      v-model="form.rent_increase_month"
                    /><span class="text1">元/月</span>
                  </div>
                </a-form-model-item>
              </div>
            </div>

            <div class="item">
              <div class="left same">
                <a-form-model-item label="管理费单价：" prop="management_fee">
                  <div class="flex">
                    <a-input-number
                      :min="1"
                      v-model="form.management_fee"
                      @blur="changeManage"
                    />
                    <dict
                      v-model="form.management_fee_unit"
                      :keyValue="'ics_contract_unit'"
                      style="width: 180px"
                    />
                  </div>
                </a-form-model-item>
              </div>
              <div class="right same">
                <a-form-model-item label="能耗费单价：" prop="energy_fee">
                  <div class="flex">
                    <a-input-number
                      :min="1"
                      v-model="form.energy_fee"
                      @blur="changeEnergy"
                    />
                    <dict
                      v-model="form.energy_fee_unit"
                      :keyValue="'ics_contract_unit'"
                      style="width: 180px"
                    />
                  </div>
                </a-form-model-item>
              </div>
            </div>

            <div class="item">
              <div class="left same">
                <a-form-model-item label="日管理费：" prop="management_fee_increase_day">
                  <div class="flex">
                    <a-input-number
                      :min="1"
      
                      v-model="form.management_fee_increase_day"
                    />
                    <span class="text1">元/天</span>
                  </div>
                </a-form-model-item>
              </div>
              <div class="right same">
                <a-form-model-item label="日能耗费：" prop="energy_fee_increase_day">
                  <div class="flex">
                    <a-input-number
                      :min="1"

                      v-model="form.energy_fee_increase_day"
                    />
                    <span class="text1">元/天</span>
                  </div>
                </a-form-model-item>
              </div>
            </div>

            <div class="item">
              <div class="left same">
                <a-form-model-item label="月管理费：" prop="management_fee_increase_month">
                  <div class="flex">
                    <a-input-number
                      :min="1"

                      v-model="form.management_fee_increase_month"
                    />
                    <span class="text1">元/月</span>
                  </div>
                </a-form-model-item>
              </div>
              <div class="right same">
                <a-form-model-item label="月能耗费：" prop="energy_fee_increase_month">
                  <div class="flex">
                    <a-input-number
                      :min="1"
                      v-model="form.energy_fee_increase_month"
                    />
                    <span class="text1">元/月</span>
                  </div>
                </a-form-model-item>
              </div>
            </div>

            <div class="item">
              <div class="right same">
                <a-form-model-item label="押付方式：" prop="deposit_period">
                  <div class="flex">
                    <a-input-number
                      :min="1"
                      v-model="form.deposit_period"
                    /><span class="text1">月</span>
                    <a-form-model-item style="padding: 0" prop="deposit">
                      <a-input-number :min="1" v-model="form.deposit" />
                    </a-form-model-item>
                    <span class="text1">元</span>
                  </div>
                </a-form-model-item>
              </div>
            </div>
          </div>

        </div>
       </a-form-model>
      <div class="steps-action" style="display: flex; padding-bottom: 40px; margin-top: 40px">
        <a-button @click="toindex">返回</a-button>
        <a-button type="primary" style="margin-left: 20px"  @click="handleSubmit">提交</a-button>
        <a-button style="margin-left: 20px" @click="tolast">上一步</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import dict from "@/components/common/dict.vue";
import moment from "moment";
import axios from "axios";
export default {
  name: "My_P_Intentionpusht",
  components: {
    dict,
  },
  watch: {
    'form.rent_price_unit': {
      handler(){
        this.form.rent_price = '';
        this.form.rent_increase_day = '';
        this.form.rent_increase_month = '';
      }
      
    },
    'form.management_fee_unit': {
      handler(){
        this.form.management_fee = '';
        this.form. management_fee_increase_day= '';
        this.form.management_fee_increase_month = '';
      }
    },
    'form.energy_fee_unit':{
      handler(){
        this.form.energy_fee = '';
        this.form.energy_fee_increase_day = '';
        this.form.energy_fee_increase_month = '';
      }
    },
  },
  data() {
    return {
       labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      startTime:null,
      endTime:null,
      timeList:[],
      bills: [],
       form: {
        rent_price_unit: "1",
        management_fee_unit: "1",
        energy_fee_unit: "1",
        rent_increase_way: "1",
      },
      rules: {
        rent_price: [{ required: true, message: '请输入租金单价', trigger: 'blur' }],
        rent_increase_day: [{ required: true, message: '请输入日租金', trigger: 'blur' }],
        rent_increase_month: [{ required: true, message: '请输入月租金', trigger: 'blur' }],
        management_fee: [{ required: true, message: '请输入管理费单价', trigger: 'blur' }],
        management_fee_increase_day: [{ required: true, message: '请输入日管理费', trigger: 'blur' }],
        management_fee_increase_month: [{ required: true, message: '请输入月管理费', trigger: 'blur' }],
        energy_fee: [{ required: true, message: '请输入能耗费单价', trigger: 'blur' }],
        energy_fee_increase_day: [{ required: true, message: '请输入日能耗费', trigger: 'blur' }],
        energy_fee_increase_month: [{ required: true, message: '请输入月能耗费', trigger: 'blur' }],
        deposit_period: [{ required: true, message: '请输入押付方式', trigger: 'blur' }],
        deposit: [{ required: true, message: '', trigger: 'blur' }],
        sign_date: [{ required: true, message: '请选择签订日期', trigger: 'change' }],
        start_date: [{ required: true, message: '请选择租赁时间', trigger: 'change' }],
        end_date: [{ required: true, message: '', trigger: 'change' }],
        
       
      },
      info: {},
      value: 1,
      current: 1,
      steps: [
        {
          title: "填写基础信息",
        },
        {
          title: "填写费项信息",
        },
        {
          title: "完成",
        },
      ],
      dataSource: [],
      columns: [
        {
          title: "账单时间",
          dataIndex: "bill_date",
          scopedSlots: { customRender: "bill_date" },
        },
        {
          title: "账单开始时间",
          dataIndex: "bill_start_date",
          scopedSlots: { customRender: "bill_start_date" },
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
      visible: false,
      generate: false,
    };
  },
  mounted() {
    this.type = this.$route.query.type ;
    console.log(this.type)
    if(this.type == 2){
      this.info = JSON.parse(this.$route.query.form);
      this.getInfo(this.$route.query.id);
    }
    this.info = JSON.parse(this.$route.query.form);
    console.log(this.info)
  },
  methods: {
    // 返回
    toindex(){
      this.$router.push({
        path:'/contract/intention'
      })
    },
    // 上一步
    tolast(){
      if(this.type == 1){
        this.$router.push({
          path:'/contract/pactdetail',
          query:{
            form:JSON.stringify(this.info),
            type:this.type
          }
        })
      }else{
        this.$router.push({
          path:'/contract/pactdetail',
          query:{
            id:this.info.id,
            type:this.type
          }
        })
      }
      
    },
    // 获取详情
    getInfo(id){
      axios.get('/api/ics/customerContract?id='+id).then((res) =>{
        let obj = res.data ;
        this.form = res.data;
        this.form.rent_increase_way = JSON.stringify(obj.rent_increase_way);
        this.form.rent_price_unit = JSON.stringify(obj.rent_price_unit);
        this.form.management_fee_unit = JSON.stringify(obj.management_fee_unit);
        this.form.energy_fee_unit = JSON.stringify(obj.energy_fee_unit);
        this.dataSource = obj.contract_bill;
      })
    },
    // 租金单价
    changeRent(event) {
      let value = event.target.value
      if (this.form.rent_price_unit == 0) {
        this.form.rent_price= value;
        this.form.rent_increase_day = value * 200;
        this.form.rent_increase_month = value * 30 * 200;
      } else {
        this.form.rent_price = value;
        this.form.rent_increase_day = ((value * 200) / 30).toFixed(2);
        this.form.rent_increase_month = value * 200;
      }
    },
    // 管理费单价
    changeManage(event) {
      let value = event.target.value
      if (this.form.management_fee_unit == 0) {
        this.form.management_fee = value;
        this.form.management_fee_increase_day= value * 200;
        this.form.management_fee_increase_month = value * 30 * 200;
      } else {
        this.form.management_fee = value;
        this.form.management_fee_increase_day = ((value * 200) / 30).toFixed(2);
        this.form.management_fee_increase_month = value * 200;
      }
    },
    // 能耗费代价
    changeEnergy(event){
      let value = event.target.value
      if (this.form.energy_fee_unit == 0) {
        this.form.energy_fee = value;
        this.form.energy_fee_increase_day = value * 200;
        this.form.energy_fee_increase_month = value * 30 * 200;
      } else {
        this.form.energy_fee = value;
        this.form.energy_fee_increase_day = ((value * 200) / 30).toFixed(2);
        this.form.energy_fee_increase_month = value * 200;
      }
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.$refs.ruleForm.validate( valid => {
        if (valid) {
          console.log(this.info)
          let data = {
            customer_id: this.info.customer_id,
            sn:this.info.sn,
            pm_sn: this.info.pm_sn,
            name: this.info.name,
            remark: this.info.remark,
            is_to_renew:this.info.is_to_renew,
            lessor_type: this.info.lessor_type,
            customer_name: this.info.customer_name,
            customer_type: this.info.customer_type,
            sector: this.info.sector,
            credit_no: this.info.credit_no,
            email: this.info.email,
            oper_name: this.info.oper_name,
            phone: this.info.phone,
            address: this.info.address,
            channel_name: this.info.channel_name,
            room_ids: this.info.room_ids,
            sign_date: moment(this.form.sign_date).format("YYYY-MM-DD"),
            start_date: moment(this.form.start_date).format("YYYY-MM-DD"),
            end_date: moment(this.form.end_date).format("YYYY-MM-DD"),
            rent_price: this.form.rent_price,
            rent_price_unit: this.form.rent_price_unit,
            rent_increase_day: this.form.rent_increase_day,
            rent_increase_month: this.form.rent_increase_month,
            rent_increase_way: this.form.rent_increase_way,
            management_fee: this.form.management_fee,
            management_fee_unit: this.form.management_fee_unit,
            management_fee_increase_day: this.form.management_fee_increase_day,
            management_fee_increase_month: this.form.management_fee_increase_month,
            energy_fee: this.form.energy_fee,
            energy_fee_unit: this.form.energy_fee_unit,
            energy_fee_increase_day: this.form.energy_fee_increase_day,
            energy_fee_increase_month: this.form.energy_fee_increase_month,
            deposit_period: this.form.deposit_period,
            deposit: this.form.deposit,
          };
          console.log(data)
          if(this.type == 1){
              axios.post("/api/ics/customerContract", data).then((res) => {
                this.$router.push({
                  path:'/contract/pactdetail2'
                })
              });
          }else{
            data.id = this.info.id;
            data.version = this.info.version ;
            axios.patch("/api/ics/customerContract", data).then((res) => {
                this.$router.push({
                  path:'/contract/pactdetail2'
                })
            });
          }
          
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.wrap {
  background-color: #fff;
  border-radius: 10px;
  margin: 10px;
  height: 82vh;
  overflow-x: auto;
  .content {
    width: 100%;
    span {
      line-height: 28px;
    }
  }
  .steps-action {
    margin: 0 28vw;
  }
  .details {
    width: 50vw;
    height: 360px;

    margin: -16px -24px;
    .left,
    .right {
      width: 50%;
      height: 60px;
      border-bottom: 1px solid rgb(221, 220, 220);
    }
    .left {
      border-right: 1px solid rgb(221, 220, 220);
    }
  }
  .ant-form-item-control {
    text-align: left !important;
  }
}
</style>
