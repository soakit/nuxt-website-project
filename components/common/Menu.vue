<template>
  <nav>
    <template v-if="$route.path !== '/login'">
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
      <router-link
        v-if="!token"
        :to="{
          path: '/login',
          query: { redirectUrl: $route.fullPath },
        }"
        class="nav-item"
        >{{ $t('menu.login') }}</router-link
      >
      <a-popover v-else trigger="hover">
        <template slot="content">
          <span class="btn-logout" @click="onLogout">{{
            $t('menu.logout')
          }}</span>
        </template>
        <div class="nav-item">个人中心</div>
      </a-popover>
    </template>
    <div class="nav-item" style="width: 40px" @click="switchLocale">
      {{ locale === 'en' ? '简' : 'EN' }}
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['menuList', 'token']),
    ...mapState('locale', ['locale']),
  },
  methods: {
    ...mapMutations({
      SET_LANG: 'locale/SET_LANG',
      SET_TOKEN: 'SET_TOKEN',
    }),
    switchLocale() {
      const locale = this.locale === 'zh' ? 'en' : 'zh'
      this.$i18n.locale = locale
      this.$cookies.set('lang', locale)
      this.SET_LANG(locale)
    },
    onLogout() {
      this.SET_TOKEN('')
      localStorage.setItem('token', '')
      this.$cookies.set('token', '')
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
  justify-content: flex-end;
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
}
</style>
