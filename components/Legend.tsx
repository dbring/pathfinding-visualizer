export const Legend = () => {
  return (
    <div className="flex flex-row space-x-8 my-5 justify-center">
      <div className="flex flex-row space-x-2">
        <div className="legend-start"></div>
        <div>Start Node</div>
      </div>
      <div className="flex flex-row space-x-2">
        <div className="legend-target"></div>
        <div>Target Node</div>
      </div>
      <div className="flex flex-row space-x-2">
        <div className="legend-unvisited"></div>
        <div>Unvisited/Passage Node</div>
      </div>
      <div className="flex flex-row space-x-2">
        <div className="legend-visited"></div> <div>Visited Node</div>
      </div>
      <div className="flex flex-row space-x-2">
        <div className="legend-wall"></div> <div>Wall Node</div>
      </div>
      <div className="flex flex-row space-x-2">
        <div className="legend-shortest-path"></div>{" "}
        <div>Shortest Path Node</div>
      </div>
    </div>
  );
};
