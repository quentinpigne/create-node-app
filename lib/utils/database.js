const DatabaseDriver = {
  postgres: ['pg', 'pg-hstore'],
  mysql: ['mysql2'],
  mariadb: ['mariadb'],
  sqlite: ['sqlite3'],
  mssql: ['tedious'],
};

const DatabaseDialect = {
  postgres: 'postgres',
  mysql: 'mysql',
  mariadb: 'mysql',
  sqlite: 'sqlite',
  mssql: 'mssql',
};

module.exports = {
  DatabaseDriver,
  DatabaseDialect,
};
