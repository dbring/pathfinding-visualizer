import { AllNodes, GridNode } from "../../types/types";
import { getNode } from "../utility-functions/utility-functions";
import { timer } from "./animate-shortest-path";

export const animateMazePaths = async (
  pathNodes: GridNode[],
  allNodes: AllNodes,
  setAllNodes: (allNodes: AllNodes) => void
) => {
  const animateTimeout = async () => {
    for (const node of pathNodes) {
      const { row, col } = node;
      const copyAllNodes = { ...allNodes };

      if (!getNode(row, col, copyAllNodes)) return;

      getNode(row, col, copyAllNodes).isCurrent = true;
      setAllNodes(copyAllNodes);

      await timer(0);

      const newCopyOfAllNodes = { ...allNodes };
      getNode(row, col, newCopyOfAllNodes).isCurrent = false;
      getNode(row, col, newCopyOfAllNodes).isWall = false;
      setAllNodes(newCopyOfAllNodes);
    }
  };

  await animateTimeout();
};
