<template>
  <div class="container">
    <h4>登录</h4>
    <div>
      <span>用户名：</span>
      <input type="text" v-model="username" />
    </div>
    <div>
      <span>密码：</span>
      <input type="password" v-model="password" />
    </div>
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  created() {},
  methods: {
    async handleLogin() {
      let res = await login.$http({
        username: this.username,
        password: this.password,
      });
      if (res.error === 0) {
        this.$message.success(res.msg);
        this.userInfo = JSON.parse(this.$cookieStore.getCookie("userInfo"))
        this.$router.push("/index");
      } else {
        this.$message.error(res.msg);
      }
    },
  },
};
</script>
<style scoped>
.container {
  padding-top: 100px;
}
</style>
