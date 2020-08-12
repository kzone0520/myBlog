<template>
    <div>
        <h1>博文列表</h1>
        <ul class="articleBox">
            <li v-for="item in articlesList" :key="item.article_id"  @click="$router.push({path: '/article', query:{id: item.article_id}})">
                <h3>{{item.article_title}}</h3>
                <p>{{item.article_content}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import {articles} from '@/api/article'
export default {
    name: 'index',
    data () {
        return {
            articlesList: []
        }
    },
    created() {
        this.getData()
    },
    methods: {
        async getData() {
            let res = await articles.$http();
            if (res.error === 0) {
                this.articlesList = res.data
            } else {
                this.$message.error(res.msg)
            }
        }
    }
}
</script>
<style scoped>
    .articleBox {
        margin: 50px auto;
        width: 800px;
    }
    .articleBox li {
        padding-bottom: 50px;
    }
    .articleBox li h3 {
        font-size: 26px;
        font-weight: 600;
        text-align: left;
    }
    .articleBox li p {
        width: 100%;
        height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
    }
</style>
