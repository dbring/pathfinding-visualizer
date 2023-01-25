import { AllNodes, GridNode } from "../types/types";
import { getNode } from "../utils/utility-functions/utility-functions";

export const generateRandomMaze = (
  numRows: number,
  numCols: number,
  startNode: GridNode,
  targetNode: GridNode,
  allNodes: AllNodes
): GridNode[] => {
  const mazeWalls: GridNode[] = [];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const node = getNode(row, col, allNodes);

      if (row === startNode.row && col === startNode.col) continue;
      if (row === targetNode.row && col === targetNode.col) continue;

      if (Math.random() < 0.25) mazeWalls.push(node);
    }
  }

  return mazeWalls;
};
