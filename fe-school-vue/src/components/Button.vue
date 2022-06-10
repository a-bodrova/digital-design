<template>
  <button @click="toTasks">To tasks</button>
</template>

<script>
export default {

  data() {
    return {
    }
  },
  methods: {
    toTasks() {
      this.$router.push({ name: 'TaskList' });
    }
  }

}
</script>

<style>

</style>