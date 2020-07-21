import View from './View';
import User, { UserProps } from '../models/User';

export default class UserShow extends View<User, UserProps> {
  template(): string {
    return `
    <div>
    <h1> User Detail</h1>
    <div>
    User Name: ${this.model.get('name')}
    User Age: ${this.model.get('age')}
    </div>
    </div>
    `;
  }
}
