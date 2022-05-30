export const AppRoute = {
  START: '/',
  USERLIST: '/users',
  USER_ID: '/users/:id',
  PROFILE: '/users/me',
  TASKLIST: '/tasks',
  TASK_ID: '/tasks/:id',
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

export const statusButtonList = {
  opened: [
    {
      newStatus: 'inProgress',
      text: 'Взять в работу',
      view: 'default',
    },
    {
      newStatus: 'complete',
      text: 'Готово',
      view: 'success',
    },
  ],
  inProgress: [
    {
      newStatus: 'opened',
      text: 'Переоткрыть',
      view: 'default',
    },
    {
      newStatus: 'testing',
      text: 'На тестирование',
      view: 'default',
    },
    {
      newStatus: 'complete',
      text: 'Готово',
      view: 'success',
    },
  ],
  testing: [
    {
      newStatus: 'opened',
      text: 'Переоткрыть',
      view: 'default',
    },
    {
      newStatus: 'complete',
      text: 'Готово',
      view: 'success',
    },
  ],
  complete: [
    {
      newStatus: 'opened',
      text: 'Переоткрыть',
      view: 'default',
    },
  ]
};
