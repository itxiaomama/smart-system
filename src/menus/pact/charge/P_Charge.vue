<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <!-- 搜索 -->
            <div class="left">
              <a-input-search
                placeholder="快速搜索"
                style="width: 200px; margin-right: 20px"
                @click="ChargeShow(true)"
                v-model="ChargeinputVal"
              />
            </div>
            <!-- 新增 -->
            <div class="bottom">
              <a-button type="primary" @click="AddCharge({}, 1, '新增费用')"
                >新增</a-button
              >
            </div>
          </div>
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :columns="columns"
              :data-source="dataSource"
              rowKey="id"
              :pagination="pagination"
            >
              <span slot="roomname" slot-scope="text, record">
                <a-switch
                  v-if="record.is_enabled == 1"
                  default-checked
                  checked-children="是"
                  un-checked-children="否"
                  @change="
                    switchChange(
                      $event,
                      record
                    )
                  "
                />
                <a-switch
                  v-if="record.is_enabled == 0"
                  default-unchecked
                  checked-children="是"
                  un-checked-children="否"
                  @change="
                    switchChange(
                      $event,
                      record
                    )
                  "
                />
              </span>
              <template slot="operation" slot-scope="text, record">
                <!-- 编辑 -->
                <a
                  href="javascript:;"
                  @click="AddCharge(record, 2, '编辑费用')"
                >
                  <a-icon type="edit" theme="twoTone" />编辑</a
                >

                <a-divider type="vertical" />
                <!-- 删除 -->
                <a
                  href="javascript:;"
                  @click="DeleteCharge(record.id, record.version)"
                >
                  <a-icon type="delete" theme="twoTone" />删除</a
                >
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增modal弹框 -->
    <a-modal v-model="visibleAdd" :title="title" width="35%">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item  label="费项名称：" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>

        <a-form-model-item label="费项类型：" prop="type">
          <!-- ics_expense_type -->
          <dict v-model="form.type" :keyValue="'ics_expense_type'" />
        </a-form-model-item>

        <a-form-model-item label="计量单位：" prop="units_code">
          <!-- ics_units_code -->
          <dict v-model="form.units_code" :keyValue="'ics_units_code'" />
        </a-form-model-item>

        <a-form-model-item  label="税率%：">
          <a-input v-model="form.tax_fee" />
        </a-form-model-item>

        <a-form-model-item  label="备注：">
          <a-input type="textarea" v-model="form.memo" />
        </a-form-model-item>
      </a-form-model>
      <template slot="footer">
        <div class="btnant" style="margin-top: 20px">
          <a-button style="margin-right: 20px" @click="AddChargeUp"
            >取消</a-button
          >
          <a-button type="primary" @click="AddChargeSure">确定</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import dict from "@/components/common/dict.vue";
export default {
  name: "My_P_Charge",
  components: {
    dict,
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      other: "",
      form: {},
      rules: {
        name: [{ required: true, message: "请输入费项名称", trigger: "blur" }],
        type: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        units_code: [{ required: true, message: "请选择", trigger: "change" }],
      },
      title: "添加费用",
      type: 1,
      ChargeinputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      dataSource: [], // 列表数据源
      columns: [
        {
          title: "费项名称",
          dataIndex: "name",
          scopedSlots: { customRender: "belong" },
        },

        {
          title: "费项类型",
          dataIndex: "type_name",
        },
        {
          title: "计量单位",
          dataIndex: "units_code_name",
        },
        {
          title: "税率%",
          dataIndex: "tax_fee",
        },
        {
          title: "是否启用",
          dataIndex: "is_enabled_name",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "备注",
          dataIndex: "memo",
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ], //table表格表头数据
      visibleAdd: false, // 新增 modal弹框默认状态
      visibleEdit: false, // 编辑 modal弹框默认状态
      valueState: 1, // 状态默认启用
      FromAdd: {}, // 新增 数据源
      pagination: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, //默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = pageSize;
          this.ChargeList(); //显示列表的接口名称
        },
        //改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.ChargeList();
        },
      }, // 页面数据分页
    };
  },
  watch: {
    // 自动监听搜索框是否有内容自动搜索
    ChargeinputVal(newValue) {
      if (newValue) {
        this.ChargeShow(true);
      } else {
        this.ChargeShow(false);
      }
    },
  },
  created() {
    this.ChargeList(); //列表数据
  },
  methods: {
    AddChargeSure() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.type == 1) {
        axios.post("/api/ics/expenseSettings", this.form).then((res) => {
          if (res.message === "success") {
            this.visibleAdd = false;
            this.$message.success("新增费项成功");
            this.ChargeList(); // 成功重新更新列表
          }
        });
      } else {
        axios.patch("/api/ics/expenseSettings", this.form).then(() => {
          this.visibleAdd = false;
          this.$message.success("编辑费项成功");
          this.ChargeList();
        });
      }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取费项配置列表
    ChargeList() {
      axios.get("/api/ics/expenseSettings").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    // 开关
    async switchChange(checked, info) {
      axios
        .patch("/api/ics/expenseSettings",  {
          id:info.id,
          version:info.version,
          is_enabled :checked ? 1:0,
          name:info.name,
          type:info.type,
          units_code: info.units_code
        })
        .then((res) => {
            this.ChargeList(); //列表数据
        });
    },
    // todo 新增
    // 新增modal弹框显示
    AddCharge(form, type, title) {
      this.title = title;
      this.type = type;
      this.form = { ...form };
      this.form.type = JSON.stringify(form.type);
      this.form.units_code = JSON.stringify(form.units_code);
      this.visibleAdd = true;
    },
    // 取消新增
    AddChargeUp() {
       this.$refs.ruleForm.resetFields();
      this.visibleAdd = false;
    },
    // todo 删除
    // 删除费项
    DeleteCharge(id, version) {
      var that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
        .delete("/api/ics/expenseSettings", {
          params: {
            id: id,
            version: version,
          },
        })
        .then((res) => {
          that.$message.success("删除费项成功")
          that.ChargeList(); // 成功重新更新列表
        });
        },
        onCancel() {},
      });
    },

    // todo 搜索
    ChargeShow(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.ChargeinputVal;
        axios
          .get("/api/ics/expenseSettings", { params: { name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.ChargeList(); // 更新表
      }
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  max-height: 80vh;
  overflow-y: auto;
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
    .right {
      display: flex;
      margin-left: 40px;
      .state {
        margin-left: 40px;
      }
    }
  }
}
</style>
