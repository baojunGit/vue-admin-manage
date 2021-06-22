<template>
  <div>登陆页{{ name }}</div>
</template>

<script lang="ts">
export default {
  data: () => ({
    name: '',
  }),
  created() {
    // this.login()
  },
  methods: {
    login() {
      let user: string = 'baojun'
      console.log(user)
      console.log(this.name)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>