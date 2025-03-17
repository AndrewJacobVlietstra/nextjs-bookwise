export default function RateLimitedPage() {
	return (
		<main className="root-container flex flex-col h-[75vh] items-center justify-center">
			<h1 className="font-bebas-neue max-w-2xl text-5xl text-center font-semibold text-light-100">
				You are rate limited. Please wait a short while then try again.
			</h1>

			<p className="mt-5 max-w-xl text-xl text-center text-light-400">
				Looks like you're a little too eager. We've put a temporary pause on
				your requests. Chill for a bit then try again shortly.
			</p>
		</main>
	);
}
