import { TaskRankEnum, TaskStatusEnum, TaskTypeEnum } from "./Task.model";

export interface UserFilter {
    /** Имя пользоваетля */
    query?: string | null;
}

export interface TaskFilter {
    /** Заголовок */
    query?: string;
    /** id исполнителя */
    assignedUsers?: Array<string>;
    /** id создателя задачи */
    userIds?: Array<string>;
    /** Тип задачи */
    type?: Array<TaskTypeEnum>;
    /** Статус задачи */
    status?: Array<TaskStatusEnum>;
    /** Приоритет задачи */
    rank?: Array<TaskRankEnum>;
}

export interface QueryDTO<T extends object> {
    /** Фильтр */
    filter: T;
    /** Номер страницы (начиная с нуля) */
    page: number;
    /** Кол-во элементов на странице */
    limit: number;
}

export interface ListDTO<T> {
    /** Результат */
    data: Array<T>
    /** Номер страницы */
    page: number;
    /** Кол-во элементов на странице */
    limit: number;
    /** Всего записей по фильтру */
    total: number;
}