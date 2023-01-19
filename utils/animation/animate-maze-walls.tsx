import { AllNodes, Node } from "../../types/types";
import { getNode } from "../utility-functions/utility-functions";
import { timer } from "./animate-shortest-path";

export const animateMazeWalls = async (
  wallNodes: Node[],
  allNodes: AllNodes,
  setAllNodes: (allNodes: AllNodes) => void
) => {
  const animateTimeout = async () => {
    for (const node of wallNodes) {
      const { row, col } = node;
      const copyAllNodes = { ...allNodes };

      if (!getNode(row, col, copyAllNodes)) return;

      getNode(row, col, copyAllNodes).isCurrent = true;
      setAllNodes(copyAllNodes);

      await timer(0);

      const newCopyOfAllNodes = { ...allNodes };
      getNode(row, col, newCopyOfAllNodes).isCurrent = false;
      getNode(row, col, newCopyOfAllNodes).isWall = true;
      setAllNodes(newCopyOfAllNodes);
    }
  };

  await animateTimeout();
};
