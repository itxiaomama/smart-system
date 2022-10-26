<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="top">
          <div class="left">
            <!-- 搜索 -->
            <a-input-search
              placeholder="请输入服务名称"
              style="width: 200px; margin-right: 20px"
              @click="ShowEdit(true)"
              v-model="inputVal"
            />
          </div>
          <div class="bottom">
            <!-- 新增 -->
            <a-button type="primary" @click="AddList">新增</a-button>
            <!-- 新增modal弹框 -->
            <a-modal v-model="visibleAdd" title="新增banner菜单" width="40%">
              <div class="buildname" style="margin: 20px 0 0 70px">
                <span>服务名称：</span>
                <a-input
                  placeholder="请输入服务名称"
                  style="width: 30vw"
                  v-model="FromAdd.service_name"
                />
              </div>
              <div class="buildname" style="margin: 20px 0 0 70px">
                <span>服务简介：</span>
                <a-input
                  placeholder="请输入服务简介"
                  style="width: 30vw"
                  v-model="FromAdd.service_desc"
                />
              </div>
              <div class="buildname" style="margin: 20px 0 0 84px">
                <span>供应商：</span>
                <a-select
                  placeholder="请选择"
                  style="width: 30vw"
                  v-model="FromAdd.supplier_id"
                  option-label-prop="label"
                >
                  <a-select-option
                    v-for="item in SupplierOptions"
                    :key="item.id"
                    :label="item.supplier_name"
                    :value="item.id"
                  >
                    <span role="img" :aria-label="item.supplier_name">
                      {{ item.supplier_name }}
                    </span>
                  </a-select-option>
                </a-select>
              </div>
              <div class="buildname" style="margin: 20px 0 0 70px">
                <span>菜单选择：</span>
                <a-select
                  placeholder="请选择"
                  style="width: 30vw"
                  v-model="FromAdd.menu_id"
                  option-label-prop="label"
                >
                  <a-select-option
                    v-for="item in MenuOptions"
                    :key="item.id"
                    :label="item.menu_name"
                    :value="item.id"
                  >
                    <span role="img" :aria-label="item.menu_name">
                      {{ item.menu_name }}
                    </span>
                  </a-select-option>
                </a-select>
              </div>
              <div class="buildname" style="margin: 20px 0 0 98px">
                <span>价格：</span>
                <a-input
                  placeholder="请输入价格"
                  style="width: 30vw"
                  v-model="FromAdd.price"
                />
              </div>
              <div class="buildname" style="margin: 20px 0 0 70px">
                <span>价格单位：</span>
                <a-input
                  placeholder="请输入价格单位"
                  style="width: 30vw"
                  v-model="FromAdd.price_unit"
                />
              </div>
              <div class="buildname" style="margin: 20px 0 0 70px">
                <span>咨询电话：</span>
                <a-input
                  placeholder="请输入咨询电话"
                  style="width: 30vw"
                  v-model="FromAdd.contract"
                />
              </div>
              <div class="buildname" style="margin: 20px 0 0 0">
                <span>咨询电话服务时间段：</span>
                <!-- v-model="FromAdd.contract_time_start" -->
                <!-- v-model="FromAdd.contract_time_end" -->
                <a-time-picker
                  format="HH:mm"
                  placeholder="请选择服务时间"
                  style="width: 14.5vw"
                  @change="pickerChange"
                />
                <span>~</span>
                <a-time-picker
                  format="HH:mm"
                  placeholder="请选择服务时间"
                  style="width: 15vw"
                  @change="pickerChange"
                />
                <div style="margin: 10px 140px">
                  <a-checkbox v-model="FromAdd.is_work_day">
                    仅工作日
                  </a-checkbox>
                </div>
              </div>
              <div class="buildname" style="margin: 20px 0 0 70px">
                <span>上传详情：</span>
                <a-input
                  placeholder="请输入上传详情"
                  style="width: 30vw"
                  v-model="FromAdd.service_content"
                />
              </div>
              <div class="buildname" style="margin: 20px 0 0 70px">
                <span>服务协议：</span>
                <a-checkbox v-model="FromAdd.agreement_status"> </a-checkbox>
              </div>
              <div
                style="
                  padding: 10px 16px;
                  text-align: right;
                  background: transparent;
                  border-top: 1px solid #e8e8e8;
                  border-radius: 0 0 4px 4px;
                "
              >
                <a href="javascript:;"
                  ><a-button style="margin-right: 20px" @click="AddListUp"
                    >取消</a-button
                  ></a
                >
                <a href="javascript:;" @click="AddListSure">
                  <a-button type="primary">确定</a-button></a
                >
              </div>
            </a-modal>
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
              :pagination="paginationServe"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <!-- 状态开关 -->
              <span slot="area" slot-scope="text, record">
                <a-switch
                  v-if="record.is_marketable == 1"
                  default-checked
                  checked-children="是"
                  un-checked-children="否"
                  @change="
                    switchChange(
                      $event,
                      record.id,
                      record.version,
                      'is_marketable'
                    )
                  "
                />
                <a-switch
                  v-if="record.is_marketable == 0"
                  default-unchecked
                  checked-children="是"
                  un-checked-children="否"
                  @change="
                    switchChange(
                      $event,
                      record.id,
                      record.version,
                      'is_marketable'
                    )
                  "
                />
              </span>
              <template slot="action" slot-scope="text, record">
                <!-- 编辑 -->
                <a @click="EditList(record)"
                  ><a-icon type="edit" theme="twoTone" />编辑
                </a>

                <!-- 编辑modal弹框 -->
                <a-modal
                  v-model="visibleEdit"
                  title="编辑banner菜单"
                  width="40%"
                >
                  <div class="buildname" style="margin: 20px 0 0 70px">
                    <span>服务名称：</span>
                    <a-input
                      placeholder="请输入服务名称"
                      style="width: 30vw"
                      v-model="FromEdit.service_name"
                    />
                  </div>
                  <div class="buildname" style="margin: 20px 0 0 70px">
                    <span>服务简介：</span>
                    <a-input
                      placeholder="请输入服务简介"
                      style="width: 30vw"
                      v-model="FromEdit.service_desc"
                    />
                  </div>
                  <div class="buildname" style="margin: 20px 0 0 84px">
                    <span>供应商：</span>
                    <a-select
                      placeholder="请选择"
                      style="width: 30vw"
                      v-model="FromEdit.supplier_id"
                      option-label-prop="label"
                    >
                      <a-select-option
                        v-for="item in SupplierOptions"
                        :key="item.id"
                        :label="item.supplier_name"
                        :value="item.id"
                      >
                        <span role="img" :aria-label="item.supplier_name">
                          {{ item.supplier_name }}
                        </span>
                      </a-select-option>
                    </a-select>
                  </div>
                  <div class="buildname" style="margin: 20px 0 0 70px">
                    <span>菜单选择：</span>
                    <a-select
                      placeholder="请选择"
                      style="width: 30vw"
                      v-model="FromEdit.menu_id"
                      option-label-prop="label"
                    >
                      <a-select-option
                        v-for="item in MenuOptions"
                        :key="item.id"
                        :label="item.menu_name"
                        :value="item.id"
                      >
                        <span role="img" :aria-label="item.menu_name">
                          {{ item.menu_name }}
                        </span>
                      </a-select-option>
                    </a-select>
                  </div>
                  <div class="buildname" style="margin: 20px 0 0 98px">
                    <span>价格：</span>
                    <a-input
                      placeholder="请输入价格"
                      style="width: 30vw"
                      v-model="FromEdit.price"
                    />
                  </div>
                  <div class="buildname" style="margin: 20px 0 0 70px">
                    <span>价格单位：</span>
                    <a-input
                      placeholder="请输入价格单位"
                      style="width: 30vw"
                      v-model="FromEdit.price_unit"
                    />
                  </div>
                  <div class="buildname" style="margin: 20px 0 0 70px">
                    <span>咨询电话：</span>
                    <a-input
                      placeholder="请输入咨询电话"
                      style="width: 30vw"
                      v-model="FromEdit.contract"
                    />
                  </div>
                  <div class="buildname" style="margin: 20px 0 0 0">
                    <span>咨询电话服务时间段：</span>
                    <!-- v-model="FromAdd.contract_time_start" -->
                    <!-- v-model="FromAdd.contract_time_end" -->
                    <a-time-picker
                      format="HH:mm"
                      placeholder="请选择服务时间"
                      style="width: 14.5vw"
                      @change="pickerChange"
                    />
                    <span>~</span>
                    <a-time-picker
                      format="HH:mm"
                      placeholder="请选择服务时间"
                      style="width: 15vw"
                      @change="pickerChange"
                    />
                    <div style="margin: 10px 140px">
                      <a-checkbox v-model="FromEdit.is_work_day">
                        仅工作日
                      </a-checkbox>
                    </div>
                  </div>
                  <div class="buildname" style="margin: 20px 0 0 70px">
                    <span>上传详情：</span>
                    <a-input
                      placeholder="请输入上传详情"
                      style="width: 30vw"
                      v-model="FromEdit.service_content"
                    />
                  </div>
                  <div class="buildname" style="margin: 20px 0 0 70px">
                    <span>服务协议：</span>
                    <a-checkbox v-model="FromEdit.agreement_status">
                    </a-checkbox>
                  </div>
                  <div
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
                    <a href="javascript:;" @click="EditListSure">
                      <a-button type="primary">确定</a-button></a
                    >
                  </div>
                </a-modal>
                <a-divider type="vertical" />
                <!-- 删除 -->
                <a
                  href="javascript:;"
                  @click="DeleteManage(record.id, record.version)"
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
import { Alert } from "ant-design-vue";
import axios from "axios";
export default {
  name: "My_F_Serve",
  data() {
    return {
      dataSource: [], //列表数据源
      columns: [
        {
          title: "服务名称",
          dataIndex: "service_name",
          width: "15%",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "所属菜单",
          dataIndex: "menu_name",
          width: "15%",
          align: "center",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "供应商名称",
          align: "center",
          dataIndex: "supplier_name",
          width: "15%",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "上架时间",
          align: "center",
          dataIndex: "marketable_time",
          width: "20%",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "是否上架",
          dataIndex: "is_marketable_name",
          width: "10%",
          align: "center",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "申请次数",
          align: "center",
          dataIndex: "agreement_status",
          width: "10%",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "操作",
          dataIndex: "action",
          width: "15%",
          align: "center",
          scopedSlots: { customRender: "action" },
        },
      ], //table表格表头数据
      FromAdd: {}, //存在新增数据
      visibleAdd: false, //新增弹框默认状态
      FromEdit: {}, //存在编辑数据
      visibleEdit: false, //编辑弹框默认状态
      paginationServe: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, //默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationServe.defaultCurrent = current;
          this.paginationServe.defaultPageSize = pageSize;
          this.bannerList(); //显示列表的接口名称
        }, // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationServe.defaultCurrent = current;
          this.paginationServe.defaultPageSize = size;
          this.bannerList();
        },
      }, //显示分页
      SupplierOptions: [], // 存放供应商选择数据
      MenuOptions: [], // 存放菜单选择数据
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
    };
  },
  watch: {
    // 监听搜索框是否有内容自动搜索
    inputVal(newValue) {
      if (newValue) {
        this.ShowEdit(true);
      } else {
        this.ShowEdit(false);
      }
    },
  },
  created() {
    // 获取列表数据
    this.manageList();
    // 获取供应商数据
    this.SupplierList();
    // 获取菜单数据
    this.menuList();
    // 修改时间格式
    this.yearTime();
  },
  methods: {
    // 修改时间赋值
    pickerChange(momentTime, yearTime) {
      this.FromAdd.contract_time_start = yearTime;
      this.FromAdd.contract_time_end = yearTime;
      this.FromEdit.contract_time_start = yearTime;
      this.FromEdit.contract_time_end = yearTime;
    },
    // 修改时间格式
    yearTime(proTime) {
      let time = new Date(proTime);
      let Hours = time.getHours(); //小时
      let Minutes = time.getMinutes(); //分钟
      return `${Hours}:${Minutes}`;
    },
    // 获取列表数据
    manageList() {
      axios.get("/api/ics/serviceManage?per_page=9999").then((res) => {
        this.dataSource = res.data.data;
      });
    },
    // 状态开关
    async switchChange(checked, id, version, name) {
      let obj = { id };
      obj[name] = checked ? 1 : 0;
      axios
        .patch("/api/ics/serviceManage/status", obj, {
          params: { version: version },
        })
        .then(() => {
          this.manageList();
        });
    },
    // 获取供应商数据
    SupplierList() {
      axios.get("/api/ics/serviceSupplier").then((res) => {
        this.SupplierOptions = res.data.data;
      });
    },
    // 获取菜单数据
    menuList() {
      axios.get("/api/ics/serviceMenu").then((res) => {
        this.MenuOptions = res.data;
      });
    },
    // todo 新增
    // 新增弹框显示
    AddList() {
      this.visibleAdd = true;
      this.FromAdd = { service_name: "" };
    },
    // 新增确认
    AddListSure() {
      axios.post("/api/ics/serviceManage", this.FromAdd).then((res) => {
        if (res.message === "success") {
          this.visibleAdd = false;
          this.$message.success("新增服务成功");
          this.manageList();
        }
      });
    },
    // 取消新增
    AddListUp() {
      this.visibleAdd = false;
    },
    // todo 删除
    // 删除
    DeleteManage(id, version) {
      axios
        .delete("/api/ics/serviceManage", {
          params: { id: id, version: version },
        })
        .then(() => {
          this.$message.success("删除服务成功");
          this.manageList();
        });
    },
    // todo 编辑
    // 编辑服务
    EditList(record) {
      this.visibleEdit = true;
      this.FromEdit = { ...record };
    },
    EditListSure() {
      this.visibleEdit = false;
    },
    EditListUp() {
      this.visibleEdit = false;
    },
    // todo 搜索
    // 搜索
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/ics/serviceManage", {
            params: { service_name: paramName },
          })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.manageList(); // 更新表
      }
    },
  },
  computed: {
    // 页面控制全选
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
  border-radius: 10px;
  background-color: #fff;
  .buildname {
    display: flex;
  }
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
    display: flex;
  }
}
</style>
