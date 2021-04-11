<template>
  <div>
    <el-button type="info" @click="logout"></el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$route.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
