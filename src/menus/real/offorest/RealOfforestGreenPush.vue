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
          <div class="inpB" style="margin-top: 66px">
            <span>所属主体：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入所属主体"
              @change="onChange"
              style="width: 26vw"
            />
          </div>
          <div class="inpB" style="margin: 66px 0 0 26px">
            <span>区域：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入区域"
              @change="onChange"
              style="width: 26vw"
            />
          </div>
          <div class="inpB" style="margin: 66px 0 0 26px">
            <span>楼宇：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入楼宇"
              @change="onChange"
              style="width: 26vw"
            />
          </div>
          <div class="inpB" style="margin: 66px 0 0 26px">
            <span>单元：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入单元"
              @change="onChange"
              style="width: 26vw"
            />
          </div>
          <div class="inpB" style="margin: 68px 0 0 12px">
            <span>负责人：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请选择负责人"
              @change="onChange"
              style="width: 26vw"
            />
          </div>
        </div>
        <div class="right">
          <div class="inpA" style="margin-left: 28px">
            <span>植被编号：</span>
            <a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入植被编号"
              @change="onChange"
              style="width: 26vw"
            />
          </div>
          <div class="inpA" style="margin-left: 28px">
            <span>植被名称：</span>
            <a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入植被编号"
              @change="onChange"
              style="width: 26vw; margin-top: 50px"
            />
          </div>
          <div class="inpA" style="margin-left: 56px">
            <span>种类：</span>
            <a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入种类"
              @change="onChange"
              style="width: 26vw; margin-top: 50px"
            />
          </div>
          <div class="inpA" style="margin-left: 56px">
            <span>树龄：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入树龄"
              @change="onChange"
              style="width: 26vw; margin-top: 50px"
            />
          </div>
          <div class="inpA" style="margin-left: 56px">
            <span>数量：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入数量"
              @change="onChange"
              style="width: 26vw; margin-top: 50px"
            />
          </div>
          <div class="inpA" style="margin-left: 28px">
            <span>开始时间：</span>
            <a-date-picker
              @change="onChange"
              placeholder="请选择日期"
              style="width: 26vw; margin-top: 50px"
            />
          </div>
          <div class="inpA" style="margin-left: 28px">
            <span>结束时间：</span>
            <a-date-picker
              @change="onChange"
              placeholder="请选择日期"
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
  name: "RealOfforestGreenPush",
  data() {
    return {
      list: [{}],
      valuea: 4,
      type: null,
    };
  },
  methods: {
    onChange() {},
    btnN() {
      this.$router.go(-1);
    },
  },
  created() {
    this.type = this.$route.query.type;
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
