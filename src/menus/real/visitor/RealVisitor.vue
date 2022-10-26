<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="matter" style="position: relative">
            <a-tabs
              default-active-key="1"
              style="position: absolute; width: 97.5%"
            >
              <a-tab-pane key="1">
                <span slot="tab">
                  <a-icon type="contacts" style="fontsize: 24px" />
                  来访人员
                </span>
                <div class="carcase">
                  <div style="width: 70.88%" class="carleft">
                    <span>来访情况</span>
                  </div>
                  <div class="carright"><span>离开情况</span></div>
                </div>
                <div class="car">
                  <a-table
                    bordered
                    :row-selection="rowSelection"
                    :columns="columnsB"
                    :data-source="dataB"
                    :rowKey="(record, id) => id"
                    :pagination="paginationPeople"
                  >
                    <a slot="visitor_name" slot-scope="text">{{ text }}</a>
                    <span slot="action" slot-scope="text, record">
                      <a
                        href="javascript:;"
                        @click="
                          EditPeople(
                            record.visitor_name,
                            record.peer_nums,
                            record.contact,
                            record.number,
                            record.come_time,
                            record.describe,
                            record.inter_name,
                            record.leave_time,
                            record.leave_duty,
                            record.image
                          )
                        "
                        ><a-icon type="file-text" theme="twoTone" />详情</a
                      >
                      <a-modal
                        v-model="visiblePeople"
                        title="来访人员详情"
                        width="40%"
                      >
                        <a-descriptions>
                          <a-descriptions-item label="来访人姓名" span="2"
                            >{{ from.visitor_name }}
                          </a-descriptions-item>
                          <a-descriptions-item label="同行人数">
                            {{ from.peer_nums }}
                          </a-descriptions-item>
                          <a-descriptions-item label="联系方式" span="2"
                            >{{ from.contact }}
                          </a-descriptions-item>
                          <a-descriptions-item label="有效证件号码"
                            >{{ from.number }}
                          </a-descriptions-item>
                          <a-descriptions-item label="来访时间" span="2"
                            >{{ from.come_time }}
                          </a-descriptions-item>
                          <a-descriptions-item label="来访事由"
                            >{{ from.describe }}
                          </a-descriptions-item>
                          <a-descriptions-item label="拜访对象"
                            >{{ from.inter_name }}
                          </a-descriptions-item>
                          <a-descriptions-item label="离开时间"
                            >{{ from.leave_time }}
                          </a-descriptions-item>
                          <a-descriptions-item label="值班人员"
                            >{{ from.leave_duty }}
                          </a-descriptions-item>
                          <a-descriptions-item label="访客照片">
                            <a-card hoverable style="width: 240px">
                              <img
                                slot="cover"
                                alt="example"
                                :src="from.image"
                              />
                            </a-card>
                          </a-descriptions-item>
                        </a-descriptions>
                        <div
                          style="
                            padding: 10px 16px;
                            text-align: right;
                            background: transparent;
                            border-top: 1px solid #e8e8e8;
                            border-radius: 0 0 4px 4px;
                          "
                        >
                          <a-button
                            @click="EditPeopleCancel"
                            style="margin-right: 20px"
                            >取消</a-button
                          >
                        </div>
                      </a-modal>
                      <a-divider type="vertical" />
                      <a
                        href="javascript:;"
                        @click="DeletePeople(record.id, record.version)"
                        ><a-icon type="delete" theme="twoTone" />删除</a
                      >
                    </span>
                  </a-table>
                </div>
              </a-tab-pane>
              <a-tab-pane key="2">
                <span slot="tab">
                  <a-icon type="car" style="fontsize: 24px" />
                  来访车辆
                </span>
                <div class="carcase">
                  <div class="carleft"><span>开进情况</span></div>
                  <div class="carright"><span>开出情况</span></div>
                </div>
                <div class="car">
                  <a-table
                    bordered
                    :row-selection="rowSelection"
                    :columns="columnsA"
                    :data-source="dataA"
                    :rowKey="(record, id) => id"
                    :pagination="paginationCar"
                  >
                    <span slot="action" slot-scope="text, record">
                      <a
                        href="javascript:;"
                        @click="
                          EditCar(
                            record.number,
                            record.contact,
                            record.come_time,
                            record.describe,
                            record.leave_time,
                            record.leave_duty,
                            record.image
                          )
                        "
                        ><a-icon type="file-text" theme="twoTone" />详情</a
                      >
                      <a-modal
                        v-model="visibleCar"
                        title="来访车辆详情"
                        width="40%"
                      >
                        <a-descriptions>
                          <a-descriptions-item label="车牌号码" span="2"
                            >{{ from.number }}
                          </a-descriptions-item>
                          <a-descriptions-item label="联系方式"
                            >{{ from.contact }}
                          </a-descriptions-item>
                          <a-descriptions-item label="开进时间" span="2"
                            >{{ from.come_time }}
                          </a-descriptions-item>
                          <a-descriptions-item label="来访事由">
                            {{ from.describe }}
                          </a-descriptions-item>
                          <a-descriptions-item label="离开时间" span="2"
                            >{{ from.leave_time }}
                          </a-descriptions-item>
                          <a-descriptions-item label="值班人员"
                            >{{ from.leave_duty }}
                          </a-descriptions-item>
                          <a-descriptions-item label="访客照片">
                            <a-card hoverable style="width: 240px">
                              <img
                                slot="cover"
                                alt="example"
                                :src="from.image"
                              />
                            </a-card>
                          </a-descriptions-item>
                        </a-descriptions>

                        <div
                          style="
                            padding: 10px 16px;
                            text-align: right;
                            background: transparent;
                            border-top: 1px solid #e8e8e8;
                            border-radius: 0 0 4px 4px;
                          "
                        >
                          <a-button
                            @click="EditCarCancel"
                            style="margin-right: 20px"
                            >取消</a-button
                          >
                        </div>
                      </a-modal>
                      <a-divider type="vertical" />
                      <a
                        href="javascript:;"
                        @click="DeleteCar(record.id, record.version)"
                        ><a-icon type="delete" theme="twoTone" />删除</a
                      >
                    </span>
                  </a-table>
                </div>
              </a-tab-pane>
            </a-tabs>
            <div style="position: absolute; top: 0px; right: 48px">
              <a-button type="primary" @click="Refresh"> 刷新 </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "RealVisitor",
  data() {
    return {
      dataB: [],
      current_page: {},
      columnsB: [
        {
          title: "ID",
          dataIndex: "id",
          width: 60,
          align: "center",
          scopedSlots: { customRender: "id" },
        },
        {
          title: "来访人姓名",
          dataIndex: "visitor_name",
          width: 150,
          align: "center",
          scopedSlots: { customRender: "visitor_name" },
        },
        {
          title: "同行人数",
          dataIndex: "peer_nums",
          width: 90,
          align: "center",
          scopedSlots: { customRender: "peer_nums" },
        },
        {
          title: "联系方式",
          dataIndex: "contact",
          width: 160,
          align: "center",
          scopedSlots: { customRender: "contact" },
        },
        {
          title: "有效证件号码",
          dataIndex: "number",
          width: 200,
          align: "center",
          scopedSlots: { customRender: "number" },
        },
        {
          title: "来访时间",
          dataIndex: "come_time",
          width: 200,
          align: "center",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "来访事由",
          dataIndex: "describe",
          width: 110,
          align: "center",
          scopedSlots: { customRender: "newtime" },
        },
        {
          title: "拜访对象",
          dataIndex: "inter_name",
          width: 100,
          align: "center",
          scopedSlots: { customRender: "boss" },
        },
        {
          title: "离开时间",
          dataIndex: "leave_time",
          width: 200,
          align: "center",
          scopedSlots: { customRender: "con" },
        },
        {
          title: "值班人员",
          dataIndex: "leave_duty",
          width: 130,
          align: "center",
          scopedSlots: { customRender: "condi" },
        },
        {
          title: "操作",
          width: 135,
          dataIndex: "action",
          align: "center",
          scopedSlots: { customRender: "action" },
        },
      ],
      dataA: [],
      columnsA: [
        {
          title: "ID",
          dataIndex: "id",
          width: 50,
          align: "center",
          scopedSlots: { customRender: "id" },
        },
        {
          title: "车牌号码",
          dataIndex: "number",
          width: 150,
          align: "center",
          scopedSlots: { customRender: "butt" },
        },

        {
          title: "联系方式",
          dataIndex: "contact",
          width: 250,
          align: "center",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "开进时间",
          dataIndex: "come_time",
          width: 250,
          align: "center",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "来访事由",
          dataIndex: "describe",
          width: 250,
          align: "center",
          scopedSlots: { customRender: "newtime" },
        },
        {
          title: "离开时间",
          dataIndex: "leave_time",
          width: 220,
          align: "center",
          scopedSlots: { customRender: "con" },
        },
        {
          title: "值班人员",
          dataIndex: "leave_duty",
          width: 220,
          align: "center",
          scopedSlots: { customRender: "condi" },
        },
        {
          title: "操作",
          align: "center",
          width: 150,
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
      // 数据分页
      paginationPeople: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationPeople.defaultCurrent = current;
          this.paginationPeople.defaultPageSize = pageSize;
          this.peoplelist(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationPeople.defaultCurrent = current;
          this.paginationPeople.defaultPageSize = size;
          this.peoplelist();
        },
      },
      paginationCar: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationCar.defaultCurrent = current;
          this.paginationCar.defaultPageSize = pageSize;
          this.carlist(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationCar.defaultCurrent = current;
          this.paginationCar.defaultPageSize = size;
          this.carlist();
        },
      },
      // 车辆弹框
      visibleCar: false,
      visiblePeople: false,
      from: {},
    };
  },
  methods: {
    inPutDelete() {},
    // 数据分页调用
    peoplelist() {
      console.log(this.cameraParams);
      const { defaultCurrent, defaultPageSize } = this.paginationPeople;
      this.$api.Camera.getCameraList({
        currPage: defaultCurrent,
        pageSize: defaultPageSize,
        info: this.cameraParams,
      })
        .then((res) => {
          if (res.code != "200") {
            return Promise.reject;
          }
          this.dataB = res.data;
          this.paginationPeople.total = res.total;
        })
        .catch(() => {});
    },
    carlist() {
      console.log(this.cameraParams);
      const { defaultCurrent, defaultPageSize } = this.paginationCar;
      this.$api.Camera.getCameraList({
        currPage: defaultCurrent,
        pageSize: defaultPageSize,
        info: this.cameraParams,
      })
        .then((res) => {
          if (res.code != "200") {
            return Promise.reject;
          }
          this.dataA = res.data;
          this.paginationCar.total = res.total;
        })
        .catch(() => {});
    },
    //todol 来访人员//
    // 获取访客列表数据
    peoplelist() {
      axios.get("/api/prop/visit?type=0").then((res) => {
        if (res.status_code == 200) {
          this.dataB = res.data.data;
        }
      });
    },
    // 删除访客列表数据
    DeletePeople(id, version) {
      axios
        .delete("/api/prop/visit", {
          params: {
            id: id,
            version: version,
          },
        })
        .then((res) => {
          if (res.status_code === 204) {
            //成功
          }
          // 回调获取访客列表数据方法
          this.peoplelist();
        });
    },
    // 来访人员详情
    EditPeople(
      visitor_name,
      peer_nums,
      contact,
      number,
      come_time,
      describe,
      inter_name,
      leave_time,
      leave_duty,
      image
    ) {
      this.visiblePeople = true;
      this.from.visitor_name = JSON.parse(JSON.stringify(visitor_name));
      this.from.peer_nums = JSON.parse(JSON.stringify(peer_nums));
      this.from.contact = JSON.parse(JSON.stringify(contact));
      this.from.number = JSON.parse(JSON.stringify(number));
      this.from.come_time = JSON.parse(JSON.stringify(come_time));
      this.from.describe = JSON.parse(JSON.stringify(describe));
      this.from.inter_name = JSON.parse(JSON.stringify(inter_name));
      this.from.leave_time = JSON.parse(JSON.stringify(leave_time));
      this.from.leave_duty = JSON.parse(JSON.stringify(leave_duty));
      this.from.image = image;
    },
    // 来访人员详情弹窗
    EditPeopleCancel() {
      this.visiblePeople = false;
    },
    //来访人员列表刷新
    Refresh() {
      this.peoplelist();
    },
    //todol 来访车辆//
    // 获取车辆列表数据
    carlist() {
      axios.get("/api/prop/visit?type=1").then((res) => {
        if (res.status_code == 200) {
          this.dataA = res.data.data;
        }
      });
    },
    // 删除车辆列表数据
    DeleteCar(id, version) {
      axios
        .delete("/api/prop/visit", {
          params: {
            id: id,
            version: version,
          },
        })
        .then((res) => {
          if (res.status_code === 204) {
            //成功
          }
          // 回调获取访客列表数据方法
          this.carlist();
        });
    },
    // 来访车辆详情
    EditCar(
      contact,
      number,
      come_time,
      describe,
      leave_time,
      leave_duty,
      image
    ) {
      this.visibleCar = true;
      this.from.contact = JSON.parse(JSON.stringify(contact));
      this.from.number = JSON.parse(JSON.stringify(number));
      this.from.come_time = JSON.parse(JSON.stringify(come_time));
      this.from.describe = JSON.parse(JSON.stringify(describe));
      this.from.leave_time = JSON.parse(JSON.stringify(leave_time));
      this.from.leave_duty = JSON.parse(JSON.stringify(leave_duty));
      this.from.image = JSON.parse(JSON.stringify(image));
    },
    // 来访车辆详情弹窗
    EditCarCancel() {
      this.visibleCar = false;
    },
    //来访车辆列表刷新
    Refresh() {
      this.carlist();
    },
  },
  //获取列表数据
  created() {
    this.peoplelist();
    this.carlist();
  },
  computed: {
    rowSelection() {
      return {
        onChange: () => {},
      };
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  width: 87.3vw;
  height: 85vh;
  position: absolute;
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .matter {
    .carcase {
      width: 100%;
      height: 40px;
      border: 1px solid rgb(185, 231, 250);
      display: flex;
      .carleft {
        width: 63%;
        border-right: 1px solid rgb(185, 231, 250);
        text-align: center;
        line-height: 40px;
        span {
          letter-spacing: inherit;
        }
      }
      .carright {
        margin: auto;
      }
    }
  }
}
</style>