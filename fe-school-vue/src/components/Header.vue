<template>
  <header class="header">
    <Logotype></Logotype>
    <slot name="header"></slot>
  </header>
</template>

<script>
import Logotype from '@/components/Logotype.vue';

export default {
  components: {
    Logotype,
  },
  data() {
    return {

    }
  },
  computed: {
    src() {
      return `#logo-task`;
    }
  },

  
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: auto;
  padding: 9px 20px;
  background-color: $color-light;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>