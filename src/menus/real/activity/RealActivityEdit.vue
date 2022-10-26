<template>
  <div class="wrap" style="border-radius: 10px">
    <div>
      <div class="ouer">
        <div class="left">
          <div class="inpA">
            <span>活动名称：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入活动名称"
              @change="onChange"
              style="width: 26vw"
              v-model="list.name"
            />
          </div>
          <div class="inpB" style="margin-top: 50px">
            <span>活动地点：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入活动地点"
              @change="onChange"
              style="width: 26vw"
            />
          </div>
          <div class="inpD" style="margin-left: -28px; margin-top: 50px">
            <div class="Dset">
              <p style="white-space: nowrap">上传活动头像：</p>
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
          <div class="inpF" style="margin-left: 0px; margin-top:60px">
            <div class="Fset">
              <p>上传详情：</p>
              <a-textarea
                placeholder="请输入活动详情"
                :rows="9.5"
                style="width: 26vw"
              />
            </div>
          </div>
        </div>
        <div class="right">
          <div class="inpO">
            <span>报名起止时间：</span>
            <a-range-picker @change="onChange" style="width: 26vw" />
          </div>
          <div class="inpO" style="margin-top: 50px">
            <span>活动起止时间：</span>
            <a-range-picker @change="onChange" style="width: 26vw" />
          </div>
          <div class="inpE" style="margin-left: -10px; margin-top: 50px">
            <div class="Eset">
              <span style="white-space: nowrap; margin-right: 8px"
                >上传活动小图：</span
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
            <p style="margin-left: 108px">尺寸建议:宽750px,高300px</p>
          </div>
          <div class="inpA">
            <span>联系电话：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入联系电话"
              @change="onChange"
              style="width: 26vw; margin-top: 48px"
            />
          </div>
          <div class="inpA">
            <span>活动金额：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入活动金额"
              @change="onChange"
              style="width: 26vw; margin-top: 50px"
            />
          </div>
          <div class="inpA">
            <span>限制人数：</span
            ><a-input
              size="1.875rem /* 30/16 */"
              placeholder="请输入限制人数"
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
  name: "RealActivityEdit",
  data() {
    return {
      list: [{}],
    };
  },
  methods: {
    btnN() {
      this.$router.push("/home/Ractivity");
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
