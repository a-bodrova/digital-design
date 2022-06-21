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
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const User_entity_1 = require("../Entities/User.entity");
const orm_1 = __importDefault(require("../orm"));
const mongodb_1 = require("mongodb");
const lodash_1 = require("lodash");
const { manager } = orm_1.default;
/** Пользователи */
let UserController = class UserController extends tsoa_1.Controller {
    /** Получение списка пользователей по фильтру */
    getByFilter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filter, page = 0, limit = 10 } = body;
            const { query } = filter;
            const repo = manager.getMongoRepository(User_entity_1.User);
            const findOptions = {
                where: {},
                skip: page * limit,
                take: limit,
            };
            if (query) {
                findOptions.where = Object.assign(Object.assign({}, findOptions.where), { username: new RegExp(`${query}`, 'i') });
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
    /** Получение списка всех пользователей */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const _users = yield manager.find(User_entity_1.User);
            const users = (0, lodash_1.castArray)(_users).filter(Boolean).map(x => {
                return {
                    id: x.id,
                    username: x.username,
                    login: x.login,
                    about: x.about || null,
                    photoUrl: x.photoUrl || null,
                };
            });
            return users;
        });
    }
    /** Получение пользователя по id */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                this.setStatus(400);
                return {
                    message: 'Пользователь не указан'
                };
            }
            const user = yield manager.findOneBy(User_entity_1.User, {
                _id: new mongodb_1.ObjectId(id),
            });
            if (user) {
                return {
                    id: user.id,
                    username: user.username,
                    login: user.login,
                    about: user.about || null,
                    photoUrl: user.photoUrl || null,
                };
            }
            return null;
        });
    }
    /** Редактирование пользователя */
    edit(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(user.login || user.username)) {
                this.setStatus(400);
                return {
                    message: 'Не указаны обязательные поля'
                };
            }
            let _user;
            if (user.id) {
                const match = yield manager.findOneBy(User_entity_1.User, {
                    _id: new mongodb_1.ObjectId(user.id)
                });
                if (match) {
                    _user = match;
                    if (user.password && user.password !== _user.password) {
                        _user.password = user.password;
                    }
                }
                else {
                    this.setStatus(400);
                    return {
                        message: 'Пользователь не найден'
                    };
                }
            }
            else {
                _user = new User_entity_1.User();
                if (!user.password) {
                    this.setStatus(400);
                    return {
                        message: 'Не указан пароль'
                    };
                }
                _user.login = user.login;
                _user.password = user.password;
            }
            _user.username = user.username || '';
            _user.about = user.about || '';
            _user.photoUrl = user.photoUrl || '';
            try {
                yield manager.save(_user);
            }
            catch (e) {
                this.setStatus(500);
                return {
                    message: 'Произошла ошибка сохранения пользователя',
                };
            }
            return {
                id: _user.id,
                username: _user.username,
                login: _user.login,
                about: _user.about || null,
                photoUrl: _user.photoUrl || null,
            };
        });
    }
    /** Авторизация пользователя */
    login(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(credential.login || credential.password)) {
                this.setStatus(400);
                return {
                    message: 'Не указан логин или пароль'
                };
            }
            // /** Не используейте это в реальных проектах */
            const user = yield manager.findOneBy(User_entity_1.User, {
                login: credential.login,
                password: credential.password,
            });
            if (!user) {
                this.setStatus(401);
                return {
                    message: 'Неправильный логин или пароль'
                };
            }
            return {
                id: user.id,
                username: user.username,
                login: user.login,
                about: user.about || null,
                photoUrl: user.photoUrl || null,
            };
        });
    }
    /** Удаление пользователя по id */
    delete(
    /** id пользователя */
    id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                this.setStatus(400);
                return {
                    message: 'Пользователь не указан'
                };
            }
            const user = yield manager.findOneBy(User_entity_1.User, {
                _id: new mongodb_1.ObjectId(id),
            });
            if (!user) {
                this.setStatus(400);
                return {
                    message: 'Пользователь не найден'
                };
            }
            yield manager.remove(user);
            return id;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getByFilter", null);
__decorate([
    (0, tsoa_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    (0, tsoa_1.Get)(':id'),
    (0, tsoa_1.Response)(400, "Request Error", {
        message: "Текст ошибки",
    }),
    __param(0, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
__decorate([
    (0, tsoa_1.Put)('edit'),
    (0, tsoa_1.Response)(400, "Request Error", {
        message: "Текст ошибки",
    }),
    (0, tsoa_1.Response)(500, "Internal Server Error", {
        message: "Текст ошибки",
    }),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "edit", null);
__decorate([
    (0, tsoa_1.Post)('login'),
    (0, tsoa_1.Response)(400, "Request Error", {
        message: "Текст ошибки",
    }),
    (0, tsoa_1.Response)(401, "Auth", {
        message: "Текст ошибки",
    }),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, tsoa_1.Delete)(':userId'),
    (0, tsoa_1.Response)(400, "Request Error", {
        message: "Текст ошибки",
    }),
    __param(0, (0, tsoa_1.Path)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, tsoa_1.Route)('users'),
    (0, tsoa_1.Tags)('Users')
], UserController);
exports.UserController = UserController;
