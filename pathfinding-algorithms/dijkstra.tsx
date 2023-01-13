import { adjacentDirections } from "../constants/constants";
import { AllNodes, Node } from "../types/types";

const sortHeap = (heap: Node[]) => {
  heap.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

export const isInbounds = (
  row: number,
  col: number,
  numRows: number,
  numCols: number
) => {
  const rowInbound = row >= 0 && row < numRows;
  const colInbound = col >= 0 && col < numCols;

  return rowInbound && colInbound;
};

export const getStringRowAndCol = (row: number, col: number): string =>
  `${row},${col}`;

export const dijkstra = (
  numRows: number,
  numCols: number,
  startNode: Node,
  targetNode: Node,
  allNodes: AllNodes
): Node[] => {
  const heap = [startNode];
  startNode.visiting = true;
  const exploredNodes: Node[] = [];

  const { row: targetRow, col: targetCol } = targetNode;

  while (heap.length) {
    sortHeap(heap);

    const currentNode = heap.shift();

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

      const neighbor = allNodes[getStringRowAndCol(newRow, newCol)];
      if (!neighbor) continue;

      if (!isInbounds(newRow, newCol, numRows, numCols)) continue;
      if (neighbor.isWall || neighbor.visiting) continue;

      neighbor.distance = currentDistance + 1;
      neighbor.prevNode = currentNode;
      neighbor.visiting = true;
      heap.push(neighbor);
    }
  }
  console.log("target not found");
  return exploredNodes;
};
