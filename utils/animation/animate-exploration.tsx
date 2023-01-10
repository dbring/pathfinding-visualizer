import { getStringRowAndCol } from "../../algorithms/dijkstra";
import { AllNodes, Node } from "../../types/types";
import { timer } from "./animate-shortest-path";

export const animateExploredNodes = async (
  exploredNodes: Node[],
  allNodes: AllNodes,
  setAllNodes: (allNodes: AllNodes) => void
) => {
  const animateTimeout = async () => {
    for (const node of exploredNodes) {
      const { row, col } = node;
      const copyAllNodes = { ...allNodes };

      if (!copyAllNodes[getStringRowAndCol(row, col)]) return;

      copyAllNodes[getStringRowAndCol(row, col)].visited = true;
      setAllNodes(copyAllNodes);
      await timer(1);
    }
  };

  await animateTimeout();
};
