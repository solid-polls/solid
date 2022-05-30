import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import * as path from "path";

const options: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.DB_HOST ?? 'localhost',
    port: +process.env.DB_PORT ?? 5432,
    username: process.env.DB_USERNAME ?? 'solid',
    password: process.env.DB_PASSWORD ?? 'solid',
    database: process.env.DB_DATABASE ?? 'solid',
    entities: [path.join(__dirname, '..', 'models', '**', '*{.ts,.js}'),],
    migrations: [path.join(__dirname, '..', 'migrations', '**', '*{.ts,.js}'),],
    migrationsRun: true,
}
export default options;