export const DatabaseDriver: Record<string, string[]> = {
  postgres: ['pg', 'pg-hstore'],
  mysql: ['mysql2'],
  mariadb: ['mariadb'],
  sqlite: ['sqlite3'],
  mssql: ['tedious'],
};

export const DatabaseDialect: Record<string, string> = {
  postgres: 'postgres',
  mysql: 'mysql',
  mariadb: 'mysql',
  sqlite: 'sqlite',
  mssql: 'mssql',
};
