"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const tsoa_1 = require("tsoa");
const Task_model_1 = require("../Models/Task.model");
const Task_entity_1 = require("../Entities/Task.entity");
const Comment_entity_1 = require("../Entities/Comment.entity");
const orm_1 = __importDefault(require("../orm"));
const mongodb_1 = require("mongodb");
const lodash_1 = require("lodash");
const { manager } = orm_1.default;
/** Пользователи */
let TaskController = class TaskController extends tsoa_1.Controller {
    /** Получение списка задач по фильтру */
    getByFilter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filter, page, limit } = body;
            const { query = '', assignedUsers = [], userIds = [], type = [], status = [], rank = [] } = filter;
            const repo = manager.getMongoRepository(Task_entity_1.Task);
            const findOptions = {
                where: {},
                skip: page * limit,
                take: limit,
            };
            if (query) {
                findOptions.where = Object.assign(Object.assign({}, findOptions.where), { title: new RegExp(`${query}`, 'i') });
            }
            if (!(0, lodash_1.isEmpty)(assignedUsers)) {
                findOptions.where = Object.assign(Object.assign({}, findOptions.where), { assignedId: { $in: assignedUsers } });
            }
            if (!(0, lodash_1.isEmpty)(userIds)) {
                findOptions.where = Object.assign(Object.assign({}, findOptions.where), { userId: { $in: userIds } });
            }
            if (!(0, lodash_1.isEmpty)(type)) {
                findOptions.where = Object.assign(Object.assign({}, findOptions.where), { type: { $in: type } });
            }
            if (!(0, lodash_1.isEmpty)(status)) {
                findOptions.where = Object.assign(Object.assign({}, findOptions.where), { status: { $in: status } });
            }
            if (!(0, lodash_1.isEmpty)(rank)) {
                findOptions.where = Object.assign(Object.assign({}, findOptions.where), { rank: { $in: rank } });
            }
            const [data, total] = yield repo.findAndCount(findOptions);
            return {
                data: (0, lodash_1.castArray)(data).filter(Boolean),
                page: page || 0,
                limit: limit || 0,
                total: total || 0,
            };
        });
    }
    /** Получение задачи по id */
    getById(
    /** id задачи */
    id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                this.setStatus(400);
                return {
                    message: 'Задача не указана'
                };
            }
            const task = yield manager.findOneBy(Task_entity_1.Task, {
                _id: new mongodb_1.ObjectId(id),
            });
            if (task) {
                return task;
            }
            return null;
        });
    }
    updateStatus(
    /** id задачи */
    id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                this.setStatus(400);
                return {
                    message: 'Задача не указана'
                };
            }
            const task = yield manager.findOneBy(Task_entity_1.Task, {
                _id: new mongodb_1.ObjectId(id),
            });
            if (task) {
                const canMoveToInProgress = status === Task_model_1.TaskStatusEnum.inProgress
                    && (task.status === Task_model_1.TaskStatusEnum.opened || task.status === Task_model_1.TaskStatusEnum.testing);
                const canMoveToOpened = status === Task_model_1.TaskStatusEnum.opened
                    && (task.status === Task_model_1.TaskStatusEnum.inProgress || task.status === Task_model_1.TaskStatusEnum.testing || task.status === Task_model_1.TaskStatusEnum.complete);
                const canMoveToTesting = status === Task_model_1.TaskStatusEnum.testing
                    && (task.status === Task_model_1.TaskStatusEnum.inProgress);
                const canMoveToComplete = status === Task_model_1.TaskStatusEnum.complete;
                if (canMoveToComplete || canMoveToInProgress || canMoveToOpened || canMoveToTesting) {
                    task.status = status;
                }
                else {
                    this.setStatus(400);
                    return {
                        message: `Невозможно перевести статус из ${task.status} в ${status}`
                    };
                }
                yield manager.save(task);
                return task;
            }
            else {
                this.setStatus(400);
                return {
                    message: 'Задача не найдена'
                };
            }
        });
    }
    updateWorktime(
    /** id задачи */
    id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                this.setStatus(400);
                return {
                    message: 'Задача не указана'
                };
            }
            if (!body.timeInMinutes) {
                this.setStatus(400);
                return {
                    message: 'Затраченое время не указано'
                };
            }
            const task = yield manager.findOneBy(Task_entity_1.Task, {
                _id: new mongodb_1.ObjectId(id),
            });
            if (task) {
                task.timeInMinutes += body.timeInMinutes;
                const _task = yield manager.save(task);
                let _comment = null;
                if (body.comment) {
                    const comment = new Comment_entity_1.Comment();
                    comment.taskId = id;
                    comment.text = body.comment;
                    comment.userId = body.currentUser;
                    _comment = yield manager.save(comment);
                }
                return {
                    task: _task,
                    comment: !!_comment ? {
                        id: _comment.id,
                        taskId: _comment.taskId,
                        userId: _comment.userId,
                        text: _comment.text,
                    } : null,
                };
            }
            else {
                this.setStatus(400);
                return {
                    message: 'Задача не найдена'
                };
            }
        });
    }
    /** Удаление задачи по id */
    delete(
    /** id задачи */
    id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                this.setStatus(400);
                return {
                    message: 'Задача не указана'
                };
            }
            const task = yield manager.findOneBy(Task_entity_1.Task, {
                _id: new mongodb_1.ObjectId(id),
            });
            if (!task) {
                this.setStatus(400);
                return {
                    message: 'Задача не найдена'
                };
            }
            yield manager.remove(task);
            return id;
        });
    }
    /** Создаение или редактирование задачи */
    createOrEdit(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let task;
            if (body.id) {
                task = (yield manager.findOne(Task_entity_1.Task, {
                    _id: new mongodb_1.ObjectId(body.id),
                }));
            }
            else {
                task = new Task_entity_1.Task();
                task.timeInMinutes = 0;
                task.status = Task_model_1.TaskStatusEnum.opened;
                task.type = Task_model_1.TaskTypeEnum.task;
                task.rank = Task_model_1.TaskRankEnum.medium;
            }
            task.userId = body.userId;
            task.assignedId = body.assignedId;
            task.title = body.title;
            task.description = body.description;
            task.type = body.type;
            task.rank = body.rank;
            const _task = yield manager.save(task);
            if (!_task) {
                this.setStatus(500);
                return {
                    message: 'Не удалось сохранить задачу'
                };
            }
            return _task;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getByFilter", null);
__decorate([
    (0, tsoa_1.Get)(':taskId'),
    (0, tsoa_1.Response)(400, "Request Error", {
        message: "Текст ошибки",
    }),
    __param(0, (0, tsoa_1.Path)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getById", null);
__decorate([
    (0, tsoa_1.Patch)(':taskId/status/:status'),
    (0, tsoa_1.Response)(400, "Request Error", {
        message: "Текст ошибки",
    }),
    __param(0, (0, tsoa_1.Path)('taskId')),
    __param(1, (0, tsoa_1.Path)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateStatus", null);
__decorate([
    (0, tsoa_1.Patch)(':taskId/worktime'),
    (0, tsoa_1.Response)(400, "Request Error", {
        message: "Текст ошибки",
    }),
    __param(0, (0, tsoa_1.Path)('taskId')),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateWorktime", null);
__decorate([
    (0, tsoa_1.Delete)(':taskId'),
    (0, tsoa_1.Response)(400, "Request Error", {
        message: "Текст ошибки",
    }),
    __param(0, (0, tsoa_1.Path)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "delete", null);
__decorate([
    (0, tsoa_1.Put)('createOrEdit'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createOrEdit", null);
TaskController = __decorate([
    (0, tsoa_1.Route)('tasks'),
    (0, tsoa_1.Tags)('Tasks')
], TaskController);
exports.TaskController = TaskController;
