<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <!-- 搜索 -->
          <a-input-search
            placeholder="快速搜索"
            style="width: 200px; margin-right: 40px"
            @click="ShowEdit(true)"
            v-model="inputVal"
          />
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :pagination="paginationOpt"
              :rowKey="(record, id) => id"
            >
              <template slot="area" slot-scope="text, record">
                {{ map[record.status] }}
              </template>
              <a slot="company_name" slot-scope="text">{{ text }}</a>
              <a slot="repair_sn" slot-scope="text">{{ text }}</a>
              <span slot="action">
                <!-- 指派 -->
                <a href="javascript:;" @click="show_assign">
                  <a-icon type="tag" theme="twoTone" />指派</a
                >
                <!-- 指派modal弹框 -->
                <a-modal v-model="visibleSent" title="指派维修员" width="35%">
                  <div class="buildname" style="margin: 40px 0 0 14px">
                    <span>维修员：</span
                    ><a-select
                      default-value="请选择"
                      style="width: 26vw"
                      option-label-prop="label"
                    >
                      <a-select-option
                        v-for="item in repairOptions"
                        :key="item.id"
                        :label="item.user_name"
                        :value="item.id"
                        v-model="formRepair.user_name"
                      >
                        <span role="img" :aria-label="item.user_name">
                          {{ item.user_name }}
                        </span>
                      </a-select-option>
                    </a-select>
                  </div>
                  <div class="buildname" style="margin-top: 40px">
                    <span>维修时间：</span>
                    <a-date-picker
                      v-model="formRepair.worker_start_time"
                      :disabled-date="disabledStartDate"
                      show-time
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="Start"
                      @openChange="handleStartOpenChange"
                    />
                    <a-date-picker
                      v-model="formRepair.worker_end_time"
                      :disabled-date="disabledEndDate"
                      show-time
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="End"
                      :open="endOpen"
                      @openChange="handleEndOpenChange"
                    />
                  </div>
                  <div class="remake" style="margin: 40px 0 20px 0">
                    <span>维修材料：</span>
                    <a-input
                      placeholder="维修材料"
                      style="width: 26vw"
                      v-model="formRepair.material"
                    />
                  </div>
                  <div
                    class="btnant"
                    style="
                      padding: 20px 16px;
                      text-align: right;
                      background: transparent;
                      border-top: 1px solid #e8e8e8;
                      border-radius: 0 0 4px 4px;
                    "
                  >
                    <a-button style="margin-right: 20px" @click="btn_showup"
                      >取消</a-button
                    >
                    <a-button type="primary" @click="btn_showsure"
                      >确定</a-button
                    >
                  </div>
                </a-modal>
                <a-divider type="vertical" />
                <!-- 详情 -->
                <a href="javascript:;" @click="show_detail">
                  <a-icon type="file-text" theme="twoTone" />详情</a
                >
                <!-- 完成 -->
                <a-divider type="vertical" />
                <a><a-icon type="box-plot" theme="twoTone" />完成</a>
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
  name: "RealMatter",
  data() {
    return {
      map: {
        1: "待分配",
        2: "待处理",
        3: "待评价",
        4: "已评价",
        5: "已完成",
      },
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      dataSource: [], //列表数据源
      columns: [
        {
          title: "维修单号",
          dataIndex: "repair_sn",
          scopedSlots: { customRender: "repair_sn" },
        },
        {
          title: "报修园区",
          dataIndex: "company_address",
        },
        {
          title: "报修人",
          dataIndex: "contact",
        },
        {
          title: "报修人手机",
          dataIndex: "mobile",
        },
        {
          title: "维修工人",
          dataIndex: "worker_contact",
        },
        {
          title: "状态",
          dataIndex: "",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "报修时间",
          dataIndex: "created_at",
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ], //table表格表头内容
      visibleSent: false, //指派modal弹框默认状态
      repairOptions: [], // 存放维修员 数据
      paginationOpt: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationOpt.defaultCurrent = 1;
          this.paginationOpt.defaultPageSize = pageSize;
          this.matterlist(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationOpt.defaultCurrent = current;
          this.paginationOpt.defaultPageSize = size;
          this.matterlist();
        },
      }, //列表分页
      formRepair: {}, //存放维修指派数据
      endOpen: false,
    };
  },
  created() {
    this.matterlist(); //渲染列表数据
  },
  mounted() {
    this.GetRepair(); //指派维修员选项
  },
  watch: {
    // 自动搜索
    inputVal(newValue) {
      if (newValue) {
        this.ShowEdit(true);
      } else {
        this.ShowEdit(false);
      }
    },
    startValue(val) {
      console.log("startValue", val);
    },
    endValue(val) {
      console.log("endValue", val);
    },
  },
  methods: {
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    //获取列表数据;
    matterlist() {
      axios.get("/api/prop/repair?per_page=99999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    // 指派modal弹框显示
    show_assign() {
      this.visibleSent = true;
    },
    // 确认指派
    btn_showsure(id, version) {
      axios
        .patch("/api/prop/repair/operate", this.formRepair, {
          params: { id: id, version: version },
        })
        .then((res) => {
          if (res.message === "success") {
            console.log(res);
            this.visibleSent = false;
          }
        });
    },
    // 取消指派
    btn_showup() {
      this.visibleSent = false;
    },
    // 维修单详情
    show_detail() {
      this.$router.push("/home/Rmatterdetail");
    },
    // 维修员下拉选择内容
    GetRepair() {
      axios.get("/api/prop/repair/staff?status=1").then((res) => {
        if (res.message === "success") {
          this.repairOptions = res.data;
        }
      });
    },
    // 搜索
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/prop/repair", { params: { mobile: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.matterlist(); // 更新表
      }
    },
  },
  computed: {
    // 控制table表格全选按钮
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
    height: 88vh;
    overflow-y: auto;
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
  .bottom {
    display: flex;
    margin-top: 10px;
  }
}
</style>
