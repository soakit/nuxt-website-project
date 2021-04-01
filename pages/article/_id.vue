<template>
  <div>
    <Loading v-if="data.params === ''"></Loading>
    <div v-if="data.params !== ''">
      <div class="_default_layout d_flex_column">
        <div class="d_flex d_between">
          <div class="introduce_flex">
            <div class="details">
              <h1 class="font26">{{ data.title }}</h1>
              <p class="font14">{{ data.publish_time }}</p>
              <p class="font16">{{ data.summary }}</p>
            </div>
            <div style="color: #000" v-html="data.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/loading.vue'
export default {
  components: {
    Loading,
  },
  layout: 'common',
  async asyncData({ params, app }) {
    const [{ id }, list] = [params, []]

    const data = await app.$api.getArticleDetail({
      id,
    })
    const seoContent = {
      seo_title: data.seo_title,
      seo_keywords: data.seo_keywords,
      seo_description: data.seo_description,
    }
    return {
      seoContent,
      data,
      list,
    }
  },
  data() {
    return {
      data: {
        params: '',
      },
      seoContent: {
        seo_title: '',
        seo_keywords: '',
        seo_description: '',
      },
    }
  },
  head() {
    return {
      title: this.seoContent.seo_title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.seoContent.seo_keywords,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.seoContent.seo_description,
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.details {
  p {
    &:first-child {
      color: #484d54;
    }
    &:nth-child(2) {
      color: #aab4c2;
      padding: 20px 0;
    }
    &:last-child {
      color: #000;
      margin: 0 0 20px 28px;
    }
  }
}
.introduce_flex {
  flex: 0.9;
}

@media (max-width: 1200px) {
  .introduce_flex {
    flex: 1;
  }
}
</style>
