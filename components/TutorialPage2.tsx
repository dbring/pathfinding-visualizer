import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MouseEvent } from "react";

type TutorialPage2Props = {
  open: boolean;
  prevStep: () => void;
  nextStep: () => void;
  handleClose: () => void;
};

export const TutorialPage2 = ({
  open,
  prevStep,
  nextStep,
  handleClose,
}: TutorialPage2Props) => {
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
        {"What is a Pathfinding Algorithm?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          At its core, a pathfinding algorithm seeks to find the shortest path
          between two nodes in a graph. This application visualizes various
          pathfinding algorithms in action, and more!
          <br />
          <br />
          All of the algorithms on this application are adapted for a 2D grid,
          where movements from one grid cell to another have a "cost" of 1.
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
