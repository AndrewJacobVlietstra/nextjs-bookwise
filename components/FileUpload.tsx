"use client";

import config from "@/lib/config";
import Image from "next/image";
import { toast } from "sonner";
import { toastVariants } from "@/lib/constants";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import { useRef, useState } from "react";
import { capitalizeString } from "@/lib/utils";

type FileUploadProps = {
	type: "image" | "video";
	accept: string;
	placeholder: string;
	folder: string;
	variant?: "light" | "dark";
	onFileChange: (filePath: string) => void;
};

const {
	env: {
		imageKit: { publicKey, urlEndpoint },
	},
} = config;

const authenticator = async () => {
	try {
		const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

		if (!response.ok) {
			const errorText = await response.text();

			throw new Error(
				`Request failed with status ${response.status}: ${errorText}`
			);
		}

		const data = await response.json();
		const { signature, expire, token } = data;
		return { signature, expire, token };
	} catch (error: any) {
		throw new Error(`Authentication request failed: ${error.message}`);
	}
};

export default function FileUpload({
	type,
	accept,
	placeholder,
	folder,
	variant = "light",
	onFileChange,
}: FileUploadProps) {
	const IKUploadRef = useRef<HTMLInputElement | null>(null);
	const [file, setFile] = useState<{ filePath: string } | null>(null);
	const [progress, setProgress] = useState(0);

	const isDarkVariant = variant === "dark";

	const styles = {
		button: isDarkVariant
			? "bg-dark-300"
			: "bg-light-600 border-gray-100 border",
		placeholder: isDarkVariant ? "text-light-100" : "text-slate-500",
		text: isDarkVariant ? "text-light-100" : "text-dark-400",
	};

	const onError = (error: any) => {
		console.log(error);

		toast.error(`${capitalizeString(type)} Upload Failed`, {
			description: `Your ${type} could not be uploaded. Please try again.`,
			style: toastVariants.destructive,
			duration: 6000,
		});
	};

	const onSuccess = (res: any) => {
		console.log(res);
		setFile(res);
		onFileChange(res.filePath);

		toast.success(`${capitalizeString(type)} Uploaded Successfully`, {
			description: `${res.filePath} uploaded successfully!`,
			style: toastVariants.default,
			duration: 5000,
		});
	};

	const onValidate = (file: File) => {
		if (type === "image" && file.size > 20 * 1024 * 1024) {
			toast.warning(`File size exceeds 20MB.`, {
				description: `Please try uploading a smaller file.`,
				style: toastVariants.warning,
				duration: 5000,
			});

			return false;
		}

		if (type === "video" && file.size > 50 * 1024 * 1024) {
			toast.warning(`File size exceeds 50MB.`, {
				description: `Please try uploading a smaller file.`,
				style: toastVariants.warning,
				duration: 5000,
			});

			return false;
		}
	};

	return (
		<ImageKitProvider
			authenticator={authenticator}
			publicKey={publicKey}
			urlEndpoint={urlEndpoint}
		>
			<IKUpload
				className="hidden"
				ref={IKUploadRef}
				onError={onError}
				onSuccess={onSuccess}
				fileName="test-upload.png"
			/>

			<button
				className="upload-btn"
				type="button"
				onClick={(e) => {
					e.preventDefault();
					if (IKUploadRef.current) {
						IKUploadRef.current.click();
					}
				}}
			>
				<Image
					alt="upload-icon"
					className="object-contain"
					src="/icons/upload.svg"
					width={20}
					height={20}
				/>

				<p className="text-base text-light-100">Upload a File</p>

				{file && <p className="upload-filename">{file.filePath}</p>}
			</button>

			{file && (
				<IKImage
					alt={file.filePath}
					path={file.filePath}
					width={500}
					height={300}
				/>
			)}
		</ImageKitProvider>
	);
}
