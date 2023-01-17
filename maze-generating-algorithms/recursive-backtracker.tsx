import {
  adjacentDirections,
  distanceTwoDirections,
  PASSAGE,
  WALL,
} from "../constants/constants";
import {
  getStringRowAndCol,
  isInbounds,
} from "../pathfinding-algorithms/dijkstra";
import { AllNodes, Node } from "../types/types";
import { setAllNodesAsWalls } from "./randomized-prim";

const getWallNeighbors = (
  numRows: number,
  numCols: number,
  node: Node,
  copyOfAllNodes: AllNodes
): Node[] => {
  const { row, col } = node;
  const neighboringWalls: Node[] = [];

  for (const [changeRow, changeCol] of distanceTwoDirections) {
    const newRow = row + changeRow;
    const newCol = col + changeCol;

    if (!isInbounds(newRow, newCol, numRows, numCols)) continue;

    const neighboringWall = copyOfAllNodes[getStringRowAndCol(newRow, newCol)];
    if (neighboringWall.isWall === PASSAGE) continue;

    neighboringWalls.push(neighboringWall);
  }
  return neighboringWalls;
};

export const recursiveBacktracker = (
  numRows: number,
  numCols: number,
  startNode: Node,
  targetNode: Node,
  allNodes: AllNodes
) => {
  let copyOfAllNodes = { ...allNodes };

  setAllNodesAsWalls(startNode, targetNode, copyOfAllNodes);

  let randomRow = Math.floor(Math.random() * numRows);
  let randomCol = Math.floor(Math.random() * numCols);
  let randomNode = copyOfAllNodes[getStringRowAndCol(randomRow, randomCol)];

  const stack = [randomNode];
  const exploredNodes: Node[] = [];

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

      copyOfAllNodes[getStringRowAndCol(inBetweenRow, inBetweenCol)].isWall =
        PASSAGE;
      exploredNodes.push(
        copyOfAllNodes[getStringRowAndCol(inBetweenRow, inBetweenCol)]
      );
      stack.push(neighboringWall);
    } else {
      stack.pop();
    }
  }
  console.log("outside while");
  return exploredNodes;
};
