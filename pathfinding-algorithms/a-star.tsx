import { adjacentDirections } from "../constants/constants";
import { AllNodes, GridNode } from "../types/types";
import {
  getNode,
  isInbounds,
} from "../utils/utility-functions/utility-functions";

const heuristic = (node0: GridNode, node1: GridNode): number => {
  const d1 = Math.abs(node1.row - node0.row);
  const d2 = Math.abs(node1.col - node0.col);

  return d1 + d2;
};

export const aStar = (
  numRows: number,
  numCols: number,
  startNode: GridNode,
  targetNode: GridNode,
  allNodes: AllNodes
): GridNode[] => {
  const openSet: GridNode[] = [startNode];
  const exploredNodes: GridNode[] = [];
  const { row: targetRow, col: targetCol } = targetNode;

  while (openSet.length) {
    let lowestIndex = 0;

    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].aStarDistance < openSet[lowestIndex].aStarDistance) {
        lowestIndex = i;
      }
    }

    let currentNode = openSet[lowestIndex];

    const { row, col, distance: currentDistance } = currentNode;

    openSet.splice(lowestIndex, 1);
    exploredNodes.push(currentNode);

    if (row === targetRow && col === targetCol) {
      console.log("target found");
      return exploredNodes;
    }

    for (const [changeRow, changeCol] of adjacentDirections) {
      const newRow = row + changeRow;
      const newCol = col + changeCol;

      if (!isInbounds(newRow, newCol, numRows, numCols)) continue;

      const neighbor = getNode(newRow, newCol, allNodes);
      if (exploredNodes.includes(neighbor)) continue;
      if (!neighbor || neighbor.isWall) continue;

      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      } else if (currentDistance + neighbor.weight >= neighbor.distance) {
        continue;
      }

      neighbor.distance = currentDistance + neighbor.weight;
      neighbor.heuristic = heuristic(neighbor, targetNode);
      neighbor.aStarDistance = neighbor.distance + neighbor.heuristic;
      neighbor.prevNode = currentNode;
    }
  }
  console.log("target not found");
  return [];
};
