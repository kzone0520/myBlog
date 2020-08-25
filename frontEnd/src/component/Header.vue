<template>
  <div class="Header">
    <!-- 用户资料 -->
    <div class="userInfo">
      <h4 v-if="userInfo.login_status === 1" class="title">
        <span>{{ userInfo.username }}您好！</span>
        <a @click="userLogOut">退出登录</a>
      </h4>
      <h4 v-else class="title">
        <span>xxx您好！</span>
        <a @click="login">请登录</a>
      </h4>
    </div>

    <el-dialog title="账号登录" :visible.sync="dialogTableVisible">
      <el-input v-model="username" placeholder="手机/邮箱/用户名"></el-input>
      <el-input placeholder="密码" v-model="password" show-password></el-input>
      <el-button type="primary" @click="userLogin">登录</el-button>
    </el-dialog>
  </div>
</template>

<script>
import * as user from "@/api/user.js";
export default {
  name: "Header",
  data() {
    return {
      imageUrl: "",
      userInfo: "",
      dialogTableVisible: false,
      username: "",
      password: "",
      msg:'loginOut'
    };
  },
  inject: ["reload"],
  created() {
    if (this.$cookieStore.getCookie("userInfo")) {
      this.userInfo = JSON.parse(this.$cookieStore.getCookie("userInfo"));
    }
  },

  mounted() {

  },

  updated() {

  },
  methods: {
    login() {
      this.dialogTableVisible = true;
    },

    async userLogOut() {
      let res = await user.loginOut.$http({
        user_id: this.userInfo.user_id,
      });
      if (res.error === 0) {
        this.$nextTick(function(){
          this.userInfo = '';
        })
      }
    },

    async userLogin() {
      let res = await user.login.$http({
        username: this.username,
        password: this.password,
      });
      if (res.error === 0) {
        this.$message.success(res.msg);
        this.dialogTableVisible = false;
        this.$router.push("/index");
        this.$nextTick(function(){
          this.userInfo = JSON.parse(this.$cookieStore.getCookie("userInfo"));
        })
      } else {
        this.$message.error(res.msg);
      }
    },

    myCallBack() {
      this.reload();
    },
  },
};
</script>

<style lang="less">
.Header {
  width: 100%;
  height: 70px;
  background: #000;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-right: 40px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }

  .uploadImage {
    width: 50px;
    height: 50px;
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px;
  }
  .triangle {
    width: 0;
    height: 0;
    border: 5px transparent solid;
    border-right-color: #ccc;
    margin-right: 20px;
  }
  .triangle1 {
    width: 0;
    height: 0;
    border: 5px transparent solid;
    border-top-color: #ccc;
    margin-right: 20px;
  }
  .title {
    padding: 10px;
  }
  .title a:hover {
    cursor: pointer;
  }
  .el-dialog {
    margin-top: 20vh;
    width: 380px;
    .el-dialog__body {
      .el-input {
        margin: 10px 0;
      }
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>