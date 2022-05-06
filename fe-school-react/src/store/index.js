import { makeAutoObservable, onBecomeObserved } from "mobx";
import { getEvents,addEvent, editEvent, deleteEvent, deleteAllArchiveEvents } from "../api";
import moment from "moment";
class EventsStore {
  data = [];
  filteredData = [];
  card;

  constructor() {
    makeAutoObservable(this, {}, {
      autoBind: true,
    });

    onBecomeObserved(this, 'data', this.fetch);
  }

  get archiveData() {
    return this.data.filter(event => event.archive);
  }

  get notArchiveData() {
    return this.data.filter(event => !event.archive);
  }

  get pastData() {
    return this.data.filter(event => moment(event.date).isBefore(moment(), 'day') && !event.archive);
  }

  get todayData() {
    return this.data.filter(event => moment(event.date).isSame(moment(), 'day') && !event.archive);
  }

  get futureData() {
    return this.data.filter(event => moment(event.date).isAfter(moment(), 'day') && !event.archive);
  }

  get favoriteData() {
    return this.data.filter(event => event.favorite);
  }

  get newestData() {
    return this.filteredData
    .slice()
    .sort((a, b) => moment().diff(a.date, "minutes") - moment().diff(b.date, "minutes"));
  }

  get oldestData() {
    return this.filteredData
    .slice()
    .sort((a, b) => moment().diff(b.date, "minutes") - moment().diff(a.date, "minutes"));
  }

  *fetch() {
    const response = yield getEvents();
    this.data = [...response];
    this.filteredData = response.filter(event => !event.archive && !event.archive);
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
