import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useState } from "react";
import { algorithmInfo, algorithms, mazes } from "../constants/constants";
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

// Add MUI Dialog to use as Modal for initial tutorial
// Add MUI Snackbar for when user takes an action like running algo, or clearing board
// Add MUI button float bottom right corner that opens info modal
// Refactor some re-usable code into a utils file (like getStringRowAndCol, setAllNodesAsWalls, etc.)
// Maybe move the big handle functions to their own files to keep Nav file smaller

export default function Navigation() {
  const {
    numRows,
    numCols,
    startNode,
    targetNode,
    allNodes,
    setAllNodes,
    selectedAlgorithm,
    setSelectedAlgorithm,
    loading,
    setLoading,
  } = useContext(GlobalContext);
  const [anchorElAlgorithms, setAnchorElAlgorithms] =
    useState<null | HTMLElement>(null);
  const [anchorElMazes, setAnchorElMazes] = useState<null | HTMLElement>(null);

  const clearVisitedCells = () => {
    const copyOfAllNodes = { ...allNodes };
    for (const node of Object.values(copyOfAllNodes)) {
      if (node.isWall) continue;
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

  const handleSelectAlgorithm = (algorithm: string) => {
    handleCloseAlgorithms();
    handleCloseMazes();
    setSelectedAlgorithm(algorithm);
  };

  const handleVisualizeAlgorithms = async (id: string) => {
    handleCloseAlgorithms();
    clearVisitedCells();
    setLoading(true);
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

    if (!exploredNodes) {
      setLoading(false);
      alert("Target not found! Try a different maze.");
      return;
    }

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

    if (!lastNode) {
      setLoading(false);
      alert("Target not found! Try a different maze.");
      return;
    }

    const shortestPath = constructShortestPath(lastNode);
    await animateShortestPath(shortestPath, allNodes, setAllNodes);
    setLoading(false);
  };

  const handleVisualizeMazes = async (id: string) => {
    handleCloseMazes();
    handleClearGrid();
    setSelectedAlgorithm(id);
    setLoading(true);
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
      setLoading(false);
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
      setLoading(false);
      return;
    }

    await animateMazePaths(maze, allNodes, setAllNodes);
    setLoading(false);
  };

  const handleVisualizeButton = (algorithm: string) => {
    if (mazes[algorithm]) {
      handleVisualizeMazes(algorithm);
    } else {
      handleVisualizeAlgorithms(algorithm);
    }
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
    <nav className="bg-black text-lg min-h-53 mb-30">
      <div className="ml-6 text-gray-300">pathfindingVisualizer</div>
      <div className=" hidden md:flex space-x-6">
        <Button
          id="algorithms"
          aria-controls={Boolean(anchorElAlgorithms) ? "algorithms" : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorElAlgorithms) ? "true" : undefined}
          onClick={handleClickAlgorithms}
          className="!text-[#b3b3b3] !ml-4"
          disabled={loading}
          endIcon={<ExpandMoreIcon />}
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
          <MenuItem onClick={() => handleSelectAlgorithm("dijkstra")}>
            Dijkstra's Algorithm
          </MenuItem>
          <MenuItem onClick={() => handleSelectAlgorithm("aStar")}>
            A* Algorithm
          </MenuItem>
          <MenuItem onClick={() => handleSelectAlgorithm("bellmanFord")}>
            Bellman-Ford Algorithm
          </MenuItem>
          <MenuItem onClick={() => handleSelectAlgorithm("depthFirstSearch")}>
            Depth-First Search
          </MenuItem>
          <MenuItem onClick={() => handleSelectAlgorithm("breadthFirstSearch")}>
            Breadth-First Search
          </MenuItem>
        </Menu>
        <Button
          id="mazes"
          aria-controls={Boolean(anchorElMazes) ? "mazes" : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorElMazes) ? "true" : undefined}
          onClick={handleClickMazes}
          className="!text-[#b3b3b3] !ml-4"
          disabled={loading}
          endIcon={<ExpandMoreIcon />}
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
          className="menu"
        >
          <MenuItem onClick={() => handleSelectAlgorithm("prim")}>
            Randomized Prim's Algorithm
          </MenuItem>
          <MenuItem onClick={() => handleSelectAlgorithm("kruskal")}>
            Randomized Kruskal's Algorithm
          </MenuItem>
          <MenuItem onClick={() => handleSelectAlgorithm("recursiveDivision")}>
            Recursive Division
          </MenuItem>
          <MenuItem
            onClick={() => handleSelectAlgorithm("recursiveBacktracker")}
          >
            Recursive Backtracker
          </MenuItem>
          <MenuItem onClick={() => handleSelectAlgorithm("randomlySelected")}>
            Randomly Selected
          </MenuItem>
        </Menu>
        <Button
          id="basic-button"
          aria-haspopup="false"
          onClick={handleClearGrid}
          className="!text-[#b3b3b3] !ml-4"
          disabled={loading}
        >
          Clear Grid
        </Button>
        <Button
          id="basic-button"
          aria-haspopup="false"
          onClick={clearVisitedCells}
          className="!text-[#b3b3b3] !ml-4"
          disabled={loading}
        >
          Clear Paths
        </Button>
        <Button
          id="basic-button"
          aria-haspopup="false"
          onClick={() => handleVisualizeButton(selectedAlgorithm)}
          className="!text-white !ml-4"
          variant="outlined"
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : "Visualize" +
              (selectedAlgorithm.length > 0
                ? ` ${algorithmInfo[selectedAlgorithm].title}`
                : "") +
              "!"}
        </Button>
      </div>
    </nav>
  );
}
