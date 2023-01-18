import { getStringRowAndCol } from "../../pathfinding-algorithms/dijkstra";
import { AllNodes, Node } from "../../types/types";

export const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const animateShortestPath = async (
  shortestPath: Node[],
  allNodes: AllNodes,
  setAllNodes: (allNodes: AllNodes) => void
) => {
  const animateTimeout = async () => {
    for (const node of shortestPath) {
      const { row, col } = node;
      const copyAllNodes = { ...allNodes };

      if (!copyAllNodes[getStringRowAndCol(row, col)]) return;

      copyAllNodes[getStringRowAndCol(row, col)].isInShortestPath = true;
      setAllNodes(copyAllNodes);
      await timer(0);
    }
  };

  await animateTimeout();
};
