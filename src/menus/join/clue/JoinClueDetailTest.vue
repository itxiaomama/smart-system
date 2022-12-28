<template>
  <div class="formwrap">
  <a-divider  orientation="left">跟进信息</a-divider>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >

    <a-form-model-item ref="name" label="意向状态：" prop="intention_state">
      <dict :keyValue="'ics_clue_intention_state'"  v-model="form.intention_state" />
    </a-form-model-item>

  <a-form-model-item label="跟进日期：" prop="investigation_time">
      <a-date-picker
        v-model="form.investigation_time"
        type="date"
        valueFormat="YYYY-MM-DD"
        placeholder="请选择日期"
        style="width: 100%;"
      />
    </a-form-model-item>

  <a-form-model-item label="跟进方式：" prop="investigation_mode">
    <dict :keyValue="'ics_clue_investigation_mode'" v-model="form.investigation_mode" />
    </a-form-model-item>

  <a-form-model-item label="跟进记录">
      <a-input v-model="form.investigation_record" type="textarea" />
    </a-form-model-item>

     <a-form-model-item label="计划跟进时间：" prop="plan_time">
      <a-date-picker
        v-model="form.plan_time"
        valueFormat="YYYY-MM-DD"
        type="date"
        placeholder="请选择日期"
        style="width: 100%;"
      />
    </a-form-model-item>
    <a-form-model-item label="计划跟进记录">
      <a-input v-model="form.plan_detailed" type="textarea" />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        提交
      </a-button>
      <a-button style="margin-left: 10px;" @click="resetForm">
        关闭
      </a-button>
    </a-form-model-item>
  </a-form-model>

  
  </div>
</template>

<script>
import axios from 'axios';
import dict from '@/components/common/dict.vue'
export default {
  name: "JoinClueDetailTest",
  components:{
    dict
  },
  data(){
    return{
      cid:null,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
      },
      rules: {
        intention_state: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        investigation_time: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
        plan_time: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
      },
    }
  },
  methods: {
    btnN() {
      this.$router.push("/home/Jcluedetail");
    },
     onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
       let data = {
        clue_id:this.cid,
        intention_state:this.form.intention_state,
        investigation_time:this.form.investigation_time,
        investigation_mode:this.form.investigation_mode,
        investigation_record:this.form.investigation_record,
        plan_time:this.form.plan_time,
        plan_detailed:this.form.plan_detailed
       }
          axios.post('/api/ics/clue/follow',data).then((res) =>{
            this.$router.push({
              path:'/merchants/club'
            })
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
  mounted(){
    this.cid = this.$route.query.cid
  }
};
</script>

<style lang="less" scoped>
.formwrap {
  width: 87vw;
  border-radius: 10px;
  padding:20px;
  background-color: #fff;

}
</style>
