import Eventing from './Eventing';
import axios, { AxiosResponse } from 'axios';

export default class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      console.log('isnide the then');
      const { data } = response;
      data.forEach((value: K): void => {
        const model = this.deserialize(value);
        this.models.push(model);
      });

      this.trigger('change');
    });
  }
}
