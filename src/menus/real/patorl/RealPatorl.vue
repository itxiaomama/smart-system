<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="matter" style="margin-top: 0px">
            <a-tabs default-active-key="1">
              <!-- 路线巡更 -->
              <a-tab-pane key="1">
                <div style="display: flex">
                  <!-- 搜索 -->
                  <a-input-search
                    placeholder="请输入巡更点名称"
                    style="width: 200px; margin-right: 40px"
                    @click="SearchPoint(true)"
                    v-model="SearchPointVal"
                  />
                  <!-- 新增 -->
                  <a-button
                    type="primary"
                    @click="AddShowPoint({}, 1, '新建巡更点')"
                    >新增</a-button
                  >
                </div>
                <span slot="tab">
                  <a-icon type="line-chart" />
                  路线巡更
                </span>
                <div class="car" style="margin-top: 20px">
                  <a-table
                    ref="table"
                    bordered
                    :row-selection="rowSelection"
                    :columns="columnsA"
                    :data-source="dataA"
                    rowKey="id"
                    :pagination="PaginationOptPatrolPoint"
                  >
                    <!-- 状态开关 -->
                    <span slot="status" slot-scope="text, record">
                      <a-switch
                        default-checked
                        checked-children="启用"
                        un-checked-children="停用"
                        :checked="record.status == 0 ? false : true"
                        @change="switchChange(record)"
                      />
                    </span>
                    <span slot="actions" slot-scope="text, record">
                      <!-- 编辑 -->
                      <a
                        href="javascript:;"
                        @click="AddShowPoint(record, 2, '编辑巡更点')"
                        ><a-icon type="edit" theme="twoTone" />编辑</a
                      >
                      <a-divider type="vertical" />
                      <!-- 删除 -->
                      <a href="javascript:;" @click="DeletePoint(record)"
                        ><a-icon type="delete" theme="twoTone" />删除</a
                      >
                    </span>
                  </a-table>
                </div>
              </a-tab-pane>
              <!-- 日常巡逻 -->
              <a-tab-pane key="2" style="max-height: 75vh; overflow-y: auto">
                <div style="display: flex; margin-bottom: 20px">
                  <!-- 搜索 -->
                  <a-input-search
                    placeholder="请输入巡逻项目"
                    style="width: 200px; margin-right: 40px"
                    @click="SearchPatrol(true)"
                    v-model="inputPatrolVal"
                  />
                  <!-- 巡逻项目新增  -->
                  <a-button
                    type="primary"
                    @click="patroltypeadd({}, 1, '新增巡逻类型')"
                    >新增</a-button
                  >
                </div>
                <span slot="tab">
                  <a-icon type="tool" />
                  巡防类型
                </span>
                <template>
                  <a-table
                    bordered
                    :columns="columnsB"
                    :data-source="ptlist"
                    rowKey="id"
                    :pagination="PaginationOptTask"
                  >
                    <span slot="status" slot-scope="text, record">
                      <a-switch
                        default-checked
                        checked-children="启用"
                        un-checked-children="停用"
                        :checked="record.status == 0 ? false : true"
                        @change="switchtype(record)"
                      />
                    </span>
                    <span slot="actions" slot-scope="text, record">
                      <!-- 编辑 -->
                      <a
                        href="javascript:;"
                        @click="patroltypeadd(record, 2, '编辑巡逻类型')"
                        ><a-icon type="edit" theme="twoTone" />编辑</a
                      >
                      <a-divider type="vertical" />
                      <!-- 删除 -->
                      <a href="javascript:;" @click="deltype(record)"
                        ><a-icon type="delete" theme="twoTone" />删除</a
                      >
                    </span>
                    
                  </a-table>
                  
                </template>
              </a-tab-pane>
              <!-- 设备巡检 -->
              <a-tab-pane key="3">
                <div style="display: flex">
                  <a-input-search
                    placeholder="快速搜索"
                    style="width: 200px; margin-right: 40px"
                  />
                  <a-button
                    type="primary"
                    @click="dailyTask({}, 1, '新增日常任务')"
                    >新增</a-button
                  >
                </div>
                <span slot="tab">
                  <a-icon type="tool" />
                  日常巡防
                </span>
                <div style="margin-top: 20px">
                  <template>
                    <a-table
                      :columns="columnsC"
                      :data-source="dataB"
                      rowKey="id"
                      class="components-table-demo-nested"
                    >
                    <span slot="status" slot-scope="text">{{statustype[text]}} </span>
                      <a-table
                        slot="expandedRowRender"
                        slot-scope="record"
                        rowKey="id"
                        :columns="innerColumns"
                        :data-source="record.patrol"
                        :pagination="false"
                      >
                        <span slot="status" slot-scope="text">{{statustype[text]}} </span>
                        <span
                          slot="operation"
                          slot-scope="text, record"
                          class="table-operation"
                        >
                          <a @click="dailyTask(record, 2, '编辑日常任务')"
                            > <a-icon type="edit" theme="twoTone" />编辑</a>
                            <a-divider type="vertical" />
                          <a @click="delpatrol(record)"><a-icon type="delete" theme="twoTone" />删除</a>
                          <a-divider type="vertical" />
                          <a @click="dailyTask(record.patrol_type_id, 3, '新增日常任务')"><a-icon type="plus" />新增</a>
                        </span>
                      </a-table>
                    </a-table>
                  </template>
                </div>
              </a-tab-pane>
              <!-- 待巡逻 -->
              <a-tab-pane key="4">
                <div>
                  <a-input-search
                    placeholder="请输入巡逻编号"
                    style="width: 200px; margin-right: 40px"
                    @click="ShowEditD(true)"
                    v-model="inputValD"
                  />
                </div>
                <span slot="tab">
                  <a-icon type="tool" />
                  待巡逻
                </span>
                <div class="car" style="margin-top: 20px">
                  <a-table
                    bordered
                    :row-selection="rowSelection"
                    :columns="columnsD"
                    :data-source="dataD"
                    rowKey="id"
                    :pagination="PaginationOptTask"
                  >
                    <a slot="name" slot-scope="text">{{ text }}</a>
                    <span slot="floor">
                      <a-tag color="cyan">待巡逻</a-tag>
                    </span>
                    <span slot="action">
                      <a-tag color="pink"> 巡逻路线 </a-tag>
                    </span>
                  </a-table>
                </div>
              </a-tab-pane>
              <!-- 已巡逻 -->
              <a-tab-pane key="5">
                <span slot="tab">
                  <a-icon type="tool" />
                  已巡逻
                </span>
                <div class="car">
                  <a-table
                    :row-selection="rowSelection"
                    :columns="columnsE"
                    :data-source="dataE"
                    rowKey="id"
                  >
                    <a slot="name" slot-scope="text">{{ text }}</a>
                    <span slot="actions">
                      <a>编辑</a>
                      <a-divider type="vertical" />
                      <a>删除</a>
                    </span>
                  </a-table>
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </div>
    </div>

    <!-- 巡更点新增modal弹框 -->
    <a-modal v-model="VisiblePoint" :title="title" width="40%">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="巡更点名称：" prop="point_name">
          <a-input v-model="form.point_name" />
        </a-form-model-item>

        <a-form-model-item label="所属楼宇：" prop="building_id">
          <a-select v-model="form.building_id" @change="getbuildid">
            <a-select-option
              v-for="item in BuildOptions"
              :value="item.id"
              :key="item.id"
              >{{ item.building_name }}</a-select-option
            >
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="所属楼层：" prop="building_detail_id">
          <a-select v-model="form.building_detail_id" :disabled="isbuild">
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
        </a-form-model-item>

        <a-form-model-item label="经度：" prop="longitude">
          <a-input v-model="form.longitude" />
        </a-form-model-item>

        <a-form-model-item label="纬度：" prop="latitude">
          <a-input v-model="form.latitude" />
        </a-form-model-item>

        <a-form-model-item label="定位距离：" prop="distance">
          <a-input v-model="form.distance" />
        </a-form-model-item>

        <a-form-model-item label="位置描述：" prop="dis_describe">
          <a-input v-model="form.dis_describe" />
        </a-form-model-item>

        <a-form-model-item label="位置编号：" prop="dis_number">
          <a-input v-model="form.dis_number" />
        </a-form-model-item>

        <a-form-model-item label="备注：" prop="remark">
          <a-input v-model="form.remark" />
        </a-form-model-item>

        <a-form-model-item label="状态：">
          <a-select v-model="form.status" placeholder="请选择">
            <a-select-option value="1"> 正常 </a-select-option>
            <a-select-option value="0"> 停用 </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
      <template slot="footer">
        <div class="btnant">
          <a-button @click="AddPointCancel" style="margin-right: 20px"
            >取消</a-button
          >
          <a-button type="primary" @click="AddPoint()">确定 </a-button>
        </div>
      </template>
    </a-modal>

    <!-- 巡逻项目新增modal弹框  -->
    <a-modal v-model="PatrolVisibleAdd" :title="title" width="35%">
      <a-form-model
        ref="ruleForm1"
        :model="form1"
        :rules="rules1"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="巡更类型：" prop="patrol_type_id">
          <a-select v-model="form1.patrol_type_id">
            <a-select-option
              v-for="item in ptlist"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="巡更内容：" prop="name">
          <a-input v-model="form1.name" />
        </a-form-model-item>

        <a-form-model-item label="处置方法：">
          <a-input v-model="form1.way" />
        </a-form-model-item>

        <a-form-model-item label="备注：" prop="remark">
          <a-input v-model="form1.remark" />
        </a-form-model-item>

        <a-form-model-item label="状态：">
          <a-select v-model="form1.status" placeholder="请选择">
            <a-select-option value="1"> 正常 </a-select-option>
            <a-select-option value="0"> 停用 </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>

      <template slot="footer">
        <div class="btnant">
          <a-button style="margin-right: 20px" @click="AddPatrolUp"
            >取消</a-button
          >
          <a-button type="primary" @click="AddPatrolList">确定</a-button>
        </div>
      </template>
    </a-modal>

    <!-- 巡更类型 -->

    <a-modal v-model="ptvisible" :title="title2" width="35%">
      <a-form-model
        ref="ruleForm2"
        :model="form2"
        :rules="rules2"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="巡更类型：" prop="name">
          <a-input v-model="form2.name" />
        </a-form-model-item>
        <a-form-model-item label="状态：">
          <a-select v-model="form2.status" placeholder="请选择">
            <a-select-option value="1"> 正常 </a-select-option>
            <a-select-option value="0"> 停用 </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>

      <template slot="footer">
        <div class="btnant">
          <a-button style="margin-right: 20px" @click="resettype"
            >取消</a-button
          >
          <a-button type="primary" @click="submittype">确定</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  { title: "巡逻项目", dataIndex: "name", key: "name" },
  { title: "状态", dataIndex: "status", key: "createdAt" },
];


import axios from "axios";
export default {
  name: "RealPatorl",
  data() {
    return {
      statustype:{
        0: '停用',
        1:'正常'
      },
      isbuild: true,
      type: null,
      title: "",
      //? 路线巡更-----------------------------------------------------------------------
      columnsA: [
        {
          title: "巡更点名称",
          dataIndex: "point_name",
          width: "10%",
          align: "center",
          scopedSlots: { customRender: "point_name" },
        },
        {
          title: "所属主体",
          dataIndex: "park_name",
          width: "10%",
          align: "center",
          scopedSlots: { customRender: "park_name" },
        },
        {
          title: "楼栋",
          dataIndex: "building_name",
          width: "15%",
          align: "center",
          scopedSlots: { customRender: "building_name" },
        },
        {
          title: "楼层",
          dataIndex: "building_detail_name",
          width: "5%",
          align: "center",
          scopedSlots: { customRender: "building_detail_name" },
        },
        {
          title: "位置详情",
          dataIndex: "dis_describe",
          width: "20%",
          align: "center",
          scopedSlots: { customRender: "dis_describe" },
        },
        {
          title: "位置编号",
          dataIndex: "dis_number",
          width: "10%",
          align: "center",
          scopedSlots: { customRender: "dis_number" },
        },
        {
          title: "状态",
          dataIndex: "status_name",
          width: "10%",
          align: "center",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "操作",
          dataIndex: "action",
          width: "20%",
          align: "center",
          scopedSlots: { customRender: "actions" },
        },
      ], // 路线巡更table表格表头数据
      dataA: [], //路线巡更数据源
      SearchPointVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      VisiblePoint: false, // 路线巡更 新增 弹窗默认状态
      VisiblePointEdit: false, // 路线巡更 编辑 弹窗默认状态
      fromPoint: {}, // 存放路线巡更 新增 数据
      from: {}, // 存放路线巡更 编辑 数据
      BuildOptions: [], // 存放路线巡更 楼宇选择 数据
      FloorOptions: [], // 存放路线巡更 楼层选择 数据
      PaginationOptPatrolPoint: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10", "15", "20"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.PaginationOptPatrolPoint.defaultCurrent = current;
          this.PaginationOptPatrolPoint.defaultPageSize = pageSize;
          this.PatrolPoint(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.PaginationOptPatrolPoint.defaultCurrent = current;
          this.PaginationOptPatrolPoint.defaultPageSize = size;
          this.PatrolPoint();
        },
      }, // 路线巡更列表分页
      //? 日常巡逻-----------------------------------------------------------------------
      inputPatrolVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      dataB: [], //巡逻项目数据源
      columnsB:[
         { title: "巡逻项目", dataIndex: "name", key: "name" },
        { title: "状态", dataIndex: "status",scopedSlots: { customRender: "status" }, },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "actions" },
        },
      ],
      innerData: [], //巡逻内容数据源
      // 表格分页信息
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [10],
      // 默认每页显示的条数（可修改）
      PageSize: 1,
      PaginationOptPatrol: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10", "15", "20"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.PaginationOptPatrol.defaultCurrent = 1;
          this.PaginationOptPatrol.defaultPageSize = pageSize;
          this.PatrolList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.PaginationOptPatrol.defaultCurrent = current;
          this.PaginationOptPatrol.defaultPageSize = size;
          this.PatrolList();
        },
      }, // 日常巡逻列表分页
      PatrolVisibleAdd: false, // 巡逻项目 新增 弹窗默认状态
      PatrolVisibleEdit: false, // 巡逻项目 编辑 弹窗默认状态
      PatrolAdd: false, // 巡更内容 新增 弹窗默认状态
      PatrolEdit: false, // 巡更内容 编辑 弹窗默认状态
      fromPatrol: {}, // 存放巡逻项目 新增 数据
      fromPatrolEdit: {}, // 存放巡逻项目 编辑 数据
      fromPatrolAdd: {}, // 存放巡更内容 新增 数据
      fromEdit: {}, // 存放巡更内容 编辑 数据
      //? 设备巡检-----------------------------------------------------------------------
      columnsC: [
       { title: "巡逻项目", dataIndex: "name", key: "name" },
        { title: "状态", dataIndex: "status", scopedSlots: { customRender: "status" } },
        // {
        //   title: "操作",
        //   dataIndex: "action",
        //   scopedSlots: { customRender: "actions" },
        // },
      ], // 设备巡检table表格表头数据
      dataC: [], //设备巡检数据源
      //? 待巡逻-----------------------------------------------------------------------
      columnsD: [
        {
          title: "序号",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
        },
        {
          title: "巡逻编号",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "创建日期",
          dataIndex: "created_at",
          scopedSlots: { customRender: "floowday" },
        },
        {
          title: "巡逻开始时间",
          dataIndex: "start_time",
          scopedSlots: { customRender: "floowtime" },
        },
        {
          title: "巡逻结束时间",
          dataIndex: "end_time",
          scopedSlots: { customRender: "belongbuild" },
        },

        {
          title: "状态",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "详情",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ], // 待巡逻table表格表头数据
      dataD: [], //待巡逻数据源
      PaginationOptTask: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10", "15", "20"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.PaginationOptTask.defaultCurrent = current;
          this.PaginationOptTask.defaultPageSize = pageSize;
          this.TaskList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.PaginationOptTask.defaultCurrent = current;
          this.PaginationOptTask.defaultPageSize = size;
          this.TaskList();
        },
      }, // 待巡逻列表分页
      inputValD: "", // 搜索框数据绑定
      totalD: 0, // 总条数，分页时有用
      //? 已巡逻-----------------------------------------------------------------------
      columnsE: [
        {
          title: "序号",
          dataIndex: "",
          scopedSlots: { customRender: "id" },
        },
        {
          title: "巡逻编号",
          dataIndex: "",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "创建日期",
          dataIndex: "",
          scopedSlots: { customRender: "floowday" },
        },
        {
          title: "巡逻开始时间",
          dataIndex: "",
          scopedSlots: { customRender: "floowtime" },
        },
        {
          title: "巡逻结束时间",
          dataIndex: "",
          scopedSlots: { customRender: "belongbuild" },
        },

        {
          title: "状态",
          dataIndex: "",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "详情",
          dataIndex: "",
          scopedSlots: { customRender: "action" },
        },
      ], // 已巡逻table表格表头数据
      dataE: [], //待巡逻数据源
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      other: "",
      form: {
        point_name: null,
        building_id: "",
        building_detail_id: "",
        longitude: null,
        latitude: null,
        distance: null,
        dis_describe: null,
        dis_number: null,
        remark: null,
        status: "",
      },
      rules: {
        point_name: [
          { required: true, message: "请输入巡更点名称", trigger: "blur" },
        ],
        longitude: [{ required: true, message: "请输入经度", trigger: "blur" }],
        latitude: [{ required: true, message: "请输入纬度", trigger: "blur" }],
        building_id: [
          { required: true, message: "请选择所属楼宇", trigger: "change" },
        ],
        building_detail_id: [
          { required: true, message: "请选择所属楼层", trigger: "change" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
      form1: {},
      rules1: {
        point_name: [
          { required: true, message: "请输入巡更点名称", trigger: "blur" },
        ],
        longitude: [{ required: true, message: "请输入经度", trigger: "blur" }],
        latitude: [{ required: true, message: "请输入纬度", trigger: "blur" }],
        building_id: [
          { required: true, message: "请选择所属楼宇", trigger: "change" },
        ],
        building_detail_id: [
          { required: true, message: "请选择所属楼层", trigger: "change" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
      innerColumns: [
          { title: "巡更内容", dataIndex: "name", key: "name" },
          { title: "处置方法", dataIndex: "way", key: "way" },
          {title: "状态",dataIndex: "status",scopedSlots: { customRender: 'status',}},
          {title: "操作",dataIndex: "operation",key: "operation",scopedSlots: { customRender: "operation" },},
      ],
      ptlist: [],
      type1: null,
      title1: "",
      ptvisible: false,
      title2:'',
      type2:null,
       form2: {},
      rules2: {
          name: [
          { required: true, message: "请输入巡更类型", trigger: "blur" },
        ],
      }
    };
  },
  watch: {
    // 路线巡更搜索监听input框中是否有内容自动搜索
    SearchPointVal(newValue) {
      if (newValue) {
        this.SearchPoint(true);
      } else {
        this.SearchPoint(false);
      }
    },
    // 日常巡逻搜索监听巡逻项目input框中是否有内容自动搜索
    inputPatrolVal(newValue) {
      if (newValue) {
        this.SearchPatrol(true);
      } else {
        this.SearchPatrol(false);
      }
    },
    // 待巡逻搜索监听input框中是否有内容自动搜索
    inputValD(newValue) {
      if (newValue) {
        this.ShowEditD(true);
      } else {
        this.ShowEditD(false);
      }
    },
    "form.building_id": {
      handler(val) {
        if (val) {
          this.isbuild = false;
          this.GetFloor(val);
        }
      },
    },
  },
  created() {
    this.PatrolPoint(); //路线巡更列表
    this.PatrolList(); //日常巡逻列表
    this.TaskList(); //待巡逻列表
    this.GetBuilding(); //路线巡更新增之楼宇选项
    this.patroltypelist();
  },
  methods: {
    //? 路线巡更·····································································
    // 获取路线巡更列表数据
    PatrolPoint() {
      axios.get("/api/prop/patrolPoint?per_page=9999").then((res) => {
        if (res.message === "success") {
          this.dataA = res.data.data;
        }
      });
    },
    // 列表页状态开关
    async switchChange(val) {
      axios
        .patch("/api/prop/patrolPoint/status", {
          id: val.id,
          version: val.version,
          status: val.status == 0 ? 1 : 0,
        })
        .then((res) => {
          if (res.status_code == 200) {
            this.PatrolPoint();
          }
        });
    },
    //todo 新增
    // 新增modal弹框显示
    AddShowPoint(form, type, title) {
      this.title = title;
      this.type = type;
      this.form = { ...form };
      if (type == 2) {
        this.form.status = JSON.stringify(form.status);
      }
      this.VisiblePoint = true;
    },
    // 新增确定
    AddPoint() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let data = {
            point_name: this.form.point_name,
            building_id: this.form.building_id,
            building_detail_id: this.form.building_detail_id,
            longitude: this.form.longitude,
            latitude: this.form.latitude,
            distance: this.form.distance,
            dis_describe: this.form.dis_describe,
            dis_number: this.form.dis_number,
            remark: this.form.remark,
            status: this.form.status,
          };
          if (this.type == 1) {
            axios.post("/api/prop/patrolPoint", data).then((res) => {
              if (res.message === "success") {
                this.AddPointCancel();
                this.$message.success("新增巡更点成功");
                this.PatrolPoint();
              }
            });
          } else {
            data.id = this.form.id;
            data.version = this.form.version;
            axios.patch("/api/prop/patrolPoint", data).then((res) => {
              if (res.message === "success") {
                this.AddPointCancel();
                this.$message.success("新增巡更点成功");
                this.PatrolPoint();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消新增
    AddPointCancel() {
      this.$refs.ruleForm.resetFields();
      this.VisiblePoint = false;
    },
    getbuildid(val) {
      this.form.building_id = val;
    },
    // 楼宇选择框内容
    GetBuilding() {
      axios.get("/api/ics/building").then((res) => {
        // if (res.message === "success") {
        this.BuildOptions = res.data.data;
        // }
      });
    },
    // 楼层选择框内容
    GetFloor(id) {
      axios.get("/api/ics/buildingDetail?building_id=" + id).then((res) => {
        if (res.message === "success") {
          this.FloorOptions = res.data.data;
          // building_id: this.fromPoint.building_id;
        }
      });
    },
    //todo 删除
    // 删除巡更点
    DeletePoint(val) {
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/prop/patrolPoint", {
              params: {
                id: val.id,
                version: val.version,
              },
            })
            .then((res) => {
              that.$message.success("删除巡更点成功");
              // 成功重新更新列表
              that.PatrolPoint();
            });
        },
        onCancel() {},
      });
    },
    //todo 搜索
    // 快速搜索
    SearchPoint(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.SearchPointVal;
        axios
          .get("/api/prop/patrolPoint", { params: { point_name: paramName } })
          .then((res) => {
            this.dataA = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.PatrolPoint(); //更新表;
      }
    },
    //? 日常巡逻···········································································
    // 获取日常巡逻列表数据
    PatrolList() {
      axios.get("/api/prop/patrol?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataB = res.data.data;
          console.log(this.dataB);
          // 将数据的长度赋值给totalCount
          this.totalCount = res.data.data.length;
        }
      });
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
    },
    //todo 巡逻项目新增
    // 新增modal弹框显示
    Patrol_Add() {
      this.PatrolVisibleAdd = true;
    },
    // 新增确定
    AddPatrolList() {
      this.$refs.ruleForm1.validate((valid) => {
        if (valid) {
          let data = {
            patrol_type_id: this.form1.patrol_type_id,
            name: this.form1.name,
            way: this.form1.way,
            remark: this.form1.remark,
            status: this.form1.status,
          };
          if (this.type1 == 1 || this.type1 == 3) {
            axios.post("/api/prop/patrol", data).then((res) => {
              if (res.message === "success") {
                this.AddPatrolUp();
                this.$message.success("新增巡更点成功");
                this.PatrolList();
              }
            });
          } else {
            data.id = this.form1.id;
            data.version = this.form1.version;
            axios.patch("/api/prop/patrol", data).then((res) => {
              if (res.message === "success") {
                this.AddPatrolUp();
                this.$message.success("新增巡更点成功");
                this.PatrolList();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消新增
    AddPatrolUp() {
      this.$refs.ruleForm1.resetFields();
      this.PatrolVisibleAdd = false;
    },
    //todo 巡逻项目删除
    // 删除巡逻项目
    DeletePatrol(id, version) {
      const self = this;
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      axios
        .delete("/api/prop/patrolType", {
          params: {
            id: id,
            version: version,
          },
        })
        .then((res) => {
          if (res.message === "success") {
          }
          self.$message.success("删除巡更点成功");
          // 成功重新更新列表
          self.PatrolList();
        });
    },
    //todo 巡逻项目编辑
    // 编辑modal弹框显示
    EditPatrol(row) {
      this.PatrolVisibleEdit = true;
      this.fromPatrolEdit = {
        name: row.row.name,
        status: row.row.status.toString(),
      };
    },
    // 巡更点编辑确认
    EditPatrolList(id, version) {
      axios
        .patch("/api/prop/patrolType", this.fromPatrolEdit, {
          params: {
            id: id,
            version: version,
          },
        })
        .then(() => {
          this.PatrolVisibleEdit = false;
          this.$message.success("编辑巡更点成功");
          this.PatrolList();
        });
    },
    // 取消编辑
    EditPatrolUp() {
      this.PatrolVisibleEdit = false;
    },
    //todo 巡逻项目搜索
    // 快速搜索
    SearchPatrol(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputPatrolVal;
        axios
          .get("/api/prop/patrol", { params: { name: paramName } })
          .then((res) => {
            this.dataB = res.data.data;
            console.log(this.dataB);
            this.total = res.data.data.length;
          });
      } else {
        this.tenantList(); // 更新表
      }
    },
    //todo 巡更内容新增
    // 新增modal弹框显示
    AddPatrol() {
      this.PatrolAdd = true;
    },
    // 新增确定
    PatrolAddList() {
      axios.post("/api/prop/patrol", this.fromPatrolAdd).then((res) => {
        if (res.message === "success") {
          this.fromPatrolAdd.patrol_type_id = "";
          this.fromPatrolAdd.name = "";
          this.fromPatrolAdd.way = "";
          this.fromPatrolAdd.remark = "";
          this.fromPatrolAdd.status = "";
          this.PatrolAdd = false;
          this.$message.success("新增巡更点成功");
          this.PatrolList();
        }
      });
    },
    // 取消新增
    PatroAddlUp() {
      this.PatrolAdd = false;
      this.fromPatrolAdd.patrol_type_id = "";
      this.fromPatrolAdd.name = "";
      this.fromPatrolAdd.way = "";
      this.fromPatrolAdd.remark = "";
      this.fromPatrolAdd.status = "";
    },
    //todo 巡更内容删除
    // 删除巡更内容
    PatrolDelete(id, version) {
      const self = this;
      axios
        .delete("/api/prop/patrol", {
          params: {
            id: id,
            version: version,
          },
        })
        .then((res) => {
          if (res.message === "success") {
          }
          self.$message.success("删除巡更点成功");
          // 成功重新更新列表
          self.PatrolList();
        });
    },
    //todo 巡更内容编辑
    // 编辑modal弹框显示
    EditPatrolType(row) {
      this.PatrolEdit = true;
      this.fromEdit = {
        patrol_type_id: row.row.patrol_type_id.toString(),
        name: row.row.name,
        way: row.row.way,
        remark: row.row.remark,
        status: row.row.status.toString(),
      };
    },
    // 巡更点编辑确认
    PatrolTypeList(id, version) {
      axios
        .patch("/api/prop/patrol", this.fromEdit, {
          params: {
            id: id,
            version: version,
          },
        })
        .then(() => {
          this.PatrolEdit = false;
          this.$message.success("编辑巡更点成功");
          this.PatrolList();
        });
    },
    // 取消编辑
    PatroTypelUp() {
      this.PatrolEdit = false;
    },
    // 巡逻项目以及巡更内容实现多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //? 待巡逻············································································
    // 获取待巡逻列表数据
    TaskList() {
      axios.get("/api/prop/patrolTask?per_page=9999").then((res) => {
        if (res.status_code == 200) {
          this.dataD = res.data.data;
        }
      });
    },
    //todo 待巡逻搜索
    // 快速搜索
    ShowEditD(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputValD;
        axios
          .get("/api/prop/patrolTask", { params: { name: paramName } })
          .then((res) => {
            this.dataD = res.data.data;
            this.totalD = res.data.data.length;
          });
      } else {
        this.tenantList(); // 更新表
      }
    },
    // 日常任务新增
    dailyTask(form, type, title) {
      console.log(form)
      this.type1 = type;
      this.title1 = title;
      if(type === 3){
        this.form1.patrol_type_id = form ;
      }else{
        this.form1 = { ...form };
        this.form1.status = JSON.stringify(form.status);
      }
      this.PatrolVisibleAdd = true;
    },
    // 巡更类型列表
    patroltypelist() {
      axios.get("/api/prop/patrolType").then((res) => {
        console.log(res);
        this.ptlist = res.data;
      });
    },
    // 删除日常任务
    delpatrol(val) {
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/prop/patrol", {
              params: {
                id: val.id,
                version: val.version,
              },
            })
            .then((res) => {
              that.$message.success("删除巡更点成功");
              // 成功重新更新列表
              that.PatrolList();
            });
        },
        onCancel() {},
      });
    },
    // 巡更类型
    patroltypeadd(form ,type ,title){
      this.form2 = {...form};
      if(type == 2){
        this.form2.status = JSON.stringify(form.status);
      }
      this.type2 = type ;
      this.title2 = title ;
      this.ptvisible = true;
    },
    submittype(){
      this.$refs.ruleForm2.validate(valid => {
        console.log(valid)
        if (valid) {
          let data = {
            name: this.form2.name,
            status: this.form2.status
          }
          if(this.type2 == 1){
            axios.post('/api/prop/patrolType',data).then((res) =>{
              this.patroltypelist();
            this.resettype();
          });
          }else{
            data.id = this.form2.id;
            data.version = this.form2.version ;
            axios.patch('/api/prop/patrolType',data).then((res) =>{
              this.patroltypelist();
            this.resettype();
          });
          }
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resettype(){
       this.$refs.ruleForm2.resetFields();
      this.ptvisible = false ;
    },
    deltype(val){
      let that = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk() {
          axios
            .delete("/api/prop/patrolType", {
              params: {
                id: val.id,
                version: val.version,
              },
            })
            .then((res) => {
              that.$message.success("删除成功");
              // 成功重新更新列表
              that.patroltypelist();
            });
        },
        onCancel() {},
      });
    },
    switchtype(val){
        axios
        .patch("/api/prop/patrolType/status", {
          id: val.id,
          version: val.version,
          status: val.status == 0 ? 1 : 0,
        })
        .then((res) => {
          if (res.status_code == 200) {
            this.patroltypelist();
          }
        });
    }
  },
  computed: {
    rowSelection() {
      return {
        onChange: () => {},
      };
    }, // 控制table表格全选按钮
  },
};
</script>

<style lang="less" scoped>
.ant_modal {
  width: 1520px !important;
}

.ant-modal-content {
  width: 1000px !important;
  z-index: 999;
}
.site {
  margin: 30px 0 30px 46px;
  display: flex;
  span {
    white-space: nowrap;
  }
}
.wrap {
  border-radius: 15px;
  background-color: #fff;

  .wrapA {
    width: 100%;
    padding: 20px;
  }
  .top {
    display: flex;
    .left {
      display: flex;
    }
    .right {
      display: flex;
      margin-left: 40px;
      .state {
        margin-left: 40px;
      }
    }
  }
  .bottom {
    display: flex;
    margin-top: 0px;
  }
  .runtion {
    display: flex;
  }
  .matter {
    .ant-table-placeholder {
      display: none !important;
    }
    .inspect {
      background-color: skyblue;
      tr {
        width: 100vw;
        height: 50px;
        background-color: rgb(243, 239, 239);
        th {
          padding-right: 80px;
          font-size: 15px;
        }
      }
    }

    .substance {
      display: flex;
      width: 100%;
      height: 6vh;
      background-color: rgb(243, 245, 247);

      .projectA {
        font-size: 30px;
        text-align: center;
        height: 40px;
        p {
          text-align: center;
          margin-top: auto 0;
        }
      }
      .projectB {
        font-size: 30px;
        text-align: center;
        height: 40px;
        p {
          text-align: center;
          margin-top: auto 0;
        }
      }
    }
    .desig {
      p {
        font-size: 18px;
      }
    }
  }
}
</style>
