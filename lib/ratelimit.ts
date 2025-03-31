import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(15, "1 m"),
	analytics: true,
	prefix: "@upstash/ratelimit",
});

export default ratelimit;
