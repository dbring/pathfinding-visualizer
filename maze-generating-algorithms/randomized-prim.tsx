import { distanceTwoDirections, PASSAGE, WALL } from "../constants/constants";
import { AllNodes, GridNode } from "../types/types";
import {
  getNode,
  isInbounds,
  setAllNodesAsWalls,
} from "../utils/utility-functions/utility-functions";

const getWallsDistanceTwo = (
  numRows: number,
  numCols: number,
  node: GridNode,
  copyOfAllNodes: AllNodes
) => {
  const { row, col } = node;
  const distanceTwoWalls: Set<GridNode> = new Set();

  for (const [changeRow, changeCol] of distanceTwoDirections) {
    const newRow = row + changeRow;
    const newCol = col + changeCol;

    if (!isInbounds(newRow, newCol, numRows, numCols)) continue;

    const neighbor = getNode(newRow, newCol, copyOfAllNodes);

    if (neighbor.isWall === PASSAGE) continue;

    distanceTwoWalls.add(neighbor);
  }

  return distanceTwoWalls;
};

const getPassagesDistanceTwo = (
  numRows: number,
  numCols: number,
  node: GridNode,
  copyOfAllNodes: AllNodes
): GridNode[] => {
  const { row, col } = node;
  const distanceTwoPassages: GridNode[] = [];

  for (const [changeRow, changeCol] of distanceTwoDirections) {
    const newRow = row + changeRow;
    const newCol = col + changeCol;

    if (!isInbounds(newRow, newCol, numRows, numCols)) continue;

    const neighbor = getNode(newRow, newCol, copyOfAllNodes);

    if (neighbor.isWall === WALL) continue;

    distanceTwoPassages.push(neighbor);
  }

  return distanceTwoPassages;
};

const connectNodes = (
  currentNode: GridNode,
  passageNode: GridNode,
  copyOfAllNodes: AllNodes,
  passageNodes: GridNode[]
) => {
  const inBetweenRow = Math.floor((currentNode.row + passageNode.row) / 2);
  const inBetweenCol = Math.floor((currentNode.col + passageNode.col) / 2);

  currentNode.isWall = PASSAGE;
  getNode(inBetweenRow, inBetweenCol, copyOfAllNodes).isWall = PASSAGE;

  passageNodes.push(currentNode);
  passageNodes.push(getNode(inBetweenRow, inBetweenCol, copyOfAllNodes));
};

export const randomizedPrim = (
  numRows: number,
  numCols: number,
  startNode: GridNode,
  targetNode: GridNode,
  allNodes: AllNodes
) => {
  const copyOfAllNodes = { ...allNodes };
  setAllNodesAsWalls(startNode, targetNode, copyOfAllNodes);

  let randomRow = Math.floor(Math.random() * numRows);
  let randomCol = Math.floor(Math.random() * numCols);
  let randomNode = getNode(randomRow, randomCol, copyOfAllNodes);

  randomNode.isWall = PASSAGE;

  const passageNodes: GridNode[] = [];
  passageNodes.push(randomNode);

  const frontier: Set<GridNode> = getWallsDistanceTwo(
    numRows,
    numCols,
    randomNode,
    copyOfAllNodes
  );

  while (frontier.size) {
    const randomIndex = Math.floor(Math.random() * frontier.size);
    const frontierArray = Array.from(frontier);
    let currentNode = frontierArray[randomIndex];
    frontier.delete(currentNode);

    const passagesDistanceTwoFromCurrentNode = getPassagesDistanceTwo(
      numRows,
      numCols,
      currentNode,
      copyOfAllNodes
    );

    if (passagesDistanceTwoFromCurrentNode.length) {
      const randomPassageIndex = Math.floor(
        Math.random() * passagesDistanceTwoFromCurrentNode.length
      );
      const randomPassage =
        passagesDistanceTwoFromCurrentNode[randomPassageIndex];

      connectNodes(currentNode, randomPassage, copyOfAllNodes, passageNodes);
    }

    const wallsDistanceTwoFromCurrentNode = getWallsDistanceTwo(
      numRows,
      numCols,
      currentNode,
      copyOfAllNodes
    );

    for (const wall of wallsDistanceTwoFromCurrentNode) {
      frontier.add(wall);
    }
  }

  return passageNodes;
};
