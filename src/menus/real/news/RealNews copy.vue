<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <a-input-search
                placeholder="快速搜索"
                style="width: 200px; margin-right: 40px"
              />
            </div>
            <div class="bottom">
              <div class="bottom" style="margin-bottom: 20px">
                <a-button type="primary" @click="btn_add(1)">新增</a-button>
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
              rowKey="id"
            >
              <span slot="area" slot-scope="area"
                ><a-tag
                  v-for="tag in area"
                  :key="tag"
                  :color="tag === '显示' ? 'cyan' : '#A9A9A9		'"
                >
                  {{ tag.toUpperCase() }}</a-tag
                >
              </span>
              <span slot="action" slot-scope="">
                <a-icon type="api" theme="twoTone" /><a href="javascript:;"
                  >发送</a
                >
                <a-divider type="vertical" />
                <a-icon type="edit" theme="twoTone" /><a
                  href="javascript:;"
                  @click="btn_add(2)"
                  >编辑</a
                >
                <a-divider type="vertical" />
                <a-icon type="delete" theme="twoTone" />
                <a href="javascript:;">删除</a>
                <a-divider type="vertical" />
                <a-icon type="eye" theme="twoTone" />
                <a href="javascript:;" @click="btn_read">阅读记录</a>
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
  name: "RealNews",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "序号",
          dataIndex: "id",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "咨询名称",
          dataIndex: "name",
          width: 200,
          scopedSlots: { customRender: "name" },
        },
        {
          title: "咨询类别",
          dataIndex: "create_by",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "所属园区",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
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
    };
  },
  methods: {
    PolicyList() {
      axios.get("/api/prop/policy").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data;
        }
      });
    },
    btn_add(type) {
      this.$router.push({
        path: "/property/newsdetail",
        query: {
          type: type,
        },
      });
    },
    btn_read() {
      this.$router.push("/property/newsread");
    },
  },
  created() {
    this.PolicyList();
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
