module.exports = {
  baseUrl: 'http://localhost:3000',
  version: 'v1',
  database: {
    name: 'node-bloodboiler-development',
    host: 'localhost',
    port: '27017',
    user: '',
    password: '',
  },
  secret: '02eb33a47c6cb5e45b12107c0ef58dcd64dba680445aa19fb57b4bcbc8d145606e29ccf1b02fe2972c32b958b636bdfb',
  mailAuth: {
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'apps@ioasys.com.br',
      pass: 'ioasys715',
    },
  },

};
