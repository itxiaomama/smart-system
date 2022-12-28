<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <!-- 搜索 -->
          <a-input-search
            placeholder="快速搜索"
            style="width: 200px; margin-right: 40px"
            @click="ShowEdit(true)"
            v-model="inputVal"
          />
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              :pagination="paginationOpt"
              rowKey="id"
            >
              <span slot="action" slot-scope="text, record">
                <!-- 指派 -->
                <a href="javascript:;" @click="show_assign(record)">
                  <a-icon type="tag" theme="twoTone" />指派</a
                >
                <a-divider type="vertical" />
                <!-- 详情 -->
                <a href="javascript:;" @click="showdetail(record)">
                  <a-icon type="file-text" theme="twoTone" />详情</a
                >
                <!-- 完成 -->
                <a-divider type="vertical" />
                <a @click="finishit(record)"><a-icon type="box-plot" theme="twoTone" />完成</a>
              </span>
            </a-table>
          </div>
        </div>
      </div>
    </div>

    <!-- 指派modal弹框 -->
    <a-modal v-model="visibleSent" title="指派维修员" width="35%" @ok="submit" @cancel="resetit">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item  label="维修员：" prop="worker_id">
          <a-select v-model="form.worker_id" placeholder="请选择">
          <a-select-option v-for="item in repairOptions" :key="item.id" :value="item.id">
            {{item.user_name}}
          </a-select-option>
      </a-select>
        </a-form-model-item>

        <a-form-model-item  label="维修时间：">
          <a-range-picker
          :ranges="{
            Today: [moment(), moment()],
            'This Month': [moment(), moment().endOf('month')],
          }"
          show-time
          v-model="form.worktiem"
          format="YYYY-MM-DD HH:mm:ss"
          @change="onChange1"
        />
        </a-form-model-item>

        <a-form-model-item  label="维修材料：" >
          <a-input v-model="form.material" />
        </a-form-model-item>

        <a-form-model-item  label="维修金额：" >
          <a-input type="number" v-model="form.cost" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "RealMatter",
  data() {
    return {
       labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        worker_id:null
      },
      rules: {
        worker_id: [{ required: true, message: '请选择', trigger: 'change' }],
      },
      map: {
        1: "待分配",
        2: "待处理",
        3: "待评价",
        4: "已评价",
        5: "已完成",
      },
      record:{},
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      dataSource: [], //列表数据源
      columns: [
        {
          title: "维修单号",
          dataIndex: "repair_sn",
          scopedSlots: { customRender: "repair_sn" },
        },
        {
          title: "报修园区",
          dataIndex: "company_address",
        },
        {
          title: "报修人",
          dataIndex: "contact",
        },
        {
          title: "报修人手机",
          dataIndex: "mobile",
        },
        {
          title: "维修工人",
          dataIndex: "worker_contact",
        },
        {
          title: "状态",
          dataIndex: "",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "报修时间",
          dataIndex: "created_at",
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ], //table表格表头内容
      visibleSent: false, //指派modal弹框默认状态
      repairOptions: [], // 存放维修员 数据
      paginationOpt: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationOpt.defaultCurrent = 1;
          this.paginationOpt.defaultPageSize = pageSize;
          this.matterlist(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationOpt.defaultCurrent = current;
          this.paginationOpt.defaultPageSize = size;
          this.matterlist();
        },
      }, //列表分页
      formRepair: {}, //存放维修指派数据
      endOpen: false,
    };
  },
  created() {
    this.matterlist(); //渲染列表数据
  },
  mounted() {
    this.GetRepair(); //指派维修员选项
  },
  watch: {
    // 自动搜索
    inputVal(newValue) {
      if (newValue) {
        this.ShowEdit(true);
      } else {
        this.ShowEdit(false);
      }
    },
    startValue(val) {
      console.log("startValue", val);
    },
    endValue(val) {
      console.log("endValue", val);
    },
  },
  methods: {
    moment,
    resetit(){
       this.$refs.ruleForm.resetFields();
       this.visibleSent = false;
    },
    submit(){
        this.$refs.ruleForm.validate(valid => {
        if (valid) {
          axios.patch('/api/prop/repair/operate',{
            status:2,
            repair_id: this.record.id,
            worker_id:this.form.worker_id,
            material: this.form.material,
            cost: this.form.cost,
            worker_start_time: this.form.worker_start_time,
            worker_end_time: this.form.worker_end_time,
            version:  this.record.version
          }).then((res) =>{
            console.log(res)
            this.resetit();
            this.matterlist();
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onChange1(dates, dateStrings) {
      this.form.worker_start_time = dateStrings[0];
      this.form.worker_end_time = dateStrings[1];
    },

    finishit(val){
      axios.patch('/api/prop/repair/operate',{
        status:5,
        repair_id: val.id,
        version: val.version
      }).then((res) =>{
        console.log(res);
        this.matterlist();
      })
    },
    //获取列表数据;
    matterlist() {
      axios.get("/api/prop/repair?per_page=99999&time=2").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    // 指派modal弹框显示
    show_assign(val) {
      this.record = val;
      this.visibleSent = true;
    },
    // 确认指派
    btn_showsure(id, version) {
      axios
        .patch("/api/prop/repair/operate", this.formRepair, {
          params: { id: id, version: version },
        })
        .then((res) => {
          if (res.message === "success") {
            console.log(res);
            this.visibleSent = false;
          }
        });
    },
    // 取消指派
    btn_showup() {
      this.visibleSent = false;
    },
    // 维修单详情
    showdetail(val) {
      this.$router.push({
        path: "/property/matterdetail",
        query: {
          id: val.id,
        },
      });
    },
    // 维修员下拉选择内容
    GetRepair() {
      axios.get("/api/prop/repair/staff?status=1").then((res) => {
        if (res.message === "success") {
          this.repairOptions = res.data;
        }
      });
    },
    // 搜索
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/prop/repair", { params: { mobile: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.matterlist(); // 更新表
      }
    },
  },
  computed: {
    // 控制table表格全选按钮
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
    height: 88vh;
    overflow-y: auto;
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
    margin-top: 10px;
  }
}
</style>
