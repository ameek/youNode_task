import { DataSourceOptions, DataSource } from 'typeorm';
const join = require('path').join;
const path = join(
  `${process.cwd()}/.env${
    process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''
  }`,
);
require('dotenv').config({ path });
console.log('type',process.env.DB_TYPE)

export const dataSourceOptions: DataSourceOptions = {
  type: (process.env.DB_TYPE as any) ?? 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.DB_PORT, 10) ?? 3306,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['../dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
  subscribers: ['dist/**/*.subscriber{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;