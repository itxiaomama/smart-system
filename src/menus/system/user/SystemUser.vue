<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <!-- 搜索 -->
          <a-input-search
            placeholder="请输入昵称"
            style="width: 200px"
            @click="ShowEdit(true)"
            v-model="inputVal"
          />
        </div>
        <div class="content" style="margin-top: 20px">
          <div class="tablewrap">
            <div class="new">
              <!-- 新增 -->
              <a-button
                type="primary"
                @click="AddUser({}, 1, '新增用户')"
                style="margin-bottom: 12px"
                >新增</a-button
              >
            </div>
            <!-- table表格内容区域 -->
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columnsA"
              :data-source="dataA"
              :rowKey="(record, id) => id"
              :pagination="paginationUser"
            >
              <a slot="name" slot-scope="text">{{ text }}</a>
              <!-- 状态开关 -->
              <span slot="status" slot-scope="text, record">
                <a-switch
                  v-if="record.status == 1"
                  default-checked
                  checked-children="启用"
                  un-checked-children="停用"
                  @change="
                    switchChange($event, record.id, record.version, 'status')
                  "
                />
                <a-switch
                  v-if="record.status == 0"
                  default-unchecked
                  checked-children="启用"
                  un-checked-children="停用"
                  @change="
                    switchChange($event, record.id, record.version, 'status')
                  "
                />
              </span>
              <template slot="action" slot-scope="text, record">
                <!-- 编辑 -->
                <a href="javascript:;" @click="AddUser(record, 2, '编辑用户')"
                  >编辑</a
                >
                <a-divider type="vertical" />
                <!-- 删除 -->
                <a
                  href="javascript:;"
                  @click="DeleteUser(record.id, record.version)"
                  >删除</a
                >
                <a-divider type="vertical" />
                <!-- 密码重置 -->
                <a href="javascript:;" @click="changePassword(record)"
                  >修改密码</a
                >
                <a-divider type="vertical" />
                <!-- 密码重置 -->
                <a href="javascript:;" @click="PasswordUser(record)"
                  >重置密码</a
                >
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户新增modal弹框 -->
    <a-modal v-model="visibleAdd" :title="title" width="35%">
      <div class="buildname" style="margin: 20px 26px">
        <span>用户名：</span>
        <a-input
          placeholder="请输入用户名"
          style="width: 26vw"
          v-model="FromAddUser.login_name"
        />
      </div>
      <div class="buildname" style="margin: 20px 40px">
        <span>昵称：</span>
        <a-input
          placeholder="请输入昵称"
          style="width: 26vw"
          v-model="FromAddUser.user_name"
        />
      </div>
      <div class="buildname" style="margin: 20px 40px">
        <span>手机：</span>
        <a-input
          placeholder="请输入手机"
          style="width: 26vw"
          v-model="FromAddUser.mobile"
        />
      </div>
      <div class="buildname" style="margin: 20px 40px; display:flex;">
        <span>状态：</span>
        <dict style="width:200px;" v-model="FromAddUser.status" :keyValue="'sys_common_status'" />
      </div>
      <div class="buildname" style="margin: 20px 40px">
        <span>部门：</span>
        <a-tree-select
          v-model="FromAddUser.dept_id"
          allow-clear
          style="width: 26vw"
          :treeData="deplist1"
          tree-default-expand-all
          placeholder="请选择"
        ></a-tree-select>
      </div>
      <div class="buildname" style="margin: 20px 12px">
        <span>所属园区：</span>
        <a-select
          default-value="请选择"
          style="width: 26vw"
          v-model="FromAddUser.park_id"
        >
          <a-select-option
            v-for="item in parklist"
            :key="item.id"
            :value="item.id"
          >
            {{ item.park_name }}
          </a-select-option>
        </a-select>
      </div>
      <div class="buildname" style="margin: 20px 12px">
        <span>所属租户：</span>
        <a-select
          default-value="请选择"
          style="width: 26vw"
          v-model="FromAddUser.tenant_id"
        >
          <a-select-option
            v-for="item in tenantlist"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </div>
      <div class="buildname" style="margin: 20px 12px">
        <span>拥有角色：</span>
        <a-select
          default-value="请选择"
          style="width: 26vw"
          mode="multiple"
          v-model="FromAddUser.role_ids"
        >
          <a-select-option
            v-for="item in rolelist"
            :key="item.id"
            :value="item.id"
          >
            {{ item.role_name }}
          </a-select-option>
        </a-select>
      </div>
      <div class="remake" style="margin: 20px 40px; display: flex">
        <span>备注：</span>
        <a-textarea
          placeholder="请输入备注"
          :rows="2"
          style="width: 26vw"
          v-model="FromAddUser.remark"
        />
      </div>
      <template slot="footer">
        <div class="btnant">
          <a-button @click="AddUserUp" style="margin-right: 20px"
            >取消</a-button
          >
          <a-button type="primary" @click="AddUserShow()">确定</a-button>
        </div>
      </template>
    </a-modal>

    <!-- 密码重置modal弹框 -->
    <a-modal v-model="visiblePassword" title="修改密码" width="40%">
      <a-form-model
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules1"
        v-bind="layout"
      >
        <a-form-model-item label="用户名：">
          <a-input v-model.number="ruleForm.user_name" disabled />
        </a-form-model-item>
        <a-form-model-item label="旧密码：" prop="old_password">
          <a-input
            v-model="ruleForm.old_password"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="新密码：" prop="password">
          <a-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          label="确认密码："
          prop="old_password_confirmation"
        >
          <a-input
            v-model="ruleForm.old_password_confirmation"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>
      </a-form-model>
      <template slot="footer">
        <a-button type="primary" @click="submitForm()"> 确定 </a-button>
        <a-button style="margin-left: 10px" @click="resetForm()">
          取消
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import axios from "axios";
import dict from '@/components/common/dict.vue'
export default {
  name: "SystemUser",
  components:{
    dict
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("新密码不能为空！"));
      } else {
        if (this.ruleForm.old_password_confirmation !== "") {
          this.$refs.ruleForm.validateField("old_password_confirmation");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码！"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      deplist1: [],
      parklist: [],
      tenantlist: [],
      rolelist: [],
      parent_id: "",
      ruleForm: {
        password: "",
        old_password_confirmation: "",
        user_name: "",
        old_password: "",
      },
      rules1: {
        old_password: [
          { required: true, message: "旧密码不能为空！", trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePass, trigger: "change" },
        ],
        old_password_confirmation: [
          { required: true, validator: validatePass2, trigger: "change" },
        ],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        region: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        date1: [
          { required: true, message: "Please pick a date", trigger: "change" },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change",
          },
        ],
        resource: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur",
          },
        ],
      },
      type: null,
      title: null,
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      labelCol: { span: 4 }, // 文本框离父盒子左边距间距
      // 字段必填项
      mode: "left", // tab栏方位
      // 分页
      paginationUser: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationUser.defaultCurrent = current;
          this.paginationUser.defaultPageSize = pageSize;
          this.UserList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationUser.defaultCurrent = current;
          this.paginationUser.defaultPageSize = size;
          this.UserList();
        },
      },
      dataA: [], // 页面数据源
      columnsA: [
        {
          title: "用户名",
          dataIndex: "login_name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "昵称",
          dataIndex: "user_name",
        },
        {
          title: "手机号码",
          dataIndex: "mobile",
        },
        {
          title: "性别",
          dataIndex: "gender_name",
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "创建时间",
          align: "center",
          sorter: (a, b) => {
            let aTimeString = a.created_at;
            let bTimeString = b.created_at;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "created_at",
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ], //table表格表头内容
      visibleAdd: false, // 新增弹框默认状态
      visibleEdit: false, // 编辑弹框默认状态
      visiblePassword: false, // 重置密码弹框默认状态
      FromAddUser: {
        role_ids: ["1", "2", "3"],
        tenant_id: "2",
      }, // 存放新增用户数据
      FromEditUser: {}, // 存放编辑用户数据
      formReset: {}, // 存放重置密码用户数据
    };
  },
  created() {
    this.UserList(); //渲染列表数据
    this.getparklist(); //园区列表
    this.getTenant(); // 所属租户列表
    this.getrolelist(); // 角色列表
  },
  mounted() {
    this.deplist();
  },
  watch: {
    inputVal(newValue) {
      if (newValue) {
        this.ShowEdit(true);
      } else {
        this.ShowEdit(false);
      }
    }, // 监听搜索框是否有内容 自动搜索
  },
  methods: {
    // 部门列表
    deplist() {
      axios.get("/api/system/dept?per_page=9999").then((res) => {
        this.dataSource = res.data;
        var res1 = this.getTreedata(res.data);
        this.deplist1.push(...res1);
        console.log(this.deplist1);
      });
    },
    getTreedata(data) {
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        var tempobj = {
          title: data[i].dept_name,
          value: data[i].id,
          key: data[i].id,
        };
        if ("children" in data[i]) {
          tempobj.children = this.getTreedata(data[i].children);
        }
        arr.push(tempobj);
      }
      return arr;
    },
    // 园区列表
    getparklist() {
      axios.get("/api/ics/park").then((res) => {
        this.parklist = res.data.data;
      });
    },
    // 租户列表
    getTenant() {
      axios.get("/api/system/tenant?per_page=9999").then((res) => {
        this.tenantlist = res.data.data;
      });
    },
    //角色列表
    getrolelist() {
      // rolelist
      axios.get("/api/system/role?per_page=9999").then((res) => {
        this.rolelist = res.data.data;
      });
    },
    submitForm() {
      console.log(this.$refs.ruleForm.validate);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .patch("/api/system/user/upd", {
              id: this.ruleForm.user_id,
              old_password: this.ruleForm.old_password,
              password_confirmation: this.ruleForm.old_password_confirmation,
              password: this.ruleForm.password,
              version: this.ruleForm.version,
            })
            .then((res) => {
              console.log(res);
              if (res.status_code == 200) {
                this.$message.success("密码修改成功！");
                this.$refs.ruleForm.resetFields();
                this.visiblePassword = false;
              } else {
                this.$message.error(res.message);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.visiblePassword = false;
    },
    // 获取用户列表
    UserList() {
      axios.get("/api/system/user?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataA = res.data.data;
        }
      });
    },
    // 用户状态开关
    async switchChange(checked, id, version, name) {
      let obj = { id };
      obj[name] = checked ? 1 : 0;
      axios
        .patch("/api/system/user/status", obj, {
          params: { version: version },
        })
        .then((res) => {
          if (res.status_code == 200) {
            console.log(res);
          }
        });
    },
    // todo 新增
    // 点击新增用户按钮弹框显示
    AddUser(form, type, title) {
      this.type = type;
      this.title = title;
      console.log(form);
      this.FromAddUser = { ...form };
      if (this.type == 2) {
        this.FromAddUser.status = JSON.stringify(form.status);

        this.FromAddUser.tenant_id = form.tenant_id;
        let arr = form.role_ids.split(",");
        let arr1 = arr.map((item) => {
          return Number(item);
        });
        this.FromAddUser.role_ids = arr1;
      }
      this.visibleAdd = true;
    },
    // 确认新增
    AddUserShow() {
      let data = {
        login_name: this.FromAddUser.login_name,
        user_name: this.FromAddUser.user_name,
        mobile: this.FromAddUser.mobile,
        status: this.FromAddUser.status,
        dept_id: this.FromAddUser.dept_id,
        park_id: this.FromAddUser.park_id,
        role_ids: this.FromAddUser.role_ids,
        tenant_id: this.FromAddUser.tenant_id,
        remark: this.FromAddUser.remark,
      };
      if (this.type == 1) {
        axios.post("/api/system/user", data).then((res) => {
          this.FromAddUser = {};
          this.$message.success("新增用户成功");
          this.visibleAdd = false;
          this.UserList();
        });
      } else {
        let data = {
          tenant_id: this.FromAddUser.tenant_id,
          user_name: this.FromAddUser.user_name,
          mobile: this.FromAddUser.mobile,
          status: this.FromAddUser.status,
          dept_id: this.FromAddUser.dept_id,
          park_id: this.FromAddUser.park_id,
          role_ids: this.FromAddUser.role_ids,
          remark: this.FromAddUser.remark,
          id: this.FromAddUser.id,
          version: this.FromAddUser.version,
        };
        axios.patch("/api/system/user", data).then((res) => {
          if (res.status_code == 201) {
            this.FromAddUser = {};
            this.$message.success("编辑用户成功");
            this.visibleAdd = false;
            this.UserList();
          }
        });
      }
    },
    // 新增取消
    AddUserUp() {
      this.visibleAdd = false;
      // 取消添加文本框中内容
      this.FromAddUser.login_name = "";
      this.FromAddUser.user_name = "";
      this.FromAddUser.mobile = "";
      this.FromAddUser.status = "";
      this.FromAddUser.dept_id = "";
      this.FromAddUser.park_id = "";
      this.FromAddUser.role_ids = "";
      this.FromAddUser.remark = "";
    },
    // todo 删除
    // 用户删除
    DeleteUser(id, version) {
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/system/user", {
              params: {
                id: id,
                version: version,
              },
            })
            .then(() => {
              that.$message.success("删除用户成功");
              // 删除成功重置用户列表
              that.UserList();
            });
        },
        onCancel() {},
      });
    },
    // todo 编辑
    // 点击编辑用户按钮弹框显示，数据浅拷贝
    EditUser(record) {
      this.visibleEdit = true;
      this.FromEditUser = { ...record };
      this.FromEditUser.status = record.status.toString();
      this.FromEditUser.dept_id = record.dept_id.toString();
      this.FromEditUser.park_id = record.park_id.toString();
      this.FromEditUser.role_ids = record.role_ids.toString();
    },
    // 确认编辑
    EditUserShow(id, version) {
      axios
        .patch("/api/system/user", this.FromEditUser, {
          params: { id: id, version: version },
        })
        .then((res) => {
          if (res.status_code == 200) {
            this.$message.success("编辑租户成功");
            this.visibleEdit = false;
            this.UserList();
          }
        });
    },
    // 编辑取消
    EditUserUp() {
      this.visibleEdit = false;
    },
    // todo 查询
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/system/user", {
            params: {
              user_name: paramName,
            },
          })
          .then((res) => {
            this.dataA = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.UserList(); //更新表;
      }
    },
    // todo 重置密码
    // 点击重置密码按钮弹框显示，数据浅拷贝
    PasswordUser(record) {
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要重置密码吗？",
        onOk() {
          axios
            .patch("/api/system/user/reset", {
              id: record.id,
              version: record.version,
            })
            .then(() => {
              // this.visiblePassword = false;
              // console.log(that);
              that.$message.success("密码重置成功");
            });
        },
        onCancel() {},
      });
    },
    // 修改密码
    changePassword(record) {
      let obj = { ...record };
      console.log(obj);
      this.ruleForm.user_name = obj.user_name;
      this.ruleForm.user_id = obj.id;
      this.ruleForm.version = obj.version;
      this.visiblePassword = true;
    },
    // 确认重置密码
    PasswordSure(id, version) {
      axios
        .patch("/api/system/user/reset", this.formReset.password, {
          params: { id: id, version: version },
        })
        .then(() => {
          this.visiblePassword = false;
          this.formReset.password = "";
          this.$message.success("密码重置成功");
        });
    },
    // 重置密码取消
    PasswordUp() {
      this.visiblePassword = false;
      this.formReset.password = "";
    },
  },
  // 列表数据选择框 控制是否全选
  computed: {
    rowSelection() {
      return {
        onChange: () => {},
      };
    },
  },
};
</script>
<style lang="less" scoped>
.wrap {
  max-height: 85vh;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 10px;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .content {
    display: flex;
    .deplist {
      flex: 0 0 200px;
    }
    .tablewrap {
      flex: 1;
    }
  }
}
</style>
