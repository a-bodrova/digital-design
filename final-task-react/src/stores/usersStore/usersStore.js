import { makeAutoObservable, onBecomeObserved } from "mobx";
import { getUser, editUser, getAllUsers } from '../../api';

class UserStore {
  user = '';
  allUsers = [];

  constructor() {
    makeAutoObservable(this, {}, {
      autoBind: true,
    });

    onBecomeObserved(this, 'allUsers', this.getAllUsers);
  }

  get allUsernames() {
    return this.allUsers.map(user => user.username);
  }

  *getUser(id) {
    if (id) {
      const response = yield getUser(id);
      this.user = { ...this.user, ...response };
    }
  }

  *getAllUsers() {
    const response = yield getAllUsers();
    this.allUsers = [ ...response ];
  }

  *editUser(userInfo) {
    yield editUser(userInfo);
    yield this.getUser(this.user.id);
  }
}

export const userStore = new UserStore();