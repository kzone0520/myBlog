<template>
  <div class="Header">
    <el-upload
      class="avatar-uploader"
      action="http://127.0.0.1:7001/uploadavatar"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-change="handleAvatarChange"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
      return {
        imageUrl: ''
      };
    },
     methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
      },
      handleAvatarChange(file,fileList) {
          console.log(file,fileList)
      }
    }
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
    border-color: #409EFF;
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
}

</style>