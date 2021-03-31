<template>
  <nav>
    <div class="nav-left">
      <router-link
        v-for="item in menuList"
        :key="item.url"
        :to="item.url"
        :class="{ active: $route.path === item.url }"
        class="nav-item"
      >
        {{ $t('menu.' + item.url) }}
      </router-link>
    </div>
    <div class="nav-right">
      <div class="nav-item">登录</div>
      <!-- <div class="nav-item">个人中心</div> -->
      <div class="nav-item" style="width: 40px" @click="switchLocale">
        {{ locale === 'en' ? 'ZH' : 'EN' }}
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['menuList', '']),
    ...mapState('locale', ['locale']),
  },
  methods: {
    ...mapMutations({
      SET_LANG: 'locale/SET_LANG',
    }),
    switchLocale() {
      const locale = this.locale === 'zh' ? 'en' : 'zh'
      this.$i18n.locale = locale
      this.$cookies.set('lang', locale)
      this.SET_LANG(locale)
    },
  },
}
</script>
<style lang="less">
nav {
  font-size: 20px;
  height: 70px;
  line-height: 70px;
  display: flex;
  .nav-left {
    display: flex;
    flex: 1;
  }
  .nav-item {
    padding: 0 10px;
    cursor: pointer;
    color: @chiefColor;
    &.active {
      color: @activeColor;
    }
    &:first-child,
    &:last-child {
      padding-left: 0;
    }
  }
  .nav-right {
    display: flex;
  }
}
</style>
