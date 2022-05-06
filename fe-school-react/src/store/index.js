import { computed, makeAutoObservable, onBecomeObserved } from "mobx";
import { getEvents,addEvent, editEvent, deleteEvent, deleteAllArchiveEvents } from "../api";

class EventsStore {
  data = [];
  card;

  constructor() {
    makeAutoObservable(this, {}, {
      autoBind: true,
      archiveData: computed,
      notArchiveData: computed,
    });

    onBecomeObserved(this, 'data', this.fetch);
  }

  get archiveData() {
    return this.data.filter(event => event.archive);
  }

  get notArchiveData() {
    return this.data.filter(event => !event.archive);
  }

  *fetch() {
    const response = yield getEvents();
    this.data = [...response];
  }

  *addEvent(data) {
    yield addEvent(data);
    yield this.fetch();
  }

  *editEvent(data) {
    yield editEvent(data);
    yield this.fetch();
  }

  *deleteEvent(id) {
    yield deleteEvent(id);
    yield this.fetch();
  }

  *deleteAllArchiveEvents(ids) {
    yield deleteAllArchiveEvents(ids);
    yield this.fetch();
  }
}

export const events = new EventsStore();
