<template>
  <main class="main">
    <div class="page-title__wrapper">
      <h1 class="page-title">{{ pageTitle }}</h1>
      <div class="buttons__container">
        <slot name="page-title__buttons"></slot>
      </div>
    </div>
    <section class="page">
      <slot name="filter"></slot>
      <ul class="list">
        <slot name="list"></slot>
      </ul>
    </section>
  </main>
</template>

<script>

export default {
  props: {
    'pageTitle': String,
  },

  data() {
    return {
    }
  },
}
</script>


<style lang="scss" scoped>
  .page-title {
    @include page-title;

    &__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
  }

  .buttons__container {
    display: flex;
    gap: 10px;
  }

  .main {
    max-width: 1280px;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 20px;
    padding: 30px 80px;
  }

  .page {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    flex-grow: 1;
    background: $color-light;
    box-shadow: 0px 0px 5px 3px $color-disabled;
    border-radius: 5px;
  }

  .list {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    border-radius: 5px;
  
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      width: 100%;
      height: 100%;
      box-shadow: inset 0px 0px 2px 1px $color-disabled;
      border-radius: 5px;
      z-index: 5;
      pointer-events: none;
    }
  }
</style>