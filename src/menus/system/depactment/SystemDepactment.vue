<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="top">
          <!-- 搜索 -->
          <div class="left">
            <a-input-search
              placeholder="请输入部门名称"
              style="width: 200px; margin-right: 40px"
            />
          </div>
          <!-- 新增 -->
          <div class="bottom">
            <a-button
              type="primary"
              v-permission="'add'"
              @click="AddDepactment({}, 1, '新增部门')"
              >新增</a-button
            >
          </div>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              rowKey="id"
            >
              <span slot="is_default" slot-scope="text">
                {{ text | menuTypeFilter }}
              </span>
              <span slot="actions" slot-scope="text, record">
                <!-- 编辑 -->
                <a
                  href="javascript:;"
                  v-permission="'edit'"
                  @click="AddDepactment(record, 2, '编辑部门')"
                  >编辑</a
                >
                <a-divider type="vertical" />
                <!-- 子新增 -->
                <a
                  href="javascript:;"
                  @click="AddDepactment(record.id, 1, '新增部门')"
                  >新增</a
                >
                <a-divider type="vertical" />
                <!--  -->
                <a
                  href="javascript:;"
                  @click="deldepart(record)"
                  v-permission="'delete'"
                  >删除</a
                >
              </span>
            </a-table>
          </div>
        </div>
      </div>
    </div>

    <a-modal v-model="AddVisible" :title="title" width="40%">
      <a-form-model
        ref="ruleForm"
        :model="FromAddDepact"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="上级部门：" prop="parent_id">
          <a-tree-select
            v-model="FromAddDepact.parent_id"
            allow-clear
            :treeData="treeData"
            tree-default-expand-all
            placeholder="请选择"
          ></a-tree-select>
        </a-form-model-item>

        <a-form-model-item label="部门名称：" prop="dept_name">
          <a-input v-model="FromAddDepact.dept_name" />
        </a-form-model-item>

        <a-form-model-item label="显示顺序：" prop="order_num">
          <a-input v-model="FromAddDepact.order_num" type="number" />
        </a-form-model-item>
        <a-form-model-item label="负责人：" prop="leader">
          <a-input v-model="FromAddDepact.leader" />
        </a-form-model-item>

        <a-form-model-item label="电话：" prop="phone">
          <a-input v-model="FromAddDepact.phone" />
        </a-form-model-item>

        <a-form-model-item ref="name" label="邮箱：" prop="email">
          <a-input v-model="FromAddDepact.email" />
        </a-form-model-item>

        <a-form-model-item label="状态：" prop="status">
          <dict :keyValue="'sys_common_status'" v-model="FromAddDepact.status" />
          <!-- <a-select v-model="FromAddDepact.status" placeholder="请选择">
            <a-select-option value="1"> 正常 </a-select-option>
            <a-select-option value="0"> 停用 </a-select-option>
          </a-select> -->
        </a-form-model-item>

        <a-form-model-item label="设置">
          <a-checkbox-group
            v-model="FromAddDepact.is_default"
            :options="options"
          />

          <p style="margin: 20px 40px">勾选后注册用户将默认此角色</p>
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
import permissions from "@/directives/permission";
import dict from '@/components/common/dict.vue';
export default {
  name: "SystemDepactment",
  components:{
    dict
  },
  directives: {
    permissions,
  },
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
      options: [
        {
          label: "是否默认",
          value: "1",
        },
      ],
      treeData: [],
      type: 1,
      title: "",
      form: this.$form.createForm(this, { name: "coordinated" }),
      dataSource: [], //列表数据源
      columns: [
        {
          title: "部门名称",
          dataIndex: "dept_name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "排序",
          dataIndex: "order_num",
        },
        {
          title: "状态",
          dataIndex: "status_name",
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
          scopedSlots: { customRender: "actions" },
        },
      ], //table表格表头内容
      AddVisible: false, //新增modal弹框默认状态
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      FromAddDepact: {
        //存放新增数据
        parent_id: "",
        order_num: "",
        dept_name: "",
        leader: "",
        phone: "",
        email: "",
        status: "",
        is_default: [],
        default: null,
      },
      rules: {
        dept_name: [
          {
            required: true,
            message: "部门名称不能为空！",
            trigger: "blur",
          },
        ],
        parent_id: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        status: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        order_num: [
          {
            required: true,
            message: "显示顺序不能为空",
            trigger: "blur",
          },
        ],
        leader: [
          {
            required: true,
            message: "负责人不能为空！",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "电话不能为空！",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.DepactmentList(); // 获取角色列表
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          var data = {
            is_default:
              this.FromAddDepact.is_default.length == 0
                ? 0
                : this.FromAddDepact.is_default[0],
            parent_id: this.FromAddDepact.parent_id,
            order_num: this.FromAddDepact.order_num,
            email: this.FromAddDepact.email,
            leader: this.FromAddDepact.leader,
            phone: this.FromAddDepact.phone,
            status: this.FromAddDepact.status,
            dept_name: this.FromAddDepact.dept_name,
          };
          if (this.type == 1) {
            axios.post("/api/system/dept", data).then((res) => {
              this.$message.success("新增成功");
              this.AddVisible = false;
              this.DepactmentList();
            });
          } else {
            data.id = this.FromAddDepact.id;
            data.version = this.FromAddDepact.version;
            axios.patch("/api/system/dept", data).then((res) => {
              this.$message.success("编辑成功");
              this.AddVisible = false;
              this.DepactmentList();
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
      this.AddVisible = false;
    },
    // 获取角色列表
    DepactmentList() {
      axios.get("/api/system/dept?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data;
          var res = this.getTreedata(res.data);
          this.treeData.push(...res);
        }
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
    // todo 新增
    // 点击新增按钮弹框显示
    AddDepactment(form, type, title) {
      this.type = type;
      this.title = title;
      if (type == 1) {
        this.FromAddDepact.parent_id = 0;
      }
      if (type == 2) {
        this.FromAddDepact = { ...form };
        this.FromAddDepact.status = form.status.toString();
        let arr = [];
        arr.push(JSON.stringify(form.is_default));
        this.FromAddDepact.is_default = arr;
      }
      this.AddVisible = true;
    },
    // 新增确认
    AddDepactmentSure() {
      if (this.type == 1) {
        axios.post("/api/system/dept", this.FromAddDepact).then((res) => {
          this.$message.success("新增用户成功");
          this.AddVisible = false;
          this.DepactmentList();
        });
      } else {
        axios.patch("/api/system/dept", this.FromAddDepact).then((res) => {
          this.$message.success("编辑用户成功");
          this.AddVisible = false;
          this.DepactmentList();
        });
      }
    },
    // 取消新增
    AddDepactmentUp() {
      this.AddVisible = false;
    },
    // 删除部门
    deldepart(record) {
      var that = this;
      console.log(record);
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/system/dept", {
              params: {
                id: record.id,
                version: record.version,
              },
            })
            .then((res) => {
              that.$message.success("删除成功");
              that.DepactmentList();
              // that.AddVisible = false;
            });
        },
        onCancel() {},
      });
    },
  },
  computed: {
    // 列表数据选择框 控制是否全选
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
  background-color: #fff;
  border-radius: 10px;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
    display: flex;
    margin-bottom: 20px;
  }
}
</style>
