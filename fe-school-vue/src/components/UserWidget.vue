<template>
  <div class="user">
    <span class="user__name">{{ username }}</span>
    <div class="avatar__border" @click="handleAvatar">
      <img :src="imageSrc" class="avatar" alt="avatar" />
    </div>
    <Dropdown v-if="isOpenDropdown">
      <li><a href="/" @click="handleProfile">Посмотреть профиль</a></li>
      <li><a href="/" @click="handleExit" class="danger__item">Выйти из системы</a></li>
    </Dropdown>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown.vue';

export default {
  components: {
    Dropdown,
  },
  data() {
    return {
      username: 'Anna',
      isOpenDropdown: false,
    }
  },

  methods: {
    handleAvatar() {
      this.isOpenDropdown = !this.isOpenDropdown;
    },
    handleProfile() {},
    handleExit() {},
  },

  computed: {
    imageSrc() {
      return 'static/images/avatar.jpg';
    },
  },
}
</script>

<style lang='scss' scoped>
  .user {
    display: flex;
    align-items: center;
    gap: 10px;
    @include common-text;
  
    & .avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      cursor: pointer;
  
      &__border {
        position: relative;
        @include avatar-border(42px);
  
        &:hover {
          box-shadow: 0px 0px 2px 2px rgba(123, 97, 255, 0.5);
        }
      }
    }
  }
</style>