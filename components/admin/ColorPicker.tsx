import { HexColorInput, HexColorPicker } from "react-colorful";

type ColorPickerProps = {
	value?: string;
	onPickerChange: (color: string) => void;
};

export default function ColorPicker({
	value,
	onPickerChange,
}: ColorPickerProps) {
	return (
		<div>
			<HexColorPicker color={value} onChange={onPickerChange} />

			<div className="flex flex-row items-center justify-start mt-6">
				<div
					className={`p-5 mr-2 ${value ? "visible" : "hidden"}`}
					style={{ background: value }}
				></div>
				<div>
					Current color is {"#"}
					<HexColorInput
						color={value}
						onChange={onPickerChange}
						className="hex-input max-w-16"
					/>
				</div>
			</div>
		</div>
	);
}
