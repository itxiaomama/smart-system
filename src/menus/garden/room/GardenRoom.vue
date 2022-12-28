<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="top">
          <!-- 搜索 -->
          <div class="left">
            <a-input-search
              placeholder="请输入房间名称"
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
              @click="Addroom({}, 1, '新增房间')"
            >
              新增
            </a-button>

            <a-radio-group
              class="kradio"
              v-model="mode"
              :style="{ marginBottom: '8px' }"
              @change="tabit"
            >
              <a-radio-button value="1"> 列表模式 </a-radio-button>
              <a-radio-button value="2"> 房态模式 </a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <div class="content" v-if="mode == 1">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :data-source="dataSource"
              :columns="columns"
              rowKey="id"
              :pagination="pagination"
            >
              <!-- 状态开关 -->
              <span slot="putaway" slot-scope="text, record">
                <a-switch
                  checked-children="是"
                  un-checked-children="否"
                  :checked="record.is_marketable == 0 ? false : true"
                  @change="switchChange(record)"
                />
                
              </span>
              <template slot="operation" slot-scope="text, scoped">
                <!-- 编辑 -->
                <a href="javascript:;" @click="Addroom(scoped, 2, '编辑房间')">
                  <a-icon type="edit" theme="twoTone" />编辑
                </a>
                <a-divider type="vertical" />
                <!-- 删除 -->
                <a
                  href="javascript:;"
                  @click="Deleteroom(scoped.id, scoped.version)"
                >
                  <a-icon type="delete" theme="twoTone" />删除</a
                >
              </template>
            </a-table>
          </div>
        </div>
        <div v-else>
          <div v-for="(item, index) in list" :key="index">
            <h2>{{ item.park_name }}</h2>
            <div v-for="val in item.building_list" :key="val.id">
              <div v-for="el in val.building_detail_list">
              <h3 style="margin:10px 0;background:#fafbfc;line-height: 2;padding-left: 10px;">{{ val.building_name }}{{ el.floor_name }}</h3>
              <div class="cardwrap">
                <a-row>
                  <a-col
                    :span="4"
                    v-for="(value, idx) in el.room_list"
                    :key="value.id"
                  >
                    <a-card @click="getroominfo(value.room_id)">
                      <div>{{ value.room_name }}</div>
                      <div>{{ value.area }}  -{{value.rent}}{{value.rent_type}}</div>
                    </a-card>
                  </a-col>
                </a-row>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增modal弹框 -->
    <a-modal
      v-model="AddRoom"
      :title="title"
      width="50%"
      @ok="handleSubmit"
      class="bigmodal"
    >
      <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
        <a-form-item label="所属楼宇：">
          <a-select
            @change="getbuildid"
            v-decorator="[
              'building_id',
              {
                rules: [{ required: true, message: '请选择楼宇!' }],
              },
            ]"
            placeholder="请选择"
          >
            <a-select-option
              v-for="item in BuildOptions"
              :key="item.id"
              :label="item.building_name"
              :value="item.id"
            >
              <span role="img" :aria-label="item.building_name">
                {{ item.building_name }}
              </span>
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="所属楼层：">
          <a-select
            :disabled="isbuild"
            v-decorator="[
              'building_detail_id',
              {
                rules: [{ required: true, message: '请选择楼宇!' }],
              },
            ]"
            placeholder="请选择"
          >
            <a-select-option
              v-for="item in FloorOptions"
              :key="item.id"
              :label="item.floor_name"
              :value="item.id"
            >
              <span role="img" :aria-label="item.floor_name">
                {{ item.floor_name }}
              </span>
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="房间名称：">
          <a-input v-decorator="['name']" />
        </a-form-item>

        <a-form-item label="租金：">
          <div class="flex krow">
            <a-input
              type="number"
              v-decorator="[
                'rent',
                {
                  rules: [{ required: true, message: '请输入房间名称!' }],
                },
              ]"
            />
            <a-form-item>
              <a-select v-decorator="['rent_type', { initialValue: '1' }]">
                <a-select-option value="1">元/㎡/天 </a-select-option>
                <a-select-option value="2"> 元/㎡/月 </a-select-option>
                <a-select-option value="3"> 元/天 </a-select-option>
                <a-select-option value="4"> 元/月 </a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-form-item>

        <a-form-item label="物业费：">
          <div class="flex krow">
            <a-input
              type="number"
              v-decorator="[
                'management_fee',
                {
                  rules: [{ required: true, message: '请输入物业费!' }],
                },
              ]"
            />
            <a-form-item>
              <a-select
                v-decorator="['management_fee_type', { initialValue: '1' }]"
              >
                <a-select-option value="1">元/㎡/天 </a-select-option>
                <a-select-option value="2"> 元/㎡/月 </a-select-option>
                <a-select-option value="3"> 元/天 </a-select-option>
                <a-select-option value="4"> 元/月 </a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-form-item>
        <a-form-item label="能耗费：">
          <div class="flex krow">
            <a-input
              v-decorator="[
                'energy_fee',
                {
                  rules: [{ required: true, message: '请输入能耗费!' }],
                },
              ]"
            />
            <a-form-item>
              <a-select
                v-decorator="['energy_fee_type', { initialValue: '1' }]"
              >
                <a-select-option value="1">元/㎡/天 </a-select-option>
                <a-select-option value="2"> 元/㎡/月 </a-select-option>
                <a-select-option value="3"> 元/天 </a-select-option>
                <a-select-option value="4"> 元/月 </a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-form-item>
        <a-form-item label="房间面积（平方米）：">
          <a-input
            type="number"
            v-decorator="[
              'area',
              {
                rules: [{ required: true, message: '请输入房间名称!' }],
              },
            ]"
          />
          <a-form-item>
            <a-checkbox-group v-decorator="['can_be_divided']">
              <a-checkbox value="1"> 可分割 </a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-form-item>
        <a-form-item label="收租面积（平方米）：">
          <a-input
            type="number"
            v-decorator="[
              'rent_area',
              {
                rules: [{ required: true, message: '请输入房间名称!' }],
              },
            ]"
          />
        </a-form-item>

        <a-form-item label="公摊面积（平方米）：">
          <a-input
            type="number"
            v-decorator="[
              'common_area',
              {
                rules: [{ required: true, message: '请输入房间名称!' }],
              },
            ]"
          />
        </a-form-item>

        <a-form-item label="房型：">
          <a-select
            v-decorator="[
              'layout',
              {
                rules: [{ required: true, message: '请选择楼宇!' }],
              },
            ]"
            placeholder="请选择"
          >
            <a-select-option value="1"> loft </a-select-option>
            <a-select-option value="2"> 商业配套 </a-select-option>
            <a-select-option value="3"> 办公场所 </a-select-option>
            <a-select-option value="4"> 其他 </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="层高：">
          <a-input type="number" v-decorator="['floor_height']" />
        </a-form-item>

        <a-form-item label="可入驻日期：">
          <a-date-picker
            v-decorator="[
              'available_from',
              {
                rules: [{ required: true, message: '请输入房间名称!' }],
              },
            ]"
            style="width: 100%"
          />
        </a-form-item>

        <a-form-item label="装修类型：">
          <a-select
            v-decorator="[
              'decoration_type',
              {
                rules: [{ required: true, message: '请选择楼宇!' }],
              },
            ]"
            placeholder="请选择"
          >
            <a-select-option value="1"> 简装 </a-select-option>
            <a-select-option value="2"> 精装 </a-select-option>
            <a-select-option value="3"> 毛坯房 </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="奖金：">
          <a-input type="number" v-decorator="['bonus']" />
        </a-form-item>
        <a-form-item label="上传房间小图：">
          <uploadimgVue
            :FileList="smallpic"
            :limit="1"
            @upload="getupload"
            @remove="remove"
            v-decorator="['small_pic']"
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

        <a-form-item label="房间简介（可选）：">
          <a-input type="textarea" v-decorator="['brief_intro']" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import uploadimgVue from "@/components/common/uploadimg.vue";
export default {
  name: "GardenRoom",
  components: {
    uploadimgVue,
  },
  data() {
    return {
      ismap: 0,
      checked: false,
      smallpic: [],
      small_pic: "",
      bannerlist: [],
      title: "新增房间",
      form: this.$form.createForm(this, { name: "coordinated" }),
      type: 1,
      buildid: null,
      isbuild: true,
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      mode: "1",
      list: [],
      columns: [
        {
          title: "所属园区",
          dataIndex: "park_name",
          width: "10%",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "房间名称",
          dataIndex: "name",
          width: "6%",
          align: "center",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "所属楼宇",
          dataIndex: "building_name",
          width: "8%",
          align: "center",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "所属楼层",
          dataIndex: "building_detail_name",
          width: "6%",
          align: "center",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "面积",
          dataIndex: "area",
          width: "6%",
          align: "center",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "收租面积",
          dataIndex: "rent_area",
          width: "6%",
          align: "center",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "公摊面积",
          dataIndex: "common_area",
          width: "6%",
          align: "center",
          scopedSlots: { customRender: "equally" },
        },
        {
          title: "租赁状态",
          dataIndex: "status_name",
          width: "6%",
          align: "center",
          scopedSlots: { customRender: "lease" },
        },
        {
          title: "租金",
          dataIndex: "rent",
          width: "6%",
          align: "center",
          scopedSlots: { customRender: "rent" },
        },
        {
          title: "租金类型",
          dataIndex: "rent_type_name",
          width: "6%",
          align: "center",
          scopedSlots: { customRender: "renttype" },
        },
        {
          title: "可住日期",
          dataIndex: "available_from",
          align: "center",
          scopedSlots: { customRender: "time" },
          width: "15%",
        },
        {
          title: "是否上架",
          width: "7%",
          align: "center",
          dataIndex: "is_marketable",
          scopedSlots: { customRender: "putaway" },
        },
        {
          title: "操作",
          dataIndex: "operation",
          width: "12%",
          align: "center",
          scopedSlots: { customRender: "operation" },
        },
      ], //页面数据表头信息
      dataSource: [], //页面数据源
      Form: {}, //存放新增数据
      FormEdit: {}, //存放新增数据
      AddRoom: false, //新增modal弹框默认状态
      EditRoom: false, //编辑modal弹框默认状态
      BuildOptions: [], // 存放 楼宇选择 数据
      FloorOptions: [], // 存放 楼层选择 数据
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
          this.roomList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.roomList();
        },
      }, // 页面显示数据分页内容
    };
  },
  created() {
    this.roomList(); // 获取房间列表数据
    this.GetBuilding(); //新增之楼宇选项
  },
  watch: {
    // 监听搜索框是否有内容自动搜索
    inputVal(newValue) {
      if (newValue) {
        this.ShowEdit(true);
      } else {
        this.ShowEdit(false);
      }
    },
    buildid(newval, oldval) {
      this.isbuild = false;
      this.GetFloor(newval);
    },
  },
  methods: {
    onChange1(e) {
      this.checked = e.target.checked;
    },
    getupload(file) {
      this.small_pic = file;
      this.smallpic.push(file);
    },
    getupload1(file) {
      this.bannerlist.push(file);
    },
    remove(file) {
      this.smallPic.map((el, index) => {
        if (el == file.uid) {
          this.smallPic.splice(index, 1);
        }
      });
      this.small_pic = "";
    },
    remove1(file) {
      this.bannerlist.map((el, index) => {
        if (el == file.uid) {
          this.bannerlist.splice(index, 1);
        }
      });
    },
    getbuildid(val) {
      this.buildid = val;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        let data = {
          building_id: values.building_id,
          building_detail_id: values.building_detail_id,
          name: values.name,
          rent: values.rent,
          rent_type: values.rent_type,
          management_fee: values.management_fee,
          management_fee_type: values.management_fee_type,
          energy_fee: values.energy_fee,
          energy_fee_type: values.energy_fee_type,
          area: values.area,
          can_be_divided: values.can_be_divided.length == 0 ? 0 : 1,
          rent_area: values.rent_area,
          common_area: values.common_area,
          layout: values.layout,
          floor_height: values.floor_height,
          available_from: values.available_from,
          decoration_type: values.decoration_type,
          bonus: values.bonus,
          small_pic: this.small_pic,
          banner_images: this.bannerlist,
          brief_intro: values.brief_intro,
        };
        if (this.bannerlist.length == 0) {
          this.$message.error("请上传banner图");
          return false;
        }
        if (!err) {
          if (this.type == 1) {
            axios.post("/api/ics/room", data).then((res) => {
              this.$message.success("新增房间成功");
              // 成功重新更新列表
              this.roomList();
              this.AddRoom = false;
            });
          } else {
            data.id = this.Form.id;
            data.version = this.Form.version;
            axios.patch("/api/ics/room", data).then((res) => {
              this.$message.success("编辑房间成功");
              // 成功重新更新列表
              this.roomList();
              this.AddRoom = false;
            });
          }
        }
      });
    },
    // 切换
    tabit() {
      this.ismap = 1;
      this.roomList();
    },
    // 获取房间列表数据
    roomList() {
      axios
        .get("/api/ics/room?per_page=9999", {
          params: {
            is_map: this.ismap,
          },
        })
        .then((res) => {
          if (res.message === "success") {
            if (this.ismap == 0) {
              this.dataSource = res.data.data;
            } else {
              this.list = res.data;
            }
          }
        });
    },
    switchChange(val) {
      axios
        .patch("/api/ics/room/status", {
          id:val.id ,
          version: val.version,
          is_marketable: val.is_marketable == 0 ? 1:0
        })
        .then((res) => {
          if (res.status_code == 200) {
            this.roomList();
          }
        });
    },
    //todo 新增//
    // 楼宇选择框内容
    GetBuilding() {
      axios.get("/api/ics/building").then((res) => {
        if (res.message === "success") {
          this.BuildOptions = res.data.data;
        }
      });
    },
    // 楼层选择框内容
    GetFloor(id) {
      axios.get("/api/ics/buildingDetail?building_id=" + id).then((res) => {
        if (res.message === "success") {
          this.FloorOptions = res.data.data;
        }
      });
    },
    getroominfo(id){
      axios.get('/api/ics/room?id='+id).then((res) =>{
        // this.form = res.data ;
        this.Addroom(res.data,2,'编辑房间');
      })
    },
    // 新增modal弹框显示
    Addroom(form, type, title) {
      this.type = type;
      this.title = title;
      this.Form = { ...form };
      if (type == 1) {
        this.bannerlist = [];
        this.small_pic = "";
        this.smallpic = [];
        this.form.resetFields();
      } else {
        this.$nextTick(() => {
          this.buildid = form.building_id;
          this.bannerlist = form.banner_images.split(",");
          if (form.small_pic) {
            let arr = [];
            arr.push(form.small_pic);
            this.smallpic = arr;
            this.small_pic = form.small_pic;
          }
          let checked = [];
          checked.push(JSON.stringify(form.can_be_divided));

          this.form.setFieldsValue({
            building_id: form.building_id,
            building_detail_id: form.building_detail_id,
            name: form.name,
            rent: form.rent,
            rent_type: JSON.stringify(form.rent_type),
            management_fee: form.management_fee,
            management_fee_type: JSON.stringify(form.management_fee_type),
            energy_fee: form.energy_fee,
            energy_fee_type: JSON.stringify(form.energy_fee_type),
            area: form.area,
            can_be_divided: checked,
            rent_area: form.rent_area,
            common_area: form.common_area,
            layout: JSON.stringify(form.layout),
            floor_height: form.floor_height,
            available_from: form.available_from,
            decoration_type: JSON.stringify(form.decoration_type),
            bonus: form.bonus,
            small_pic: form.small_pic,
            banner_images: form.banner_images,
            brief_intro: form.brief_intro,
          });
        });
      }
      this.AddRoom = true;
    },
    // 新增确认
    AddroomSure() {
      if (this.type == 1) {
        axios.post("/api/ics/room", this.Form).then((res) => {
          if (res.message === "success") {
            this.$message.success("新增房间成功");
            // 成功重新更新列表
            this.roomList();
            this.AddRoom = false;
          }
        });
      } else {
        axios.patch("/api/ics/room", this.Form).then((res) => {
          if (res.message === "success") {
            this.$message.success("编辑房间成功");
            // 成功重新更新列表
            this.roomList();
            this.AddRoom = false;
          }
        });
      }
    },
    // 取消新增
    AddroomUp() {
      this.AddRoom = false;
    },
    //todo 删除//
    // 删除房间
    Deleteroom(id, version) {
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/ics/room", {
              params: {
                id: id,
                version: version,
              },
            })
            .then((res) => {
              // 成功重新更新列表
              that.$message.success("删除房间成功");
              that.roomList();
            });
        },
        onCancel() {},
      });
    },
    //todo 编辑//
    // 编辑modal弹框显示
    Editroom(scoped) {
      this.EditRoom = true;
      this.FormEdit = { ...scoped };
      // this.FormEdit.rent_type = record.rent_type_name;
      // this.FormEdit.management_fee_type = record.management_fee_type_name;
      // this.FormEdit.energy_fee_type = record.energy_fee_type_name;
      // this.FormEdit.layout = record.layout.toString();
      // this.FormEdit.decoration_type = record.decoration_type.toString();
    },
    // 编辑确认
    EditroomSure() {
      axios.patch("/api/ics/room", this.FormEdit).then((res) => {
        if (res.message === "success") {
          this.$message.success("编辑房间成功");
          // 成功重新更新列表
          this.roomList();
          this.EditRoom = false;
        }
      });
    },
    // 取消编辑
    EditroomUp() {
      this.EditRoom = false;
    },
    //todo 搜索//
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/ics/room", { params: { name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.roomList(); // 更新表
      }
    },
  },
  computed: {
    // 页面数据选择框是否全选
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
  overflow-y: auto;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
    display: flex;
    .right {
      display: flex;
      margin-left: 20px;
      .state {
        margin-left: 20px;
      }
    }
  }
  .kradio {
    position: absolute;
    right: 30px;
  }
  .cardwrap {
    .ant-card {
      cursor: pointer;
      border-radius: 10px;
      margin: 0 20px 20px 0;
    }
  }
}
</style>
