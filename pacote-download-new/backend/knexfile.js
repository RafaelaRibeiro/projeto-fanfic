const { db } = require("./e/.env");

module.exports = {
  client: "mysql",
  connection: db,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
