module.exports = {
  server: {
    port: Number(process.env.SERVER_PORT) || 5001,
  },
  mongodb: {
    host: process.env.MONGOHOST || 'localhost',
    port: Number(process.env.MONGOPORT) || 27017,
    users: {
      db: process.env.DATABASE || 'users',
      col: process.env.COLLECTION || 'users',
    },
  },
};
