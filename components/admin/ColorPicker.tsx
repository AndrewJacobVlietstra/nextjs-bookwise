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

			<div className="flex flex-row items-center mt-6">
				<div className=" p-5 mr-2" style={{ background: value }}></div>
				Current color is {"#"}
				<HexColorInput
					color={value}
					onChange={onPickerChange}
					className="hex-input"
				/>
			</div>
		</div>
	);
}
