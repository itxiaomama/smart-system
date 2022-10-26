<template>
  <div class="wrap">
    <div class="wrapA">
      <div class="top">
        <div class="left">
          <!-- 搜索 -->
          <a-input-search
            placeholder="请输入园区名称"
            style="width: 200px; margin-right: 20px"
            @click="ShowEdit(true)"
            v-model="inputVal"
          />
        </div>
        <div class="bottom">
          <!-- 新增 -->
          <a-button type="primary" style="margin-bottom: 20px" @click="Addpark">
            新增
          </a-button>
          <!-- 新增modal弹框 -->
          <a-modal v-model="visiblepark" title="新增园区" width="50%">
            <div class="buildname" style="margin: 20px 70px; width: 60vw">
              <span>园区名称：</span>
              <a-input
                placeholder="请输入园区名称"
                style="width: 30vw"
                v-model="Form.park_name"
              />
            </div>
            <div class="buildname" style="margin: 20px 56px">
              <span>园区总面积：</span>
              <a-input
                placeholder="请输入园区总面积"
                style="width: 15vw"
                v-model="Form.park_area"
              />
            </div>
            <div class="buildname" style="margin: 20px 42px">
              <span>园区房间总数：</span>
              <a-input
                placeholder="请输入园区房间总数"
                style="width: 15vw"
                v-model="Form.room_numbers"
              />
            </div>
            <div class="buildname" style="margin: 20px 42px; display: flex">
              <span>上传园区小图：</span>
              <div>
                <el-upload action="#" list-type="picture-card" :limit="1">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <img width="100%" alt="" />
              </div>
            </div>
            <div class="buildname" style="margin: 20px 12px; display: flex">
              <span>上传园区banner图：</span>
              <div>
                <el-upload action="#" list-type="picture-card" :limit="1">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <img width="100%" alt="" />
              </div>
            </div>
            <div class="buildname" style="margin: 20px 70px; display: flex">
              <span>园区简介：</span>
              <a-textarea
                placeholder="请输入园区简介"
                :rows="4"
                style="width: 37vw"
                v-model="Form.brief_intro"
              />
            </div>
            <div class="buildname" style="margin: 20px 98px">
              <span>纬度：</span>
              <a-input-number
                placeholder="请输入纬度"
                style="width: 10vw"
                v-model="Form.lng"
              />
            </div>
            <div class="buildname" style="margin: 20px 98px">
              <span>经度：</span>
              <a-input-number
                placeholder="请输入经度"
                style="width: 10vw"
                v-model="Form.lat"
              />
            </div>
            <div class="buildname" style="margin: 20px 48px">
              <span>租金范围(起)：</span>
              <a-input-number
                placeholder="租金范围"
                style="width: 10vw"
                v-model="Form.low_rent"
              />
              <span>~</span>
              <a-input-number
                placeholder="租金范围"
                style="width: 10vw"
                v-model="Form.high_rent"
              />
              <a-select
                default-value="请选择"
                style="width: 5vw"
                v-model="Form.rent_type"
              >
                <a-select-option value="1"> 元/㎡/天 </a-select-option>
                <a-select-option value="2"> 元/㎡/月 </a-select-option>
                <a-select-option value="3"> 元/天 </a-select-option>
                <a-select-option value="4"> 元/月 </a-select-option>
              </a-select>
            </div>
            <div class="buildname" style="margin: 20px 70px">
              <span>园区地址：</span>
              <a-cascader
                :options="options"
                placeholder="请选择园区地址"
                style="width: 10vw"
              />
              <a-input
                placeholder="详细地址"
                style="width: 15vw"
                v-model="Form.address"
              />
            </div>
            <div class="buildname" style="margin: 20px 70px; display: flex">
              <span>配套服务：</span>
              <a-textarea
                placeholder="请输入配套服务"
                :rows="4"
                style="width: 37vw"
                v-model="Form.facilities"
              />
            </div>
            <div class="buildname" style="margin: 20px 98px; display: flex">
              <span>交通：</span>
              <a-textarea
                placeholder="请输入交通"
                :rows="4"
                style="width: 37vw"
                v-model="Form.traffic"
              />
            </div>
            <div class="buildname" style="margin: 20px 26px">
              <span>停车费(元/小时)：</span>
              <a-input
                placeholder="请输入停车费"
                style="width: 10vw"
                v-model="Form.parking_fee"
              />
            </div>
            <div class="buildname" style="margin: 20px 70px; display: flex">
              <span>园区介绍：</span>
              <a-textarea
                placeholder="请输入园区介绍"
                :rows="4"
                style="width: 37vw"
                v-model="Form.introduction"
              />
            </div>
            <!-- 确定按钮 -->
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
              <a-button @click="AddparkUp" style="margin-right: 20px"
                >取消</a-button
              >
              <a-button type="primary" @click="AddparkSure">确定</a-button>
            </div>
          </a-modal>
        </div>
      </div>
      <div class="content">
        <div>
          <a-table
            bordered
            :row-selection="rowSelection"
            :data-source="dataSource"
            :columns="columns"
            :rowKey="(record, id) => id"
            :pagination="pagination"
          >
            <template slot="operation" slot-scope="text, scoped">
              <!-- 编辑 -->
              <a href="javascript:;" @click="Editpark(scoped)">
                <a-icon type="edit" theme="twoTone" />编辑
              </a>
              <!-- 编辑modal弹框 -->
              <a-modal v-model="visibleparkEdit" title="编辑园区" width="50%">
                <div class="buildname" style="margin: 20px 70px; width: 60vw">
                  <span>园区名称：</span>
                  <a-input
                    placeholder="请输入园区名称"
                    style="width: 30vw"
                    v-model="FormEdit.park_name"
                  />
                </div>
                <div class="buildname" style="margin: 20px 56px">
                  <span>园区总面积：</span>
                  <a-input
                    placeholder="请输入园区总面积"
                    style="width: 15vw"
                    v-model="FormEdit.park_area"
                  />
                </div>
                <div class="buildname" style="margin: 20px 42px">
                  <span>园区房间总数：</span>
                  <a-input
                    placeholder="请输入园区房间总数"
                    style="width: 15vw"
                    v-model="FormEdit.room_numbers"
                  />
                </div>
                <div class="buildname" style="margin: 20px 42px; display: flex">
                  <span>上传园区小图：</span>
                  <div>
                    <el-upload action="#" list-type="picture-card" :limit="1">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <img width="100%" alt="" />
                  </div>
                </div>
                <div class="buildname" style="margin: 20px 12px; display: flex">
                  <span>上传园区banner图：</span>
                  <div>
                    <el-upload action="#" list-type="picture-card" :limit="1">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <img width="100%" alt="" />
                  </div>
                </div>
                <div class="buildname" style="margin: 20px 70px; display: flex">
                  <span>园区简介：</span>
                  <a-textarea
                    placeholder="请输入园区简介"
                    :rows="4"
                    style="width: 37vw"
                    v-model="FormEdit.brief_intro"
                  />
                </div>
                <div class="buildname" style="margin: 20px 98px">
                  <span>纬度：</span>
                  <a-input-number
                    placeholder="请输入纬度"
                    style="width: 10vw"
                    v-model="FormEdit.lng"
                  />
                </div>
                <div class="buildname" style="margin: 20px 98px">
                  <span>经度：</span>
                  <a-input-number
                    placeholder="请输入经度"
                    style="width: 10vw"
                    v-model="FormEdit.lat"
                  />
                </div>
                <div class="buildname" style="margin: 20px 48px">
                  <span>租金范围(起)：</span>
                  <a-input-number
                    placeholder="租金范围"
                    style="width: 10vw"
                    v-model="FormEdit.low_rent"
                  />
                  <span>~</span>
                  <a-input-number
                    placeholder="租金范围"
                    style="width: 10vw"
                    v-model="FormEdit.high_rent"
                  />
                  <a-select
                    default-value="请选择"
                    style="width: 5vw"
                    v-model="FormEdit.rent_type"
                  >
                    <a-select-option value="1"> 元/㎡/天 </a-select-option>
                    <a-select-option value="2"> 元/㎡/月 </a-select-option>
                    <a-select-option value="3"> 元/天 </a-select-option>
                    <a-select-option value="4"> 元/月 </a-select-option>
                  </a-select>
                </div>
                <div class="buildname" style="margin: 20px 70px">
                  <span>园区地址：</span>
                  <a-cascader
                    :options="options"
                    placeholder="请选择园区地址"
                    style="width: 10vw"
                  />
                  <a-input
                    placeholder="详细地址"
                    style="width: 15vw"
                    v-model="FormEdit.address"
                  />
                </div>
                <div class="buildname" style="margin: 20px 70px; display: flex">
                  <span>配套服务：</span>
                  <a-textarea
                    placeholder="请输入配套服务"
                    :rows="4"
                    style="width: 37vw"
                    v-model="FormEdit.facilities"
                  />
                </div>
                <div class="buildname" style="margin: 20px 98px; display: flex">
                  <span>交通：</span>
                  <a-textarea
                    placeholder="请输入交通"
                    :rows="4"
                    style="width: 37vw"
                    v-model="FormEdit.traffic"
                  />
                </div>
                <div class="buildname" style="margin: 20px 26px">
                  <span>停车费(元/小时)：</span>
                  <a-input
                    placeholder="请输入停车费"
                    style="width: 10vw"
                    v-model="FormEdit.parking_fee"
                  />
                </div>
                <div class="buildname" style="margin: 20px 70px; display: flex">
                  <span>园区介绍：</span>
                  <a-textarea
                    placeholder="请输入园区介绍"
                    :rows="4"
                    style="width: 37vw"
                    v-model="FormEdit.introduction"
                  />
                </div>
                <!-- 确定按钮 -->
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
                  <a-button @click="FormEditUp" style="margin-right: 20px"
                    >取消</a-button
                  >
                  <a-button type="primary" @click="FormEditSure">确定</a-button>
                </div>
              </a-modal>
              <a-divider type="vertical" />
              <!-- 删除 -->
              <a
                href="javascript:;"
                @click="Deletepark(scoped.id, scoped.version)"
              >
                <a-icon type="delete" theme="twoTone" />删除</a
              >
            </template>
            <a slot="park_name" slot-scope="text">{{ text }}</a>
            <!-- 状态开关 -->
            <span slot="news" slot-scope="text, record">
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
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "GardenList",
  data() {
    return {
      options: [
        {
          value: 33,
          pid: 0,
          label: "浙江",
          children: [
            {
              value: 3301,
              pid: 33,
              label: "杭州",
              children: [
                {
                  value: 330102,
                  pid: 3301,
                  label: "上城",
                  children: null,
                  parentId: 3301,
                  id: 330102,
                },
                {
                  value: 330103,
                  pid: 3301,
                  label: "下城",
                  children: null,
                  parentId: 3301,
                  id: 330103,
                },
                {
                  value: 330104,
                  pid: 3301,
                  label: "江干",
                  children: null,
                  parentId: 3301,
                  id: 330104,
                },
                {
                  value: 330105,
                  pid: 3301,
                  label: "拱墅",
                  children: null,
                  parentId: 3301,
                  id: 330105,
                },
                {
                  value: 330106,
                  pid: 3301,
                  label: "西湖",
                  children: null,
                  parentId: 3301,
                  id: 330106,
                },
                {
                  value: 330108,
                  pid: 3301,
                  label: "滨江",
                  children: null,
                  parentId: 3301,
                  id: 330108,
                },
                {
                  value: 330109,
                  pid: 3301,
                  label: "萧山",
                  children: null,
                  parentId: 3301,
                  id: 330109,
                },
                {
                  value: 330110,
                  pid: 3301,
                  label: "余杭",
                  children: null,
                  parentId: 3301,
                  id: 330110,
                },
                {
                  value: 330111,
                  pid: 3301,
                  label: "富阳",
                  children: null,
                  parentId: 3301,
                  id: 330111,
                },
                {
                  value: 330112,
                  pid: 3301,
                  label: "临安",
                  children: null,
                  parentId: 3301,
                  id: 330112,
                },
                {
                  value: 330122,
                  pid: 3301,
                  label: "桐庐",
                  children: null,
                  parentId: 3301,
                  id: 330122,
                },
                {
                  value: 330127,
                  pid: 3301,
                  label: "淳安",
                  children: null,
                  parentId: 3301,
                  id: 330127,
                },
                {
                  value: 330182,
                  pid: 3301,
                  label: "建德",
                  children: null,
                  parentId: 3301,
                  id: 330182,
                },
              ],
              parentId: 33,
              id: 3301,
            },
            {
              value: 3302,
              pid: 33,
              label: "宁波",
              children: [
                {
                  value: 330203,
                  pid: 3302,
                  label: "海曙",
                  children: null,
                  parentId: 3302,
                  id: 330203,
                },
                {
                  value: 330205,
                  pid: 3302,
                  label: "江北",
                  children: null,
                  parentId: 3302,
                  id: 330205,
                },
                {
                  value: 330206,
                  pid: 3302,
                  label: "北仑",
                  children: null,
                  parentId: 3302,
                  id: 330206,
                },
                {
                  value: 330211,
                  pid: 3302,
                  label: "镇海",
                  children: null,
                  parentId: 3302,
                  id: 330211,
                },
                {
                  value: 330212,
                  pid: 3302,
                  label: "鄞州",
                  children: null,
                  parentId: 3302,
                  id: 330212,
                },
                {
                  value: 330213,
                  pid: 3302,
                  label: "奉化",
                  children: null,
                  parentId: 3302,
                  id: 330213,
                },
                {
                  value: 330225,
                  pid: 3302,
                  label: "象山",
                  children: null,
                  parentId: 3302,
                  id: 330225,
                },
                {
                  value: 330226,
                  pid: 3302,
                  label: "宁海",
                  children: null,
                  parentId: 3302,
                  id: 330226,
                },
                {
                  value: 330281,
                  pid: 3302,
                  label: "余姚",
                  children: null,
                  parentId: 3302,
                  id: 330281,
                },
                {
                  value: 330282,
                  pid: 3302,
                  label: "慈溪",
                  children: null,
                  parentId: 3302,
                  id: 330282,
                },
              ],
              parentId: 33,
              id: 3302,
            },
            {
              value: 3303,
              pid: 33,
              label: "温州",
              children: [
                {
                  value: 330302,
                  pid: 3303,
                  label: "鹿城",
                  children: null,
                  parentId: 3303,
                  id: 330302,
                },
                {
                  value: 330303,
                  pid: 3303,
                  label: "龙湾",
                  children: null,
                  parentId: 3303,
                  id: 330303,
                },
                {
                  value: 330304,
                  pid: 3303,
                  label: "瓯海",
                  children: null,
                  parentId: 3303,
                  id: 330304,
                },
                {
                  value: 330305,
                  pid: 3303,
                  label: "洞头",
                  children: null,
                  parentId: 3303,
                  id: 330305,
                },
                {
                  value: 330324,
                  pid: 3303,
                  label: "永嘉",
                  children: null,
                  parentId: 3303,
                  id: 330324,
                },
                {
                  value: 330326,
                  pid: 3303,
                  label: "平阳",
                  children: null,
                  parentId: 3303,
                  id: 330326,
                },
                {
                  value: 330327,
                  pid: 3303,
                  label: "苍南",
                  children: null,
                  parentId: 3303,
                  id: 330327,
                },
                {
                  value: 330328,
                  pid: 3303,
                  label: "文成",
                  children: null,
                  parentId: 3303,
                  id: 330328,
                },
                {
                  value: 330329,
                  pid: 3303,
                  label: "泰顺",
                  children: null,
                  parentId: 3303,
                  id: 330329,
                },
                {
                  value: 330371,
                  pid: 3303,
                  label: "温州经济技术开发区",
                  children: null,
                  parentId: 3303,
                  id: 330371,
                },
                {
                  value: 330381,
                  pid: 3303,
                  label: "瑞安",
                  children: null,
                  parentId: 3303,
                  id: 330381,
                },
                {
                  value: 330382,
                  pid: 3303,
                  label: "乐清",
                  children: null,
                  parentId: 3303,
                  id: 330382,
                },
              ],
              parentId: 33,
              id: 3303,
            },
            {
              value: 3304,
              pid: 33,
              label: "嘉兴",
              children: [
                {
                  value: 330402,
                  pid: 3304,
                  label: "南湖",
                  children: null,
                  parentId: 3304,
                  id: 330402,
                },
                {
                  value: 330411,
                  pid: 3304,
                  label: "秀洲",
                  children: null,
                  parentId: 3304,
                  id: 330411,
                },
                {
                  value: 330421,
                  pid: 3304,
                  label: "嘉善",
                  children: null,
                  parentId: 3304,
                  id: 330421,
                },
                {
                  value: 330424,
                  pid: 3304,
                  label: "海盐",
                  children: null,
                  parentId: 3304,
                  id: 330424,
                },
                {
                  value: 330481,
                  pid: 3304,
                  label: "海宁",
                  children: null,
                  parentId: 3304,
                  id: 330481,
                },
                {
                  value: 330482,
                  pid: 3304,
                  label: "平湖",
                  children: null,
                  parentId: 3304,
                  id: 330482,
                },
                {
                  value: 330483,
                  pid: 3304,
                  label: "桐乡",
                  children: null,
                  parentId: 3304,
                  id: 330483,
                },
              ],
              parentId: 33,
              id: 3304,
            },
            {
              value: 3305,
              pid: 33,
              label: "湖州",
              children: [
                {
                  value: 330502,
                  pid: 3305,
                  label: "吴兴",
                  children: null,
                  parentId: 3305,
                  id: 330502,
                },
                {
                  value: 330503,
                  pid: 3305,
                  label: "南浔",
                  children: null,
                  parentId: 3305,
                  id: 330503,
                },
                {
                  value: 330521,
                  pid: 3305,
                  label: "德清",
                  children: null,
                  parentId: 3305,
                  id: 330521,
                },
                {
                  value: 330522,
                  pid: 3305,
                  label: "长兴",
                  children: null,
                  parentId: 3305,
                  id: 330522,
                },
                {
                  value: 330523,
                  pid: 3305,
                  label: "安吉",
                  children: null,
                  parentId: 3305,
                  id: 330523,
                },
              ],
              parentId: 33,
              id: 3305,
            },
            {
              value: 3306,
              pid: 33,
              label: "绍兴",
              children: [
                {
                  value: 330602,
                  pid: 3306,
                  label: "越城",
                  children: null,
                  parentId: 3306,
                  id: 330602,
                },
                {
                  value: 330603,
                  pid: 3306,
                  label: "柯桥",
                  children: null,
                  parentId: 3306,
                  id: 330603,
                },
                {
                  value: 330604,
                  pid: 3306,
                  label: "上虞",
                  children: null,
                  parentId: 3306,
                  id: 330604,
                },
                {
                  value: 330624,
                  pid: 3306,
                  label: "新昌",
                  children: null,
                  parentId: 3306,
                  id: 330624,
                },
                {
                  value: 330681,
                  pid: 3306,
                  label: "诸暨",
                  children: null,
                  parentId: 3306,
                  id: 330681,
                },
                {
                  value: 330683,
                  pid: 3306,
                  label: "嵊州",
                  children: null,
                  parentId: 3306,
                  id: 330683,
                },
              ],
              parentId: 33,
              id: 3306,
            },
            {
              value: 3307,
              pid: 33,
              label: "金华",
              children: [
                {
                  value: 330702,
                  pid: 3307,
                  label: "婺城",
                  children: null,
                  parentId: 3307,
                  id: 330702,
                },
                {
                  value: 330703,
                  pid: 3307,
                  label: "金东",
                  children: null,
                  parentId: 3307,
                  id: 330703,
                },
                {
                  value: 330723,
                  pid: 3307,
                  label: "武义",
                  children: null,
                  parentId: 3307,
                  id: 330723,
                },
                {
                  value: 330726,
                  pid: 3307,
                  label: "浦江",
                  children: null,
                  parentId: 3307,
                  id: 330726,
                },
                {
                  value: 330727,
                  pid: 3307,
                  label: "磐安",
                  children: null,
                  parentId: 3307,
                  id: 330727,
                },
                {
                  value: 330781,
                  pid: 3307,
                  label: "兰溪",
                  children: null,
                  parentId: 3307,
                  id: 330781,
                },
                {
                  value: 330782,
                  pid: 3307,
                  label: "义乌",
                  children: null,
                  parentId: 3307,
                  id: 330782,
                },
                {
                  value: 330783,
                  pid: 3307,
                  label: "东阳",
                  children: null,
                  parentId: 3307,
                  id: 330783,
                },
                {
                  value: 330784,
                  pid: 3307,
                  label: "永康",
                  children: null,
                  parentId: 3307,
                  id: 330784,
                },
              ],
              parentId: 33,
              id: 3307,
            },
            {
              value: 3308,
              pid: 33,
              label: "衢州",
              children: [
                {
                  value: 330802,
                  pid: 3308,
                  label: "柯城",
                  children: null,
                  parentId: 3308,
                  id: 330802,
                },
                {
                  value: 330803,
                  pid: 3308,
                  label: "衢江",
                  children: null,
                  parentId: 3308,
                  id: 330803,
                },
                {
                  value: 330822,
                  pid: 3308,
                  label: "常山",
                  children: null,
                  parentId: 3308,
                  id: 330822,
                },
                {
                  value: 330824,
                  pid: 3308,
                  label: "开化",
                  children: null,
                  parentId: 3308,
                  id: 330824,
                },
                {
                  value: 330825,
                  pid: 3308,
                  label: "龙游",
                  children: null,
                  parentId: 3308,
                  id: 330825,
                },
                {
                  value: 330881,
                  pid: 3308,
                  label: "江山",
                  children: null,
                  parentId: 3308,
                  id: 330881,
                },
              ],
              parentId: 33,
              id: 3308,
            },
            {
              value: 3309,
              pid: 33,
              label: "舟山",
              children: [
                {
                  value: 330902,
                  pid: 3309,
                  label: "定海",
                  children: null,
                  parentId: 3309,
                  id: 330902,
                },
                {
                  value: 330903,
                  pid: 3309,
                  label: "普陀",
                  children: null,
                  parentId: 3309,
                  id: 330903,
                },
                {
                  value: 330921,
                  pid: 3309,
                  label: "岱山",
                  children: null,
                  parentId: 3309,
                  id: 330921,
                },
                {
                  value: 330922,
                  pid: 3309,
                  label: "嵊泗",
                  children: null,
                  parentId: 3309,
                  id: 330922,
                },
              ],
              parentId: 33,
              id: 3309,
            },
            {
              value: 3310,
              pid: 33,
              label: "台州",
              children: [
                {
                  value: 331002,
                  pid: 3310,
                  label: "椒江",
                  children: null,
                  parentId: 3310,
                  id: 331002,
                },
                {
                  value: 331003,
                  pid: 3310,
                  label: "黄岩",
                  children: null,
                  parentId: 3310,
                  id: 331003,
                },
                {
                  value: 331004,
                  pid: 3310,
                  label: "路桥",
                  children: null,
                  parentId: 3310,
                  id: 331004,
                },
                {
                  value: 331022,
                  pid: 3310,
                  label: "三门",
                  children: null,
                  parentId: 3310,
                  id: 331022,
                },
                {
                  value: 331023,
                  pid: 3310,
                  label: "天台",
                  children: null,
                  parentId: 3310,
                  id: 331023,
                },
                {
                  value: 331024,
                  pid: 3310,
                  label: "仙居",
                  children: null,
                  parentId: 3310,
                  id: 331024,
                },
                {
                  value: 331081,
                  pid: 3310,
                  label: "温岭",
                  children: null,
                  parentId: 3310,
                  id: 331081,
                },
                {
                  value: 331082,
                  pid: 3310,
                  label: "临海",
                  children: null,
                  parentId: 3310,
                  id: 331082,
                },
                {
                  value: 331083,
                  pid: 3310,
                  label: "玉环",
                  children: null,
                  parentId: 3310,
                  id: 331083,
                },
              ],
              parentId: 33,
              id: 3310,
            },
            {
              value: 3311,
              pid: 33,
              label: "丽水",
              children: [
                {
                  value: 331102,
                  pid: 3311,
                  label: "莲都",
                  children: null,
                  parentId: 3311,
                  id: 331102,
                },
                {
                  value: 331121,
                  pid: 3311,
                  label: "青田",
                  children: null,
                  parentId: 3311,
                  id: 331121,
                },
                {
                  value: 331122,
                  pid: 3311,
                  label: "缙云",
                  children: null,
                  parentId: 3311,
                  id: 331122,
                },
                {
                  value: 331123,
                  pid: 3311,
                  label: "遂昌",
                  children: null,
                  parentId: 3311,
                  id: 331123,
                },
                {
                  value: 331124,
                  pid: 3311,
                  label: "松阳",
                  children: null,
                  parentId: 3311,
                  id: 331124,
                },
                {
                  value: 331125,
                  pid: 3311,
                  label: "云和",
                  children: null,
                  parentId: 3311,
                  id: 331125,
                },
                {
                  value: 331126,
                  pid: 3311,
                  label: "庆元",
                  children: null,
                  parentId: 3311,
                  id: 331126,
                },
                {
                  value: 331127,
                  pid: 3311,
                  label: "景宁畲族自治县",
                  children: null,
                  parentId: 3311,
                  id: 331127,
                },
                {
                  value: 331181,
                  pid: 3311,
                  label: "龙泉",
                  children: null,
                  parentId: 3311,
                  id: 331181,
                },
              ],
              parentId: 33,
              id: 3311,
            },
          ],
          parentId: 0,
          id: 33,
        },
      ],
      dataSource: [], //页面数据源
      columns: [
        {
          title: "园区名称",
          dataIndex: "park_name",
          scopedSlots: { customRender: "park_name" },
          width: " 30%",
        },
        {
          title: "上架时间",
          align: "center",
          dataIndex: "created_at",
          scopedSlots: { customRender: "time" },
          width: " 30%",
        },
        {
          title: "是否上架",
          dataIndex: "is_marketable",
          scopedSlots: { customRender: "news" },
          width: " 20%",
          align: "center",
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
          width: " 20%",
          align: "center",
        },
      ], //table表格表头数据
      visiblepark: false, //新增 modal弹框默认状态
      visibleparkEdit: false, //编辑 modal弹框默认状态
      Form: {}, //存放新增数据
      FormEdit: {}, //存放编辑数据
      inputVal: "", // 搜索框数据绑定
      total: 0, // 总条数，分页时有用
      pagination: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = pageSize;
          this.parkList(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.pagination.defaultCurrent = current;
          this.pagination.defaultPageSize = size;
          this.parkList();
        },
      }, // 页面显示数据分页内容
    };
  },
  created() {
    this.parkList(); // 获取园区列表数据
  },
  watch: {
    // 监听搜索框是否有内容自动根据内容搜素
    inputVal(newValue) {
      if (newValue) {
        this.ShowEdit(true);
      } else {
        this.ShowEdit(false);
      }
    },
  },
  methods: {
    // 获取园区列表数据
    parkList() {
      axios.get("/api/ics/park").then((res) => {
        this.dataSource = res.data.data;
      });
    },
    // 状态更新
    async switchChange(checked, id, version, name) {
      let obj = { id };
      obj[name] = checked ? 1 : 0;
      axios
        .patch("/api/ics/park/status", obj, {
          params: { version: version },
        })
        .then((res) => {
          if (res.status_code == 200) {
            this.parkList(); // 更新表
          }
        });
    },
    //todo 新增
    // 新增modal弹框显示
    Addpark() {
      this.visiblepark = true;
      this.Form = { park_name: "" };
    },
    // 新增确认
    AddparkSure() {
      axios.post("/api/ics/park", this.Form).then((res) => {
        if (res.message === "success") {
          this.dataSource = res.data.data;
          this.$message.success("新增园区成功");
          this.visiblepark = false;
          this.parkList();
        }
      });
    },
    // 取消新增
    AddparkUp() {
      this.visiblepark = false;
    },
    //todo 删除
    // 删除
    Deletepark(id, version) {
      axios
        .delete("/api/ics/park", {
          params: {
            id: id,
            version: version,
          },
        })
        .then((res) => {
          if (res.message === "success") {
          } // 成功重新更新列表
          this.$message.success("删除园区成功");
          this.parkList();
        });
    },
    //todo 编辑
    // 编辑modal弹框显示
    Editpark(scoped) {
      this.visibleparkEdit = true;
      this.FormEdit = { ...scoped };
      this.FormEdit.rent_type = scoped.rent_type.toString();
    },
    // 编辑确认
    FormEditSure() {
      axios.patch("/api/ics/park", this.FormEdit).then(() => {
        this.visibleparkEdit = false;
        this.$message.success("编辑园区成功");
        this.parkList(this.FormEdit.id ? this.page : 1);
      });
    },
    // 取消编辑
    FormEditUp() {
      this.visibleparkEdit = false;
    },
    //todo 搜索
    // 搜索
    ShowEdit(bool) {
      this.currentPage = 1;
      if (bool) {
        let paramName = this.inputVal;
        axios
          .get("/api/ics/park/", { params: { park_name: paramName } })
          .then((res) => {
            this.dataSource = res.data.data;
            this.total = res.data.data.length;
          });
      } else {
        this.parkList(); // 更新表
      }
    },
  },
  computed: {
    // table表格全选框控制
    rowSelection() {
      return {
        onChange: () => {},
      };
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .ant-modal-content {
  position: relative;
  background-color: #fff;
  background-clip: padding-box;
  border: 0;
  border-radius: 2px;
  pointer-events: auto;
  max-width: 1000px;
  display: inline-block;
}
.wrap {
  width: 87.3vw;
  border-radius: 10px;
  background-color: #fff;
  .wrapA {
    width: 100%;
    margin: 20px;
  }
  .top {
    display: flex;
    .right {
      margin-left: 40px;
    }
  }
  .bottom {
    display: flex;
    .buildname {
      display: flex;
    }
    .remake {
      display: flex;
    }
  }
  .ouer {
    width: 85vw;
    display: flex;
    margin: 20px auto;
    justify-content: space-evenly;
    .left {
      margin-left: 0px;
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
      .inpI {
        display: flex;
        span {
          margin-right: 8px;
        }
        .scope {
          display: flex;
          width: 17vw;
          height: 2.1rem;
          background-color: rgb(255, 255, 255);
          border: 1px solid rgb(224, 227, 228);
          border-right: 0;
          border-radius: 5px;
          span {
            color: rgb(116, 113, 113);
            margin-top: 4px;
            margin-left: 0px;
          }
        }
      }
    }
  }
}
</style>
