<template>
  <main class="main">
    <slot name="page-title"></slot>
    <section class="page">
    </section>
  </main>
</template>

<script>

export default {
 

  data() {
    return {
      props: [
        'title',
      ],
    }
  },
}
</script>


<style lang="scss" scoped>
  .page-title {
    @include page-title;
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