<template>
  <div class="wrap">
    <div class="wrapA">
      <div class="top">
        <!-- 搜索 -->
        <div class="left">
          <a-input-search
            placeholder="请输入车位名称"
            style="width: 200px; margin-right: 20px"
            @click="CarSearch(true)"
            v-model="CarinputVal"
          />
        </div>
        <!-- 新增 -->
        <div class="bottom" style="margin-bottom: 20px">
          <a-button type="primary" @click="AddCarSpace">新增</a-button>
          <!-- 新增modal弹框 -->
          <a-modal v-model="visibleCarSpace" title="添加车位" width="35%">
            <div class="buildname" style="margin: 20px 12px">
              <span>所属主体：</span>
              <a-input
                placeholder="请输入所属主体"
                style="width: 26vw"
                v-model="FromCarSpace.space_region"
              />
            </div>
            <div class="buildname" style="margin: 20px 12px">
              <span>车位名称：</span>
              <a-input
                placeholder="请输入车位名称"
                style="width: 26vw"
                v-model="FromCarSpace.space_name"
              />
            </div>
            <div class="buildname" style="margin: 20px 12px">
              <span>车牌号码：</span>
              <a-input
                placeholder="请输入车牌号码"
                style="width: 26vw"
                v-model="FromCarSpace.car_num"
              />
            </div>
            <div class="buildname" style="margin: 20px 40px">
              <span>类别：</span>
              <a-select
                style="width: 26vw"
                placeholder="请选择"
                v-model="FromCarSpace.space_type"
              >
                <a-select-option value="1"> 公共无产权 </a-select-option>
                <a-select-option value="2"> 自购有产权 </a-select-option>
              </a-select>
            </div>
            <div class="buildname" style="margin: 20px 40px">
              <span>状态：</span>
              <a-select
                placeholder="请选择"
                style="width: 26vw"
                v-model="FromCarSpace.space_status"
              >
                <a-select-option value="1"> 收费 </a-select-option>
                <a-select-option value="2"> 免费 </a-select-option>
                <a-select-option value="3"> 闲置 </a-select-option>
              </a-select>
            </div>
            <div class="buildname" style="margin: 20px 12px">
              <span>车位业主：</span>
              <a-input
                placeholder="请输入车位业主"
                style="width: 26vw"
                v-model="FromCarSpace.user_name"
              />
            </div>
            <div class="buildname" style="margin: 20px 12px">
              <span>联系电话：</span>
              <a-input
                placeholder="请输入联系电话"
                style="width: 26vw"
                v-model="FromCarSpace.user_phone"
              />
            </div>
            <div class="remake" style="margin: 20px 40px; display: flex">
              <span>备注：</span>
              <a-textarea
                placeholder="请输入备注"
                :rows="2"
                style="width: 26vw"
                v-model="FromCarSpace.remark"
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
              <a-button @click="AddCarSpaceCancel" style="margin-right: 20px"
                >取消</a-button
              >
              <a-button type="primary" @click="AddCarSpaceShow()"
                >确定</a-button
              >
            </div>
          </a-modal>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="content">
        <div>
          <a-table
            bordered
            :data-source="dataSource"
            :columns="columns"
            :row-selection="rowSelection"
            :rowKey="(record, id) => id"
            :pagination="pagination"
          >
            <a slot="district_name" slot-scope="text">{{ text }}</a>
            <template slot="operation" slot-scope="text, record">
              <!-- 编辑 -->
              <a href="javascript:;" @click="EditCarSpace(record)"
                ><a-icon type="edit" theme="twoTone" />编辑</a
              >
              <!-- 编辑modal弹框 -->
              <a-modal
                v-model="visibleCarSpaceEdit"
                title="编辑车位"
                width="36%"
              >
                <div class="buildname" style="margin: 20px 12px">
                  <span>所属主体：</span>
                  <a-input
                    placeholder="请输入所属主体"
                    style="width: 26vw"
                    v-model="FromEditCarSpace.space_region"
                  />
                </div>
                <div class="buildname" style="margin: 20px 12px">
                  <span>车位名称：</span>
                  <a-input
                    placeholder="请输入车位名称"
                    style="width: 26vw"
                    v-model="FromEditCarSpace.space_name"
                  />
                </div>
                <div class="buildname" style="margin: 20px 12px">
                  <span>车牌号码：</span>
                  <a-input
                    placeholder="请输入车位名称"
                    style="width: 26vw"
                    v-model="FromEditCarSpace.car_num"
                  />
                </div>
                <div class="buildname" style="margin: 20px 40px">
                  <span>类别：</span>
                  <a-select
                    default-value="请选择"
                    style="width: 26vw"
                    v-model="FromEditCarSpace.space_type"
                  >
                    <a-select-option value="1"> 公共无产权 </a-select-option>
                    <a-select-option value="2"> 自购有产权 </a-select-option>
                  </a-select>
                </div>
                <div class="buildname" style="margin: 20px 40px">
                  <span>状态：</span>
                  <a-select
                    default-value="请选择"
                    style="width: 26vw"
                    v-model="FromEditCarSpace.space_status"
                  >
                    <a-select-option value="1"> 收费 </a-select-option>
                    <a-select-option value="2"> 免费 </a-select-option>
                    <a-select-option value="3"> 闲置 </a-select-option>
                  </a-select>
                </div>
                <div class="buildname" style="margin: 20px 12px">
                  <span>车位业主：</span>
                  <a-input
                    placeholder="请输入车位业主"
                    style="width: 26vw"
                    v-model="FromEditCarSpace.user_name"
                  />
                </div>
                <div class="buildname" style="margin: 20px 12px">
                  <span>联系电话：</span>
                  <a-input
                    placeholder="请输入联系电话"
                    style="width: 26vw"
                    v-model="FromEditCarSpace.user_phone"
                  />
                </div>
                <div class="remake" style="margin: 20px 40px; display: flex">
                  <span>备注：</span>
                  <a-textarea
                    placeholder="请输入备注"
                    :rows="2"
                    style="width: 26vw"
                    v-model="FromEditCarSpace.remark"
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
                    @click="EditCarSpaceShowUp"
                    >取消</a-button
                  >
                  <a-button type="primary" @click="EditCarSpaceShow"
                    >确定</a-button
                  >
                </div>
              </a-modal>
              <a-divider type="vertical" />
              <!-- 删除 -->
              <a
                href="javascript:;"
                @click="DeleteCarSpace(record.id, record.version)"
              >
                <a-icon type="delete" theme="twoTone" />删除</a
              >
            </template>
          </a-table>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "GardenStall",
  data() {
    return {
      CarinputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      dataSource: [], //列表数据源
      columns: [
        {
          title: "所属主体",
          dataIndex: "space_region",
          width: "15%",
          scopedSlots: { customRender: "district_name" },
        },
        {
          title: "车位名称",
          dataIndex: "space_name",
          width: "10%",
          align: "center",
        },
        {
          title: "车牌号码",
          dataIndex: "car_num",
          align: "center",
          width: "10%",
        },
        {
          title: "类别",
          dataIndex: "space_type_name",
          align: "center",
          width: "10%",
        },
        {
          title: "状态",
          dataIndex: "space_status_name",
          align: "center",
          width: "10%",
        },
        {
          title: "车位业主",
          dataIndex: "user_name",
          align: "center",
          width: "10%",
        },
        {
          title: "联系电话",
          dataIndex: "user_phone",
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
          title: "操作",
          dataIndex: "operation",
          align: "center",
          scopedSlots: { customRender: "operation" },
          width: "10%",
        },
      ], //table表格表头数据
      visibleCarSpace: false, // 新增 弹框默认状态
      visibleCarSpaceEdit: false, // 编辑 弹框默认状态
      FromCarSpace: {}, // 新增 数据源
      FromEditCarSpace: {}, // 编辑 数据源
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
      }, // 页面数据分页
    };
  },
  created() {
    this.carSpaceList(); //获取车位列表
  },
  watch: {
    // 监听搜索框是否有内容自动搜索
    CarinputVal(newValue) {
      if (newValue) {
        this.CarSearch(true);
      } else {
        this.CarSearch(false);
      }
    },
  },
  methods: {
    //获取车位列表
    carSpaceList() {
      axios.get("/api/ics/carSpace?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    //todo 新增//
    // 新增modal弹框显示
    AddCarSpace() {
      this.visibleCarSpace = true;
      this.FromCarSpace = { space_region: "" };
    },
    // 新增确认
    AddCarSpaceShow() {
      axios.post("/api/ics/carSpace", this.FromCarSpace).then((res) => {
        if (res.message === "success") {
          this.$message.success("新增车位成功");
          this.carSpaceList();
        }
      });
    },
    // 取消新增
    AddCarSpaceCancel() {
      this.visibleCarSpace = false;
    },
    //todo 删除//
    // 删除车位
    DeleteCarSpace(id, version) {
      axios
        .delete("/api/ics/carSpace", {
          params: {
            id: id,
            version: version,
          },
        })
        .then((res) => {
          if (res.status_code === 200) {
          }
          // 成功重新更新列表
          this.$message.success("删除车位成功");
          this.carSpaceList();
        });
    },
    //todo 编辑//
    // 编辑modal弹框显示
    EditCarSpace(record) {
      this.visibleCarSpaceEdit = true;
      this.FromEditCarSpace = { ...record };
      this.FromEditCarSpace.space_type = record.space_type.toString();
      this.FromEditCarSpace.space_status = record.space_status.toString();
    },
    // 编辑确认
    EditCarSpaceShow() {
      axios.patch("/api/ics/carSpace", this.FromEditCarSpace).then(() => {
        this.visibleCarSpaceEdit = false;
        this.$message.success("编辑车位成功");
        this.carSpaceList(this.FromEditCarSpace.id ? this.page : 1);
      });
    },
    // 取消编辑
    EditCarSpaceShowUp() {
      this.visibleCarSpaceEdit = false;
    },
    //todo 搜索
    // 搜索
    CarSearch(bool) {
      // this.currentPage = 1;
      if (bool) {
        let paramName = this.CarinputVal;
        axios
          .get("/api/ics/carSpace", { params: { space_name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.carSpaceList(); // 更新表
      }
    },
  },
  computed: {
    // 页面数据是否全选控制
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
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
    display: flex;
  }
  .bottom {
    display: flex;
    div {
      margin: 0px;
    }
    .buildname {
      display: flex;
      margin: 20px;
    }
  }
}
</style>
