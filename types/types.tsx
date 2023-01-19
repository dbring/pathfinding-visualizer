export interface Node {
  row: number;
  col: number;
  distance: number;
  heuristic: number;
  aStarDistance: number;
  isWall: boolean;
  visiting: boolean;
  visited: boolean;
  isCurrent: boolean;
  prevNode: Node | null;
  isInShortestPath: boolean;
  weight: number;
}

export interface AllNodes {
  [index: string]: Node;
}
