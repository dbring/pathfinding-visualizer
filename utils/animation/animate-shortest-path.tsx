import { AllNodes, GridNode } from "../../types/types";
import { getNode } from "../utility-functions/utility-functions";

export const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const animateShortestPath = async (
  shortestPath: GridNode[],
  allNodes: AllNodes,
  setAllNodes: (allNodes: AllNodes) => void
) => {
  const animateTimeout = async () => {
    for (const node of shortestPath) {
      const { row, col } = node;
      const copyAllNodes = { ...allNodes };

      if (!getNode(row, col, copyAllNodes)) return;

      getNode(row, col, copyAllNodes).isInShortestPath = true;
      setAllNodes(copyAllNodes);
      await timer(0);
    }
  };

  await animateTimeout();
};
