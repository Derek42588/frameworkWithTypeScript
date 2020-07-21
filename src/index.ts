import UserFrom from './views/UserForm';
import User, { UserProps } from './models/User';
import UserList from './views/UserList';
import Collection from './models/Collection';

const userCollection = new Collection(
  'http://localhost:3000/users',
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

console.log(userCollection);

userCollection.on('change', () => {
  const root = document.getElementById('root');
  if (root) {
    new UserList(root, userCollection).render();
  }
});

userCollection.fetch();
