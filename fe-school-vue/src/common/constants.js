export const appRoutes = {
  TASKS_LIST: '/tasks',
  TASK_OVERVIEW: '/tasks/:taskId',
  TASK_EDIT: '/tasks/:taskId/edit',
  NEW_TASK: '/tasks/new',
  USERS_LIST: '/users',
  USER_OVERVIEW: '/users/:userId',
  USER_EDIT: '/users/:userId/edit',
  NOT_FOUND: '*',
  AUTH: '/auth',
}

export const typeSelect = {
  bug: 'Ошибка',
  task: 'Задача',
};

export const statusSelect = {
  opened: 'Открыто',
  inProgress: 'В работе',
  testing: 'Тестирование',
  complete: 'Сделано',
};

export const rankSelect = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};