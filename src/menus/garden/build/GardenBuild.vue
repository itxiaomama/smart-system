<template>
  <div class="wrap">
    <div class="wrapA">
      <div class="top">
        <!-- 搜索 -->
        <div class="left">
          <a-input-search
            placeholder="请输入楼宇名称"
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
            @click="AddBuilding"
          >
            新增
          </a-button>
          <!-- 新增modal弹框 -->
          <a-modal v-model="visibleAdd" title="新增楼宇" width="35%">
            <div class="buildname" style="margin: 20px 12px">
              <span>楼宇名称：</span>
              <a-input
                placeholder="请输入楼宇名称"
                style="width: 26vw"
                v-model="fromAdd.building_name"
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
              <a-button style="margin-right: 20px" @click="AddBuildingUp"
                >取消</a-button
              >
              <a-button type="primary" @click="AddBuildingSure">确定</a-button>
            </div>
          </a-modal>
        </div>
      </div>
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
            <a slot="district_name" slot-scope="text">{{ text }}</a>
            <template slot="operation" slot-scope="text, record">
              <!-- 编辑 -->
              <a href="javascript:;" @click="AddEdit(record)"
                ><a-icon type="edit" theme="twoTone" />编辑</a
              >
              <!-- 编辑modal弹框 -->
              <a-modal v-model="visibleEdit" title="编辑园区" width="35%">
                <div class="buildname" style="margin: 20px 12px">
                  <span>楼宇名称：</span>
                  <a-input
                    placeholder="请输入楼宇名称"
                    style="width: 26vw"
                    v-model="fromEdit.building_name"
                  />
                </div>
                <div class="remake" style="margin: 20px 40px; display: flex">
                  <span>备注：</span>
                  <a-textarea
                    placeholder="请输入备注"
                    :rows="2"
                    style="width: 26vw"
                    v-model="fromEdit.remark"
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
                  <a-button style="margin-right: 20px" @click="AddEditUp"
                    >取消</a-button
                  >
                  <a-button type="primary" @click="AddEditSure">确定</a-button>
                </div>
              </a-modal>
              <a-divider type="vertical" />
              <!-- 新增楼层 -->
              <a href="javascript:;" @click="floorbtn"
                ><a-icon type="database" theme="twoTone" />楼层</a
              >
              <a-modal v-model="visibleFloor" title="楼层列表" width="50%">
                <div>
                  <div>
                    <!-- 楼层新增 -->
                    <a-button
                      type="primary"
                      style="margin-bottom: 20px"
                      @click="AddFloor"
                    >
                      新增
                    </a-button>
                    <!-- 楼层新增modal弹框 -->
                    <a-modal
                      v-model="visibleFloorAdd"
                      title="楼层新增"
                      width="35%"
                    >
                      <div class="buildname" style="margin: 20px 40px">
                        <span>楼层：</span>
                        <a-input
                          placeholder="请输入楼层"
                          style="width: 26vw"
                          v-model="fromEditAdd.floor_num"
                        />
                      </div>
                      <div class="buildname" style="margin: 20px 12px">
                        <span>楼层名称：</span>
                        <a-input
                          placeholder="请输入楼层名称"
                          style="width: 26vw"
                          v-model="fromEditAdd.floor_name"
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
                        <a-button style="margin-right: 20px" @click="AddFloorUp"
                          >取消</a-button
                        >
                        <a-button type="primary" @click="AddFloorSure"
                          >确定</a-button
                        >
                      </div>
                    </a-modal>
                  </div>
                  <div>
                    <a-table
                      bordered
                      :row-selection="rowSelection"
                      :data-source="dataSourceFloor"
                      :columns="columnsFloor"
                      :rowKey="(record, id) => id"
                    >
                      <template slot="operation" slot-scope="text, record">
                        <!--楼层编辑 -->
                        <a href="javascript:;" @click="EditFloor(record)"
                          ><a-icon type="edit" theme="twoTone" />编辑</a
                        >
                        <!-- 楼层编辑modal弹框 -->
                        <a-modal
                          v-model="visibleFloorEdit"
                          title="楼层编辑"
                          width="35%"
                        >
                          <div class="buildname" style="margin: 20px 40px">
                            <span>楼层：</span>
                            <a-input
                              placeholder="请输入楼层"
                              style="width: 26vw"
                              v-model="fromEditFloor.floor_num"
                            />
                          </div>
                          <div class="buildname" style="margin: 20px 12px">
                            <span>楼层名称：</span>
                            <a-input
                              placeholder="请输入楼层名称"
                              style="width: 26vw"
                              v-model="fromEditFloor.floor_name"
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
                            <a-button
                              style="margin-right: 20px"
                              @click="EditFloorUp"
                              >取消</a-button
                            >
                            <a-button type="primary" @click="EditFloorSure"
                              >确定</a-button
                            >
                          </div>
                        </a-modal>
                        <a-divider type="vertical" />
                        <!-- 楼层删除 -->
                        <a
                          href="javascript:;"
                          @click="DeleteFloor(record.id, record.version)"
                          ><a-icon type="delete" theme="twoTone" />删除</a
                        ></template
                      ></a-table
                    >
                  </div>
                </div>
              </a-modal>
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
      dataSource: [], // 列表数据源
      columns: [
        {
          title: "所属园区",
          dataIndex: "park_name",
          width: "20%",
          scopedSlots: { customRender: "district_name" },
        },
        {
          title: "楼宇名称",
          dataIndex: "building_name",
          align: "center",
          width: "15%",
        },
        {
          title: "备注",
          dataIndex: "remark",
          align: "center",
          width: "10%",
        },
        {
          title: "创建时间",
          align: "center",
          dataIndex: "created_at",
          width: "20%",
        },
        {
          title: "创建人",
          dataIndex: "create_by",
          align: "center",
          width: "15%",
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          scopedSlots: { customRender: "operation" },
          width: "20%",
        },
      ], //table表格表头数据
      dataSourceFloor: [], // 楼层数据源
      columnsFloor: [
        {
          title: "楼层",
          dataIndex: "floor_num",
          width: "15%",
        },
        {
          title: "楼层名称",
          dataIndex: "floor_name",
          width: "15%",
        },
        {
          title: "创建时间",
          align: "center",
          dataIndex: "created_at",
          width: "20%",
        },
        {
          title: "创建人",
          dataIndex: "create_by",
          width: "15%",
        },
        {
          title: "操作",
          key: "operation",
          scopedSlots: { customRender: "operation" },
          width: "25%",
        },
      ], //table表格表头数据
      visibleAdd: false, // 新增 model弹框默认状态
      visibleEdit: false, // 编辑 model弹框默认状态
      visibleFloor: false, // 楼层 model弹框默认状态
      visibleFloorAdd: false, // 新增 楼层 model弹框默认状态
      visibleFloorEdit: false, // 编辑 楼层 model弹框默认状态
      fromAdd: {}, // 存放 新增 数据源
      fromEdit: {}, // 存放 编辑 数据源
      fromEditAdd: {}, // 存放 楼层新增 数据源
      fromEditFloor: {}, // 存放 楼层编辑 数据源
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
          this.buildingList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.buildingList();
        },
      }, // 页面显示数据分页内容
    };
  },
  created() {
    this.buildingDetailList(); // 楼层列表
  },
  mounted() {
    this.buildingList(); // 楼宇列表
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
    //获取楼宇列表
    buildingList() {
      axios.get("/api/ics/building?per_page=9999").then((res) => {
        if (res.message === "success") {
          this.dataSource = res.data.data;
        }
      });
    },
    // ? 楼宇
    // todo 新增
    // 新增modal弹框展开
    AddBuilding() {
      this.visibleAdd = true;
    },
    // 新增确认
    AddBuildingSure() {
      axios
        .post("/api/ics/building?district_id=1", this.fromAdd)
        .then((res) => {
          if (res.message === "success") {
            this.fromAdd.building_name = "";
            this.fromAdd.remark = "";
            this.$message.success("新增楼宇成功");
            // 成功重新更新列表
            this.buildingList();
            this.visibleAdd = false;
          }
        });
    },
    // 取消新增
    AddBuildingUp() {
      this.fromAdd.building_name = "";
      this.fromAdd.remark = "";
      this.visibleAdd = false;
    },
    // todo 删除
    // 删除区域
    DeleteArea(id, version) {
      axios
        .delete("/api/ics/building", {
          params: {
            id: id,
            version: version,
          },
        })
        .then((res) => {
          if (res.message === "success") {
          } // 成功重新更新列表
          this.$message.success("删除车位成功");
          this.buildingList();
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
        .patch("/api/ics/building", this.fromEdit, {
          params: {
            id: id,
            version: version,
          },
        })
        .then((res) => {
          console.log(id);
          if (res.message === "success") {
            this.visibleEdit = false;
            this.$message.success("编辑车位成功");
            this.buildingList(this.fromEdit.id ? this.page : 1);
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
          .get("/api/ics/building", { params: { building_name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.tenantList(); // 更新表
      }
    },
    //获取楼层列表
    buildingDetailList() {
      axios
        .get("/api/ics/buildingDetail?per_page=9999", {
          params: { building_id: 1 },
        })
        .then((res) => {
          if (res.message === "success") {
            this.dataSourceFloor = res.data.data;
          }
        });
    },
    // ? 楼层
    // 楼层modal弹框数据页面
    floorbtn() {
      this.visibleFloor = true;
    },
    // todo 新增
    // 新增modal弹框展开
    AddFloor() {
      this.visibleFloorAdd = true;
    },
    // 新增确认
    AddFloorSure() {
      axios
        .post("/api/ics/buildingDetail", this.fromEditAdd, {
          params: { building_id: 1 },
        })
        .then((res) => {
          if (res.message === "success") {
            this.fromEditAdd.floor_num = "";
            this.fromEditAdd.floor_name = "";
            this.$message.success("新增楼宇成功");
            // 成功重新更新列表
            this.buildingDetailList();
            this.visibleFloorAdd = false;
          }
        });
    },
    // 取消新增
    AddFloorUp() {
      this.fromEditAdd.floor_num = "";
      this.fromEditAdd.floor_name = "";
      this.visibleFloorAdd = false;
    },
    // todo 删除
    // 删除区域
    DeleteFloor(id, version) {
      axios
        .delete("/api/ics/buildingDetail", {
          params: {
            id: id,
            version: version,
          },
        })
        .then((res) => {
          if (res.message === "success") {
          } // 成功重新更新列表
          this.$message.success("删除楼层成功");
          this.buildingDetailList();
        });
    },
    // todo 编辑
    // 编辑modal弹框展开
    EditFloor(record) {
      this.visibleFloorEdit = true;
      this.fromEditFloor = { ...record };
    },
    // 编辑确认
    EditFloorSure() {
      axios
        .patch("/api/ics/building", this.fromEditFloor, {
          params: {
            district_id: 1,
          },
        })
        .then((res) => {
          if (res.message === "success") {
            this.visibleFloorEdit = false;
            this.$message.success("编辑楼层成功");
            this.buildingDetailList(this.fromEditFloor.id ? this.page : 1);
          }
        });
    },
    // 取消编辑
    EditFloorUp() {
      this.visibleFloorEdit = false;
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
