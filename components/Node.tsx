import { useState } from "react";
import { CELL_SIZE } from "../constants/constants";

// NEED TO MAKE DIV W AND H DYNAMIC BASED ON CELL SIZE

type NodeProps = {
  row: number;
  col: number;
  isStart: boolean;
  isTarget: boolean;
};

export const Node = ({ row, col, isStart, isTarget }: NodeProps) => {
  const [isWall, setIsWall] = useState(false);

  const handleAddWall = () => {
    setIsWall(!isWall);
  };

  return (
    <div
      id={`node-${row}-${col}`}
      className={`${isWall && "wall"} ${isStart && "start"} ${
        isTarget && "target"
      } w-[25px] h-[25px]`}
      onClick={handleAddWall}
    ></div>
  );
};
