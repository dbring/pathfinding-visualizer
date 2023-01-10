import { AllNodes, Node } from "../types/types";
import { timer } from "../utils/animation/animate-shortest-path";

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const sortHeap = (heap: Node[]) => {
  heap.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const isInbounds = (
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
  allNodes: AllNodes,
  setAllNodes: (allNodes: AllNodes) => void
): Node[] | null => {
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
    for (const [changeRow, changeCol] of directions) {
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
  return null;
};
