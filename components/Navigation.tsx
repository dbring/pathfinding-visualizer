import { useContext } from "react";
import { aStar } from "../algorithms/a-star";
import { breadthFirstSearch } from "../algorithms/breadth-first-search";
import { depthFirstSearch } from "../algorithms/depth-first-search";
import { dijkstra, getStringRowAndCol } from "../algorithms/dijkstra";
import { algorithms } from "../constants/constants";
import { GlobalContext } from "../context/global.context";
import { animateExploredNodes } from "../utils/animation/animate-exploration";
import { animateShortestPath } from "../utils/animation/animate-shortest-path";
import { constructShortestPath } from "../utils/animation/construct-shortest-path";

export default function Navigation() {
  const { numRows, numCols, startNode, targetNode, allNodes, setAllNodes } =
    useContext(GlobalContext);

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

    if (algorithms[id] === "aStar") {
      exploredNodes = aStar(numRows, numCols, startNode, targetNode, allNodes);
    }

    if (!exploredNodes) return;

    await animateExploredNodes(exploredNodes, allNodes, setAllNodes);

    const lastNode = exploredNodes.at(-1);

    if (!lastNode) return;

    const shortestPath = constructShortestPath(lastNode);
    animateShortestPath(shortestPath, allNodes, setAllNodes);
  };

  const handleClearGrid = () => {
    const copyOfAllNodes = { ...allNodes };
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const node = copyOfAllNodes[getStringRowAndCol(row, col)];
        node.distance = 0;
        node.isWall = false;
        node.visiting = false;
        node.visited = false;
        node.isCurrent = false;
        node.prevNode = null;
        node.isInShortestPath = false;
      }
    }

    setAllNodes(copyOfAllNodes);
  };

  const handleRandomMaze = () => {
    handleClearGrid();
    const copyOfAllNodes = { ...allNodes };
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const node = copyOfAllNodes[getStringRowAndCol(row, col)];
        if (node === startNode || node === targetNode) continue;
        node.isWall = Math.random() < 0.25;
      }
    }

    setAllNodes(copyOfAllNodes);
  };

  return (
    <nav className="bg-slate-600 text-lg min-h-53 mb-30">
      <div className="px-21 py-21 text-gray-300">Pathfinding Visualizer</div>
      {/* <button className="p-10 bg-sky-400 rounded-lg" onClick={handleVisualize}>
        VISUALIZE DIJKSTRA
      </button> */}
      <ul className="float-left pl-0 list-none flex flex-row">
        <li className="">
          <a
            className="text-lg px-15 py-21 leading-6"
            data-toggle="dropdown"
            href="#"
          >
            Algorithms
          </a>
          <ul className="dropdown-menu">
            <li className="navbar-inverse navbar-nav">
              <button onClick={() => handleVisualize("dijkstra")}>
                Dijkstra's Algorithm
              </button>
            </li>
            <li className="navbar-inverse navbar-nav">
              <button>Bellman-Ford Algorithm</button>
            </li>
            <li className="navbar-inverse navbar-nav">
              <button onClick={() => handleVisualize("aStar")}>
                A* Algorithm
              </button>
            </li>
            <li className="navbar-inverse navbar-nav">
              <button onClick={() => handleVisualize("depthFirstSearch")}>
                Depth-First Search
              </button>
            </li>
            <li className="navbar-inverse navbar-nav">
              <button onClick={() => handleVisualize("breadthFirstSearch")}>
                Breadth-First Search
              </button>
            </li>
          </ul>
        </li>
        <li className="">
          {" "}
          <button
            className="p-10 bg-sky-400 rounded-lg"
            onClick={handleRandomMaze}
          >
            Mazes & Patterns
          </button>
        </li>
        <li className="">Add Bomb</li>
        <li className="">Visualize!</li>
        <li className="">
          <button
            className="p-10 bg-sky-400 rounded-lg"
            onClick={handleClearGrid}
          >
            CLEAR GRID
          </button>
        </li>
        <li className="">Clear Walls & Weights</li>
        <li className="">Clear Path</li>
        <li className="">Speed</li>
      </ul>
    </nav>
  );
}
