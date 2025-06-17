import Redis from "ioredis";

// If running inside Docker Compose, use the service name as host
const redis = new Redis({
  host: "redis", // service name from docker-compose.yml - change if localhost when not using Docker
  // If running locally without Docker, you can use 'localhost' or '127.0.0.1'
  port: 6379,
});

// Example usage
// await redis.set("key", "value");
// const value = await redis.get("key");
export default redis;
