<template>
  <div class="wrap">
    <div style="height: 87vh; width: 100%; overflow-y: auto">
      <div class="wrap">
        <div class="top">
          <div class="content">
            <div class="return" @click="btn_return">
              <a-icon type="left-circle" class="icon" />
            </div>
            <a-descriptions title="维修进度" style="">
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
                  <a-step
                    title="待分配"
                    sub-title="单号"
                    description="2021-09-13 22:30:03"
                  />
                  <a-step
                    title="待处理"
                    sub-title="单号"
                    description="2021-09-13 22:30:03"
                  />
                  <a-step
                    title="已完成"
                    sub-title="单号"
                    description="2021-09-13 22:30:03"
                  />
                  <a-step
                    title="已评价"
                    sub-title="单号"
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
                <p>测试客户</p>
              </a-descriptions-item>
              <a-descriptions-item label="维修单号">
                <p>WX464689561</p>
              </a-descriptions-item>
              <a-descriptions-item label="状态">
                <p>已完成</p>
              </a-descriptions-item>
              <a-descriptions-item label="联系方式">
                <p>151515665465</p>
              </a-descriptions-item>
              <a-descriptions-item label="公司">
                <p>老李维修公司</p>
              </a-descriptions-item>
              <a-descriptions-item label="园区">
                <p>紫薇广场</p>
              </a-descriptions-item>
              <a-descriptions-item label="报修时间">
                <p>2022-08-01 15::02:33</p>
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
                <p>张学友</p>
              </a-descriptions-item>
              <a-descriptions-item label="联系电话">
                <p>15846468961</p>
              </a-descriptions-item>
              <a-descriptions-item label="维修费用">
                <p>128元</p>
              </a-descriptions-item>
              <a-descriptions-item label="开始时间">
                <p>2022-08-01 15::02:33</p>
              </a-descriptions-item>
              <a-descriptions-item label="结束时间">
                <p>2022-08-01 15::02:33</p>
              </a-descriptions-item>
              <a-descriptions-item label="报修材料">
                <p>灯泡</p>
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </div>
      </div>
      <div class="wrap" style="margin-top: 20px">
        <div class="top">
          <div class="content">
            <a-descriptions title="评价" style="">
              <a-descriptions-item label="评价结果">
                <a-rate v-model="valuea" />
              </a-descriptions-item>
              <a-descriptions-item label="评价工人">
                <a-rate v-model="valueb" />
              </a-descriptions-item>
              <a-descriptions-item label="意见建议">
                <p>师傅很专业</p>
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
              :row-selection="rowSelection"
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
let yy = new Date().getFullYear();
let mm = new Date().getMonth() + 1;
let dd = new Date().getDate();
let hh = new Date().getHours();
let mf =
  new Date().getMinutes() < 10
    ? "0" + new Date().getMinutes()
    : new Date().getMinutes();
let ss =
  new Date().getSeconds() < 10
    ? "0" + new Date().getSeconds()
    : new Date().getSeconds();
let times = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
export default {
  name: "RealMatterDetail",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: "操作类型",
          dataIndex: "belong",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "操作人",
          dataIndex: "roomname",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "操作详情",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "操作时间",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
      ],
      valuea: 3,
      valueb: 5,
    };
  },
  created() {
    this.matterlist(); //渲染列表数据
  },
  methods: {
    matterlist() {
      axios.get("/api/prop/repair?per_page=99999").then((res) => {
        if (res.status_code == 200) {
          this.dataSource = res.data.data;
        }
      });
    },
    btn_return() {
      this.$router.push("/home/Rmatter");
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
        top: 16px;
        .icon {
          font-size: 24px;
        }
      }
      margin: 20px;
      .divider {
        position: absolute;
        top: 30px;
        left: 0px;
      }
      .dividera {
        position: absolute;
        top: 12.2vw;
        left: 0px;
      }
      .dividerb {
        position: absolute;
        top: 25.6vw;
        left: 0px;
      }
      .dividerc {
        position: absolute;
        top: 36.6vw;
        left: 0px;
      }
      .dividerd {
        position: absolute;
        top: 44.6vw;
        left: 0px;
      }
    }
  }
}
</style>
