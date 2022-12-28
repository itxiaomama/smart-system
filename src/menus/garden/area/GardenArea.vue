<template>
  <div class="wrap">
    <div class="wrapA">
      <div class="top">
        <!-- 搜索 -->
        <div class="left">
          <a-input-search
            placeholder="请输入区域名称"
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
            @click="AddArea({}, 1, '新增区域')"
          >
            新增
          </a-button>
        </div>
      </div>
      <div class="content">
        <div>
          <a-table
            bordered
            :row-selection="rowSelection"
            :data-source="dataSource"
            :columns="columns"
            rowKey="id"
            :pagination="pagination"
          >
            <!-- <a slot="district_name" slot-scope="text">{{ text }}</a> -->
            <template slot="operation" slot-scope="text, record">
              <!-- 编辑 -->
              <a href="javascript:;" @click="AddArea(record, 2, '编辑车位')"
                ><a-icon type="edit" theme="twoTone" />编辑</a
              >
              <a-divider type="vertical" />
              <!-- 删除 -->
              <a
                href="javascript:;"
                @click="DeleteArea(record.id, record.version)"
                ><a-icon type="delete" theme="twoTone" />删除</a
              >
            </template>
          </a-table>
        </div>
      </div>
    </div>

    <!-- 新增modal弹框 -->
    <a-modal v-model="visibleAdd" :title="title" width="35vw">
      <div class="buildname" style="margin: 20px 12px">
        <span>区域名称：</span>
        <a-input
          placeholder="请输入区域名称"
          style="width: 26vw"
          v-model="fromAdd.district_name"
        />
      </div>
      <div class="remake" style="margin: 20px 40px; display: flex">
        <span>备注：</span>
        <a-textarea
          placeholder="请输入备注"
          :rows="2"
          style="width: 26vw"
          v-model="fromAdd.remark"
        />
      </div>
      <template slot="footer">
        <div class="btnant">
          <a-button style="margin-right: 20px" @click="AddAreaUp"
            >取消</a-button
          >
          <a-button type="primary" @click="AddAreaSure">确定</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "GardenArea",
  data() {
    return {
      type: 1,
      title: "新增区域",
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      dataSource: [], // 列表数据源
      columns: [
        {
          title: "区域名称",
          dataIndex: "district_name",
          scopedSlots: { customRender: "district_name" },
          width: "20%",
        },
        {
          title: "备注",
          dataIndex: "remark",
          align: "center",
          width: "20%",
        },
        {
          title: "创建时间",
          align: "center",
          dataIndex: "created_at",
          width: "30%",
        },
        {
          title: "创建人",
          align: "center",
          dataIndex: "create_by",
          width: "15%",
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          scopedSlots: { customRender: "operation" },
          width: "15%",
        },
      ], //table表格表头数据
      visibleAdd: false, // 新增 model弹框默认状态
      visibleEdit: false, // 编辑 model弹框默认状态
      fromAdd: {}, // 存放 新增 数据源
      fromEdit: {}, // 存放 编辑 数据源
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
          this.areaList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.areaList();
        },
      }, // 页面显示数据分页内容
    };
  },
  created() {
    this.areaList(); // 区域列表
  },
  watch: {
    // 监听搜索框是否有内容自动根据内容搜素
    inputVal(newValue) {
      if (newValue) {
        this.ShowEdit(true);
      } else {
        this.ShowEdit(false);
      }
    },
  },
  methods: {
    //获取区域列表
    areaList() {
      axios.get("/api/ics/district?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    // todo 新增
    // 新增modal弹框展开
    AddArea(form, type, title) {
      this.type = type;
      this.title = title;
      this.fromAdd = { ...form };
      this.visibleAdd = true;
    },
    // 新增确认
    AddAreaSure() {
      if (this.type == 1) {
        axios.post("/api/ics/district", this.fromAdd).then((res) => {
          if (res.message === "success") {
            this.fromAdd.district_name = "";
            this.fromAdd.remark = "";
            this.$message.success("新增区域成功");
            // 成功重新更新列表
            this.areaList();
            this.visibleAdd = false;
          }
        });
      } else {
        console.log(this.fromAdd);
        axios
          .patch("/api/ics/district", this.fromAdd, {
            params: {
              id: this.fromAdd.id,
              version: this.fromAdd.version,
            },
          })
          .then((res) => {
            if (res.message === "success") {
              this.visibleAdd = false;
              this.$message.success("编辑区域成功");
              this.areaList(this.fromAdd.id ? this.page : 1);
            }
          });
      }
    },
    // 取消新增
    AddAreaUp() {
      this.fromAdd.district_name = "";
      this.fromAdd.remark = "";
      this.visibleAdd = false;
    },
    //todo 删除
    // 删除区域
    DeleteArea(id, version) {
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/ics/district", {
              params: {
                id: id,
                version: version,
              },
            })
            .then((res) => {
              if (res.message === "success") {
              } // 成功重新更新列表
              that.$message.success("删除区域成功");
              that.areaList();
            });
        },
        onCancel() {},
      });
    },
    // todo 编辑
    // 编辑modal弹框展开
    AddEdit(record) {
      this.visibleEdit = true;
      this.fromEdit = { ...record };
    },
    // 编辑确认
    AddEditSure(id, version) {
      axios
        .patch("/api/ics/district", this.fromEdit, {
          params: {
            id: id,
            version: version,
          },
        })
        .then((res) => {
          if (res.message === "success") {
            this.visibleEdit = false;
            this.$message.success("编辑区域成功");
            this.areaList(this.fromEdit.id ? this.page : 1);
          }
        });
    },
    // 取消编辑
    AddEditUp() {
      this.visibleEdit = false;
    },
    // todo 搜索
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/ics/district", { params: { district_name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.tenantList(); // 更新表
      }
    },
  },
  computed: {
    // table表格全选框控制
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
