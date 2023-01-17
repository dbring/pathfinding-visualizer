import { PASSAGE, WALL } from "../constants/constants";
import { getStringRowAndCol } from "../pathfinding-algorithms/dijkstra";
import { AllNodes, Node } from "../types/types";

export const generateRandomMaze = (
  numRows: number,
  numCols: number,
  startNode: Node,
  targetNode: Node,
  allNodes: AllNodes
): Node[] => {
  const mazeWalls: Node[] = [];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const node = allNodes[getStringRowAndCol(row, col)];

      if (row === startNode.row && col === startNode.col) continue;
      if (row === targetNode.row && col === targetNode.col) continue;

      if (Math.random() < 0.25) mazeWalls.push(node);
    }
  }

  return mazeWalls;
};
