import { distanceTwoDirections, PASSAGE } from "../constants/constants";
import { AllNodes, GridNode } from "../types/types";
import {
  getNode,
  isInbounds,
  setAllNodesAsWalls,
} from "../utils/utility-functions/utility-functions";

const getWallNeighbors = (
  numRows: number,
  numCols: number,
  node: GridNode,
  copyOfAllNodes: AllNodes
): GridNode[] => {
  const { row, col } = node;
  const neighboringWalls: GridNode[] = [];

  for (const [changeRow, changeCol] of distanceTwoDirections) {
    const newRow = row + changeRow;
    const newCol = col + changeCol;

    if (!isInbounds(newRow, newCol, numRows, numCols)) continue;

    const neighboringWall = getNode(newRow, newCol, copyOfAllNodes);
    if (neighboringWall.isWall === PASSAGE) continue;

    neighboringWalls.push(neighboringWall);
  }
  return neighboringWalls;
};

export const recursiveBacktracker = (
  numRows: number,
  numCols: number,
  startNode: GridNode,
  targetNode: GridNode,
  allNodes: AllNodes
) => {
  let copyOfAllNodes = { ...allNodes };

  setAllNodesAsWalls(startNode, targetNode, copyOfAllNodes);

  let randomRow = Math.floor(Math.random() * numRows);
  let randomCol = Math.floor(Math.random() * numCols);
  let randomNode = getNode(randomRow, randomCol, copyOfAllNodes);

  const stack = [randomNode];
  const exploredNodes: GridNode[] = [];

  while (stack.length) {
    const currentNode = stack[stack.length - 1];

    if (currentNode === undefined) continue;

    currentNode.isWall = PASSAGE;
    exploredNodes.push(currentNode);

    const wallNeighbors = getWallNeighbors(
      numRows,
      numCols,
      currentNode,
      copyOfAllNodes
    );

    if (wallNeighbors.length) {
      const randomIndex = Math.floor(Math.random() * wallNeighbors.length);
      const neighboringWall = wallNeighbors[randomIndex];

      const inBetweenRow = Math.floor(
        (currentNode.row + neighboringWall.row) / 2
      );
      const inBetweenCol = Math.floor(
        (currentNode.col + neighboringWall.col) / 2
      );

      getNode(inBetweenRow, inBetweenCol, copyOfAllNodes).isWall = PASSAGE;
      exploredNodes.push(getNode(inBetweenRow, inBetweenCol, copyOfAllNodes));
      stack.push(neighboringWall);
    } else {
      stack.pop();
    }
  }
  console.log("outside while");
  return exploredNodes;
};
