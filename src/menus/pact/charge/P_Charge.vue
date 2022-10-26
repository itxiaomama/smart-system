<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <!-- 搜索 -->
            <div class="left">
              <a-input-search
                placeholder="快速搜索"
                style="width: 200px; margin-right: 20px"
                @click="ChargeShow(true)"
                v-model="ChargeinputVal"
              />
            </div>
            <!-- 新增 -->
            <div class="bottom">
              <a-button type="primary" @click="AddCharge">新增</a-button>
              <!-- 新增modal弹框 -->
              <a-modal v-model="visibleAdd" title="添加费项" width="35%">
                <div
                  class="lefta"
                  style="display: flex; margin-top: 20px; width: 30vw"
                >
                  <p style="white-space: nowrap; line-height: 30px">
                    费项名称：
                  </p>
                  <a-input placeholder="费项名称" v-model="FromAdd.name" />
                </div>
                <div
                  class="lefta"
                  style="display: flex; margin-top: 20px; width: 30vw"
                >
                  <p style="white-space: nowrap; line-height: 30px">
                    费项类型：
                  </p>
                  <a-select style="width: 30vw" v-model="FromAdd.type">
                    <a-select-option value="0"> 系统费项 </a-select-option>
                    <a-select-option value="1"> 周期性费项 </a-select-option>
                    <a-select-option value="2"> 一次性费项 </a-select-option>
                  </a-select>
                </div>
                <div
                  class="lefta"
                  style="display: flex; margin-top: 20px; width: 30vw"
                >
                  <p style="white-space: nowrap; line-height: 30px">
                    计量单位：
                  </p>
                  <a-select style="width: 30vw" v-model="FromAdd.units_code">
                    <a-select-option value="1"> 度 </a-select-option>
                    <a-select-option value="2"> 平方米 </a-select-option>
                    <a-select-option value="3"> 吨 </a-select-option>
                    <a-select-option value="4"> 立方米 </a-select-option>
                    <a-select-option value="5"> 千克 </a-select-option>
                    <a-select-option value="6"> 元 </a-select-option>
                  </a-select>
                </div>
                <div
                  class="lefta"
                  style="
                    display: flex;
                    margin-top: 20px;
                    margin-left: 16px;
                    width: 29.2vw;
                  "
                >
                  <p style="white-space: nowrap; line-height: 30px">税率%：</p>
                  <a-input placeholder="税率" v-model="FromAdd.tax_fee" />
                </div>
                <div
                  class="lefta"
                  style="
                    display: flex;
                    margin-top: 20px;
                    margin-left: 28px;
                    width: 29.2vw;
                  "
                >
                  <p style="white-space: nowrap; line-height: 30px">备注：</p>
                  <a-textarea
                    placeholder="备注"
                    :rows="4"
                    v-model="FromAdd.memo"
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
                  <a-button style="margin-right: 20px" @click="AddChargeUp"
                    >取消</a-button
                  >
                  <a-button type="primary" @click="AddChargeSure"
                    >确定</a-button
                  >
                </div>
              </a-modal>
            </div>
          </div>
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :rowKey="(record, id) => id"
              :pagination="pagination"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <span slot="roomname" slot-scope="text, record">
                <a-switch
                  v-if="record.is_enabled == 1"
                  default-checked
                  checked-children="是"
                  un-checked-children="否"
                  @change="
                    switchChange(
                      $event,
                      record.id,
                      record.version,
                      'is_enabled'
                    )
                  "
                />
                <a-switch
                  v-if="record.is_enabled == 0"
                  default-unchecked
                  checked-children="是"
                  un-checked-children="否"
                  @change="
                    switchChange(
                      $event,
                      record.id,
                      record.version,
                      'is_enabled'
                    )
                  "
                />
              </span>
              <template slot="operation" slot-scope="text, record">
                <!-- 编辑 -->
                <a href="javascript:;" @click="EditCharge(record)">
                  <a-icon type="edit" theme="twoTone" />编辑</a
                >
                <!-- 编辑modal弹框 -->
                <a-modal v-model="visibleEdit" title="编辑费项" width="35%">
                  <div
                    class="lefta"
                    style="display: flex; margin-top: 20px; width: 30vw"
                  >
                    <p style="white-space: nowrap; line-height: 30px">
                      费项名称：
                    </p>
                    <a-input placeholder="费项名称" v-model="FromEdit.name" />
                  </div>
                  <div
                    class="lefta"
                    style="display: flex; margin-top: 20px; width: 30vw"
                  >
                    <p style="white-space: nowrap; line-height: 30px">
                      费项类型：
                    </p>
                    <a-select style="width: 30vw" v-model="FromEdit.type">
                      <a-select-option value="0"> 系统费项 </a-select-option>
                      <a-select-option value="1"> 周期性费项 </a-select-option>
                      <a-select-option value="2"> 一次性费项 </a-select-option>
                    </a-select>
                  </div>
                  <div
                    class="lefta"
                    style="display: flex; margin-top: 20px; width: 30vw"
                  >
                    <p style="white-space: nowrap; line-height: 30px">
                      计量单位：
                    </p>
                    <a-select style="width: 30vw" v-model="FromEdit.units_code">
                      <a-select-option value="1"> 度 </a-select-option>
                      <a-select-option value="2"> 平方米 </a-select-option>
                      <a-select-option value="3"> 吨 </a-select-option>
                      <a-select-option value="4"> 立方米 </a-select-option>
                      <a-select-option value="5"> 千克 </a-select-option>
                      <a-select-option value="6"> 元 </a-select-option>
                    </a-select>
                  </div>
                  <div
                    class="lefta"
                    style="
                      display: flex;
                      margin-top: 20px;
                      margin-left: 16px;
                      width: 29.2vw;
                    "
                  >
                    <p style="white-space: nowrap; line-height: 30px">
                      税率%：
                    </p>
                    <a-input placeholder="税率" v-model="FromEdit.tax_fee" />
                  </div>
                  <div
                    class="lefta"
                    style="
                      display: flex;
                      margin-top: 20px;
                      margin-left: 28px;
                      width: 29.2vw;
                    "
                  >
                    <p style="white-space: nowrap; line-height: 30px">备注：</p>
                    <a-textarea
                      placeholder="备注"
                      :rows="4"
                      v-model="FromEdit.memo"
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
                    <a-button style="margin-right: 20px" @click="EditChargeUp"
                      >取消</a-button
                    >
                    <a-button type="primary" @click="EditChargeSure"
                      >确定</a-button
                    >
                  </div>
                </a-modal>
                <a-divider type="vertical" />
                <!-- 删除 -->
                <a
                  href="javascript:;"
                  @click="DeleteCharge(record.id, record.version)"
                >
                  <a-icon type="delete" theme="twoTone" />删除</a
                >
              </template>
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
  name: "My_P_Charge",
  data() {
    return {
      ChargeinputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      dataSource: [], // 列表数据源
      columns: [
        {
          title: "费项名称",
          dataIndex: "name",
          scopedSlots: { customRender: "belong" },
        },

        {
          title: "费项类型",
          dataIndex: "type_name",
        },
        {
          title: "计量单位",
          dataIndex: "units_code_name",
        },
        {
          title: "税率%",
          dataIndex: "tax_fee",
        },
        {
          title: "是否启用",
          dataIndex: "is_enabled_name",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "备注",
          dataIndex: "memo",
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ], //table表格表头数据
      visibleAdd: false, // 新增 modal弹框默认状态
      visibleEdit: false, // 编辑 modal弹框默认状态
      valueState: 1, // 状态默认启用
      FromAdd: {}, // 新增 数据源
      FromEdit: {}, // 编辑 数据源
      pagination: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, //默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = pageSize;
          this.ChargeList(); //显示列表的接口名称
        },
        //改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.ChargeList();
        },
      }, // 页面数据分页
    };
  },
  watch: {
    // 自动监听搜索框是否有内容自动搜索
    ChargeinputVal(newValue) {
      if (newValue) {
        this.ChargeShow(true);
      } else {
        this.ChargeShow(false);
      }
    },
  },
  created() {
    this.ChargeList(); //列表数据
  },
  methods: {
    //获取费项配置列表
    ChargeList() {
      axios.get("/api/ics/expenseSettings").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    // 开关
    async switchChange(checked, id, version, name) {
      let obj = { id };
      obj[name] = checked ? 1 : 0;
      axios
        .patch("/api/ics/expenseSettings", obj, {
          params: { version: version },
        })
        .then((res) => {
          if (res.status_code == 200) {
            this.ChargeList(); //列表数据
          }
        });
    },
    // todo 新增
    // 新增modal弹框显示
    AddCharge() {
      this.visibleAdd = true;
    },
    // 新增确认
    AddChargeSure() {
      axios.post("/api/ics/expenseSettings", this.FromAdd).then((res) => {
        if (res.message === "success") {
          this.visibleAdd = false;
          this.$message.success("新增费项成功");
          this.ChargeList(); // 成功重新更新列表
        }
      });
    },
    // 取消新增
    AddChargeUp() {
      this.visibleAdd = false;
    },
    // todo 删除
    // 删除费项
    DeleteCharge(id, version) {
      axios
        .delete("/api/ics/expenseSettings", {
          params: {
            id: id,
            version: version,
          },
        })
        .then((res) => {
          if (res.status_code === 200) {
          }
          this.ChargeList(); // 成功重新更新列表
        });
      this.$message.success("删除费项成功");
    },
    // todo 编辑
    // 编辑modal弹框显示
    EditCharge(record) {
      this.visibleEdit = true;
      this.FromEdit = { ...record };
    },
    // 编辑确认
    EditChargeSure() {
      axios.patch("/api/ics/expenseSettings", this.FromEdit).then(() => {
        this.visibleEdit = false;
        this.$message.success("编辑费项成功");
        this.ChargeList(this.FromEdit.id ? this.page : 1);
      });
    },
    // 取消编辑
    EditChargeUp() {
      this.visibleEdit = false;
    },
    // todo 搜索
    ChargeShow(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.ChargeinputVal;
        axios
          .get("/api/ics/expenseSettings", { params: { name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.ChargeList(); // 更新表
      }
    },
  },
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
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
    display: flex;
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
