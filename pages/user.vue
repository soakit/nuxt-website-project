<template>
  <div class="user-wrap">
    <div class="user-nav">
      <router-link to="/user/profit" class="nav-item">收益概览</router-link>
      <router-link to="/user/order" class="nav-item">普通订单</router-link>
      <router-link to="/user/equipment" class="nav-item">设备列表</router-link>
    </div>
    <nuxt-child class="user-container" />
  </div>
</template>

<script>
export default {
  middleware: 'userAuth',
}
</script>

<style lang="less">
.user-wrap {
  display: flex;
  .user-nav {
    display: flex;
    flex-direction: column;
    min-width: 120px;
  }
  .user-container {
    flex: 1;
  }
}
</style>
