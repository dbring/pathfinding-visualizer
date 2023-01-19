import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MouseEvent } from "react";

type TutorialPage3Props = {
  open: boolean;
  prevStep: () => void;
  nextStep: () => void;
  handleClose: () => void;
};

export const TutorialPage3 = ({
  open,
  prevStep,
  nextStep,
  handleClose,
}: TutorialPage3Props) => {
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
        {"Picking An Algorithm"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Choose a pathfinding algorithm from the "Algorithms" drop-down menu,
          or a maze-generating algorithm from the "Mazes" drop-down menu.
          <br />
          <br />
          When you select an algorithm an information box will appear above the
          grid with information about the selected algorithm.
          <br />
          <br />
          Click the Visualize button in the navigation to start running the
          selected algorithm.
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
