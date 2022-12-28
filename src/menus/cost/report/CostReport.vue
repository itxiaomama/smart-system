<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <!-- 搜索功能 -->
              <a-input-search
                placeholder="快速搜索"
                style="width: 200px; margin-right: 20px"
              />
            </div>
            <div class="right">
              <a-button @click="exportit">导出</a-button>
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
              rowKey="id"
              :pagination="pagination"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
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
  name: "CostReport",
  data() {
    return {
      // 页面数据源
      dataSource: [],
      columns: [
        {
          title: "客户名称",
          dataIndex: "customer_name",
          ellipsis: true,
          scopedSlots: { customRender: "" },
        },
        {
          title: "应收租金（元）",
          dataIndex: "rent_total",
        },
        {
          title: "已收租金（元）",
          dataIndex: "receive_rent",
        },
        {
          title: "应收物业费（元）",
          dataIndex: "management_total",
        },
        {
          title: "已收物业费（元）",
          dataIndex: "receive_management",
        },
        {
          title: "能耗费（元）",
          dataIndex: "energy_total",
        },
        {
          title: "已收能耗费（元）",
          dataIndex: "receive_energy",
        },
        {
          title: "已收其他费用（元）",
          dataIndex: "receive_other",
        },
        {
          title: "其他费用（元）",
          dataIndex: "other_total",
        },
        {
          title: "退费（元）",
          dataIndex: "pay_refund",
        },
        {
          title: "合计应收（元）",
          dataIndex: "total",
        },
        {
          title: "合计未收（元）",
          dataIndex: "not_receive_total",
        },
        {
          title: "合计已收（元）",
          dataIndex: "receive_total",
        },
      ],
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
          this.reportList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.reportList();
        },
      }, // 页面显示数据分页内容
    };
  },
  created() {
    // 获取账单报表列表
    this.reportList();
  },
  methods: {
    // 获取账单报表列表
    reportList() {
      axios.get("/api/ics/billReport?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    exportit(){
      // /api/ics/billReport/export
      axios.post('/api/ics/billReport/export').then((res) =>{
        console.log(res)
        //  this.downloadCallback(res, '藏品交易记录.xls');
        const blob = new Blob([res],{
          type: "application/vnd.ms-excel"
        });
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        const filename ='测试名称';
        link.fileName = filename ;
        document.body.appendChild(link);
        link.click();
        // this.$message.success('导出成功');
        document.body.removeChild(link);
        // window.URL.revokeObjectURL(href)
      })
    },
    //  //生成下载文件
    //   downloadCallback(res, fileName){
    //     const content = res.data;
    //     const blob = new Blob([content]);
    //     if ("download" in document.createElement("a")) {
    //       // 非IE下载
    //       const elink = document.createElement("a");
    //       elink.download = fileName;
    //       elink.style.display = "none";
    //       elink.href = URL.createObjectURL(blob);
    //       document.body.appendChild(elink);
    //       elink.click();
    //       URL.revokeObjectURL(elink.href); // 释放URL 对象
    //       document.body.removeChild(elink);
    //     } else {
    //       // IE10+下载
    //       navigator.msSaveBlob(blob, fileName);
    //     }
    //   },
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
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
    display: flex;
  }
}
</style>
