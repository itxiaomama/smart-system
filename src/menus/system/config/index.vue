<template>
  <div class="wrap">
    <div class="wrapA">
      <div class="top">
        <!-- 搜索 -->
        <div class="left">
          <a-input-search
            placeholder="快速搜索"
            style="width: 200px; margin-right: 20px"
            @click="ShowEdit(true)"
            v-model="inputVal"
          />
        </div>
        <!-- 新增 -->
        <div class="bottom">
          <a-button
            type="primary"
            style="margin-bottom: 20px"
            @click="AddList({}, 1, '新增配置')"
          >
            新增
          </a-button>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="content">
        <div>
          <a-table
            bordered
            :data-source="dataSource"
            :columns="columns"
            rowKey="id"
            :pagination="pagination"
          >
            <template slot="operation" slot-scope="record">
              <!-- 编辑 -->
              <a href="javascript:;" @click="AddList(record, 2, '编辑配置')"
                ><a-icon type="edit" theme="twoTone" />编辑</a
              >
              <a-divider type="vertical" />
              <!-- 删除 -->
              <a href="javascript:;" @click="DeleteTenant(record)"
                ><a-icon type="delete" theme="twoTone" />删除</a
              >
            </template>
          </a-table>
        </div>
      </div>
    </div>

    <!-- 新增modal弹框 -->
    <a-modal
      v-model="visibleAdd"
      centered
      :maskClosable="false"
      :title="title"
      width="35%"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="参数名称：" prop="config_name">
          <a-input v-model="form.config_name" />
        </a-form-model-item>
        <a-form-model-item label="参数键名：" prop="config_key">
          <a-input v-model="form.config_key" />
        </a-form-model-item>
        <a-form-model-item label="参数键值：" prop="config_value">
          <a-input v-model="form.config_value" />
        </a-form-model-item>

        <a-form-model-item label="系统内置：">
          <a-radio-group v-model="form.config_type">
            <a-radio value="1"> 是 </a-radio>
            <a-radio value="0"> 否 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="备注：" prop="remark">
          <a-input v-model="form.remark" type="textarea" />
        </a-form-model-item>
      </a-form-model>
      <template slot="footer">
        <a-button type="primary" @click="onSubmit"> 确认 </a-button>
        <a-button style="margin-left: 10px" @click="resetForm"> 取消 </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import { tenant, postTenant, deleteTenant } from "../../../API/index";
export default {
  name: "GardenBuild",
  data() {
    return {
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      dataSource: [], // 列表页面数据源
      columns: [
        {
          title: "参数名称",
          dataIndex: "config_name",
        },
        {
          title: "参数键名",
          dataIndex: "config_key",
        },
        {
          title: "参数键值",
          ellipsis: true,
          dataIndex: "config_value",
          width: "25%",
        },
        {
          title: "系统内置",
          dataIndex: "config_type_name",
        },
        {
          title: "备注",
          dataIndex: "remark",
          slots: { customRender: "remark" },
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: "25%",
          scopedSlots: { customRender: "operation" },
        },
      ], //table表格表头内容
      title: "新增租户",
      type: 1,
      visibleAdd: false, //新增  modal弹框 默认状态
      From: {}, // 存放新增数据
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
          this.tenantList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.tenantList();
        },
      }, // 页面显示数据分页内容
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        config_name: "",
        config_key: "",
        config_value: "",
        config_type: "",
        remark: "",
      },
      rules: {
        config_name: [
          {
            required: true,
            message: "参数名称不能为空！",
            trigger: "blur",
          },
        ],
        config_key: [
          {
            required: true,
            message: "参数键名不能为空！",
            trigger: "blur",
          },
        ],
        config_value: [
          {
            required: true,
            message: "参数键值不能为空！",
            trigger: "blur",
          },
        ],
        remark: [
          {
            required: true,
            message: "备注不能为空！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.tenantList(); //渲染列表数据
  },
  watch: {
    // 搜索框监听有内容自动搜索
    inputVal(newValue) {
      if (newValue) {
        this.ShowEdit(true);
      } else {
        this.ShowEdit(false);
      }
    },
  },
  methods: {
    onSubmit() {
      var that = this;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const data = {
            config_name: that.form.config_name,
            config_key: that.form.config_key,
            config_value: that.form.config_value,
            config_type: that.form.config_type,
            remark: that.form.remark,
          };
          if (that.type == 1) {
            axios.post("/api/system/config", data).then((res) => {
              that.$message.success("新增租户成功");
              that.visibleAdd = false;
              that.tenantList();
            });
          } else {
            data.id = this.form.id;
            data.version = this.form.version;
            axios.patch("/api/system/config", data).then(() => {
              // 成功重新更新列表
              that.visibleAdd = false;
              that.tenantList();
              that.$message.success("编辑成功");
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.visibleAdd = false;
    },
    //获取租户列表
    tenantList() {
      axios.get("/api/system/config?per_page=9999").then((res) => {
        this.dataSource = res.data.data;
      });
    },
    //todo 新增//
    // 点击新增租户按钮弹框显示
    AddList(form, type, title) {
      this.title = title;
      this.form = { ...form };
      if (type == 2) {
        this.form.config_type = JSON.stringify(form.config_type);
      }
      console.log(this.form);
      this.type = type;
      this.visibleAdd = true;
    },
    // 新增确认
    AddTenantList() {},
    // 新增取消
    AddListUp() {
      this.From.name = "";
      this.visibleAdd = false;
    },
    //todo 删除//
    // 删除租户
    DeleteTenant(record) {
      var that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/system/config", {
              params: {
                id: record.id,
                version: record.version,
              },
            })
            .then((res) => {
              that.$message.success("删除成功");
              that.tenantList();
            });
        },
        onCancel() {},
      });
    },

    //todo 查询//
    // 查询租户
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/system/config", { params: { name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.tenantList(); // 查询成功根据输入框内容刷新列表
      }
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  height: 80vh;
  overflow-y: auto;
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
    display: flex;
    .right {
      margin-left: 40px;
    }
  }
  .bottom {
    display: flex;
    .buildname {
      display: flex;
      margin-bottom: 20px;
    }
    .remake {
      display: flex;
    }
  }
  .btnant {
    padding: 10px 16px;
    text-align: right;
    background: transparent;
    border-top: 1px solid #e8e8e8;
    border-radius: 0 0 4px 4px;
  }
}
</style>
