<template>
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
              <a-select-option value="lucya">初次拜访</a-select-option>
              <a-select-option value="lucyb">需求引导分析</a-select-option>
              <a-select-option value="lucyb">竞争阶段</a-select-option>
              <a-select-option value="lucyb">预定阶段</a-select-option>
              <a-select-option value="lucyb">合同阶段</a-select-option>
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
          <div class="inpA" style="margin-top: 10px; margin-left: -27px">
            <span>统一信用代码：</span>
            <a-input
              size="1.875rem /* 30/16 */"
              placeholder="统一信用代码"
              @change="onChange"
              style="width: 30vw"
            />
          </div>
          <div class="inpD" style="margin-left: -28px; margin-top: 15px">
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
              <a-select-option value="lucya">中介公司</a-select-option>
              <a-select-option value="lucyb">广告</a-select-option>
              <a-select-option value="lucyc">合作推荐</a-select-option>
              <a-select-option value="lucyd">自开发渠道</a-select-option>
            </a-select>
          </div>
          <div class="leftb" style="margin-top: 10px">
            <p>渠道类型：</p>
            <a-select default-value="" style="width: 30vw">
              <a-select-option value="lucya">中介公司</a-select-option>
              <a-select-option value="lucyb">广告</a-select-option>
              <a-select-option value="lucyb">合作推荐</a-select-option>
              <a-select-option value="lucyb">自开发渠道</a-select-option>
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
          <div class="inpA" style="margin-left: -14px; margin-top: 10px">
            <span>工商注册号：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="工商注册号"
              @change="onChange"
              style="width: 30vw"
            />
          </div>
          <div class="inpA" style="margin-left: -28px; margin-top: 10px">
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
          <div class="leftb" style="margin-left: -28px; margin-top: 10px">
            <p>客户状态：</p>
            <a-select default-value="" style="width: 30vw">
              <a-select-option value="lucya">潜在客户</a-select-option>
              <a-select-option value="lucyb">意向客户</a-select-option>
              <a-select-option value="lucyb">成交客户</a-select-option>
              <a-select-option value="lucyb">流失客户</a-select-option>
            </a-select>
          </div>
          <div class="inpO" style="margin-left: -14px; margin-top: 8px">
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
          <div class="inpC" style="margin-left: -56px; margin-top: 10px">
            <span>园区房间总数：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入房间总数"
              @change="onChange"
              style="width: 30vw"
            />
          </div>
          <div class="inpE" style="margin-left: -61px; margin-top: 15px">
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
          <div class="inpF" style="margin-top: 25px; margin-left: -28px">
            <div class="Fset">
              <p>经营范围：</p>
              <a-textarea
                placeholder="经营范围"
                :rows="8"
                style="width: 30vw"
              />
            </div>
          </div>
          <div class="inpA" style="margin-left: -14px; margin-top: 10px">
            <span>法人名：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="法人名"
              @change="onChange"
              style="width: 30vw"
            />
          </div>
          <div class="inpA" style="margin-left: -28px; margin-top: 10px">
            <span>企业性质：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="企业性质"
              @change="onChange"
              style="width: 30vw"
            />
          </div>
          <div class="inpA" style="margin-left: -28px; margin-top: 10px">
            <span>成立日期：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="成立日期"
              @change="onChange"
              style="width: 30vw"
            />
          </div>
          <div class="inpA" style="margin-left: -28px; margin-top: 10px">
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
          <a-button style="margin-left: 40px" type="close-square" @click="btnN">
            <a-icon type="rollback" />关闭
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JoinClientPush",
  data() {
    return {
      options: [
        {
          value: "1",
          label: "浙江省",
          children: [
            {
              value: "2",
              label: "杭州市",
              children: [
                {
                  label: "萧山区",
                },
                {
                  label: "西湖区",
                },
                {
                  label: "滨江区",
                },
                {
                  label: "余杭区",
                },
              ],
            },
            {
              value: "3",
              label: "宁波市",
            },
          ],
        },
        {
          value: "jiangsu",
          label: "江苏省",
          children: [
            {
              value: "nanjing",
              label: "南京市",
              children: [
                {
                  value: "zhonghuamen",
                  label: "****",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  created(){
    this.form = this.$route.query.form ;
    
  },
  methods: {
    btnN() {
      this.$router.push("/home/Jclient");
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  width: 85vw;
  background-color: #fff;
  .ouer {
    width: 85vw;
    display: flex;
    margin: 20px auto;
    justify-content: space-evenly;
    .left {
      // background-color: pink;
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
      // background-color: skyblue;
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
  .pay {
    margin: 0 auto;
    margin: 30px 0 30px 730px;
  }
}
.wrapA {
  width: 50vw;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  .inpI {
    display: flex;
    margin-left: -18px;
    span {
      margin-right: 8px;
    }
    .scope {
      display: flex;
      width: 17vw;
      height: 5vh;
      background-color: rgb(63, 21, 21);
      border: 1px solid rgb(196, 126, 126);
      span {
        color: rgb(116, 113, 113);
        margin-top: 4px;
        margin-left: 0px;
      }
    }
  }
  .inpJ {
    display: flex;
    margin-top: 10px;
    margin-left: 3px;
    .area {
      width: 31vw;
      height: 5vh;
      background-color: #fff;
    }
    span {
      margin-right: 8px;
    }
  }
  .inpA {
    span {
      font-size: 16px;
    }
    input {
      width: 35vw;
      height: 5vh;
      border: 1px solid rgb(208, 211, 212);
    }
    p {
      margin-left: 72px;
    }
  }
  .inpB {
    margin-left: -16px;
    span {
      font-size: 16px;
    }
    p {
      margin-left: 88px;
    }
  }
  .inpC {
    margin-left: -32px;
    span {
      font-size: 16px;
    }
    p {
      margin-left: 104px;
    }
  }
  .inpD {
    .Dset {
      span {
        width: 100px;
      }
    }
    p {
      margin-left: 72px;
    }
  }
  .inpE {
    .Eset {
      display: flex;
      margin-left: -28px;
      span {
        width: 100px;
      }
    }
    p {
      margin-left: 72px;
    }
  }
  .inpF {
    .Fset {
      display: flex;
      margin-left: -40px;
    }
    .Fp {
      margin-left: 70px;
    }
  }
  .inpG {
    margin: 0 0 20px 30px;
    span {
      margin-right: 10px;
    }
  }
  .inpH {
    margin: 0 0 20px 30px;
    span {
      margin-right: 10px;
    }
  }
  .inpK {
    .Kset {
      display: flex;
      margin-left: 0px;
    }
    .Kp {
      margin-left: 70px;
    }
  }
  .inpL {
    .Lset {
      display: flex;
      margin-left: 26px;
    }
    .Lp {
      margin-left: 70px;
    }
  }
  .inpM {
    .Mset {
      margin-left: -62px;
      input {
        width: 40vw;
      }
    }
    span {
      margin-right: 8px;
    }
    p {
      margin-left: 68px;
    }
  }
}
</style>
