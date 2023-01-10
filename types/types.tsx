export interface Node {
  row: number;
  col: number;
  distance: number;
  isWall: boolean;
  visiting: boolean;
  visited: boolean;
  isCurrent: boolean;
  prevNode: Node | null;
  isInShortestPath: boolean;
}

export interface AllNodes {
  [index: string]: Node;
}
