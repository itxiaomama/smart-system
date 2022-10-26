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
            <a-button type="primary" @click="AddList">新增</a-button>
            <!-- 新增modal弹框 -->
            <a-modal v-model="visibleAdd" title="新增供应商" width="40%">
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
                    v-model="FromAdd.supplier_desc"
                  />
                </div>
                <div class="buildname" style="margin: 20px 12px; display: flex">
                  <p>供应商图标：</p>
                  <div>
                    <el-upload
                      action="https://park.cngiantech.com/api/system/upload"
                      list-type="picture-card"
                      :limit="1"
                      :headers="headers"
                      :data="fileData"
                      :before-upload="beforeAvatarUpload1"
                      :on-preview="handlePictureCardPreview1"
                      :on-remove="handleRemove1"
                      :on-success="handleSuccess1"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible1">
                      <img width="100%" :src="dialogImageUrl1" alt="" />
                    </el-dialog>
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
                    <el-upload
                      action="https://park.cngiantech.com/api/system/upload"
                      list-type="picture-card"
                      :limit="3"
                      :headers="headers"
                      :data="fileData"
                      :before-upload="beforeAvatarUpload2"
                      :on-preview="handlePictureCardPreview2"
                      :on-remove="handleRemove2"
                      :on-success="handleSuccess2"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible2">
                      <img width="100%" :src="dialogImageUrl2" alt="" />
                    </el-dialog>
                  </div>
                </div>
              </div>
              <div class="buildname" style="margin: 20px 26px; display: flex">
                <span>上传详情：</span>
                <a-textarea
                  placeholder="请输入上传详情"
                  :rows="6"
                  style="width: 30vw"
                  v-model="FromAdd.supplier_content"
                />
              </div>
              <div
                style="
                  padding: 10px 16px;
                  text-align: right;
                  background: transparent;
                  border-top: 1px solid #e8e8e8;
                  border-radius: 0 0 4px 4px;
                "
              >
                <a href="javascript:;"
                  ><a-button style="margin-right: 20px" @click="AddListUp"
                    >取消</a-button
                  ></a
                >
                <a href="javascript:;" @click="AddListSure">
                  <a-button type="primary">确定</a-button></a
                >
              </div>
            </a-modal>
          </div>
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :rowKey="(record, id) => id"
              :pagination="paginationSubblier"
            >
              <template slot="action" slot-scope="text, record">
                <!-- 编辑-->
                <a href="javascript:;" @click="EditList(record)"
                  ><a-icon type="edit" theme="twoTone" />编辑</a
                >
                <!-- 编辑modal弹框 -->
                <a-modal v-model="visibleEdit" title="编辑供应商" width="40%">
                  <div class="text">
                    <div class="buildname" style="margin: 20px 12px">
                      <span>供应商名称：</span>
                      <a-input
                        placeholder="请输入供应商名称"
                        style="width: 30vw"
                        v-model="FromEdit.supplier_name"
                      />
                    </div>
                    <div class="buildname" style="margin: 20px 12px">
                      <span>供应商简介：</span>
                      <a-input
                        placeholder="请输入供应商简介"
                        style="width: 30vw"
                        v-model="FromEdit.supplier_desc"
                      />
                    </div>
                    <div
                      class="buildname"
                      style="margin: 20px 12px; display: flex"
                    >
                      <p>供应商图标：</p>
                      <div>
                        <el-upload
                          action="https://park.cngiantech.com/api/system/upload"
                          list-type="picture-card"
                          :limit="1"
                          :headers="headers"
                          :data="fileData"
                          :before-upload="beforeAvatarUpload3"
                          :on-preview="handlePictureCardPreview3"
                          :on-remove="handleRemove3"
                          :on-success="handleSuccess3"
                          :file-list="FromEdit.supplier_img"
                        >
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible3">
                          <img
                            width="100%"
                            :src="FromEdit.supplier_img"
                            alt=""
                          />
                        </el-dialog>
                      </div>
                    </div>
                    <div class="buildname" style="margin: 20px 12px">
                      <span>供应商地址：</span>
                      <a-input
                        placeholder="请输入供应商地址"
                        style="width: 30vw"
                        v-model="FromEdit.supplier_address"
                      />
                    </div>
                    <div class="buildname" style="margin: 20px 12px">
                      <span>供应商行业：</span>
                      <a-input
                        placeholder="请输入供应商行业"
                        style="width: 30vw"
                        v-model="FromEdit.supplier_industry"
                      />
                    </div>
                    <div
                      class="buildname"
                      style="margin: 20px 12px; display: flex"
                    >
                      <p>供应商资质：</p>
                      <div>
                        <el-upload
                          action="https://park.cngiantech.com/api/system/upload"
                          list-type="picture-card"
                          :limit="3"
                          :headers="headers"
                          :data="fileData"
                          :before-upload="beforeAvatarUpload4"
                          :on-preview="handlePictureCardPreview4"
                          :on-remove="handleRemove4"
                          :on-success="handleSuccess4"
                          :file-list="FromEdit.qualification_img"
                        >
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible4">
                          <img width="100%" :src="dialogImageUrl4" alt="" />
                        </el-dialog>
                      </div>
                    </div>
                  </div>
                  <div
                    class="buildname"
                    style="margin: 20px 26px; display: flex"
                  >
                    <span>上传详情：</span>
                    <a-textarea
                      placeholder="请输入上传详情"
                      :rows="6"
                      style="width: 30vw"
                      v-model="FromEdit.supplier_content"
                    />
                  </div>
                  <div
                    style="
                      padding: 10px 16px;
                      text-align: right;
                      background: transparent;
                      border-top: 1px solid #e8e8e8;
                      border-radius: 0 0 4px 4px;
                    "
                  >
                    <a href="javascript:;"
                      ><a-button style="margin-right: 20px" @click="EditListUp"
                        >取消</a-button
                      ></a
                    >
                    <a
                      href="javascript:;"
                      @click="EditListSure(record.id, record.version)"
                    >
                      <a-button type="primary">确定</a-button></a
                    >
                  </div>
                </a-modal>
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
  </div>
</template>

<script>
import axios from "axios";
// import { filesArray } from "./upLoad"; //上传接口
export default {
  name: "FirmSubblier",
  data() {
    return {
      dataSource: [], //表格数据源
      columns: [
        {
          title: "供应商名称",
          dataIndex: "supplier_name",
          width: "20%",
          scopedSlots: { customRender: "supplier_name" },
        },
        {
          title: "修改时间",
          align: "center",
          width: "25%",
          dataIndex: "created_at",
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
    // todo 图片上传
    // 图片上传失败
    handleAvatarError(error, file, files) {},
    // 图片上传成功
    handleSuccess1(res, file) {
      for (let item of res.data) {
        this.FromAdd.supplier_img = item.path;
      }
    },
    handleSuccess2(res, file) {
      for (let item of res.data) {
        this.FromAdd.qualification_img.push(item.path);
      }
      console.log("this.FromAdd>>>>", this.FromAdd);
    },
    handleSuccess3(res, file) {
      for (let item of res.data) {
        this.FromEdit.supplier_img = [item.path];
      }
    },
    handleSuccess4(res, file) {
      for (let item of res.data) {
        this.FromEdit.qualification_img.push(item.path);
      }
      console.log("this.FromEdit>>>>>", this.FromEdit);
    },
    // 删除上传图片
    handleRemove1(file, fileList) {},
    handleRemove2(file, fileList) {},
    handleRemove3(file, fileList) {},
    handleRemove4(file, fileList) {},
    // 图片上传之前
    beforeAvatarUpload1(file) {
      this.fileData["files[]"] = file;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    beforeAvatarUpload2(file) {
      this.fileData["files[]"] = file;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    beforeAvatarUpload3(file) {
      this.fileData["files[]"] = file;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    beforeAvatarUpload4(file) {
      this.fileData["files[]"] = file;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 图片上传之后
    handlePictureCardPreview1(file) {
      this.dialogImageUrl1 = file.url;
      this.dialogVisible1 = true;
    },
    handlePictureCardPreview2(file) {
      this.dialogImageUrl2 = file.url;
      this.dialogVisible2 = true;
    },
    handlePictureCardPreview3(file) {
      this.dialogImageUrl3 = file.url;

      this.dialogVisible3 = true;
    },
    handlePictureCardPreview4(file) {
      this.dialogImageUrl4 = file.url;
      this.dialogVisible4 = true;
    },
    // 获取页面数据列表
    subblierList() {
      axios.get("/api/ics/serviceSupplier?per_page=9999").then((res) => {
        this.dataSource = res.data.data;
      });
    },
    // todo 新增
    // 新增modal弹框显示
    AddList() {
      this.visibleAdd = true;
      this.FromAdd = {
        supplier_name: "",
        dialogImageUrl1: [],
        qualification_img: [],
      };
    },
    // 新增确认
    AddListSure() {
      axios.post("/api/ics/serviceSupplier", this.FromAdd).then((res) => {
        if (res.status_code == 201) {
          this.visibleAdd = false;
          this.$message.success("新增成功");
          this.subblierList();
        }
      });
    },
    // 取消新增
    AddListUp() {
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
      // axios
      //   .patch("/api/ics/serviceSupplier", this.FromEdit, {
      //     params: {
      //       id: id,
      //       version: version,
      //     },
      //   })
      //   .then((res) => {
      //     if (res.message === "success") {
      //       this.$message.success("编辑区域成功");
      //       this.visibleEdit = false;
      //       this.subblierList(this.FromEdit.id ? this.page : 1);
      //     }
      //   });
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
  width: 87.3vw;
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
