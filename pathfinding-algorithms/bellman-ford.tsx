import { adjacentDirections } from "../constants/constants";
import { AllNodes, GridNode } from "../types/types";
import {
  getNode,
  isInbounds,
} from "../utils/utility-functions/utility-functions";

export const bellmanFord = (
  numRows: number,
  numCols: number,
  startNode: GridNode,
  targetNode: GridNode,
  allNodes: AllNodes,
  numberOfStops: number
): GridNode[] => {
  let distances: number[][] = new Array(numRows)
    .fill(Infinity)
    .map((e) => new Array(numCols).fill(Infinity));
  const exploredNodes: GridNode[] = [];

  const { row: startRow, col: startCol } = startNode;
  distances[startRow][startCol] = 0;

  for (let _ = 0; _ < distances.length - 1; _++) {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const currentNode = getNode(row, col, allNodes);

        if (currentNode.isWall) continue;

        if (!exploredNodes.includes(currentNode)) {
          exploredNodes.push(currentNode);
        }

        for (const [changeRow, changeCol] of adjacentDirections) {
          const newRow = row + changeRow;
          const newCol = col + changeCol;

          if (!isInbounds(newRow, newCol, numRows, numCols)) continue;

          const neighbor = getNode(newRow, newCol, allNodes);
          const alt = distances[row][col] + neighbor.weight;

          if (alt < distances[newRow][newCol]) {
            distances[newRow][newCol] = alt;

            if (neighbor.isWall) continue;

            neighbor.prevNode = currentNode;

            if (!exploredNodes.includes(neighbor)) {
              exploredNodes.push(neighbor);
            }
          }
        }
      }
    }
  }

  console.log("bellman-ford algorithm finished running");
  return exploredNodes;
};
