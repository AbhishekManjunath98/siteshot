import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";

interface FaqComponentProps {
  faq: string;
  answer: string;
}

function FaqComponent(props: FaqComponentProps) {
  const [expand, setExpand] = useState(false);

  return (
    <div className="">
      <div className={`flex items-center justify-between`}>
        <h3 className={` text-blue-700`}>{props.faq}</h3>
        <IconButton onClick={() => setExpand(!expand)}>
          {expand ? (
            <RemoveIcon fontSize="large"  sx={{ color: "blue" }} />
          ) : (
            <AddIcon fontSize="large" sx={{ color: "blue" }} />
          )}
        </IconButton>
      </div>
      {
        <h3
          className={` ${
            expand ? "opacity-100 h-auto" : "opacity-0 h-0"
          } text-gray-700 text-sm transition-all duration-1000 ease-out opacity-0 h-0`}
        >
          {props.answer}
        </h3>
      }

      <div
        style={{ borderBottomWidth: "1px", borderBottomColor: "lightgray" }}
        className={`${expand ? "mt-6" : "mt-2"}`}
      />
    </div>
  );
}

export default FaqComponent;
