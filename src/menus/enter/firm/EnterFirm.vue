<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <a-input
                placeholder="请输入入驻企业名称"
                addonBefore="入驻企业名称"
                style="margin-right: 40px"
              />
              <a-input placeholder="请输入联系电话" addonBefore="联系电话" />
            </div>
            <div class="right">
              <div class="test">
                <a-button type="primary"> 查询 </a-button>
                <a-button style="margin-left: 20px">重置</a-button>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="bottom">
              <div class="new">
                <a-button
                  type="primary"
                  @click="showModal({}, 1, '新增企业')"
                  style="margin-bottom: 20px"
                >
                  +新增
                </a-button>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :data-source="dataSource"
              :columns="columns"
              :row-selection="rowSelection"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <span slot="collect">
                <a-tag color="pink"> 待审批 </a-tag>
              </span>
              <template slot="operation" slot-scope="text, record">
                <a href="javascript:;" @click="showModal(record, 2, '编辑企业')"
                  ><a-icon type="edit" theme="twoTone" />编辑</a
                >
                <a-modal
                  v-model="visibleA"
                  title="添加企业"
                  style="width: 150px"
                >
                  <div class="buildname" style="margin: 20px 40px">
                    <span>企业名称：</span>
                    <a-input
                      placeholder="请输入名称"
                      style="width: 16.4vw"
                      v-model="dataSource.belongs"
                      @change="onChange"
                    />
                  </div>
                  <div class="buildname" style="margin: 20px 12px">
                    <span>所需办公面积：</span>
                    <a-input
                      placeholder="请输入面积"
                      style="width: 16.4vw"
                      v-model="dataSource.roomnames"
                      @change="onChange"
                    />
                  </div>
                  <div class="buildname" style="margin: 20px 12px">
                    <span>申请入驻日期：</span>
                    <a-input
                      placeholder="请输入日期"
                      style="width: 16.4vw"
                      v-model="dataSource.belongbuilds"
                      @change="onChange"
                    />
                  </div>
                  <div class="buildname" style="margin: 20px 40px">
                    <span>联系电话：</span>
                    <a-input
                      placeholder="请输入电话"
                      style="width: 16.4vw"
                      v-model="dataSource.floors"
                      @change="onChange"
                    />
                  </div>
                  <div
                    class="inputK"
                    style="margin: 20px 25px 10px 68px; display: flex"
                  >
                    <span>姓名：</span>
                    <a-input
                      placeholder="请输入姓名"
                      style="width: 16.4vw"
                      v-model="dataSource.areas"
                      @change="onChange"
                    />
                  </div>
                  <div class="btnant">
                    <a-button @click="btn_cancel" style="margin-right: 20px"
                      >取消</a-button
                    >
                    <a-button type="primary" @click="btn_sure(record.key)"
                      >确定</a-button
                    >
                  </div>
                </a-modal>
                <a-divider type="vertical" />
                <a-popconfirm
                  v-if="dataSource.length"
                  title="Sure to delete?"
                  @confirm="() => onDelete(record.key)"
                >
                  <a href="javascript:;">
                    <a-icon type="delete" theme="twoTone" />删除</a
                  >
                </a-popconfirm>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>

    <a-modal v-model="visible" :title="title" style="width: 150px">
      <div class="buildname" style="margin: 20px 40px">
        <span>企业名称：</span>
        <a-input
          placeholder="请输入名称"
          style="width: 16.4vw"
          v-model="form.belong"
          @change="onChange"
        />
      </div>
      <div class="buildname" style="margin: 20px 12px">
        <span>所需办公面积：</span>
        <a-input
          placeholder="请输入面积"
          style="width: 16.4vw"
          v-model="form.roomname"
          @change="onChange"
        />
      </div>
      <div class="buildname" style="margin: 20px 12px">
        <span>申请入驻日期：</span>
        <a-input
          placeholder="请输入日期"
          style="width: 16.4vw"
          v-model="form.belongbuild"
          @change="onChange"
        />
      </div>
      <div class="buildname" style="margin: 20px 40px">
        <span>联系电话：</span>
        <a-input
          placeholder="请输入电话"
          style="width: 16.4vw"
          v-model="form.floor"
          @change="onChange"
        />
      </div>
      <div class="inputK" style="margin: 20px 25px 10px 68px; display: flex">
        <span>姓名：</span>
        <a-input
          placeholder="请输入姓名"
          style="width: 16.4vw"
          v-model="form.area"
          @change="onChange"
        />
      </div>
      <template slot="footer">
        <div class="btnant">
          <a-button @click="showCancel" style="margin-right: 20px"
            >取消</a-button
          >
          <a-button type="primary" @click="showAdd">确定</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "EnterFirm",
  data() {
    return {
      title: "",
      type: null,
      dataSource: [
        {
          key: "0",
          belong: "巨安科技",
          roomname: "500㎡",
          belongbuild: "2022-07-01",
          floor: "15788889999",
          area: "张学友",
        },
        {
          key: "1",
          belong: "巨科技",
          roomname: "500㎡",
          belongbuild: "2022-06-01",
          floor: "15788889999",
          area: "张学友",
        },
        {
          key: "2",
          belong: "科技",
          roomname: "500㎡",
          belongbuild: "2022-08-01",
          floor: "15788889999",
          area: "张学友",
        },
      ],
      columns: [
        {
          title: "入驻企业名称",
          dataIndex: "belong",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "所需办公面积",
          dataIndex: "roomname",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "申请入住日期",
          dataIndex: "belongbuild",
          align: "center",
          sorter: (a, b) => {
            let aTimeString = a.belongbuild;
            let bTimeString = b.belongbuild;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "联系电话",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "姓名",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "审批状态",
          dataIndex: "collect",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ],
      visible: false,
      visibleA: false,
      form: {},
    };
  },
  methods: {
    showModal(form, type, title) {
      this.form = { ...form };
      console.log(this.form);
      this.type = type;
      this.title = title;
      this.visible = true;
    },
    showCancel() {
      this.visible = false;
    },
    onChange() {
      console.log();
    },
    showAdd() {
      if (
        this.dataSource.belong.length <= 0 ||
        this.dataSource.roomname.length <= 0 ||
        this.dataSource.belongbuild.length <= 0 ||
        this.dataSource.floor.length <= 0 ||
        this.dataSource.area.length <= 0
      ) {
        alert("请填写楼宇信息");
        return;
      }
      this.dataSource.key =
        Math.max(
          ...this.dataSource.map(function (v) {
            return v.key;
          })
        ) + 1;
      this.dataSource.push({
        belong: this.dataSource.belong,
        roomname: this.dataSource.roomname,
        belongbuild: this.dataSource.belongbuild,
        floor: this.dataSource.floor,
        area: this.dataSource.area,
      });
      (this.dataSource.belong = ""),
        (this.dataSource.roomname = ""),
        (this.dataSource.belongbuild = ""),
        (this.dataSource.floor = ""),
        (this.dataSource.area = ""),
        (this.visible = false);
    },
    onDelete(key) {
      console.log(key);
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(
        (dataSource) => dataSource.key !== key
      );
    },
    btn_edit(key) {
      console.log(key);
      this.visibleA = true;
      const updateData = this.dataSource[key];
      this.dataSource.belongs = JSON.parse(JSON.stringify(updateData.belong));
      this.dataSource.roomnames = JSON.parse(
        JSON.stringify(updateData.roomname)
      );
      this.dataSource.belongbuilds = JSON.parse(
        JSON.stringify(updateData.belongbuild)
      );
      this.dataSource.floors = JSON.parse(JSON.stringify(updateData.floor));
      this.dataSource.areas = JSON.parse(JSON.stringify(updateData.area));
    },
    btn_sure(key) {
      console.log(key);
      this.visibleA = false;
      const upData = this.dataSource[key];
      upData.belong = this.dataSource.belongs;
      upData.roomname = this.dataSource.roomnames;
      upData.belongbuild = this.dataSource.belongbuilds;
      upData.floor = this.dataSource.floors;
      upData.area = this.dataSource.areas;
    },
    btn_cancel() {
      this.visibleA = false;
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
            disabled: record.name === "Disabled User", // Column configuration not to be checked
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
