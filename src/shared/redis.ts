import { createClient, SetOptions } from 'redis'
import config from '../config'

const redisClient = createClient({
  url: config.REDIS.URL,
})

const redisPubClient = createClient({
  url: config.REDIS.URL,
})

const redisSubClient = createClient({
  url: config.REDIS.URL,
})

redisClient.on('connect', () => console.log('Redis Connected'))
redisClient.on('error', err => console.log(`RedisError: ${err}`))

const set = async (
  key: string,
  value: string,
  options: SetOptions
): Promise<void> => {
  await redisClient.set(key, value, options)
}

const get = async (key: string): Promise<string | null> => {
  return await redisClient.get(key)
}

const del = async (key: string): Promise<void> => {
  await redisClient.del(key)
}

const setAccessToken = async (userId: string, value: string): Promise<void> => {
  const key = `access-token:${userId}`
  const expireTime = Number(config.REDIS.EXPIRE_IN)
  await redisClient.set(key, value, { EX: expireTime })
}

const getAccessToken = async (userId: string): Promise<string | null> => {
  const key = `access-token:${userId}`
  return await redisClient.get(key)
}

const delAccessToken = async (userId: string): Promise<void> => {
  const key = `access-token:${userId}`
  await redisClient.del(key)
}

const connect = async () => {
  await redisClient.connect()
  await redisPubClient.connect()
  await redisSubClient.connect()
}

const disconnect = async () => {
  await redisClient.quit()
  await redisPubClient.quit()
  await redisSubClient.quit()
}

export const RedisClient = {
  redisPubClient,
  redisSubClient,
  set,
  get,
  del,
  setAccessToken,
  getAccessToken,
  delAccessToken,
  connect,
  disconnect,
  publish: redisPubClient.publish.bind(redisPubClient),
  subscribe: redisPubClient.subscribe.bind(redisSubClient),
}
