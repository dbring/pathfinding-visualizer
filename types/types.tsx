export class GridNode {
  row: number;
  col: number;
  distance: number;
  heuristic: number;
  aStarDistance: number;
  isWall: boolean;
  visiting: boolean;
  visited: boolean;
  isCurrent: boolean;
  prevNode: GridNode | null;
  isInShortestPath: boolean;
  weight: number;

  constructor(
    row: number,
    col: number,
    distance = 0,
    heuristic = 0,
    aStarDistance = 0,
    isWall = false,
    visiting = false,
    visited = false,
    isCurrent = false,
    prevNode = null,
    isInShortestPath = false,
    weight = 0
  ) {
    this.row = row;
    this.col = col;
    this.distance = distance;
    this.heuristic = heuristic;
    this.aStarDistance = aStarDistance;
    this.isWall = isWall;
    this.visited = visited;
    this.visiting = visiting;
    this.isCurrent = isCurrent;
    this.prevNode = prevNode;
    this.isInShortestPath = isInShortestPath;
    this.weight = weight;
  }
}

export interface AllNodes {
  [index: string]: GridNode;
}
