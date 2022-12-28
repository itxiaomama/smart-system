<template>
  <div class="wrap" style="border-radius: 10px">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-row>
        <a-col :span="12">
          <a-form-model-item  label="客户名称：" prop="name">
            <a-input
              v-model="form.name"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item  label="简称：" >
            <a-input
              v-model="form.short_name"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item  label="客户类型：" prop="type">
            <dict :keyValue="'ics_customer_type'" v-model="form.type" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item  label="客户状态：" prop="customer_status">
            <dict :keyValue="'ics_customer_c_status'" v-model="form.customer_status" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item  label="所属行业：" >
            <a-input
              v-model="form.sector"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item  label="所属国家：">
            <a-input
              v-model="form.country"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item  label="过程管理：">
            <dict :keyValue="'ics_customer_process'" v-model="form.process" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item  label="联系人：">
            <a-input
              v-model="form.contacts"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item  label="联系电话：" >
            <a-input
              v-model="form.phone"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item  label="邮箱：" >
            <a-input
              v-model="form.email"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item  label="统一信用代码：" >
            <a-input
              v-model="form.credit_no"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item  label="邮编：" >
            <a-input
              v-model="form.postal_code"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      
      <a-row>
        <a-col :span="12">
          <a-form-model-item  label="通讯地址：" >
            <a-input
              v-model="form.mail_address"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item  label="上传公司头像：" >
            <uploadimgVue 
            v-model="form.head_img" 
            :FileList="headimg" 
            @upload="getupload"
            @remove="remove"
            :limit="1"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item  label="上传照片墙：">
            <uploadimgVue
             v-model="form.banner_images" 
            :FileList="form.banner_images" 
            @upload="getupload1"
            @remove="remove1"
            :limit="5"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item  label="渠道类型：" >
            <dict :keyValue="'ics_customer_channel_type'" v-model="form.channel_type" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item  label="渠道名称：">
            <a-input
              v-model="form.channel_name"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item  label="是否黑名单：">
            <a-switch v-model="form.switch" @change="onchange" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item  label="客户备注：" >
            <a-input
              v-model="form.remark"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item  label="工商注册号：" >
            <a-input
              v-model="form.reg_no"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item  label="组织机构代码：">
           <a-input
              v-model="form.org_no"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item  label="法人名：" >
            <a-input
              v-model="form.oper_name"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item  label="经营状态：">
            <dict :keyValue="'ics_customer_status'" v-model="form.status" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item  label="公司类型(企业性质)：" >
            <a-input
              v-model="form.econ_kind"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item  label="注册资金：">
            <a-input
              v-model="form.regist_capi"
              type="number"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item  label="成立日期：">
            <a-date-picker
              v-model="form.start_date"
              type="date"
              valueFormat="YYYY-MM-DD"
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item  label="营业结束日期：">
            <a-date-picker
              v-model="form.end_date"
              type="date"
              valueFormat="YYYY-MM-DD"
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item  label="登记机关：" >
            <a-input
              v-model="form.belong_org"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item  label="注册地址：">
            <a-input
              v-model="form.address"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item  label="经营范围：" >
            <a-input v-model="form.scope" type="textarea" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> 提交 </a-button>
        <a-button style="margin-left: 10px" @click="resetForm"> 关闭 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import uploadimgVue from '@/components/common/uploadimg.vue';
import axios from 'axios';
import dict from '@/components/common/dict.vue';
export default {
  name: "JoinClientPush",
  components:{uploadimgVue,dict},
  data() {
    return {
      switch:false,
      type:null,
      headimg:[],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        name:'',
        short_name:'',
        type:null,
        customer_status:null,
        sector:'',
        country:'',
        process:null,
        contacts:'',
        phone:'',
        email:'',
        credit_no:'',
        mail_address:'',
        postal_code:'',
        channel_type:null,
        channel_name:'',
        remark:'',
        reg_no:'',
        status:null,
        org_no:'',
        oper_name:'',
        econ_kind:'',
        start_date:'',
        end_date:'',
        belong_org:'',
        regist_capi:'',
        address:'',
        scope:'',
        head_img:'',
        banner_images:[],
        is_blacklist:false,

      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入客户名称",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择客户类型",
            trigger: "change",
          },
        ],
        customer_status: [
          {
            required: true,
            message: "请选择客户状态",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted(){
    this.type = this.$route.query.type;
    if(this.$route.query.other){
        let info = JSON.parse(this.$route.query.form);
        this.form.sector = info.sector;
        this.form.customer_status = info.customer_status =='0'?'': info.customer_status;
        this.form.contacts = info.contacts ;
        this.form.phone = info.phone ;
        this.form.email = info.email ;
        this.form.credit_no = info.credit_no;
        this.form.remark = info.remark;
        this.form.channel_name = info.channel_name ;
        this.form.address = info.address;
        this.form.clue_id = info.id ;
    }
    if(this.$route.query.type == 2){
      this.$nextTick(() =>{
        let  info = JSON.parse(this.$route.query.form);
        this.form = info;
        this.form.id = info.id;
        this.form.version = info.version;
        this.form.customer_status = JSON.stringify(info.customer_status);
        this.form.type = JSON.stringify(info.type);
        this.form.process = JSON.stringify(info.process);
        this.form.channel_type = JSON.stringify(info.channel_type);
        this.form.status = JSON.stringify(info.status);
        console.log(this.form)
        if(info.head_img){
          let arr =  [];
          arr.push(info.head_img);
          this.headimg = arr;
        }
        if(info.banner_images){
          this.form.banner_images = info.banner_images.split(',');
        }
        this.form.switch = info.is_blacklist== 0?false:true; 
      })
  }
    
    

  },
  methods: {
    onchange(checked){
      this.switch = checked;
    },
    getupload(file){
      this.form.head_img = file ;
      this.headimg.push(file)
    },
    remove(){
      this.form.head_img = '';
      this.headimg = [];
    },
    getupload1(file){
      console.log(file)
      console.log( this.form.banner_images)
      this.form.banner_images.push(file);
    },
    remove1(file){
      this.form.banner_images.map((el, index) => {
        if (el == file.uid) {
          this.form.banner_images.splice(index, 1);
        }
      });
    },
    btnN() {
      this.$router.push("/home/Jclient");
    },
    onSubmit() {
      console.log(this.form)
      console.log(this.type)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if(this.type == 1){
            this.form.is_blacklist = this.form.switch ? 1:0;
             axios.post("/api/ics/customer", this.form).then((res) => {
              if (res.message === "success") {
                this.$message.success("操作成功");
                this.$router.go(-1);
              
              }
            });
          }else{
            this.form.is_blacklist = this.form.switch ? 1:0;
             axios.patch("/api/ics/customer", this.form).then((res) => {
              if (res.message === "success") {
                this.$message.success("操作成功");
                this.$router.go(-1);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$router.go(-1);
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  width: 87vw;
  background-color: #fff;
  .ant-form {
    width: 100%;
    padding: 20px;
  }
}
.wrapA {
  width: 50vw;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  .inpI {
    display: flex;
    margin-left: -18px;
    span {
      margin-right: 8px;
    }
    .scope {
      display: flex;
      width: 17vw;
      height: 5vh;
      background-color: rgb(63, 21, 21);
      border: 1px solid rgb(196, 126, 126);
      span {
        color: rgb(116, 113, 113);
        margin-top: 4px;
        margin-left: 0px;
      }
    }
  }
  .inpJ {
    display: flex;
    margin-top: 10px;
    margin-left: 3px;
    .area {
      width: 31vw;
      height: 5vh;
      background-color: #fff;
    }
    span {
      margin-right: 8px;
    }
  }
  .inpA {
    span {
      font-size: 16px;
    }
    input {
      width: 35vw;
      height: 5vh;
      border: 1px solid rgb(208, 211, 212);
    }
    p {
      margin-left: 72px;
    }
  }
  .inpB {
    margin-left: -16px;
    span {
      font-size: 16px;
    }
    p {
      margin-left: 88px;
    }
  }
  .inpC {
    margin-left: -32px;
    span {
      font-size: 16px;
    }
    p {
      margin-left: 104px;
    }
  }
  .inpD {
    .Dset {
      span {
        width: 100px;
      }
    }
    p {
      margin-left: 72px;
    }
  }
  .inpE {
    .Eset {
      display: flex;
      margin-left: -28px;
      span {
        width: 100px;
      }
    }
    p {
      margin-left: 72px;
    }
  }
  .inpF {
    .Fset {
      display: flex;
      margin-left: -40px;
    }
    .Fp {
      margin-left: 70px;
    }
  }
  .inpG {
    margin: 0 0 20px 30px;
    span {
      margin-right: 10px;
    }
  }
  .inpH {
    margin: 0 0 20px 30px;
    span {
      margin-right: 10px;
    }
  }
  .inpK {
    .Kset {
      display: flex;
      margin-left: 0px;
    }
    .Kp {
      margin-left: 70px;
    }
  }
  .inpL {
    .Lset {
      display: flex;
      margin-left: 26px;
    }
    .Lp {
      margin-left: 70px;
    }
  }
  .inpM {
    .Mset {
      margin-left: -62px;
      input {
        width: 40vw;
      }
    }
    span {
      margin-right: 8px;
    }
    p {
      margin-left: 68px;
    }
  }
}
</style>
