<template>
  <div id="App">
      <h3>Wecome</h3>
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
    togglePaths(){
      sessionStorage.setItem('path','/home');
      // window.location.reload();
    }
  },
  created() {
    this.togglePaths();
  },
  mounted() {},
};
</script>
<style lang='less' scoped>
</style>