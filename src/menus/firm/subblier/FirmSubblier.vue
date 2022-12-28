<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="top">
          <div class="left">
            <!-- 搜索 -->
            <a-input-search
              placeholder="请输入供应商名称"
              style="width: 200px; margin-right: 20px"
              @click="ShowEdit(true)"
              v-model="inputVal"
            />
          </div>
          <div class="bottom">
            <!-- 新增 -->
            <a-button type="primary" @click="AddList({}, 1, '新增供应商')"
              >新增</a-button
            >
          </div>
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              rowKey="id"
              :pagination="paginationSubblier"
            >
              <template slot="action" slot-scope="text, record">
                <!-- 编辑-->
                <a href="javascript:;" @click="AddList(record, 2, '编辑供应商')"
                  ><a-icon type="edit" theme="twoTone" />编辑</a
                >

                <a-divider type="vertical" />
                <!-- 删除 -->
                <a
                  href="javascript:;"
                  @click="DeleteSubblier(record.id, record.version)"
                  ><a-icon type="delete" theme="twoTone" />删除</a
                >
              </template>
              <a slot="supplier_name" slot-scope="text">{{ text }}</a>
            </a-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增modal弹框 -->
    <a-modal v-model="visibleAdd" :title="title" width="40%">
      <div class="text">
        <div class="buildname" style="margin: 20px 12px">
          <span>供应商名称：</span>
          <a-input
            placeholder="请输入供应商名称"
            style="width: 30vw"
            v-model="FromAdd.supplier_name"
          />
        </div>
        <div class="buildname" style="margin: 20px 12px">
          <span>供应商简介：</span>
          <a-input
            placeholder="请输入供应商简介"
            style="width: 30vw"
            type="textarea"
            v-model="FromAdd.supplier_desc"
          />
        </div>
        <div class="buildname" style="margin: 20px 12px; display: flex">
          <p>供应商图标：</p>
          <div>
           <uploadimgVue 
           :FileList="supplierimg"
           :limt="1"
           @upload="getupload"
           @remove="remove"
            />
          </div>
        </div>
        <div class="buildnam" style="margin: 20px 12px">
          <span>供应商地址：</span>
          <a-input
            placeholder="请输入供应商地址"
            style="width: 30vw"
            v-model="FromAdd.supplier_address"
          />
        </div>
        <div class="buildname" style="margin: 20px 12px">
          <span>供应商行业：</span>
          <a-input
            placeholder="请输入供应商行业"
            style="width: 30vw"
            v-model="FromAdd.supplier_industry"
          />
        </div>
        <div class="buildname" style="margin: 20px 12px; display: flex">
          <p>供应商资质：</p>
          <div>
            <uploadimgVue 
            :FileList="qualification_img" 
            :limit="5"
            @upload="getupload1"
            @remove="remove1"
            />

          </div>
        </div>
      </div>
      <div class="buildname" style="margin: 20px 26px; display: flex">
        <span>上传详情：</span>
        <keditor v-model="FromAdd.supplier_content"  @change="change"  />
      </div>
      <template slot="footer">
        <div>
          <a href="javascript:;"
            ><a-button style="margin-right: 20px" @click="AddListUp"
              >取消</a-button
            ></a
          >
          <a href="javascript:;" @click="AddListSure">
            <a-button type="primary">确定</a-button></a
          >
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import uploadimgVue from "@/components/common/uploadimg.vue";
import keditor from '@/components/common/wangeditor.vue'
export default {
  name: "FirmSubblier",
  components:{
    uploadimgVue,
    keditor
  },
  data() {
    return {
      supplier_img:'',
      supplierimg:[],
      qualification_img:[],
      title: "新增供应商",
      type: 1,
      dataSource: [], //表格数据源
      columns: [
        {
          title: "供应商名称",
          dataIndex: "supplier_name",
          width: "20%"
        },
        {
          title: "修改时间",
          align: "center",
          width: "25%",
          dataIndex: "updated_at",
        },
        {
          title: "服务数",
          dataIndex: "service_num",
          width: "15%",
          align: "center",
        },
        {
          title: "申请次数",
          dataIndex: "sign_num",
          width: "15%",
          align: "center",
        },
        {
          title: "操作",
          dataIndex: "action",
          align: "center",
          width: "25%",
          scopedSlots: { customRender: "action" },
        },
      ], //table表格列表头数据
      visibleAdd: false, // 新增 modal弹框默认状态
      visibleEdit: false, // 编辑 modal弹框默认状态
      dialogVisible1: false, //新增上传是否禁用
      dialogVisible2: false, //新增上传是否禁用
      dialogVisible3: false, //新增上传是否禁用
      dialogVisible4: false, //新增上传是否禁用
      dialogImageUrl1: "",
      dialogImageUrl2: "",
      dialogImageUrl3: "",
      dialogImageUrl4: "",
      FromAdd: {
        supplier_img: "",
        qualification_img: [],
      }, // 存放 新增 数据
      //接口需要的额外参数
      fileData: {
        module: "park",
      },
      headers: {
        //请求头部参数
        Authorization: "Bearer" + window.sessionStorage.getItem("token"),
      },
      FromEdit: {
        supplier_img: "",
        qualification_img: [],
      }, // 存放 编辑 数据
      paginationSubblier: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, //默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationSubblier.defaultCurrent = current;
          this.paginationSubblier.defaultPageSize = pageSize;
          this.subblierList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationSubblier.defaultCurrent = current;
          this.paginationSubblier.defaultPageSize = size;
          this.subblierList();
        },
      }, // 显示数据页面条数
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
    };
  },
  created() {
    this.subblierList(); // 获取页面数据列表
  },
  watch: {
    // 监听搜索框是否you
    inputVal(newValue) {
      if (newValue) {
        this.ShowEdit(true);
      } else {
        this.ShowEdit(false);
      }
    },
  },
  methods: {
    change(val) {
      this.FromAdd.supplier_content = val;
    },
    getupload(file) {
      this.supplier_img = file;
      this.supplierimg.push(file);
    },
    getupload1(file) {
      this.qualification_img.push(file);
    },
    remove(file) {
      this.Form.supplier_img = '';
      this.supplierimg = [];
    },
    remove1(file) {
      this.qualification_img.map((el, index) => {
        if (el == file.uid) {
          this.qualification_img.splice(index, 1);
        }
      });
    },
    // 获取页面数据列表
    subblierList() {
      axios.get("/api/ics/serviceSupplier?per_page=9999").then((res) => {
        this.dataSource = res.data.data;
      });
    },
    // todo 新增
    // 新增modal弹框显示
    AddList(form, type, title) {
      this.FromAdd = { ...form };
      this.type = type;
      this.title = title;
      this.visibleAdd = true;
      if(type == 2){
        this.$nextTick(() =>{
          if(form.supplier_img){
            let arr = [];
            arr.push(form.supplier_img);
            this.supplierimg = arr;
            this.supplier_img = form.supplier_img;
            if(form.qualification_img !== ''){
              this.qualification_img = form.qualification_img.split(",");
              this.FromAdd.supplier_content = form.supplier_content;
            }
          } 
        })
        
      }
      // this.FromAdd = {
      //   supplier_name: "",
      //   dialogImageUrl1: [],
      //   qualification_img: [],
      // };
    },
    // 新增确认
    AddListSure() {
      let data = {
        supplier_name:this.FromAdd.supplier_name,
        supplier_desc:this.FromAdd.supplier_desc,
        supplier_img:this.supplier_img,
        supplier_address:this.FromAdd.supplier_address,
        supplier_industry:this.FromAdd.supplier_industry,
        supplier_content:this.FromAdd.supplier_content,
        qualification_img:this.qualification_img
      }
      if (this.type == 1) {
        axios.post("/api/ics/serviceSupplier", data).then((res) => {
          if (res.status_code == 201) {
            this.AddListUp();
            this.$message.success("新增成功");
            this.subblierList();
          }
        });
      } else {
        axios
          .patch("/api/ics/serviceSupplier", data, {
            params: {
              id: this.FromAdd.id,
              version: this.FromAdd.version,
            },
          })
          .then((res) => {
            if (res.message === "success") {
              this.$message.success("编辑区域成功");
              this.AddListUp();
              this.subblierList(this.FromAdd.id ? this.page : 1);
            }
          });
      }
    },
    // 取消新增
    AddListUp() {
      this.qualification_img = [];
      this.supplier_img = '';
      this.supplierimg = [];
      this.visibleAdd = false;
    },
    // todo 删除
    DeleteSubblier(id, version) {
      axios
        .delete("/api/ics/serviceSupplier", {
          params: {
            id: id,
            version: version,
          },
        })
        .then(() => {
          this.$message.success("删除成功");
          // 回调获取页面数据列表
          this.subblierList();
        });
    },
    // todo 编辑
    // 编辑供应商
    EditList(record) {
      console.log("record>>>>>", record);
      record.supplier_img = [record.supplier_img];
      this.visibleEdit = true;
      this.FromEdit = { ...record };
    },
    EditListSure(id, version) {
      console.log(id);
      console.log(version);
      axios
        .patch("/api/ics/serviceSupplier", this.FromEdit, {
          params: {
            id: id,
            version: version,
          },
        })
        .then((res) => {
          if (res.message === "success") {
            this.$message.success("编辑区域成功");
            this.visibleEdit = false;
            this.subblierList(this.FromEdit.id ? this.page : 1);
          }
        });
    },
    EditListUp() {
      this.visibleEdit = false;
    },
    // todo 搜索
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/ics/serviceSupplier", {
            params: { supplier_name: paramName },
          })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.subblierList(); // 更新表
      }
    },
  },
  computed: {
    rowSelection() {
      return {
        onChange: () => {},
      };
    }, // table表格全选按钮
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
  }
  .buildname {
    display: flex;
    margin: 20px;
  }
  .buildnam {
    display: flex;
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
