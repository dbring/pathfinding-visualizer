import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useContext, useEffect, useState } from "react";
import { gridActions } from "../constants/constants";
import { GlobalContext } from "../context/global.context";

export const ChangeGridSnackbar = () => {
  const { selectedGridAction } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedGridAction.length) setOpen(true);
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
      <Snackbar open={open} onClose={handleClose} autoHideDuration={6000}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {gridActions[selectedGridAction]} successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};
