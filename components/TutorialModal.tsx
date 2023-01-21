import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MobileStepper,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import tutorialPage1Image from "../assets/tutorial-1.jpeg";
import { tutorialStepData } from "../constants/constants";
import { GlobalContext } from "../context/global.context";

export const TutorialModal = () => {
  console.log(tutorialPage1Image);
  const { isTutorialOpen, setIsTutorialOpen } = useContext(GlobalContext);
  const [step, setStep] = useState(0);
  const theme = useTheme();

  const prevStep = () => {
    const prev = step - 1;
    setStep(prev);
  };

  const nextStep = () => {
    const next = step + 1;
    setStep(next);
  };

  const handleClose = () => {
    setStep(0);
    setIsTutorialOpen(false);
  };

  return (
    <Dialog
      open={isTutorialOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {tutorialStepData.filter((_, index) => index === step)[0].title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {tutorialStepData.filter((_, index) => index === step)[0].description}

          {tutorialStepData.filter((_, index) => index === step)[0].image}
        </DialogContentText>
      </DialogContent>

      <MobileStepper
        variant="dots"
        steps={6}
        position="static"
        activeStep={step}
        nextButton={
          step === 5 ? (
            <Button size="small" onClick={handleClose}>
              Finish Tutorial
              <KeyboardArrowRight />
            </Button>
          ) : (
            <Button size="small" onClick={nextStep}>
              Next
              <KeyboardArrowRight />
            </Button>
          )
        }
        backButton={
          <Button size="small" onClick={prevStep} disabled={step === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Dialog>
  );
};
