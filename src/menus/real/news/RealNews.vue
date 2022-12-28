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
                <a-button type="primary" @click="btn_add({},1,'新增政策')">新增</a-button>
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
              :pagination="pagination"
            >
              <span slot="is_marketable" slot-scope="text, record"
                ><a-switch
                  @change="changeit(record)"
                  checked-children="是"
                  un-checked-children="否"
                  :checked="record.is_marketable == 0 ? false : true"
              /></span>
              <span slot="action" slot-scope="text, record">
                <a-icon type="edit" theme="twoTone" /><a
                  @click="btn_add(record,2,'编辑政策')"
                  >编辑</a
                >
                <a-divider type="vertical" />
                <a-icon type="delete" theme="twoTone" />
                <a @click="delit(record)" href="javascript:;">删除</a>
              </span>
            </a-table>
          </div>
        </div>
      </div>
    </div>
    <a-modal v-model="visible" :title="title" width="40%" @cancel="resetForm" @ok="submit">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
      <a-form-model-item ref="name" label="政策名称" prop="name">
      <a-input
        v-model="form.name"
      />
    </a-form-model-item>

    <a-form-model-item  label="详情">
      <wangeditorVue v-model="content"  @change="change" />
    </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import wangeditorVue from "@/components/common/wangeditor.vue";
export default {
  name: "RealNews",
  components:{
    wangeditorVue
  },
  data() {
    return {
       labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      content:'',
      form: {
        name: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入政策名称', trigger: 'blur' },
        ],
      },
      visible: false,
      title: "新增咨讯",
      type:null,
      dataSource: [],
      columns: [
        {
          title: "政策名称",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "上架时间",
          dataIndex: "marketable_time",
          scopedSlots: { customRender: "marketable_time" },
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
      pagination: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = pageSize;
          this.PolicyList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.PolicyList();
        },
      }, // 页面显示数据分页内容
    };
  },
  methods: {
    changeit(val) {
      let content = "";
      if (val.is_marketable == 0) {
        content = "确定要上架吗？";
      } else {
        content = "确定要下架吗？";
      }
      let that = this;
      this.$confirm({
        title: "提示",
        content: content,
        onOk() {
          axios
            .patch("/api/prop/policy/status", {
              id: val.id,
              version: val.version,
              is_marketable: val.is_marketable == 0 ? 1 : 0,
            })
            .then((res) => {
              that.PolicyList();
            });
        },
        onCancel() {},
      });
    },
    PolicyList() {
      axios.get("/api/prop/policy").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data;
        }
      });
    },
    btn_add(form,type ,title) {
      this.form = {...form} ;
      this.type = type ;
      this.title = title ;
      console.log(form)
      this.content = form.content ;
      this.visible = true;
    },
    btn_read() {
      this.$router.push("/property/newsread");
    },
    submit(){
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.type == 1){
            axios.post('/api/prop/policy',{
            name:this.form.name,
            content:this.content
          }).then((res) =>{
            this.resetForm();
            this.PolicyList();
          })
          }else{
            axios.patch('/api/prop/policy',{
            name:this.form.name,
            content:this.content,
            id:this.form.id,
            version: this.form.version
          }).then((res) =>{
            this.resetForm();
            this.PolicyList();
          })
          }
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.visible = false ;
      this.content = '';
      this.$refs.ruleForm.resetFields();
    },
    change(val){
      this.content = val ;
    },
    delit(val){
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
        .delete("/api/prop/policy", {
          params:{
            id: val.id,
            version: val.version,
          }
          
        })
        .then((res) => {
          that.PolicyList();
        });
        },
        onCancel() {},
      });
    }
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
