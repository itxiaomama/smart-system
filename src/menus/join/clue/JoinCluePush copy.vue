<template>
  <div>
    <div class="wrap">
      <div class="wrapA">
        <div class="top">
          <div>
            <a-divider orientation="left">主要信息</a-divider>
          </div>
          <div class="title">
            <div class="left">
              <div class="lefta">
                <p>主题名称：</p>
                <a-input placeholder="主题名称" v-model="formAdd.clue_name" />
              </div>
              <div class="leftb">
                <p>渠道分类：</p>
                <a-select
                  style="width: 25vw"
                  v-model="formAdd.channel_category"
                >
                  <a-select-option value="1">中介公司</a-select-option>
                  <a-select-option value="2">广告</a-select-option>
                  <a-select-option value="3">合作推荐</a-select-option>
                  <a-select-option value="4">自开发渠道</a-select-option>
                </a-select>
              </div>
              <div class="leftc">
                <p>详情描述：</p>
                <a-textarea
                  placeholder="..."
                  :rows="4"
                  v-model="formAdd.remark"
                />
              </div>
            </div>
            <div class="right">
              <div class="rightb">
                <p>线索来源：</p>
                <a-select
                  default-value="请选择"
                  style="width: 25vw"
                  v-model="formAdd.source"
                >
                  <a-select-option value="1">现场接待</a-select-option>
                  <a-select-option value="2">主动电访</a-select-option>
                  <a-select-option value="3">邮件</a-select-option>
                  <a-select-option value="4">客户来电</a-select-option>
                  <a-select-option value="5">短信</a-select-option>
                  <a-select-option value="6">上门拜访</a-select-option>
                  <a-select-option value="7">小程序申请</a-select-option>
                </a-select>
              </div>
              <div class="righta">
                <p>渠道名称：</p>
                <a-input
                  placeholder="渠道名称"
                  v-model="formAdd.channel_name"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div>
            <a-divider orientation="left">客户信息</a-divider>
          </div>
          <div class="title">
            <div class="left">
              <div class="lefta">
                <p>客户名称：</p>
                <a-input
                  placeholder="客户名称"
                  style="width: 25vw"
                  v-model="formAdd.customer_name"
                />
              </div>
              <div class="lefta" style="margin-left: 14px">
                <p>证件号：</p>
                <a-input
                  placeholder="(企业)纳税识别号/(个人)身份证"
                  v-model="formAdd.credit_no"
                />
              </div>
              <div class="lefta" style="margin-left: 14px">
                <p>联系人：</p>
                <a-input placeholder="联系姓名" v-model="formAdd.contacts" />
              </div>
              <div class="lefta">
                <p>联系电话：</p>
                <a-input placeholder="联系电话" v-model="formAdd.phone" />
              </div>
              <div class="lefta" style="margin-left: 28px">
                <p>邮编：</p>
                <a-input placeholder="邮编" v-model="formAdd.contacts" />
              </div>
            </div>
            <div class="right">
              <div class="rightb">
                <p>线索来源：</p>
                <a-select
                  default-value=""
                  style="width: 25vw"
                  v-model="formAdd.customer_type"
                >
                  <a-select-option value="1">公司</a-select-option>
                  <a-select-option value="2">个人</a-select-option>
                </a-select>
              </div>
              <div class="righta">
                <p>所属行业：</p>
                <a-input placeholder="所属行业" v-model="formAdd.sector" />
              </div>
              <div class="righta" style="margin-left: 28px">
                <p>邮箱：</p>
                <a-input placeholder="邮箱" v-model="formAdd.email" />
              </div>
              <div class="righta">
                <p>通讯地址：</p>
                <a-input
                  placeholder="通讯地址"
                  v-model="formAdd.mail_address"
                />
              </div>
              <div class="righta" style="margin-left: 28px">
                <p>状态：</p>
                <a-select
                  slot="addonAfter"
                  default-value="请选择"
                  style="width: 10vw"
                  v-model="formAdd.customer_status"
                >
                  <a-select-option value="菜单1"> 激活 </a-select-option>
                  <a-select-option value="菜单2"> 已经关闭 </a-select-option>
                  <a-select-option value="菜单3"> 已经转客户 </a-select-option>
                </a-select>
              </div>
            </div>
          </div>
        </div>
        <div class="last" style="text-align: center">
          <div class="inpN" style="margin-left: 8vw">
            <a-button type="primary" @click="submit"> 提交 </a-button>
            <a-button style="margin-left: 40px" @click="btnN">
              <a-icon type="rollback" />关闭
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "JoinCluePush",
  data() {
    return {
      formAdd: {
        clue_name: "",
      },
    };
  },
  methods: {
    btnN() {
      this.$router.push("/home/Jclue");
    },
    submit() {
      axios.post("/api/ics/clue", this.formAdd).then((res) => {
        if (res.message === "success") {
          this.$router.push("/home/Jclue");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  border-radius: 10px;
  background-color: #fff;
  // border: 20px solid rgb(207, 202, 202);
  .wrapA {
    margin: 20px;
    .top {
      .title {
        display: flex;
        justify-content: space-between;
        .left {
          margin-left: 6vw;
          .lefta {
            display: flex;
            margin-top: 20px;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
          .leftb {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
          .leftc {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
        }
        .right {
          margin-left: 10vw;
          .rightb {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
          .righta {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
        }
      }
    }
    .bottom {
      .title {
        display: flex;
        justify-content: space-between;
        .left {
          margin-left: 6vw;
          .lefta {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
          .leftb {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
          .leftc {
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
        }
        .right {
          margin-left: 10vw;
          .rightb {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
          .righta {
            margin-top: 20px;
            display: flex;
            p {
              white-space: nowrap;
              line-height: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
