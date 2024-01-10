import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputAdornment,
  InputBaseClasses,
  InputLabel,
  Link,
  List,
  Menu,
  MenuItem,
  OutlinedInput,
  OutlinedInputClasses,
  Typography,
} from "@mui/material";
import ColorImage from "../assets/images/colour.png";
import LogoImage from "../assets/images/screenshot.png";
import { ColorContext } from "../extras/ColorContext";
import MenuIcon from "@mui/icons-material/Menu";
import SingleColor from "./SingleColor";

const Wrapper = `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0px;
  height: 50px;
  z-index: 10;
  padding: 0em;
  border-radius: 0px;
  border: 1px solid lightgray;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  background-color: white;
  /* align-items: center;
  justify-content: space-between; */
`;

const hexColors: string[] = [
  "#E91E63", // Pink
  "#9C27B0", // Purple
  "#673AB7", // Deep Purple
  "#3F51B5", // Indigo
  "#2196F3", // Blue
  "#03A9F4", // Light Blue
  "#00BCD4", // Cyan
  "#009688", // Teal
  "#4CAF50", // Green
  "#8BC34A", // Light Green
  "#CDDC39", // Lime
  "#FFEB3B", // Yellow
  "#FFC107", // Amber
  "#FF9800", // Orange
  "#FF5722", // Deep Orange
  "#795548", // Brown
  "#9E9E9E", // Grey
  "#607D8B", // Blue Grey
  "#F44336", // Red
  "#E53935", // Red
];

function UpMenu(props: any) {
  const headerRef = useRef<any>(null);
  const [headingColor, setHeadingColor] = useState("");
  const [deleted, setDeleted] = useState(false);
  const { color, setColor } = useContext(ColorContext);
  const [open, setOpen] = useState(false);
  const [persistedNotes, setPersistedNotes] = useState<{ [key: string]: any }>(
    []
  );

  function copyColor(value: any): any {
    navigator.clipboard
      .writeText(JSON.stringify(value))
      .then(() => {
        alert("Color Code Copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  }

  function deleteColor(): void {
    console.log("deleteColor triggered in [UpMenu]");
    setDeleted(!deleted);
  }

  function fetchPersistedNotes(): { [key: string]: any } {
    const allValues: { [key: string]: any } = {};
    for (const key of Object.keys(localStorage)) {
      const value = localStorage.getItem(key);
      const parsedValue = JSON.parse(value!) || value;
      allValues[key] = parsedValue;
    }
    return allValues;
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const header = headerRef.current;
      if (scrollPosition >= window.innerHeight / 3) {
        header.classList.add("fixed", "top-0", "z-50", "bg-white");
        header.classList.remove(
          "bg-gradient-to-r",
          "from-yellow-200",
          "via-gray-100",
          "to-yellow-200"
        );
      }
      if (scrollPosition === 0) {
        header.classList.remove("fixed", "top-0");
        header.classList.add(
          "bg-gradient-to-r",
          "from-yellow-200",
          "via-gray-100",
          "to-yellow-200"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const id = updateColor();
    const storedColors = fetchPersistedNotes();
    setPersistedNotes(storedColors);
    return () => clearInterval(id);
  }, [deleted]);

  const toggleDrawer =
    (anchor: any, status: boolean) =>
    (event: { type: string; key: string }) => {
      if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpen(false);
    };

  const drawerItemList = (anchor: string) => (
    <Box>
      <Box>
        <div className="m-5 p-2 flex items-center flex-col border-2 border-gray-500">
          <h1 className=" text-bold text-xl font-extrabold">
            Your Saved Colors
          </h1>
          <h4>Click on color tile to copy or delete it</h4>
        </div>
        <br />
        {Object.entries(persistedNotes)
          .sort()
          .map(([key, value]) => (
            <SingleColor
              key={key}
              id={key}
              color={value["hex"]}
              colorValue={value}
              deleteColor={deleteColor}
            />
          ))}
      </Box>
    </Box>
  );

  const drawer = (
    <React.Fragment>
      <Drawer
        variant="temporary"
        anchor={"left"}
        color="black"
        open={open}
        onClose={toggleDrawer("left", false)}
        PaperProps={{
          sx: {
            backgroundColor: "#f4f5f8",
            width: 320,
          },
        }}
      >
        {drawerItemList("left")}
      </Drawer>
    </React.Fragment>
  );

  function updateColor(): NodeJS.Timer {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * hexColors.length);
      const randomColor = hexColors[randomIndex];
      setHeadingColor(randomColor);
      setColor(randomColor);
    }, 1000);
    return intervalId;
  }

  return (
    <div>
      <div
        ref={headerRef}
        className="w-full flex items-center justify-between shadow-md bg-gradient-to-r from-yellow-200 via-gray-100 to-yellow-200"
      >
        <div>
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon className="ml-2 md:ml-6" fontSize="large" />
          </IconButton>
        </div>

        <div className="flex items-center justify-center">
          <img alt="" src={LogoImage} className="w-10 h-10 md:w-14 md:h-14" />
          <h1
            //style={{ color: headingColor }}
            className="p-5 text-center text-blue-600 font-bold text-xl sm:text-4xl"
          >
            Siteshot
          </h1>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default UpMenu;
