<template>
  <div>
    <div class="wrap">
      <div>
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="客户详情">
            <div class="wrap" style="border-radius: 10px">
              <div>
                <div class="ouer">
                  <div class="left">
                    <div class="inpA">
                      <span>客户名称：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="客户名称"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                    <div class="leftb" style="margin-top: 10px">
                      <p style="line-height: 30px">客户类型：</p>
                      <a-select default-value="" style="width: 30vw">
                        <a-select-option value="lucya">公司</a-select-option>
                        <a-select-option value="lucyb">个人</a-select-option>
                      </a-select>
                    </div>
                    <div class="inpB" style="margin-top: 0px">
                      <span>所属行业：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="所属行业"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                    <div class="leftb" style="margin-top: 10px">
                      <p style="line-height: 30px">过程管理：</p>
                      <a-select default-value="" style="width: 30vw">
                        <a-select-option value="lucya"
                          >初次拜访</a-select-option
                        >
                        <a-select-option value="lucyb"
                          >需求引导分析</a-select-option
                        >
                        <a-select-option value="lucyb"
                          >竞争阶段</a-select-option
                        >
                        <a-select-option value="lucyb"
                          >预定阶段</a-select-option
                        >
                        <a-select-option value="lucyb"
                          >合同阶段</a-select-option
                        >
                      </a-select>
                    </div>
                    <div class="inpA" style="margin-top: 0px">
                      <span>联系电话：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="联系电话"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                    <div
                      class="inpA"
                      style="margin-top: 10px; margin-left: -27px"
                    >
                      <span>统一信用代码：</span>
                      <a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="统一信用代码"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                    <div
                      class="inpD"
                      style="margin-left: -28px; margin-top: 15px"
                    >
                      <div class="Dset">
                        <p style="white-space: nowrap">上传公司头像：</p>
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
                      <p style="margin-left: 98px">尺寸建议:宽160px,高160px</p>
                    </div>
                    <div class="leftb" style="margin-top: 10px">
                      <p>渠道分类：</p>
                      <a-select default-value="" style="width: 30vw">
                        <a-select-option value="lucya"
                          >中介公司</a-select-option
                        >
                        <a-select-option value="lucyb">广告</a-select-option>
                        <a-select-option value="lucyc"
                          >合作推荐</a-select-option
                        >
                        <a-select-option value="lucyd"
                          >自开发渠道</a-select-option
                        >
                      </a-select>
                    </div>
                    <div class="leftb" style="margin-top: 10px">
                      <p>渠道类型：</p>
                      <a-select default-value="" style="width: 30vw">
                        <a-select-option value="lucya"
                          >中介公司</a-select-option
                        >
                        <a-select-option value="lucyb">广告</a-select-option>
                        <a-select-option value="lucyb"
                          >合作推荐</a-select-option
                        >
                        <a-select-option value="lucyb"
                          >自开发渠道</a-select-option
                        >
                      </a-select>
                    </div>
                    <div class="inpA" style="margin-top: 10px">
                      <span>渠道名称：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="渠道名称"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                    <div
                      class="inpA"
                      style="margin-left: -14px; margin-top: 10px"
                    >
                      <span>工商注册号：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="工商注册号"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                    <div
                      class="inpA"
                      style="margin-left: -28px; margin-top: 10px"
                    >
                      <span>组织机构代码：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="组织机构代码"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                    <div class="inpA" style="margin-top: 10px">
                      <span>注册资金：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="注册资金"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                    <div class="inpA" style="margin-top: 10px">
                      <span>注册地址：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="注册地址"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                  </div>
                  <div class="right">
                    <div class="inpO">
                      <span>简称：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="简称"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                    <div
                      class="leftb"
                      style="margin-left: -28px; margin-top: 10px"
                    >
                      <p style="line-height: 24px">客户状态：</p>
                      <a-select default-value="" style="width: 30vw">
                        <a-select-option value="lucya"
                          >潜在客户</a-select-option
                        >
                        <a-select-option value="lucyb"
                          >意向客户</a-select-option
                        >
                        <a-select-option value="lucyb"
                          >成交客户</a-select-option
                        >
                        <a-select-option value="lucyb"
                          >流失客户</a-select-option
                        >
                      </a-select>
                    </div>
                    <div
                      class="inpO"
                      style="margin-left: -14px; margin-top: 8px"
                    >
                      <span>联系人：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="联系人"
                        style="width: 30vw"
                      />
                    </div>
                    <div class="inpO" style="margin-top: 10px">
                      <span>邮箱：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="邮箱"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                    <div
                      class="inpC"
                      style="margin-left: -56px; margin-top: 10px"
                    >
                      <span>园区房间总数：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="请输入房间总数"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                    <div
                      class="inpE"
                      style="margin-left: -61px; margin-top: 15px"
                    >
                      <div class="Eset" style="margin-left: 22px">
                        <span style="white-space: nowrap; margin-right: 8px"
                          >上传照片墙:</span
                        >
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
                    <div
                      class="inpF"
                      style="margin-top: 25px; margin-left: -28px"
                    >
                      <div class="Fset">
                        <p>经营范围：</p>
                        <a-textarea
                          placeholder="经营范围"
                          :rows="8"
                          style="width: 30vw"
                        />
                      </div>
                    </div>
                    <div
                      class="inpA"
                      style="margin-left: -14px; margin-top: 10px"
                    >
                      <span>法人名：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="法人名"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                    <div
                      class="inpA"
                      style="margin-left: -28px; margin-top: 10px"
                    >
                      <span>企业性质：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="企业性质"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                    <div
                      class="inpA"
                      style="margin-left: -28px; margin-top: 10px"
                    >
                      <span>成立日期：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="成立日期"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                    <div
                      class="inpA"
                      style="margin-left: -28px; margin-top: 10px"
                    >
                      <span>登记机关：</span
                      ><a-input
                        size="1.875rem /* 30/16 */"
                        placeholder="登记机关"
                        @change="onChange"
                        style="width: 30vw"
                      />
                    </div>
                  </div>
                </div>
                <div class="pay">
                  <div class="inpN">
                    <a-button type="primary"> 提交 </a-button>
                    <router-link to="/home/Jclient">
                      <a-button
                        style="margin-left: 40px"
                        type="close-square"
                        @click="btnN"
                      >
                        <a-icon type="rollback" />关闭
                      </a-button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="关联合同">
            <div style="width: 85vw">
              <a-button type="primary" style="margin: 0 0 0 30px"
                >新增合同</a-button
              >
              <div style="margin: 20px">
                <a-table
                  bordered
                  :row-selection="rowSelection"
                  :data-source="dataSourcea"
                  :columns="columnsa"
                >
                  <a slot="name" slot-scope="text">{{ text }}</a>
                  <span slot="">
                    <a-tag color="cyan"></a-tag>
                  </span>
                  <template slot="action" slot-scope="text, record">
                    <a href="javascript:;">编辑</a>
                    <a-divider type="vertical" />
                    <a-popconfirm
                      v-if="dataSourcea.length"
                      title="确定删除?"
                      @confirm="() => onDelete(record.key)"
                    >
                      <a href="javascript:;">删除</a>
                    </a-popconfirm>
                  </template>
                </a-table>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3" tab="联系人">
            <div style="width: 85vw">
              <a-button
                type="primary"
                style="margin: 0 0 0 30px"
                @click="btnadd"
                >新增联系人</a-button
              >
              <a-modal v-model="visible" title="新增联系人" width="40%">
                <div class="buildname" style="margin: 20px 0 40px 14px">
                  <span>联系人：</span
                  ><a-input
                    placeholder="联系人"
                    style="width: 32vw"
                    @change="onChange"
                  ></a-input>
                </div>
                <div class="buildname" style="margin: 20px 0 40px 0px">
                  <span>联系电话：</span
                  ><a-input
                    placeholder="联系电话"
                    style="width: 32vw"
                    allow-clear
                    @change="onChange"
                  />
                </div>
                <div
                  class="remake"
                  style="display: flex; margin: 20px 0 30px 28px"
                >
                  <span>备注：</span>
                  <a-textarea
                    placeholder="请输入备注信息"
                    :rows="2"
                    allow-clear
                    style="width: 32vw"
                    @change="onChange"
                  />
                </div>
                <div
                  class="btnant"
                  style="
                    padding: 10px 16px;
                    text-align: right;
                    background: transparent;
                    border-top: 1px solid #e8e8e8;
                    border-radius: 0 0 4px 4px;
                  "
                >
                  <a-button style="margin-right: 20px" @click="showup"
                    >取消</a-button
                  >
                  <a-button type="primary">确定</a-button>
                </div>
              </a-modal>
              <div style="margin: 20px">
                <a-table
                  bordered
                  :row-selection="rowSelection"
                  :data-source="dataSourceb"
                  :columns="columnsb"
                >
                  <a slot="name" slot-scope="text">{{ text }}</a>
                  <span slot="">
                    <a-tag color="cyan"></a-tag>
                  </span>
                  <template slot="operation" slot-scope="text, record">
                    <a href="javascript:;">编辑</a>
                    <a-divider type="vertical" />
                    <a-popconfirm
                      v-if="dataSourceb.length"
                      title="确定删除?"
                      @confirm="() => onDelete(record.key)"
                    >
                      <a href="javascript:;">删除</a>
                    </a-popconfirm>
                  </template>
                </a-table>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="4" tab="相关文件">
            <div style="width: 85vw">
              <a-upload
                style="margin: 0 0 0 30px"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :default-file-list="dataSourcec"
              >
                <a-button type="primary">
                  <a-icon type="upload" />上传</a-button
                >
              </a-upload>
              <div style="margin: 20px">
                <a-table
                  bordered
                  :data-source="dataSourcec"
                  :columns="columnsc"
                >
                  <a slot="name" slot-scope="text">{{ text }}</a>
                  <span slot="">
                    <a-tag color="cyan"></a-tag>
                  </span>
                  <template slot="operation" slot-scope="text, record">
                    <a-popconfirm
                      v-if="dataSourceb.length"
                      title="确定删除?"
                      @confirm="() => onDelete(record.key)"
                    >
                      <a-icon type="delete" theme="twoTone" />
                      <a href="javascript:;">删除</a>
                    </a-popconfirm>
                    <a-divider type="vertical" />
                    <a-icon type="snippets" theme="twoTone" /><a
                      href="javascript:;"
                      >预览</a
                    >
                    <a-divider type="vertical" />
                    <a href="javascript:;"><a-icon type="download" />下载</a>
                  </template>
                </a-table>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
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
let times = yy + "/" + mm + "/" + dd + " " + hh + ":" + mf + ":" + ss;
export default {
  name: "JoinClientEdit",
  data() {
    return {
      dataSourcea: [
        {
          key: "0",
          name: "科技园",
          build: "WG87646143001",
          address: "租赁合同",
          time: times,
          news: "2022-07-20",
          new: "2023-07-20",
          state: "1",
          operation: "老王头 ",
        },
        {
          key: "1",
          name: "科技园",
          build: "WG87646143001",
          address: "租赁合同",
          time: times,
          news: "2022-07-20",
          new: "2023-07-20",
          state: "1",
          operation: "老王头 ",
        },
        {
          key: "2",
          name: "科技园",
          build: "WG87646143001",
          address: "租赁合同",
          time: times,
          news: "2022-07-20",
          new: "2023-07-20",
          state: "1",
          operation: "老王头 ",
        },
      ],
      columnsa: [
        {
          title: "合同编号",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "物管合同号",
          dataIndex: "build",
          scopedSlots: { customRender: "build" },
        },
        {
          title: "合同名称",
          dataIndex: "address",
          scopedSlots: { customRender: "address" },
        },
        {
          title: "签订时间",
          align: "center",
          sorter: (a, b) => {
            let aTimeString = a.time;
            let bTimeString = b.time;
            aTimeString = aTimeString.replace(/-/g, "/");
            bTimeString = bTimeString.replace(/-/g, "/");
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return aTime - bTime;
          },
          dataIndex: "time",
          scopedSlots: { customRender: "time" },
        },
        {
          title: "记租时间",
          dataIndex: "news",
          scopedSlots: { customRender: "news" },
        },
        {
          title: "到期时间",
          dataIndex: "new",
          scopedSlots: { customRender: "new" },
        },
        {
          title: "状态",
          dataIndex: "state",
          scopedSlots: { customRender: "state" },
        },
        {
          title: "签订人",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
      dataSourceb: [
        {
          key: "0",
          name: "张旭也",
          build: "187646143001",
          address: "备注",
        },
        {
          key: "1",
          name: "张旭也",
          build: "187646143001",
          address: "备注",
        },
        {
          key: "2",
          name: "张旭也",
          build: "187646143001",
          address: "备注",
        },
      ],
      columnsb: [
        {
          title: "签订人",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "联系电话",
          dataIndex: "build",
          scopedSlots: { customRender: "build" },
        },
        {
          title: "备注",
          dataIndex: "address",
          scopedSlots: { customRender: "address" },
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ],
      dataSourcec: [
        {
          key: "0",
          name: "张旭也.002151",
        },
      ],
      columnsc: [
        {
          title: "文件名",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "操作",
          dataIndex: "operation",
          width: 400,
          scopedSlots: { customRender: "operation" },
        },
      ],
      defaultFileList: [
        // {
        //   uid: "",
        //   name: "",
        //   status: "",
        //   response: "",
        //   url: "",
        // },
      ],
      visible: false,
    };
  },
  methods: {
    callback() {},
    handleChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    onChange() {
      console.log();
    },
    btnadd() {
      this.visible = true;
    },
    showup() {
      this.visible = false;
    },
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: (record) => ({
          props: {
            disabled: record.name === "Disabled User",
            name: record.name,
          },
        }),
      };
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  position: relative;
  width: 85vw;
  border-radius: 10px;
  background-color: #fff;
  .ouer {
    width: 85vw;
    display: flex;
    margin: 0px auto;
    justify-content: space-evenly;

    .left {
      margin-left: 0px;
      .leftb {
        display: flex;
      }
      .inpD {
        .Dset {
          display: flex;
        }
      }
      .inpF {
        .Fset {
          display: flex;
        }
      }
    }
    .right {
      .leftb {
        display: flex;
      }
      .inpE {
        .Eset {
          display: flex;
        }
      }
      .inpF {
        .Fset {
          display: flex;
        }
      }
    }
  }
  .pay {
    margin: 0 auto;
    margin: 30px 0 30px 730px;
  }
}
</style>
