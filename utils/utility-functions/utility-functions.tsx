import { WALL } from "../../constants/constants";
import { AllNodes, GridNode } from "../../types/types";

export const getStringRowAndCol = (row: number, col: number): string =>
  `${row},${col}`;

export const getNode = (row: number, col: number, allNodes: AllNodes) => {
  return allNodes[getStringRowAndCol(row, col)];
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

export const setAllNodesAsWalls = (
  startNode: GridNode,
  targetNode: GridNode,
  allNodes: AllNodes
) => {
  for (const node of Object.values(allNodes)) {
    const { row, col } = node;
    if (row === startNode.row && col === startNode.col) continue;
    if (row === targetNode.row && col === targetNode.col) continue;
    node.isWall = WALL;
  }
};
