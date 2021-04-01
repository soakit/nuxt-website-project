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
        <p>{{ tData.advanceMortgage }}</p>
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
    // 如果不需要实时的数据，就放开注释，使用缓存的数据
    // if (store.state.profitData) {
    //   profitData = store.state.profitData
    // } else {
    profitData = await app.$api.getProfit()

    profitData.advanceMortgage = profitData.pledge - profitData.pledge_reply
    const getFil = (value) =>
      parseFloat(Number(Number(value) / 1000000000000000000).toFixed(4))
    for (const i in profitData) {
      profitData[i] = getFil(profitData[i])
    }

    store.commit('GET_PROFIT', profitData)
    // }
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
