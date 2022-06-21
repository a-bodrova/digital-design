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
exports.CommentController = void 0;
const tsoa_1 = require("tsoa");
const Comment_entity_1 = require("../Entities/Comment.entity");
const orm_1 = __importDefault(require("../orm"));
const mongodb_1 = require("mongodb");
const lodash_1 = require("lodash");
const { manager } = orm_1.default;
/** Пользователи */
let CommentController = class CommentController extends tsoa_1.Controller {
    /** Получение комментариев по id задачи */
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
            const repo = manager.getMongoRepository(Comment_entity_1.Comment);
            const comments = yield repo.find({
                where: {
                    taskId: id,
                }
            });
            return (0, lodash_1.castArray)(comments).filter(Boolean);
        });
    }
    /** Создаение или редактирование комментария */
    createOrEdit(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let comment;
            if (body.id) {
                comment = (yield manager.findOne(Comment_entity_1.Comment, {
                    _id: new mongodb_1.ObjectId(body.id),
                }));
            }
            else {
                comment = new Comment_entity_1.Comment();
                comment.userId = body.userId;
                comment.taskId = body.taskId;
            }
            comment.text = body.text;
            const _comment = yield manager.save(comment);
            if (!_comment) {
                this.setStatus(500);
                return {
                    message: 'Не удалось сохранить комментарий'
                };
            }
            return _comment;
        });
    }
    /** Удаление комментария по id */
    delete(
    /** id комментария */
    id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                this.setStatus(400);
                return {
                    message: 'Не указан id комментария'
                };
            }
            const comment = yield manager.findOneBy(Comment_entity_1.Comment, {
                _id: new mongodb_1.ObjectId(id),
            });
            if (!comment) {
                this.setStatus(400);
                return {
                    message: 'Комментарий не найден'
                };
            }
            yield manager.remove(comment);
            return id;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)(':taskId'),
    (0, tsoa_1.Response)(400, "Request Error", {
        message: "Текст ошибки",
    }),
    __param(0, (0, tsoa_1.Path)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getById", null);
__decorate([
    (0, tsoa_1.Put)('createOrEdit'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createOrEdit", null);
__decorate([
    (0, tsoa_1.Delete)(':commentId'),
    __param(0, (0, tsoa_1.Path)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "delete", null);
CommentController = __decorate([
    (0, tsoa_1.Route)('comments'),
    (0, tsoa_1.Tags)('Comments')
], CommentController);
exports.CommentController = CommentController;
