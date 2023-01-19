import { useContext, useEffect } from "react";
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

  let currentNode = getNode(row, col, allNodes);

  useEffect(() => {
    currentNode = getNode(row, col, allNodes);
  }, [allNodes]);

  const handleAddWall = () => {
    const newNodes = { ...allNodes };
    getNode(row, col, newNodes).isWall = !getNode(row, col, newNodes).isWall;
    setAllNodes(newNodes);
  };

  return (
    <div
      id={`node-${row}-${col}`}
      style={
        currentNode && {
          backgroundColor: `rgba(255, 167, 38, ${currentNode.weight / 10})`,
        }
      }
      className={`
      ${currentNode && currentNode.isWall && "wall"} 
      ${isStart && "start"} 
      ${isTarget && "target"} 
      ${currentNode && currentNode.visited && "visited"}
      ${currentNode && currentNode.isCurrent && "current"}
      ${currentNode && currentNode.isInShortestPath && "shortest-path"}
      w-[20px] h-[20px]`}
      onClick={handleAddWall}
    ></div>
  );
};
