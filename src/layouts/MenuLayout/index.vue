<template lang="pug">
  .menuLayout--wrapp
    BaseSiderMenu.menuLayout--wrapp__sider
    .menuLayout--wrapp__router
        router-view
</template>

<script>
import BaseSiderMenu from '../BaseSiderMenu'
export default {
  name: "MenuLayout",
  components:{
    BaseSiderMenu
  },
  data() {
    return {
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.menuLayout--wrapp {
  display: flex;
  width: 100%;
  height: 100%;
  &__sider {
    padding-top: 24px;
  }
  &__router {
    flex: 1;
    padding: 24px;
    > div{
      background-color: white;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
