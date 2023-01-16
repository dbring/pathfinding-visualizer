import { PASSAGE, WALL } from "../constants/constants";
import { getStringRowAndCol } from "../pathfinding-algorithms/dijkstra";
import { AllNodes, Node } from "../types/types";

export const recursiveDivision = (
  startRow: number,
  endRow: number,
  startCol: number,
  endCol: number,
  allNodes: AllNodes,
  targetNode: Node,
  orientation: string
) => {
  if (startRow > endRow || startCol > endCol) return;

  if (orientation === "HORIZONTAL") {
    const possibleWalls: number[] = [];
    for (let i = startRow; i <= endRow; i += 2) {
      possibleWalls.push(i);
    }
    const possibleDoors: number[] = [];
    for (let i = startCol - 1; i <= endCol + 1; i += 2) {
      possibleDoors.push(i);
    }
    const possibleWallIndex = Math.floor(Math.random() * possibleWalls.length);
    const possibleDoorIndex = Math.floor(Math.random() * possibleDoors.length);

    const wallRow = possibleWalls[possibleWallIndex];
    const doorCol = possibleDoors[possibleDoorIndex];

    for (let col = startCol - 1; col <= endCol + 1; col++) {
      if (
        col === doorCol ||
        (wallRow === targetNode.row && col === targetNode.col)
      )
        continue;
      allNodes[getStringRowAndCol(wallRow, col)].isWall = WALL;
    }

    if (wallRow - startRow - 2 > endCol - startCol) {
      recursiveDivision(
        startRow,
        wallRow - 2,
        startCol,
        endCol,
        allNodes,
        targetNode,
        orientation
      );
    } else {
      recursiveDivision(
        startRow,
        wallRow - 2,
        startCol,
        endCol,
        allNodes,
        targetNode,
        "VERTICAL"
      );
    }

    if (endRow - (wallRow + 2) > endCol - startCol) {
      recursiveDivision(
        wallRow + 2,
        endRow,
        startCol,
        endCol,
        allNodes,
        targetNode,
        orientation
      );
    } else {
      recursiveDivision(
        wallRow + 2,
        endRow,
        startCol,
        endCol,
        allNodes,
        targetNode,
        "VERTICAL"
      );
    }
  } else {
    const possibleWalls: number[] = [];
    for (let i = startCol; i <= endCol; i += 2) {
      possibleWalls.push(i);
    }
    const possibleDoors: number[] = [];
    for (let i = startRow - 1; i <= endRow + 1; i += 2) {
      possibleDoors.push(i);
    }
    const possibleWallIndex = Math.floor(Math.random() * possibleWalls.length);
    const possibleDoorIndex = Math.floor(Math.random() * possibleDoors.length);

    const wallCol = possibleWalls[possibleWallIndex];
    const doorRow = possibleDoors[possibleDoorIndex];

    for (let row = startRow - 1; row <= endRow + 1; row++) {
      if (
        row === doorRow ||
        (row === targetNode.row && wallCol === targetNode.col)
      )
        continue;
      allNodes[getStringRowAndCol(row, wallCol)].isWall = WALL;
    }

    if (endRow - startRow > wallCol - 2 - startCol) {
      recursiveDivision(
        startRow,
        endRow,
        startCol,
        wallCol - 2,
        allNodes,
        targetNode,
        "HORIZONTAL"
      );
    } else {
      recursiveDivision(
        startRow,
        endRow,
        startCol,
        wallCol - 2,
        allNodes,
        targetNode,
        orientation
      );
    }

    if (endRow - startRow > endCol - (wallCol + 2)) {
      recursiveDivision(
        startRow,
        endRow,
        wallCol + 2,
        endCol,
        allNodes,
        targetNode,
        "HORIZONTAL"
      );
    } else {
      recursiveDivision(
        startRow,
        endRow,
        wallCol + 2,
        endCol,
        allNodes,
        targetNode,
        orientation
      );
    }
  }
};

// Notes: put all logic in the if-else, recursion goes in there as well. If horizontal, set a horizontal wall and randomly pick one passage, etc.
