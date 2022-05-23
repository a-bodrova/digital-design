import { makeAutoObservable, onBecomeObserved } from "mobx";
import { getTasks } from '../../api';

class TasksStore {
  tenTasks = [];

  constructor() {
    makeAutoObservable(this, {}, {
      autoBind: true,
    });

    onBecomeObserved(this, 'tenTasks', this.getTasks);
  }

  async getTasks(filter, page, limit) {
    const response = await getTasks(filter, page, limit);
    this.tenTasks = [ ...response.data ];
  }
}

export const tasks = new TasksStore();