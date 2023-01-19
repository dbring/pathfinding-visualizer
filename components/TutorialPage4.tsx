import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MouseEvent } from "react";

type TutorialPage4Props = {
  open: boolean;
  prevStep: () => void;
  nextStep: () => void;
  handleClose: () => void;
};

export const TutorialPage4 = ({
  open,
  prevStep,
  nextStep,
  handleClose,
}: TutorialPage4Props) => {
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
        {"Adding Walls and Weights"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Click on the grid to add a wall or generate a maze from the "Mazes"
          drop-down menu.
          <br />
          <br />
          Walls are impenetrable, meaning that a path cannot cross through them.
          Weights, however, are not impassable. They are simply more "costly" to
          move through. In this application, moving through a weight node has a
          "cost" of 15.
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
