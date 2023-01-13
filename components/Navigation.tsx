import { useContext, useState } from "react";
import { algorithms } from "../constants/constants";
import { GlobalContext } from "../context/global.context";
import { randomizedPrim } from "../maze-generating-algorithms/randomized-prim";
import { generateRandomMaze } from "../maze-generating-algorithms/randomly-selected";
import { randomizedDepthFirstSearchMazeGenerator } from "../maze-generating-algorithms/recursive-backtracker";
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
import { animateShortestPath } from "../utils/animation/animate-shortest-path";
import { constructShortestPath } from "../utils/animation/construct-shortest-path";

export default function Navigation() {
  const { numRows, numCols, startNode, targetNode, allNodes, setAllNodes } =
    useContext(GlobalContext);

  const [isAlgorithmsDropdownOpen, setIsAlgorithmsDropdownOpen] =
    useState(false);

  const handleVisualize = async (id: string) => {
    let exploredNodes;

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

  const handleRandomMaze = () => {
    handleClearGrid();
    const copyOfAllNodes = generateRandomMaze(
      numRows,
      numCols,
      startNode,
      targetNode,
      allNodes
    );

    setAllNodes(copyOfAllNodes);
  };

  const handlePrimsMaze = () => {
    handleClearGrid();
    const mazeNodes = randomizedPrim(
      numRows,
      numCols,
      startNode,
      targetNode,
      allNodes
    );
    animateExploredNodes(mazeNodes, allNodes, setAllNodes);
  };

  const handleDepthFirstSearchMaze = () => {
    handleClearGrid();
    console.log("inside handler");
    const maze = randomizedDepthFirstSearchMazeGenerator(
      numRows,
      numCols,
      startNode,
      targetNode,
      allNodes
    );
    setAllNodes(maze);
  };

  return (
    <nav className="bg-slate-600 text-lg min-h-53 mb-30">
      <div className="px-21 py-21 text-gray-300">Pathfinding Visualizer</div>
      <ul className="float-left list-none pl-0 flex flex-row m-0">
        <li className="block relative float-left">
          <button
            className={`p-5 ml-3 ${
              isAlgorithmsDropdownOpen
                ? "bg-[#1abc9c] text-white"
                : "bg-[#34495e]"
            }`}
            onClick={() =>
              setIsAlgorithmsDropdownOpen(!isAlgorithmsDropdownOpen)
            }
          >
            Algorithms
          </button>
          {isAlgorithmsDropdownOpen && (
            <ul className="ml-3 absolute z-50 bg-[#f3f4f5] min-w-[225px] rounded-lg">
              <li className="bg-[#34495e] text-white">
                <button onClick={() => handleVisualize("dijkstra")}>
                  Dijkstra's Algorithm
                </button>
              </li>
              <li className="bg-[#34495e]  text-white">
                <button onClick={() => handleVisualize("bellmanFord")}>
                  Bellman-Ford Algorithm
                </button>
              </li>
              <li className="bg-[#34495e]  text-white">
                <button onClick={() => handleVisualize("aStar")}>
                  A* Algorithm
                </button>
              </li>
              <li className="bg-[#34495e]  text-white">
                <button onClick={() => handleVisualize("depthFirstSearch")}>
                  Depth-First Search
                </button>
              </li>
              <li className="bg-[#34495e]  text-white">
                <button onClick={() => handleVisualize("breadthFirstSearch")}>
                  Breadth-First Search
                </button>
              </li>
            </ul>
          )}
        </li>
        <li className="block relative float-left">
          <button
            className={`p-5 ml-3 ${
              isAlgorithmsDropdownOpen
                ? "bg-[#1abc9c] text-white"
                : "bg-[#34495e]"
            }`}
            onClick={handlePrimsMaze}
          >
            Mazes & Patterns
          </button>
        </li>
        <li className="">
          <button
            className={`p-5 ml-3 ${
              isAlgorithmsDropdownOpen
                ? "bg-[#1abc9c] text-white"
                : "bg-[#34495e]"
            }`}
          >
            Add Weight
          </button>
        </li>
        <li className="">
          <button
            className={`p-5 ml-3 ${
              isAlgorithmsDropdownOpen
                ? "bg-[#1abc9c] text-white"
                : "bg-[#34495e]"
            }`}
          >
            Visualize!
          </button>
        </li>
        <li className="">
          <button
            className={`p-5 ml-3 ${
              isAlgorithmsDropdownOpen
                ? "bg-[#1abc9c] text-white"
                : "bg-[#34495e]"
            }`}
            onClick={handleClearGrid}
          >
            Clear Grid
          </button>
        </li>
        <li className="">
          {" "}
          <button
            className={`p-5 ml-3 ${
              isAlgorithmsDropdownOpen
                ? "bg-[#1abc9c] text-white"
                : "bg-[#34495e]"
            }`}
            onClick={handleClearGrid}
          >
            Speed
          </button>
        </li>
      </ul>
    </nav>
  );
}
