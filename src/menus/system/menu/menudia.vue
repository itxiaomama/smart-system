<template>
  <a-modal
    title="操作"
    style="top: 20px"
    :width="800"
    v-model="visible"
    @ok="handleSubmit"
    class="bigmodal"
  >
    <a-form :form="form">
      <a-form-item style="display: none">
        <a-input v-decorator="['menuId']" />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="上级权限"
      >
        <a-tree-select
          v-decorator="[
            'parent_id',
            { rules: [{ required: true, message: '请选择上级权限' }] },
          ]"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="permissions"
          placeholder="上级权限"
          treeDefaultExpandAll
        ></a-tree-select>
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="菜单类型"
      >
        <a-select
          v-decorator="[
            'menu_type',
            {
              initialValue: 'M',
              rules: [{ required: true, message: '请选择类型' }],
            },
          ]"
          @select="menuTypeChange"
        >
          <a-select-option :value="'M'">目录</a-select-option>
          <a-select-option :value="'C'">菜单</a-select-option>
          <a-select-option :value="'F'">按钮</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="权限名称"
      >
        <a-input
          v-decorator="[
            'menu_name',
            { rules: [{ required: true, message: '请输入权限名称' }] },
          ]"
          placeholder="起一个名字"
        />
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="路由唯一键"
      >
        <a-input
          v-decorator="[
            'menu_key',
            { initialValue: '', rules: [{ message: '请输入动态菜单唯一键' }] },
          ]"
          placeholder="路由唯一键：如'user'"
        />
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        v-show="menu_type != 'M'"
        label="权限标识"
      >
        <a-input
          v-decorator="[
            'perms',
            { rules: [{ required: false, message: '请输入权限标识' }] },
          ]"
          placeholder="权限标识"
        />
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        v-show="menu_type !== 'F'"
      >
        <span slot="label">
          组件
          <a-tooltip title="routerUtil中定义的组件或views文件下的路径">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-input
          v-decorator="[
            'component',
            { rules: [{ required: false, message: '请输入组件' }] },
          ]"
          placeholder="组件"
        />
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        v-show="menu_type !== 'F'"
        label="图标"
      >
        <a-input
          v-decorator="[
            'icon',
            { rules: [{ required: false, message: '请选择图标' }] },
          ]"
          ref="iconInput"
          @click="iconselect()"
          enterButton="选择图标"
          placeholder="选择图标"
        >
          <a-icon slot="prefix" :type="icon" />
          <a-icon slot="suffix" type="close-circle" @click="emitEmpty" />
        </a-input>
      </a-form-item>

      <!-- <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        v-show="menu_type === 'C'"
      >
        <span slot="label">
          链接地址
          <a-tooltip title="链接地址为外链时，打开方式必须为新窗口（antd限制）">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-input
          v-decorator="[
            'path',
            {
              rules: [
                {
                  required: false,
                  type: 'string',
                  message: '请输入正确的路径',
                },
              ],
            },
          ]"
          placeholder="路径"
        />
      </a-form-item> -->

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        v-show="menu_type !== 'F'"
        label="重定向地址"
      >
        <a-input
          v-decorator="[
            'redirect_to',
            { rules: [{ required: false, message: '请输入重定向地址' }] },
          ]"
          placeholder="重定向地址"
        />
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        v-show="menu_type !== 'F'"
        label="隐藏子菜单"
      >
        <a-switch
          v-decorator="[
            'hidden_children',
            { initialValue: false, valuePropName: 'checked' },
          ]"
        />
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        v-show="menu_type !== 'F'"
      >
        <span slot="label">
          隐藏头部信息
          <a-tooltip
            title="隐藏 PageHeader 组件中的页面带的 面包屑和页面标题栏"
          >
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-switch
          v-decorator="[
            'hidden_header',
            { initialValue: false, valuePropName: 'checked' },
          ]"
        />
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="显示顺序"
      >
        <a-input-number
          v-decorator="[
            'order_num',
            {
              initialValue: '1',
              rules: [{ required: true, message: '请输入顺序数字' }],
            },
          ]"
          placeholder="显示顺序"
        />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="状态">
        <a-select
          v-decorator="[
            'status',
            {
              initialValue: '0',
              rules: [{ required: true, message: '请选择状态' }],
            },
          ]"
        >
          <a-select-option :value="'1'">显示</a-select-option>
          <a-select-option :value="'0'">隐藏</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
        <a-input
          type="textarea"
          v-decorator="[
            'remark',
            { rules: [{ required: false, message: '请输入备注' }] },
          ]"
          placeholder="备注"
      /></a-form-item>
    </a-form>
    <iconSelector-modal ref="modal" @ok="setIcon" :icon="icon" />
  </a-modal>
</template>
<script>
// import { getPermissions, savePerm } from '@/api/system'
// import pick from 'lodash.pick'
import IconSelectorModal from "./iconmodal.vue";
import axios from "axios";
export default {
  name: "UserModal",
  components: {
    IconSelectorModal,
  },
  data() {
    return {
      description:
        "列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。",
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      permissions: [{ key: 0, value: "0", title: "无" }],
      mdl: {},
      icon: "smile",
      menu_type: "",
      form: this.$form.createForm(this),
      type: null,
      title: "",
      record: {},
    };
  },
  beforeCreate() {},
  created() {
    this.loadPermissions();
  },
  methods: {
    menuTypeChange(type) {
      this.menu_type = type;
    },
    emitEmpty() {
      this.$refs.iconInput.focus();
      this.form.setFieldsValue({ icon: "" });
    },
    iconselect() {
      this.$refs.modal.show();
    },
    setIcon(icon) {
      this.icon = icon;
      this.form.setFieldsValue({ icon: icon });
    },
    add(parent_id, type, title) {
      this.$nextTick(() =>{
      this.type = type;
      this.record.type = type;
      this.title = title;
      this.visible = true;
      this.form.resetFields();
      this.edit({ parent_id: parent_id || "0" });
    })
    },
    edit(record, type, title) {
      this.visible = true;
      this.$nextTick(() => {
      this.record = record;
      this.record.type = type;
      this.title = title;
      this.mdl = Object.assign({}, record);
      this.visible = true;
      this.menu_type = this.mdl.menu_type || "M";
        this.form.setFieldsValue({
          hidden_header: record.hidden_header == 0 ? false : true,
          hidden_children: record.hidden_children == 0 ? false : true,
          icon: record.icon,
          menu_key: record.menu_key,
          menu_name: record.menu_name,
          menu_type: record.menu_type,
          order_num: record.order_num,
          parent_id: record.parent_id,
          perms: record.perms,
          redirect_to: record.redirect_to,
          status: JSON.stringify(record.status),
          component: record.component,
          remark: record.remark,
        });
      });
    },
    validatePathTarget(rule, value, callback) {
      const path = this.form.getFieldValue("path");
      if (path && path.startsWith("http") && value !== "_blank") {
        callback(
          new Error("链接地址为外链时，打开方式必须为新窗口（antd限制）")
        );
      } else {
        callback();
      }
    },
    loadPermissions() {
      axios.get("/api/system/menu?per_page=9999").then((res) => {
        var list = this.getTreedata(res.data);
        this.permissions = list;
      });
    },
    getTreedata(data) {
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        var tempobj = {
          title: data[i].menu_name,
          value: data[i].id,
          key: data[i].id,
        };
        if ("children" in data[i]) {
          tempobj.children = this.getTreedata(data[i].children);
        }
        arr.push(tempobj);
      }
      return arr;
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let data = {
            hidden_children: values.hidden_children == false ? 0 : 1,
            hidden_header: values.hidden_header == false ? 0 : 1,
            icon: values.icon,
            menu_key: values.menu_key,
            menu_name: values.menu_name,
            menu_type: values.menu_type,
            order_num: values.order_num,
            parent_id: values.parent_id,
            perms: values.perms,
            redirect_to: values.redirect_to,
            status: values.status,
            component: values.component,
            remark: values.remark,
          };
          if (this.record.type !== 2) {
            this.confirmLoading = true;
            axios
              .post("/api/system/menu", data)
              .then((res) => {
                this.$message.success("新增成功");
                this.$parent.PatrolPoint();
                this.visible = false;
              })
              .catch(() => {
                this.$message.error("系统错误，请稍后再试");
              })
              .finally(() => {
                this.confirmLoading = false;
              });
          } else {
            this.confirmLoading = true;
            data.id = this.record.id;
            data.version = this.record.version;
            axios
              .patch("/api/system/menu", data)
              .then((res) => {
                this.$message.success("编辑成功");
                this.$parent.PatrolPoint();
                this.visible = false;
              })
              .catch(() => {
                this.$message.error("系统错误，请稍后再试");
              })
              .finally(() => {
                this.confirmLoading = false;
              });
          }
        }
      });
    },
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  },
};
</script>
