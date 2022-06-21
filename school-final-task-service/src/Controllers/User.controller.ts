import {
    Body,
    Controller,
    Get,
    Put,
    Path,
    Post,
    Route,
    Tags,
    Response,
    Delete,
} from 'tsoa';

import { UserFilter, QueryDTO, ListDTO } from '../Models/Common.model';
import { UserDTO, LoginDTO, UserWithCredsDTO } from '../Models/User.model';
import { User } from '../Entities/User.entity';
import orm from '../orm';
import { ObjectId } from 'mongodb';
import { castArray } from 'lodash';
import { FindManyOptions } from 'typeorm';

const { manager } = orm;

/** Пользователи */
@Route('users')
@Tags('Users')
export class UserController extends Controller{
    /** Получение списка пользователей по фильтру */
    @Post()
    public async getByFilter(
        @Body() body: QueryDTO<UserFilter>
    ): Promise<ListDTO<UserDTO>> {
        const { filter, page = 0, limit = 10 } = body;
        const { query } = filter;

        const repo = manager.getMongoRepository(User);

        const findOptions: FindManyOptions<User> = {
            where: {},
            skip: page * limit,
            take: limit,
        }

        if (query) {
            findOptions.where = {
                ...findOptions.where,
                username: new RegExp(`${query}`, 'i') as never
            }
        }

        const [data, total] = await repo.findAndCount(findOptions)

        return {
            data: castArray(data).filter(Boolean),
            page: page || 0,
            limit: limit || 0,
            total: total || 0,
        };
    }

    /** Получение списка всех пользователей */
    @Get('all')
    public async getAll(): Promise<Array<UserDTO>> {
        const _users = await manager.find(User);

        const users = castArray(_users).filter(Boolean).map(x => {
            return {
                id: x.id,
                username: x.username,
                login: x.login,
                about: x.about || null as never,
                photoUrl: x.photoUrl || null as never,
            }
        })

        return users;
    }

    /** Получение пользователя по id */
    @Get(':id')
    @Response<{ message: string }>(400, "Request Error", {
        message: "Текст ошибки",
    })
    public async getById(
        @Path('id') id: string,
    ): Promise<UserDTO> {
        if (!id) {
            this.setStatus(400);
            return {
                message: 'Пользователь не указан'
            } as never;
        }

        const user = await manager.findOneBy(User, {
            _id: new ObjectId(id) as never,
        } as never);

        if (user) {
            return {
                id: user.id,
                username: user.username,
                login: user.login,
                about: user.about || null as never,
                photoUrl: user.photoUrl || null as never,
            }
        }

        return null as never;
    }

    /** Редактирование пользователя */
    @Put('edit')
    @Response<{ message: string }>(400, "Request Error", {
        message: "Текст ошибки",
    })
    @Response<{ message: string }>(500, "Internal Server Error", {
        message: "Текст ошибки",
    })
    public async edit(
        @Body() user: UserDTO & LoginDTO,
    ): Promise<UserDTO> {
        if (!(user.login || user.username)) {
            this.setStatus(400);
            return {
                message: 'Не указаны обязательные поля'
            } as never;
        }

        let _user: User;

        if (user.id) {
            const match = await manager.findOneBy(User, {
                _id: new ObjectId(user.id) as never
            } as never)

            if (match) {
                _user = match;

                if (user.password && user.password !== _user.password) {
                    _user.password = user.password
                }
            } else {
                this.setStatus(400);
                return {
                    message: 'Пользователь не найден'
                }as never;
            }
        } else {
            _user = new User();

            if (!(<UserWithCredsDTO>user).password) {
                this.setStatus(400);
                return {
                    message: 'Не указан пароль'
                } as never;
            }

            _user.login = (<UserWithCredsDTO>user).login
            _user.password = (<UserWithCredsDTO>user).password
        }

        _user.username = user.username || ''
        _user.about = user.about || ''
        _user.photoUrl = user.photoUrl || ''

        try {
            await manager.save(_user);
        } catch (e) {
            this.setStatus(500)
            return {
                message: 'Произошла ошибка сохранения пользователя',
            } as never
        }

        return {
            id: _user.id,
            username: _user.username,
            login: _user.login,
            about: _user.about || null as never,
            photoUrl: _user.photoUrl || null as never,
        };
    }

    /** Авторизация пользователя */
    @Post('login')
    @Response<{ message: string }>(400, "Request Error", {
        message: "Текст ошибки",
    })
    @Response<{ message: string }>(401, "Auth", {
        message: "Текст ошибки",
    })
    public async login(
        @Body() credential: LoginDTO,
    ): Promise<UserDTO>{
        if (!(credential.login || credential.password)) {
            this.setStatus(400)
            return {
                message: 'Не указан логин или пароль'
            }as never;
        }

        // /** Не используейте это в реальных проектах */
        const user = await manager.findOneBy(User, {
            login: credential.login,
            password: credential.password,
        })

        if (!user) {
            this.setStatus(401);
            return {
                message: 'Неправильный логин или пароль'
            }as never;
        }

        return {
            id: user.id,
            username: user.username,
            login: user.login,
            about: user.about || null as never,
            photoUrl: user.photoUrl || null as never,
        };
    }

    /** Удаление пользователя по id */
    @Delete(':userId')
    @Response<{ message: string }>(400, "Request Error", {
        message: "Текст ошибки",
    })
    public async delete(
        /** id пользователя */
        @Path('userId') id: string,
    ): Promise<string> {
        if (!id) {
            this.setStatus(400);
            return {
                message: 'Пользователь не указан'
            } as never;
        }

        const user = await manager.findOneBy(User, {
            _id: new ObjectId(id) as never,
        } as never);
        
        if (!user) {
            this.setStatus(400);
            return {
                message: 'Пользователь не найден'
            } as never;
        }

        await manager.remove(user);

        return id;
    }
}