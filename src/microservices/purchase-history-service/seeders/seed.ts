import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { ProductsFactory } from './product.factory';
import { Product } from '../entities/product.entity';
import { PurchaseHistory } from '../entities/PurchaseHistory.entity';

import MainSeeder from './main.seeder';

const join = require('path').join;
const path = join(
  `${process.cwd()}/.env${
    process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''
  }`,
);
require('dotenv').config({ path });

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  DB_TYPE,
} = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: (process.env.DB_TYPE as any) ?? 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.DB_PORT, 10) ?? 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Product,PurchaseHistory],
  factories: [ProductsFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
