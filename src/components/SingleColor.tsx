import { IconButton, Menu, MenuItem } from "@mui/material";
import { SingleColorProps } from "../extras/types";
import React, { useState } from "react";

function SingleColor(props: SingleColorProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  function copyColor(): any {
    handleClose();
    navigator.clipboard
      .writeText(JSON.stringify(props.colorValue))
      .then(() => {
        alert("Color Code Copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  }

  function deleteColor(): void {
    console.log(props.id + " is requested to be deleted!!");
    props.deleteColor(props.id);
    localStorage.removeItem(props.id);
  }

  const ActionsMenu = (
    <React.Fragment>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "actions-menu",
        }}
      >
        <MenuItem onClick={copyColor}>Copy Color</MenuItem>
        <MenuItem onClick={deleteColor}>Delete Color</MenuItem>
      </Menu>
    </React.Fragment>
  );

  return (
    <div>
      {ActionsMenu}
      <div
        onClick={(e) => setAnchorEl(e.currentTarget)}
        key={props.id}
        style={{ backgroundColor: props.color }}
        className="h-16 m-5 hover:animate-pulse hover:cursor-pointer border-1 border-white bg-green-500 shadow-md"
      />
    </div>
  );
}

export default SingleColor;
