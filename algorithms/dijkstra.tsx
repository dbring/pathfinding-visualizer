import { AllNodes, Node } from "../types/types";

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
  const rowInbound = row > 0 && row < numRows;
  const colInbound = col > 0 && col < numCols;

  return rowInbound && colInbound;
};

export const dijkstra = (
  numRows: number,
  numCols: number,
  startNode: Node,
  targetNode: Node,
  allNodes: AllNodes,
  setAllNodes: (allNodes: AllNodes) => void
): Node | null => {
  const heap = [startNode];
  const { row: targetRow, col: targetCol } = targetNode;
  const visitedNodesInOrder: Node[] = [];

  while (heap.length) {
    let newNodes = { ...allNodes };

    sortHeap(heap);

    const currentNode = heap.shift();

    if (!currentNode) continue;

    const {
      row,
      col,
      distance: currentDistance,
      isWall,
      visited,
    } = currentNode;

    newNodes[`${row},${col}`].isCurrent = true;
    setAllNodes(newNodes);
    newNodes = { ...allNodes };

    //Process node
    if (isWall || visited) continue;

    newNodes[`${row},${col}`].visited = true;
    setAllNodes(newNodes);
    newNodes = { ...allNodes };

    if (row === targetRow && col === targetCol) {
      console.log("found target");
      return currentNode;
    }

    // Add neighbors
    for (const [changeRow, changeCol] of directions) {
      const newRow = row + changeRow;
      const newCol = col + changeCol;

      if (!isInbounds(row, col, numRows, numCols)) continue;

      const neighbor = newNodes[`${newRow},${newCol}`];
      if (!neighbor) continue;
      neighbor.distance = currentDistance + 1;
      neighbor.prevNode = currentNode;
      newNodes[`${row},${col}`].isCurrent = false;
      setAllNodes(newNodes);

      heap.push(neighbor);
    }
  }
  console.log("target not found");
  return null;
};
