import { useContext } from "react";
import { GlobalContext } from "../context/global.context";
import { Node } from "./Node";

export const Grid = () => {
  const { numRows, numCols, startNode, targetNode } = useContext(GlobalContext);

  const rowArray = new Array(numRows).fill(0);
  const colArray = new Array(numCols).fill(0);
  const { row: startRow, col: startCol } = startNode;
  const { row: targetRow, col: targetCol } = targetNode;

  return (
    <table className="table-fixed bg-slate-400">
      <tbody>
        {rowArray.map((_, i) => {
          return (
            <tr key={i} className="bg-slate-600">
              {colArray.map((_, j) => (
                <td key={j} className="border border-slate-300">
                  <Node
                    key={`${i}-${j}`}
                    row={i}
                    col={j}
                    isStart={startRow === i && startCol === j}
                    isTarget={targetRow === i && targetCol === j}
                  />
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
