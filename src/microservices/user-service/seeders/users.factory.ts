import { Faker } from '@faker-js/faker';
import { User } from '../entities/user.entity';

import { setSeederFactory } from 'typeorm-extension';

export const UsersFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.username = faker.internet.userName();
  user.password = faker.internet.password(); // For demo purposes, generate a random password
  user.email = faker.internet.email();
  user.contact_number = faker.phone.number('+81#######').toString();
//   /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/

  return user;
});
