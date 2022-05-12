import { makeAutoObservable } from "mobx";
import { getUser, editUser } from '../../api';

class UserStore {
  user = '';

  constructor() {
    makeAutoObservable(this, {}, {
      autoBind: true,
    });
  }

  *getUser(id) {
    if (id) {
      const response = yield getUser(id);
      this.user = { ...this.user, ...response };
    }
  }

  *editUser(userInfo) {
    yield editUser(userInfo);
    yield this.getUser(this.user.id);
  }
}

export const userStore = new UserStore();