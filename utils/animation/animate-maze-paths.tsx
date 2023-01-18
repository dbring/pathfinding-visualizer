import { getStringRowAndCol } from "../../pathfinding-algorithms/dijkstra";
import { AllNodes, Node } from "../../types/types";
import { timer } from "./animate-shortest-path";

export const animateMazePaths = async (
  pathNodes: Node[],
  allNodes: AllNodes,
  setAllNodes: (allNodes: AllNodes) => void
) => {
  const animateTimeout = async () => {
    for (const node of pathNodes) {
      const { row, col } = node;
      const copyAllNodes = { ...allNodes };

      if (!copyAllNodes[getStringRowAndCol(row, col)]) return;

      copyAllNodes[getStringRowAndCol(row, col)].isCurrent = true;
      setAllNodes(copyAllNodes);

      await timer(0);

      const newCopyOfAllNodes = { ...allNodes };
      newCopyOfAllNodes[getStringRowAndCol(row, col)].isCurrent = false;
      newCopyOfAllNodes[getStringRowAndCol(row, col)].isWall = false;
      setAllNodes(newCopyOfAllNodes);
    }
  };

  await animateTimeout();
};