import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useState } from "react";
import { algorithms, mazes } from "../constants/constants";
import { GlobalContext } from "../context/global.context";
import { randomizedKruskal } from "../maze-generating-algorithms/randomized-kruskal";
import {
  randomizedPrim,
  setAllNodesAsWalls,
} from "../maze-generating-algorithms/randomized-prim";
import { generateRandomMaze } from "../maze-generating-algorithms/randomly-selected";
import { recursiveBacktracker } from "../maze-generating-algorithms/recursive-backtracker";
import { recursiveDivision } from "../maze-generating-algorithms/recursive-division";
import { aStar } from "../pathfinding-algorithms/a-star";
import { bellmanFord } from "../pathfinding-algorithms/bellman-ford";
import { breadthFirstSearch } from "../pathfinding-algorithms/breadth-first-search";
import { depthFirstSearch } from "../pathfinding-algorithms/depth-first-search";
import {
  dijkstra,
  getStringRowAndCol,
} from "../pathfinding-algorithms/dijkstra";
import { Node } from "../types/types";
import { animateExploredNodes } from "../utils/animation/animate-exploration";
import { animateMazePaths } from "../utils/animation/animate-maze-paths";
import { animateMazeWalls } from "../utils/animation/animate-maze-walls";
import { animateShortestPath } from "../utils/animation/animate-shortest-path";
import { constructShortestPath } from "../utils/animation/construct-shortest-path";

export default function Navigation() {
  const { numRows, numCols, startNode, targetNode, allNodes, setAllNodes } =
    useContext(GlobalContext);
  const [anchorElAlgorithms, setAnchorElAlgorithms] =
    useState<null | HTMLElement>(null);
  const [anchorElMazes, setAnchorElMazes] = useState<null | HTMLElement>(null);

  const handleClickAlgorithms = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElAlgorithms(event.currentTarget);
  };
  const handleCloseAlgorithms = () => {
    setAnchorElAlgorithms(null);
  };

  const handleClickMazes = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMazes(event.currentTarget);
  };

  const handleCloseMazes = () => {
    setAnchorElMazes(null);
  };

  const handleVisualizeAlgorithms = async (id: string) => {
    handleCloseAlgorithms();
    let exploredNodes: Node[] = [];

    if (algorithms[id] === "dijkstra") {
      exploredNodes = dijkstra(
        numRows,
        numCols,
        startNode,
        targetNode,
        allNodes
      );
    }

    if (algorithms[id] === "depthFirstSearch") {
      exploredNodes = depthFirstSearch(
        numRows,
        numCols,
        startNode,
        targetNode,
        allNodes
      );
    }

    if (algorithms[id] === "breadthFirstSearch") {
      exploredNodes = breadthFirstSearch(
        numRows,
        numCols,
        startNode,
        targetNode,
        allNodes
      );
    }

    if (algorithms[id] === "bellmanFord") {
      exploredNodes = bellmanFord(
        numRows,
        numCols,
        startNode,
        targetNode,
        allNodes,
        0
      );
    }

    if (algorithms[id] === "aStar") {
      exploredNodes = aStar(numRows, numCols, startNode, targetNode, allNodes);
    }

    if (!exploredNodes) return;

    if (algorithms[id] !== "bellmanFord") {
      await animateExploredNodes(exploredNodes, allNodes, setAllNodes);
    }

    const { row: targetRow, col: targetCol } = targetNode;
    let lastNode: Node | null = null;

    for (const node of exploredNodes) {
      const { row, col } = node;
      if (row !== targetRow || col !== targetCol) continue;
      lastNode = node;
      break;
    }

    if (!lastNode) return;

    const shortestPath = constructShortestPath(lastNode);
    animateShortestPath(shortestPath, allNodes, setAllNodes);
  };

  const handleVisualizeMazes = async (id: string) => {
    handleCloseMazes();
    handleClearGrid();
    const copyOfAllNodes = { ...allNodes };

    let maze: Node[] = [];

    if (mazes[id] === "prim") {
      // animates path
      maze = randomizedPrim(
        numRows,
        numCols,
        startNode,
        targetNode,
        copyOfAllNodes
      );
      setAllNodesAsWalls(startNode, targetNode, copyOfAllNodes);
    }

    if (mazes[id] === "randomlySelected") {
      // animates walls
      maze = generateRandomMaze(
        numRows,
        numCols,
        startNode,
        targetNode,
        copyOfAllNodes
      );
      await animateMazeWalls(maze, allNodes, setAllNodes);
      return;
    }

    if (mazes[id] === "recursiveBacktracker") {
      // animates path
      maze = recursiveBacktracker(
        numRows,
        numCols,
        startNode,
        targetNode,
        copyOfAllNodes
      );
      setAllNodesAsWalls(startNode, targetNode, copyOfAllNodes);
    }

    if (mazes[id] === "kruskal") {
      // animates path
      maze = randomizedKruskal(
        numRows,
        numCols,
        startNode,
        targetNode,
        copyOfAllNodes
      );
      setAllNodesAsWalls(startNode, targetNode, copyOfAllNodes);
    }

    if (mazes[id] === "recursiveDivision") {
      // animates walls
      const orientation = "HORIZONTAL";
      maze = recursiveDivision(
        1,
        numRows - 2,
        1,
        numCols - 2,
        copyOfAllNodes,
        targetNode,
        orientation
      );
      await animateMazeWalls(maze, allNodes, setAllNodes);
      return;
    }

    await animateMazePaths(maze, allNodes, setAllNodes);
  };

  const handleClearGrid = () => {
    const copyOfAllNodes = { ...allNodes };
    for (const node of Object.values(copyOfAllNodes)) {
      node.distance = 0;
      node.heuristic = 0;
      node.aStarDistance = 0;
      node.isWall = false;
      node.visiting = false;
      node.visited = false;
      node.isCurrent = false;
      node.prevNode = null;
      node.isInShortestPath = false;
    }

    setAllNodes(copyOfAllNodes);
  };

  return (
    <nav className="bg-slate-600 text-lg min-h-53 mb-30">
      <div className="px-21 py-21 text-gray-300">Pathfinding Visualizer</div>

      <Button
        id="algorithms"
        aria-controls={Boolean(anchorElAlgorithms) ? "algorithms" : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorElAlgorithms) ? "true" : undefined}
        onClick={handleClickAlgorithms}
        className="!bg-black !text-[#b3b3b3]"
      >
        Algorithms
      </Button>
      <Menu
        id="algorithms"
        anchorEl={anchorElAlgorithms}
        open={Boolean(anchorElAlgorithms)}
        onClose={handleCloseAlgorithms}
        MenuListProps={{
          "aria-labelledby": "algorithms",
        }}
        className="menu"
      >
        <MenuItem onClick={() => handleVisualizeAlgorithms("dijkstra")}>
          Dijkstra's Algorithm
        </MenuItem>
        <MenuItem onClick={() => handleVisualizeAlgorithms("aStar")}>
          A* Algorithm
        </MenuItem>
        <MenuItem onClick={() => handleVisualizeAlgorithms("bellmanFord")}>
          Bellman-Ford Algorithm
        </MenuItem>
        <MenuItem onClick={() => handleVisualizeAlgorithms("depthFirstSearch")}>
          Depth-First Search
        </MenuItem>
        <MenuItem
          onClick={() => handleVisualizeAlgorithms("breadthFirstSerach")}
        >
          Breadth-First Search
        </MenuItem>
      </Menu>
      <Button
        id="mazes"
        aria-controls={Boolean(anchorElMazes) ? "mazes" : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorElMazes) ? "true" : undefined}
        onClick={handleClickMazes}
      >
        Mazes
      </Button>
      <Menu
        id="mazes"
        anchorEl={anchorElMazes}
        open={Boolean(anchorElMazes)}
        onClose={handleCloseMazes}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleVisualizeMazes("prim")}>
          Randomized Prim's Algorithm
        </MenuItem>
        <MenuItem onClick={() => handleVisualizeMazes("kruskal")}>
          Randomized Kruskal's Algorithm
        </MenuItem>
        <MenuItem onClick={() => handleVisualizeMazes("recursiveDivision")}>
          Recursive Division
        </MenuItem>
        <MenuItem onClick={() => handleVisualizeMazes("recursiveBacktracker")}>
          Recursive Backtracker
        </MenuItem>
        <MenuItem onClick={() => handleVisualizeMazes("randomlySelected")}>
          Randomly Selected
        </MenuItem>
      </Menu>
      <Button id="basic-button" aria-haspopup="false" onClick={handleClearGrid}>
        Clear Grid
      </Button>
    </nav>
  );
}
