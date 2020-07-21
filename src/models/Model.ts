import { AxiosPromise, AxiosResponse } from 'axios';
import HasAnId from '../interfaces/HasAnId';

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

export class Model<T extends HasAnId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  private checkForId(): number {
    const id = this.attributes.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    return id;
  }

  // get on() {
  //   return this.events.on;
  // }
  // get trigger() {
  //   return this.events.trigger;
  // }
  // get get() {
  //   return this.attributes.get;
  // }

  //alternate syntax:

  on = this.events.on;
  get = this.attributes.get;
  trigger = this.events.trigger;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.checkForId();

    this.sync.fetch(id).then((res: AxiosResponse): void => {
      const { data } = res;
      this.set(data);

      // using this.set instead of this.attributes.set because we want to be sure we trigger the change
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((res: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
