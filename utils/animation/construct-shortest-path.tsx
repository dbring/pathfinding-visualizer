import { GridNode } from "../../types/types";

export const constructShortestPath = (targetNode: GridNode) => {
  const shortestPathReverse: GridNode[] = [];

  let currentNode = targetNode;

  while (currentNode) {
    shortestPathReverse.push(currentNode);

    if (!currentNode.prevNode) break;

    currentNode = currentNode.prevNode;
  }

  const shortestPath = shortestPathReverse.reverse();

  return shortestPath;
};
