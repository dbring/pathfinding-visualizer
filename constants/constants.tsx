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
      "Dijkstra's Algorithm finds the shortest path from the start node to all other nodes, including the target node, in a positively-weighted graph.",
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

export const tutorialStepData = [
  {
    title: `Welcome to Pathfinder & Maze Visualizer!`,
    description: (
      <>
        This short tutorial will walk you through all of the features of this
        application.
        <br />
        <br />
        If you want to skip or exit the tutorial you can click outside this
        pop-up anytime to close the tutorial.
        <br />
        <br />
        Otherwise, press "Next"!
      </>
    ),
  },
  {
    title: "What is a Pathfinding Algorithm?",
    description: (
      <>
        At its core, a pathfinding algorithm seeks to find the shortest path
        between two nodes in a graph. This application visualizes various
        pathfinding algorithms in action, and more!
        <br />
        <br />
        All of the algorithms on this application are adapted for a 2D grid,
        where movements from one grid cell to another have a "cost" of 1.
      </>
    ),
  },
  {
    title: "Picking An Algorithm",
    description: (
      <>
        Choose a pathfinding algorithm from the "Algorithms" drop-down menu, or
        a maze-generating algorithm from the "Mazes" drop-down menu.
        <br />
        <br />
        When you select an algorithm an information box will appear above the
        grid with information about the selected algorithm.
        <br />
        <br />
        Click the "Visualize" button in the navigation bar to start running the
        selected algorithm.
      </>
    ),
  },
  {
    title: "Adding Walls and Weights",
    description: (
      <>
        Click on the grid to add a wall or generate a maze from the "Mazes"
        drop-down menu.
        <br />
        <br />
        Walls are impenetrable, meaning that a path cannot cross through them.
        Weights, however, are not impassable. They are simply more "costly" to
        move through.
        <br />
        <br />
        Weighted cells are colored orange, where the darker the orange color is,
        the more costly it is to visit.
      </>
    ),
  },
  {
    title: "Visualizing and More",
    description: (
      <>
        Use the navigation bar buttons to visualize algorithms and do other
        things!
        <br />
        <br />
        You can clear the current path, clear the entire grid, or set new random
        weights all from the navigation bar.
        <br />
        <br />
        If you want to access this tutorial again, click on the "?" in the
        bottom right corner of your screen.
      </>
    ),
  },
  {
    title: "Finished!",
    description: (
      <>
        I hope you have just as much fun playing around with this visualization
        tool as I had building it!
        <br />
        <br /> This app was built using Next.js, TypeScript, and the Material UI
        library.
        <br />
        <br />
        If you want to see the source code for this application, check out my{" "}
        {
          <a
            className="underline"
            style={{ textDecorationLine: "underline" }}
            href="https://github.com/dbring/pathfinding-visualizer"
          >
            GitHub
          </a>
        }
        .
      </>
    ),
  },
];
