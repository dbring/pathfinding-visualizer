import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MouseEvent } from "react";

type TutorialPage6Props = {
  open: boolean;
  prevStep: () => void;
  handleClose: () => void;
};

export const TutorialPage6 = ({
  open,
  prevStep,
  handleClose,
}: TutorialPage6Props) => {
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
      <DialogTitle id="alert-dialog-title">{"Finished!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          I hope you have just as much fun playing around with this
          visualization tool as I had building it!
          <br />
          <br />
          If you want to see the source code for this application, check out my{" "}
          <a
            className="underline"
            href="https://github.com/dbring/pathfinding-visualizer"
          >
            GitHub
          </a>
          .
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={backward}>Previous</Button>
        <Button onClick={handleClose} autoFocus>
          Finish
        </Button>
      </DialogActions>
    </Dialog>
  );
};
