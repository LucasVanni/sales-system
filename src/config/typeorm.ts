import 'dotenv/config';

import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const postgresConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: ['src/migration/*{.ts,.js}'],
  cli: { migrationsDir: 'src/migration' },
  synchronize: false,
};

export default registerAs('typeorm', () => postgresConfig);
export const connectionSource = new DataSource({
  ...postgresConfig,
} as DataSourceOptions);
