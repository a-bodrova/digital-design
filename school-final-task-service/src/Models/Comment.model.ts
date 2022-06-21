/** Модель комментария */
export interface CommentDTO {
    /** id комментария */
    id?: string;
    /** id задачи */
    taskId: string;
    /** id пользователя */
    userId: string;
    /** Текст комментария */
    text: string;
    /** Дата создания */
    dateOfCreation?: Date;
    /** Дата обновления */
    dateOfUpdate?: Date;
}