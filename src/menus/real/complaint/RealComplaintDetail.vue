<template>
  <div>
    <div class="wrap">
      <div class="top">
        <div class="content">
          <div class="return" @click="btn_return">
            <a-icon type="left-circle" />
          </div>
          <a-descriptions title="处理进度" style="">
            <div>
              <a-steps :current="2">
                <a-popover
                  slot="progressDot"
                  slot-scope="{ index, status, prefixCls }"
                >
                  <template slot="content">
                    <span>step {{ index }} status: {{ status }}</span>
                  </template>
                  <span :class="`${prefixCls}-icon-dot`" />
                </a-popover>
                <a-step title="指派中" description="2021-09-13 22:30:03" />
                <a-step title="处理中" description="2021-09-13 22:30:03" />
                <a-step title="已完成" description="2021-09-13 22:30:03" />
                <a-step title="已评价" description="2021-09-13 22:30:03" />
              </a-steps>
            </div>
          </a-descriptions>
        </div>
      </div>
    </div>
    <div class="wrap" style="margin-top: 20px">
      <div class="top">
        <div class="content">
          <a-descriptions title="投诉信息" style="">
            <a-descriptions-item label="所属园区">
              <p>张学友</p>
            </a-descriptions-item>
            <a-descriptions-item label="投诉单号">
              <p>{{info.complaint_sn}}</p>
            </a-descriptions-item>
            <a-descriptions-item label="投诉人">
              <p>128元</p>
            </a-descriptions-item>
            <a-descriptions-item label="投诉时间">
              <p>2022-08-01 15::02:33</p>
            </a-descriptions-item>
            <a-descriptions-item label="描述">
              <p>2022-08-01 15::02:33</p>
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "RealComplaintDetail",
  data() {
    return {
      info:{}
    };
  },
  mounted(){
    this.getInfo(this.$route.query.id);
  },
  methods: {
    btn_return() {
      this.$router.push("/home/Rcomplaint");
    },
    getInfo(id){
      axios.get('/api/prop/complaint?id='+id).then((res) =>{
        console.log(res)
        this.info = res.data ;
      })
    }
  },
};
</script>

<style lang="less" scoped>
.wrap {
  margin-top: 0px;
  .top {
    // width: 85vw;
    background-color: #fff;
    border-radius: 10px;
    .content {
      .return {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 0;
        top: 16px;
        .icon {
          font-size: 24px;
        }
      }
      margin: 20px;
    }
  }
}
</style>
