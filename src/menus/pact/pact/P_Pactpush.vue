<template>
  <div class="wrap">
    <div style="width: 90%; margin: 20px auto">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="content">
        <div class="supplier" style="display: flex; margin: 30px 20vw">
          <span style="white-space: nowrap">合同名称：</span>
          <a-input placeholder="请输入意向名称" style="width: 33vw" />
        </div>
        <div class="supplier" style="display: flex; margin: 30px 19.3vw">
          <span style="white-space: nowrap">租金合同号：</span>
          <a-input placeholder="请输入意向名称" style="width: 33vw" />
        </div>
        <div class="supplier" style="display: flex; margin: 30px 19.3vw">
          <span style="white-space: nowrap">物管合同号：</span>
          <a-input placeholder="请输入意向名称" style="width: 33vw" />
        </div>
        <div class="brief" style="display: flex; margin: 30px 19.6vw">
          <p style="white-space: nowrap">备注(可选)：</p>
          <a-textarea placeholder="请输入备注" :rows="4" style="width: 40vw" />
        </div>
        <a-divider orientation="left"> 乙方 </a-divider>
        <div class="site" style="display: flex; margin: 30px 19.6vw">
          <span>租赁方：</span>
          <div>
            <a-radio-group v-model="value" @change="onChange">
              <a-radio :value="1">公司租赁</a-radio>
              <a-radio :value="2">个人租赁</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div class="supplier" style="display: flex; margin: 30px 20vw">
          <span style="white-space: nowrap">客户名称：</span>
          <a-input placeholder="请输入客户名称" style="width: 60vw" />
        </div>
        <div class="supplier" style="display: flex; margin: 30px 20vw">
          <span style="white-space: nowrap">所属行业：</span>
          <a-input placeholder="请输入所属行业" style="width: 60vw" />
        </div>
        <div class="supplier" style="display: flex; margin: 30px 18.6vw">
          <span style="white-space: nowrap">企业信用代码：</span>
          <a-input placeholder="请输入企业信用代码" style="width: 60vw" />
        </div>
        <div class="supplier" style="display: flex; margin: 30px 20vw">
          <span style="white-space: nowrap">个人邮箱：</span>
          <a-input placeholder="请输入个人邮箱" style="width: 60vw" />
        </div>
        <div class="supplier" style="display: flex; margin: 30px 21.5vw">
          <span style="white-space: nowrap">法人：</span>
          <a-input placeholder="请输入法人" style="width: 60vw" />
        </div>
        <div class="supplier" style="display: flex; margin: 30px 20vw">
          <span style="white-space: nowrap">联系电话：</span>
          <a-input placeholder="请输入联系电话" style="width: 60vw" />
        </div>
        <div class="supplier" style="display: flex; margin: 30px 20vw">
          <span style="white-space: nowrap">通讯地址：</span>
          <a-input placeholder="请输入通讯地址" style="width: 60vw" />
        </div>
        <div class="supplier" style="display: flex; margin: 30px 20vw">
          <span style="white-space: nowrap">渠道名称：</span>
          <a-input placeholder="请输入渠道名称" style="width: 60vw" />
        </div>
        <a-divider orientation="left"> 选择租赁场地 </a-divider>
        <div>
          <a-button type="primary" @click="btn_select"> +选择房间 </a-button>
          <a-modal v-model="visible" title="选择房间" width="55%">
            <div class="wrapA">
              <div class="search">
                <div class="top">
                  <div class="left">
                    <a-input
                      placeholder="请输入房间名称"
                      addonBefore="房间名称"
                      style="margin-right: 40px"
                    />
                    <a-input
                      placeholder="请输入所属楼宇名称"
                      addonBefore="所属楼宇"
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
                    :row-selection="rowSelection"
                    bordered
                    :columns="columnsa"
                    :data-source="dataSourcea"
                  >
                    <a slot="" slot-scope="text">{{ text }}</a>
                  </a-table>
                </div>
              </div>
            </div>
            <div
              class="btnant"
              style="
                padding: 10px 16px;
                text-align: right;
                background: transparent;
                border-top: 1px solid #e8e8e8;
                border-radius: 0 0 4px 4px;
              "
            >
              <a-button style="margin-right: 20px" @click="btn_up"
                >取消</a-button
              >
              <a-button type="primary" @click="btn_down">确定</a-button>
            </div>
          </a-modal>
          <a-table
            bordered
            :row-selection="rowSelection"
            :columns="columns"
            :data-source="dataSource"
            style="margin-top: 20px"
          >
            <a slot="name" slot-scope="text">{{ text }}</a>
          </a-table>
        </div>
      </div>
      <div class="steps-action">
        <a-button
          ><router-link to="/home/Ppact">返回</router-link></a-button
        >
        <a-button type="primary" style="margin-left: 20px">
          <router-link to="/home/Ppactpusht">下一步</router-link>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "My_P_Pactpush",
  data() {
    return {
      value: 1,
      current: 0,
      dataSource: [
        {
          belong: "111",
          roomname: "紫薇广场",
          belongbuild: "A栋",
          area: "五楼",
          collect: "200",
        },
        {
          belong: "222",
          roomname: "紫薇广场",
          belongbuild: "A栋",
          area: "五楼",
          collect: "200",
        },
        {
          belong: "333",
          roomname: "紫薇广场",
          belongbuild: "A栋",
          area: "五楼",
          collect: "200",
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
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "收租面积(平方米)",
          dataIndex: "collect",
          scopedSlots: { customRender: "collect" },
        },
      ],
      steps: [
        {
          title: "填写基础信息",
        },
        {
          title: "填写费项信息",
        },
        {
          title: "完成",
        },
      ],
      visible: false,
      dataSourcea: [
        {
          belong: "111",
          roomname: "紫薇广场",
          belongbuild: "A栋",
          area: "五楼",
          collect: "200",
          rent: "元/天",
          pay: "200",
        },
        {
          belong: "222",
          roomname: "紫薇广场",
          belongbuild: "A栋",
          area: "五楼",
          collect: "200",
          rent: "元/㎡/月",
          pay: "200",
        },
        {
          belong: "333",
          roomname: "紫薇广场",
          belongbuild: "A栋",
          area: "五楼",
          collect: "200",
          rent: "元/天",
          pay: "200",
        },
      ],
      columnsa: [
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
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "收租面积(平方米)",
          dataIndex: "collect",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "租金类型",
          dataIndex: "rent",
          scopedSlots: { customRender: "rent" },
        },
        {
          title: "租金(元)",
          dataIndex: "pay",
          scopedSlots: { customRender: "pay" },
        },
      ],
    };
  },
  methods: {
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    btn_select() {
      this.visible = true;
    },
    btn_up() {
      this.visible = false;
    },
    btn_down() {
      this.visible = false;
    },
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: (record) => ({
          props: {
            disabled: record.name === "Disabled User",
            name: record.name,
          },
        }),
      };
    },
  },
};
</script>

<style lang="less" scoped>
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
.wrap {
  background-color: #fff;
  border-radius: 15px;
  width: 85vw;
  .content {
    width: 100%;
    span {
      line-height: 28px;
    }
  }
  .steps-action {
    margin: 0 33vw;
  }
}
</style>
