<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <!-- 搜索 -->
          <a-input-search
            placeholder="请输入企业名称"
            style="width: 200px; margin-right: 40px"
            @click="ShowEdit(true)"
            v-model="inputVal"
          />
          </div>
          <div
            class="content"
            style="margin-top: 20px; border-radius: 20px;"
          >
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :pagination="paginationOpt"
              :rowKey="(record, id) => id"
            >
              <!-- <a slot="belong" slot-scope="text">{{ text }}</a> -->
              <span
                slot="action"
                slot-scope="text, record"
                style="display: flex"
              >
                <div class="new">
                  <!-- 审批 -->
                  <a type="primary" @click="audit(record)">
                    <a-icon type="check-circle" theme="twoTone" />审批
                  </a>
                </div>
                <a-divider type="vertical" />
                <!-- 取消审批 -->
                <a
                  href="javascript:;"
                  @click="cancelAudit(record.id, record.version)"
                  ><a-icon type="minus-circle" theme="twoTone" />取消审批</a
                >
                <a-divider type="vertical" />
                <!-- 删除 -->
                <a
                  href="javascript:;"
                  @click="DeleteAudit(record.id, record.version)"
                  ><a-icon type="delete" theme="twoTone" />删除</a
                >
              </span>
            </a-table>
          </div>
      </div>
    </div>

    <!-- 审批modal弹框 -->
    <a-modal v-model="visible" title="审批">
      <div class="buildname" style="margin: 20px 9px">
        <span>审批结果：</span>
        <a-select
          default-value=""
          style="width: 16.3vw"
          v-model="approvalFrom.status_remark"
        >
          <a-select-option value="1"> 审批通过 </a-select-option>
        </a-select>
      </div>
      <div class="remake" style="margin: 20px 9px; display: flex; width: 20vw">
        <span style="white-space: nowrap">审批意见：</span>
        <a-textarea placeholder="......" :rows="5" />
      </div>
      <template slot="footer">
        <div class="btnant">
          <a-button style="margin-right: 20px" @click="auditUp">取消</a-button>
          <a-button type="primary" @click="auditSure">确定 </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EnterEnter",
  data() {
    return {
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      dataSource: [], //页面数据源
      columns: [
        {
          title: "入驻企业名称",
          dataIndex: "name",
          align: "center",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "所需办公面积",
          dataIndex: "need_area",
          align: "center",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "申请入住日期",
          dataIndex: "apply_time",
          align: "center",
          sorter: (a, b) => {
            let aTimeString = a.belongbuild;
            let bTimeString = b.belongbuild;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "联系电话",
          dataIndex: "phone",
          align: "center",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "姓名",
          dataIndex: "oper_name",
          align: "center",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "审批状态",
          dataIndex: "status_name",
          align: "center",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "操作",
          dataIndex: "action",
          width: "20%",
          scopedSlots: { customRender: "action" },
        },
      ], //table表格表头数据
      visible: false, //审批modal弹框默认状态
      approvalFrom: {},
      paginationOpt: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationOpt.defaultCurrent = current;
          this.paginationOpt.defaultPageSize = pageSize;
          this.enterList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationOpt.defaultCurrent = current;
          this.paginationOpt.defaultPageSize = size;
          this.enterList();
        },
      }, // 页面显示数据分页内容
      approvalData: {},
    };
  },
  created() {
    this.enterList(); // 入驻申请列表
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
    // 入驻申请列表
    enterList() {
      axios.get("/api/ics/applySettle?per_page=9999").then((res) => {
        this.dataSource = res.data.data;
      });
    },
    // todo 审批
    // 审批modal弹框
    audit(data) {
      this.approvalData = data;
      this.visible = true;
      this.approvalFrom = { status_remark: "" };
    },
    // 确认审批
    auditSure() {
      axios
        .patch("/api/ics/applySettle/status?status=1", this.approvalFrom, {
          params: {
            id: this.approvalData.id,
            version: this.approvalData.version,
          },
        })
        .then((res) => {
          if (res.message === "success") {
            this.$message.success("审批成功");
            this.enterList();
            this.visible = false;
          }
        });
    },
    // 审批取消
    auditUp() {
      this.visible = false;
    },
    // todo 取消审批
    //  取消审批
    cancelAudit(id, version) {
      axios
        .patch("/api/ics/applySettle/status?status=0", this.approvalFrom, {
          params: { id: id, version: version },
        })
        .then((res) => {
          if (res.message === "success") {
            this.$message.success("取消审批成功");
            this.enterList();
          }
        });
    },
    // todo 删除
    // 删除
    DeleteAudit(id, version) {
      axios
        .delete("/api/ics/applySettle", {
          params: {
            id: id,
            version: version,
          },
        })
        .then(() => {
          this.$message.success("删除成功");
          // 成功重新更新列表
          this.enterList();
        });
    },
    // todo 搜索
    // 搜索
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/ics/applySettle", { params: { name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.packList(); // 更新表
      }
    },
  },
  computed: {
    // 页面数据全选
    rowSelection() {
      return {
        onChange: () => {},
      };
    },
  },
};
</script>

<style lang="less" scoped>
.btnant {
  padding: 10px 16px;
  text-align: right;
  background: transparent;
  border-radius: 0 0 4px 4px;
}
.wrap {
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
  .bottom {
    display: flex;
    margin-top: 10px;
  }
}
</style>
