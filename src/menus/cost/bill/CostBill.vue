<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-row>
            <a-col :span="6">
              <a-form-model-item label="客户名称：" prop="customer_name">
                 <a-input v-model="form.customer_name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item label="账单编号：" prop="sn">
                <a-input v-model="form.sn" />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item label="合同编号：" prop="contract_sn">
                <a-input v-model="form.contract_sn" />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item label="账单月份：" prop="receive_rent_date">
                <a-date-picker
                  v-model="form.receive_rent_date"
                  type="date"
                  valueFormat="YYYY-MM-DD"
                  placeholder="Pick a date"
                  style="width: 100%"
                />
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-row>
            <a-col :span="8">
              <a-form-model-item label="账单状态：" prop="status">
               <a-radio-group  v-model="form.status" button-style="solid">
                  <a-radio-button value="0">
                    未收
                  </a-radio-button>
                  <a-radio-button value="1">
                    已收
                  </a-radio-button>
                  <a-radio-button value="2">
                    部分
                  </a-radio-button>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="账单类型：" prop="bill_type">
                <a-radio-group v-model="form.bill_type"  button-style="solid">
                  <a-radio-button value="1">
                    固定账单
                  </a-radio-button>
                  <a-radio-button value="2">
                    其他账单
                  </a-radio-button>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="是否逾期：" prop="is_overdue">
               <a-radio-group  v-model="form.is_overdue" button-style="solid">
                  <a-radio-button value="1">
                   是
                  </a-radio-button>
                  <a-radio-button value="0">
                    否
                  </a-radio-button>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit"> 查询 </a-button>
            <a-button @click="resetForm" style="margin-left: 10px"> 重置 </a-button>
          </a-form-model-item>
        </a-form-model>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :columns="columns"
              :data-source="dataSource"
              :scroll="{ x: '200%' }"
              rowKey="id"
              :pagination="pagination"
            >
            <span slot="is_overdue" slot-scope="text">
                {{ text | menuTypeFilter }}
              </span>
              <template slot="action" slot-scope="text, record">
                <a @click="showmodal(record)"
                  ><a-icon type="account-book" theme="twoTone" />确认收款</a
                >
                <a-divider type="vertical" />
                  <a href="javascript:;" @click="onDelete(record)">
                    <a-icon type="delete" theme="twoTone" />删除</a
                  >
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>
    <a-modal v-model="visible" title="确认收款" width="40%" class="puta">
      <div
        class="buildname"
        style="margin: 20px 0 40px"
        v-if="record.expense_type == 0"
      >
        <span>合计应收其他费用：</span>
        <span>{{ record.other_fee }}</span>
      </div>

      <div class="buildname" style="margin: 20px 0 40px" v-else>
        <span>合计应退其他费用：</span>
        <span>{{ record.refund_fee }}</span>
      </div>
      <a-table
        :columns="columnsa"
        :data-source="dataSourcea"
        rowKey="index"
        v-if="record.expense_type == 0"
      >
        <template slot="income" slot-scope="text, record, index">
          <a-input-number
            :value="text"
            @change="(e) => handleChange(e, record, index)"
          />
        </template>
      </a-table>
      <a-table
        :columns="columnsb"
        :data-source="dataSourcea"
        rowKey="index"
        v-else
      >
        <template slot="income" slot-scope="text, record, index">
          <a-input-number
            :value="text"
            @change="(e) => handleChange(e, record, index)"
          />
        </template>
      </a-table>
      <div class="remake" style="display: flex; margin: 20px 0 40px 46px">
        <span style="white-space: nowrap">备注：</span>
        <a-textarea
          v-model="remark"
          placeholder="请输入备注信息"
          :rows="6"
          style="width: 30vw"
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
import axios from "axios";
export default {
  name: "CostBill",
  filters: {
    menuTypeFilter(type) {
      const menuMap = {
        1: "是",
        0: "否",
      };
      return menuMap[type];
    },
  },
  data() {
    return {
      remark: null,
      record: {},
      dataSource: [],
      columns: [
        {
          title: "账期",
          align: "center",
          width: 200,
          fixed: "left",
          dataIndex: "bill_date",
          scopedSlots: { customRender: "bill_date" },
        },
        {
          title: "客户名称",
          dataIndex: "contract.customer_name",
          width: 180,
          fixed: "left",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "合同名称",
          dataIndex: "contract.name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "账单编号",
          dataIndex: "sn",
          ellipsis: true,
          scopedSlots: { customRender: "sn" },
        },
        {
          title: "合同编号",
          dataIndex: "contract.sn",
          scopedSlots: { customRender: "contract.sn" },
          ellipsis: true,
        },
        {
          title: "物管合同号",
          dataIndex: "contract.pm_sn",
          ellipsis: true,
          scopedSlots: { customRender: "pm_sn" },
        },
        {
          title: "账单类型",
          dataIndex: "bill_type_name",
          scopedSlots: { customRender: "bill_type_name" },
        },
        {
          title: "账单状态",
          dataIndex: "status_name",
          scopedSlots: { customRender: "status_name" },
        },
        {
          title: "是否逾期",
          dataIndex: "is_overdue",
          scopedSlots: { customRender: "is_overdue" },
        },
        {
          title: "收款截止日",
          dataIndex: "receive_rent_date",
          scopedSlots: { customRender: "receive_rent_date" },
        },
        {
          title: "应收租金（元）",
          dataIndex: "rent_total_price",
          scopedSlots: { customRender: "rent_total_price" },
        },
        {
          title: "押金（元）",
          dataIndex: "contract.deposit",
          scopedSlots: { customRender: "condit" },
        },
        {
          title: "已收租金（元）",
          dataIndex: "receive_rent_total_price",
          scopedSlots: { customRender: "receive_rent_total_price" },
        },
        {
          title: "其他费用（元）",
          dataIndex: "other_fee",
          scopedSlots: { customRender: "other_fee" },
        },
        {
          title: "退费（元）",
          dataIndex: "refund_fee",
          scopedSlots: { customRender: "refund_fee" },
        },
        {
          title: "物业管理费（元）",
          dataIndex: "management_total_fee",
          scopedSlots: { customRender: "management_total_fee" },
        },
        {
          title: "合计应收（元）",
          dataIndex: "receivable",
          scopedSlots: { customRender: "receivable" },
        },
        {
          title: "合计未收（元）",
          dataIndex: "uncollected",
          scopedSlots: { customRender: "uncollected" },
        },
        {
          title: "合计已收（元）",
          dataIndex: "received",
          scopedSlots: { customRender: "received" },
        },
        {
          title: "备注",
          dataIndex: "contract.remark",
          ellipsis: true,
          scopedSlots: { customRender: "remark" },
        },
        {
          title: "操作",
          dataIndex: "action",
          width: 180,
          fixed: "right",
          scopedSlots: { customRender: "action" },
        },
      ],
      columnsa: [
        {
          title: "收费名称",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "应收（元）",
          dataIndex: "receivable",
          scopedSlots: { customRender: "receivable" },
        },
        {
          title: "已收（元）",
          dataIndex: "received",
          scopedSlots: { customRender: "received" },
        },
        {
          title: "待收（元）",
          dataIndex: "tobereceived",
          scopedSlots: { customRender: "tobereceived" },
        },
        {
          title: "收到的金额（元）",
          dataIndex: "income",
          scopedSlots: { customRender: "income" },
        },
      ],
      columnsb: [
        {
          title: "收费名称",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "应退（元）",
          dataIndex: "receivable",
          scopedSlots: { customRender: "receivable" },
        },
        {
          title: "已退（元）",
          dataIndex: "received",
          scopedSlots: { customRender: "received" },
        },
        {
          title: "待退（元）",
          dataIndex: "tobereceived",
          scopedSlots: { customRender: "tobereceived" },
        },
        {
          title: "金额（元）",
          dataIndex: "income",
          scopedSlots: { customRender: "income" },
        },
      ],
      dataSourcea: [],
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        customer_name:null,
        sn:null,
        contract_sn:null,
        receive_rent_date:null,
        status:null,
        bill_type:null,
        is_overdue:null
      },
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
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      axios.get("/api/ics/contractBill?per_page=9999",{
        params:this.form
      }).then((res) => {
        let list = res.data.data;
        list.map((el, index) => {
          if (el.bill_type == 1) {
            el.receivable =
              Number(el.rent_total_price) +
              Number(el.management_total_fee) +
              Number(el.energy_total_fee); // 应收
            el.received =
              Number(el.receive_rent_total_price) +
              Number(el.receive_management_total_fee) +
              Number(el.receive_energy_total_fee); // 已收
            el.uncollected =
              Number(el.receivable) -
              Number(el.received) -
              Number(el.pay_refund_fee); // 未收
          } else {
            el.receivable = el.other_fee;
            el.received = el.receive_other_fee;
            el.uncollected =
              Number(el.receivable) -
              Number(el.received) -
              Number(el.pay_refund_fee);
          }
        });
        this.dataSource = list;
      });
    },
    handleChange(value, record, index) {
      const newdata = [...this.dataSourcea];
      const target = newdata.find((val, idx) => index === idx);
      if (target) {
        newdata[index].income = value;
        this.dataSourcea = newdata;
      }
    },
    onDelete(val) {
       let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
        .delete("/api/ics/contractBill", {
          params:{
            id: val.id,
            version: val.version,
          }
          
        })
        .then((res) => {
          that.getList();
        });
        },
        onCancel() {},
      });
  
    },
    showmodal(record) {
      this.record = record;
      if (record.bill_type == 1) {
        let arr = []; // 租金 物管  能耗
        arr.push(
          this.generate(
            "租金",
            record.receive_rent_total_price,
            record.rent_total_price,
            0
          )
        );
        arr.push(
          this.generate(
            "物管",
            record.receive_management_total_fee,
            record.management_total_fee,
            0
          )
        );
        arr.push(
          this.generate(
            "能耗",
            record.receive_energy_total_fee,
            record.energy_total_fee,
            0
          )
        );
        this.dataSourcea = arr;
      } else {
        let arr = [];
        if (record.expense_type == 0) {
          arr.push(
            this.generate(
              record.name,
              record.receive_other_fee,
              record.other_fee,
              0
            )
          );
        } else {
          arr.push(
            this.generate(
              record.name,
              record.refund_fee,
              record.pay_refund_fee,
              0
            )
          );
        }

        this.dataSourcea = arr;
      }
      this.visible = true;
    },
    generate(name, received, receivable) {
      // 名称  已收  应收
      var obj = {
        name: name,
        received: received,
        receivable: receivable,
        receive_price: "",
      };
      obj.tobereceived = Number(receivable) - Number(received);
      obj.receive_price = 0;
      return obj;
    },
    showup() {
      this.visible = false;
    },
    onSubmit() {
      this.getList();
    },
     resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    showdown() {
      if (this.record.bill_type == 1) {
        if (this.dataSourcea[0].income == undefined) {
          this.$message.error("租金金额不能为空！");
          return false;
        }
        if (this.dataSourcea[1].income == undefined) {
          this.$message.error("物管金额不能为空！");
          return false;
        }
        if (this.dataSourcea[2].income == undefined) {
          this.$message.error("能耗金额不能为空！");
          return false;
        }
      } else {
        if (this.dataSourcea[0].income == undefined) {
          this.$message.error("金额不能为空！");
          return false;
        }
      }

      let data = {};
      if (this.record.bill_type == 1) {
        data = {
          id: this.record.id,
          version: this.record.version,
          remark: this.remark,
          pay_refund_fee: this.record.pay_refund_fee,
          receive_rent_total_price: this.dataSourcea[0].income,
          receive_management_total_fee: this.dataSourcea[1].income,
          receive_energy_total_fee: this.dataSourcea[2].income,
          receive_other_fee: this.record.receive_other_fee,
        };
      } else {
        if (this.record.expense_type == 0) {
          data = {
            id: this.record.id,
            version: this.record.version,
            remark: this.remark,
            receive_other_fee: this.dataSourcea[0].income,
          };
        } else {
          data = {
            id: this.record.id,
            version: this.record.version,
            remark: this.remark,
            pay_refund_fee: this.dataSourcea[0].income,
          };
        }
      }

      axios.patch("/api/ics/contractBill/status", data).then((res) => {
        this.getList();
        this.visible = false;
      });
    },
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
        // getCheckboxProps: (record) => ({
        //   props: {
        //     disabled: record.name === "Disabled User", // Column configuration not to be checked
        //     name: record.name,
        //   },
        // }),
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
    .left {
      display: flex;
      div {
        margin-right: 4vw;
      }
      .leftt {
        position: relative;
        margin-left: 4vw;
        p {
          position: absolute;
          top: 0;
          left: -70px;
          text-align: center;
        }
      }
    }
    .right {
      display: flex;
      margin-right: 40px;
      margin-top: 4vh;
      .test {
        margin-left: 14.5vw;
      }
      .state {
        margin-left: 40px;
      }
    }
  }
  .bottom {
    display: flex;
    margin-top: 10px;
  }
  .center {
    display: flex;
    .test {
      width: 15vw;
      height: 5vh;
      margin-right: 4vw;
      margin-top: 4vh;
    }
  }
}
.puta {
  position: relative;
  .put {
    position: absolute;
    top: 228px;
    right: 26px;
    input {
      border: 1px solid rgba(148, 146, 146, 0.253);
    }
  }
}
</style>
