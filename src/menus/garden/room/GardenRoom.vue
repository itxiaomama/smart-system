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
              @click="Addroom"
            >
              新增
            </a-button>
            <!-- 新增modal弹框 -->
            <a-modal v-model="AddRoom" title="新增园区" width="50%">
              <div class="buildname" style="margin: 20px 140px">
                <span>所属楼宇：</span>
                <a-select
                  default-value="请选择"
                  style="width: 30vw"
                  v-model="Form.building_id"
                  option-label-prop="label"
                  @change="GetFloor()"
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
              </div>
              <div class="buildname" style="margin: 20px 140px">
                <span>所属楼层：</span>
                <a-select
                  default-value="请选择"
                  style="width: 30vw"
                  v-model="Form.building_detail_id"
                  option-label-prop="label"
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
              </div>
              <div class="buildname" style="margin: 20px 140px; width: 60vw">
                <span>房间名称：</span>
                <a-input
                  placeholder="请输入房间名称"
                  style="width: 15vw"
                  v-model="Form.name"
                />
              </div>
              <div class="buildname" style="margin: 20px 168px">
                <span>租金：</span>
                <a-input-number
                  placeholder="请输入租金"
                  style="width: 10vw"
                  v-model="Form.rent"
                />
                <a-select
                  placeholder="请选择"
                  style="width: 5vw"
                  v-model="Form.rent_type"
                >
                  <a-select-option value="1"> 元/㎡/天 </a-select-option>
                  <a-select-option value="2"> 元/㎡/月 </a-select-option>
                  <a-select-option value="3"> 元/天 </a-select-option>
                  <a-select-option value="4"> 元/月 </a-select-option>
                </a-select>
              </div>
              <div class="buildname" style="margin: 20px 154px">
                <span>物业费：</span>
                <a-input-number
                  placeholder="请输入物业费"
                  style="width: 10vw"
                  v-model="Form.management_fee"
                />
                <a-select
                  placeholder="请选择"
                  style="width: 5vw"
                  v-model="Form.management_fee_type"
                >
                  <a-select-option value="1"> 元/㎡/天 </a-select-option>
                  <a-select-option value="2"> 元/㎡/月 </a-select-option>
                  <a-select-option value="3"> 元/天 </a-select-option>
                  <a-select-option value="4"> 元/月 </a-select-option>
                </a-select>
              </div>
              <div class="buildname" style="margin: 20px 154px">
                <span>能耗费：</span>
                <a-input-number
                  placeholder="请输入能耗费"
                  style="width: 10vw"
                  v-model="Form.energy_fee"
                />
                <a-select
                  placeholder="请选择"
                  style="width: 5vw"
                  v-model="Form.energy_fee_type"
                >
                  <a-select-option value="1"> 元/㎡/天 </a-select-option>
                  <a-select-option value="2"> 元/㎡/月 </a-select-option>
                  <a-select-option value="3"> 元/天 </a-select-option>
                  <a-select-option value="4"> 元/月 </a-select-option>
                </a-select>
              </div>
              <div class="buildname" style="margin: 20px 70px; width: 60vw">
                <span>房间面积（平方米）：</span>
                <a-input
                  placeholder="请输入房间名称"
                  style="width: 15vw"
                  v-model="Form.area"
                />
                <div style="margin: 10px 140px">
                  <a-checkbox v-model="Form.can_be_divided">
                    可分割
                  </a-checkbox>
                </div>
              </div>
              <div class="buildname" style="margin: 20px 70px; width: 60vw">
                <span>收租面积（平方米）：</span>
                <a-input
                  placeholder="请输入房间名称"
                  style="width: 15vw"
                  v-model="Form.rent_area"
                />
              </div>
              <div class="buildname" style="margin: 20px 70px; width: 60vw">
                <span>公摊面积（平方米）：</span>
                <a-input
                  placeholder="请输入房间名称"
                  style="width: 15vw"
                  v-model="Form.common_area"
                />
              </div>
              <div class="buildname" style="margin: 20px 168px">
                <span>房型：</span>
                <a-select
                  placeholder="请选择"
                  style="width: 20vw"
                  v-model="Form.layout"
                >
                  <a-select-option value="1"> loft </a-select-option>
                  <a-select-option value="2"> 商业配套 </a-select-option>
                  <a-select-option value="3"> 办公场所 </a-select-option>
                  <a-select-option value="4"> 其他 </a-select-option>
                </a-select>
              </div>
              <div class="buildname" style="margin: 20px 168px; width: 60vw">
                <span>层高：</span>
                <a-input
                  placeholder="请输入房间名称"
                  style="width: 15vw"
                  v-model="Form.floor_height"
                />
              </div>
              <div class="buildname" style="margin: 20px 140px; width: 60vw">
                <span>可住日期：</span>
                <a-date-picker
                  placeholder="请输入房间名称"
                  style="width: 15vw"
                  v-model="Form.available_from"
                />
              </div>
              <div class="buildname" style="margin: 20px 140px">
                <span>装修类型：</span>
                <a-select
                  placeholder="请选择"
                  style="width: 20vw"
                  v-model="Form.decoration_type"
                >
                  <a-select-option value="1"> 简装 </a-select-option>
                  <a-select-option value="2"> 精装 </a-select-option>
                  <a-select-option value="3"> 毛坯房 </a-select-option>
                </a-select>
              </div>
              <div class="buildname" style="margin: 20px 168px; width: 60vw">
                <span>奖金：</span>
                <a-input
                  placeholder="请输入房间名称"
                  style="width: 15vw"
                  v-model="Form.bonus"
                />
              </div>
              <div class="buildname" style="margin: 20px 112px; display: flex">
                <span>上传园区小图：</span>
                <div>
                  <el-upload action="#" list-type="picture-card" :limit="1">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <img width="100%" alt="small_pic" />
                </div>
              </div>
              <div class="buildname" style="margin: 20px 82px; display: flex">
                <span>上传园区banner图：</span>
                <div>
                  <el-upload action="#" list-type="picture-card" :limit="1">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <img width="100%" alt="banner_images" />
                </div>
              </div>
              <div class="buildname" style="margin: 20px 140px; display: flex">
                <span>园区简介：</span>
                <a-textarea
                  placeholder="请输入园区简介"
                  :rows="4"
                  style="width: 31vw"
                  v-model="Form.brief_intro"
                />
              </div>
              <!-- 确定按钮 -->
              <div
                class="btnant"
                style="
                  padding: 10px 16px;
                  text-align: right;
                  background: transparent;
                  border-top: 1px solid #e8e8e8;
                  border-radius: 0 0 4px 4px;
                "
              >
                <a-button @click="AddroomUp" style="margin-right: 20px"
                  >取消</a-button
                >
                <a-button type="primary" @click="AddroomSure">确定</a-button>
              </div>
            </a-modal>
          </div>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :data-source="dataSource"
              :columns="columns"
              :rowKey="(record, id) => id"
              :pagination="pagination"
            >
              <a slot="belong" slot-scope="text">{{ text }}</a>
              <!-- 状态开关 -->
              <span slot="putaway" slot-scope="text, record">
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
              <template slot="operation" slot-scope="text, scoped">
                <!-- 编辑 -->
                <a href="javascript:;" @click="Editroom(scoped)">
                  <a-icon type="edit" theme="twoTone" />编辑
                </a>
                <!-- 编辑modal弹框 -->
                <a-modal v-model="EditRoom" title="编辑园区" width="50%">
                  <div class="buildname" style="margin: 20px 140px">
                    <span>所属楼宇：</span>
                    <a-select
                      default-value="请选择"
                      style="width: 30vw"
                      v-model="FormEdit.building_id"
                      option-label-prop="label"
                      @change="GetFloor()"
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
                  </div>
                  <div class="buildname" style="margin: 20px 140px">
                    <span>所属楼层：</span>
                    <a-select
                      default-value="请选择"
                      style="width: 30vw"
                      v-model="FormEdit.building_detail_id"
                      option-label-prop="label"
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
                  </div>
                  <div
                    class="buildname"
                    style="margin: 20px 140px; width: 60vw"
                  >
                    <span>房间名称：</span>
                    <a-input
                      placeholder="请输入房间名称"
                      style="width: 15vw"
                      v-model="FormEdit.name"
                    />
                  </div>
                  <div class="buildname" style="margin: 20px 168px">
                    <span>租金：</span>
                    <a-input-number
                      placeholder="请输入租金"
                      style="width: 10vw"
                      v-model="FormEdit.rent"
                    />
                    <a-select
                      placeholder="请选择"
                      style="width: 5vw"
                      v-model="FormEdit.rent_type"
                    >
                      <a-select-option value="1"> 元/㎡/天 </a-select-option>
                      <a-select-option value="2"> 元/㎡/月 </a-select-option>
                      <a-select-option value="3"> 元/天 </a-select-option>
                      <a-select-option value="4"> 元/月 </a-select-option>
                    </a-select>
                  </div>
                  <div class="buildname" style="margin: 20px 154px">
                    <span>物业费：</span>
                    <a-input-number
                      placeholder="请输入物业费"
                      style="width: 10vw"
                      v-model="FormEdit.management_fee"
                    />
                    <a-select
                      placeholder="请选择"
                      style="width: 5vw"
                      v-model="FormEdit.management_fee_type"
                    >
                      <a-select-option value="1"> 元/㎡/天 </a-select-option>
                      <a-select-option value="2"> 元/㎡/月 </a-select-option>
                      <a-select-option value="3"> 元/天 </a-select-option>
                      <a-select-option value="4"> 元/月 </a-select-option>
                    </a-select>
                  </div>
                  <div class="buildname" style="margin: 20px 154px">
                    <span>能耗费：</span>
                    <a-input-number
                      placeholder="请输入能耗费"
                      style="width: 10vw"
                      v-model="FormEdit.energy_fee"
                    />
                    <a-select
                      placeholder="请选择"
                      style="width: 5vw"
                      v-model="FormEdit.energy_fee_type"
                    >
                      <a-select-option value="1"> 元/㎡/天 </a-select-option>
                      <a-select-option value="2"> 元/㎡/月 </a-select-option>
                      <a-select-option value="3"> 元/天 </a-select-option>
                      <a-select-option value="4"> 元/月 </a-select-option>
                    </a-select>
                  </div>
                  <div class="buildname" style="margin: 20px 70px; width: 60vw">
                    <span>房间面积（平方米）：</span>
                    <a-input
                      placeholder="请输入房间名称"
                      style="width: 15vw"
                      v-model="FormEdit.area"
                    />
                    <div style="margin: 10px 140px">
                      <a-checkbox v-model="FormEdit.can_be_divided">
                        可分割
                      </a-checkbox>
                    </div>
                  </div>
                  <div class="buildname" style="margin: 20px 70px; width: 60vw">
                    <span>收租面积（平方米）：</span>
                    <a-input
                      placeholder="请输入房间名称"
                      style="width: 15vw"
                      v-model="FormEdit.rent_area"
                    />
                  </div>
                  <div class="buildname" style="margin: 20px 70px; width: 60vw">
                    <span>公摊面积（平方米）：</span>
                    <a-input
                      placeholder="请输入房间名称"
                      style="width: 15vw"
                      v-model="FormEdit.common_area"
                    />
                  </div>
                  <div class="buildname" style="margin: 20px 168px">
                    <span>房型：</span>
                    <a-select
                      placeholder="请选择"
                      style="width: 20vw"
                      v-model="FormEdit.layout"
                    >
                      <a-select-option value="1"> loft </a-select-option>
                      <a-select-option value="2"> 商业配套 </a-select-option>
                      <a-select-option value="3"> 办公场所 </a-select-option>
                      <a-select-option value="4"> 其他 </a-select-option>
                    </a-select>
                  </div>
                  <div
                    class="buildname"
                    style="margin: 20px 168px; width: 60vw"
                  >
                    <span>层高：</span>
                    <a-input
                      placeholder="请输入房间名称"
                      style="width: 15vw"
                      v-model="FormEdit.floor_height"
                    />
                  </div>
                  <div
                    class="buildname"
                    style="margin: 20px 140px; width: 60vw"
                  >
                    <span>可住日期：</span>
                    <a-date-picker
                      placeholder="请输入房间名称"
                      style="width: 15vw"
                      v-model="FormEdit.available_from"
                    />
                  </div>
                  <div class="buildname" style="margin: 20px 140px">
                    <span>装修类型：</span>
                    <a-select
                      placeholder="请选择"
                      style="width: 20vw"
                      v-model="FormEdit.decoration_type"
                    >
                      <a-select-option value="1"> 简装 </a-select-option>
                      <a-select-option value="2"> 精装 </a-select-option>
                      <a-select-option value="3"> 毛坯房 </a-select-option>
                    </a-select>
                  </div>
                  <div
                    class="buildname"
                    style="margin: 20px 168px; width: 60vw"
                  >
                    <span>奖金：</span>
                    <a-input
                      placeholder="请输入房间名称"
                      style="width: 15vw"
                      v-model="FormEdit.bonus"
                    />
                  </div>
                  <div
                    class="buildname"
                    style="margin: 20px 112px; display: flex"
                  >
                    <span>上传园区小图：</span>
                    <div>
                      <el-upload action="#" list-type="picture-card" :limit="1">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <img width="100%" alt="small_pic" />
                    </div>
                  </div>
                  <div
                    class="buildname"
                    style="margin: 20px 82px; display: flex"
                  >
                    <span>上传园区banner图：</span>
                    <div>
                      <el-upload action="#" list-type="picture-card" :limit="1">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <img width="100%" alt="banner_images" />
                    </div>
                  </div>
                  <div
                    class="buildname"
                    style="margin: 20px 140px; display: flex"
                  >
                    <span>园区简介：</span>
                    <a-textarea
                      placeholder="请输入园区简介"
                      :rows="4"
                      style="width: 31vw"
                      v-model="FormEdit.brief_intro"
                    />
                  </div>
                  <!-- 确定按钮 -->
                  <div
                    class="btnant"
                    style="
                      padding: 10px 16px;
                      text-align: right;
                      background: transparent;
                      border-top: 1px solid #e8e8e8;
                      border-radius: 0 0 4px 4px;
                    "
                  >
                    <a-button @click="EditroomUp" style="margin-right: 20px"
                      >取消</a-button
                    >
                    <a-button type="primary" @click="EditroomSure"
                      >确定</a-button
                    >
                  </div>
                </a-modal>
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "GardenRoom",
  data() {
    return {
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
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
  mounted() {
    this.GetFloor(); //新增之楼层选项
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
  },
  methods: {
    // 获取房间列表数据
    roomList() {
      axios.get("/api/ics/room?per_page=9999").then((res) => {
        if (res.message === "success") {
          this.dataSource = res.data.data;
        }
      });
    },
    async switchChange(checked, id, version, name) {
      let obj = { id };
      obj[name] = checked ? 1 : 0;
      axios
        .patch("/api/ics/room/status", obj, {
          params: { version: version },
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
    GetFloor() {
      axios.get("/api/ics/buildingDetail").then((res) => {
        if (res.message === "success") {
          this.FloorOptions = res.data.data;
        }
      });
    },
    // 新增modal弹框显示
    Addroom() {
      this.AddRoom = true;
      this.Form = { building_id: "" };
    },
    // 新增确认
    AddroomSure() {
      axios.post("/api/ics/room", this.Form).then((res) => {
        if (res.message === "success") {
          this.$message.success("新增房间成功");
          // 成功重新更新列表
          this.roomList();
          this.AddRoom = false;
        }
      });
    },
    // 取消新增
    AddroomUp() {
      this.AddRoom = false;
    },
    //todo 删除//
    // 删除房间
    Deleteroom(id, version) {
      axios
        .delete("/api/ics/room", {
          params: {
            id: id,
            version: version,
          },
        })
        .then((res) => {
          if (res.status_code === 200) {
          }
          // 成功重新更新列表
          this.$message.success("删除房间成功");
          this.roomList();
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
  width: 87.3vw;
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
}
</style>
