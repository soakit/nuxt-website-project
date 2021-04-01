<template>
  <div>
    文章
    <div>total: {{ articleObj.total }}</div>
    <ul>
      <li v-for="item in articleObj.list" :key="item.id">
        <router-link :to="{ path: `/article/${item.id}` }">{{
          item.title
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ app, store }) {
    let articleObj = {}
    // 如果不需要实时的数据，就放开注释，使用缓存的数据
    // if (store.state.articleObj.list && store.state.articleObj.list.length) {
    //   articleObj = store.state.articleObj
    // } else {
    articleObj = await app.$api.getArticleList({
      type: 3,
      page: 1,
      page_num: 5,
    })
    store.commit('GET_ARTICLE_LIST', articleObj)
    // }
    return {
      articleObj,
    }
  },
}
</script>
