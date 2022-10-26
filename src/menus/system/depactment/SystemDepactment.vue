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
            <a-button type="primary" @click="AddDepactment">新增</a-button>
            <a-modal v-model="AddVisible" title="新增部门" width="40%">
              <a-form
                :form="form"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-form-item label="上级部门">
                  <a-select
                    v-model="FromAddDepact.parent_id"
                    style="width: 30vw"
                    v-decorator="[
                      'gendera',
                      {
                        rules: [
                          {
                            required: true,
                          },
                        ],
                      },
                    ]"
                    placeholder="请选择"
                  >
                    <a-select-option value="nor">运营部</a-select-option>
                    <a-select-option value="mal">招商部</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="部门名称">
                  <a-input
                    v-model="FromAddDepact.dept_name"
                    style="width: 30vw"
                    v-decorator="[
                      'note',
                      {
                        rules: [
                          {
                            required: true,
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
                <a-form-item label="显示顺序">
                  <a-input
                    v-model="FromAddDepact.order_num"
                    style="width: 30vw"
                    v-decorator="[
                      'notea',
                      {
                        rules: [
                          {
                            required: true,
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
                <a-form-item label="负责人">
                  <a-input
                    v-model="FromAddDepact.test"
                    style="width: 30vw"
                    v-decorator="[
                      'noteb',
                      {
                        rules: [
                          {
                            required: true,
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
                <a-form-item label="电话">
                  <a-input
                    v-model="FromAddDepact.phone"
                    style="width: 30vw"
                    v-decorator="[
                      'notec',
                      {
                        rules: [
                          {
                            required: true,
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
                <a-form-item label="邮箱">
                  <a-input
                    v-model="FromAddDepact.email"
                    style="width: 30vw"
                    v-decorator="[
                      'noted',
                      {
                        rules: [
                          {
                            required: true,
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
                <a-form-item label="状态">
                  <a-select
                    v-model="FromAddDepact.status"
                    style="width: 30vw"
                    v-decorator="[
                      'gender',
                      {
                        rules: [
                          {
                            required: true,
                          },
                        ],
                      },
                    ]"
                    placeholder="请选择"
                  >
                    <a-select-option value="normal">正常</a-select-option>
                    <a-select-option value="norma">停用</a-select-option>
                  </a-select>
                </a-form-item>
                <div style="margin: 30px 76px">
                  <span>设置：</span>
                  <a-checkbox v-model="FromAddDepact.is_default"
                    >是否默认</a-checkbox
                  >
                  <p style="margin: 20px 40px">勾选后注册用户将默认此角色</p>
                </div>
              </a-form>
              <div
                style="
                  padding: 10px 16px;
                  text-align: right;
                  background: transparent;
                  border-top: 1px solid #e8e8e8;
                  border-radius: 0 0 4px 4px;
                "
              >
                <a-button @click="AddDepactmentUp" style="margin-right: 20px"
                  >取消</a-button
                >
                <a-button type="primary" @click="AddDepactmentSure"
                  >确定</a-button
                >
              </div>
            </a-modal>
          </div>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :rowKey="(record, id) => id"
            >
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="actions">
                <!-- 编辑 -->
                <a href="javascript:;">编辑</a>
                <a-divider type="vertical" />
                <!-- 子新增 -->
                <a href="javascript:;">新增</a>
                <a-divider type="vertical" />
                <!--  -->
                <a href="javascript:;">删除</a>
              </span>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SystemDepactment",
  data() {
    return {
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
          dataIndex: "parent_id",
        },
        {
          title: "状态",
          dataIndex: "status_name",
        },
        {
          title: "是否默认",
          dataIndex: "version",
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
      FromAddDepact: {}, //存放新增数据
    };
  },
  created() {
    this.DepactmentList(); // 获取角色列表
  },
  methods: {
    // 获取角色列表
    DepactmentList() {
      axios.get("/api/system/dept?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data;
        }
      });
    },
    // todo 新增
    // 点击新增按钮弹框显示
    AddDepactment() {
      this.AddVisible = true;
    },
    // 新增确认
    AddDepactmentSure() {
      axios.post("/api/system/dept", this.FromAddDepact).then((res) => {
        if (res.message === "success") {
          this.$message.success("新增用户成功");
          this.AddVisible = false;
          this.DepactmentList();
        }
      });
    },
    // 取消新增
    AddDepactmentUp() {
      this.AddVisible = false;
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
  width: 87.3vw;
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
