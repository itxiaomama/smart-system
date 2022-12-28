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
            <a-button type="primary" @click="AddList({}, 1, '新增banner')"
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
              :rowKey="(record, id) => id"
              :pagination="paginationBanner"
            >
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
                <a href="javascript:;" @click="AddList(record, 2, '编辑banner')"
                  ><a-icon type="edit" theme="twoTone" />编辑</a
                >
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

    <!-- 新增modal弹框 -->
    <a-modal v-model="visibleAdd" :title="title" width="40%">
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
          type="textarea"
          v-model="FromAdd.banner_desc"
        />
      </div>
      <div class="buildname" style="margin: 20px 21px; display: flex">
        <p>供应商图标：</p>
        <div>
         <uploadimgVue  
         :FileList="bannerimg"
         :limit="1"
          @upload="getupload"
          @remove="remove"
         />
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
export default {
  name: "FirmBanner",
  components:{
    uploadimgVue
  },
  data() {
    return {
      banner_img:'',
      bannerimg:[],
      type: 1,
      title: "新增banner",
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
          dataIndex: "marketable_time",
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
    getupload(file){
      this.banner_img = file ;
      this.bannerimg.push(file)
    },
    remove(file){
      this.banner_img = '';
      this.bannerimg = [];
    },
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
    // 获取列表数据
    bannerList() {
      axios.get("/api/ics/serviceBanner?per_page=9999").then((res) => {
        this.dataSource = res.data.data;
      });
    },
    //todo 新增
    // 新增banner弹框显示
    AddList(form, type, title) {
      this.type = type;
      this.title = title;
      this.FromAdd = { ...form };
      if(this.type == 2){
        this.$nextTick(() =>{
          if(form.banner_img){
            let arr = [] ;
            arr.push(form.banner_img)
            this.banner_img = form.banner_img;
            this.bannerimg = arr ;
          }
        })
      }
      this.visibleAdd = true;
    },
    // 新增确认
    AddListSure() {
      let data ={
        banner_name:this.FromAdd.banner_name,
        banner_desc:this.FromAdd.banner_desc,
        banner_img:this.banner_img,
        uri:this.FromAdd.uri,
      }
      if (this.type == 1) {
        axios.post("/api/ics/serviceBanner", data).then((res) => {
            this.visibleAdd = false;
            this.$message.success("操作成功");
           this.AddListUp();
            this.bannerList();
        });
      } else {
        data.id =  this.FromAdd.id;
        data.version =  this.FromAdd.version;
         axios.patch("/api/ics/serviceBanner", data).then((res) => {
            this.visibleAdd = false;
            this.$message.success("操作成功");
            this.AddListUp();
            this.bannerList();
        });
      }
    },
    // 取消新增
    AddListUp() {
      this.banner_img = '';
      this.bannerimg = [];
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
