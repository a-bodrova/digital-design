export const AppRoute = {
  START: '/',
  TASKLIST: '/tasks',
  USERLIST: '/users',
  TASK_ID: '/tasks/:id',
  PROFILE: '/users/me',
  EDIT_TASK: '/tasks/edit/:id',
  NEW_TASK: '/tasks/new',
};

export const typeText = {
  task: 'Задача',
  bug: 'Ошибка',
}

export const statusText = {
  opened: 'Открыто',
  inProgress: 'В работе',
  testing: 'Тестирование',
  complete: 'Сделано',
}

export const rankText = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
}
