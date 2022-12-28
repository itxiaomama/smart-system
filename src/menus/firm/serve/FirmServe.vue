<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="top">
          <div class="left">
            <!-- 搜索 -->
            <a-input-search
              placeholder="请输入服务名称"
              style="width: 200px; margin-right: 20px"
              @click="ShowEdit(true)"
              v-model="inputVal"
            />
          </div>
          <div class="bottom">
            <!-- 新增 -->
            <a-button type="primary" @click="AddList({}, 1, '新增服务')"
              >新增</a-button
            >
          </div>
        </div>
        <div class="content" style="margin-top: 20px">
          <div>
            <a-table
              bordered
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="dataSource"
              rowKey="id"
              :pagination="paginationServe"
            >
              <!-- 状态开关 -->
              <span slot="area" slot-scope="text, record">
                <a-switch
                  v-if="record.is_marketable == 1"
                  default-checked
                  checked-children="是"
                  un-checked-children="否"
                  @change="
                    switchChange(
                      $event,
                      record.id,
                      record.version,
                      'is_marketable'
                    )
                  "
                />
                <a-switch
                  v-if="record.is_marketable == 0"
                  default-unchecked
                  checked-children="是"
                  un-checked-children="否"
                  @change="
                    switchChange(
                      $event,
                      record.id,
                      record.version,
                      'is_marketable'
                    )
                  "
                />
              </span>
              <template slot="action" slot-scope="text, record">
                <!-- 编辑 -->
                <a @click="AddList(record, 2, '编辑服务')"
                  ><a-icon type="edit" theme="twoTone" />编辑
                </a>
                <a-divider type="vertical" />
                <!-- 删除 -->
                <a
                  href="javascript:;"
                  @click="DeleteManage(record.id, record.version)"
                >
                  <a-icon type="delete" theme="twoTone" />删除</a
                >
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增modal弹框 -->
    <a-modal v-model="visibleAdd" @ok="handleSubmit"  @cancel="closeit" class="bigmodal" :title="title" width="40%">
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="服务名称：">
          <a-input
            v-decorator="[
              'service_name',
              {
                rules: [{ required: true, message: '请输入服务名称!' }],
              },
            ]"
          />
        </a-form-item>

        <a-form-item label="服务简介：">
          <a-input type="textarea" v-decorator="['service_desc']" />
        </a-form-item>

        <a-form-item label="供应商：">
          <a-select
            placeholder="请选择"
            v-decorator="[
              'supplier_id',
              {
                rules: [{ required: true, message: '请选择供应商!' }],
              },
            ]"
          >
            <a-select-option
              v-for="item in SupplierOptions"
              :key="item.id"
              :label="item.supplier_name"
              :value="item.id"
            >
              <span role="img" :aria-label="item.supplier_name">
                {{ item.supplier_name }}
              </span>
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="菜单管理：">
          <a-tree-select
            class="kselect"
            v-decorator="[
              'menu_id',
              {
                rules: [{ required: true, message: '请选择菜单!' }],
              },
            ]"
            allow-clear
            :treeData="MenuOptions"
            tree-default-expand-all
            placeholder="请选择"
          ></a-tree-select>
        </a-form-item>

        <a-form-item label="价格(元)：">
          <a-input
            type="number"
            v-decorator="[
              'price',
              {
                rules: [{ required: true, message: '请输入价格!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="价格单位：">
          <a-input v-decorator="['price_unit']" />
        </a-form-item>
        <a-form-item label="咨询电话(可选)：">
          <a-input v-decorator="['contract']" />
        </a-form-item>

        <a-form-item label="咨询电话服务时间段：">
          <div style="display:flex;">
            <a-form-item>
          <a-time-picker v-decorator="['contract_time_start']" format="HH:mm" />
          </a-form-item>
          <span>~</span>
          <a-form-item>
            <a-time-picker v-decorator="['contract_time_end']"  format="HH:mm" />
          </a-form-item>
          </div>
          <div>
            <a-form-item>
              <a-checkbox-group v-model="checked">
                <a-checkbox value="1">仅工作日</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </div>
        </a-form-item>
        <a-form-item label="上传详情：">
          <keditor v-model="service_content" @change="change" />
        </a-form-item>
        <a-form-item label="服务协议(可选)：">
          <a-checkbox-group v-model="checked1">
            <a-checkbox value="1">协议状态</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="协议名称：">
          <a-input v-decorator="['agreement_name']" />
        </a-form-item>
        <a-form-item label="协议内容：">
          <a-input type="textarea" v-decorator="['agreement_content']" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import keditor from "@/components/common/wangeditor.vue";
export default {
  components: {
    keditor,
  },
  data() {
    return {
      service_content:'',
      checked:[],
      checked1:[],
      MenuOptions: [],
      form: this.$form.createForm(this, { name: "coordinated" }),
      title: null,
      type: null,
      dataSource: [], //列表数据源
      columns: [
        {
          title: "服务名称",
          dataIndex: "service_name",
          width: "15%",
          scopedSlots: { customRender: "belong" },
        },
        {
          title: "所属菜单",
          dataIndex: "menu_name",
          width: "15%",
          align: "center",
          scopedSlots: { customRender: "roomname" },
        },
        {
          title: "供应商名称",
          align: "center",
          dataIndex: "supplier_name",
          width: "15%",
          scopedSlots: { customRender: "belongbuild" },
        },
        {
          title: "上架时间",
          align: "center",
          dataIndex: "marketable_time",
          width: "20%",
          scopedSlots: { customRender: "floor" },
        },
        {
          title: "是否上架",
          dataIndex: "is_marketable_name",
          width: "10%",
          align: "center",
          scopedSlots: { customRender: "area" },
        },
        {
          title: "申请次数",
          align: "center",
          dataIndex: "agreement_status",
          width: "10%",
          scopedSlots: { customRender: "collect" },
        },
        {
          title: "操作",
          dataIndex: "action",
          width: "15%",
          align: "center",
          scopedSlots: { customRender: "action" },
        },
      ], //table表格表头数据
      FromAdd: {}, //存在新增数据
      visibleAdd: false, //新增弹框默认状态
      FromEdit: {}, //存在编辑数据
      visibleEdit: false, //编辑弹框默认状态
      paginationServe: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, //默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationServe.defaultCurrent = current;
          this.paginationServe.defaultPageSize = pageSize;
          this.bannerList(); //显示列表的接口名称
        }, // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationServe.defaultCurrent = current;
          this.paginationServe.defaultPageSize = size;
          this.bannerList();
        },
      }, //显示分页
      SupplierOptions: [], // 存放供应商选择数据
      MenuOptions: [], // 存放菜单选择数据
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
    };
  },
  watch: {
    // 监听搜索框是否有内容自动搜索
    inputVal(newValue) {
      if (newValue) {
        this.ShowEdit(true);
      } else {
        this.ShowEdit(false);
      }
    },
  },
  created() {
    // 获取列表数据
    this.manageList();
    // 获取供应商数据
    this.SupplierList();
    // 获取菜单数据
    this.menuList();
  },
  methods: {
    change(val){
      this.service_content = val ;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log(moment(values.contract_time_start).format('HH:mm'))
        if (!err) {
          let  data = {
            service_name:values.service_name,
            service_desc:values.service_desc,
            supplier_id:values.supplier_id,
            menu_id:values.menu_id,
            price:values.price,
            price_unit:values.price_unit,
            contract:values.contract,
            contract_time_start:moment(values.contract_time_start).format('HH:mm'),
            contract_time_end:moment(values.contract_time_end).format('HH:mm'),
            is_work_day:this.checked.length >0?1:0,
            service_content:this.service_content,
            agreement_status:this.checked1.length > 0 ?1:0,
            agreement_name:values.agreement_name,
            agreement_content:values.agreement_content,
          }
          console.log(data);
          if(this.type == 1){
            axios.post("/api/ics/serviceManage", data).then((res) => {
            if (res.message === "success") {
              this.closeit();
              this.$message.success("操作成功");
              this.manageList();
            }
            });
          }else{
            data.id = this.FromAdd.id ;
            data.version = this.FromAdd.version ;
            axios.patch("/api/ics/serviceManage", data).then((res) => {
              if (res.message === "success") {
                this.closeit();
                this.$message.success("操作成功");
                this.manageList();
              }
            });
          }
        }
      });
    },
    closeit(){
      this.checked = [];
      this.checked1 = [];
      this.service_content = '';
      this.visibleAdd = false;
    },

    // 获取列表数据
    manageList() {
      axios.get("/api/ics/serviceManage?per_page=9999").then((res) => {
        this.dataSource = res.data.data;
      });
    },
    // 状态开关
    async switchChange(checked, id, version, name) {
      let obj = { id };
      obj[name] = checked ? 1 : 0;
      axios
        .patch("/api/ics/serviceManage/status", obj, {
          params: { version: version },
        })
        .then(() => {
          this.manageList();
        });
    },
    // 获取供应商数据
    SupplierList() {
      axios.get("/api/ics/serviceSupplier").then((res) => {
        this.SupplierOptions = res.data.data;
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
    // 获取菜单数据
    menuList() {
      axios.get("/api/ics/serviceMenu").then((res) => {
        let arr = this.getTreedata(res.data);
        this.MenuOptions.push(...arr);
      });
    },
    // todo 新增
    // 新增弹框显示
    AddList(form, type, title) {
      this.type = type;
      this.title = title;
      this.FromAdd = { ...form };
      if(type == 2){
        this.$nextTick(() => {
          let arr = [] , arr1 =[];
          arr.push(JSON.stringify(form.is_work_day));
          arr1.push(JSON.stringify(form.agreement_status));
          this.checked = arr ;
          this.checked1 = arr1 ;
          this.service_content = form.service_content;
          this.form.setFieldsValue({
            service_name: form.service_name,
            service_desc: form.service_desc,
            supplier_id: form.supplier_id,
            menu_id: form.menu_id,
            price: form.price,
            price_unit: form.price_unit,
            contract: form.contract,
            contract_time_start: moment(form.contract_time_start,'HH:mm'),
            contract_time_end: moment(form.contract_time_end,'HH:mm'),
            agreement_name: form.agreement_name,
            agreement_content: form.agreement_content,
          });
        });
      }else{
        this.checked = [];
        this.checked1 = [] ;
        this.service_content = '';
        this.form.resetFields();
      }
      this.visibleAdd = true;
    },
    // 新增确认
    AddListSure() {
      axios.post("/api/ics/serviceManage", this.FromAdd).then((res) => {
        if (res.message === "success") {
          this.visibleAdd = false;
          this.$message.success("新增服务成功");
          this.manageList();
        }
      });
    },
    // 取消新增
    AddListUp() {
      this.visibleAdd = false;
    },
    // todo 删除
    // 删除
    DeleteManage(id, version) {
      axios
        .delete("/api/ics/serviceManage", {
          params: { id: id, version: version },
        })
        .then(() => {
          this.$message.success("删除服务成功");
          this.manageList();
        });
    },
    // todo 编辑
    // 编辑服务
    EditList(record) {
      this.visibleEdit = true;
      this.FromEdit = { ...record };
    },
    EditListSure() {
      this.visibleEdit = false;
    },
    EditListUp() {
      this.visibleEdit = false;
    },
    // todo 搜索
    // 搜索
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/ics/serviceManage", {
            params: { service_name: paramName },
          })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.manageList(); // 更新表
      }
    },
  },
  computed: {
    // 页面控制全选
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
  border-radius: 10px;
  background-color: #fff;
  .buildname {
    display: flex;
  }
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
    display: flex;
  }
}
</style>
