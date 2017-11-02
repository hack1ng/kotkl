<template>
  <h2>
    {{title}}
  </h2>
</template>

<script>

export default {
  props: [
    'title'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  font-size: 30px;
}
</style>
