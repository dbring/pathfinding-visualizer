import { PASSAGE, WALL } from "../constants/constants";
import { getStringRowAndCol } from "../pathfinding-algorithms/dijkstra";
import { AllNodes, Node } from "../types/types";

export const generateRandomMaze = (
  numRows: number,
  numCols: number,
  startNode: Node,
  targetNode: Node,
  allNodes: AllNodes
): AllNodes => {
  const copyOfAllNodes = { ...allNodes };
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const node = copyOfAllNodes[getStringRowAndCol(row, col)];
      if (node === startNode || node === targetNode) continue;
      node.isWall = Math.random() < 0.25 ? WALL : PASSAGE;
    }
  }

  return copyOfAllNodes;
};
