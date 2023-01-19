import { useContext, useState } from "react";
import { GlobalContext } from "../context/global.context";
import { TutorialPage1 } from "./TutorialPage1";
import { TutorialPage2 } from "./TutorialPage2";
import { TutorialPage3 } from "./TutorialPage3";
import { TutorialPage4 } from "./TutorialPage4";
import { TutorialPage5 } from "./TutorialPage5";
import { TutorialPage6 } from "./TutorialPage6";

export const TutorialModal = () => {
  const { isTutorialOpen, setIsTutorialOpen } = useContext(GlobalContext);
  const [step, setStep] = useState(1);

  const prevStep = () => {
    const prev = step - 1;
    setStep(prev);
  };

  const nextStep = () => {
    const next = step + 1;
    setStep(next);
  };

  const handleClose = () => {
    setStep(1);
    setIsTutorialOpen(false);
  };

  switch (step) {
    case 1:
      return (
        <TutorialPage1
          open={isTutorialOpen}
          nextStep={nextStep}
          handleClose={handleClose}
        />
      );
    case 2:
      return (
        <TutorialPage2
          open={isTutorialOpen}
          prevStep={prevStep}
          nextStep={nextStep}
          handleClose={handleClose}
        />
      );
    case 3:
      return (
        <TutorialPage3
          open={isTutorialOpen}
          prevStep={prevStep}
          nextStep={nextStep}
          handleClose={handleClose}
        />
      );
    case 4:
      return (
        <TutorialPage4
          open={isTutorialOpen}
          prevStep={prevStep}
          nextStep={nextStep}
          handleClose={handleClose}
        />
      );
    case 5:
      return (
        <TutorialPage5
          open={isTutorialOpen}
          prevStep={prevStep}
          nextStep={nextStep}
          handleClose={handleClose}
        />
      );
    case 6:
      return (
        <TutorialPage6
          open={isTutorialOpen}
          prevStep={prevStep}
          handleClose={handleClose}
        />
      );
    default:
      return <></>;
  }
};
