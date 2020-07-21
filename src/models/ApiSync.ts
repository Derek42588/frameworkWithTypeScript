import axios, { AxiosPromise } from 'axios';
import HasAnId from '../interfaces/HasAnId';

export default class ApiSync<T extends HasAnId> {
  constructor(public rootUrl: string) {}
  public save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(`${this.rootUrl}`, data);
    }
  }

  public fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }
}
