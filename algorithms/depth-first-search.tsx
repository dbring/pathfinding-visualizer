import { adjacentDirections } from "../constants/constants";
import { AllNodes, Node } from "../types/types";
import { getStringRowAndCol, isInbounds } from "./dijkstra";

export const depthFirstSearch = (
  numRows: number,
  numCols: number,
  startNode: Node,
  targetNode: Node,
  allNodes: AllNodes
) => {
  const stack = [startNode];
  const exploredNodes: Node[] = [];
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

      const neighbor = allNodes[getStringRowAndCol(newRow, newCol)];

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
