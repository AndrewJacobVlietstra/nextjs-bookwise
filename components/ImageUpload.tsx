"use client";

import config from "@/lib/config";
import Image from "next/image";
import { toast } from "sonner";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import { useRef, useState } from "react";

type ImageUploadProps = {
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

export default function ImageUpload({ onFileChange }: ImageUploadProps) {
	const IKUploadRef = useRef<HTMLInputElement | null>(null);
	const [file, setFile] = useState<{ filePath: string } | null>(null);

	const onError = (error: any) => {
		console.log(error);

		toast("Image Upload Failed", {
			description: "Your image could not be uploaded. Please try again.",
			style: {
				color: "#fff",
				backgroundColor: "#ff1a1a",
				border: "none",
			},
			duration: 8000,
		});
	};

	const onSuccess = (res: any) => {
		console.log(res);
		setFile(res);
		onFileChange(res.filePath);

		toast("Image Uploaded Successfully", {
			description: `${res.filePath} uploaded successfully!`,
			style: { color: "#fff", backgroundColor: "#333", border: "none" },
			duration: 8000,
		});
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
