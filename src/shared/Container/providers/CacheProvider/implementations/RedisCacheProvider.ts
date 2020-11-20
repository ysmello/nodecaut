import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvder from '../models/ICacheProvider';

export default class RedisCacheProvder implements ICacheProvder {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedDate = JSON.parse(data) as T;

    return parsedDate;
  }

  public async invalidate(key: string): Promise<void> {}
}
