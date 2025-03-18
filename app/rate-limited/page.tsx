import RateLimitedTimer from "@/components/RateLimitedTimer";

export default function RateLimitedPage() {
	return (
		<main className="root-container flex flex-col items-center justify-center gap-y-6">
			<h1 className="font-bebas-neue max-w-xl text-5xl text-center  text-light-100">
				You are rate limited. Please wait a short while then try again.
			</h1>

			<p className=" max-w-md text-xl text-center text-light-400">
				We've put a temporary pause on your requests. Chill for a bit and you
				will be redirected shortly.
			</p>

			<RateLimitedTimer />
		</main>
	);
}
