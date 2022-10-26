<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search" style="margin-bottom: 20px">
          <a-input-search
            placeholder="快速搜索"
            style="width: 200px; margin-right: 40px"
          />
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :rowKey="(record, id) => id"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <span slot="newtime" slot-scope="newtime">
                <a-tag
                  v-for="tag in newtime"
                  :key="tag"
                  :color="tag.length < 3 ? 'cyan' : 'orange'"
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
              <span slot="action">
                <a
                  ><router-link to="/home/Jallotdetail">
                    <a-icon type="file-text" theme="twoTone" />详情</router-link
                  ></a
                >
                <a-divider type="vertical" />
                <a @click="showModal">
                  <a-icon type="tag" theme="twoTone" />分派</a
                >
                <a-modal v-model="visible" title="分派">
                  <div
                    class="buildname"
                    style="display: flex; margin-bottom: 40px"
                  >
                    <span style="white-space: nowrap; line-height: 32px"
                      >对接人员：</span
                    >
                    <a-input></a-input>
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
                    <a-button @click="handleOk" style="margin-right: 20px"
                      >取消</a-button
                    >
                    <a-button type="primary" @click="showAdd">确定</a-button>
                  </div>
                </a-modal>
              </span>
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
  name: "JoinAllot",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "客户名称",
          dataIndex: "belong",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "主题",
          dataIndex: "roomname",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "联系电话",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "线索来源",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "创建时间",
          align: "center",
          defaultSortOrder: "(a,b)",
          sorter: (a, b) => {
            let aTimeString = a.area;
            let bTimeString = b.area;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "对接人",
          dataIndex: "collect",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "创建人",
          dataIndex: "newtime",
          scopedSlots: { customRender: "newtime" },
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
    //获取线索分派列表
    AllotList() {
      axios.get("/api/ics/clue/assignment?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    showAdd() {
      this.visible = false;
    },
  },
  created() {
    this.AllotList();
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
