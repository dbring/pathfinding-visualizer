import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useContext } from "react";
import { algorithmInfo } from "../constants/constants";
import { GlobalContext } from "../context/global.context";

export const AlertBar = () => {
  const { selectedAlgorithm } = useContext(GlobalContext);
  if (!selectedAlgorithm.length) return <></>;
  const { title, description } = algorithmInfo[selectedAlgorithm];

  return (
    <Alert severity="info">
      <AlertTitle>{title}</AlertTitle>
      {description}
    </Alert>
  );
};
