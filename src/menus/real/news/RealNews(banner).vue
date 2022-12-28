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
                <a-button
                  type="primary"
                  @click="btn_add({}, 1, '新增政策banner')"
                  >新增</a-button
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
                  href="javascript:;"
                  @click="btn_add(record, 2, '编辑政策banner')"
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
    <a-modal
      v-model="visible"
      :title="title"
      width="40%"
      @cancel="resetForm"
      @ok="submit"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="banner名称:" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>

        <a-form-model-item label="banner简介:">
          <a-input v-model="form.banner_desc" type="textarea" />
        </a-form-model-item>

        <a-form-model-item label="上传banner图标:">
          <uploadimgVue
            :FileList="bannerimg"
            :limit="1"
            @upload="getupload"
            @remove="remove"
          />
        </a-form-model-item>

        <a-form-model-item label="落地页URL：" prop="uri">
          <a-input v-model="form.uri" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import uploadimgVue from "@/components/common/uploadimg.vue";
export default {
  name: "RealNews",
  components: {
    uploadimgVue,
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      bannerimg: [],
      content: "",
      form: {
        name: "",
        banner_desc: "",
        uri: "",
        banner_img: "",
      },
      rules: {
        name: [{ required: true, message: "请输入政策名称", trigger: "blur" }],
        uri: [{ required: true, message: "请输入落地页URL", trigger: "blur" }],
      },
      visible: false,
      title: "新增政策banner",
      type: null,
      dataSource: [],
      columns: [
        {
          title: "名称",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "简介",
          dataIndex: "banner_desc",
          scopedSlots: { customRender: "banner_desc" },
        },
        {
          title: "上架时间",
          dataIndex: "marketable_time",
          scopedSlots: { customRender: "marketable_time" },
        },
        {
          title: "点击次数",
          dataIndex: "hits",
          scopedSlots: { customRender: "hits" },
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
          this.getbanlist(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.getbanlist();
        },
      }, // 页面显示数据分页内容
    };
  },
  methods: {
    getupload(file){
      this.form.banner_img = file ;
      this.bannerimg.push(file);
    },
    remove(){
      this.form.banner_img = '';
      this.bannerimg = [];
    },
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
            .patch("/api/prop/policyBanner/status", {
              id: val.id,
              version: val.version,
              is_marketable: val.is_marketable == 0 ? 1 : 0,
            })
            .then((res) => {
              that.getbanlist();
            });
        },
        onCancel() {},
      });
    },
    getbanlist() {
      axios.get("/api/prop/policyBanner").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data;
        }
      });
    },
    btn_add(form, type, title) {
      this.form = { ...form };
      if(type == 2){
        let  arr = [] ;
        arr.push(form.banner_img);
        this.bannerimg = arr ;
      }
      this.type = type;
      this.title = title;
      this.visible = true;
    },
    btn_read() {
      this.$router.push("/property/newsread");
    },
    submit() {
      if(this.bannerimg.length == 0){
        this.$message.error('请上传banner图标');
        return false ;
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let  data = {
            name: this.form.name,
            banner_desc:this.form.banner_desc,
            banner_img:this.form.banner_img,
            uri: this.form.uri
          }
          if (this.type == 1) {
            axios
              .post("/api/prop/policyBanner", data)
              .then((res) => {
                this.resetForm();
                this.getbanlist();
              });
          } else {
            data.id = this.form.id ;
            data.version = this.form.version ;
            axios
              .patch("/api/prop/policyBanner", data)
              .then((res) => {
                this.resetForm();
                this.getbanlist();
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.visible = false;
      this.bannerimg = [] ;
      this.$refs.ruleForm.resetFields();
    },

    delit(val) {
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/prop/policyBanner", {
              params: {
                id: val.id,
                version: val.version,
              },
            })
            .then((res) => {
              that.getbanlist();
            });
        },
        onCancel() {},
      });
    },
  },
  created() {
    this.getbanlist();
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
