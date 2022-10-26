<template>
  <div
    style="
      background-color: #fff;
      width: 85vw;
      border-radius: 10px;
      margin-bottom: 30px;
    "
  >
    <div style="margin: 0 20px">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="file" theme="twoTone" />
            退租合同
          </span>
          <div style="margin-left: 10vw">
            <a-descriptions title="基本信息" :column="{ xxl: 4 }">
              <a-descriptions-item label="退租日期"
                >2022-06-25</a-descriptions-item
              >
              <a-descriptions-item label="合同编号">
                HT1810000000
              </a-descriptions-item>
              <a-descriptions-item label="管理编号"
                >GL46554987</a-descriptions-item
              >
              <a-descriptions-item label="退租单号">
                TZ2022152642
              </a-descriptions-item>
              <a-descriptions-item label="合同名称">
                双方合同
              </a-descriptions-item>
              <a-descriptions-item label="租户名称">
                哈哈哥
              </a-descriptions-item>
              <a-descriptions-item label="退组状态">
                已完成
              </a-descriptions-item>
            </a-descriptions>
          </div>
          <a-divider />
          <div class="content">
            <a-descriptions title="退租场地" style="margin-left: 10vw" />
            <a-table
              style="width: 63vw; margin: 2vh auto"
              :data-source="dataSource"
              :columns="columns"
            >
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="">
                <a-tag color="cyan"></a-tag>
              </span>
            </a-table>
          </div>
          <a-divider />
          <div style="margin-left: 10vw">
            <a-descriptions title="费用明细" :column="{ xxl: 4 }">
              <a-descriptions-item label="应收部分">350 </a-descriptions-item>
              <a-descriptions-item label="应退部分"> 150 </a-descriptions-item>
              <a-descriptions-item label="总计金额">200</a-descriptions-item>
            </a-descriptions>
          </div>
          <a-divider />
          <div style="margin-left: 10vw">
            <a-descriptions title="其他信息" :column="{ xxl: 4 }">
              <a-descriptions-item label="退组原因"
                >正常到期</a-descriptions-item
              >
              <a-descriptions-item label="备注信息">
                到期跑路了
              </a-descriptions-item>
            </a-descriptions>
          </div>
          <a-divider />
          <a-descriptions title="存档图片" style="margin-left: 10vw" />
        </a-tab-pane>
      </a-tabs>
      <div style="margin-bottom: 20px,padding-bottom: 30px;">
        <a-button style="margin-left: 40vw; margin-bottom: 20px" @click="btnup"
          >返回</a-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "My_P_Leasedetail",
  data() {
    return {
      columns: [
        {
          title: "所属园区",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "所属楼宇",
          dataIndex: "build",
          scopedSlots: { customRender: "build" },
        },
        {
          title: "所属楼层",
          dataIndex: "address",
          scopedSlots: { customRender: "address" },
        },
        {
          title: "房间名称",
          dataIndex: "time",
          scopedSlots: { customRender: "time" },
        },
        {
          title: "收租面积(平方米)",
          dataIndex: "news",
          scopedSlots: { customRender: "news" },
        },
      ],
      dataSource: [
        {
          key: "0",
          name: "智慧园区",
          build: "西边楼",
          address: "4层",
          time: "111",
          news: "111",
        },
      ],
    };
  },
  methods: {
    btnup() {
      this.$router.push("/home/Please");
    },
  },
};
</script>

<style lang="less" scoped></style>
