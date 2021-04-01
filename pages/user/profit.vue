<template>
  <div>
    <div class="profit-detail">
      <div class="item">
        <p>总收益(FIL)</p>
        <p>{{ tData.total }}</p>
        <p>解锁收益(FIL)</p>
        <p>{{ tData.unlocked }}</p>
        <p>锁仓收益(FIL)</p>
        <p>{{ tData.locked }}</p>
      </div>

      <div class="item">
        <p>可提现(FIL)</p>
        <p>{{ tData.balance }}</p>
        <p>已提现</p>
        <p>{{ tData.withdraw }}</p>
        <p>提现中</p>
        <p>{{ tData.freeze }}</p>
      </div>

      <div class="item">
        <p>抵押(FIL)</p>
        <p>{{ tData.pledge }}</p>
        <p>垫付抵押(FIL)</p>
        <p>{{ tData.advanceMortgage || 0 }}</p>
        <p>用户抵押(FIL)</p>
        <p>{{ tData.pledge_reply }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ app, store }) {
    let profitData = {}
    if (store.state.profitData) {
      profitData = store.state.profitData
    } else {
      profitData = await app.$api.getProfit()
      store.commit('GET_PROFIT', profitData)
    }
    return {
      tData: profitData,
    }
  },
}
</script>
<style lang="less">
.profit-detail {
  display: flex;
  .item {
    flex: 1;
  }
}
</style>
