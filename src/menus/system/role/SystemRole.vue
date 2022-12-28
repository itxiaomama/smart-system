<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <!-- 搜索 -->
            <a-input-search
              placeholder="请输入角色名称"
              style="width: 200px; margin-right: 20px"
              @click="ShowEdit(true)"
              v-model="inputVal"
            />
          </div>
          <div class="bottom">
            <!-- 新增 -->
            <a-button type="primary" @click="AddRole({}, 1, '新增角色')"
              >新增</a-button
            >
          </div>
        </div>
        <!-- table内容页面区域 -->
        <div class="content">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :rowKey="(record, id) => id"
              :pagination="paginationRole"
            >
              <!-- <a slot="name" slot-scope="text">{{ text }}</a> -->
              <!-- 状态开关 -->
              <span slot="area" slot-scope="text, record">
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
              <span slot="is_default" slot-scope="text">
                {{ text | menuTypeFilter }}
              </span>
              <span slot="action" slot-scope="text, record">
                <!-- 编辑 -->
                <a href="javascript:;" @click="AddRole(record, 2, '编辑角色')"
                  >编辑</a
                >
                <!-- <a-divider type="vertical" />
                 <a href="javascript:;" @click="RoleData(record)">数据权限</a>  -->

                <a-divider type="vertical" />
                <!-- 删除 -->
                <a
                  href="javascript:;"
                  @click="DeleteRole(record.id, record.version)"
                  >删除</a
                >
              </span>
            </a-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增modal弹框 -->
    <a-modal v-model="visibleAdd" :title="title" width="40%" class="bigmodal">
      <div class="buildname" style="margin: 30px 26px">
        <span>角色名称：</span>
        <a-input
          placeholder="请输入角色名称"
          style="width: 29vw"
          v-model="FromRoleAdd.role_name"
        />
      </div>
      <div class="buildname" style="margin: 30px 26px">
        <span>权限字符：</span>
        <a-input
          placeholder="请输入权限字符"
          style="width: 29vw"
          v-model="FromRoleAdd.role_key"
        />
      </div>
      <div class="buildname" style="margin: 30px 26px">
        <span>显示顺序：</span>
        <a-input
          placeholder="显示顺序"
          style="width: 29vw"
          v-model="FromRoleAdd.role_sort"
        />
      </div>
      <div class="buildname" style="margin: 30px 52px">
        <span>状态：</span>
        <a-select style="width: 29vw" v-model="FromRoleAdd.status">
          <a-select-option value="1"> 正常 </a-select-option>
          <a-select-option value="0"> 禁用 </a-select-option>
        </a-select>
      </div>
      <div class="buildname" style="margin: 30px 52px">
        <span>设置：</span>
        <a-checkbox-group v-model="checked">
              <a-checkbox value="1"> 是否默认 </a-checkbox>
            </a-checkbox-group>
        <p style="margin: 20px 40px">勾选后注册用户将默认此角色</p>
      </div>
      <!-- form表单 -->
      <a-divider style="margin-bottom: 0px" />
        <a-form-item label="拥有权限">
          <a-tree
           v-if="menulist && menulist.length>0"
            v-model="checkedKeys"
            checkable
            :tree-data="menulist"
            @select="onSelect"
          />
        </a-form-item>
      <template slot="footer">
        <div>
          <a-button style="margin-right: 20px" @click="AddRoleUp"
            >取消</a-button
          >
          <a-button type="primary" @click="AddRoleShow">确定</a-button>
        </div>
      </template>
    </a-modal>

    <!-- 数据权限modal弹框 -->
    <a-modal v-model="visibleData" title="权限修改" width="40%">
      <div class="buildname" style="margin: 30px 26px">
        <span>角色名称：</span>
        <a-input
          placeholder="请输入角色名称"
          style="width: 30vw"
          v-model="FromRoleData.role_name"
        />
      </div>
      <div class="buildname" style="margin: 30px 26px">
        <span>权限字符：</span>
        <a-input
          placeholder="请输入权限字符"
          style="width: 30vw"
          v-model="FromRoleData.role_key"
        />
      </div>
      <div class="buildname" style="margin: 30px 26px">
        <span>数据权限：</span>
        <a-select style="width: 30vw" v-model="FromRoleData.data_scope">
          <a-select-option value="1"> 全部数据权限 </a-select-option>
          <a-select-option value="2"> 本部门数据权限 </a-select-option>
          <a-select-option value="3"> 本部门及以下数据权限 </a-select-option>
        </a-select>
      </div>
      <template slot="footer">
        <div>
          <a-button @click="RoleDataUp" style="margin-right: 20px"
            >取消</a-button
          >
          <a-button type="primary" @click="RoleDataShow">确定</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
const options = [{ label: "是否默认", value: "1" }];
export default {
  name: "SystemRole",
  filters: {
    menuTypeFilter(type) {
      const menuMap = {
        0: "否",
        1: "是",
      };
      return menuMap[type];
    },
  },
  data() {
    return {
      checked:[],
      checkedKeys:[],
      checkedlist:[],
      options,
      type: null,
      title: null,
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      dataSource: [], // 页面列表数据源
      columns: [
        {
          title: "角色名称",
          dataIndex: "role_name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "权限字符",
          dataIndex: "role_key",
        },
        {
          title: "显示顺序",
          dataIndex: "data_scope",
        },
        {
          title: "状态",
          dataIndex: "status_name",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "是否默认",
          dataIndex: "is_default",
          scopedSlots: { customRender: "is_default" },
        },
        {
          title: "创建时间",
          dataIndex: "created_at",
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ], //table表格表头内容
      visibleAdd: false, // 新增弹框默认状态
      visibleData: false, // 数据权限修改弹框默认状态
      FromRoleAdd: {
        is_default: [],
        permissions:[]
        
      }, // 存放新增页面数据
      FromRoleData: {}, // 存放数据权限页面数据
      // 数据分页
      paginationRole: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationRole.defaultCurrent = current;
          this.paginationRole.defaultPageSize = pageSize;
          this.RoleList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationRole.defaultCurrent = current;
          this.paginationRole.defaultPageSize = size;
          this.RoleList();
        },
      },
      // todo 拥有权限树形控件
      expandedKeys: [], // 控制是否默认展开部分内容
      selectedKeys: [], // 控制是否默认选中
      // 树形控件权限数据
      menulist: [],
    };
  },
  watch: {
    inputVal(newValue) {
      if (newValue) {
        this.ShowEdit(true);
      } else {
        this.ShowEdit(false);
      }
    },
    checkedKeys(val){
      // console.log(val)

    }
  },
  created() {
    this.RoleList(); //渲染列表数据
  },
  methods: {
    // checkedit(selectedKeys,e){
    //   this.checkedlist =  selectedKeys.checked;
    //   this.selectedKeys = selectedKeys.checked;
    // },
    // todo 拥有权限树形控件
    // 拥有权限选中方法
    onSelect(selectedKeys) {
      console.log(selectedKeys)
      this.selectedKeys = selectedKeys;
    },
    // 获取角色列表
    RoleList() {
      axios.get("/api/system/role?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    //状态开关
    async switchChange(checked, id, version, name) {
      let obj = { id };
      obj[name] = checked ? 1 : 0;
      axios
        .patch("/api/system/role/status", obj, {
          params: { version: version },
        })
        .then((res) => {
          if (res.status_code == 200) {
            console.log(res);
          }
        });
      this.RoleList();
    },
    // todo 新增
    // 点击新增角色按钮弹框显示
    AddRole(form, type, title) {
      this.type = type;
      this.title = title;
      this.FromRoleAdd = { ...form };
      if (type == 2) {
        this.$nextTick(() => {
          axios.get("/api/system/role?id=" + form.id).then((res) => {
            let  obj = {... res.data};
            let res1 = this.getTreedata(obj.permissions);
           this.menulist = [...res1];
            this.checkedKeys = obj.permissions_selected;
            this.checkedlist = obj.permissions_selected;
            this.FromRoleAdd.status = JSON.stringify(obj.status);
            let arr = [];
            arr.push(obj.is_default.toString());
            this.checked = arr;
          });
          
        });
      }else{
        this.getMenuList();
      }
      
      this.visibleAdd = true;
    },
    // 确认新增
    AddRoleShow() {
      let that = this;
      var data = {
        role_name: this.FromRoleAdd.role_name,
        role_key: this.FromRoleAdd.role_key,
        role_sort: this.FromRoleAdd.role_sort,
        status: this.FromRoleAdd.status,
        is_default:this.checked.length >0 ?1 : 0,
        permissions: this.checkedKeys,
      };
      console.log(this.checkedKeys)
      if (this.type == 1) {
        axios.post("/api/system/role", data).then((res) => {
          that.RoleList();
          this.checkedKeys = [];
          this.checked = [];
          this.visibleAdd = false;
        });
      } else {
        data.id = this.FromRoleAdd.id;
        data.version = this.FromRoleAdd.version;
        axios.patch("/api/system/role", data).then((res) => {
          that.RoleList();
          that.AddRoleUp();
        });
      }
    },
    // 新增取消
    AddRoleUp() {
      this.checked =  [] ;
      this.checkedKeys = [];
      this.visibleAdd = false;
    },
    // todo 删除
    // 角色删除
    DeleteRole(id, version) {
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/system/role/", {
              params: { id: id, version: version },
            })
            .then((res) => {
              that.$message.success("删除角色成功");
              // 删除成功重置用户列表
              that.RoleList();
            });
        },
        onCancel() {},
      });
    },
    // todo 编辑
    // todo 搜索
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/system/role", { params: { role_name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.RoleList(); //更新表;
      }
    },
    // todo 数据权限修改
    // 点击数据权限按钮弹框显示，数据浅拷贝
    RoleData(record) {
      this.FromRoleData = { ...record };
      this.FromRoleData.data_scope = JSON.stringify(record.data_scope);
      console.log(typeof this.FromRoleData.data_scope);
      this.visibleData = true;
    },
    // 确认修改
    RoleDataShow() {
      console.log(this.FromRoleData);
      axios
        .patch("/api/system/role/authDataScope", {
          id: this.FromRoleData.id,
          version: this.FromRoleData.version,
          data_scope: this.FromRoleData.data_scope,
        })
        .then((res) => {
          console.log(res);
          this.visibleData = false;
        });
    },
    // 取消修改
    RoleDataUp() {
      this.visibleData = false;
    },
    // 获取权限列表
    getMenuList() {
      axios.get("/api/system/menu?per_page=9999&status=1").then((res) => {
        let res1 = this.getTreedata(res.data);
        this.menulist = [...res1];
      });
    },
    getTreedata(data) {
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        var tempobj = {
          title: data[i].menu_name,
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
  max-height: 80vh;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 10px;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .search {
    display: flex;
    margin-bottom: 20px;
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
  .bottom {
    display: flex;
    margin-top: 0px;
  }
}
</style>
