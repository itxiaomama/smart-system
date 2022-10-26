<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="top">
          <div class="left">
            <a-input-search
              placeholder="快速搜索"
              style="width: 200px; margin-right: 40px"
            />
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
  name: "FirmOrder",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "申请人",
          dataIndex: "supplier_name",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "手机",
          dataIndex: "member_mobile",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "供应商",
          dataIndex: "member_name",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "服务名称",
          dataIndex: "service_name",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "下单时间",
          dataIndex: "created_at",
          scopedSlots: { customRender: "area" },
        },
      ],
    };
  },
  methods: {
    orderList() {
      axios.get("/api/ics/serviceOrder?per_page=9999").then((res) => {
        this.dataSource = res.data.data;
      });
    },
  },
  created() {
    this.orderList();
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
  }
}
</style>
