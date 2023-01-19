import { adjacentDirections } from "../constants/constants";
import { AllNodes, Node } from "../types/types";
import {
  getNode,
  isInbounds,
} from "../utils/utility-functions/utility-functions";

export const breadthFirstSearch = (
  numRows: number,
  numCols: number,
  startNode: Node,
  targetNode: Node,
  allNodes: AllNodes
): Node[] => {
  const queue = [startNode];
  startNode.visiting = true;
  const exploredNodes: Node[] = [];

  const { row: targetRow, col: targetCol } = targetNode;

  while (queue.length) {
    const currentNode = queue.shift();

    if (!currentNode) continue;
    exploredNodes.push(currentNode);
    const { row, col, distance: currentDistance } = currentNode;

    //Process node
    if (row === targetRow && col === targetCol) {
      console.log("found target");
      return exploredNodes;
    }

    // Add neighbors
    for (const [changeRow, changeCol] of adjacentDirections) {
      const newRow = row + changeRow;
      const newCol = col + changeCol;

      const neighbor = getNode(newRow, newCol, allNodes);
      if (!neighbor) continue;

      if (!isInbounds(newRow, newCol, numRows, numCols)) continue;
      if (neighbor.isWall || neighbor.visiting) continue;

      neighbor.distance = currentDistance + 1;
      neighbor.prevNode = currentNode;
      neighbor.visiting = true;
      queue.push(neighbor);
    }
  }
  console.log("target not found");
  return exploredNodes;
};
