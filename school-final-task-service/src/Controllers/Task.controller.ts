import {
    Post,
    Controller,
    Route,
    Tags,
    Get,
    Path,
    Put,
    Delete,
    Patch,
    Body,
    Response,
} from 'tsoa';

import { TaskFilter, QueryDTO, ListDTO } from '../Models/Common.model';
import { TaskDTO, TaskRankEnum, TaskStatusEnum, TaskTypeEnum, TaskWithCommentDTO, WorktimeDTO } from '../Models/Task.model';
import { Task } from '../Entities/Task.entity';
import { Comment } from '../Entities/Comment.entity';
import orm from '../orm';
import { ObjectId } from 'mongodb';
import { castArray, isEmpty } from 'lodash';
import { FindManyOptions } from 'typeorm';

const { manager } = orm;

/** Пользователи */
@Route('tasks')
@Tags('Tasks')
export class TaskController extends Controller{
    /** Получение списка задач по фильтру */
    @Post()
    public async getByFilter(
        @Body() body: QueryDTO<TaskFilter>
    ): Promise<ListDTO<TaskDTO>> {
        const { filter, page, limit } = body;
        const { query = '', assignedUsers = [], userIds = [], type = [], status = [], rank = [] } = filter;

        const repo = manager.getMongoRepository(Task);

        const findOptions: FindManyOptions<Task> = {
            where: {},
            skip: page * limit,
            take: limit,
        }

        if (query) {
            findOptions.where = {
                ...findOptions.where,
                title: new RegExp(`${query}`, 'i') as never
            }
        }

        if (!isEmpty(assignedUsers)) {
            findOptions.where = {
                ...findOptions.where,
                assignedId: { $in: assignedUsers } as never,
            }
        }

        if (!isEmpty(userIds)) {
            findOptions.where = {
                ...findOptions.where,
                userId: { $in: userIds } as never,
            }
        }

        if (!isEmpty(type)) {
            findOptions.where = {
                ...findOptions.where,
                type: { $in: type } as never,
            }
        }

        if (!isEmpty(status)) {
            findOptions.where = {
                ...findOptions.where,
                status: { $in: status } as never,
            }
        }

        if (!isEmpty(rank)) {
            findOptions.where = {
                ...findOptions.where,
                rank: { $in: rank } as never,
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

    /** Получение задачи по id */
    @Get(':taskId')
    @Response<{ message: string }>(400, "Request Error", {
        message: "Текст ошибки",
    })
    public async getById(
        /** id задачи */
        @Path('taskId') id: string,
    ): Promise<TaskDTO> {
        if (!id) {
            this.setStatus(400);
            return {
                message: 'Задача не указана'
            } as never;
        }

        const task = await manager.findOneBy(Task, {
            _id: new ObjectId(id) as never,
        } as never);

        if (task) {
            return task
        }

        return null as never;
    }

    @Patch(':taskId/status/:status')
    @Response<{ message: string }>(400, "Request Error", {
        message: "Текст ошибки",
    })
    public async updateStatus(
        /** id задачи */
        @Path('taskId') id: string,
        @Path('status') status: TaskStatusEnum,
    ): Promise<TaskDTO> {
        if (!id) {
            this.setStatus(400);
            return {
                message: 'Задача не указана'
            } as never;
        }

        const task = await manager.findOneBy(Task, {
            _id: new ObjectId(id) as never,
        } as never);

        if (task) {
            const canMoveToInProgress = status === TaskStatusEnum.inProgress
                && (task.status === TaskStatusEnum.opened || task.status === TaskStatusEnum.testing)
            const canMoveToOpened = status === TaskStatusEnum.opened
                && (task.status === TaskStatusEnum.inProgress || task.status === TaskStatusEnum.testing || task.status === TaskStatusEnum.complete)
            const canMoveToTesting = status === TaskStatusEnum.testing
                && (task.status === TaskStatusEnum.inProgress)
            const canMoveToComplete = status === TaskStatusEnum.complete

            if (canMoveToComplete || canMoveToInProgress || canMoveToOpened || canMoveToTesting) {
                task.status = status
            } else {
                this.setStatus(400);
                return {
                    message: `Невозможно перевести статус из ${task.status} в ${status}`
                } as never;
            }

            await manager.save(task);

            return task
        } else {
            this.setStatus(400);
            return {
                message: 'Задача не найдена'
            } as never;
        }
    }

    @Patch(':taskId/worktime')
    @Response<{ message: string }>(400, "Request Error", {
        message: "Текст ошибки",
    })
    public async updateWorktime(
        /** id задачи */
        @Path('taskId') id: string,
        @Body() body: WorktimeDTO,
    ): Promise<TaskWithCommentDTO> {
        if (!id) {
            this.setStatus(400);
            return {
                message: 'Задача не указана'
            } as never;
        }

        if (!body.timeInMinutes) {
            this.setStatus(400);
            return {
                message: 'Затраченое время не указано'
            } as never;
        }

        const task = await manager.findOneBy(Task, {
            _id: new ObjectId(id) as never,
        } as never);

        if (task) {
            task.timeInMinutes += body.timeInMinutes;

            const _task = await manager.save(task);

            let _comment: Comment = null as never;

            if (body.comment) {
                const comment = new Comment();

                comment.taskId = id;
                comment.text = body.comment;
                comment.userId = body.currentUser;

                _comment = await manager.save(comment);
            }

            return {
                task: _task,
                comment: !!_comment ? {
                    id: _comment.id,
                    taskId: _comment.taskId,
                    userId: _comment.userId,
                    text: _comment.text,
                } : null as never,
            }
        } else {
            this.setStatus(400);
            return {
                message: 'Задача не найдена'
            } as never;
        }
    }

    /** Удаление задачи по id */
    @Delete(':taskId')
    @Response<{ message: string }>(400, "Request Error", {
        message: "Текст ошибки",
    })
    public async delete(
        /** id задачи */
        @Path('taskId') id: string,
    ): Promise<string> {
        if (!id) {
            this.setStatus(400);
            return {
                message: 'Задача не указана'
            } as never;
        }

        const task = await manager.findOneBy(Task, {
            _id: new ObjectId(id) as never,
        } as never);
        
        if (!task) {
            this.setStatus(400);
            return {
                message: 'Задача не найдена'
            } as never;
        }

        await manager.remove(task);

        return id;
    }

    /** Создаение или редактирование задачи */
    @Put('createOrEdit')
    public async createOrEdit(
        @Body() body: TaskDTO,
    ): Promise<TaskDTO> {
        let task: Task;

        if (body.id) {
            task = await manager.findOne(Task, {
                _id: new ObjectId(body.id) as never,
            } as never) as Task;
        } else {
            task = new Task();
            task.timeInMinutes = 0;
            task.status = TaskStatusEnum.opened;
            task.type = TaskTypeEnum.task;
            task.rank = TaskRankEnum.medium;
        }

        task.userId = body.userId
        task.assignedId = body.assignedId
        task.title = body.title
        task.description = body.description
        task.type = body.type
        task.rank = body.rank

        const _task = await manager.save(task);

        if (!_task) {
            this.setStatus(500);
            return {
                message: 'Не удалось сохранить задачу'
            } as never;
        }

        return _task;
    }
}