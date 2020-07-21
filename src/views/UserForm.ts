import User, { UserProps } from '../models/User';
import View from './View';

export default class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:#set-age': this.onSetAgeClick,
      'click:#set-name': this.onChangeName,
      'click:#save-user': this.onSaveUser,
      'mouseenter:h1': this.onHeaderHover,
    };
  }

  onChangeName = (): void => {
    const input = this.parent.querySelector('input');

    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };

  onSaveUser = (): void => {
    this.model.save();
  };

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onHeaderHover(): void {
    console.log('i wanna see them thangssssssssssssssssss');
  }
  onButtonClick(): void {
    console.log('Hi there');
  }

  template(): string {
    return `
      <div>
      <input id = "age" placeholder=${this.model.get('name')}>
      <button id= "set-name">Update Name</button>
      <button id="set-age">Set Random Age</button>
      <button id ="save-user">Save</button>
      </div>
    `;
  }
}
