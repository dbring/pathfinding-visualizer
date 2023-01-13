import { adjacentDirections } from "../constants/constants";
import {
  getStringRowAndCol,
  isInbounds,
} from "../pathfinding-algorithms/dijkstra";
import { AllNodes, Node } from "../types/types";

const distanceTwoDirections = [
  [2, 0],
  [0, 2],
  [-2, 0],
  [0, -2],
];

const getDistanceTwoNeighbors = (
  numRows: number,
  numCols: number,
  currentNode: Node,
  copyOfAllNodes: AllNodes,
  wallState: boolean
): Node[] => {
  const { row, col } = currentNode;
  const distanceTwoNeighbors: Node[] = [];

  for (const [changeRow, changeCol] of distanceTwoDirections) {
    const newRow = row + changeRow;
    const newCol = col + changeCol;

    if (!isInbounds(newRow, newCol, numRows, numCols)) continue;
    const neighbor = copyOfAllNodes[getStringRowAndCol(newRow, newCol)];

    if (neighbor.isWall !== wallState) continue;

    distanceTwoNeighbors.push(neighbor);
  }

  return distanceTwoNeighbors;
};

const setAllNodesAsWalls = (
  startNode: Node,
  targetNode: Node,
  copyOfAllNodes: AllNodes
) => {
  for (const node of Object.values(copyOfAllNodes)) {
    if (node === startNode || node === targetNode) continue;

    node.isWall = true;
  }
};

const connectNodes = (
  currentNode: Node,
  neighborNode: Node,
  copyOfAllNodes: AllNodes
) => {
  const inBetweenRow = (currentNode.row + neighborNode.row) / 2;
  const inBetweenCol = (currentNode.col + neighborNode.col) / 2;

  currentNode.isWall = false;
  neighborNode.isWall = false;
  copyOfAllNodes[getStringRowAndCol(inBetweenRow, inBetweenCol)].isWall = false;
};

export const primsMazeGeneratingAlgorithm = (
  numRows: number,
  numCols: number,
  startNode: Node,
  targetNode: Node,
  allNodes: AllNodes
) => {
  let randomRow = Math.floor(Math.random() * numRows);
  let randomCol = Math.floor(Math.random() * numCols);
  let randomNode = allNodes[getStringRowAndCol(randomRow, randomCol)];
  const copyOfAllNodes = { ...allNodes };

  // Check to ensure the initial random node is not the start or target node
  while (randomNode === startNode || randomNode === targetNode) {
    randomRow = Math.floor(Math.random() * numRows);
    randomCol = Math.floor(Math.random() * numCols);
    randomNode = copyOfAllNodes[getStringRowAndCol(randomRow, randomCol)];
  }

  setAllNodesAsWalls(startNode, targetNode, copyOfAllNodes);

  randomNode.isWall = false;

  const wallNodesDistanceTwoFromRandomNode = getDistanceTwoNeighbors(
    numRows,
    numCols,
    randomNode,
    copyOfAllNodes,
    true
  );

  const frontier = [...wallNodesDistanceTwoFromRandomNode];

  while (frontier.length) {
    const randomIndex = Math.floor(Math.random() * frontier.length);
    const currentNode = frontier.splice(randomIndex, 1)[0];

    currentNode.isWall = false;

    const passageNodesDistanceTwoFromCurrentNode = getDistanceTwoNeighbors(
      numRows,
      numCols,
      currentNode,
      copyOfAllNodes,
      false
    );

    if (passageNodesDistanceTwoFromCurrentNode.length) {
      const randomPassageIndex = Math.floor(
        Math.random() * passageNodesDistanceTwoFromCurrentNode.length
      );
      const randomPassageNode =
        passageNodesDistanceTwoFromCurrentNode[randomPassageIndex];

      connectNodes(currentNode, randomPassageNode, copyOfAllNodes);
    }

    const wallsDistanceTwoFromCurrentNode = getDistanceTwoNeighbors(
      numRows,
      numCols,
      currentNode,
      copyOfAllNodes,
      true
    );

    frontier.push(...wallsDistanceTwoFromCurrentNode);
  }

  return copyOfAllNodes;
};
