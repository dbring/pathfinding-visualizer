/*
Note: we can make this algorithm more efficient by implementing a ranking system
*/

import { distanceTwoDirections, PASSAGE } from "../constants/constants";
import { AllNodes, Node } from "../types/types";
import {
  getNode,
  isInbounds,
  setAllNodesAsWalls,
} from "../utils/utility-functions/utility-functions";

type NodeTuple = [Node, Node];

// make forest of passages
const setForestOfPassages = (
  numRows: number,
  numCols: number,
  copyOfAllNodes: AllNodes
) => {
  for (let row = 0; row < numRows; row += 2) {
    for (let col = 0; col < numCols; col += 2) {
      getNode(row, col, copyOfAllNodes).isWall = PASSAGE;
    }
  }
};

const shuffle = (array: NodeTuple[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let n = Math.floor(Math.random() * i);
    [array[i], array[n]] = [array[n], array[i]];
  }
  return array;
};

class DisjointSetUnion {
  parent: Node[][];

  constructor(numRows: number, numCols: number, copyOfAllNodes: AllNodes) {
    this.parent = new Array(numRows)
      .fill(null)
      .map((e) => new Array(numCols).fill(null));

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const node = getNode(row, col, copyOfAllNodes);
        this.parent[row][col] = node;
      }
    }
  }

  findParent = (node: Node): Node => {
    const { row, col } = node;
    const parentNode = this.parent[row][col];
    const { row: parentRow, col: parentCol } = parentNode;
    if (row === parentRow && col === parentCol) return node;

    this.parent[row][col] = this.findParent(parentNode);
    return this.parent[row][col];
  };

  union = (node1: Node, node2: Node) => {
    const parent1 = this.findParent(node1);
    const { row: row1, col: col1 } = parent1;

    const parent2 = this.findParent(node2);
    const { row: row2, col: col2 } = parent2;

    if (row1 !== row2 || col1 !== col2) {
      this.parent[row1][col1] = parent2;
    }
  };
}

const getPassagesDividedByAWall = (
  numRows: number,
  numCols: number,
  copyOfAllNodes: AllNodes
) => {
  const passagesDividedByAWall: NodeTuple[] = [];

  for (const node of Object.values(copyOfAllNodes)) {
    const { row, col } = node;
    if (node.isWall) continue;

    for (const [changeRow, changeCol] of distanceTwoDirections) {
      const newRow = row + changeRow;
      const newCol = col + changeCol;

      if (!isInbounds(newRow, newCol, numRows, numCols)) continue;

      const neighbor = getNode(newRow, newCol, copyOfAllNodes);
      if (neighbor.isWall) continue;

      passagesDividedByAWall.push([node, neighbor]);
    }
  }
  return passagesDividedByAWall;
};

export const randomizedKruskal = (
  numRows: number,
  numCols: number,
  startNode: Node,
  targetNode: Node,
  allNodes: AllNodes
) => {
  const copyOfAllNodes = { ...allNodes };
  setAllNodesAsWalls(startNode, targetNode, copyOfAllNodes);
  setForestOfPassages(numRows, numCols, copyOfAllNodes);
  const exploredNodes: Node[] = [];

  // Get edges
  let passagesDividedByAWall = getPassagesDividedByAWall(
    numRows,
    numCols,
    copyOfAllNodes
  );

  const dsu = new DisjointSetUnion(numRows, numCols, copyOfAllNodes);

  // Shuffle edges
  passagesDividedByAWall = shuffle(passagesDividedByAWall);

  // Loop through all edges and union together disjoint mazes
  for (const [passage1, passage2] of passagesDividedByAWall) {
    const { row: row1, col: col1 } = dsu.findParent(passage1);
    const { row: row2, col: col2 } = dsu.findParent(passage2);

    if (row1 === row2 && col1 === col2) continue;

    const inBetweenRow = Math.floor((passage1.row + passage2.row) / 2);
    const inBetweenCol = Math.floor((passage1.col + passage2.col) / 2);

    const inBetweenWall = getNode(inBetweenRow, inBetweenCol, copyOfAllNodes);

    inBetweenWall.isWall = PASSAGE;
    exploredNodes.push(passage2, inBetweenWall, passage1);

    dsu.union(passage1, passage2);
    dsu.union(inBetweenWall, passage2);
  }

  getNode(startNode.row, startNode.col, copyOfAllNodes).isWall = false;
  getNode(targetNode.row, targetNode.col, copyOfAllNodes).isWall = false;

  return exploredNodes;
};
