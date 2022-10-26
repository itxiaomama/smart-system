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
                <a-input placeholder="主题名称" />
              </div>
              <div class="leftb">
                <p>渠道分类：</p>
                <a-select default-value="" style="width: 25vw">
                  <a-select-option value="lucya">中介公司</a-select-option>
                  <a-select-option value="lucyb">广告</a-select-option>
                  <a-select-option value="lucyc">合作推荐</a-select-option>
                  <a-select-option value="lucyd">自开发渠道</a-select-option>
                </a-select>
              </div>
              <div class="leftc">
                <p>详情描述：</p>
                <a-textarea placeholder="..." :rows="4" />
              </div>
            </div>
            <div class="right">
              <div class="rightb">
                <p>线索来源：</p>
                <a-select default-value="" style="width: 25vw">
                  <a-select-option value="lucya">现场接待</a-select-option>
                  <a-select-option value="lucyb">主动电访</a-select-option>
                  <a-select-option value="lucyc">邮件</a-select-option>
                  <a-select-option value="lucyd">客户来电</a-select-option>
                  <a-select-option value="lucyc">短信</a-select-option>
                  <a-select-option value="lucyc">上门拜访</a-select-option>
                  <a-select-option value="lucyc">小程序申请</a-select-option>
                </a-select>
              </div>
              <div class="righta">
                <p>渠道名称：</p>
                <a-input placeholder="渠道名称" />
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
                <a-input placeholder="客户名称" style="width: 25vw" />
              </div>
              <div class="lefta" style="margin-left: 14px">
                <p>证件号：</p>
                <a-input placeholder="(企业)纳税识别号/(个人)身份证" />
              </div>
              <div class="lefta" style="margin-left: 14px">
                <p>联系人：</p>
                <a-input placeholder="联系姓名" />
              </div>
              <div class="lefta">
                <p>联系电话：</p>
                <a-input placeholder="联系电话" />
              </div>
              <div class="lefta" style="margin-left: 28px">
                <p>邮编：</p>
                <a-input placeholder="邮编" />
              </div>
            </div>
            <div class="right">
              <div class="rightb">
                <p>线索来源：</p>
                <a-select default-value="" style="width: 25vw">
                  <a-select-option value="lucya">公司</a-select-option>
                  <a-select-option value="lucyb">个人</a-select-option>
                </a-select>
              </div>
              <div class="righta">
                <p>所属行业：</p>
                <a-input placeholder="所属行业" />
              </div>
              <div class="righta" style="margin-left: 28px">
                <p>邮箱：</p>
                <a-input placeholder="邮箱" />
              </div>
              <div class="righta">
                <p>通讯地址：</p>
                <a-input placeholder="通讯地址" />
              </div>
            </div>
          </div>
        </div>
        <div class="last" style="text-align: center">
          <div class="inpN" style="margin-left: 8vw">
            <a-button type="primary"> 确定 </a-button>
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
export default {
  name: "JoinMineDetailSpace",
  methods: {
    btnN() {
      this.$router.push("/home/Jminedetail");
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  width: 85vw;
  border-radius: 10px;
  background-color: #fff;
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
