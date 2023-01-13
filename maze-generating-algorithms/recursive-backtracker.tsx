import { adjacentDirections } from "../constants/constants";
import {
  getStringRowAndCol,
  isInbounds,
} from "../pathfinding-algorithms/dijkstra";
import { AllNodes, Node } from "../types/types";

const getUnvisitedNeighbors = (
  numRows: number,
  numCols: number,
  node: Node,
  copyOfAllNodes: AllNodes,
  visited: Set<string>
): Node[] => {
  const { row, col } = node;
  const neighbors: Node[] = [];
  for (const [changeRow, changeCol] of adjacentDirections) {
    const newRow = row + changeRow;
    const newCol = col + changeCol;

    if (!isInbounds(newRow, newCol, numRows, numCols)) continue;
    if (visited.has(getStringRowAndCol(newRow, newCol))) continue;
    if (copyOfAllNodes[getStringRowAndCol(newRow, newCol)].isWall) continue;

    neighbors.push(copyOfAllNodes[getStringRowAndCol(newRow, newCol)]);
  }
  return neighbors;
};

export const randomizedDepthFirstSearchMazeGenerator = (
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

  console.log("inside fn dfs");

  // Check to ensure the initial random node is not the start or target node
  while (randomNode === startNode || randomNode === targetNode) {
    randomRow = Math.floor(Math.random() * numRows);
    randomCol = Math.floor(Math.random() * numCols);
    randomNode = copyOfAllNodes[getStringRowAndCol(randomRow, randomCol)];
  }
  console.log(randomNode);
  const stack = [randomNode];
  const visited: Set<string> = new Set();
  visited.add(getStringRowAndCol(randomRow, randomCol));

  while (stack.length) {
    console.log("inside while");
    const currentNode = stack[stack.length - 1];
    visited.add(getStringRowAndCol(currentNode.row, currentNode.col));

    if (currentNode.isWall) {
      stack.pop();
      continue;
    }

    const unvisitedNeighbors = getUnvisitedNeighbors(
      numRows,
      numCols,
      currentNode,
      copyOfAllNodes,
      visited
    );

    if (unvisitedNeighbors.length) {
      const randomIndex = Math.floor(Math.random() * unvisitedNeighbors.length);
      const unvisitedNeighbor = unvisitedNeighbors[randomIndex];
      unvisitedNeighbor.isWall = true;
      unvisitedNeighbors.splice(randomIndex, 1);

      stack.push(...unvisitedNeighbors);
    } else {
      stack.pop();
    }
  }
  console.log("outside while");
  return copyOfAllNodes;
};
