<template>
  <div class="Header">
    <!-- 用户资料 -->
    <div class="userInfo">
      <h4 v-if="status === 1" class="title LoggedUtils">
        <img @click="showModel" class="avatarImg" src="@/assets/imgs/touxiang.png" alt />
        <span style="color:red">{{ userInfo.username }}您好！</span>
        <a @click="userLogOut">退出登录</a>
      </h4>
      <h4 v-if="status === 0" class="title">
        <span style="color:red">xxx您好！</span>
        <a @click="login">请登录</a>
      </h4>
    </div>

    <el-dialog title="账号登录" :visible.sync="dialogTableVisible">
      <el-input v-model="username" placeholder="手机/邮箱/用户名"></el-input>
      <el-input placeholder="密码" v-model="password" show-password></el-input>
      <el-button type="primary" @click="userLogin">登录</el-button>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogModel" width="30%" :before-close="handleClosed">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <h3>luis</h3>
      <button>管理你的博客账户</button>
    </el-dialog>


    <el-upload
  class="avatar-uploader"
  action="http://127.0.0.1:7001/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

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
      dialogModel: false,
      username: "",
      password: "",
      status: 0,
    };
  },
  inject: ["reload"],
  created() {
    if (this.$cookieStore.getCookie("userInfo")) {
      this.userInfo = JSON.parse(this.$cookieStore.getCookie("userInfo"));
      this.status = this.userInfo.login_status;
    }
  },

  mounted() {},

  updated() {},
  methods: {
    login() {
      this.dialogTableVisible = true;
    },

    showModel() {
      this.dialogModel = true;
    },
    handleClosed() {
      this.dialogModel = false;
    },

    async userLogOut() {
      let res = await user.loginOut.$http({
        user_id: this.userInfo.user_id,
      });
      if (res.error === 0) {
        this.$nextTick(function () {
          this.userInfo = "";
          this.status = 0;
        });
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
        this.userInfo = JSON.parse(this.$cookieStore.getCookie("userInfo"));
        this.status = 1;
      } else {
        this.$message.error(res.msg);
      }
    },

     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

      }
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
  .LoggedUtils {
    display: flex;
    align-items: center;
    img {
      margin: 0 10px;
    }
  }
}
</style>