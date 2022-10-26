<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="top">
          <!-- 搜索 -->
          <div class="left">
            <a-input-search
              placeholder="快速搜索"
              style="width: 200px; margin-right: 40px"
            />
          </div>
          <!-- 新增 -->
          <div class="bottom">
            <a-button type="primary" @click="showModal">新增</a-button>
            <a-modal v-model="visible" title="添加用户">
              <div class="buildname" style="margin: 20px 6px; display: flex">
                <span style="white-space: nowrap; line-height: 30px"
                  >上级权限：</span
                >
                <a-input placeholder="起一个名字" style="width: 19.4vw" />
              </div>
              <div
                class="inputG"
                style="display: flex; margin: 20px 20px 20px 6px"
              >
                <span class="spanA" style="line-height: 30px">菜单类型：</span>
                <a-input-group style="width: 15vw" compact>
                  <a-cascader
                    style="width: 19.4vw"
                    :options="property"
                    placeholder="请选择"
                  />
                </a-input-group>
              </div>
              <div class="buildname" style="margin: 20px 6px; display: flex">
                <span style="white-space: nowrap; line-height: 30px"
                  >权限名称：</span
                >
                <a-input placeholder="起一个名字" style="width: 19.4vw" />
              </div>
              <div class="buildname" style="margin: 20px -8px; display: flex">
                <span style="white-space: nowrap; line-height: 30px"
                  >路由唯一键：</span
                >
                <a-input placeholder="路由唯一键" style="width: 19.4vw" />
              </div>
              <div
                class="build"
                style="margin: 20px 20px 20px 15px; display: flex"
              >
                <span
                  style="
                    white-space: nowrap;
                    line-height: 30px;
                    margin-right: 5px;
                  "
                  >组件：<a-icon type="info-circle"
                /></span>
                <a-input placeholder="组件" style="width: 19.4vw" />
              </div>
              <div class="buildname" style="margin: 20px -8px; display: flex">
                <span style="white-space: nowrap; line-height: 30px"
                  >重定向地址：</span
                >
                <a-input placeholder="重定向地址" style="width: 19.4vw" />
              </div>
              <div style="display: flex; margin: 20px 20px 20px -8px">
                <span>隐藏子菜单：</span>
                <a-switch default-checked @change="onChange" />
              </div>
              <div style="display: flex; margin: 20px 20px 20px -22px">
                <span>隐藏头部信息：</span>
                <a-switch default-checked @change="onChange" />
              </div>
              <div class="buildname" style="margin: 20px -8px; display: flex">
                <span style="white-space: nowrap; line-height: 30px"
                  >路由唯一键：</span
                >
                <a-input placeholder="路由唯一键" style="width: 19.4vw" />
              </div>
              <div
                class="inputG"
                style="display: flex; margin: 20px 20px 20px 34px"
              >
                <span class="spanA" style="line-height: 30px">状态：</span>
                <a-input-group style="width: 15vw" compact>
                  <a-cascader
                    style="width: 19.4vw"
                    :options="property"
                    placeholder="请选择"
                  />
                </a-input-group>
              </div>
              <div
                style="
                  padding: 10px 16px;
                  text-align: right;
                  background: transparent;
                  border-top: 1px solid #e8e8e8;
                  border-radius: 0 0 4px 4px;
                "
              >
                <a-button @click="showCancel" style="margin-right: 20px"
                  >取消</a-button
                >
                <a-button type="primary" @click="showAdd">确定</a-button>
              </div>
            </a-modal>
          </div>
        </div>

        <div class="content">
          <a-table
            bordered
            :columns="columns"
            :data-source="data"
            :row-selection="rowSelection"
            :expanded-row-keys.sync="expandedRowKeys"
          >
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="actions">
              <!-- 编辑 -->
              <a href="javascript:;">编辑</a>
              <a-divider type="vertical" />
              <!-- 子新增 -->
              <a href="javascript:;">新增</a>
              <a-divider type="vertical" />
              <!--  -->
              <a href="javascript:;">删除</a>
            </span>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SystemMenu",
  data() {
    return {
      visible: false,
      data: [],
      columns: [
        {
          title: "权限名称",
          dataIndex: "menu_name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "路由唯一键",
          dataIndex: "menu_key",
        },
        {
          title: "组件",
          dataIndex: "component",
        },
        {
          title: "排序",
          dataIndex: "",
        },
        {
          title: "按钮类型",
          dataIndex: "menu_type",
        },
        {
          title: "链接",
          dataIndex: "",
        },
        {
          title: "重定向",
          dataIndex: "",
        },
        {
          title: "权限标识",
          dataIndex: "icon",
        },
        {
          title: "状态",
          dataIndex: "status_name",
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "actions" },
        },
      ],
    };
  },
  created() {
    this.PatrolPoint(); // 获取角色列表
  },
  methods: {
    // 获取角色列表
    PatrolPoint() {
      axios.get("/api/system/menu?per_page=9999").then((res) => {
        console.log(res);
        if (res.status_code == 200) {
          this.data = res.data;
        }
      });
    },
  },
  // 列表数据选择框 控制是否全选
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
  max-height: 80vh;
  overflow-y: auto;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
    display: flex;
    margin-bottom: 20px;
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
}
</style>