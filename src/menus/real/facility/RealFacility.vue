<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <div style="margin: 0 40px 16px 0">
                <a-input
                  placeholder="请输入设备名称"
                  addonBefore="设备名称"
                  style="width: 15vw"
                >
                </a-input>
              </div>
            </div>
            <div class="right">
              <div class="test">
                <a-button type="primary"> 查询 </a-button>
                <a-button style="margin-left: 20px">重置</a-button>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="bottom" style="margin-bottom: 20px">
              <div class="new">
                <a-button type="primary" @click="addit({}, 1, '新增设备')"
                  >+新增</a-button
                >
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
            >
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="area" slot-scope="area">
                <a-tag
                  v-for="tag in area"
                  :key="tag"
                  :color="tag === '使用中' ? 'cyan' : 'volcano'"
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
              <span slot="action">
                <a
                  ><a-icon
                    type="edit"
                    theme="twoTone"
                    @click="addit({}, 2, '编辑设备')"
                  />编辑</a
                >
                <a-divider type="vertical" />
                <a><a-icon type="delete" theme="twoTone" />删除</a>
              </span>
            </a-table>
          </div>
        </div>
      </div>
    </div>

    <a-modal v-model="visible" :title="title" width="35%">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="name" label="设备名称：" prop="name">
          <a-input
            v-model="form.name"
            @blur="
              () => {
                $refs.name.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="设备类别：" prop="region">
          <a-select v-model="form.region" placeholder="请选择设备类别">
            <a-select-option value="shanghai"> Zone one </a-select-option>
            <a-select-option value="beijing"> Zone two </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item ref="name" label="所属园区：" prop="name">
          <a-input
            v-model="form.name"
            @blur="
              () => {
                $refs.name.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item ref="name" label="品牌：" prop="name">
          <a-input
            v-model="form.name"
            @blur="
              () => {
                $refs.name.onFieldBlur();
              }
            "
          />
        </a-form-model-item>

        <a-form-model-item ref="name" label="安装位置：" prop="name">
          <a-input
            v-model="form.name"
            @blur="
              () => {
                $refs.name.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="报修起止日期：">
          <a-range-picker @change="onChange" />
        </a-form-model-item>

        <a-form-model-item label="状态：" prop="region">
          <a-select v-model="form.region" placeholder="请选择设备状态">
            <a-select-option value="shanghai"> 维修中 </a-select-option>
            <a-select-option value="beijing"> 使用中 </a-select-option>
            <a-select-option value="hangzhou"> 已停用 </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
      <template slot="footer">
        <a-button type="primary" @click="onSubmit"> 确定 </a-button>
        <a-button style="margin-left: 10px" @click="resetForm"> 取消 </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: "RealFacility",
  data() {
    return {
      visible: false,
      title: "",
      type: null,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        region: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        date1: [
          { required: true, message: "Please pick a date", trigger: "change" },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change",
          },
        ],
        resource: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur",
          },
        ],
      },
      dataSource: [
        {
          key: "0",
          roomname: "投影仪",
          belongbuild: "政策服务",
          floor: "琪炜智创园",
          area: ["使用中"],
          brand: "惠普",
          location: "西边楼四楼会议室",
          sleuthtime: "2022.07.01-2032.07.01",
        },
        {
          key: "1",
          roomname: "计算机",
          belongbuild: "政策服务",
          floor: "琪炜智创园",
          area: ["使用中"],
          brand: "中兴",
          location: "西边楼四楼会议室",
          sleuthtime: "2022.07.01-2032.07.01",
        },
        {
          key: "2",
          roomname: "门禁",
          belongbuild: "政策服务",
          floor: "琪炜智创园",
          area: ["维修中"],
          brand: "中兴",
          location: "西边楼四楼会议室",
          sleuthtime: "2022.07.01-2032.07.01",
        },
      ],
      columns: [
        {
          title: "设备名称",
          dataIndex: "roomname",
          width: 200,
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "设备类别",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "所属园区",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "品牌",
          dataIndex: "brand",
          scopedSlots: { customRender: "brand" },
        },
        {
          title: "安装位置",
          dataIndex: "location",
          scopedSlots: { customRender: "location" },
        },
        {
          title: "保修起止日期",
          dataIndex: "sleuthtime",
          scopedSlots: { customRender: "sleuthtime" },
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
      form: {},
    };
  },
  methods: {
    addit(form, type, title) {
      this.type = type;
      this.title = title;
      this.form = { ...form };
      this.visible = true;
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    onChange(val) {
      console.log(val);
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
.wrap {
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
  .bottom {
    display: flex;
    margin-top: 2px;
  }
}
</style>
