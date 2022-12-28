<template>
  <div class="wrap">
    <div style="width: 90%; margin: 20px auto">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="合同名称：" prop="name" class="leftitem">
          <a-input v-model="form.name" disabled style="width: 300px" />
        </a-form-model-item>

        <a-form-model-item label="租金期限：" prop="sn">
          <a-date-picker
            style="float: left; margin-top: 4px"
            v-model="form.start_date"
            disabled
            formdate="YYYY-MM-DD"
            placeholder="开始时间"
          />
          <a-form-model-item style="float: left" prop="end_date">
            <a-date-picker
              v-model="form.end_date"
              formdate="YYYY-MM-DD"
              disabled
              placeholder="结束时间"
            />
          </a-form-model-item>
        </a-form-model-item>

        <a-form-model-item label="付款周期：" prop="payperiod">
          <dict
            v-model="form.payperiod"
            :keyValue="'ics_contract_payment_period'"
            style="width: 180px"
          />
        </a-form-model-item>

        <a-form-model-item label="账单时间：" prop="bill_start">
          <a-date-picker
            style="float: left; margin-top: 4px"
            v-model="form.bill_start"
            formdate="YYYY-MM-DD"
            @change="changedate"
            placeholder="开始时间"
          />
          <a-form-model-item style="float: left" prop="bill_end">
            <a-date-picker
              v-model="form.bill_end"
              @change="changedate"
              formdate="YYYY-MM-DD"
              placeholder="结束时间"
            />
          </a-form-model-item>
        </a-form-model-item>

        <a-divider orientation="left">其他账单</a-divider>
        <a-button type="primary" @click="showRoom"> 新建费项 </a-button>
      </a-form-model>
      <div class="content">
        <div>
          <a-table
            bordered
            :columns="columns"
            :data-source="dataSource"
            style="margin-top: 20px"
          >
          <template slot="action" slot-scope="text, record,index">
                <a href="javascript:;" @click="delit(record,index)"> 删除</a>
            </template>
          </a-table>
        </div>
      </div>

      <a-divider orientation="left">固定账单</a-divider>
      <div class="content">
        <div>
          <a-table
            bordered
            :columns="columns1"
            :data-source="dataSource1"
            rowKey="index"
            style="margin-top: 20px"
          >
          </a-table>
        </div>
      </div>

      <div style="padding-top: 20px; padding-bottom: 40px; text-align: center">
        <a-button><router-link to="/contract/pact">返回</router-link></a-button>
        <a-button
          type="primary"
          style="margin-left: 20px"
          @click="nextStep"
          v-if="btnshow"
          >提交
        </a-button>
        <a-button style="margin-left: 20px" @click="generatePay"
          >生成付款计划</a-button
        >
      </div>
    </div>

    <a-modal v-model="visible" centered title="新建费项">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <a-form-model
              :model="room"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              ref="ruleForm1"
              :rules="rules1"
            >
              <a-form-model-item label="费项名称：" prop="id">
                <a-select v-model="room.id" placeholder="请选择">
                  <a-select-option
                    @click="changeit(item)"
                    v-for="item in comlist"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item label="款项类型：">
                <a-select v-model="room.expense_type"  placeholder="请选择">
                  <a-select-option value="0"> 应收 </a-select-option>
                  <a-select-option value="1"> 应退 </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item label="开始时间：" prop="bill_start_date" class="leftitem">
                <a-date-picker
                  style="float: left; margin-top: 4px"
                  v-model="room.bill_start_date"
                  formdate="YYYY-MM-DD"
                  placeholder="开始时间"
                />
              </a-form-model-item>
              <a-form-model-item label="结束时间：" prop="bill_end_date" class="leftitem">
                <a-date-picker
                  style="float: left; margin-top: 4px"
                  v-model="room.bill_end_date"
                  formdate="YYYY-MM-DD"
                  placeholder="开始时间"
                />
              </a-form-model-item>
              <a-form-model-item label="收款日：" prop="receive_rent_date" class="leftitem">
                <a-date-picker
                  style="float: left; margin-top: 4px"
                  v-model="room.receive_rent_date"
                  formdate="YYYY-MM-DD"
                  placeholder="开始时间"
                />
              </a-form-model-item>
              <a-form-model-item label="金额（元）：" class="leftitem">
                <a-input-number
                  :min="1"
                  style="width: 200px"
                  v-model="room.other_fee"
                />
              </a-form-model-item>
            </a-form-model>
          </div>
        </div>
      </div>
      <template slot="footer">
        <div class="btnant">
          <a-button style="margin-right: 20px" @click="btn_up">取消</a-button>
          <a-button type="primary" @click="btn_down">确定</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import dict from "@/components/common/dict.vue";
import moment from "moment";

export default {
  name: "My_P_Intentionpush",
  components: {
    dict,
  },
  data() {
    return {
      btnshow: false,
      type: null,
      id: null,
      comlist: [],
      visible1: false,
      value: 1,
      current: 0,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        customer_id: null,
        name: "",
        remark: "",
        lessor_type: "1",
      },
      room: {
        expense_type:'0'
      },
      rules1: {
        id: [{ required: true, message: "请选择费项", trigger: "change" }],
        bill_start_date: [
          { required: true, message: "请选择开始时间", trigger: "change" },
        ],
        bill_end_date: [
          { required: true, message: "请选择结束时间", trigger: "change" },
        ],
        receive_rent_date:[
          { required: true, message: "请选择账单收款日", trigger: "change" },
        ]
      },
      rules: {
        payperiod: [
          { required: true, message: "请选择付款周期", trigger: "change" },
        ],
        bill_start: [
          { required: true, message: "请选择账单时间", trigger: "change" },
        ],
        bill_end: [{ required: true, message: "", trigger: "change" }],
        customer_name: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
        ],
      },
      columns1: [
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
          title: "租金（元）",
          dataIndex: "rent_total_price",
          scopedSlots: { customRender: "rent_total_price" },
        },
        {
          title: "物业管理费（元）",
          dataIndex: "management_total_fee",
          scopedSlots: { customRender: "management_total_fee" },
        },
        {
          title: "能耗费（元）",
          dataIndex: "energy_total_fee",
          scopedSlots: { customRender: "energy_total_fee" },
        },
      ],
      columns: [
        {
          title: "费项名称",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "款项类型",
          dataIndex: "expense_type",
          customRender: (text, record, index) =>
            text ? (text == 0 ? "应收" : "应退") : "--",
        },
        {
          title: "开始时间",
          dataIndex: "bill_start_date",
          scopedSlots: { customRender: "bill_start_date" },
        },
        {
          title: "结束时间",
          dataIndex: "bill_end_date",
          scopedSlots: { customRender: "bill_end_date" },
        },
        {
          title: "金额（元）",
          dataIndex: "other_fee",
          scopedSlots: { customRender: "other_fee" },
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      visible: false,
      dataSource: [],
      dataSource1: [],
      roomlist: [],
      record: [],
    };
  },
  mounted() {
    this.getInfo(this.$route.query.id);
  },
  watch:{
    "form.payperiod": {
      handler() {
        this.btnshow = false ;
      },
    },
  },
  methods: {
    changedate(event){
      this.btnshow = false;
    },
    delit(val,index) {
      this.dataSource.splice(index,1);
    },
    changeit(value) {
      this.room.name = value.name;
    },
    getInfo(id) {
      axios.get("/api/ics/customerContract?id=" + id).then((res) => {
        this.form = res.data;
      });
    },
    getcomList() {
      axios.get("/api/ics/expenseSettings").then((res) => {
        this.comlist = res.data.data;
      });
    },
    showRoom() {
      this.getcomList();
      this.visible = true;
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    btn_up() {
      this.$refs.ruleForm1.resetFields();
      this.visible = false;
    },
    btn_down() {
      this.$refs.ruleForm1.validate((valid) => {
        if (valid) {
          var data = {
            name: this.room.name,
            bill_date:
              moment(this.room.bill_start_date).format("YYYY-MM-DD") +
              "~" +
              moment(this.room.bill_end_date).format("YYYY-MM-DD"),
            bill_start_date: moment(this.room.bill_start_date).format(
              "YYYY-MM-DD"
            ),
            bill_end_date: moment(this.room.bill_end_date).format("YYYY-MM-DD"),
            receive_rent_date: moment(this.room.receive_rent_date).format(
              "YYYY-MM-DD"
            ),
            other_fee: this.room.other_fee,
            expense_type: this.room.expense_type,
          };
          this.btn_up();
          this.dataSource.push(data);
        }
      });
    },
    generatePay() {
      console.log(this.form.start_date);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .get(
              "/api/ics/contractBill/init?start_date=" +
                moment(this.form.bill_start).format("YYYY-MM-DD") +
                "&end_date=" +
                moment(this.form.bill_end).format("YYYY-MM-DD") +
                "&rent_increase_day=" +
                this.form.rent_increase_day +
                "&rent_increase_month=" +
                this.form.rent_increase_month +
                "&management_fee_increase_day=" +
                this.form.management_fee_increase_day +
                "&management_fee_increase_month=" +
                this.form.management_fee_increase_month +
                "&energy_fee_increase_day=" +
                this.form.energy_fee_increase_day +
                "&energy_fee_increase_month=" +
                this.form.energy_fee_increase_month +
                "&payment_period=" +
                this.form.payperiod
            )
            .then((res) => {
              this.dataSource1 = res.data;
              this.btnshow = true;
            });
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    nextStep() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.form);
          let info = this.form;
          let data = {
            version: info.version,
            customer_id: info.customer_id,
            contract_id: info.id,
            rent_increase_way: info.rent_increase_way,
            payment_period: info.payperiod,
            deposit: info.deposit,
            deposit_period: info.deposit_period,
            bill_start_date: moment(info.bill_start).format("YYYY-MM-DD"),
            bill_end_date: moment(info.bill_end).format("YYYY-MM-DD"),
            bills: this.dataSource1,
            other_bills: this.dataSource,
          };
          axios.post("/api/ics/contractBill", data).then((res) => {
            console.log(res);
            this.$message.success("操作成功！");
            this.$router.push({
              path: "/contract/pact",
            });
          });
        } else {
          console.log("error submit!!");
          return false;
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
    margin: 0 33vw;
  }
}
.ant-form-item-control{
  text-align: left!important;
}
</style>
