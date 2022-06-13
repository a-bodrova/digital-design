<template>
  <li class="task_line">
    <task-type :type="task.type"></task-type>
    <router-link :to="`/tasks/${task.id}`">
      <span class="task_title">{{task.title}}</span>
    </router-link>
    <task-executor :username="task.assignedId"></task-executor>
    <task-status :status="task.status"></task-status>
    <task-rank :rank="task.rank"></task-rank>
    <task-menu></task-menu>
  </li>
</template>

<script>
import TaskType from '@/components/TaskType.vue';
import TaskExecutor from '@/components/TaskExecutor.vue';
import TaskStatus from '@/components/TaskStatus.vue';
import TaskRank from '@/components/TaskRank.vue';
import TaskMenu from '@/components/TaskMenu.vue';

export default {
  components: {
    TaskType,
    TaskExecutor,
    TaskStatus,
    TaskRank,
    TaskMenu,
  },
  props: {
    'task': Object,
  }

}
</script>

<style lang='scss' scoped>
  .task_line {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 14px;
    padding: 20px 30px;
    cursor: pointer;
  
    &:nth-child(2n) {
      background-color: $color-bg-item;
    }
  
    &:hover {
      background-color: $color-label-text;
    }
  }

  .task_title {
    @include common-text;
    width: 527px;
    height: 100%;
    flex-grow: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>