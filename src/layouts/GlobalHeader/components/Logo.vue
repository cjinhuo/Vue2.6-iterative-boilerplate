<template lang="pug">
  .logo
    <i class="iconfont iconirregular-logo"></i>
    div.title 系统名称
</template>

<script>
export default {
  name: 'Logo',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  width: 216px;
  line-height: 56px;
  background-color: #409eff;
  justify-content: center;
  i {
    font-size: 36px;
    color: white;
    margin-right: 8px;
  }
  .title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
