<template>
  <div class="wrap">
    <div style="width: 90%; margin: 20px auto">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="content">
        <div class="supplier" style="display: flex; margin: 20px 20vw">
          <span style="white-space: nowrap">签订日期：</span>
          <a-date-picker
            placeholder="请选择日期"
            @change="onChange"
            style="width: 19.4vw"
          />
        </div>
        <div class="supplier" style="display: flex; margin: 30px 18.5vw">
          <span style="white-space: nowrap">意向需求日期：</span>
          <a-date-picker placeholder="请选择日期" @change="onChange" />
          <p style="margin-top: 4px">~</p>
          <a-date-picker placeholder="请选择日期" @change="onChange" />
        </div>
        <div class="supplier" style="display: flex; margin: 26px 20.7vw">
          <span style="white-space: nowrap">意向金：</span>
          <a-input placeholder="请输入意向金" style="width: 13.8vw" />
          <span style="white-space: nowrap">元</span>
        </div>
        <div class="supplier" style="display: flex; margin: 30px 20vw">
          <span style="white-space: nowrap">租赁期限：</span>
          <a-date-picker placeholder="请选择日期" @change="onChange" />
          <p>~</p>
          <a-date-picker placeholder="请选择日期" @change="onChange" />
        </div>
        <div class="supplier" style="display: flex; margin: 30px 20vw">
          <span style="white-space: nowrap">快捷选择：</span>
          <a-radio-group default-value="a" button-style="solid">
            <a-radio-button value="a"> 1年 </a-radio-button>
            <a-radio-button value="b"> 2年 </a-radio-button>
            <a-radio-button value="c"> 3年 </a-radio-button>
            <a-radio-button value="d"> 4年 </a-radio-button>
            <a-radio-button value="e"> 5年 </a-radio-button>
          </a-radio-group>
        </div>
        <a-divider orientation="left">固定租金</a-divider>
        <a-descriptions
          bordered
          layout="vertical"
          style="width: 50vw; margin: 10px auto"
        >
          <a-descriptions-item
            label="计算方式：按单元面积   租赁面积：200"
            style="margin-left: 220px"
          >
            <div class="details">
              <div style="display: flex">
                <div
                  class="left"
                  style="flex: 1; display: flex; padding: 14px 100px"
                >
                  <span>租金单价：</span>
                  <a-input-number
                    :min="1"
                    :max="100000"
                    placeholder=""
                    @change="onChange"
                    style="width: 100px"
                  />
                  <a-select
                    label-in-value
                    :default-value="{ key: 'lu' }"
                    style="width: 100px; border: 0; outline: none"
                    @change="handleChange"
                  >
                    <a-select-option value="jack"> 元/㎡/天 </a-select-option>
                    <a-select-option value="lucy"> 元/㎡/月 </a-select-option>
                    <a-select-option value="luc"> 元/天 </a-select-option>
                    <a-select-option value="lu"> 元/月 </a-select-option>
                  </a-select>
                </div>
                <div class="right" style="display: flex; padding: 14px 100px">
                  <span>日租金：</span>
                  <a-input style="width: 100px"></a-input>
                  <span>元/天</span>
                </div>
              </div>
              <div style="display: flex">
                <div
                  class="left"
                  style="flex: 1; display: flex; padding: 14px 73px"
                >
                  <span>月租金计算方式：</span>
                  <div style="line-height: 28px">
                    <a-radio-group v-model="value" @change="onChange">
                      <a-radio :value="1">按固定租金</a-radio>
                      <a-radio :value="2">按实际天数</a-radio>
                    </a-radio-group>
                  </div>
                </div>
                <div class="right" style="display: flex; padding: 14px 100px">
                  <span>月租金：</span>
                  <a-input style="width: 100px"></a-input>
                  <span>元/天</span>
                </div>
              </div>
              <div style="display: flex">
                <div
                  class="left"
                  style="
                    flex: 1;
                    display: flex;
                    padding: 14px 100px;
                    margin-left: -14px;
                  "
                >
                  <span style="white-space: nowrap">管理费单价：</span>
                  <a-input-number
                    :min="1"
                    :max="100000"
                    placeholder=""
                    @change="onChange"
                    style="width: 100px"
                  />
                  <a-select
                    label-in-value
                    :default-value="{ key: 'lu' }"
                    style="width: 100px; border: 0; outline: none"
                    @change="handleChange"
                  >
                    <a-select-option value="jack"> 元/㎡/天 </a-select-option>
                    <a-select-option value="lucy"> 元/㎡/月 </a-select-option>
                    <a-select-option value="luc"> 元/天 </a-select-option>
                    <a-select-option value="lu"> 元/月 </a-select-option>
                  </a-select>
                </div>
                <div
                  class="left"
                  style="
                    flex: 1;
                    display: flex;
                    padding: 14px 100px;
                    margin-left: -14px;
                  "
                >
                  <span style="white-space: nowrap">能耗费单价：</span>
                  <a-input-number
                    :min="1"
                    :max="100000"
                    placeholder=""
                    @change="onChange"
                    style="width: 100px"
                  />
                  <a-select
                    label-in-value
                    :default-value="{ key: 'lu' }"
                    style="width: 100px; border: 0; outline: none"
                    @change="handleChange"
                  >
                    <a-select-option value="jack"> 元/㎡/天 </a-select-option>
                    <a-select-option value="lucy"> 元/㎡/月 </a-select-option>
                    <a-select-option value="luc"> 元/天 </a-select-option>
                    <a-select-option value="lu"> 元/月 </a-select-option>
                  </a-select>
                </div>
              </div>
              <div style="display: flex">
                <div
                  class="left"
                  style="display: flex; flex: 1; padding: 14px 100px"
                >
                  <span>日管理费：</span>
                  <a-input style="width: 100px"></a-input>
                  <span>元/天</span>
                </div>
                <div class="right" style="display: flex; padding: 14px 100px">
                  <span>月管理费：</span>
                  <a-input style="width: 100px"></a-input>
                  <span>元/天</span>
                </div>
              </div>
              <div style="display: flex">
                <div
                  class="left"
                  style="display: flex; flex: 1; padding: 14px 100px"
                >
                  <span>日能耗费：</span>
                  <a-input style="width: 100px"></a-input>
                  <span>元/天</span>
                </div>
                <div class="right" style="display: flex; padding: 14px 100px">
                  <span>月能耗费：</span>
                  <a-input style="width: 100px"></a-input>
                  <span>元/天</span>
                </div>
              </div>
              <div style="display: flex">
                <div
                  class="left"
                  style="
                    display: flex;
                    flex: 1;
                    padding: 14px 70px;
                    margin-left: 24px;
                  "
                >
                  <span>付款周期：</span>
                  <a-select
                    style="
                      width: 190px;
                      border: 0;
                      outline: none;
                      margin-left: 6px;
                    "
                  >
                    <a-select-option value="jack">月付</a-select-option>
                    <a-select-option value="lucy">季付</a-select-option>
                    <a-select-option value="luc">半年付</a-select-option>
                    <a-select-option value="lu">年付</a-select-option>
                  </a-select>
                </div>
                <div class="right" style="display: flex; padding: 14px 82px">
                  <span>押付方式：</span>
                  <span style="margin-right: 5px">押</span>
                  <a-input style="width: 80px"></a-input>
                  <span style="margin: 0 5px">月</span>
                  <a-input style="width: 80px"></a-input>
                  <span style="margin-left: 5px">元</span>
                </div>
              </div>
            </div>
          </a-descriptions-item>
        </a-descriptions>
        <a-table
          :columns="columns"
          :data-source="dataSource"
          style="margin-top: 20px"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <template slot="action" slot-scope="text, record">
            <a href="javascript:;" @click="btn_edit(record.key)">编辑</a>
          </template>
        </a-table>
        <a-modal v-model="visible" title="账单编辑" width="40%">
          <div class="buildname">
            <span>账单开始时间：</span>
            <a-date-picker
              placeholder="请选择日期"
              @change="onChange"
              v-model="dataSource.belong"
              style="width: 28vw"
            />
          </div>
          <div class="buildname" style="margin-top: 30px">
            <span>账单结束时间：</span>
            <a-date-picker
              placeholder="请选择日期"
              @change="onChange"
              v-model="dataSource.roomname"
              style="width: 28vw"
            />
          </div>
          <div class="buildname" style="margin: 30px 14px">
            <span>账单收款日：</span>
            <a-date-picker
              placeholder="请选择日期"
              @change="onChange"
              v-model="dataSource.belongbuild"
              style="width: 28vw"
            />
          </div>
          <div class="buildname" style="margin: 30px 58px">
            <span>租金：</span
            ><a-input
              placeholder="租金"
              style="width: 28vw"
              v-model="dataSource.area"
              @change="onChange"
            />
          </div>
          <div class="buildname" style="margin: 30px 14px">
            <span>物业管理费：</span
            ><a-input
              placeholder="物业管理费"
              style="width: 28vw"
              v-model="dataSource.collect"
              @change="onChange"
            />
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
            <a-button style="margin-right: 20px" @click="btn_showup"
              >取消</a-button
            >
            <a-button type="primary" @click="btn_showdown(record.key)"
              >确定</a-button
            >
          </div>
        </a-modal>
      </div>
      <div class="steps-action" style="display: flex; padding-bottom: 40px">
        <a-button
          ><router-link to="/home/Pintentionpush">返回</router-link></a-button
        >
        <a-button type="primary" style="margin-left: 20px">
          <router-link to="/home/Pintentionpushf">提交</router-link>
        </a-button>
        <a-button style="margin-left: 20px"
          ><router-link to="/home/Pintentionpush">上一步</router-link></a-button
        >
        <a-button style="margin-left: 20px">生成付款计划</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "My_P_Intentionpusht",
  data() {
    return {
      value: 1,
      current: 1,
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
      dataSource: [
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
      columns: [
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
      visible: false,
    };
  },
  methods: {
    btn_edit(key) {
      console.log(key);
      this.visible = true;
      const updateData = this.dataSource[key];
      this.dataSource.belong = JSON.parse(JSON.stringify(updateData.belong));
      this.dataSource.roomname = JSON.parse(
        JSON.stringify(updateData.roomname)
      );
      this.dataSource.belongbuild = JSON.parse(
        JSON.stringify(updateData.belongbuild)
      );
      this.dataSource.area = JSON.parse(JSON.stringify(updateData.area));
      this.dataSource.collect = JSON.parse(JSON.stringify(updateData.collect));
    },
    btn_showup() {
      this.visible = false;
    },

    btn_showdown(key) {
      console.log(key);
      this.visible = false;
      const upData = this.dataSource[key];
      upData.belong = this.dataSource.belong;
      upData.roomname = this.dataSource.roomname;
      upData.belongbuild = this.dataSource.addresss;
      upData.area = this.dataSource.area;
      upData.collect = this.dataSource.collect;
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
  },
};
</script>
<style lang="less" scoped>
.wrap {
  background-color: #fff;
  border-radius: 15px;
  width: 87.3vw;
  margin: 10px;
  height: 85vh;
  overflow-x: auto;
  .content {
    width: 100%;
    span {
      line-height: 28px;
    }
  }
  .steps-action {
    margin: 0 28vw;
  }
  .details {
    width: 50vw;
    height: 360px;

    margin: -16px -24px;
    .left,
    .right {
      width: 50%;
      height: 60px;
      border-bottom: 1px solid rgb(221, 220, 220);
    }
    .left {
      border-right: 1px solid rgb(221, 220, 220);
    }
  }
}
</style>
