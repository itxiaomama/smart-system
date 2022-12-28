<template>
  <div class="wrap">
    <div class="link">
      <div style="background-color: #fff">
        <div style="text-align: center; color: #000; font-size: 30px">
          园区管理系
        </div>
        <div class="pic">
          <a-form id="components-form-demo-normal-login" class="login-form">
            <a-form-item>
              <a-input
                id="login_name"
                name="login_name"
                placeholder="请输入账号"
                v-model="from.login_name"
              >
                <a-icon
                  slot="prefix"
                  type="user"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                id="password"
                type="password"
                placeholder="请输入密码"
                v-model="from.password"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-checkbox> 记住密码 </a-checkbox>
              <!-- <a
                class="login-form-forgot"
                href="javascript:;"
                @click="btn_loginA"
              >
                注册账户
              </a> -->
              <a-button
                id="btn"
                type="primary"
                class="login-form-button"
                @click="btn_login"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyLogin",
  data() {
    return {
      from: {},
    };
  },
  methods: {
    btn_login() {
      const that = this;
      axios.post("/api/system/auth", this.from).then(function (res) {
        if (res.message !== "success") return;
        that.$message.success(res.message);
        if (res.message == "success") {
          // that.$message.success("登录成功");
          const token = res.data.access_token;
          that.$store.commit("set_token", token);
          that.getInfo();
          that.getMenu();
          // window.sessionStorage.setItem("token", res.data.access_token);
          that.$router.push({ path: "/" });
        }
      });
    },
    // btn_loginA() {},
    getInfo() {
      axios.get("/api/system/auth/me").then((res) => {
        this.$store.commit("set_userInfo", res.data);
      });
    },
    getMenu() {
      axios.get("/api/system/menu/my").then((res) => {
        console.log(res);
        this.$store.commit("set_routelist", res.data);
        // this.$store.commit("set_userInfo", res.data);
      });
    },
  },
};
</script>

<style lang="less" scpoed>
.pic {
  margin-top: 50px;
  width: 500px;
  height: 250px;
}
.wrap {
  display: flex;
  .link {
    margin: 200px auto;
  }

  #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }

  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }

  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
}
</style>
