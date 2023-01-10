import { createContext, useEffect, useState } from "react";
import { CELL_SIZE } from "../constants/constants";
import { AllNodes, Node } from "../types/types";

interface IGlobal {
  numRows: number;
  numCols: number;
  startNode: Node;
  targetNode: Node;
  allNodes: AllNodes;
  setAllNodes: (newNodes: AllNodes) => void;
}

const initialNode: Node = {
  row: 0,
  col: 0,
  distance: 0,
  isWall: false,
  visited: false,
  visiting: false,
  isCurrent: false,
  prevNode: null,
  isInShortestPath: false,
};

export const GlobalContext = createContext<IGlobal>({
  numRows: 0,
  numCols: 0,
  startNode: initialNode,
  targetNode: initialNode,
  allNodes: {},
  setAllNodes: () => {},
});

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [startNode, setStartNode] = useState<Node>(initialNode);
  const [targetNode, setTargetNode] = useState<Node>(initialNode);
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [allNodes, setAllNodes] = useState({});

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    setWidth(innerWidth);
    setHeight(innerHeight);
  }, []);

  useEffect(() => {
    setNumRows(Math.floor(height / CELL_SIZE));
    setNumCols(Math.floor(width / CELL_SIZE));
  }, [width, height]);

  useEffect(() => {
    const startRow = Math.floor(Math.random() * numRows);
    const startCol = Math.floor((Math.random() * numCols) / 2);
    setStartNode({
      row: startRow,
      col: startCol,
      distance: 0,
      isWall: false,
      visited: false,
      visiting: false,
      isCurrent: false,
      prevNode: null,
      isInShortestPath: false,
    });

    const targetRow = Math.floor(Math.random() * numRows);
    const targetCol = Math.floor(numCols / 2 + (Math.random() * numCols) / 2);
    setTargetNode({
      row: targetRow,
      col: targetCol,
      distance: 0,
      isWall: false,
      visited: false,
      visiting: false,
      isCurrent: false,
      prevNode: null,
      isInShortestPath: false,
    });

    const listOfAllNodes: AllNodes = {};
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        listOfAllNodes[`${row},${col}`] = {
          row: parseInt(`${row}`),
          col: parseInt(`${col}`),
          distance: 0,
          isWall: false,
          visited: false,
          visiting: false,
          isCurrent: false,
          prevNode: null,
          isInShortestPath: false,
        };
      }
    }
    setAllNodes(listOfAllNodes);
  }, [numRows, numCols]);

  return (
    <GlobalContext.Provider
      value={{ numRows, numCols, startNode, targetNode, allNodes, setAllNodes }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
