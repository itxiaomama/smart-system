<template>
  <div>
    <div class="wrap">
      <div class="top">
        <div class="content">
             <a-button type="primary"  style="float:right;" v-if="FromDetail.customer_status ==0" @click="editit">编辑</a-button>
          <a-descriptions title="主要信息" style="">
            <a-descriptions-item label="主题名称">
              <p>{{ FromDetail.clue_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="线索来源">
              <p>{{ FromDetail.source_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="状态">
              <p>{{ FromDetail.customer_status_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="对接人">
              <p>{{ FromDetail.user_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="渠道分类">
              <p>{{ FromDetail.channel_category_name }}</p>
            </a-descriptions-item>
            <!-- <a-descriptions-item label="关闭原因">
              <p>客户暂无需求</p>
            </a-descriptions-item> -->
            <a-descriptions-item label="渠道名称">
              <p>{{ FromDetail.channel_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="详细描述">
              <p>{{ FromDetail.remark }}</p>
            </a-descriptions-item>
            <!-- <a-descriptions-item label="关闭说明">
              <p>--------</p>
            </a-descriptions-item> -->
          </a-descriptions>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="top">
        <div class="content">
          <!-- <a-divider class="dividera" /> -->
          <a-descriptions title="客户信息" style="">
            <a-descriptions-item label="客户名称">
              <p>{{ FromDetail.customer_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="客户类型">
              <p>{{ FromDetail.customer_type_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="证件号">
              <p>{{ FromDetail.credit_no }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="所属行业">
              <p>{{ FromDetail.sector }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="联系人">
              <p>{{ FromDetail.customer_name }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="联系电话">
              <p>{{ FromDetail.phone }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="邮箱">
              <p>{{ FromDetail.email }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="通讯地址">
              <p>{{ FromDetail.mail_address }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="邮编">
              <p>{{ FromDetail.postal_code }}</p>
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </div>
    <div class="wrap" v-if="FromDetail.customer_status !== 1">
      <div class="top">
        <div class="content">
        
          <a-button type="primary" v-if="FromDetail.assignment_status == 0 && FromDetail.customer_status == 0"  @click="dispatchit">分派</a-button>
          <a-button type="primary" v-if="FromDetail.assignment_status == 1 && FromDetail.customer_status == 0" @click="fololowit">跟进线索</a-button>
          <a-button @click="convertit"  v-if="FromDetail.assignment_status == 1 && FromDetail.customer_status == 0">转为客户</a-button>
          <a-button type="primary" v-if="FromDetail.assignment_status == 1 && FromDetail.customer_status == 2"  @click="topact">签订合同</a-button>
          <a-button  @click="visible = true">关闭线索</a-button>
        </div>
      </div>
    </div>

    <a-modal v-model="visible" title="关闭线索">
      <a-form-model ref="ruleForm" :model="form" :rules="rules"  :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="关闭原因：" prop="close_reason">
            <dict :keyValue="'ics_clue_close_reason'"  v-model="form.close_reason" />
          </a-form-model-item>
          <a-form-model-item label="关闭原因：">
            <a-input v-model="form.close_explain" type="textarea" />
          </a-form-model-item>
      </a-form-model>
      <template slot="footer">
      <div>
        <a-button @click="handleOk" style="margin-right: 20px"
          >取消</a-button
        >
        <a-button type="primary" @click="showAdd">确定</a-button>
      </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import dict from '@/components/common/dict.vue'
import axios from "axios";
export default {
  name: "JoinClueDetail",
  components:{
    dict
  },
  data() {
    return {
      visible: false,
      FromDetail: {},
      close_explain:'',
      close_reason:'',
      form:{},
      rules:{
        close_reason:[
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
  },
  methods: {
    // 签订合同
    topact(){
      this.$router.push({
        path:'/contract/intentiondetail',
        query:{
          type:1,
          clueid:this.FromDetail.id,
          other:true
        }
      })
    },
    editit(){
      let id  = this.$route.query.id;
      this.$router.push({
        path:"/merchants/clubdetail",
        query:{
          id:id
        }
      })
    },
    // 关闭线索
    showAdd() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let data ={
            id:this.FromDetail.id,
            version:this.FromDetail.version,
            close_reason:this.form.close_reason,
            close_explain:this.form.close_explain,
            customer_status: 1
          }
          axios.patch('/api/ics/clue/status',data).then((res) =>{
            console.log(res)
            this.$router.push({
              path:'/merchants/club'
            })
          })
      this.visible = false;
        
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    handleOk() {
      this.visible = false;
    },
    // 分派
    dispatchit(){
      this.$router.push({
        path:'/merchants/allot'
      })
    },
    // 线索跟进
    fololowit(){
      let  id = this.FromDetail.id
      this.$router.push({
        path:'/merchants/clubdetailfollow',
        query:{
          cid:id
        }
      })
    },
    // 转为客户
    convertit(){
      this.$router.push({
        path:'/merchants/clientdetail',
        query:{
          form:JSON.stringify(this.FromDetail),
          type:1,
          other:true
        }

      })
    }
  },
  mounted() {
    let id  = this.$route.query.id;
    axios.get("/api/ics/clue?id="+id).then((res) => {
      this.FromDetail = res.data;
      
    });
  },
};
</script>

<style lang="less" scoped>
.ant-btn{
  margin-right: 20px;
}
.btnant {
  padding: 10px 16px;
  text-align: right;
  background: transparent;
  border-top: 1px solid #e8e8e8;
  border-radius: 0 0 4px 4px;
}
.wrap {
  margin-bottom: 20px;
  .top {
    width: 87vw;
    background-color: #fff;
    border-radius: 10px;
    .content {
      .return {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 0;
        top: 36px;
        .icon {
          font-size: 24px;
        }
      }
      margin: 20px;
      .divider {
        position: absolute;
        top: 50px;
      }
      .dividera {
        position: absolute;
        top: 16vw;
      }
    }
  }
}
</style>
