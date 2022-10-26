<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <!-- 搜索功能 -->
          <a-input-search placeholder="快速搜索" style="width: 200px" />
        </div>
        <!-- 内容区域 -->
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :rowKey="(record, id) => id"
            >
              <a slot="roomname" slot-scope="text">{{ text }}</a>
              <template slot="action" slot-scope="">
                <a href="javascript:;"
                  ><a-icon type="schedule" theme="twoTone" />确认退租</a
                >
                <a-divider type="vertical" />
                <a href="javascript:;"
                  ><router-link to="/home/Pleasepush"
                    ><a-icon type="edit" theme="twoTone" />编辑</router-link
                  ></a
                >
                <a-divider type="vertical" />
                <a href="javascript:;"
                  ><a-icon type="delete" theme="twoTone" />删除</a
                >
                <a-divider type="vertical" />
                <a href="javascript:;"
                  ><router-link to="/home/Pleasedetail"
                    ><a-icon
                      type="file-text"
                      theme="twoTone"
                    />详情</router-link
                  ></a
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
  name: "My_P_Lease",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "下单时间",
          align: "center",
          defaultSortOrder: "(a,b)",
          sorter: (a, b) => {
            let aTimeString = a.belong;
            let bTimeString = b.belong;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "refund_date",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "退租单号",
          dataIndex: "sn",
        },
        {
          title: "客户名称",
          dataIndex: "contract.customer_name",
        },
        {
          title: "应收金额（元）",
          dataIndex: "receive_fee",
        },
        {
          title: "应退金额（元）",
          dataIndex: "refund_fee",
        },
        {
          title: "合计金额（元）",
          dataIndex: "total_fee",
        },
        {
          title: "退租状态",
          dataIndex: "status_name",
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
  methods: {
    leaseList() {
      axios.get("/api/ics/contractRefund").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
  },
  created() {
    this.leaseList();
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
}
</style>