import { distanceTwoDirections } from "../constants/constants";
import { AllNodes, Node } from "../types/types";
import {
  getNode,
  isInbounds,
} from "../utils/utility-functions/utility-functions";

export const aldousBroder = (
  numRows: number,
  numCols: number,
  copyOfAllNodes: AllNodes
) => {
  const cells: Node[] = [];

  let remainingNodes = 0;
  for (let row = 1; row < numRows; row += 2) {
    for (let col = 1; col < numCols; col += 2) {
      cells.push(getNode(row, col, copyOfAllNodes));
      remainingNodes++;
    }
  }

  const initialNode = cells[Math.floor(Math.random() * cells.length)];
  let { row, col } = initialNode;
  initialNode.visiting = true;

  const exploredNodes: Node[] = [];
  exploredNodes.push(initialNode);
  remainingNodes--;

  while (remainingNodes > 0) {
    const randomIndex = Math.floor(
      Math.random() * distanceTwoDirections.length
    );
    const [changeRow, changeCol] = distanceTwoDirections[randomIndex];
    const newRow = row + changeRow;
    const newCol = col + changeCol;

    if (!isInbounds(newRow, newCol, numRows, numCols)) continue;

    const neighbor = getNode(newRow, newCol, copyOfAllNodes);

    if (!neighbor.visiting) {
      const inBetweenRow = Math.floor((row + newRow) / 2);
      const inBetweenCol = Math.floor((col + newCol) / 2);

      const inBetweenWall = getNode(inBetweenRow, inBetweenCol, copyOfAllNodes);

      neighbor.visiting = true;
      exploredNodes.push(inBetweenWall, neighbor);

      remainingNodes--;
    }

    row = newRow;
    col = newCol;
  }
  return exploredNodes;
};
