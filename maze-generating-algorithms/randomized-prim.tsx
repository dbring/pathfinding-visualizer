import { distanceTwoDirections, PASSAGE, WALL } from "../constants/constants";
import {
  getStringRowAndCol,
  isInbounds,
} from "../pathfinding-algorithms/dijkstra";
import { AllNodes, Node } from "../types/types";

export const setAllNodesAsWalls = (
  startNode: Node,
  targetNode: Node,
  copyOfAllNodes: AllNodes
) => {
  for (const node of Object.values(copyOfAllNodes)) {
    const { row, col } = node;
    if (row === startNode.row && col === startNode.col) continue;
    if (row === targetNode.row && col === targetNode.col) continue;
    node.isWall = WALL;
  }
};

const getWallsDistanceTwo = (
  numRows: number,
  numCols: number,
  node: Node,
  copyOfAllNodes: AllNodes
) => {
  const { row, col } = node;
  const distanceTwoWalls: Set<Node> = new Set();

  for (const [changeRow, changeCol] of distanceTwoDirections) {
    const newRow = row + changeRow;
    const newCol = col + changeCol;

    if (!isInbounds(newRow, newCol, numRows, numCols)) continue;

    const neighbor = copyOfAllNodes[getStringRowAndCol(newRow, newCol)];

    if (neighbor.isWall === PASSAGE) continue;

    distanceTwoWalls.add(neighbor);
  }

  return distanceTwoWalls;
};

const getPassagesDistanceTwo = (
  numRows: number,
  numCols: number,
  node: Node,
  copyOfAllNodes: AllNodes
): Node[] => {
  const { row, col } = node;
  const distanceTwoPassages: Node[] = [];

  for (const [changeRow, changeCol] of distanceTwoDirections) {
    const newRow = row + changeRow;
    const newCol = col + changeCol;

    if (!isInbounds(newRow, newCol, numRows, numCols)) continue;

    const neighbor = copyOfAllNodes[getStringRowAndCol(newRow, newCol)];

    if (neighbor.isWall === WALL) continue;

    distanceTwoPassages.push(neighbor);
  }

  return distanceTwoPassages;
};

const connectNodes = (
  currentNode: Node,
  passageNode: Node,
  copyOfAllNodes: AllNodes,
  passageNodes: Node[]
) => {
  const inBetweenRow = Math.floor((currentNode.row + passageNode.row) / 2);
  const inBetweenCol = Math.floor((currentNode.col + passageNode.col) / 2);

  currentNode.isWall = PASSAGE;
  copyOfAllNodes[getStringRowAndCol(inBetweenRow, inBetweenCol)].isWall =
    PASSAGE;

  passageNodes.push(currentNode);
  passageNodes.push(
    copyOfAllNodes[getStringRowAndCol(inBetweenRow, inBetweenCol)]
  );
};

export const randomizedPrim = (
  numRows: number,
  numCols: number,
  startNode: Node,
  targetNode: Node,
  allNodes: AllNodes
) => {
  const copyOfAllNodes = { ...allNodes };
  setAllNodesAsWalls(startNode, targetNode, copyOfAllNodes);
  console.log(copyOfAllNodes);

  let randomRow = Math.floor(Math.random() * numRows);
  let randomCol = Math.floor(Math.random() * numCols);
  let randomNode = copyOfAllNodes[getStringRowAndCol(randomRow, randomCol)];

  randomNode.isWall = PASSAGE;

  const passageNodes: Node[] = [];
  passageNodes.push(randomNode);

  const frontier: Set<Node> = getWallsDistanceTwo(
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
