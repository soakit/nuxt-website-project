<template>
  <div>
    文章
    <div>total: {{ articleObj.total }}</div>
    <ul>
      <li v-for="item in articleObj.list" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ app, store }) {
    let articleObj = {}
    if (store.state.articleObj.list && store.state.articleObj.list.length) {
      articleObj = store.state.articleObj
    } else {
      articleObj = await app.$api.getArticleList({
        type: 3,
        page: 1,
        page_num: 5,
      })
      store.commit('GET_ARTICLE_LIST', articleObj)
    }
    return {
      articleObj,
    }
  },
}
</script>
