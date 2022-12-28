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
          style="margin-top: 20px; border-radius: 20px; width: 84.5vw"
        >
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :pagination="paginationOpt"
              :rowKey="(record, id) => id"
              :scroll="{ x: '140%' }"
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
          <a-select-option value="1"> 审核通过 </a-select-option>
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
  name: "EnterPack",
  data() {
    return {
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      dataSource: [], //页面数据源
      columns: [
        {
          title: "入园企业名称",
          width: 200,
          fixed: "left",
          dataIndex: "name",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "原办公地址",
          width: 200,
          align: "center",
          dataIndex: "type_name",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "是否注册",
          dataIndex: "is_register_name",
          width: 100,
          align: "center",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "法人代表",
          width: 100,
          align: "center",
          dataIndex: "oper_name",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "注册资本",
          dataIndex: "regist_capi",
          width: 100,
          align: "center",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "公司类型",
          dataIndex: "econ_kind",
          width: 150,
          align: "center",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "姓名",
          width: 100,
          align: "center",
          dataIndex: "user_name",
          scopedSlots: { customRender: "equally" },
        },
        {
          title: "职务",
          width: 100,
          align: "center",
          dataIndex: "position",
          scopedSlots: { customRender: "lease" },
        },
        {
          title: "联系电话",
          dataIndex: "phone",
          width: 150,
          align: "center",
          scopedSlots: { customRender: "rent" },
        },
        {
          title: "是否合法合规",
          dataIndex: "is_compliance_name",
          width: 150,
          align: "center",
          scopedSlots: { customRender: "renttype" },
        },
        {
          title: "期望入驻日期",
          width: 200,
          align: "center",
          sorter: (a, b) => {
            let aTimeString = a.time;
            let bTimeString = b.time;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "start_date",
          scopedSlots: { customRender: "time" },
        },
        {
          title: "期望入驻结束日期",
          width: 200,
          align: "center",
          sorter: (a, b) => {
            let aTimeString = a.timeover;
            let bTimeString = b.timeover;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "end_date",
          scopedSlots: { customRender: "timeover" },
        },
        {
          title: "申请办公面积",
          dataIndex: "apply_area",
          width: 200,
          align: "center",
          scopedSlots: { customRender: "power" },
        },
        {
          title: "审批状态",
          dataIndex: "status_name",
          width: 200,
          align: "center",
          scopedSlots: { customRender: "putaway" },
        },
        {
          title: "操作",
          width: 240,
          dataIndex: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" },
        },
      ], //table表格表头数据
      visible: false, //审批modal弹框默认状态
      approvalFrom: {}, //存放审批数据
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
          this.packList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationOpt.defaultCurrent = current;
          this.paginationOpt.defaultPageSize = size;
          this.packList();
        },
      }, //列表分页
      approvalData: {},
    };
  },
  created() {
    this.packList(); // 入园申请列表
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
    // 入园申请列表
    packList() {
      axios.get("/api/ics/applyPark?per_page=9999").then((res) => {
        this.dataSource = res.data.data;
      });
    },
    // todo 审批
    // 审批modal弹框
    audit(data) {
      this.visible = true;
      this.approvalData = data;
      this.approvalFrom = { status_remark: "" };
    },
    // 确认审批
    auditSure() {
      axios
        .patch("/api/ics/applyPark/status?status=1", this.approvalFrom, {
          params: {
            id: this.approvalData.id,
            version: this.approvalData.version,
          },
        })
        .then((res) => {
          if (res.message === "success") {
            this.$message.success("审批通过");
            this.packList();
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
        .patch("/api/ics/applyPark/status?status=0", this.approvalFrom, {
          params: { id: id, version: version },
        })
        .then((res) => {
          if (res.message === "success") {
            this.$message.success("取消审批成功");
            this.packList();
          }
        });
    },
    // todo 删除
    // 删除
    DeleteAudit(id, version) {
      axios
        .delete("/api/ics/applyPark", {
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
          this.packList();
        });
    },
    // todo 搜索
    // 搜索
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/ics/applyPark", { params: { name: paramName } })
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
    // 页面数据全选控制
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
  margin-right: 10px;
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
}
</style>
