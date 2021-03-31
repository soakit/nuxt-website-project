<template>
  <div>
    新闻
    <div>total: {{ newsObj.total }}</div>
    <ul>
      <li v-for="item in newsObj.list" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ app, store }) {
    let newsObj = {}
    if (store.state.newsObj.list && store.state.newsObj.list.length) {
      newsObj = store.state.newsObj
    } else {
      newsObj = await app.$api.getArticleList({
        type: 'news',
        page: 1,
        page_num: 5,
      })
      store.commit('GET_NEWS_LIST', newsObj)
    }
    return {
      newsObj,
    }
  },
}
</script>
