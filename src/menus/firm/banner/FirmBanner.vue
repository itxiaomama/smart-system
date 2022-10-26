<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="top">
          <div class="left">
            <!-- 搜索 -->
            <a-input-search
              placeholder="请输入banner名称"
              style="width: 200px; margin-right: 20px"
              @click="ShowEdit(true)"
              v-model="inputVal"
            />
          </div>
          <div class="bottom">
            <!-- 新增 -->
            <a-button type="primary" @click="AddList">新增</a-button>
            <!-- 新增modal弹框 -->
            <a-modal v-model="visibleAdd" title="新增banner菜单" width="40%">
              <div class="buildname" style="margin: 20px 12px">
                <span>bannner菜单：</span>
                <a-input
                  placeholder="请输入bannner菜单"
                  style="width: 30vw"
                  v-model="FromAdd.banner_name"
                />
              </div>
              <div class="buildname" style="margin: 20px 35px">
                <span>菜单简介：</span>
                <a-input
                  placeholder="请输入菜单简介"
                  style="width: 30vw"
                  v-model="FromAdd.banner_desc"
                />
              </div>
              <div class="buildname" style="margin: 20px 21px; display: flex">
                <p>供应商图标：</p>
                <div>
                  <el-upload
                    action="https://park.cngiantech.com/api/system/upload"
                    list-type="picture-card"
                    :limit="1"
                    :headers="headers"
                    :data="fileData"
                    :before-upload="beforeAvatarUpload1"
                    :on-success="handleSuccess1"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <img width="100%" :src="FromAdd.banner_img" alt="" />
                </div>
              </div>
              <div class="buildname" style="margin: 20px 22px">
                <span>落地页URL：</span>
                <a-input
                  placeholder="请输入落地页URL"
                  style="width: 30vw"
                  v-model="FromAdd.uri"
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
              :pagination="paginationBanner"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <span slot="area" slot-scope="text, record">
                <a-switch
                  v-if="record.is_marketable == 1"
                  default-checked
                  checked-children="是"
                  un-checked-children="否"
                  @change="
                    switchChange(
                      $event,
                      record.id,
                      record.version,
                      'is_marketable'
                    )
                  "
                />
                <a-switch
                  v-if="record.is_marketable == 0"
                  default-unchecked
                  checked-children="是"
                  un-checked-children="否"
                  @change="
                    switchChange(
                      $event,
                      record.id,
                      record.version,
                      'is_marketable'
                    )
                  "
                />
              </span>
              <span slot="collect" slot-scope="text, record">
                <a-switch
                  v-if="record.is_top == 1"
                  default-checked
                  checked-children="是"
                  un-checked-children="否"
                  @change="
                    switchChange1($event, record.id, record.version, 'is_top')
                  "
                />
                <a-switch
                  v-if="record.is_top == 0"
                  default-unchecked
                  checked-children="是"
                  un-checked-children="否"
                  @change="
                    switchChange1($event, record.id, record.version, 'is_top')
                  "
                />
              </span>
              <template slot="action" slot-scope="text, record">
                <!-- 编辑-->
                <a href="javascript:;" @click="EditList(record)"
                  ><a-icon type="edit" theme="twoTone" />编辑</a
                >
                <!-- 编辑modal弹框 -->
                <a-modal
                  v-model="visibleEdit"
                  title="新增banner菜单"
                  width="40%"
                >
                  <div class="buildname" style="margin: 20px 12px">
                    <span>bannner菜单：</span>
                    <a-input
                      placeholder="请输入bannner菜单"
                      style="width: 30vw"
                      v-model="FromEdit.banner_name"
                    />
                  </div>
                  <div class="buildname" style="margin: 20px 35px">
                    <span>菜单简介：</span>
                    <a-input
                      placeholder="请输入菜单简介"
                      style="width: 30vw"
                      v-model="FromEdit.banner_desc"
                    />
                  </div>
                  <div
                    class="buildname"
                    style="margin: 20px 21px; display: flex"
                  >
                    <p>供应商图标：</p>
                    <div>
                      <el-upload
                        action="https://park.cngiantech.com/api/system/upload"
                        list-type="picture-card"
                        :limit="1"
                        :headers="headers"
                        :data="fileData"
                        :before-upload="beforeAvatarUpload1"
                        :on-success="handleSuccess1"
                        :on-preview="handlePictureCardPreview1"
                        :on-remove="handleRemove1"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <img width="100%" :src="FromEdit.banner_img" alt="" />
                    </div>
                  </div>
                  <div class="buildname" style="margin: 20px 22px">
                    <span>落地页URL：</span>
                    <a-input
                      placeholder="请输入落地页URL"
                      style="width: 30vw"
                      v-model="FromEdit.uri"
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
                    <a href="javascript:;" @click="EditListSure">
                      <a-button type="primary">确定</a-button></a
                    >
                  </div>
                </a-modal>
                <a-divider type="vertical" />
                <!-- 删除 -->
                <a
                  href="javascript:;"
                  @click="DeleteBanner(record.id, record.version)"
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
  name: "FirmBanner",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "名称",
          dataIndex: "banner_name",
          width: "15%",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "简介",
          dataIndex: "banner_desc",
          width: "15%",
          align: "center",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "上架时间",
          align: "center",
          dataIndex: "created_at",
          width: "20%",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "点击次数",
          width: "10%",
          align: "center",
          dataIndex: "hits",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "是否上架",
          dataIndex: "is_marketable_name",
          align: "center",
          width: "10%",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "是否置顶",
          dataIndex: "is_top_name",
          align: "center",
          width: "10%",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "操作",
          dataIndex: "action",
          align: "center",
          width: "20%",
          scopedSlots: { customRender: "action" },
        },
      ],
      visibleAdd: false,
      visibleEdit: false,
      headers: {
        //请求头部参数
        Authorization: "Bearer" + window.sessionStorage.getItem("token"),
      },
      //接口需要的额外参数
      fileData: {
        module: "park",
      },
      FromAdd: { banner_img: "" },
      FromEdit: { banner_img: "" },
      // 分页数据条数
      paginationBanner: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, //默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationBanner.defaultCurrent = current;
          this.paginationBanner.defaultPageSize = pageSize;
          this.bannerList(); //显示列表的接口名称
        }, // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationBanner.defaultCurrent = current;
          this.paginationBanner.defaultPageSize = size;
          this.bannerList();
        },
      },
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
    };
  },
  created() {
    //获取列表数据
    this.bannerList();
  },
  watch: {
    inputVal(newValue) {
      if (newValue) {
        this.ShowEdit(true);
      } else {
        this.ShowEdit(false);
      }
    },
  },
  methods: {
    async switchChange(checked, id, version, name) {
      let obj = { id };
      obj[name] = checked ? 1 : 0;
      axios
        .patch("/api/ics/serviceBanner/status", obj, {
          params: { version: version },
        })
        .then((res) => {
          if (res.status_code == 200) {
            this.bannerList();
          }
        });
    },
    async switchChange1(checked, id, version, name) {
      let obj = { id };
      obj[name] = checked ? 1 : 0;
      axios
        .patch("/api/ics/serviceBanner/status", obj, {
          params: { version: version },
        })
        .then((res) => {
          if (res.status_code == 200) {
            this.bannerList();
          }
        });
    },
    // 图片上传成功
    handleSuccess1(res, file) {
      for (let item of res.data) {
        this.FromAdd.banner_img = item.path;
      }
    },
    handleSuccess2(res, file) {
      for (let item of res.data) {
        this.FroEdit.banner_img = item.path;
        console.log(this.FroEdit.banner_img);
      }
    },
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
    // 获取列表数据
    bannerList() {
      axios.get("/api/ics/serviceBanner?per_page=9999").then((res) => {
        this.dataSource = res.data.data;
      });
    },
    //todo 新增
    // 新增banner弹框显示
    AddList() {
      this.visibleAdd = true;
      this.FromAdd = {
        banner_name: "",
      };
    },
    // 新增确认
    AddListSure() {
      axios.post("/api/ics/serviceBanner", this.FromAdd).then((res) => {
        if (res.status_code == 201) {
          this.visibleAdd = false;
          this.$message.success("新增成功");
          this.bannerList();
        }
      });
    },
    // 取消新增
    AddListUp() {
      this.visibleAdd = false;
    },
    //todo 删除
    DeleteBanner(id, version) {
      axios
        .delete("/api/ics/serviceBanner", {
          params: {
            id: id,
            version: version,
          },
        })
        .then(() => {
          this.$message.success("删除成功");
          // 回调获取页面数据列表
          this.bannerList();
        });
    },
    //todo 编辑
    // 编辑banner
    EditList(row) {
      this.visibleEdit = true;
      // this.FromEdit = { ...row };
    },
    EditListSure() {
      this.visibleEdit = false;
      this.$message.success("编辑banner成功");
    },
    EditListUp() {
      this.visibleEdit = false;
    },
    //todo 搜索
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/ics/serviceBanner", { params: { banner_name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.bannerList(); // 更新表
      }
    },
  },
  computed: {
    rowSelection() {
      return {
        onChange: () => {},
      };
    },
  },
};
</script>

<style lang="less" scoped>
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
}
</style>
