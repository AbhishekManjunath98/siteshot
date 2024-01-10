import { Button, Typography } from "@mui/material";
import ColorImage from "../assets/images/colour.png";
import { PickerCardProps } from "../extras/types";

function PickerCard(props: PickerCardProps) {

   function openLink(): void {
     window.open("https://en.wikipedia.org/wiki/Web_colors", "_blank");
   }
  function openPicker(): void {
    props.openClick(props.heading.slice(0, props.heading.indexOf(" ")));
  }

  function knowMore(): void {
    props.knowClick();
    openLink();
  }

  return (
    <div
      style={{ borderBlockColor: props.borderColor }}
      className="m-3 p-5 w-80 h-40px border-2 shadow-2x flex flex-col items-center justify-between"
    >
      <img alt="" src={ColorImage} className="w-12 h-12" />
      <h1 className="font-bold text-xl mt-2 mb-2">{props.heading}</h1>
      <h5 className="text-sm text-center">
        {props.heading} is used mainly for finetuning color picking
      </h5>
      <Button
        onClick={openPicker}
        sx={{ marginTop: "15px", marginBottom: "15px" }}
        variant="contained"
      >
        Open Picker
      </Button>
      <Button onClick={knowMore} variant="outlined">
        Know More
      </Button>
    </div>
  );
}

export default PickerCard;
