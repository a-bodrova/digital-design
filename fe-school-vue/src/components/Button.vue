<template>
  <button class="btn" :class="view" :type="type">{{ text }}</button>
</template>

<script>
export default {
  props: {
    'view': String,
    'text': String,
    'type': String,
  },

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