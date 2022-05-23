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

  async getUser(id) {
    if (id) {
      const response = await getUser(id);
      this.user = { ...this.user, ...response };
    }
  }

  async getAllUsers() {
    const response = await getAllUsers();
    this.allUsers = [ ...response ];
  }

  async editUser(userInfo) {
    await editUser(userInfo);
    await this.getUser(this.user.id);
  }
}

export const userStore = new UserStore();