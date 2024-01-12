import React from "react";

interface ColorContextValue {
  color: string;
  setColor: (color: string) => void;
  point: number;
  setPoint: (p: number) => void;
}

const ColorContext = React.createContext<ColorContextValue>({
  color: "",
  setColor: (color) => {},
  point: 0,
  setPoint: (p) => {},
});

export { ColorContext };
