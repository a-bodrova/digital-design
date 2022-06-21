/** Модель авторизации пользователя */
export interface LoginDTO {
    /** Логин */
    login: string;
    /** Пароль */
    password: string;
}

/** Модель пользователя */
export interface UserDTO {
    /** id пользователя */
    id?: string;
    /** Логин */
    login: string;
    /** Имя */
    username: string;
    /** О себе */
    about?: string | null;
    /** Ссылка на фотографию */
    photoUrl?: string | null;
}

/** Модель пользователя в БД */
export type UserWithCredsDTO = UserDTO & LoginDTO;