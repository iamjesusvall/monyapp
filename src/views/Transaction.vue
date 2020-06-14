<template>
  <b-container>
    <router-view></router-view>
  </b-container>
</template>
<script>

export default {
  methods: {
    goPrevious() {
      this.$router.go(-1)
    }
  }
}
</script>