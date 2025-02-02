/* 
  Update with your config settings.
  The test database and development database are by default the same.
  Knex also allows for easy switching between databases. 
  But the .returning() method will only work for PostgreSQL, MSSQL, and Oracle databases.
*/
require("dotenv").config();
module.exports = {
  test: {
    client: "sqlite3",
    connection: {
      filename: "./test.sqlite3",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
