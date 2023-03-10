import { QuestionMark } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { useContext } from "react";
import { GlobalContext } from "../context/global.context";

export const FloatingTutorial = () => {
  const { setIsTutorialOpen } = useContext(GlobalContext);

  const handleClick = () => {
    setIsTutorialOpen(true);
  };

  return (
    <Box
      sx={{ "& > :not(style)": { m: 1 } }}
      className="fixed bottom-5 right-5"
      onClick={handleClick}
    >
      <Fab color="info" aria-label="add" className="bg-[#0863a9]">
        <QuestionMark />
      </Fab>
    </Box>
  );
};
