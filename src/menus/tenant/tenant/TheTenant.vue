<template>
  <div class="wrap">
    <div class="wrapA">
      <div class="top">
        <!-- 搜索 -->
        <div class="left">
          <a-input-search
            placeholder="快速搜索"
            v-permission="'search'"
            style="width: 200px; margin-right: 20px"
            @click="ShowEdit(true)"
            v-model="inputVal"
          />
        </div>
        <!-- 新增 -->
        <div class="bottom">
          <a-button
            type="primary"
            v-permission="'add'"
            style="margin-bottom: 20px"
            @click="AddList({}, 1, '新增租户')"
          >
            新增
          </a-button>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="content">
        <div>
          <a-table
            bordered
            :data-source="dataSource"
            :columns="columns"
            rowKey="id"
            :pagination="pagination"
          >
            <template slot="operation" slot-scope="record">
              <!-- 编辑 -->
              <a href="javascript:;" v-permission="'edit'" @click="AddList(record, 2, '编辑租户')"
                ><a-icon type="edit"  theme="twoTone" />编辑</a
              >
              <a-divider type="vertical" />
              <!-- 删除 -->
              <a
                href="javascript:;"
                v-permission="'delete'"
                @click="DeleteTenant(record.id, record.version)"
                ><a-icon type="delete" theme="twoTone" />删除</a
              >
            </template>
          </a-table>
        </div>
      </div>
    </div>

    <!-- 新增modal弹框 -->
    <a-modal
      v-model="visibleAdd"
      centered
      :maskClosable="false"
      :title="title"
      width="35%"
    >
      <div class="buildname" style="margin-bottom: 20px">
        <span>租户名称：</span>

        <a-input
          placeholder="租户名称"
          style="width: 28vw"
          v-model="From.name"
          allow-clear
        ></a-input>
        <!-- <dict v-model="selectId" :keyValue="'ics_room_rent_type'" /> -->
        <!-- <uploadimg
          :FileList="filelist"
          @upload="getupload"
          @remove="remove"
          :limit="5"
          :multiple="true"
        />
        <keditor :isClear="isClear" @change="change" /> -->
      </div>
      <template slot="footer">
        <div class="btnant">
          <a-button style="margin-right: 20px" @click="AddListUp"
            >取消</a-button
          >
          <a-button type="primary" @click="AddTenantList">确定</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import uploadimg from "@/components/common/uploadimg.vue";
import keditor from "@/components/common/wangeditor.vue";
import dict from "@/components/common/dict.vue";
import { tenant, postTenant, deleteTenant } from "../../../API/index";
export default {
  name: "GardenBuild",
  components: {
    uploadimg,
    keditor,
    dict
  },
  data() {
    return {
      selectId:'',
      isClear: false,
      filelist: [],
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      dataSource: [], // 列表页面数据源
      columns: [
        {
          title: "租户名称",
          dataIndex: "name",
          width: "75%",
          slots: { customRender: "name" },
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: "25%",
          scopedSlots: { customRender: "operation" },
        },
      ], //table表格表头内容
      title: "新增租户",
      type: 1,
      visibleAdd: false, //新增  modal弹框 默认状态
      From: {}, // 存放新增数据
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
          this.tenantList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.tenantList();
        },
      }, // 页面显示数据分页内容
    };
  },
  created() {
    this.tenantList(); //渲染列表数据
  },
  watch: {
    // 搜索框监听有内容自动搜索
    inputVal(newValue) {
      if (newValue) {
        this.ShowEdit(true);
      } else {
        this.ShowEdit(false);
      }
    },
  },
  methods: {
    dictChange(value){
      console.log(value)
      this.selectId = value;
    },
    change(val) {
      console.log(val);
    },
    getupload(file, url) {
      console.log(file);
      // console.log(filelist);
      // var obj = {
      //   uid: filelist.uid,
      //   name: filelist.name,
      //   status: "done",
      //   url: "https://park.cngiantech.com" + file,
      // };
      // // let url = "https://park.cngiantech.com" + file;
      this.filelist.push(file);
      console.log(this.filelist);
      // console.log(filelist);
    },
    remove(file) {
      this.filelist.map((el, index) => {
        if (el.uid == file.uid) {
          this.filelist.splice(index, 1);
        }
      });
      console.log(file);
    },
    //获取租户列表
    tenantList() {
      tenant().then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    //todo 新增//
    // 点击新增租户按钮弹框显示
    AddList(form, type, title) {
      this.title = title;
      this.From = { ...form };
      this.type = type;
      this.visibleAdd = true;
    },
    // 新增确认
    AddTenantList() {
      if (this.type == 1) {
        postTenant(this.From).then((res) => {
          if (res.status_code === 201) {
            this.From.name = "";
            this.$message.success("新增租户成功");
            this.visibleAdd = false;
          }
        });
      } else {
        axios.patch("/api/system/tenant", this.From).then(() => {
          // 成功重新更新列表
          this.visibleAdd = false;
          this.tenantList();
          this.$message.success("编辑租户成功");
          this.visibleAdd = false;
          this.tenantList(this.FromEdit.id ? this.page : 1);
        });
      }
    },
    // 新增取消
    AddListUp() {
      this.From.name = "";
      this.visibleAdd = false;
    },
    //todo 删除//
    // 删除租户
    DeleteTenant(id, version) {
      let data = {
        id: id,
        version: version,
      };
      deleteTenant(data).then((res) => {
        this.$message.success("删除租户成功");
        // 成功重新更新列表
        this.tenantList();
      });
    },

    //todo 查询//
    // 查询租户
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/system/tenant", { params: { name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.tenantList(); // 查询成功根据输入框内容刷新列表
      }
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  height: 80vh;
  overflow-y: auto;
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
    display: flex;
    .right {
      margin-left: 40px;
    }
  }
  .bottom {
    display: flex;
    .buildname {
      display: flex;
      margin-bottom: 20px;
    }
    .remake {
      display: flex;
    }
  }
  .btnant {
    padding: 10px 16px;
    text-align: right;
    background: transparent;
    border-top: 1px solid #e8e8e8;
    border-radius: 0 0 4px 4px;
  }
}
</style>
