const { usersRepository } = require('../../repositories');

module.exports.create = (params) => usersRepository.create(params);
