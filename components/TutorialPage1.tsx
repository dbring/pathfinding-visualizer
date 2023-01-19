import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MouseEvent } from "react";

type TutorialPage1Props = {
  open: boolean;
  nextStep: () => void;
  handleClose: () => void;
};

export const TutorialPage1 = ({
  open,
  nextStep,
  handleClose,
}: TutorialPage1Props) => {
  const forward = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    nextStep();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Welcome to Pathfinding Visualized!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This short tutorial will walk you through all of the features of this
          application.
          <br />
          <br />
          If you want to explore the app, feel free to press the "Skip Tutorial"
          button below. You can also click outside this pop-up anytime to close
          the tutorial.
          <br />
          <br />
          Otherwise, press "Next"!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Skip Tutorial</Button>
        <Button onClick={forward} autoFocus>
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
};
