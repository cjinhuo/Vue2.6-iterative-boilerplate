<template lang="pug">
  el-dropdown.user-info(@command="handleCommand")
    .user-info__title
      <i style="font-size:18px; position: relative; top: 1px;" class="iconfont iconcircle-avatar"></i>
      | 用户名
      <i class="el-icon-arrow-down el-icon--right"></i>
    el-dropdown-menu(slot="dropdown")
      el-dropdown-item(command="info") 账户信息
      el-dropdown-item(command="logout") 退出登录
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "info":
          console.log(command)
          break
        case "logout":
          console.log("logout")
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
