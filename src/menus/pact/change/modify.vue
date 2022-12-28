<template>
  <div class="wrap">
    <div style="width: 90%; margin: 20px auto">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>

      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item  label="合同名称：" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>

        <a-form-model-item  label="租金合同号：" prop="sn">
          <a-input v-model="form.sn" />
        </a-form-model-item>

        <a-form-model-item  label="物管合同号：" prop="pm_sn">
          <a-input v-model="form.pm_sn" />
        </a-form-model-item>

        <a-form-model-item label="备注">
          <a-input v-model="form.remark" type="textarea" />
        </a-form-model-item>

        <a-divider orientation="left">乙方</a-divider>

        <a-form-model-item label="租赁方：" class="leftitem">
          <a-radio-group default-value="1" v-model="form.lessor_type">
            <a-radio value="1"> 公司租赁 </a-radio>
            <a-radio value="2"> 个人租赁 </a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item label="客户名称：" prop="customer_name">
          <a-select
            show-search
            v-model="form.customer_name"
            placeholder="input search text"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
            @change="handleChange"
          >
            <a-select-option v-for="item in comlist" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="所属行业：" >
          <a-input v-model="form.sector" />
        </a-form-model-item>

        <a-form-model-item label="企业信用代码："  v-if="form.lessor_type == '1'">
          <a-input v-model="form.credit_no" />
        </a-form-model-item>

        <a-form-model-item label="身份证号："  v-else>
          <a-input v-model="form.credit_no" />
        </a-form-model-item>

        <a-form-model-item label="个人邮箱：">
          <a-input v-model="form.email" />
        </a-form-model-item>

        <a-form-model-item label="法人：" >
          <a-input v-model="form.oper_name" />
        </a-form-model-item>

        <a-form-model-item label="联系电话：">
          <a-input v-model="form.phone" />
        </a-form-model-item>

        <a-form-model-item ref="name" label="通讯地址：" >
          <a-input v-model="form.address" />
        </a-form-model-item>

        <a-form-model-item ref="name" label="渠道名称：">
          <a-input v-model="form.channel_name" />
        </a-form-model-item>

        <a-divider orientation="left">选择租赁场地</a-divider>
        <a-button type="primary" @click="showRoom"> 选择房间 </a-button>
      </a-form-model>
      <div class="content">
        <div>
          <a-table
            bordered
            :columns="columns"
            :data-source="dataSource"
            style="margin-top: 20px"
          >
          </a-table>
        </div>
      </div>

      <div class="steps-action" style="padding-top: 20px; padding-bottom: 40px">
        <a-button
          ><router-link to="/contract/change">返回</router-link></a-button
        >
        <a-button type="primary" style="margin-left: 20px" @click="nextStep">
          下一步
        </a-button>
      </div>
    </div>

    <a-modal v-model="visible" centered title="选择房间" class="k_modal" >
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <a-form-model
              :model="room"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              rowKey="id"
            >
              <a-row>
                <a-col :span="8"
                  ><a-form-model-item  label="房间名称：">
                    <a-input v-model="room.name" /> </a-form-model-item
                ></a-col>
                <a-col :span="8"
                  ><a-form-model-item  label="所属楼宇：">
                    <a-input v-model="room.building_name" /> </a-form-model-item
                ></a-col>
                <a-col :span="8">
                  <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" @click="onSubmit"> 查询 </a-button>
                    <a-button style="margin-left: 10px" @click="resetForm">
                      重置
                    </a-button>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
          </div>
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              :row-selection="{ selectedRowKeys: selectedRowKeys,onChange: onSelectChange }"
              bordered
              rowKey="id"
              :columns="columnsa"
              :data-source="roomlist"
            >
              <a slot="" slot-scope="text">{{ text }}</a>
            </a-table>
          </div>
        </div>
      </div>
      <template slot="footer">
      <div class="btnant">
        <a-button style="margin-right: 20px" @click="btn_up">取消</a-button>
        <a-button type="primary" @click="btn_down">确定</a-button>
      </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import axios  from 'axios';
export default {
  name: "My_P_Intentionpush",
  data() {
    return {
      type:null,
      id:null,
      comlist:[],
      visible1: false,
      selectedRowKeys:[],
      value: 1,
      current: 0,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        customer_id:null,
        name:'',
        remark:'',
        lessor_type:'1'
      },
      room:{},
      rules: {
        name: [{ required: true, message: "请输入意向名称", trigger: "blur" }],
        sn: [{ required: true, message: "请输入租金合同号", trigger: "blur" }],
        pm_sn: [{ required: true, message: "请输入物管合同号", trigger: "blur" }],
        customer_name: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
        ],
      },
      columns: [
        {
          title: "房间名称",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "所属园区",
          dataIndex: "park_name",
          scopedSlots: { customRender: "park_name" },
        },
        {
          title: "所属楼宇",
          dataIndex: "building_name",
          scopedSlots: { customRender: "building_name" },
        },
        {
          title: "所属楼层",
          dataIndex: "building_detail_name",
          scopedSlots: { customRender: "building_detail_name" },
        },
        {
          title: "收租面积(平方米)",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
      ],
      steps: [
        {
          title: "填写基础信息",
        },
        {
          title: "填写费项信息",
        },
        {
          title: "完成",
        },
      ],
      visible: false,
      dataSource: [],
      roomlist:[],
      record:[],
      columnsa: [
        {
          title: "房间名称",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "所属园区",
          dataIndex: "park_name",
          scopedSlots: { customRender: "park_name" },
        },
        {
          title: "所属楼宇",
          dataIndex: "building_name",
          scopedSlots: { customRender: "building_name" },
        },
        {
          title: "所属楼层",
          dataIndex: "building_detail_name",
          scopedSlots: { customRender: "building_detail_name" },
        },
        {
          title: "出租面积(平方米)",
          dataIndex: "rent_area",
          scopedSlots: { customRender: "rent_area" },
        },
        {
          title: "租金类型",
          dataIndex: "rent_type_name",
          scopedSlots: { customRender: "rent_type_name" },
        },
        {
          title: "租金(元)",
          dataIndex: "rent",
          scopedSlots: { customRender: "rent" },
        },
      ],
    };
  },
  mounted(){
    this.getcomList('');
    this.type = this.$route.query.type ;
    if(this.type  == 2){
      this.id = this.$route.query.id;
      this.getInfo(this.id);
    }else{
      if(this.$route.query.form){
        this.form = JSON.parse(this.$route.query.form);
        this.form.is_to_renew = this.$route.query.renewal;
        this.selectedRowKeys = this.form.room_ids ;
        this.dataSource = this.form.rooms ;
      }
    }
    
  },
  methods: {
    getInfo(id){
      axios.get('/api/ics/customerContract?id='+id).then((res) =>{
        this.form = res.data;
        this.form.lessor_type = JSON.stringify(res.data.lessor_type);
        this.selectedRowKeys = res.data.contract_room.map(el => el.id);
        this.dataSource = res.data.contract_room;
        
      })
    },
     handleSearch(value) {
      this.getcomList(value);
    },
    handleChange(value) {
      console.log(value);
      this.getcominfo(value)
    },
    getroomlist(){
      axios.get("/api/ics/room?per_page=9999").then((res) => {
          this.roomlist = res.data.data;
          
      });
    },
    getcomList(value){
      axios.get("/api/ics/customer?name="+value).then((res) => {
          this.comlist = res.data.data;
      });
    },
    getcominfo(id){
      axios.get("/api/ics/customer?id="+id).then((res) => {
        console.log(res)
        let info = res.data;
          // this.form = res.data;
          this.form.customer_name =info.name;
          this.form.customer_type =  info.type;
          this.form.customer_id =info.id;
          this.form.sector =info.sector;
          this.form.credit_no =info.credit_no;
          this.form.email =info.email;
          this.form.oper_name =info.oper_name;
          this.form.phone =info.phone;
          this.form.address =info.address;
          this.form.channel_name = info.channel_name;
      });
    },
    showRoom() {
      this.getroomlist();
      this.visible = true;
    },
    onSelectChange(selectedRowKeys,record) {
      this.record = record;
      this.selectedRowKeys = selectedRowKeys;
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    btn_up() {
      this.visible = false;
    },
    btn_down() {
      this.dataSource = this.record ;
      this.visible = false;
    },
    onSubmit() {
      axios.get("/api/ics/room?per_page=9999&name="+this.room.name+'&building_detail_name='+this.room.building_name).then((res) => {
          this.roomlist = res.data.data;
      });
      
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    nextStep(){
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.dataSource.length == 0){
            this.$message.error('请选择房间！');
            return false;

          }
          console.log(this.form)
          this.form.room_ids = this.dataSource.map((item) => {return item.id});
          console.log(this.form.room_ids)
          this.form.rooms = this.dataSource ;
          this.$router.push({
            path:'/contract/modify1',
            query:{
              form: JSON.stringify(this.form),
              type:this.type,
              id:this.id
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  background-color: #fff;
  border-radius: 10px;
  margin: 10px;
  height: 82vh;
  overflow-x: auto;
  .content {
    width: 100%;
    span {
      line-height: 28px;
    }
  }
  .steps-action {
    margin: 0 33vw;
  }
}
</style>
