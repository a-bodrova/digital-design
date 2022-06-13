<template>
  <div class="menu_wrapper">
        <div class="menu" :class="{ active: isOpen }" @click="handleMenu">
          <span class="burger_line"></span>
            <Dropdown v-show="isOpen">
              <template v-slot:dropdown>
                <li>Редактировать</li>
                <li class="danger-item">Удалить</li>
                <li>На тестирование</li>
                <li>Переоткрыть</li>
              </template>
            </Dropdown>
        </div>
      </div>
</template>

<script>
import Dropdown from '@/components/Dropdown.vue';

export default {
  props: {

  },
  components: {
    Dropdown,
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    handleMenu() {
      this.isOpen = !this.Open;
    }
  }
}
</script>

<style lang="scss" scoped>
.menu_wrapper {
  width: 95px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.menu {
  position: relative;
  @include sizes(20px);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover,
  &.active {
    background-color: $color-primary;

    & .burger_line {
      background-color: $color-light;

      &::after,
      &::before {
        background-color: $color-light;
      }
    }
  }
}

.burger_line {
  width: 10px;
  height: 2px;
  position: relative;
  background-color: $color-primary;
  border-radius: 2px;

  &::before {
    position: absolute;
    left: 0;
    top: -5px;
    content: '';
    width: 10px;
    height: 2px;
    border-radius: 2px;
    background-color: $color-primary;
  }

  &::after {
    position: absolute;
    left: 0;
    bottom: -5px;
    content: '';
    width: 10px;
    height: 2px;
    border-radius: 2px;
    background-color: $color-primary;
  }
}
</style>