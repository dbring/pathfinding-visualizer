import { createContext, useEffect, useState } from "react";
import { CELL_SIZE } from "../constants/constants";
import { Node } from "../types/types";

interface IGlobal {
  numRows: number;
  numCols: number;
  startNode: Node;
  targetNode: Node;
}

export const GlobalContext = createContext<IGlobal>({
  numRows: 0,
  numCols: 0,
  startNode: {},
  targetNode: {},
});

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [startNode, setStartNode] = useState<Node>({});
  const [targetNode, setTargetNode] = useState<Node>({});
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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
    setStartNode({ row: startRow, col: startCol });

    const targetRow = Math.floor(Math.random() * numRows);
    const targetCol = Math.floor(numCols / 2 + (Math.random() * numCols) / 2);
    setTargetNode({ row: targetRow, col: targetCol });
  }, [numRows, numCols]);

  return (
    <GlobalContext.Provider value={{ numRows, numCols, startNode, targetNode }}>
      {children}
    </GlobalContext.Provider>
  );
};
