"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
exports.typeOrmConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'myskillsdb',
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map