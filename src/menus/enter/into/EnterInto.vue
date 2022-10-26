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
        <div class="content" style="margin-top: 20px; width: 85.3vw">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :pagination="paginationOpt"
              :rowKey="(record, id) => id"
              :scroll="{ x: '130%' }"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
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
                    <div
                      class="remake"
                      style="margin: 20px 9px; display: flex; width: 20vw"
                    >
                      <span style="white-space: nowrap">审批意见：</span>
                      <a-textarea placeholder="......" :rows="5" />
                    </div>
                    <div class="btnant">
                      <a-button style="margin-right: 20px" @click="auditUp"
                        >取消</a-button
                      >
                      <a-button type="primary" @click="auditSure"
                        >确定
                      </a-button>
                    </div>
                  </a-modal>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EnterInto",
  data() {
    return {
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      dataSource: [], //页面数据源
      columns: [
        {
          title: "拟成立/迁入企业名称",
          width: 200,
          fixed: "left",
          dataIndex: "company_name",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "申请业务",
          dataIndex: "type_name",
          width: 200,
          align: "center",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "申请人",
          width: 100,
          align: "center",
          dataIndex: "apply_name",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "承租物业地址",
          dataIndex: "address",
          width: 300,
          align: "center",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "承租物业面积",
          dataIndex: "area",
          width: 150,
          align: "center",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "姓名",
          width: 100,
          align: "center",
          dataIndex: "create_by",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "联系电话",
          dataIndex: "phone",
          width: 150,
          align: "center",
          scopedSlots: { customRender: "equally" },
        },
        {
          title: "物业合同编号",
          dataIndex: "contract_no",
          width: 150,
          align: "center",
          scopedSlots: { customRender: "lease" },
        },
        {
          title: "租赁开始时间",
          dataIndex: "rent_start_time",
          width: 200,
          align: "center",
          sorter: (a, b) => {
            let aTimeString = a.rent;
            let bTimeString = b.rent;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          scopedSlots: { customRender: "rent" },
        },
        {
          title: "租赁结束时间",
          dataIndex: "rent_end_time",
          width: 200,
          align: "center",
          sorter: (a, b) => {
            let aTimeString = a.renttype;
            let bTimeString = b.renttype;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          scopedSlots: { customRender: "renttype" },
        },
        {
          title: "与申请人关系",
          dataIndex: "relation_name",
          width: 150,
          align: "center",
          scopedSlots: { customRender: "time" },
        },
        {
          title: "审批状态",
          dataIndex: "status_name",
          width: 100,
          align: "center",
          scopedSlots: { customRender: "putaway" },
        },
        {
          title: "操作",
          width: 300,
          dataIndex: "action",
          fixed: "right",
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
          this.intoList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationOpt.defaultCurrent = current;
          this.paginationOpt.defaultPageSize = size;
          this.intoList();
        },
      }, // 页面显示数据分页内容
      approvalData: {},
    };
  },
  created() {
    this.intoList(); // 迁入申请列表
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
    // 迁入申请列表
    intoList() {
      axios.get("/api/ics/applyMoveIn").then((res) => {
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
        .patch("/api/ics/applyMoveIn/status?status=1", this.approvalFrom, {
          params: {
            id: this.approvalData.id,
            version: this.approvalData.version,
          },
        })
        .then((res) => {
          if (res.message === "success") {
            this.$message.success("审批成功");
            this.intoList();
            this.visible = false;
          }
        });
    },
    // 审批取消
    auditUp() {
      this.visible = false;
    },
    // todo 取消审批
    // 取消审批
    cancelAudit(id, version) {
      axios
        .patch("/api/ics/applyMoveIn/status?status=0", this.approvalFrom, {
          params: { id: id, version: version },
        })
        .then((res) => {
          if (res.message === "success") {
            this.$message.success("取消审批成功");
            this.intoList();
          }
        });
    },
    // todo 删除
    // 删除
    DeleteAudit(id, version) {
      axios
        .delete("/api/ics/applyMoveIn", {
          params: {
            id: id,
            version: version,
          },
        })
        .then((res) => {
          if (res.message === "success") {
          }
          this.$message.success("删除成功");
          // 成功重新更新列表
          this.intoList();
        });
    },
    // todo 搜索
    // 搜索
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/ics/applyMoveIn", { params: { company_name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.intoList(); // 更新表
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
  border-top: 1px solid #e8e8e8;
  border-radius: 0 0 4px 4px;
}
.wrap {
  width: 87.3vw;
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .bottom {
    display: flex;
    margin-top: 10px;
  }
}
</style>
