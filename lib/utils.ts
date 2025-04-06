import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const capitalizeString = (str: string) => {
	return str[0].toUpperCase() + str.slice(1);
};

export const getInitials = (name: string) => {
	return name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
};

export const sleep = async (delay = 1000) => {
	await new Promise((resolve) => setTimeout(resolve, delay));
};

export const handleActionError = (error: ActionError) => {
	// If error exists toast error message, else do nothing
	if (error) {
		toast.warning(error.message);
		return;
	}
};
