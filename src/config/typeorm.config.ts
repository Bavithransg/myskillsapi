import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  username: '',
  password: '',
  database: 'myskillsdb',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
};
