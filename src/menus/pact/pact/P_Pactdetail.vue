<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div>
          <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="合同信息">
              <div style="margin: 0 20px">
                <div style="margin-left: 10vw">
                  <a-descriptions title="主要信息" :column="{ xxl: 4 }">
                    <a-descriptions-item label="租金合同号"
                      >2022-06-25</a-descriptions-item
                    >
                    <a-descriptions-item label="物管合同号">
                      HT1810000000
                    </a-descriptions-item>
                    <a-descriptions-item label="管理编号"
                      >GL46554987</a-descriptions-item
                    >
                    <a-descriptions-item label="合同名称">
                      TZ2022152642
                    </a-descriptions-item>
                    <a-descriptions-item label="合同状态">
                      双方合同
                    </a-descriptions-item>
                    <a-descriptions-item label="租赁期限">
                      哈哈哥
                    </a-descriptions-item>
                    <a-descriptions-item label="签订日期">
                      已完成
                    </a-descriptions-item>
                    <a-descriptions-item label="合同类型"
                      >GL46554987</a-descriptions-item
                    >
                    <a-descriptions-item label="经办人">
                      双方合同
                    </a-descriptions-item>
                    <a-descriptions-item label="合同版本">
                      哈哈哥
                    </a-descriptions-item>
                    <a-descriptions-item label="备注">
                      已完成
                    </a-descriptions-item>
                  </a-descriptions>
                </div>
                <a-divider />
                <div style="margin-left: 10vw">
                  <a-descriptions title="乙方" :column="{ sm: 2 }">
                    <a-descriptions-item label="客户名称"
                      >2022-06-25</a-descriptions-item
                    >
                    <br />
                    <a-descriptions-item label="租赁方">
                      HT1810000000
                    </a-descriptions-item>
                    <a-descriptions-item label="所属行业"
                      >GL46554987</a-descriptions-item
                    >
                    <a-descriptions-item label="纳税人识别号">
                      TZ2022152642
                    </a-descriptions-item>
                    <a-descriptions-item label="公司邮箱">
                      双方合同
                    </a-descriptions-item>
                    <a-descriptions-item label="法人">
                      哈哈哥
                    </a-descriptions-item>
                    <a-descriptions-item label="联系电话">
                      已完成
                    </a-descriptions-item>
                    <a-descriptions-item label="渠道名称">
                      已完成
                    </a-descriptions-item>
                  </a-descriptions>
                </div>
                <a-divider />
                <div class="content">
                  <a-descriptions title="租赁场地" style="margin-left: 10vw" />
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
                  <a-descriptions title="固定租金" :column="{ xxl: 3 }">
                    <a-descriptions-item label="租金单价"
                      >350元/平方/月
                    </a-descriptions-item>
                    <a-descriptions-item label="日租金">
                      150
                    </a-descriptions-item>
                    <a-descriptions-item label="月租金"
                      >200</a-descriptions-item
                    >
                    <a-descriptions-item label="管理费单价"
                      >350元/平方/月
                    </a-descriptions-item>
                    <a-descriptions-item label="日管理费">
                      150
                    </a-descriptions-item>
                    <a-descriptions-item label="月管理费"
                      >200</a-descriptions-item
                    >
                    <a-descriptions-item label="能耗费单价"
                      >350元/平方/月
                    </a-descriptions-item>
                    <a-descriptions-item label="日能耗费">
                      150
                    </a-descriptions-item>
                    <a-descriptions-item label="月能耗费"
                      >200</a-descriptions-item
                    >
                  </a-descriptions>
                </div>
                <div style="margin-left: 10vw">
                  <a-descriptions title="押金" :column="{ xxl: 4 }">
                    <a-descriptions-item label="金额"
                      >400元</a-descriptions-item
                    >
                  </a-descriptions>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="账单信息">
              <span>付款计划</span>
              <a-table
                :columns="columnsA"
                :data-source="dataSourceA"
                style="margin-top: 20px"
              >
                <a slot="name" slot-scope="text">{{ text }}</a>
                <template slot="action" slot-scope="text, record">
                  <a href="javascript:;" @click="btn_edit(record.key)">编辑</a>
                </template>
              </a-table>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div style="margin: 20px 36vw">
          <a-button style="margin-left: 20px" @click="btn_out">返回</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "My_P_Pactdetail",
  data() {
    return {
      dataSource: [
        {
          key: "0",
          belong: "巨安科技",
          roomname: "意向合同",
          belongbuild: "YX100200300",
          nami: "老王",
          payfor: "20000",
        },
        {
          key: "1",
          belong: "学院科技",
          roomname: "意向合同",
          belongbuild: "YX100200300",
          nami: "老王",
          payfor: "20000",
        },
        {
          key: "2",
          belong: "娃哈哈科技",
          roomname: "意向合同",
          belongbuild: "YX100200300",
          nami: "老王",
          payfor: "20000",
        },
      ],
      columns: [
        {
          title: "房间名称",
          dataIndex: "belong",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "所属园区",
          dataIndex: "roomname",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "所属楼宇",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "所属楼层",
          dataIndex: "nami",
          scopedSlots: { customRender: "nami" },
        },
        {
          title: "收租面积（平方米）",
          dataIndex: "payfor",
          scopedSlots: { customRender: "payfor" },
        },
      ],
      dataSourceA: [
        {
          key: 0,
          belong: "2022-08-01",
          roomname: "2025-08-08",
          belongbuild: "2022-09-01",
          area: "500",
          collect: "200",
        },
        {
          key: 1,
          belong: "2021-08-01",
          roomname: "2024-08-08",
          belongbuild: "2022-02-01",
          area: "500",
          collect: "200",
        },
        {
          key: 2,
          belong: "2022-02-01",
          roomname: "2029-08-08",
          belongbuild: "2022-12-01",
          area: "500",
          collect: "200",
        },
        {
          key: 3,
          belong: "2022-08-01",
          roomname: "2025-08-08",
          belongbuild: "2022-09-01",
          area: "500",
          collect: "200",
        },
        {
          key: 4,
          belong: "2021-08-01",
          roomname: "2024-08-08",
          belongbuild: "2022-02-01",
          area: "500",
          collect: "200",
        },
        {
          key: 5,
          belong: "2022-02-01",
          roomname: "2029-08-08",
          belongbuild: "2022-12-01",
          area: "500",
          collect: "200",
        },
      ],
      columnsA: [
        {
          title: "账单开始时间",
          dataIndex: "belong",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "账单结束时间",
          dataIndex: "roomname",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "账单收款日",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "租金",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "物业管理费",
          dataIndex: "collect",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    btn_out() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  width: 85vw;
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
}
</style>
