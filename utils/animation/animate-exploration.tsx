import { AllNodes, GridNode } from "../../types/types";
import { getNode } from "../utility-functions/utility-functions";
import { timer } from "./animate-shortest-path";

export const animateExploredNodes = async (
  exploredNodes: GridNode[],
  allNodes: AllNodes,
  setAllNodes: (allNodes: AllNodes) => void
) => {
  const animateTimeout = async () => {
    for (const node of exploredNodes) {
      const { row, col } = node;
      const copyAllNodes = { ...allNodes };

      if (!getNode(row, col, copyAllNodes)) return;

      getNode(row, col, copyAllNodes).isCurrent = true;
      setAllNodes(copyAllNodes);

      await timer(0);

      const newCopyOfAllNodes = { ...allNodes };
      getNode(row, col, newCopyOfAllNodes).isCurrent = false;
      getNode(row, col, newCopyOfAllNodes).visited = true;
      setAllNodes(newCopyOfAllNodes);
    }
  };

  await animateTimeout();
};
