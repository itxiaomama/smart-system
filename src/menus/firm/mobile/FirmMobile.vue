<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="top">
          <div class="left">
            <!-- 搜素 -->
            <a-input-search
              placeholder="请输入菜单名称"
              style="width: 200px; margin-right: 20px"
              @click="ShowEdit(true)"
              v-model="inputVal"
            />
          </div>
          <div class="bottom">
            <!-- 新增 -->
            <a-button type="primary" @click="AddMenu({}, 1, '新增菜单')"
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
              :pagination="paginationMobile"
            >
              <!-- 状态开关 -->
              <span slot="belongbuild" slot-scope="text, record">
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
              <template slot="action" slot-scope="text, record">
                <!-- 编辑 -->
                <a @click="AddMenu(record, 2, '编辑菜单')"
                  ><a-icon type="edit" theme="twoTone" />编辑</a>
                <!-- 编辑modal弹框 -->
                <a-divider type="vertical" />
                <a @click="AddMenu(record.id, 3, '新增菜单')"
                  ><a-icon type="edit" theme="twoTone" />新增</a>
                <a-divider type="vertical" />
                <!-- 删除 -->
                <a
                  href="javascript:;"
                  @click="DeleteMenu(record.id, record.version)"
                >
                  <a-icon type="delete" theme="twoTone" />删除</a
                >
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增modal弹框 -->
    <a-modal v-model="AddMenuAdd" :title="title" width="40%">
      <div class="buildname" style="margin: 20px 12px">
        <span>上级菜单：</span>
         <a-tree-select 
            class="kselect"
            v-model="FromAdd.parent_id"
            allow-clear
            :treeData="MenuOptions"
            tree-default-expand-all
            placeholder="请选择"
          ></a-tree-select>
      </div>
      <div class="buildname" style="margin: 20px 12px">
        <span>菜单名称：</span>
        <a-input
          placeholder="请输入bannner菜单"
          style="width: 30vw"
          v-model="FromAdd.menu_name"
        />
      </div>
      <div class="buildname" style="margin: 20px 12px">
        <span>菜单简介：</span>
        <a-input
          placeholder="请输入菜单简介"
          style="width: 30vw"
          v-model="FromAdd.menu_desc"
        />
      </div>
      <div class="buildname" style="margin: 20px 12px; display: flex">
        <p>菜单图标：</p>
        <div>
          <uploadimgVue 
          :FileList="menuimg"
          :limit="1"
           @upload="getupload"
            @remove="remove"
          />
        </div>
      </div>
      <template slot="footer">
        <div>
          <a href="javascript:;"
            ><a-button style="margin-right: 20px" @click="AddMenuUp"
              >取消</a-button
            ></a
          >
          <a href="javascript:;" @click="AddMenuSure">
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
  name: "FirmMobile",
  components:{
    uploadimgVue
  },
  data() {
    return {
      menu_img:"",
      menuimg:[],
      type: 1,
      title: "新增菜单",
      dataSource: [], //页面数据源
      MenuOptions: [], // 存放菜单选择数据
      columns: [
        {
          title: "菜单名称",
          dataIndex: "menu_name",
          width: "30%",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "上架时间",
          align: "center",
          dataIndex: "marketable_time",
          width: "20%",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "是否上架",
          dataIndex: "is_marketable",
          width: "20%",
          align: "center",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "操作",
          dataIndex: "action",
          align: "center",
          width: "30%",
          scopedSlots: { customRender: "action" },
        },
      ], //table页面表头数据
      AddMenuAdd: false, //新增modal弹框默认状态
      FromAdd: {}, //存在新增数据
      AddMenuEdit: false, //新增modal弹框默认状态
      FromEdit: {}, //存在新增数据
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
      // 显示数据页面条数
      paginationMobile: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, //默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationMobile.defaultCurrent = current;
          this.paginationMobile.defaultPageSize = pageSize;
          this.menuList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationMobile.defaultCurrent = current;
          this.paginationMobile.defaultPageSize = size;
          this.menuList();
        },
      }, // 显示分页s
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
    };
  },
  created() {
    // 获取页面数据列表
    this.menuList();
    this.menuLista();
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
      this.menu_img = file;
      this.menuimg.push(file);
    },
    remove(file){
      console.log(file)
      this.menu_img ='';
      this.menuimg = [];
    },
    getTreedata(data) {
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        var tempobj = {
          title: data[i].menu_name,
          value: data[i].id,
          key: data[i].id,
        };
        if ("children" in data[i]) {
          tempobj.children = this.getTreedata(data[i].children);
        }
        arr.push(tempobj);
      }
      return arr;
    },
    // 获取页面数据列表
    menuList() {
      axios.get("/api/ics/serviceMenu?per_page=9999").then((res) => {
        this.dataSource = res.data;
      });
    },
    menuLista() {
      axios.get("/api/ics/serviceMenu").then((res) => {
        let arr = this.getTreedata(res.data);
        this.MenuOptions.push(...arr);
      });
    },
    // 状态开关
    async switchChange(checked, id, version, name) {
      let obj = { id };
      obj[name] = checked ? 1 : 0;
      axios
        .patch("/api/ics/serviceMenu/status", obj, {
          params: { version: version },
        })
        .then((res) => {
          if (res.status_code == 200) {
            this.menuList();
          }
        });
    },
    // todo 新增
    // 新增弹框显示
    AddMenu(form, type, title) {
      this.type = type;
      this.title = title;
      this.FromAdd = { ...form };
      if(type == 2){
        this.$nextTick(() => {
          if(form.menu_img){
           let arr = [] ;
          arr.push(form.menu_img)
          this.menuimg = arr ;
          this.menu_img = form.menu_img; 
          }
        })
      }else if(type == 3){
        this.FromAdd.parent_id = form;
      }
      this.AddMenuAdd = true;
      // this.FromAdd = { parent_id: "" };
    },
    // 新增确认
    AddMenuSure() {
      let data = {
        parent_id: this.FromAdd.parent_id,
        menu_name: this.FromAdd.menu_name,
        menu_desc: this.FromAdd.menu_desc,
        menu_img: this.menu_img
      };
      if (this.type == 1 || this.type == 3) {
        axios.post("/api/ics/serviceMenu", data).then((res) => {
          if (res.message === "success") {
            this.AddMenuAdd = false;
            this.menu_img = '';
            this.menuimg = [];
            this.$message.success("操作成功");
            this.menuList();
          }
        });
      } else {
        data.id = this.FromAdd.id ;
        data.version = this.FromAdd.version;
        axios.patch("/api/ics/serviceMenu", data).then((res) => {
          if (res.message === "success") {
            this.AddMenuAdd = false;
            this.menu_img = '';
            this.menuimg = [];
            this.$message.success("操作成功");
            this.menuList();
          }
        });
        this.AddMenuAdd = false;
      }
    },
    // 取消新增
    AddMenuUp() {
      this.AddMenuAdd = false;
    },
    // todo 删除
    // 删除
    DeleteMenu(id, version) {
      axios
        .delete("/api/ics/serviceMenu", {
          params: {
            id: id,
            version: version,
          },
        })
        .then(() => {
          this.$message.success("删除成功");
          // 回调获取页面数据列表
          this.menuList();
        });
    },
    // todo 编辑
    // 编辑弹框显示
    EditMenu(record) {
      this.AddMenuEdit = true;
      this.FromEdit = { ...record };
      this.FromEdit.parent_id = record.parent_id.toString();
      console.log(record.parent_id.toString());
    },
    // 编辑确认
    EditMenuSure() {
      this.AddMenuEdit = false;
      this.$message.success("编辑菜单成功");
    },
    // 取消编辑
    EditMenuUp() {
      this.AddMenuEdit = false;
    },
    // todo 搜索
    // 搜搜
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/ics/serviceMenu", { params: { menu_name: paramName } })
          .then((res) => {
            this.dataSource = res.data;
            this.total = res.data.length;
          });
      } else {
        this.menuList(); // 更新表
      }
    },
  },
  computed: {
    // table表格全选框控制
    rowSelection() {
      return {
        onChange: () => {},
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
    .left {
      display: flex;
    }
  }
  .ant-select{
    width: 30%!important;
  }
}
</style>
