import { useContext, useEffect, useState } from "react";
import { CELL_SIZE } from "../constants/constants";
import { GlobalContext } from "../context/global.context";

// NEED TO MAKE DIV W AND H DYNAMIC BASED ON CELL SIZE

type NodeProps = {
  row: number;
  col: number;
  isStart: boolean;
  isTarget: boolean;
};

export const Node = ({ row, col, isStart, isTarget }: NodeProps) => {
  const { allNodes, setAllNodes } = useContext(GlobalContext);

  const currentNode = allNodes[`${row},${col}`];

  const handleAddWall = () => {
    const newNodes = { ...allNodes };
    newNodes[`${row},${col}`].isWall = !newNodes[`${row},${col}`].isWall;
    setAllNodes(newNodes);
  };

  return (
    <div
      id={`node-${row}-${col}`}
      className={`${currentNode && currentNode.isWall && "wall"} ${
        isStart && "start"
      } ${isTarget && "target"} ${
        currentNode && currentNode.visited && "visited"
      }
      ${currentNode && currentNode.isCurrent && "current"}
      w-[25px] h-[25px]`}
      onClick={handleAddWall}
    ></div>
  );
};
