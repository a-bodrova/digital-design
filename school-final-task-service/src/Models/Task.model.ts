import { CommentDTO } from "./Comment.model";

/** Модель задачи */
export interface TaskDTO {
    /** id задачи */
    id?: string;
    /** id пользователя */
    userId: string;
    /** id пользователя на которого назначена задача */
    assignedId: string;
    /** Заголовок */
    title: string;
    /** Описание */
    description: string;
    /** Тип задачи */
    type: TaskTypeEnum;
    /** Дата создания */
    dateOfCreation?: Date;
    /** Дата обновления */
    dateOfUpdate?: Date;
    /** Затраченное время */
    timeInMinutes?: number;
    /** Статус */
    status?: TaskStatusEnum;
    /** Приоритет */
    rank: TaskRankEnum;
}

export interface WorktimeDTO {
    /** Время в минутах, которое нужно добавить */
    timeInMinutes: number;
    /** Комментарий */
    comment?: string;
    /** Текущий пользователь */
    currentUser: string;
}

export interface TaskWithCommentDTO {
    /** Задача */
    task: TaskDTO;
    /** Комментарий */
    comment: CommentDTO;
}

/** Тип задачи */
export enum TaskTypeEnum {
    /** Задача */
    task = 'task',
    /** Баг */
    bug = 'bug',
}

/** Статус */
export enum TaskStatusEnum {
    /** Откртыо */
    opened = 'opened',
    /** В работе */
    inProgress = 'inProgress',
    /** Тестирование */
    testing = 'testing',
    /** Сделано */
    complete = 'complete',
}

/** Приоритет */
export enum TaskRankEnum {
    /** Низкий */
    low = 'low',
    /** Средний */
    medium = 'medium',
    /** Высокий */
    high = 'high',
}