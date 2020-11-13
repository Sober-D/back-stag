<template>
  <div id="App">
      Home
      <button @click="signOut">退出</button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    signOut(){
        sessionStorage.removeItem('token');
        this.$router.push('/')
    }
  },
  created() {},
  mounted() {},
};
</script>
<style lang='less' scoped>
</style>