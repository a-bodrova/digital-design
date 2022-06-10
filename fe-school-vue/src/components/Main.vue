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
      <ul>
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
    padding: 20px;
    gap: 20px;
    flex-grow: 1;
    background: $color-light;
    box-shadow: 0px 0px 5px 3px $color-disabled;
    border-radius: 5px;
  }
</style>