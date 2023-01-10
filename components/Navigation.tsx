import { useContext } from "react";
import { dijkstra } from "../algorithms/dijkstra";
import { GlobalContext } from "../context/global.context";
import { animateExploredNodes } from "../utils/animation/animate-exploration";
import { animateShortestPath } from "../utils/animation/animate-shortest-path";
import { constructShortestPath } from "../utils/animation/construct-shortest-path";

export default function Navigation() {
  const { numRows, numCols, startNode, targetNode, allNodes, setAllNodes } =
    useContext(GlobalContext);

  const handleVisualize = async () => {
    const exploredNodes = dijkstra(
      numRows,
      numCols,
      startNode,
      targetNode,
      allNodes,
      setAllNodes
    );

    if (!exploredNodes) return;

    await animateExploredNodes(exploredNodes, allNodes, setAllNodes);

    const lastNode = exploredNodes.at(-1);

    if (!lastNode) return;

    const shortestPath = constructShortestPath(lastNode);
    animateShortestPath(shortestPath, allNodes, setAllNodes);
  };

  return (
    <nav className="bg-slate-600 text-lg min-h-53 mb-30">
      <div className="px-21 py-21 text-gray-300">Pathfinding Visualizer</div>
      <button className="p-10 bg-sky-400 rounded-lg" onClick={handleVisualize}>
        VISUALIZE DIJKSTRA
      </button>
      <ul className="float-left pl-0 list-none flex flex-row">
        <li className="">
          <a
            className="text-lg px-15 py-21 leading-6"
            data-toggle="dropdown"
            href="#"
          >
            Algorithms
          </a>
        </li>
        <li className="">Mazes & Patterns</li>
        <li className="">Add Bomb</li>
        <li className="">Visualize!</li>
        <li className="">Clear Grid</li>
        <li className="">Clear Walls & Weights</li>
        <li className="">Clear Path</li>
        <li className="">Speed</li>
      </ul>
    </nav>
  );
}
