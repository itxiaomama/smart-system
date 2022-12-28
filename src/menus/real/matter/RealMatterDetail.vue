<template>
  <div class="wrap">
    <div style="height: 80vh; width: 100%; overflow-y: auto">
      <div class="wrap">
        <div class="top">
          <div class="content">
            <div class="return" @click="btn_return">
              <a-icon type="left-circle" class="icon" />
            </div>
            <a-descriptions title="维修进度" >
              <div>
                {{info.status}}
                <a-steps :current="current">
                  <!-- <a-popover
                    slot="progressDot"
                    slot-scope="{ index, status, prefixCls }"
                  >
                    <template slot="content">
                      <span>step {{ index }} status: {{ status }}</span>
                    </template>
                    <span :class="`${prefixCls}-icon-dot`" />
                  </a-popover> -->
                  <a-step
                    title="待分配"
                    sub-title=""
                    :description="info.created_at"
                  />
                  <a-step
                    title="待处理"
                    sub-title=""
                    description="2021-09-13 22:30:03"
                  />
                  <a-step
                    title="已完成"
                    sub-title=""
                    description="2021-09-13 22:30:03"
                  />
                  <a-step
                    title="已评价"
                    sub-title=""
                    description="2021-09-13 22:30:03"
                  />
                </a-steps>
              </div>
            </a-descriptions>
          </div>
        </div>
      </div>
      <div class="wrap" style="margin-top: 20px">
        <div class="top">
          <div class="content">
            <a-descriptions title="报修信息" style="">
              <a-descriptions-item label="报修人">
                <p>{{info.contact}}</p>
              </a-descriptions-item>
              <a-descriptions-item label="维修单号">
                <p>{{info.repair_sn}}</p>
              </a-descriptions-item>
              <a-descriptions-item label="状态">
                <p>{{ info.status | menuTypeFilter }}</p>
              </a-descriptions-item>
              <a-descriptions-item label="联系方式">
                <p>{{info.mobile}}</p>
              </a-descriptions-item>
              <a-descriptions-item label="公司">
                <p>{{info.company_name}}</p>
              </a-descriptions-item>
              <a-descriptions-item label="园区">
                <p>{{info.company_address}}</p>
              </a-descriptions-item>
              <a-descriptions-item label="报修时间">
                <p>{{info.created_time}}</p>
              </a-descriptions-item>
              <a-descriptions-item label="报修区域">
                <p>4楼</p>
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </div>
      </div>
      <div class="wrap" style="margin-top: 20px">
        <div class="top">
          <div class="content">
            <a-descriptions title="维修信息" style="">
              <a-descriptions-item label="维修员">
                <p>{{info.worker_contact}}</p>
              </a-descriptions-item>
              <a-descriptions-item label="联系电话">
                <p>{{info.worker_mobile}}</p>
              </a-descriptions-item>
              <a-descriptions-item label="维修费用">
                <p>{{info.cost}}元</p>
              </a-descriptions-item>
              <a-descriptions-item label="开始时间">
                <p>{{info.worker_start_time}}</p>
              </a-descriptions-item>
              <a-descriptions-item label="结束时间">
                <p>{{info.worker_end_time}}</p>
              </a-descriptions-item>
              <a-descriptions-item label="报修材料">
                <p>{{info.material}}</p>
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </div>
      </div>
      <div class="wrap" style="margin-top: 20px" v-if="info.repair_evaluate">
        <div class="top">
          <div class="content">
            <a-descriptions title="评价" style="">
              
              <a-descriptions-item label="评价结果">
                {{info.repair_evaluate.evaluate | evaluateit }}
              </a-descriptions-item>
              <a-descriptions-item label="完成情况">
                <a-rate disabled v-model="info.repair_evaluate.attitude" />
              </a-descriptions-item>
              <a-descriptions-item label="意见建议">
                <p>{{info.repair_evaluate.suggest}}</p>
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </div>
      </div>
      <div class="wrap" style="margin-top: 20px">
        <div class="top">
          <div class="content">
            <a-descriptions title="维修日志" style=""></a-descriptions>
            <a-table
              :columns="columns"
              :data-source="dataSource"
            >
              <a slot="name" slot-scope="text">{{ text }}</a>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RealMatterDetail",
  filters: {
    menuTypeFilter(type) {
      const menuMap = {
        1: "待分配",
        2: "待处理",
        3: "待评价",
        4: "已评价",
        5: "已完成",
      };
      return menuMap[type];
    },
    evaluateit(type) {
      const menuMap = {
        0: "差",
        1: "一般",
        2: "还行",
        3: "满意",
        4: "很满意",
      };
      return menuMap[type];
    },
  },
  data() {
    return {
      dataSource: [],
      columns: [
        // {
        //   title: "操作类型",
        //   dataIndex: "belong",
        //   scopedSlots: { customRender: "belong" },
        // },
        {
          title: "操作人",
          dataIndex: "create_by",
          scopedSlots: { customRender: "create_by" },
        },
        {
          title: "操作详情",
          dataIndex: "remark",
          scopedSlots: { customRender: "remark" },
        },
        {
          title: "操作时间",
          dataIndex: "updated_at",
          scopedSlots: { customRender: "updated_at" },
        },
      ],
      valuea: 3,
      valueb: 5,
      info:{},
      current:0
    };
  },
  created() {
    // this.matterlist(this.$route.query.id); //渲染列表数据
    this.getInfo(this.$route.query.id);
  },
  methods: {
    getInfo(id){
      axios.get('/api/prop/repair?id='+id).then((res) =>{
        console.log(res)
        this.info = res.data ;
        this.dataSource = res.data.repair_logs;
        if(res.data.status == 1){
          this.current = 0;
        }else if(res.data.status == 2 || res.data.status == 3){
          this.current = 1;
        }else if(res.data.status == 4){
          this.current = 3;
        }else if(res.data.status == 5){
          this.current = 2;
        }
      })
    },
    // matterlist(id) {
    //   axios.get("/api/prop/repair?id="+id).then((res) => {
    //     if (res.status_code == 200) {
    //       this.dataSource = res.data.data;
    //     }
    //   });
    // },
    btn_return() {
      this.$router.push("/property/matter");
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  .top {
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
