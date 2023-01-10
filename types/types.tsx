export interface Node {
  row: number;
  col: number;
  distance: number;
  isWall: boolean;
  visited: boolean;
  isCurrent: boolean;
  prevNode: Node | null;
}

export interface AllNodes {
  [index: string]: Node;
}
