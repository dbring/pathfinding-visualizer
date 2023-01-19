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

interface mazes {
  [index: string]: string;
}

export const algorithms: algorithms = {
  dijkstra: "dijkstra",
  aStar: "aStar",
  breadthFirstSearch: "breadthFirstSearch",
  depthFirstSearch: "depthFirstSearch",
  bellmanFord: "bellmanFord",
};

export const mazes: mazes = {
  prim: "prim",
  kruskal: "kruskal",
  recursiveBacktracker: "recursiveBacktracker",
  recursiveDivision: "recursiveDivision",
  randomlySelected: "randomlySelected",
};

interface AlgorithmInfo {
  [id: string]: { title: string; description: string };
}

export const algorithmInfo: AlgorithmInfo = {
  dijkstra: {
    title: "Dijkstra's Algorithm",
    description:
      "Dijkstra's Algorithm finds the shortest path from the start node to all other nodes, including the target node, in positively-weighted graph.",
  },
  aStar: {
    title: "A* Algorithm",
    description:
      "The A* Algorithm finds the shortest path between two nodes in a positively-weighted graph and uses a heuristic function to prioritize nodes closer to the target node.",
  },
  bellmanFord: {
    title: "Bellman-Ford Algorithm",
    description:
      "The Bellman-Ford Algorithm finds the shortest path between two nodes in a (positively- or negatively-) weighted graph.",
  },
  depthFirstSearch: {
    title: "Depth-First Search",
    description:
      "Depth First Search finds a path to the target node (not necessarily the shortest path) in an unweighted graph.",
  },
  breadthFirstSearch: {
    title: "Breadth-First Search",
    description:
      "Breadth-First Search finds the shortest path from the start node to all other nodes, including the target node, in an unweighted graph.",
  },
  prim: {
    title: "Randomized Prim's Algorithm",
    description:
      "Starting with a graph of walls, the Randomized Prim's Algorithm constructs a minimum spanning tree of passages which forms a maze.",
  },
  kruskal: {
    title: "Randomized Kruskal's Algorithm",
    description:
      "Starting with a graph of walls, the Randomized Kruskal's Algorithm uses the Union-Find data structure to build up a minimum spanning tree maze from a collection of passages.",
  },
  recursiveDivision: {
    title: "Recursive Division",
    description:
      "The Recursive Division algorithm randomly divides the grid into two halves by a wall, then further divides those halves until no halves of a minimum size remain. In each wall, a randomly selected cell is left open as a passage.",
  },
  recursiveBacktracker: {
    title: "Recursive Backtracker",
    description:
      "The Recursive Backtracker algorithm uses a variant of depth-first search and carves out a maze in a grid of walls. When it reaches a deadend, the algorithm backtracks until it reaches more cells that it can explore.",
  },
  randomlySelected: {
    title: "Randomly Selected",
    description:
      "This algorithm randomly selects cells to turn into walls with a 25% probability.",
  },
};
