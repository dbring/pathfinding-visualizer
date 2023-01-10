import { Node } from "../../types/types";

export const constructShortestPath = (targetNode: Node) => {
  const shortestPathReverse: Node[] = [];

  let currentNode = targetNode;

  while (currentNode) {
    shortestPathReverse.push(currentNode);

    if (!currentNode.prevNode) break;

    currentNode = currentNode.prevNode;
  }

  const shortestPath = shortestPathReverse.reverse();

  return shortestPath;
};
