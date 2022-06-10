<template>
  <div class="user">
    <span class="user__name">{{ user.username }}</span>
    <div class="avatar__border" @click="handleClick">
      <img :src="user.photoUrl" class="avatar" alt="avatar" />
    </div>
    <Dropdown v-if="isOpenDropdown">
      <template v-slot:dropdown>
        <li @click="handleClick"><router-link :to="`/users/${user.id}`">Посмотреть профиль</router-link></li>
        <li @click="handleClick"><router-link to="/auth" @click="handleExit" class="danger__item">Выйти из системы</router-link></li>
      </template>
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
      isOpenDropdown: false,
      user: {
        id: 1,
        username: 'Anna',
        photoUrl: 'static/images/avatar.jpg',
      },
    }
  },

  methods: {
    handleClick() {
      this.isOpenDropdown = !this.isOpenDropdown;
    },
    handleExit() {},
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