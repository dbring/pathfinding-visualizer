export const CELL_SIZE = 25;

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
