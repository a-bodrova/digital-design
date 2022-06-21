import {
    Controller,
    Route,
    Tags,
    Get,
    Path,
    Put,
    Body,
    Delete,
    Response,
} from 'tsoa';

import { CommentDTO } from '../Models/Comment.model';
import { Comment } from '../Entities/Comment.entity';
import orm from '../orm';
import { ObjectId } from 'mongodb';
import { castArray } from 'lodash';

const { manager } = orm;

/** Пользователи */
@Route('comments')
@Tags('Comments')
export class CommentController extends Controller{
    /** Получение комментариев по id задачи */
    @Get(':taskId')
    @Response<{ message: string }>(400, "Request Error", {
        message: "Текст ошибки",
    })
    public async getById(
        /** id задачи */
        @Path('taskId') id: string,
    ): Promise<Array<CommentDTO>> {
        if (!id) {
            this.setStatus(400);
            return {
                message: 'Задача не указана'
            } as never;
        }

        const repo = manager.getMongoRepository(Comment);

        const comments = await repo.find({
            where: {
                taskId: id,
            }
        })

        return castArray(comments).filter(Boolean);
    }

    /** Создаение или редактирование комментария */
    @Put('createOrEdit')
    public async createOrEdit(
        @Body() body: CommentDTO,
    ): Promise<CommentDTO> {
        let comment: Comment;

        if (body.id) {
            comment = await manager.findOne(Comment, {
                _id: new ObjectId(body.id) as never,
            } as never) as Comment;
        } else {
            comment = new Comment();
            comment.userId = body.userId;
            comment.taskId = body.taskId;
        }

        comment.text = body.text;

        const _comment = await manager.save(comment);

        if (!_comment) {
            this.setStatus(500);
            return {
                message: 'Не удалось сохранить комментарий'
            } as never;
        }

        return _comment;
    }

    /** Удаление комментария по id */
    @Delete(':commentId')
    public async delete(
        /** id комментария */
        @Path('commentId') id: string,
    ): Promise<string> {
        if (!id) {
            this.setStatus(400);
            return {
                message: 'Не указан id комментария'
            } as never;
        }

        const comment = await manager.findOneBy(Comment, {
            _id: new ObjectId(id) as never,
        } as never);
        
        if (!comment) {
            this.setStatus(400);
            return {
                message: 'Комментарий не найден'
            } as never;
        }

        await manager.remove(comment);

        return id;
    }
}