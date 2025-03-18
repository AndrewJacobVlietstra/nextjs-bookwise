"use client";

import React from "react";
import { useTimer } from "react-timer-hook";
import { redirect } from "next/navigation";

export default function RateLimitedTimer() {
	const timerDuration = 60; // seconds

	const expiryTimestamp = new Date();
	expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timerDuration);

	const { totalSeconds } = useTimer({
		expiryTimestamp,
		onExpire: () => redirect("/signin"),
	});

	return (
		<p className="font-mono text-light-100 text-3xl mt-2 p-4 rounded-sm bg-light-100/10">
			<span>Time remaining: </span>
			<span>{totalSeconds}s</span>
		</p>
	);
}
