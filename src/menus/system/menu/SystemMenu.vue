<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="top">
          <!-- 搜索 -->
          <div class="left">
            <a-input-search
              placeholder="快速搜索"
              style="width: 200px; margin-right: 40px"
            />
          </div>
          <!-- 新增 -->
          <div class="bottom">
            <a-button type="primary" @click="showModal(null, 1, '新增菜单')"
              >新增</a-button
            >
          </div>
        </div>

        <div class="content">
          <a-table
            bordered
            :columns="columns"
            rowKey="id"
            :data-source="data"
            :row-selection="rowSelection"
          >
            <span slot="menu_type" slot-scope="text">
              {{ text | menuTypeFilter }}
            </span>

            <span slot="actions" slot-scope="text, record">
              <!-- 编辑 -->
              <a href="javascript:;" @click="showModal(record, 2, '编辑菜单')"
                >编辑</a
              >
              <a-divider type="vertical" />
              <!-- 子新增 -->
              <a
                href="javascript:;"
                @click="showModal(record.id, 1, '新增菜单')"
                >新增</a
              >
              <a-divider type="vertical" />
              <!--  -->
              <a href="javascript:;" @click="delit(record)">删除</a>
            </span>
          </a-table>
        </div>
      </div>
    </div>
    <menudia ref="menudia" />
  </div>
</template>

<script>
import axios from "axios";
import menudia from "./menudia.vue";
export default {
  name: "SystemMenu",
  filters: {
    menuTypeFilter(type) {
      const menuMap = {
        M: "目录",
        F: "按钮",
        C: "菜单",
      };
      return menuMap[type];
    },
  },
  components: {
    menudia,
  },
  data() {
    return {
      title: "",
      type: null,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      visible1: false,
      data: [],
      columns: [
        {
          title: "权限名称",
          dataIndex: "menu_name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "路由唯一键",
          dataIndex: "menu_key",
        },
        {
          title: "组件",
          dataIndex: "component",
        },
        {
          title: "排序",
          dataIndex: "order_num",
        },
        {
          title: "按钮类型",
          dataIndex: "menu_type",
          scopedSlots: { customRender: "menu_type" },
        },
        {
          title: "重定向",
          dataIndex: "redirect_to",
        },
        {
          title: "权限标识",
          dataIndex: "perms",
        },
        {
          title: "状态",
          dataIndex: "status_name",
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "actions" },
        },
      ],
    };
  },
  created() {
    this.PatrolPoint(); // 获取角色列表
  },
  methods: {
    // 获取角色列表
    PatrolPoint() {
      axios.get("/api/system/menu?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.data = res.data;
        }
      });
    },
    showModal(form, type, title) {
      if (type == 1) {
        this.$refs.menudia.add(form, type, title);
      } else {
        this.$refs.menudia.edit(form, type, title);
      }
    },
    // 删除成功
    delit(item) {
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/system/menu", {
              params: {
                id: item.id,
                version: item.version,
              },
            })
            .then(() => {
              that.$message.success("删除成功");
              // 删除成功重置用户列表
              that.PatrolPoint();
            });
        },
        onCancel() {},
      });
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
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
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
}
</style>
