export const PASSAGE = false;
export const WALL = true;

export const CELL_SIZE = 20;

export const adjacentDirections = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

export const eightWayDirections = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export const distanceTwoDirections = [
  [2, 0],
  [0, 2],
  [-2, 0],
  [0, -2],
];

interface algorithms {
  [index: string]: string;
}

export const algorithms: algorithms = {
  dijkstra: "dijkstra",
  aStar: "aStar",
  breadthFirstSearch: "breadthFirstSearch",
  depthFirstSearch: "depthFirstSearch",
  bellmanFord: "bellmanFord",
};
