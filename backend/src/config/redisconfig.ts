import { RedisModuleOptions } from '@nestjs-modules/ioredis';

const options: RedisModuleOptions = {
  config: {
    // url: 'redis://localhost:6379',
    host: process.env.REDIS_HOST ?? 'localhost',
    port: +(process.env.REDIS_PORT ?? 6379),
    db: +(process.env.REDIS_DB ?? 0),
  },
};
export default options;
