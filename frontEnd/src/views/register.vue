<template>
    <div>
        <h2 class="register">注册</h2>
        <div class="formBox">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <!-- 用来接收浏览器自动填充的账号密码 -->
                <el-input type="text" style="position:fixed;top:-1000px;opcity:0"></el-input>
                <el-input type="password" style="position:fixed;top:-1000px;opcity:0"></el-input>

                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model.trim="ruleForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model.trim="ruleForm.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model.trim="ruleForm.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="verify">
                    <el-input type="text"  v-model.trim="ruleForm.verify" auto-complete="off">
                        <img class="verify" slot="suffix" src="http://127.0.0.1:7001/verify" @click="$event.target.src = $event.target.src+'/?'+Math.random(0)">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import * as user from '@/api/user.js'
export default {
    name: "register",
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("用户名不能为空"));
            } else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateField("checkPass");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        var checkVerify = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入验证码"));
            } else {
                if (this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateField("checkPass");
                }
                callback();
            }
        };
        return {
            ruleForm: {
                username: "",
                pass: "",
                checkPass: "",
                verify: ""
            },
            rules: {
                username: [
                    { required: true, validator: checkAge, trigger: "blur" }
                ],
                pass: [
                    { required: true, validator: validatePass, trigger: "blur" }
                ],
                checkPass: [
                    {
                        required: true,
                        validator: validatePass2,
                        trigger: "blur"
                    }
                ],
                verify: [
                    { required: true, validator: checkVerify, trigger: "blur" }
                ],
            },
        };
    },
    created() {
    },
    methods: {
        async submitForm(formName) {
            if (!this.ruleForm.username) {
                this.$message.error('请输入用户名')
            } else if (!this.ruleForm.pass) {
                this.$message.error('请输密码')
            } else if (!this.ruleForm.checkPass) {
                this.$message.error('请再次输密码')
            } else if (!this.ruleForm.verify) {
                this.$message.error('请输验证码')
            } else if (this.ruleForm.verify.length != 4 ) {
                this.$message.error('验证码格式不正确')
            } else {
                try {
                    let res = await user.register.$http(this.ruleForm)
                    if (res) {
                        this.$message.success(res.msg)
                    }
                } catch (err) {
                    this.$message.error(err)
                }
            }
        }
    }
};
</script>
<style scoped>
.formBox {
    margin: auto;
    width: 400px;
    padding: 20px 60px 0 0;
}
.register {
    margin: 50px auto 0;
    font-size: 26px;
    font-weight: 600;

}
</style>
<style>
.el-form-item.is-success .el-input__inner,
.el-form-item.is-success .el-input__inner:focus,
.el-form-item.is-success .el-textarea__inner,
.el-form-item.is-success .el-textarea__inner:focus {
    border-color: #67c23a;
}
.el-form-item.is-success .el-input__validateIcon {
    color: #67c23a;
}
.verify {
    width: 80px;
}
</style>