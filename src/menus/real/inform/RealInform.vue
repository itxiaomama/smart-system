<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="search">
          <div class="top">
            <div class="left">
              <a-input
                placeholder="请输入通知主题"
                addonBefore="通知主题"
                style="margin-right: 40px"
              />
            </div>
            <div class="right">
              <div class="test">
                <a-button type="primary"> 查询 </a-button>
                <a-button style="margin-left: 20px">重置</a-button>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="bottom" style="margin-bottom: 20px">
              <a-button
                style="
                  background-color: rgb(121, 199, 250);
                  margin-left: 2px;
                  border: none;
                  border-radius: 4px;
                "
                ><a-dropdown :trigger="['click']">
                  <a
                    class="ant-dropdown-link"
                    @click="(e) => e.preventDefault()"
                    style="color: aliceblue"
                  >
                    发布微信通知<a-icon type="down" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item key="0">
                      <a href="javascript:;" @click="btnw_over(1)">全部通知</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="javascript:;" @click="btnw_over(2)">房屋通知</a>
                    </a-menu-item>
                    <a-menu-item key="3"
                      ><a href="javascript:;" @click="btnw_over(3)">商铺通知</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown></a-button
              >
              <a-button
                style="
                  background-color: rgb(121, 199, 250);
                  margin-left: 2px;
                  border: none;
                  border-radius: 4px;
                "
              >
                <a-dropdown :trigger="['click']">
                  <a
                    class="ant-dropdown-link"
                    @click="(e) => e.preventDefault()"
                    style="color: aliceblue"
                  >
                    发布短信通知<a-icon type="down" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item key="0">
                      <a href="javascript:;" @click="btnd_over(1)">全部通知</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="javascript:;" @click="btnd_over(2)">房屋通知</a>
                    </a-menu-item>
                    <a-menu-item key="3"
                      ><a href="javascript:;" @click="btnd_over(3)">商铺通知</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </a-button>
            </div>
          </div>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
            >
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="area">
                <a-select default-value="lucy" style="width: 95px">
                  <a-select-option value="lucy"> 微信通知 </a-select-option>
                  <a-select-option value="jack"> 短息通知 </a-select-option>
                </a-select>
              </span>
              <span slot="floor" slot-scope="floor">
                <a-tag
                  v-for="tag in floor"
                  :key="tag"
                  :color="
                    tag === '已审'
                      ? 'cyan'
                      : tag.length < 3
                      ? 'red'
                      : ' #87d068'
                  "
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
              <span slot="area" slot-scope="area">
                <a-tag
                  v-for="tag in area"
                  :key="tag"
                  :color="tag === '微信通知' ? 'orange' : 'pink'"
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
              <span slot="action" slot-scope="text, record">
                <a-icon type="minus-circle" theme="twoTone" /><a
                  href="javascript:;"
                  >反审</a
                >
                <a-divider type="vertical" />
                <a-icon type="check-circle" theme="twoTone" /><a
                  href="javascript:;"
                  >审核</a
                >
                <a-divider type="vertical" />
                <a-icon type="api" theme="twoTone" /><a href="javascript:;"
                  >发送</a
                >
                <a-divider type="vertical" />
                <a-icon type="edit" theme="twoTone" /><a
                  href="javascript:;"
                  @click="editit(1, 2)"
                  >编辑</a
                >
                <a-divider type="vertical" />
                <a-icon type="delete" theme="twoTone" /><a-popconfirm
                  v-if="dataSource.length"
                  title="确定删除?"
                  @confirm="() => onDelete(record.key)"
                >
                  <a href="javascript:;">删除</a>
                </a-popconfirm>
                <a-divider type="vertical" />
                <a-icon type="printer" theme="twoTone" /><a
                  href="javascript:;"
                  @click="btn_send"
                  >发送记录</a
                >
                <a-divider type="vertical" />
                <a-icon type="eye" theme="twoTone" /><a
                  href="javascript:;"
                  @click="btn_read"
                  >阅读记录</a
                >
              </span>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RealInform",
  data() {
    return {
      dataSource: [
        {
          key: "0",
          roomname: "通知主题：【缴纳物业费】",
          belongbuild: "琪炜智创园",
          floor: ["已审"],
          area: ["微信通知"],
        },
        {
          key: "1",
          roomname: "通知主题：【缴纳租金】",
          belongbuild: "琪炜智创园",
          floor: ["未审"],
          area: ["短信通知"],
        },
        {
          key: "2",
          roomname: "通知主题：【缴纳租金】",
          belongbuild: "琪炜智创园",
          floor: ["发送成功"],
          area: ["微信通知"],
        },
      ],
      columns: [
        {
          title: "通知主题",
          dataIndex: "roomname",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "所属主体",
          dataIndex: "belongbuild",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "状态",
          dataIndex: "floor",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "通知方式",
          dataIndex: "area",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  methods: {
    btnw_over(type) {
      this.$router.push({
        path: "/property/informdetail",
        query: {
          type: type,
        },
      });
    },
    btnd_over(type) {
      this.$router.push({
        path: "/property/messdetail",
        query: {
          type: type,
        },
      });
    },
    editit(type, type1) {
      // type  为1 时是微信通知
      if (type == 1) {
        this.btnw_over(type1);
      } else {
        this.btnd_over(type1);
      }
    },
    btn_send() {
      this.$router.push("/property/senddetail");
    },
    btn_read() {
      this.$router.push("/property/readdetail");
    },
    onDelete(key) {
      console.log(key);
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(
        (dataSource) => dataSource.key !== key
      );
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
  background-color: #fff;
  border-radius: 10px;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
    display: flex;
    .left {
      display: flex;
    }
    .right {
      display: flex;
      margin-left: 40px;
      .state {
        margin-left: 40px;
      }
    }
  }
  .bottom {
    display: flex;
    margin-top: 10px;
  }
}
</style>
