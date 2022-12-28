<template>
  <div class="wrap">
    <div class="wrapA">
      <div class="content">
        <div class="cad_one" @click="btn">
          <a-card>
            <a-statistic
              title="本月应收总账单(元)"
              :value="112893"
              :precision="2"
              :value-style="{ color: '#cf1322' }"
            >
              <template #prefix>
                <a-icon type="arrow-up" />
              </template>
            </a-statistic>
            <div
              class="pay"
              style="display: flex; justify-content: space-between"
            >
              <span>总收款￥ <span>12.00</span></span>
              <span>未收款￥ <span>12.00</span></span>
            </div>
          </a-card>
        </div>
        <div class="cad_one">
          <a-card>
            <a-statistic
              title="物业管理费应收账单(元)"
              :value="112893"
              style="margin-right: 50px"
              :precision="2"
              :value-style="{ color: '#cf1322' }"
            >
              <template #prefix>
                <a-icon type="arrow-up" />
              </template>
            </a-statistic>
            <div
              class="pay"
              style="display: flex; justify-content: space-between"
            >
              <span>已收款￥ <span>12.00</span></span>
              <span>未收款￥ <span>12.00</span></span>
            </div>
          </a-card>
        </div>
        <div class="cad_one">
          <a-card>
            <a-statistic
              title="租金应收账单(元)"
              :value="112893"
              style="margin-right: 50px"
              :precision="2"
              :value-style="{ color: '#3f8600' }"
            >
              <template #prefix>
                <a-icon type="arrow-down" />
              </template>
            </a-statistic>
            <div
              class="pay"
              style="display: flex; justify-content: space-between"
            >
              <span>已收款￥ <span>12.00</span></span>
              <span>未收款￥ <span>12.00</span></span>
            </div>
          </a-card>
        </div>
        <div class="cad_one">
          <a-card>
            <a-statistic
              title="水电费应收账单(元)"
              :value="112893"
              style="margin-right: 50px"
              :precision="2"
              :value-style="{ color: '#cf1322' }"
            >
              <template #prefix>
                <a-icon type="arrow-up" />
              </template>
            </a-statistic>
            <div
              class="pay"
              style="display: flex; justify-content: space-between"
            >
              <span>已收款￥ <span>12.00</span></span>
              <span>未收款￥ <span>12.00</span></span>
            </div>
          </a-card>
        </div>
      </div>

      <div class="bottom">
        <a-tabs default-active-key="1" @change="callback" class="left_box">
          <a-tab-pane key="1" tab="应收款"
            ><div ref="myechart" style="width: 1200px; height: 400px"></div
          ></a-tab-pane>
          <a-tab-pane key="2" tab="已收款"> </a-tab-pane>
          <a-tab-pane key="3" tab="未收款">3</a-tab-pane>
        </a-tabs>
        <a-tabs type="card" @change="callback" class="right_box">
          <a-tab-pane key="1" tab="本月">
            <div class="card_one">
              <h3 style="margin-left: 36px">企业应收账单TOP10排行榜</h3>
              <ul class="topitem">
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">①</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">②</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">③</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">④</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">⑤</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">⑥</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">⑦</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">⑧</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">⑨</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">⑩</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
              </ul>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="本年">
            <div class="card_one">
              <h3 style="margin-left: 36px">企业应收账单TOP10排行榜</h3>
              <ul class="topitem">
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">①</span>
                    老王头实业
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">②</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">③</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">④</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">⑤</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">⑥</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">⑦</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">⑧</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">⑨</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
                <li style="display: flex; justify-content: space-between">
                  <div>
                    <span style="color: black">⑩</span>
                    张学友
                  </div>
                  <p>12800</p>
                </li>
              </ul>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div style="display: flex">
        <div>
          <a-card
            title="园区数据"
            :bordered="false"
            style="width: 50vw; margin-top: 20px"
            class="thone"
          >
            <div class="content">
              <div>
                <div ref="mytip" style="width: 180px; height: 180px"></div>
              </div>
              <div>
                <div ref="mytipa" style="width: 180px; height: 180px"></div>
              </div>
              <div>
                <div ref="mytipb" style="width: 180px; height: 180px"></div>
              </div>
            </div>
          </a-card>
        </div>
        <div class="card">1</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BenchGarden",
  data() {
    return {};
  },
  mounted() {
    this.setChart();
    this.matip();
    this.matipa();
    this.matipb();
  },
  methods: {
    btn() {
      this.$router.push("/test");
    },
    setChart() {
      var myChart = this.$echarts.init(this.$refs.myechart);
      var option = {
        xAxis: {
          data: [
            "01月",
            "02月",
            "03月",
            "04月",
            "05月",
            "06月",
            "07月",
            "08月",
            "09月",
            "10月",
            "11月",
            "12月",
          ],
        },
        yAxis: {},
        series: [
          {
            type: "bar",
            data: [
              51000, 28000, 36000, 21010, 31010, 20000, 56000, 28000, 36000,
              21010, 31010, 20000,
            ],
            color: "#1e90ff",
            barWidth: "55%",
          },
        ],
      };
      myChart.setOption(option);
    },
    matip() {
      var mytip = this.$echarts.init(this.$refs.mytip);
      var option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "90%",
          left: "center",
        },
        series: [
          {
            color: ["#FFC851", "#5A5476"],
            type: "pie",
            radius: ["45%", "70%"],
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 2, name: "楼宇栋数" },
              { value: 1, name: "欠费栋数" },
            ],
          },
        ],
      };
      option && mytip.setOption(option);
    },
    matipa() {
      var mytipa = this.$echarts.init(this.$refs.mytipa);
      var optiona = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "90%",
          left: "center",
        },
        series: [
          {
            color: ["#1869A0", "#FF9393"],
            type: "pie",
            radius: ["45%", "70%"],
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 27, name: "房屋间数" },
              { value: 5, name: "欠费间数" },
            ],
          },
        ],
      };
      optiona && mytipa.setOption(optiona);
    },
    matipb() {
      var mytipb = this.$echarts.init(this.$refs.mytipb);
      var optionb = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "90%",
          left: "center",
        },
        series: [
          {
            color: ["#45C2E0", "#C1EBDD"],
            type: "pie",
            radius: ["45%", "70%"],
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 27, name: "车位个数" },
              { value: 5, name: "欠费个数" },
            ],
          },
        ],
      };
      optionb && mytipb.setOption(optionb);
    },
    callback(key) {
      console.log(key);
    },
  },
  watch: {},
  created() {},
};
</script>
<style lang="less" scoped>
.ant-statistic {
  margin: 0 !important;
}
.wrap {
  .wrapA {
    flex: 1;
    .content {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      .cad_one {
        flex: 1;
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .bottom {
      margin-top: 20px;
      display: flex;
      .left_box {
        margin-right: 20px;
        background: #fff;
        flex: 1;
      }
      .right_box {
        background: #fff;
        flex: 0 0 25vw;
      }
      .topitem {
        padding-right: 20px;
      }
    }
    .thone {
      .content {
        display: flex;
        div {
          width: 200px;
          height: 200px;
        }
      }
    }
    .card {
      width: 33.6vw;
      background-color: pink;
      margin: 20px 0 0 20px;
    }
    .pay {
      width: 100%;
      height: 40px;
      // background-color: pink;
      border-top: 1px solid rgb(212, 210, 210);
      margin-top: 30px;
      span {
        margin-top: 10px;
      }
    }
  }
}
</style>
