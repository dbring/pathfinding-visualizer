import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useContext, useEffect, useState } from "react";
import { algorithmInfo } from "../constants/constants";
import { GlobalContext } from "../context/global.context";

export const AlgorithmConfirmationSnackbar = () => {
  const { loading, selectedAlgorithm } = useContext(GlobalContext);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (loading) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [loading]);

  if (!selectedAlgorithm.length) return <></>;

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {algorithmInfo[selectedAlgorithm].title} is running!
        </Alert>
      </Snackbar>
    </div>
  );
};
