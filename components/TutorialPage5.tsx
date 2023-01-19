import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MouseEvent } from "react";

type TutorialPage5Props = {
  open: boolean;
  prevStep: () => void;
  nextStep: () => void;
  handleClose: () => void;
};

export const TutorialPage5 = ({
  open,
  prevStep,
  nextStep,
  handleClose,
}: TutorialPage5Props) => {
  const forward = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    nextStep();
  };
  const backward = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    prevStep();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Visualizing and More"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Use the navigation bar buttons to visualize algorithms and do other
          things!
          <br />
          <br />
          You can clear the current path or clear the entire grid, all from the
          navigation bar.
          <br />
          <br />
          If you want to access this tutorial again, click on the "?" in the
          bottom right corner of your screen.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={backward}>Previous</Button>
        <Button onClick={forward} autoFocus>
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
};
