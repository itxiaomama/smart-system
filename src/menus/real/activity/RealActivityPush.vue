<template>
  <div class="wrap" style="border-radius: 10px">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="活动名称：" prop="name">
        <a-input v-model="form.name" />
      </a-form-model-item>

      <a-form-model-item
        label="报名起止时间："
        prop="signbegin"
        class="leftitem"
      >
        <a-range-picker
          :ranges="{
            Today: [moment(), moment()],
            'This Month': [moment(), moment().endOf('month')],
          }"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          v-model="form.signbegin"
          @change="onChange"
        />
      </a-form-model-item>

      <a-form-model-item
        label="活动起止时间："
        prop="actbegin"
        class="leftitem"
      >
        <a-range-picker
          :ranges="{
            Today: [moment(), moment()],
            'This Month': [moment(), moment().endOf('month')],
          }"
          show-time
          v-model="form.actbegin"
          format="YYYY-MM-DD HH:mm:ss"
          @change="onChange1"
        />
      </a-form-model-item>

      <a-form-model-item label="活动地点：" prop="location">
        <a-input v-model="form.location" />
      </a-form-model-item>

      <a-form-model-item label="上传活动头像：">
        <uploadimgVue 
           :FileList="headimg"
           :limit="1"
            @upload="getupload"
            @remove="remove"
         />
      </a-form-model-item>

      <a-form-model-item label="上传活动小图：">
        <uploadimgVue 
          :FileList="smallimg" 
          :limit="1"
          @upload="getupload1"
          @remove="remove1"
        />
      </a-form-model-item>

      <a-form-model-item label="上传详情：">
        <wangeditorVue v-model="content" @change="changeit" />
      </a-form-model-item>

      <a-form-model-item label="联系电话：" prop="contacts" class="leftitem">
        <a-input v-model="form.contacts" style="width: 300px;" />
      </a-form-model-item>

      <a-form-model-item label="活动金额（元）：" prop="price" class="leftitem">
        <a-input-number v-model="form.price" style="width: 300px;" />
      </a-form-model-item>

      <a-form-model-item label="限制人数：" prop="full_num" class="leftitem" >
        <a-input-number v-model="form.full_num" style="width: 300px;" />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> 提交 </a-button>
        <a-button style="margin-left: 10px" @click="resetForm"> 返回 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import moment from "moment";
import uploadimgVue from "@/components/common/uploadimg.vue";
import wangeditorVue from "@/components/common/wangeditor.vue";
import axios from "axios";
export default {
  name: "RealActivityPush",
  components: {
    uploadimgVue,
    wangeditorVue,
  },
  data() {
    return {
      content:'',
      type:null,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      smallimg:[],
      headimg:[],
      form: {
        name: "",
        small_img:'',
        head_img:'',
        content:''
        },
      rules: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
        ],
        location: [
          {
            required: true,
            message: "请输入活动地点",
            trigger: "blur",
          },
        ],
        contacts: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur",
          },
        ],
        full_num: [
          {
            required: true,
            message: "请输入限制人数",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入活动金额",
            trigger: "blur",
          },
        ],
        signbegin: [
          { required: true, message: "请选择报名起止时间", trigger: "change" },
        ],
        actbegin: [
          { required: true, message: "请选择活动起止时间", trigger: "change" },
        ],
      },
    };
  },
  mounted(){
    
    this.type = JSON.parse(this.$route.query.type);
    if(this.type == 2){
      let obj = JSON.parse(this.$route.query.form);
      this.form = obj;
      this.form.head_img = obj.head_img;
      this.form.small_img = obj.small_img;
      this.form.signbegin = [moment(obj.sign_begin),moment(obj.sign_end)];
      this.form.actbegin = [moment(obj.act_begin),moment(obj.act_end)];
      this.$nextTick(() =>{
        this.content = obj.content;
      })
      if(obj.head_img){
        this.headimg.push(obj.head_img);
      }
      if(obj.small_img){
        this.smallimg.push(obj.small_img);
      }
    }
  },
  methods: {
    moment,
    onChange(dates, dateStrings) {
      this.form.sign_begin = dateStrings[0];
      this.form.sign_end = dateStrings[1];
    },
    onChange1(dates, dateStrings) {
      this.form.act_begin = dateStrings[0];
      this.form.act_end = dateStrings[1];
    },
    btnN() {
      this.$router.push("/property/activity");
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let data ={
            name: this.form.name,
            sign_begin:this.form.sign_begin,
            sign_end:this.form.sign_end,
            act_begin:this.form.act_begin,
            act_end:this.form.act_end,
            location:this.form.location,
            head_img:this.form.head_img,
            small_img:this.form.small_img,
            content:this.content,
            contacts:this.form.contacts,
            price:this.form.price,
            full_num:this.form.full_num
          }
          if(this.type == 1){
            axios.post('/api/prop/activity',data).then((res) =>{
              this.resetForm();
            });
          }else{
            data.id = this.form.id ;
            data.version = this.form.version ;
            axios.patch('/api/prop/activity',data).then((res) =>{
              this.resetForm();
            });
          }
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.$router.push({
        path:'/property/activity'
      })
    },
    getupload(file){
      this.form.head_img = file;
      this.headimg.push(file)
    },
    remove(){
      this.form.head_img = '';
      this.headimg = [];
    },
    getupload1(file){
      this.form.small_img = file;
      this.smallimg.push(file)
    },
    remove1(){
      this.form.small_img = '';
      this.smallimg = [];
    },
    changeit(val){
      this.content = val ;
    }
  },
};
</script>

<style lang="less" scoped>
.wrap {
  background-color: #fff;
  padding: 50px;
}
</style>
