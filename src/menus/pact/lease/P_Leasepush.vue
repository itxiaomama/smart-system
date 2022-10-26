<template>
  <div>
    <div class="wrap">
      <div class="top">
        <div class="content">
          <div class="return" @click="btn_return">
            <a-icon type="left-circle" class="icon" />
          </div>
          <a-divider class="divider" orientation="left">基本信息</a-divider>
          <a-descriptions
            :column="{ xxl: 4 }"
            title=""
            style="margin: 80px 0 0 180px"
          >
            <a-descriptions-item label="合同编号">
              <p>HT464650021</p>
            </a-descriptions-item>
            <a-descriptions-item label="管理编号">
              <p>SA46465566F5656S</p>
            </a-descriptions-item>
            <a-descriptions-item label="合同名称">
              <p>租赁退租</p>
            </a-descriptions-item>
            <a-descriptions-item label="租户名称">
              <p>老王头</p>
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <div class="content">
          <a-divider class="dividera" orientation="left">租赁场地</a-divider>
          <a-table
            style="width: 50vw; margin: 10vh auto"
            :data-source="dataSource"
            :columns="columns"
          >
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="">
              <a-tag color="cyan"></a-tag>
            </span>
          </a-table>
        </div>
        <div class="content">
          <a-divider class="dividerb" orientation="left">退租信息</a-divider>
          <div style="margin: 1px auto">
            <div class="buildname">
              <span>退租日期：</span><a-date-picker style="width: 38.5vw" />
            </div>
            <div class="buildname">
              <span>所属园区：</span>
              <a-select default-value="lucy" style="width: 38.5vw">
                <a-select-option value="lucy"> 正常到期 </a-select-option>
                <a-select-option value="jack"> 协商提前退租 </a-select-option>
                <a-select-option value="Yiminghe"> 违约清退 </a-select-option>
                <a-select-option value="Yiming"> 其他 </a-select-option>
              </a-select>
            </div>
            <div class="buildname">
              <span>应收费用：</span
              ><a-input placeholder="应收费用" style="width: 40vw"></a-input
              ><span>元</span>
            </div>
            <div class="buildname">
              <span>应退费用：</span
              ><a-input placeholder="应退费用" style="width: 40vw"></a-input
              ><span>元</span>
            </div>
            <div class="buildname">
              <span>费用合计：</span
              ><a-input placeholder="费用合计" style="width: 40vw"></a-input
              ><span>元</span>
            </div>
            <div class="buildname" style="margin-left: 19.6vw">
              <p>备注(可选)：</p>
              <a-textarea
                placeholder="请输入备注"
                :rows="6"
                style="width: 38.5vw"
              />
            </div>
            <div class="buildname" style="margin-left: 18.6vw">
              <p style="white-space: nowrap">上传园区小图：</p>
              <a-upload
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">上传</div>
                </div>
              </a-upload>
            </div>
          </div>
        </div>
        <div
          class="btnant"
          style="padding: 30px 35vw; border-top: 1px solid #e8e8e8"
        >
          <a-button style="margin-right: 20px" @click="btnup">返回</a-button>
          <a-button type="primary">提交</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "My_P_Pleasepush",
  data() {
    return {
      columns: [
        {
          title: "所属园区",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "所属楼宇",
          dataIndex: "build",
          scopedSlots: { customRender: "build" },
        },
        {
          title: "所属楼层",
          dataIndex: "address",
          scopedSlots: { customRender: "address" },
        },
        {
          title: "房间名称",
          dataIndex: "time",
          scopedSlots: { customRender: "time" },
        },
        {
          title: "收租面积(平方米)",
          dataIndex: "news",
          scopedSlots: { customRender: "news" },
        },
      ],
      dataSource: [
        {
          key: "0",
          name: "智慧园区",
          build: "西边楼",
          address: "4层",
          time: "111",
          news: "111",
        },
      ],
    };
  },
  methods: {
    btn_return() {
      this.$router.push("/home/Please");
    },
    btnup() {
      this.$router.push("/home/Please");
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  margin-top: 0px;
  .top {
    width: 85vw;
    height: 95vh;
    background-color: #fff;
    border-radius: 10px;
    .content {
      .return {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 0;
        top: 26px;
        .icon {
          font-size: 24px;
        }
      }
      margin: 20px;
      .divider {
        position: absolute;
        top: 2vw;
      }
      .dividera {
        position: absolute;
        top: 9vw;
      }
    }
  }
  .buildname {
    margin: 30px 20vw;
    display: flex;
    p {
      white-space: nowrap;
      line-height: 28px;
    }
    span {
      white-space: nowrap;
      line-height: 28px;
    }
  }
}
</style>
