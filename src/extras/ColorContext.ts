import React from "react";

interface ColorContextValue {
  color: string;
  setColor: (color: string) => void;
}

const ColorContext = React.createContext<ColorContextValue>({
  color: "",
  setColor: (color) => {},
});

export { ColorContext };
