const mongoose = require('mongoose');
const faker = require('faker');

const { usersRepository } = require('../../repositories');

const randomMongoId = mongoose.Types.ObjectId();
const password = 'P@ssw0rd';

const sampleUsersArray = [
  {
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password,
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password,
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password,
  },
];

const createSampleUser = async () => {
  const sampleUser = {
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password,
  };

  return usersRepository.create(sampleUser);
};

const createSampleUsers = async () => {
  const promises = [];
  sampleUsersArray.forEach((user) => {
    promises.push(usersRepository.create(user));
  });

  await Promise.all(promises);
};

module.exports = {
  randomMongoId,
  sampleUsersArray,
  createSampleUser,
  createSampleUsers,
};
