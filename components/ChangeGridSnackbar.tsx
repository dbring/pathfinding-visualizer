import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useContext, useEffect, useState } from "react";
import { algorithmInfo, gridActions } from "../constants/constants";
import { GlobalContext } from "../context/global.context";

export const ChangeGridSnackbar = () => {
  const { selectedGridAction } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, [selectedGridAction]);

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
          {gridActions[selectedGridAction]} successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};
