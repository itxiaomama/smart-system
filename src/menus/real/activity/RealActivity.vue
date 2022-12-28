<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="top">
          <div class="left">
            <a-input-search
              placeholder="快速搜索"
              style="width: 200px; margin-right: 20px"
            />
          </div>
          <div class="bottom" style="margin-bottom: 20px">
            <a-button type="primary" @click="toactive({},1)">
              新增
            </a-button>
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
              <span slot="sign_begin" slot-scope="text,record">
                {{ record.sign_begin }}-{{record.sign_end}}
                </span>
                <span slot="act_begin" slot-scope="text,record">
                {{ record.act_begin }}-{{record.act_end}}
                </span>
              <span slot="area" slot-scope="area">
                <a-tag
                  v-for="tag in area"
                  :key="tag"
                  :color="
                    tag === '报名中'
                      ? 'green'
                      : tag === '已满额'
                      ? 'blue'
                      : tag === '活动结束'
                      ? 'red'
                      : 1
                  "
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
              <span slot="is_marketable" slot-scope="text,record"
                ><a-switch
                  @change="changeit(record)"
                  checked-children="是"
                  un-checked-children="否"
                  :checked="record.is_marketable == 0? false: true"
              /></span>
              <template slot="action" slot-scope="text,record">
                <a @click="toactive(record,2)">
                  <a-icon type="edit" theme="twoTone" />编辑</a>
                <a-divider type="vertical" />
                <a href="javascript:;" @click="delit(record)"
                  ><a-icon type="delete" theme="twoTone" />删除</a
                >
              </template>
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
  name: "RealActivity",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "活动名称",
          dataIndex: "name",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "报名时间",
          align: "left",
          dataIndex: "sign_begin",
          scopedSlots: { customRender: "sign_begin" },
        },
        {
          title: "活动时间",
          align: "left",
          dataIndex: "act_begin",
          scopedSlots: { customRender: "act_begin" },
        },
        {
          title: "报名人数",
          dataIndex: "full_num",
          scopedSlots: { customRender: "full_num" },
        },
        {
          title: "状态",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "是否上架",
          dataIndex: "is_marketable",
          scopedSlots: { customRender: "is_marketable" },
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
    changeit(val){
      console.log(val)
      let content = '';
      if(val.is_marketable == 0){
        content = '确定要上架吗？';
      }else{
        content = '确定要下架吗？';
      }
      let that = this;
      this.$confirm({
        title: "提示",
        content: content,
        onOk() {
          axios
        .patch("/api/prop/activity/status", {
            id: val.id,
            version: val.version,
            is_marketable:val.is_marketable == 0?1:0
        })
        .then((res) => {
          that.activityList();
        });
        },
        onCancel() {},
      });
    },
    delit(val){
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
        .delete("/api/prop/activity", {
          params:{
            id: val.id,
            version: val.version,
          }
          
        })
        .then((res) => {
          that.activityList();
        });
        },
        onCancel() {},
      });
    },
    activityList() {
      axios.get("/api/prop/activity").then((res) => {
        this.dataSource = res.data.data;
      });
    },
    toactive(form,type){
      this.$router.push({
        path:'/property/activitydetail',
        query:{
          form:JSON.stringify(form),
          type:type
        }
      })
    }
  },
  created() {
    this.activityList();
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
