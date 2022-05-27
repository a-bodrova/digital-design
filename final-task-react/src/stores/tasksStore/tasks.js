import { makeAutoObservable } from "mobx";
import { getTasks, deleteTask } from '../../api';

class TasksStore {
  tenTasks = [];
  total = 0;
  page = 0;
  filter = {
    query: '',
    assignedUsers: [],
    userIds: [],
    type: [],
    status: [],
    rank: [],
  };
  limit = 10;

  constructor() {
    makeAutoObservable(this, {}, {
      autoBind: true,
    });
  }

  async getTasks(filter, page) {
    const response = page !== undefined
      ?
      await getTasks(filter || this.filter, page, this.limit)
      :
      await getTasks(filter || this.filter, this.page, this.limit);

    this.tenTasks = [ ...response.data ];
    this.total = response.total;
  }

  async deleteTask(id) {
    await deleteTask(id);
    await this.getTasks(this.filter, this.page, 10);
  }
}

export const tasks = new TasksStore();