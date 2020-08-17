<template lang="pug">
  .global--header
    Logo
    UserInfo
</template>

<script>
import Logo from './components/Logo'
import UserInfo from './components/UserInfo'
export default {
  name: 'GlobalHeader',
  components: {
    Logo,
    UserInfo
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.global--header {
  height: 56px;
  display: flex;
  justify-content: space-between;
  background: white;
  padding-right: 24px;
}
</style>
