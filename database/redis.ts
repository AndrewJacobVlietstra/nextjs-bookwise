import config from "@/lib/config";
import { Redis } from "@upstash/redis";

const {
	env: {
		upstash: { redisToken, redisUrl },
	},
} = config;

const redis = new Redis({
	url: redisUrl,
	token: redisToken,
});

export default redis;
