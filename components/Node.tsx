import { useContext } from "react";
import { GlobalContext } from "../context/global.context";
import { getStringRowAndCol } from "../pathfinding-algorithms/dijkstra";

type NodeProps = {
  row: number;
  col: number;
  isStart: boolean;
  isTarget: boolean;
};

export const Node = ({ row, col, isStart, isTarget }: NodeProps) => {
  const { allNodes, setAllNodes } = useContext(GlobalContext);

  const currentNode = allNodes[getStringRowAndCol(row, col)];

  const handleAddWall = () => {
    const newNodes = { ...allNodes };
    newNodes[getStringRowAndCol(row, col)].isWall =
      !newNodes[getStringRowAndCol(row, col)].isWall;
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
      ${currentNode && currentNode.isInShortestPath && "shortest-path"}
      w-[20px] h-[20px]`}
      onClick={handleAddWall}
    ></div>
  );
};
