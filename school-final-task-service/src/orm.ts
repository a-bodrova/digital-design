import { DataSource } from 'typeorm';
import { User } from './Entities/User.entity';
import { Task } from './Entities/Task.entity';
import { Comment } from './Entities/Comment.entity';

const orm = new DataSource({  // нужно поднять mongoDB и подключить ее здесь (в строке 'url') .Дальше она сама настроится
    type: 'mongodb',
    url: encodeURI(`mongodb+srv://${encodeURIComponent((process.env as any).MONGOUSR)}:${encodeURIComponent((process.env as any).MONGOPASS)}@fe-school-cluster.bnhye.mongodb.net/school`),
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    entities: [User, Task, Comment],
    retryWrites: true,
    family: 4,
    useUnifiedTopology: true,
    w: 'majority',
});

orm.initialize()
    .then(() => {
        console.log('db initialized')
    });

export default orm;