<template>
  <div class="wrap" style="border-radius: 10px">
    <div>
      <div class="ouer">
        <div class="left">
          <div class="inpA">
            <span>所属物业：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入所属物业"
              @change="onChange"
              style="width: 26vw"
              v-model="list.name"
            />
          </div>
          <div class="inpB" style="margin-top: 50px">
            <span>所属主体：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入所属主体"
              @change="onChange"
              style="width: 26vw"
            />
          </div>
          <div class="inpB" style="margin: 50px 0 0 26px">
            <span>楼宇：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入楼宇"
              @change="onChange"
              style="width: 26vw"
            />
          </div>
          <div class="inpB" style="margin: 50px 0 0 26px">
            <span>单元：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入单元"
              @change="onChange"
              style="width: 26vw"
            />
          </div>
          <div class="inpB" style="margin: 50px 0 0 26px">
            <span>房屋：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入房屋"
              @change="onChange"
              style="width: 26vw"
            />
          </div>
          <div class="inpB" style="margin-top: 50px">
            <span>业主姓名：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入业主姓名"
              @change="onChange"
              style="width: 26vw"
            />
          </div>
          <div class="inpB" style="margin-top: 50px">
            <span>装修押金：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入装修押金"
              @change="onChange"
              style="width: 26vw"
            />
          </div>
          <div class="site" style="display: flex; margin: 50px 0 0 26px">
            <span>状态：</span>
            <div>
              <a-radio-group v-model="valuea" @change="onChangea">
                <a-radio :value="1">已验收</a-radio>
                <a-radio :value="2">待验收</a-radio>
                <a-radio :value="3">待支付</a-radio>
                <a-radio :value="4">待审核</a-radio>
              </a-radio-group>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="inpA" style="margin-left: 28px">
            <span>预估工期：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入预估工期"
              @change="onChange"
              style="width: 26vw"
            />
          </div>
          <div class="inpA" style="margin-left: 28px">
            <span>入场日期：</span>
            <a-date-picker
              size="1.875rem /* 30/16 */"
              placeholder="请选择日期"
              @change="onChange"
              style="width: 26vw; margin-top: 50px"
            />
          </div>
          <div class="inpA">
            <span>预计结束日期：</span
            ><a-date-picker
              size="1.875rem /* 30/16 */"
              placeholder="请选择日期"
              @change="onChange"
              style="width: 26vw; margin-top: 50px"
            />
          </div>
          <div class="inpA" style="margin-left: 14px">
            <span>装修负责人：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入装修负责人"
              @change="onChange"
              style="width: 26vw; margin-top: 50px"
            />
          </div>
          <div class="inpA" style="margin-left: 14px">
            <span>负责人手机：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入负责人手机"
              @change="onChange"
              style="width: 26vw; margin-top: 50px"
            />
          </div>
          <div class="inpA" style="margin-left: 28px">
            <span>相关证件：</span>
            <a-upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              directory
            >
              <a-button
                size="1.875rem /* 30/16 */"
                placeholder="请输入活动金额"
                @change="onChange"
                style="width: 26vw; margin-top: 50px"
              >
                <a-icon type="upload" />请上传图片文件夹
              </a-button>
            </a-upload>
          </div>
          <div class="inpA" style="margin-left: 28px">
            <span>装修图纸：</span
            ><a-upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              directory
            >
              <a-button
                size="1.875rem /* 30/16 */"
                placeholder="请输入活动金额"
                @change="onChange"
                style="width: 26vw; margin-top: 50px"
              >
                <a-icon type="upload" />请上传图片文件夹
              </a-button>
            </a-upload>
          </div>
          <div class="inpA" style="margin-left: 56px">
            <span>备注：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入备注"
              @change="onChange"
              style="width: 26vw; margin-top: 50px"
            />
          </div>
        </div>
      </div>
      <div class="pay">
        <div class="inpN">
          <a-button type="primary" @click="btn"> 提交 </a-button>
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
  name: "RealConpanyPush",
  data() {
    return {
      list: [{}],
      valuea: 4,
    };
  },
  methods: {
    btnN() {
      this.$router.push("/property/company");
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  background-color: #fff;
  .ouer {
    display: flex;
    margin: 20px auto;
    justify-content: space-around;
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
  .pay {
    margin: 0 auto;
    margin: 30px 0 30px 700px;
  }
}
</style>
