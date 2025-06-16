"use client";

import { IKVideo, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";

type BookVideoProps = {
	videoUrl: string;
};

export default function BookVideo({ videoUrl }: BookVideoProps) {
	return (
		<ImageKitProvider
			publicKey={config.env.imageKit.publicKey}
			urlEndpoint={config.env.imageKit.urlEndpoint}
		>
			<IKVideo className="w-full rounded-xl" controls={true} path={videoUrl} />
		</ImageKitProvider>
	);
}
