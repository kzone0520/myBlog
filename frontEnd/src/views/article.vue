<template>
    <div>
        <div v-if="article.article_id">
            <h2>{{article.article_title}}</h2>
            <p>{{article.article_date}}</p>
            <article>{{article.article_content}}</article>
        </div>
    </div>
</template>

<script>
import { articleDetaile } from '@/api/article'
export default {
    name: '',
    data () {
        return {
            id: this.$route.query.id,
            article: {}
        }
    },
    created() {
        this.getData()
    },
    methods: {
        async getData() {
            let res = await articleDetaile.$http({
                article_id: this.id
            });
            if (res.error === 0) {
                this.article = res.data
                console.log(this.article);
            } else {
                this.$message.error(res.msg)
            }
        }
    }
}
</script>
<style scoped>
    
</style>
