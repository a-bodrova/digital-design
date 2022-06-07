<template>
  <header class="header">
      <div>
        <img src="@/assets/images/Logo.svg" class="logo__image" />
      </div>
      <NavList></NavList>
    </header>
</template>

<script>
import NavList from './NavList.vue';

export default {
  components: {
    NavList,
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