module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/blog.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
  // for heroku (maybe postgres instead of sqlite)
  production: {
    client: "sqlite3",
    connection: {
      filename: "./data/posts.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
  },
};
