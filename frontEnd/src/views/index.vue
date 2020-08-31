<template>
  <div>
    <h1>博文列表</h1>
    <!-- <ul class="articleBox">
            <li v-for="item in articlesList" :key="item.article_id"  @click="$router.push({path: '/article', query:{id: item.article_id}})">
                <h3>{{item.article_title}}</h3>
                <p>{{item.article_content}}</p>
            </li>
    </ul>-->
    <ul class="articleBox">
      <li
        class="articleList"
        v-for="item in articlesList"
        :key="item.article_id"
        @click="$router.push({path: '/article', query:{id: item.article_id}})"
      >
        <h4 style="text-align:left">
          <i class="el-icon-date"></i>12:25
          <span>{{ item.article_date | formatTime }}</span>
        </h4>
        <h3>{{ item.article_title }}</h3>
        <p>{{ item.article_content }}</p>
        <div>
          <img src alt />
        </div>
        <div class="Barrage">
          <div>
            <span>
              <img src="../assets/imgs/dianzan2.png" alt="">
              <span>{{ item.article_like_count }}</span>
            </span>
            <span>
              <img  src="../assets/imgs/pinglun.png" alt="">
              <span>{{ item.article_views }}</span>
            </span>
          </div>
          <div>
            <span>展开</span>
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { articles } from "@/api/article";
export default {
  name: "index",
  data() {
    return {
      articlesList: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await articles.$http();
      if (res.error === 0) {
        this.articlesList = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.articleBox {
  margin: 50px auto;
  width: 800px;
}
.articleBox li {
  padding: 30px;
}
.articleBox li h3 {
  font-size: 26px;
  font-weight: 600;
  text-align: center;
}
.articleBox li p {
  width: 100%;
  line-height: 30px;
  // overflow: hidden;
  // white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}
.Barrage {
  display: flex;
  justify-content: space-between;
  align-items: center;
  div>span {
      margin-right: 20px;
      img {
          vertical-align: middle;
      }
  }
}
</style>
