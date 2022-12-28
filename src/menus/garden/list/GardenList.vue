<template>
  <div class="wrap">
    <div class="wrapA">
      <div class="top">
        <div class="left">
          <!-- 搜索 -->
          <a-input-search
            placeholder="请输入园区名称"
            style="width: 200px; margin-right: 20px"
            @click="ShowEdit(true)"
            v-model="inputVal"
          />
        </div>
        <div class="bottom">
          <!-- 新增 -->
          <a-button
            type="primary"
            style="margin-bottom: 20px"
            @click="Addpark({}, 1, '新增园区')"
          >
            新增
          </a-button>
        </div>
      </div>
      <div class="content">
        <div>
          <a-table
            bordered
            :data-source="dataSource"
            :columns="columns"
            rowKey="id"
            :pagination="pagination"
          >
            <template slot="operation" slot-scope="text, scoped">
              <!-- 编辑 -->
              <a href="javascript:;" @click="Addpark(scoped, 2, '编辑园区')">
                <a-icon type="edit" theme="twoTone" />编辑
              </a>
              <a-divider type="vertical" />
              <!-- 删除 -->
              <a
                href="javascript:;"
                @click="Deletepark(scoped.id, scoped.version)"
              >
                <a-icon type="delete" theme="twoTone" />删除</a
              >
            </template>
            <a slot="park_name" slot-scope="text">{{ text }}</a>
            <!-- 状态开关 -->
            <span slot="news" slot-scope="text, record">
              <a-switch
                checked-children="是"
                un-checked-children="否"
                :checked="record.is_marketable==0?false:true"
                @change="switchChange(record)"
              />
            </span>
          </a-table>
        </div>
      </div>
    </div>

    <!-- 新增modal弹框 -->
    <a-modal
      v-model="visiblepark"
      :title="title"
      @ok="handleSubmit"
      width="50%"
      class="bigmodal"
    >
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="园区名称：">
          <a-input
            v-decorator="[
              'park_name',
              {
                rules: [{ required: true, message: '请输入园区名称！' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="园区面积：">
          <a-input
            type="number"
            v-decorator="[
              'park_area',
              {
                rules: [{ required: true, message: '请输入园区面积！' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="园区总房间数：">
          <a-input type="number" v-decorator="['room_numbers']" />
        </a-form-item>

        <a-form-item label="上传园区小图：">
          <uploadimgVue
            v-decorator="['small_pic']"
            :FileList="smallPic"
            :limit="1"
            @upload="getupload"
            @remove="remove"
          />
        </a-form-item>
        <a-form-item label="上传园区banner图：">
          <uploadimgVue
            :FileList="bannerlist"
            :limit="5"
            @upload="getupload1"
            @remove="remove1"
            v-decorator="['banner_images']"
          />
        </a-form-item>
        <a-form-item label="园区简介：">
          <a-input type="textarea" v-decorator="['brief_intro']" />
        </a-form-item>

        <a-form-item label="经度：">
          <a-input
            type="number"
            v-decorator="[
              'lng',
              {
                rules: [{ required: true, message: '请输入经度！' }],
              },
            ]"
          />
        </a-form-item>

        <a-form-item label="纬度：">
          <a-input
            type="number"
            v-decorator="[
              'lat',
              {
                rules: [{ required: true, message: '请输入纬度！' }],
              },
            ]"
          />
        </a-form-item>

        <a-form-item label="租金范围（起）：">
          <a-row class="krow">
            <a-form-item>
              <a-input
                style="text-align: center; width: 200px"
                placeholder="租金范围"
                v-decorator="[
                  'low_rent',
                  {
                    rules: [{ required: true, message: '请输入租金！' }],
                  },
                ]"
              />
              <a-input
                placeholder="~"
                disabled
                style="background: #fff; width: 30px"
              />
            </a-form-item>

            <a-form-item>
              <a-input
                style="text-align: center; border-left: 0; width: 200px"
                placeholder="租金范围"
                v-decorator="[
                  'high_rent',
                  {
                    rules: [{ required: true, message: '请输入租金！' }],
                  },
                ]"
              />
            </a-form-item>

            <a-form-item>
              <a-select v-decorator="['rent_type', { initialValue: '1' }]">
                <a-select-option value="1">元/㎡/天 </a-select-option>
                <a-select-option value="2"> 元/㎡/月 </a-select-option>
                <a-select-option value="3"> 元/天 </a-select-option>
                <a-select-option value="4"> 元/月 </a-select-option>
              </a-select>
            </a-form-item>
          </a-row>
        </a-form-item>

        <a-form-item label="园区地址：">
          <a-input
            v-decorator="[
              'address',
              {
                rules: [{ required: true, message: '园区地址不能为空！' }],
              },
            ]"
          />
        </a-form-item>

        <a-form-item label="配套服务：">
          <a-input
            type="textarea"
            v-decorator="[
              'facilities',
              {
                rules: [{ required: true, message: '请输入配套服务！' }],
              },
            ]"
          />
        </a-form-item>

        <a-form-item label="交通：">
          <a-input type="textarea" v-decorator="['traffic']" />
        </a-form-item>

        <a-form-item label="停车费（元/小时）：">
          <a-input
            type="number"
            v-decorator="['parking_fee', { initialValue: 0 }]"
          />
        </a-form-item>

        <a-form-item label="园区图文介绍：">
          <keditor @change="change" v-model="introduction" />
        </a-form-item>
        <!-- 确定按钮 -->
        <!-- <template slot="footer">
          <div class="btnant">
            <a-button @click="AddparkUp" style="margin-right: 20px"
              >取消</a-button
            >
            <a-button type="primary" @click="AddparkSure">确定</a-button>
          </div>
        </template> -->
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import axios from "axios";
import uploadimgVue from "@/components/common/uploadimg.vue";
import keditor from "@/components/common/wangeditor.vue";
export default {
  name: "GardenList",
  components: {
    uploadimgVue,
    keditor,
  },
  data() {
    return {
      smallPic: [],
      bannerlist: [],
      banner: [],
      introduction: "",
      form: this.$form.createForm(this, { name: "coordinated" }),
      type: 1,
      title: "新增园区",
      dataSource: [], //页面数据源
      columns: [
        {
          title: "园区名称",
          dataIndex: "park_name",
          width: " 30%",
        },
        {
          title: "上架时间",
          align: "center",
          dataIndex: "created_at",
          scopedSlots: { customRender: "time" },
          width: " 30%",
        },
        {
          title: "是否上架",
          dataIndex: "is_marketable",
          scopedSlots: { customRender: "news" },
          width: " 20%",
          align: "center",
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
          width: " 20%",
          align: "center",
        },
      ], //table表格表头数据
      visiblepark: false, //新增 modal弹框默认状态
      visibleparkEdit: false, //编辑 modal弹框默认状态
      Form: {}, //存放新增数据
      FormEdit: {}, //存放编辑数据
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
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
          this.parkList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.parkList();
        },
      }, // 页面显示数据分页内容
    };
  },
  created() {
    this.parkList(); // 获取园区列表数据
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
    change(val) {
      this.introduction = val;
    },
    getupload(file) {
      this.Form.small_pic = file;
      this.smallPic.push(file);
    },
    getupload1(file) {
      this.banner.push(file);
      this.bannerlist.push(file);
    },
    remove(file) {
      this.smallPic.map((el, index) => {
        if (el == file.uid) {
          this.smallPic.splice(index, 1);
        }
      });
      this.Form.small_pic = "";
    },
    remove1(file) {
      this.bannerlist.map((el, index) => {
        if (el == file.uid) {
          this.bannerlist.splice(index, 1);
        }
      });
      this.Form.banner_images = "";
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        let data = {
          park_name: values.park_name,
          park_area: values.park_area,
          room_numbers: values.room_numbers,
          small_pic: this.Form.small_pic,
          banner_images: this.bannerlist,
          brief_intro: values.brief_intro,
          lng: values.lng,
          lat: values.lat,
          low_rent: values.low_rent,
          high_rent: values.high_rent,
          rent_type: values.rent_type,
          address: values.address,
          facilities: values.facilities,
          traffic: values.traffic,
          parking_fee: values.parking_fee,
          introduction: this.introduction,
        };
        if (this.bannerlist.length == 0) {
          this.$message.error("请上传banner图");
          return false;
        }
        if (!err) {
          if (this.type == 1) {
            axios.post("/api/ics/park", data).then((res) => {
              if (res.message === "success") {
                this.dataSource = res.data.data;
                this.$message.success("新增园区成功");
                this.visiblepark = false;
                this.parkList();
              }
            });
          } else {
            data.id = this.Form.id;
            data.version = this.Form.version;
            axios.patch("/api/ics/park", data).then(() => {
              this.visiblepark = false;
              this.$message.success("编辑园区成功");
              this.parkList(this.Form.id ? this.page : 1);
            });
          }
        }
      });
    },
    // 获取园区列表数据
    parkList() {
      axios.get("/api/ics/park").then((res) => {
        this.dataSource = res.data.data;
      });
    },
    // 状态更新
    async switchChange(val) {
      axios
        .patch("/api/ics/park/status",  {
          id:val.id,
          version: val.version,
          is_marketable: val.is_marketable == 0? 1:0
        })
        .then((res) => {
          if (res.status_code == 200) {
            this.parkList(); // 更新表
          }
        });
    },
    //todo 新增
    // 新增modal弹框显示
    Addpark(form, type, title) {
      this.title = title;
      this.type = type;
      this.Form = { ...form };
      if (type == 1) {
        this.introduction = "";
        this.bannerlist = [];
        this.smallPic = [];
        this.form.resetFields();
      } else {
        this.$nextTick(() => {
          this.introduction = form.introduction;
          if (form.small_pic) {
            let arr = [];
            arr.push(form.small_pic);
            this.smallPic = arr;
          }
          if(form.banner_images !== ''){
            this.bannerlist = form.banner_images.split(",");
          }
          
          this.form.setFieldsValue({
            park_name: this.Form.park_name,
            park_area: this.Form.park_area,
            room_numbers: this.Form.room_numbers,
            small_pic: this.Form.small_pic,
            banner_images: this.Form.banner_images,
            brief_intro: this.Form.brief_intro,
            lng: this.Form.lng,
            lat: this.Form.lat,
            low_rent: this.Form.low_rent,
            high_rent: this.Form.high_rent,
            rent_type: JSON.stringify(this.Form.rent_type),
            address: this.Form.address,
            facilities: this.Form.facilities,
            traffic: this.Form.traffic,
            parking_fee: this.Form.parking_fee,
            introduction: this.Form.introduction,
          });
        });
      }
      this.visiblepark = true;
    },
    // 新增确认
    AddparkSure() {
      if (this.type == 1) {
        axios.post("/api/ics/park", this.Form).then((res) => {
          if (res.message === "success") {
            this.dataSource = res.data.data;
            this.$message.success("新增园区成功");
            this.visiblepark = false;
            this.bannerlist = [];
            this.smallPic = [];
            this.banner = [];
            this.introduction = "";
            this.parkList();
          }
        });
      } else {
        axios.patch("/api/ics/park", this.Form).then(() => {
          this.visiblepark = false;
          this.bannerlist = [];
          this.smallPic = [];
          this.banner = [];
          this.$message.success("编辑园区成功");
          this.parkList(this.Form.id ? this.page : 1);
        });
      }
    },
    // 取消新增
    AddparkUp() {
      this.visiblepark = false;
    },
    //todo 删除
    // 删除
    Deletepark(id, version) {
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/ics/park", {
              params: {
                id: id,
                version: version,
              },
            })
            .then((res) => {
              if (res.message === "success") {
              } // 成功重新更新列表
              that.$message.success("删除园区成功");
              that.parkList();
            });
        },
        onCancel() {},
      });
    },
    //todo 编辑
    // 编辑modal弹框显示
    Editpark(scoped) {
      this.visibleparkEdit = true;
      this.FormEdit = { ...scoped };
      this.FormEdit.rent_type = scoped.rent_type.toString();
    },

    // 取消编辑
    FormEditUp() {
      this.visibleparkEdit = false;
    },
    //todo 搜索
    // 搜索
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/ics/park/", { params: { park_name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.parkList(); // 更新表
      }
    },
  },
};
</script>

<style lang="less" scoped>
.ant-input-group-compact {
  display: flex !important;
}
/deep/ .ant-modal-content {
  position: relative;
  background-color: #fff;
  background-clip: padding-box;
  border: 0;
  border-radius: 2px;
  pointer-events: auto;
  max-width: 1000px;
  display: inline-block;
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
  .ouer {
    width: 85vw;
    display: flex;
    margin: 20px auto;
    justify-content: space-evenly;
    .left {
      margin-left: 0px;
      .inpD {
        .Dset {
          display: flex;
        }
      }
      .inpF {
        .Fset {
          display: flex;
        }
      }
    }
    .right {
      .inpE {
        .Eset {
          display: flex;
        }
      }
      .inpF {
        .Fset {
          display: flex;
        }
      }
      .inpI {
        display: flex;
        span {
          margin-right: 8px;
        }
        .scope {
          display: flex;
          width: 17vw;
          height: 2.1rem;
          background-color: rgb(255, 255, 255);
          border: 1px solid rgb(224, 227, 228);
          border-right: 0;
          border-radius: 5px;
          span {
            color: rgb(116, 113, 113);
            margin-top: 4px;
            margin-left: 0px;
          }
        }
      }
    }
  }
}
</style>
