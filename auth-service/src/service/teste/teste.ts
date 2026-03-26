import { redis } from "../../infra/redis/redisClient.js";

async function testRedis() {
  console.log("Testando Redis...");

  await redis.set("name", "Wagner");
  await redis.set("teste", "Railan");


  console.log('redis salvo')

  await redis.quit();
}

redis.geoadd
testRedis();