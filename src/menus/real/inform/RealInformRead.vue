<template>
  <div class="wrap">
    <div class="wrapA">
      <div class="back" @click="btn_send">
        <a-icon type="left-circle" style="font-size: 28px" />
      </div>
      <div class="content" style="margin-top: 30px">
        <div>
          <a-table
            :row-selection="rowSelection"
            :data-source="dataSource"
            :columns="columns"
          >
            <template slot="operation" slot-scope="text, record">
              <a-popconfirm
                v-if="dataSource.length"
                title="确定删除?"
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
</template>

<script>
let yy = new Date().getFullYear();
let mm = new Date().getMonth() + 1;
let dd = new Date().getDate();
let hh = new Date().getHours();
let mf =
  new Date().getMinutes() < 10
    ? "0" + new Date().getMinutes()
    : new Date().getMinutes();
let ss =
  new Date().getSeconds() < 10
    ? "0" + new Date().getSeconds()
    : new Date().getSeconds();
let Mydate = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
export default {
  name: "RealInformRead",
  data() {
    return {
      key: "",
      name: "",
      build: "",
      address: "",
      time: "",
      dataSource: [
        {
          key: 0,
          name: "",
          build: "",
          names: "张三",
          address: "13869455665",
          house: "琪炜智创园西边楼",
          time: Mydate,
        },
        {
          key: 1,
          name: "",
          build: "",
          names: "张四",
          address: "13869455665",
          house: "琪炜智创园西边楼",
          time: Mydate,
        },
        {
          key: "2",
          name: "",
          build: "",
          names: "张五",
          address: "13869455665",
          house: "琪炜智创园西边楼",
          time: Mydate,
        },
      ],
      columns: [
        {
          title: "头像",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "昵称",
          dataIndex: "build",
          scopedSlots: { customRender: "build" },
        },
        {
          title: "姓名",
          dataIndex: "names",
          scopedSlots: { customRender: "names" },
        },
        {
          title: "手机号码",
          dataIndex: "address",
          scopedSlots: { customRender: "address" },
        },
        {
          title: "房产",
          dataIndex: "house",
          scopedSlots: { customRender: "house" },
        },
        {
          title: "阅读时间",
          align: "center",
          sorter: (a, b) => {
            let aTimeString = a.time;
            let bTimeString = b.time;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "time",
          scopedSlots: { customRender: "time" },
        },
        {
          title: "操作",
          key: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ],
      visible: false,
      visibleA: false,
      selected: -1,
      selecteddataSource: {},
    };
  },
  methods: {
    onDelete(key) {
      console.log(key);
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(
        (dataSource) => dataSource.key !== key
      );
    },
    btn_send() {
      this.$router.push("/property/inform");
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
    position: relative;
    .back {
      position: absolute;
      right: -15px;
      top: -5px;
      width: 50px;
      height: 50px;
    }
  }
}
</style>
