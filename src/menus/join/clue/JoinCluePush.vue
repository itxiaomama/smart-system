<template>
  <div style="background: #fff; padding: 20px">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-divider orientation="left"> 主要信息 </a-divider>
      <a-row>
        <a-col :span="12"
          ><a-form-model-item label="主题名称：" prop="clue_name">
            <a-input
              v-model="form.clue_name"
            /> </a-form-model-item
        ></a-col>
        <a-col :span="12">
          <a-form-model-item label="线索来源：" prop="source">
            <dict  v-model="form.source" :keyValue="'ics_clue_source'" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12"
          ><a-form-model-item ref="name" label="渠道分类：" prop="channel_category">
            <dict  v-model="form.channel_category" :keyValue="'ics_clue_channel'" />
             </a-form-model-item
        ></a-col>
        <a-col :span="12">
          <a-form-model-item label="渠道名称：" prop="channel_name">
            <a-input
              v-model="form.channel_name"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12"
          ><a-form-model-item  label="详细描述：">
            <a-input v-model="form.remark" type="textarea" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-divider orientation="left"> 客户信息 </a-divider>
      <a-row>
        <a-col :span="12"
          ><a-form-model-item ref="name" label="客户名称：" prop="customer_name">
            <a-input
              v-model="form.customer_name"
            /> </a-form-model-item
        ></a-col>
        <a-col :span="12">
          <a-form-model-item label="客户类型：" prop="customer_type">
            <dict  v-model="form.customer_type" :keyValue="'ics_customer_type'" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12"
          ><a-form-model-item  label="证件号：">
            <a-input
              v-model="form.credit_no"
            /> </a-form-model-item
        ></a-col>
        <a-col :span="12">
          <a-form-model-item label="所属行业：">
            <a-input
              v-model="form.sector"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12"
          ><a-form-model-item ref="name" label="联系人：" prop="contacts">
            <a-input
              v-model="form.contacts"
            /> </a-form-model-item
        ></a-col>
        <a-col :span="12">
          <a-form-model-item label="邮箱：">
            <a-input
              v-model="form.email"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12"
          ><a-form-model-item  label="联系电话：" prop="phone">
            <a-input
              v-model="form.phone"
            /> </a-form-model-item
        ></a-col>
        <a-col :span="12">
          <a-form-model-item label="通讯地址：">
            <a-input
              v-model="form.mail_address"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12"
          ><a-form-model-item  label="邮编：">
            <a-input
              v-model="form.postal_code"
            /> </a-form-model-item
        ></a-col>
      </a-row>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> 提交 </a-button>
        <a-button style="margin-left: 10px" @click="resetForm"> 关闭 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import axios from "axios";
import dict from '@/components/common/dict.vue'
export default {
  name: "JoinCluePush",
  components:{
    dict
  },
  data() {
    return {
      formAdd: {
        clue_name: "",
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      form: {},
      rules: {
        clue_name: [
          {
            required: true,
            message: "请输入主题名称",
            trigger: "blur",
          },
        ],
        source: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        channel_category:[
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
         channel_name: [
          {
            required: true,
            message: "请输入主题名称",
            trigger: "blur",
          },
        ],
        customer_name:[
          {
            required: true,
            message: "请输入客户名称",
            trigger: "blur",
          },
        ],
        customer_type:[
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        contacts:[
          {
            required: true,
            message: "请输入联系人",
            trigger: "blur",
          },
        ],
        phone:[
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted(){
    if(this.$route.query.id){
      this.getdetail(this.$route.query.id);
    }
  },
  methods: {
    onSubmit() {
      let id = this.$route.query.id;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.form)
          if(id){
            axios.patch("/api/ics/clue", this.form).then((res) => {
              if (res.message === "success") {
                this.$refs.ruleForm.resetFields();
                this.$router.push({
                  path:'/merchants/club'
                })
              }
            });
          }else{
            axios.post("/api/ics/clue", this.form).then((res) => {
              if (res.message === "success") {
                this.resetForm();
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
    getdetail(id){
       axios.get("/api/ics/clue?id="+id).then((res) => {
         let data= res.data;
         this.form = data;
          this.form.source = JSON.stringify(data.source);
          this.form.channel_category = JSON.stringify(data.channel_category);
          this.form.customer_type = JSON.stringify(data.customer_type);
          
       });
    }
  },
};
</script>

<style lang="less" scoped>
.wrap {
  border-radius: 10px;
  background-color: #fff;
  // border: 20px solid rgb(207, 202, 202);
  .wrapA {
    margin: 20px;
    .top {
      .title {
        display: flex;
        justify-content: space-between;
        .left {
          margin-left: 6vw;
          .lefta {
            display: flex;
            margin-top: 20px;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
          .leftb {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
          .leftc {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
        }
        .right {
          margin-left: 10vw;
          .rightb {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
          .righta {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
        }
      }
    }
    .bottom {
      .title {
        display: flex;
        justify-content: space-between;
        .left {
          margin-left: 6vw;
          .lefta {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
          .leftb {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
          .leftc {
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
        }
        .right {
          margin-left: 10vw;
          .rightb {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
          .righta {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
