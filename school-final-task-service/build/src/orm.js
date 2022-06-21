"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./Entities/User.entity");
const Task_entity_1 = require("./Entities/Task.entity");
const Comment_entity_1 = require("./Entities/Comment.entity");
const orm = new typeorm_1.DataSource({
    type: 'mongodb',
    url: encodeURI(`mongodb+srv://${encodeURIComponent(process.env.MONGOUSR)}:${encodeURIComponent(process.env.MONGOPASS)}@fe-school-cluster.bnhye.mongodb.net/school`),
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    entities: [User_entity_1.User, Task_entity_1.Task, Comment_entity_1.Comment],
    retryWrites: true,
    family: 4,
    useUnifiedTopology: true,
    w: 'majority',
});
orm.initialize()
    .then(() => {
    console.log('db initialized');
});
exports.default = orm;
