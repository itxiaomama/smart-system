<template>
  <div>
    <div class="wrap">
      <div class="top">
        <div class="content">
          <a-divider orientation="left">基本信息</a-divider>
          <a-descriptions
            :column="{ xxl: 4 }"
            title=""
            style="margin: 80px 0 0 180px"
          >
            <a-descriptions-item label="合同编号">
              <p>{{ info.sn }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="管理编号">
              <p>{{ info.pm_sn }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="合同名称">
              <p>{{ info.name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="租户名称">
              <p>{{ info.customer_name }}</p>
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <div class="content">
          <a-divider orientation="left">租赁场地</a-divider>
          <a-table
            style="width: 50vw; margin: 10vh auto"
            :data-source="dataSource"
            :columns="columns"
            rowKey="id"
          >
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="">
              <a-tag color="cyan"></a-tag>
            </span>
          </a-table>
        </div>
        <div class="content">
          <a-divider class="dividerb" orientation="left">退租信息</a-divider>
          <div style="margin: 1px auto">
            <a-form-model
              ref="ruleForm"
              :model="form"
              :rules="rules"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-form-model-item  label="退租日期：" prop="refund_date">
                <a-date-picker
                  v-model="form.refund_date"
                  type="date"
                  valueFormat="YYYY-MM-DD"
                  placeholder="请选择时间"
                  style="width: 100%;"
                />
              </a-form-model-item>

              <a-form-model-item  label="退租原因：" prop="refund_reason">
                <dict v-model="form.refund_reason" :keyValue="'ics_contract_refund_reason'" />
              </a-form-model-item>

              <a-form-model-item  label="应收费用(元)：" prop="receive_fee">
                <a-input
                  type="number"
                  v-model="form.receive_fee"
                  @change="changerecevice"
                />
              </a-form-model-item>

              <a-form-model-item  label="应退费用(元)：" prop="refund_fee">
                <a-input
                 type="number"
                  v-model="form.refund_fee"
                  @change="changerefund"
                />
              </a-form-model-item>

              <a-form-model-item  label="费用合计(元)：" prop="total_fee">
                <a-input
                  v-model="form.total_fee"
                  disabled
                />
                <p style="text-align:left;">正数为应收费用-- 负数为应退费用</p>
              </a-form-model-item>

              <a-form-model-item  label="备注：">
                <a-input
                  v-model="form.remark"
                  type="textarea"
                />
              </a-form-model-item>

              <a-form-model-item  label="存档图片：">
                <uploadimgVue 
                v-model="form.archive_image_list"
                :limit="5"
                @upload="getupload"
                @remove="remove"
                 :FileList="form.archive_image_list" />
              </a-form-model-item>

            </a-form-model>
          </div>
        </div>
        <div
          class="btnant"
          style="padding: 30px 35vw; border-top: 1px solid #e8e8e8"
        >
          <a-button style="margin-right: 20px" @click="btnup">返回</a-button>
          <a-button type="primary" @click="submit">提交</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dict from "@/components/common/dict.vue";
import uploadimgVue from "@/components/common/uploadimg.vue";
import axios from "axios";
import moment from "moment";
export default {
  name: "My_P_Changepush",
  components: {
    dict,
    uploadimgVue,
  },
  data() {
    return {
      info: {},
      columns: [
        {
          title: "所属园区",
          dataIndex: "name1",
        },
        {
          title: "所属楼宇",
          dataIndex: "build",
          scopedSlots: { customRender: "build" },
        },
        {
          title: "所属楼层",
          dataIndex: "address",
          scopedSlots: { customRender: "address" },
        },
        {
          title: "房间名称",
          dataIndex: "name",
        },
        {
          title: "收租面积(平方米)",
          dataIndex: "rent_area",
          scopedSlots: { customRender: "rent_area" },
        },
      ],
      dataSource: [],
       labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        refund_reason:'1',
        refund_fee: 0,
        receive_fee:0,
        archive_image_list:[]
      },
      rules: {
        refund_fee: [
          { required: true, message: '请输入应退费用', trigger: 'blur' },
        ],
        receive_fee: [
          { required: true, message: '请输入应收费用', trigger: 'blur' },
        ],
        refund_reason: [{ required: true, message: '请选择退原因', trigger: 'change' }],
        refund_date: [{ required: true, message: '请选择退租时间', trigger: 'change' }],
      },
    };
  },
  mounted() {
    this.type = this.$route.query.type ;
    if(this.type == 1){
        this.getInfo(this.$route.query.id);
    }else{
      this.getrefund(this.$route.query.id)
    }
    
  },
  methods: {
    getInfo(id) {
      axios.get("/api/ics/customerContract?id=" + id).then((res) => {
        this.info = res.data;
        this.dataSource = res.data.contract_room;
      });
    },
    getrefund(id){
        axios.get("/api/ics/contractRefund?id=" + id).then((res) => {
        this.getInfo(res.data.contract_id);
        this.form = res.data ;
        this.form.refund_reason = JSON.stringify(res.data.refund_reason);
        console.log(res.data.archive_image_list)
        if(res.data.archive_image_list !== ''){
          this.form.archive_image_list = res.data.archive_image_list.split(',')
        }else{
          this.form.archive_image_list = [];
        }
        
      });
    },
    btn_return() {
      this.$router.push("/contract/change");
    },
    btnup() {
      this.$refs.ruleForm.resetFields();
      this.$router.push("/contract/change");
    },
    submit(){
       this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let rooms = this.info.contract_room.map(item => {return item.id})
          let data = {
            customer_id: this.info.customer_id,
            contract_id:this.info.id,
            refund_date:moment(this.form.refund_date).format('YYYY-MM-DD'),
            receive_fee:this.form.receive_fee,
            refund_fee:this.form.refund_fee,
            total_fee:this.form.total_fee,
            refund_reason:this.form.refund_reason,
            remark: this.form.remark,
            room_ids:rooms,
            archive_image_list:this.form.archive_image_list
          }
          if(this.type == 1){
            axios.post('/api/ics/contractRefund',data).then((res) =>{
            this.$message.success('操作成功');
            this.$router.push({
              path:'/contract/change'
            })
          })
          }else{
            data.id = this.form.id;
            data.version = this.form.version ;
           axios.patch('/api/ics/contractRefund',data).then((res) =>{
            this.$message.success('操作成功');
            this.$router.push({
              path:'/contract/change'
            })
          }) 
          }
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    changerecevice(event){
      console.log(event.target.value)
      let  value = event.target.value ;
      this.form.total_fee = Number(value) - Number(this.form.refund_fee) ;
    },
    changerefund(event){
      let value  = event.target.value ;
      this.form.total_fee = Number(this.form.receive_fee) - Number(value) ;
    },
    getupload(file) {
      this.form.archive_image_list.push(file);
    },
    remove(file) {
      this.form.archive_image_list.map((el, index) => {
        if (el == file.uid) {
         this.form.archive_image_list.splice(index, 1);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  margin-top: 0px;
  .top {
    width: 85vw;
    background-color: #fff;
    border-radius: 10px;
    .content {
      .return {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 0;
        top: 26px;
        .icon {
          font-size: 24px;
        }
      }
      margin: 20px;
      .divider {
        position: absolute;
        top: 2vw;
      }
      .dividera {
        position: absolute;
        top: 9vw;
      }
    }
  }
  .buildname {
    margin: 30px 20vw;
    display: flex;
    p {
      white-space: nowrap;
      line-height: 28px;
    }
    span {
      white-space: nowrap;
      line-height: 28px;
    }
  }
}
</style>
