<template>
  <nav class="nav">
    <router-link to="/tasks" class="nav__link" active-class="active">Задачи</router-link>
    <router-link to="/users" class="nav__link" active-class="active">Пользователи</router-link>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>

  .nav {
    display: flex;
    gap: 10px;
  
    &__link {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 33px;
      color: $color-text;
      cursor: pointer;
  
      &.active {
        position: relative;
  
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -13px;
          width: 100%;
          height: 2px;
          background-color: $color-primary;
        }
      }
  
      &:hover {
        color: $color-primary;
      }
    }
  }
</style>