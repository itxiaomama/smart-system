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
          <a-tabs
            default-active-key="1"
            :tab-position="mode"
            :style="{ height: '700px' }"
          >
            <!-- 左侧tab框 -->
            <a-tab-pane key="1" tab="总经办">
              <div class="new">
                <!-- 新增 -->
                <a-button
                  type="primary"
                  @click="AddUser"
                  style="margin-bottom: 12px"
                  >新增</a-button
                >
                <!-- 用户新增modal弹框 -->
                <a-modal v-model="visibleAdd" title="添加用户" width="35%">
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
                  <div class="buildname" style="margin: 20px 40px">
                    <span>状态：</span>
                    <a-select style="width: 26vw" v-model="FromAddUser.status">
                      <a-select-option value="1"> 正常 </a-select-option>
                      <a-select-option value="0"> 停用 </a-select-option>
                    </a-select>
                  </div>
                  <div class="buildname" style="margin: 20px 40px">
                    <span>部门：</span>
                    <a-select
                      default-value="请选择"
                      style="width: 26vw"
                      v-model="FromAddUser.dept_id"
                    >
                      <a-select-option value="1"> 运营部 </a-select-option>
                      <a-select-option value="2"> 招商部 </a-select-option>
                      <a-select-option value="3"> 物业部 </a-select-option>
                      <a-select-option value="4"> 财务部 </a-select-option>
                    </a-select>
                  </div>
                  <div class="buildname" style="margin: 20px 12px">
                    <span>所属园区：</span>
                    <a-select
                      default-value="请选择"
                      style="width: 26vw"
                      v-model="FromAddUser.park_id"
                    >
                      <a-select-option value="1"> 我的园区1 </a-select-option>
                      <a-select-option value="2"> 我的园区2 </a-select-option>
                      <a-select-option value="3"> 我的园区3 </a-select-option>
                      <a-select-option value="4"> 我的园区4 </a-select-option>
                      <a-select-option value="5"> 我的园区5 </a-select-option>
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
                      <a-select-option value="1"> 超级管理员 </a-select-option>
                      <a-select-option value="2"> 企业管理员 </a-select-option>
                      <a-select-option value="3"> 老板 </a-select-option>
                      <a-select-option value="4"> 园区经理 </a-select-option>
                      <a-select-option value="5"> 文员 </a-select-option>
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

                  <div
                    class="btnant"
                    style="
                      padding: 10px 16px;
                      text-align: right;
                      background: transparent;
                      border-top: 1px solid #e8e8e8;
                      border-radius: 0 0 4px 4px;
                    "
                  >
                    <a-button @click="AddUserUp" style="margin-right: 20px"
                      >取消</a-button
                    >
                    <a-button type="primary" @click="AddUserShow()"
                      >确定</a-button
                    >
                  </div>
                </a-modal>
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
                  <a href="javascript:;" @click="EditUser(record)">编辑</a>
                  <!-- 用户编辑modal弹框 -->
                  <a-modal v-model="visibleEdit" title="编辑用户" width="35%">
                    <div class="buildname" style="margin: 20px 26px">
                      <span>用户名：</span>
                      <a-input
                        placeholder="请输入用户名"
                        style="width: 26vw"
                        v-model="FromEditUser.login_name"
                      />
                    </div>
                    <div class="buildname" style="margin: 20px 40px">
                      <span>昵称：</span>
                      <a-input
                        placeholder="请输入昵称"
                        style="width: 26vw"
                        v-model="FromEditUser.user_name"
                      />
                    </div>
                    <div class="buildname" style="margin: 20px 40px">
                      <span>手机：</span>
                      <a-input
                        placeholder="请输入手机"
                        style="width: 26vw"
                        v-model="FromEditUser.mobile"
                      />
                    </div>
                    <div class="buildname" style="margin: 20px 40px">
                      <span>状态：</span>
                      <a-select
                        style="width: 26vw"
                        v-model="FromEditUser.status"
                      >
                        <a-select-option value="1"> 正常 </a-select-option>
                        <a-select-option value="0"> 停用 </a-select-option>
                      </a-select>
                    </div>
                    <div class="buildname" style="margin: 20px 40px">
                      <span>部门：</span>
                      <a-select
                        default-value="请选择"
                        style="width: 26vw"
                        v-model="FromEditUser.dept_id"
                      >
                        <a-select-option value="1"> 运营部 </a-select-option>
                        <a-select-option value="2"> 招商部 </a-select-option>
                        <a-select-option value="3"> 物业部 </a-select-option>
                        <a-select-option value="4"> 财务部 </a-select-option>
                      </a-select>
                    </div>
                    <div class="buildname" style="margin: 20px 12px">
                      <span>所属园区：</span>
                      <a-select
                        default-value="请选择"
                        style="width: 26vw"
                        v-model="FromEditUser.park_id"
                      >
                        <a-select-option value="1"> 我的园区1 </a-select-option>
                        <a-select-option value="2"> 我的园区2 </a-select-option>
                        <a-select-option value="3"> 我的园区3 </a-select-option>
                        <a-select-option value="4"> 我的园区4 </a-select-option>
                        <a-select-option value="5"> 我的园区5 </a-select-option>
                      </a-select>
                    </div>
                    <div class="buildname" style="margin: 20px 12px">
                      <span>拥有角色：</span>
                      <a-select
                        default-value="请选择"
                        style="width: 26vw"
                        mode="multiple"
                        v-model="FromEditUser.role_ids"
                      >
                        <a-select-option value="1">
                          超级管理员
                        </a-select-option>
                        <a-select-option value="2">
                          企业管理员
                        </a-select-option>
                        <a-select-option value="3"> 老板 </a-select-option>
                        <a-select-option value="4"> 园区经理 </a-select-option>
                        <a-select-option value="5"> 文员 </a-select-option>
                      </a-select>
                    </div>
                    <div
                      class="remake"
                      style="margin: 20px 40px; display: flex"
                    >
                      <span>备注：</span>
                      <a-textarea
                        placeholder="请输入备注"
                        :rows="2"
                        style="width: 26vw"
                        v-model="FromEditUser.remark"
                      />
                    </div>

                    <div
                      class="btnant"
                      style="
                        padding: 10px 16px;
                        text-align: right;
                        background: transparent;
                        border-top: 1px solid #e8e8e8;
                        border-radius: 0 0 4px 4px;
                      "
                    >
                      <a-button @click="EditUserUp" style="margin-right: 20px"
                        >取消</a-button
                      >
                      <a-button type="primary" @click="EditUserShow"
                        >确定</a-button
                      >
                    </div>
                  </a-modal>
                  <a-divider type="vertical" />
                  <!-- 删除 -->
                  <a
                    href="javascript:;"
                    @click="DeleteUser(record.id, record.version)"
                    >删除</a
                  >
                  <a-divider type="vertical" />
                  <!-- 密码重置 -->
                  <a href="javascript:;" @click="PasswordUser(record)"
                    >重置密码</a
                  >
                  <!-- 密码重置modal弹框 -->
                  <a-modal v-model="visiblePassword" title="重置密码">
                    <a-form-model
                      ref="ruleForm"
                      :model="formReset"
                      :rules="rules"
                      :label-col="labelCol"
                    >
                      <a-form-model-item ref="" label="用户名" prop="username">
                        <a-input
                          v-model="formReset.login_name"
                          style="width: 18vw; text-align: left"
                          read-Only="readonly"
                        />
                      </a-form-model-item>
                      <a-form-model-item ref="name" label="新密码" prop="name">
                        <a-input
                          placeholder="新密码"
                          v-model="formReset.password"
                          style="width: 18vw; text-align: left"
                        />
                      </a-form-model-item>
                    </a-form-model>
                    <div
                      style="
                        padding: 10px 16px;
                        text-align: right;
                        background: transparent;
                        border-top: 1px solid #e8e8e8;
                        border-radius: 0 0 4px 4px;
                      "
                    >
                      <a-button @click="PasswordUp" style="margin-right: 20px"
                        >取消</a-button
                      >
                      <a-button
                        type="primary"
                        @click="PasswordSure(record.id, record.version)"
                        >确定</a-button
                      >
                    </div>
                  </a-modal>
                </template>
              </a-table>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "SystemUser",
  data() {
    return {
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      labelCol: { span: 4 }, // 文本框离父盒子左边距间距
      // 字段必填项
      rules: {
        username: [{}],
      },
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
          title: "手机",
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
      FromAddUser: {}, // 存放新增用户数据
      FromEditUser: {}, // 存放编辑用户数据
      formReset: {}, // 存放重置密码用户数据
    };
  },
  created() {
    this.UserList(); //渲染列表数据
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
    AddUser() {
      this.visibleAdd = true;
    },
    // 确认新增
    AddUserShow() {
      axios
        .post("/api/system/user?tenant_id=2", this.FromAddUser)
        .then((res) => {
          if (res.status_code == 201) {
            this.FromAddUser.login_name = "";
            this.FromAddUser.user_name = "";
            this.FromAddUser.mobile = "";
            this.FromAddUser.status = "";
            this.FromAddUser.dept_id = "";
            this.FromAddUser.park_id = "";
            this.FromAddUser.role_ids = "";
            this.FromAddUser.remark = "";
            this.$message.success("新增用户成功");
            this.visibleAdd = false;
            this.UserList();
          }
        });
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
      axios
        .delete("/api/system/user", {
          params: {
            id: id,
            version: version,
          },
        })
        .then(() => {
          this.$message.success("删除用户成功");
          // 删除成功重置用户列表
          this.UserList();
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
        .patch("/api/system/user?tenant_id=2", this.FromEditUser, {
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
      this.visiblePassword = true;
      this.formReset = { ...record };
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
  width: 87.3vw;
  max-height: 85vh;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 10px;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
}
</style>
<style>
.ant-table-pagination.ant-pagination {
  margin: 4px 0 !important;
}
</style>