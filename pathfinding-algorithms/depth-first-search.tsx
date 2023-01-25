import { adjacentDirections } from "../constants/constants";
import { AllNodes, GridNode } from "../types/types";
import {
  getNode,
  isInbounds,
} from "../utils/utility-functions/utility-functions";

export const depthFirstSearch = (
  numRows: number,
  numCols: number,
  startNode: GridNode,
  targetNode: GridNode,
  allNodes: AllNodes
) => {
  const stack = [startNode];
  const exploredNodes: GridNode[] = [];
  const { row: targetRow, col: targetCol } = targetNode;

  while (stack.length) {
    const currentNode = stack.pop();

    if (!currentNode) continue;

    const { row, col } = currentNode;

    if (row === targetRow && col === targetCol) {
      console.log("target found");
      return exploredNodes;
    }

    for (const [changeRow, changeCol] of adjacentDirections) {
      const newRow = row + changeRow;
      const newCol = col + changeCol;

      if (!isInbounds(newRow, newCol, numRows, numCols)) continue;

      const neighbor = getNode(newRow, newCol, allNodes);

      if (!neighbor || neighbor.isWall || neighbor.visiting) continue;

      neighbor.prevNode = currentNode;
      neighbor.visiting = true;

      exploredNodes.push(neighbor);
      stack.push(neighbor);
    }
  }

  console.log("target not found");
  return exploredNodes;
};
