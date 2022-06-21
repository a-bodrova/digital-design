"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRankEnum = exports.TaskStatusEnum = exports.TaskTypeEnum = void 0;
/** Тип задачи */
var TaskTypeEnum;
(function (TaskTypeEnum) {
    /** Задача */
    TaskTypeEnum["task"] = "task";
    /** Баг */
    TaskTypeEnum["bug"] = "bug";
})(TaskTypeEnum = exports.TaskTypeEnum || (exports.TaskTypeEnum = {}));
/** Статус */
var TaskStatusEnum;
(function (TaskStatusEnum) {
    /** Откртыо */
    TaskStatusEnum["opened"] = "opened";
    /** В работе */
    TaskStatusEnum["inProgress"] = "inProgress";
    /** Тестирование */
    TaskStatusEnum["testing"] = "testing";
    /** Сделано */
    TaskStatusEnum["complete"] = "complete";
})(TaskStatusEnum = exports.TaskStatusEnum || (exports.TaskStatusEnum = {}));
/** Приоритет */
var TaskRankEnum;
(function (TaskRankEnum) {
    /** Низкий */
    TaskRankEnum["low"] = "low";
    /** Средний */
    TaskRankEnum["medium"] = "medium";
    /** Высокий */
    TaskRankEnum["high"] = "high";
})(TaskRankEnum = exports.TaskRankEnum || (exports.TaskRankEnum = {}));
