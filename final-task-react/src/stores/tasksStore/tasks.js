import { makeAutoObservable } from "mobx";
import { getTasks } from '../../api';

class TasksStore {
  tenTasks = [];

  constructor() {
    makeAutoObservable(this, {}, {
      autoBind: true,
    });
  }

  async getTasks(filter, page, limit) {
    const response = await getTasks(filter, page, limit);
    this.tenTasks = [ ...response.data ];
  }
}

export const tasks = new TasksStore();