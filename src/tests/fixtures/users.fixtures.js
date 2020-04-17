const mongoose = require('mongoose');
const faker = require('faker');

const { usersRepository } = require('../../repositories');

const randomMongoId = mongoose.Types.ObjectId();
const password = 'P@ssw0rd';

const sampleUsersArray = [
  {
    _id: mongoose.Types.ObjectId(),
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password,
  },
];

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
  createSampleUsers,
};
