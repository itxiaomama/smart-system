<template>
  <div class="wrap">
    <div class="wrapA">
      <div class="top">
        <!-- 搜索 -->
        <div class="left">
          <a-input-search
            placeholder="请输入楼宇名称"
            style="width: 200px; margin-right: 20px"
            @click="ShowEdit(true)"
            v-model="inputVal"
          />
        </div>
        <!-- 新增 -->
        <div class="bottom">
          <a-button
            type="primary"
            style="margin-bottom: 20px"
            @click="AddBuilding({}, 1, '新增楼宇')"
          >
            新增
          </a-button>
        </div>
      </div>
      <div class="content">
        <div>
          <a-table
            bordered
            :row-selection="rowSelection"
            :data-source="dataSource"
            :columns="columns"
            rowKey="id"
            :pagination="pagination"
          >
            <!-- <a slot="district_name" slot-scope="text">{{ text }}</a> -->
            <template slot="operation" slot-scope="text, record">
              <!-- 编辑 -->
              <a href="javascript:;" @click="AddBuilding(record, 2, '编辑楼宇')"
                ><a-icon type="edit" theme="twoTone" />编辑</a
              >
              <a-divider type="vertical" />
              <!-- 新增楼层 -->
              <a href="javascript:;" @click="floorbtn(record)"
                ><a-icon type="database" theme="twoTone" />楼层</a
              >
              <a-divider type="vertical" />
              <!-- 删除 -->
              <a
                href="javascript:;"
                @click="DeleteArea(record.id, record.version)"
                ><a-icon type="delete" theme="twoTone" />删除</a
              >
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <!-- 新增modal弹框 -->
    <a-modal v-model="visibleAdd" @ok="handleSubmit" :title="title" width="35%">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="所属区域：">
          <a-select
            v-decorator="[
              'district_id',
              {
                rules: [{ required: true, message: '请选择所选区域！' }],
              },
            ]"
          >
            <a-select-option
              v-for="item in arealist"
              :key="item.id"
              :value="item.id"
            >
              {{ item.district_name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="楼宇名称：">
          <a-input
            v-decorator="[
              'building_name',
              {
                rules: [{ required: true, message: '请输入楼宇名称！' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="楼宇照片：">
          <uploadimgVue
            :FileList="buildpic"
            :limit="1"
            @upload="getupload"
            @remove="remove"
            v-decorator="['building_pic']"
          />
        </a-form-item>
        <a-form-item label="备注：">
          <a-input type="textarea" v-decorator="['remark']" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 新增楼层 -->
    <a-modal v-model="visibleFloor" :title="title1" width="50%">
      <div>
        <div>
          <!-- 楼层新增 -->
          <a-button
            type="primary"
            style="margin-bottom: 20px"
            @click="AddFloor({}, 1, '新增楼宇')"
          >
            新增
          </a-button>
          <!-- 楼层新增modal弹框 -->
          <a-modal
            v-model="visibleFloorAdd"
            @ok="handlit"
            title="楼层新增"
            width="35%"
          >
            <a-form
              :form="form1"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-form-item label="楼层：">
                <a-input
                  v-decorator="[
                    'floor_num',
                    {
                      rules: [{ required: true, message: '请输入楼层名称！' }],
                    },
                  ]"
                />
              </a-form-item>
              <a-form-item label="楼层名称：">
                <a-input
                  v-decorator="[
                    'floor_name',
                    {
                      rules: [{ required: true, message: '请输入楼层名称！' }],
                    },
                  ]"
                />
              </a-form-item>
              <a-form-item label="楼层图片：">
                <uploadimgVue
                  :FileList="floorpic"
                  :limit="1"
                  @upload="getupload1"
                  @remove="remove1"
                  v-decorator="['floor_pic']"
                />
              </a-form-item>
            </a-form>
          </a-modal>
        </div>
        <div>
          <a-table
            bordered
            :row-selection="rowSelection"
            :data-source="dataSourceFloor"
            :columns="columnsFloor"
            rowKey="id"
          >
            <template slot="operation" slot-scope="text, record">
              <!--楼层编辑 -->
              <a href="javascript:;" @click="AddFloor(record, 2, '编辑楼宇')"
                ><a-icon type="edit" theme="twoTone" />编辑</a
              >

              <a-divider type="vertical" />
              <!-- 楼层删除 -->
              <a
                href="javascript:;"
                @click="DeleteFloor(record.id, record.version)"
                ><a-icon type="delete" theme="twoTone" />删除</a
              ></template
            ></a-table
          >
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import uploadimgVue from "@/components/common/uploadimg.vue";
export default {
  name: "GardenBuild",
  components: {
    uploadimgVue,
  },
  data() {
    return {
      floor: {},
      buildid: "",
      arealist: [],
      buildpic: [],
      build_pic: "",
      floor_pic: "",
      floorpic: [],
      form: this.$form.createForm(this, { name: "coordinated" }),
      form1: this.$form.createForm(this, { name: "coordinated" }),
      type: 1,
      type1: 1,
      title: "新增楼宇",
      title1: "新增楼层",
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      dataSource: [], // 列表数据源
      columns: [
        {
          title: "所属园区",
          dataIndex: "park_name",
          width: "20%",
          scopedSlots: { customRender: "district_name" },
        },
        {
          title: "楼宇名称",
          dataIndex: "building_name",
          align: "center",
          width: "15%",
        },
        {
          title: "备注",
          dataIndex: "remark",
          align: "center",
          width: "10%",
        },
        {
          title: "创建时间",
          align: "center",
          dataIndex: "created_at",
          width: "20%",
        },
        {
          title: "创建人",
          dataIndex: "create_by",
          align: "center",
          width: "15%",
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          scopedSlots: { customRender: "operation" },
          width: "20%",
        },
      ], //table表格表头数据
      dataSourceFloor: [], // 楼层数据源
      columnsFloor: [
        {
          title: "楼层",
          dataIndex: "floor_num",
          width: "15%",
        },
        {
          title: "楼层名称",
          dataIndex: "floor_name",
          width: "15%",
        },
        {
          title: "创建时间",
          align: "center",
          dataIndex: "created_at",
          width: "20%",
        },
        {
          title: "创建人",
          dataIndex: "create_by",
          width: "15%",
        },
        {
          title: "操作",
          key: "operation",
          scopedSlots: { customRender: "operation" },
          width: "25%",
        },
      ], //table表格表头数据
      visibleAdd: false, // 新增 model弹框默认状态
      visibleEdit: false, // 编辑 model弹框默认状态
      visibleFloor: false, // 楼层 model弹框默认状态
      visibleFloorAdd: false, // 新增 楼层 model弹框默认状态
      visibleFloorEdit: false, // 编辑 楼层 model弹框默认状态
      fromAdd: {}, // 存放 新增 数据源
      fromEdit: {}, // 存放 编辑 数据源
      fromEditAdd: {}, // 存放 楼层新增 数据源
      fromEditFloor: {}, // 存放 楼层编辑 数据源
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
          this.buildingList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.buildingList();
        },
      }, // 页面显示数据分页内容
    };
  },
  mounted() {
    this.buildingList(); // 楼宇列表
    this.getAreaList();
  },
  watch: {
    // 监听搜索框是否有内容自动根据内容搜素
    inputVal(newValue) {
      if (newValue) {
        this.ShowEdit(true);
      } else {
        this.ShowEdit(false);
      }
    },
  },
  methods: {
    handlit(e) {
      e.preventDefault();
      this.form1.validateFields((err, values) => {
        let data = {
          building_id: this.buildid,
          floor_num: values.floor_num,
          floor_name: values.floor_name,
          floor_pic: this.floor_pic,
        };
        if (!err) {
          if (this.type1 == 1) {
            axios.post("/api/ics/buildingDetail", data).then((res) => {
              if (res.message === "success") {
                this.$message.success("新增楼宇成功");
                // 成功重新更新列表
                this.buildingDetailList(this.buildid);
                this.visibleFloorAdd = false;
              }
            });
          } else {
            data.id = this.floor.id;
            data.version = this.floor.version;
            axios.patch("/api/ics/buildingDetail", data).then((res) => {
              if (res.message === "success") {
                this.$message.success("新增楼宇成功");
                // 成功重新更新列表
                this.buildingDetailList(this.buildid);
                this.visibleFloorAdd = false;
              }
            });
          }
        }
      });
    },
    getAreaList() {
      axios.get("/api/ics/district?per_page=9999").then((res) => {
        if (res.message === "success") {
          this.arealist = res.data.data;
        }
      });
    },
    getupload(file) {
      this.build_pic = file;
      this.buildpic.push(file);
    },
    remove(file) {
      this.buildpic.map((el, index) => {
        if (el == file.uid) {
          this.buildpic.splice(index, 1);
        }
      });
      this.build_pic = "";
    },
    getupload1(file) {
      this.floor_pic = file;
      this.floorpic.push(file);
    },
    remove1(file) {
      this.floorpic.map((el, index) => {
        if (el == file.uid) {
          this.floorpic.splice(index, 1);
        }
      });
      this.floor_pic = "";
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        let data = {
          district_id: values.district_id,
          building_name: values.building_name,
          remark: values.remark,
          building_pic: this.build_pic,
        };
        if (!err) {
          if (this.type == 1) {
            axios.post("/api/ics/building", data).then((res) => {
              if (res.message === "success") {
                this.fromAdd.building_name = "";
                this.fromAdd.remark = "";
                this.$message.success("新增楼宇成功");
                // 成功重新更新列表
                this.buildingList();
                this.visibleAdd = false;
              }
            });
          } else {
            data.id = this.fromAdd.id;
            data.version = this.fromAdd.version;
            axios.patch("/api/ics/building", data).then((res) => {
              if (res.message === "success") {
                this.visibleAdd = false;
                this.$message.success("编辑车位成功");
                this.buildingList(this.fromAdd.id ? this.page : 1);
              }
            });
          }
        }
      });
    },
    //获取楼宇列表
    buildingList() {
      axios.get("/api/ics/building?per_page=9999").then((res) => {
        if (res.message === "success") {
          this.dataSource = res.data.data;
        }
      });
    },
    // ? 楼宇
    // todo 新增
    // 新增modal弹框展开
    AddBuilding(form, type, title) {
      this.title = title;
      this.type = type;
      this.fromAdd = { ...form };
      if (type == 1) {
        this.build_pic = "";
        this.buildpic = [];
        this.form.resetFields();
      } else {
        this.$nextTick(() => {
          if (form.building_pic) {
            let arr = [];
            arr.push(form.building_pic);
            this.buildpic = arr;
            this.build_pic = form.building_pic;
          }
          this.form.setFieldsValue({
            building_name: form.building_name,
            remark: form.remark,
            building_pic: form.building_pic,
            district_id: form.district_id,
          });
        });
      }
      this.visibleAdd = true;
    },
    // 删除区域
    DeleteArea(id, version) {
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/ics/building", {
              params: {
                id: id,
                version: version,
              },
            })
            .then((res) => {
              if (res.message === "success") {
              } // 成功重新更新列表
              that.$message.success("删除成功");
              that.buildingList();
            });
        },
        onCancel() {},
      });
    },
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/ics/building", { params: { building_name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.tenantList(); // 更新表
      }
    },
    //获取楼层列表
    buildingDetailList(id) {
      axios
        .get("/api/ics/buildingDetail?per_page=9999", {
          params: { building_id: id },
        })
        .then((res) => {
          if (res.message === "success") {
            this.dataSourceFloor = res.data.data;
          }
        });
    },
    // ? 楼层
    // 楼层modal弹框数据页面
    floorbtn(record) {
      this.buildid = record.id;
      this.buildingDetailList(record.id);
      this.visibleFloor = true;
    },
    // 新增modal弹框展开
    AddFloor(form, type, title) {
      this.type1 = type;
      this.title1 = title;
      this.floor = { ...form };
      if (type == 1) {
        this.floor_pic = "";
        this.floorpic = [];
        this.form1.resetFields();
      } else {
        this.$nextTick(() => {
          if (form.floor_pic) {
            let arr = [];
            arr.push(form.floor_pic);
            this.floorpic = arr;
            this.floor_pic = form.floor_pic;
          }
          this.form1.setFieldsValue({
            floor_num: form.floor_num,
            floor_name: form.floor_name,
            floor_pic: form.floor_pic,
          });
        });
      }

      this.visibleFloorAdd = true;
    },
    // 删除区域
    DeleteFloor(id, version) {
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/ics/buildingDetail", {
              params: {
                id: id,
                version: version,
              },
            })
            .then((res) => {
              if (res.message === "success") {
              } // 成功重新更新列表
              that.$message.success("删除楼层成功");
              that.buildingDetailList(that.buildid);
            });
        },
        onCancel() {},
      });
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
    .right {
      margin-left: 40px;
    }
  }
  .bottom {
    display: flex;
    .buildname {
      display: flex;
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
