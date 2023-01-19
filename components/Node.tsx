import { useContext } from "react";
import { GlobalContext } from "../context/global.context";
import { getNode } from "../utils/utility-functions/utility-functions";

type NodeProps = {
  row: number;
  col: number;
  isStart: boolean;
  isTarget: boolean;
};

export const Node = ({ row, col, isStart, isTarget }: NodeProps) => {
  const { allNodes, setAllNodes } = useContext(GlobalContext);

  const currentNode = getNode(row, col, allNodes);

  const handleAddWall = () => {
    const newNodes = { ...allNodes };
    getNode(row, col, newNodes).isWall = !getNode(row, col, newNodes).isWall;
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
