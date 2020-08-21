<template lang="pug">
  el-container.base--container
    el-header.base--header(height="56px")
      GlobalHeader
    el-container.base--content
      ContentLayout
</template>

<script>
import GlobalHeader from '../GlobalHeader'
import MenuLayout from '../MenuLayout'
import BlankLayout from '@/layouts/BlankLayout'
export default {
  name: 'BaseLayout',
  components: {
    GlobalHeader,
    ContentLayout: {
      render() {
        const {
          meta: { hideMenuLayout = false }
        } = this.$route
        return hideMenuLayout ? <BlankLayout /> : <MenuLayout />
      }
    }
  }
}
</script>

<style lang="less" scoped>
.base {
  &--container {
    background-color: #eaeff2;
    width: 100%;
    height: 100%;
  }
  &--header {
    line-height: 56px;
    padding: 0;
  }
  &--content {
    width: 100%;
    height: 100%;
  }
}
</style>
