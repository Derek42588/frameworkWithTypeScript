import View from './View';
import User, { UserProps } from '../models/User';
import UserShow from './UserShow';
import UserForm from './UserForm';

export default class UserEdit extends View<User, UserProps> {
  regionsMap(): { [key: string]: string } {
    return {
      userShow: '#user-show',
      userForm: '#user-form',
    };
  }
  onRender(): void {
    new UserForm(this.regions.userForm, this.model).render();

    new UserShow(this.regions.userShow, this.model).render();
  }
  template(): string {
    return `
      <div>
      <div id = "user-show"></div>
      <div id ="user-form"></div
      </div>
    `;
  }
}
