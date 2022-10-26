<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <a-input
                placeholder="请输入投诉单号"
                addonBefore="投诉单号"
                style="margin-right: 40px"
              />
            </div>
            <div class="right">
              <div class="test">
                <a-button type="primary"> 查询 </a-button>
                <a-button style="margin-left: 20px">重置</a-button>
              </div>
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
            >
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="action">
                <a href="javascript:;"
                  ><a-icon type="tag" theme="twoTone" />指派</a
                >
                <a-divider type="vertical" />
                <a href="javascript:;" @click="show_detail"
                  ><a-icon type="file-text" theme="twoTone" />详情</a
                >
                <a-modal v-model="visible" title="指派维修员" width="35%">
                  <div class="buildname" style="margin-left: 14px">
                    <span>维修员：</span
                    ><a-input
                      placeholder="所属园区"
                      style="width: 26vw"
                    ></a-input>
                  </div>
                  <div class="buildname" style="margin-top: 40px">
                    <span>维修时间：</span
                    ><a-range-picker
                      style="width: 26vw"
                      placeholder="Select month"
                    />
                  </div>
                  <div class="remake" style="margin: 40px 0 20px 0">
                    <span>维修材料：</span>
                    <a-input placeholder="维修材料" style="width: 26vw" />
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
                    <a-button style="margin-right: 20px">取消</a-button>
                    <a-button type="primary">确定</a-button>
                  </div>
                </a-modal>
                <a-divider type="vertical" />
                <a href="javascript:;"
                  ><a-icon type="box-plot" theme="twoTone" />完成</a
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
  name: "RealComplaint",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "园区",
          dataIndex: "belong",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "投诉单号",
          dataIndex: "complaint_sn",
          scopedSlots: { customRender: "complaint_sn" },
        },
        {
          title: "创建时间",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "指派人员",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "状态",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
      visible: false,
    };
  },
  created() {
    this.complaintList(); // 页面列表数据
  },
  methods: {
    // 页面列表数据
    complaintList() {
      axios.get("/api/prop/complaint?per_page=9999").then((res) => {
        this.dataSource = res.data.data;
      });
    },
    // 投诉详情
    show_detail() {
      this.$router.push("/home/Rcomplaintdetail");
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
