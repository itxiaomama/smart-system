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
          <a-button type="primary" style="margin-bottom: 20px" @click="AddList">
            新增
          </a-button>
          <!-- 新增modal弹框 -->
          <a-modal v-model="visibleAdd" title="新增租户" width="35%">
            <div class="buildname" style="margin-bottom: 20px">
              <span>租户名称：</span
              ><a-input
                placeholder="租户名称"
                style="width: 28vw"
                v-model="From.name"
                allow-clear
              ></a-input>
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
              <a-button style="margin-right: 20px" @click="AddListUp"
                >取消</a-button
              >
              <a-button type="primary" @click="AddTenantList">确定</a-button>
            </div>
          </a-modal>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="content">
        <div>
          <a-table
            bordered
            :row-selection="rowSelection"
            :data-source="dataSource"
            :columns="columns"
            :rowKey="(record, id) => id"
            :pagination="pagination"
          >
            <template slot="operation" slot-scope="record">
              <!-- 编辑 -->
              <a href="javascript:;" @click="EditList(record)"
                ><a-icon type="edit" theme="twoTone" />编辑</a
              >
              <!-- 编辑modal弹框 -->
              <a-modal v-model="visibleEdit" title="编辑园区" width="35%">
                <div class="buildname" style="margin-bottom: 20px">
                  <span>租户名称：</span
                  ><a-input
                    placeholder="租户名称"
                    style="width: 28vw"
                    v-model="FromEdit.name"
                    allow-clear
                  ></a-input>
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
                  <a href="javascript:;"
                    ><a-button style="margin-right: 20px" @click="EditListUp"
                      >取消</a-button
                    ></a
                  >
                  <a href="javascript:;" @click="EditTenantList">
                    <a-button type="primary">确定</a-button></a
                  >
                </div>
              </a-modal>
              <a-divider type="vertical" />
              <!-- 删除 -->
              <a
                href="javascript:;"
                @click="DeleteTenant(record.id, record.version)"
                ><a-icon type="delete" theme="twoTone" />删除</a
              >
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "GardenBuild",
  data() {
    return {
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      dataSource: [], // 列表页面数据源
      columns: [
        {
          title: "租户名称",
          dataIndex: "name",
          width: "75%",
          slots: { customRender: "name" },
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: "25%",
          scopedSlots: { customRender: "operation" },
        },
      ], //table表格表头内容
      visibleAdd: false, //新增  modal弹框 默认状态
      visibleEdit: false, //编辑  modal弹框 默认状态
      From: {}, // 存放新增数据
      FromEdit: {}, // 存放编辑数据
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
    //获取租户列表
    tenantList() {
      axios.get("/api/system/tenant?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    //todo 新增//
    // 点击新增租户按钮弹框显示
    AddList() {
      this.visibleAdd = true;
    },
    // 新增确认
    AddTenantList() {
      axios.post("/api/system/tenant", this.From).then((res) => {
        if (res.status_code === 201) {
          console.log(res);
          this.From.name = "";
          this.$message.success("新增租户成功");
          this.visibleAdd = false;
          this.tenantList();
        }
      });
    },
    // 新增取消
    AddListUp() {
      this.From.name = "";
      this.visibleAdd = false;
    },
    //todo 删除//
    // 删除租户
    DeleteTenant(id, version) {
      axios
        .delete("/api/system/tenant", {
          params: {
            id: id,
            version: version,
          },
        })
        .then(() => {
          this.$message.success("删除租户成功");
          // 成功重新更新列表
          this.tenantList();
        });
    },
    //todo 编辑//
    // 点击编辑租户按钮弹框显示，数据浅拷贝
    EditList(record) {
      this.visibleEdit = true;
      this.FromEdit = { ...record };
    },
    // 编辑确认
    EditTenantList() {
      axios.patch("/api/system/tenant", this.FromEdit).then(() => {
        this.visibleEdit = false;
        // 成功重新更新列表
        this.$message.success("编辑租户成功");
        this.tenantList(this.FromEdit.id ? this.page : 1);
      });
    },
    // 编辑取消
    EditListUp() {
      this.visibleEdit = false;
    },
    //todo 查询//
    // 查询租户
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/system/tenant", { params: { name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.tenantList(); // 查询成功根据输入框内容刷新列表
      }
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

<style>
.ant-modal-footer {
  display: none !important;
}
.ant-modal-mask {
  background-color: rgba(255, 255, 255, 0) !important;
}
</style>
<style lang="less" scoped>
.wrap {
  width: 87.3vw;
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
