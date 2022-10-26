<template>
  <div>
    <div class="wrap">
      <div class="top">
        <div class="content">
          <div class="return" @click="btn_return">
            <a-icon type="left-circle" class="icon" />
          </div>
          <a-divider class="divider" />
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
          <a-divider class="dividerb" />
          <a-descriptions title="维修信息" style="">
            <a-descriptions-item label="所属园区">
              <p>张学友</p>
            </a-descriptions-item>
            <a-descriptions-item label="投诉单号">
              <p>15846468961</p>
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
  name: "RealComplaintDetail",
  data() {
    return {
      dataSource: [
        {
          key: "0",
          belong: "待处理",
          roomname: "老王头",
          belongbuild: "已分配处理",
          floor: times,
        },
        {
          key: "1",
          belong: "待分配",
          roomname: "老李头",
          belongbuild: "工单号:4544655445",
          floor: times,
        },
        {
          key: "2",
          belong: "已完成",
          roomname: "张三",
          belongbuild: "已完成",
          floor: times,
        },
      ],
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
    };
  },
  methods: {
    btn_return() {
      this.$router.push("/home/Rcomplaint");
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
      .dividerb {
        position: absolute;
        top: 11vw;
        left: 0px;
      }
    }
  }
}
</style>
