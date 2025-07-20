import { ColorResult, Sketch } from "@uiw/react-color";

type CustomColorPickerProps = {
  handleColorChange?: (color: ColorResult) => void;
  activeColor?: string;
  templateBgColor?: string;
};

const CustomColorPicker = ({
  handleColorChange,
  activeColor,
  templateBgColor,
}: CustomColorPickerProps) => {
  const currenColor = activeColor !== "FFFFFFF" ? activeColor : templateBgColor;

  return (
    <Sketch
      className="ml-0"
      color={currenColor}
      onChange={(color: ColorResult) => {
        handleColorChange?.(color);
      }}
    />
  );
};

export default CustomColorPicker;
