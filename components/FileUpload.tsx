"use client";

import config from "@/lib/config";
import Image from "next/image";
import { toast } from "sonner";
import { toastVariants } from "@/lib/constants";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import { useRef, useState } from "react";
import { capitalizeString, cn } from "@/lib/utils";

type FileUploadProps = {
	type: "image" | "video";
	accept: string;
	placeholder: string;
	folder: string;
	variant?: "light" | "dark";
	value?: string;
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
	value,
	onFileChange,
}: FileUploadProps) {
	const IKUploadRef = useRef<HTMLInputElement | null>(null);
	const [file, setFile] = useState<{ filePath: string | null }>({
		filePath: value ?? null,
	});
	const [progress, setProgress] = useState(0);

	const isDarkVariant = variant === "dark";

	const styles = {
		button: isDarkVariant
			? "bg-dark-300 hover:bg-dark-600/80"
			: "bg-light-600/90 hover:bg-light-600 border-gray-100 border",
		placeholder: isDarkVariant ? "text-light-100" : "text-slate-600",
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

		return true;
	};

	return (
		<ImageKitProvider
			authenticator={authenticator}
			publicKey={publicKey}
			urlEndpoint={urlEndpoint}
		>
			<IKUpload
				accept={accept}
				folder={folder}
				ref={IKUploadRef}
				onError={onError}
				onSuccess={onSuccess}
				onUploadStart={() => setProgress(0)}
				onUploadProgress={({ loaded, total }) => {
					const percent = Math.round((loaded / total) * 100);
					setProgress(percent);
				}}
				validateFile={onValidate}
				useUniqueFileName={true}
				className="hidden"
			/>

			<button
				className={cn("upload-btn p-4", styles.button)}
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
				<p className={cn("text-base", styles.placeholder)}>{placeholder}</p>

				{file && (
					<p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
				)}

				{progress > 0 && progress !== 100 && (
					<div className="w-full rounded-full bg-green-200">
						<div
							className="progress transition-all"
							style={{ width: `${progress}%` }}
						>
							{progress}%
						</div>
					</div>
				)}
			</button>

			{file.filePath &&
				(type === "image" ? (
					<IKImage
						alt={file.filePath}
						path={file.filePath}
						width={500}
						height={300}
					/>
				) : type === "video" ? (
					<IKVideo
						controls={true}
						className="h-96 w-full rounded-xl"
						path={file.filePath}
					/>
				) : null)}
		</ImageKitProvider>
	);
}
