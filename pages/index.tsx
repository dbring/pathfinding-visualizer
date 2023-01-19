import type { NextPage } from "next";
import Head from "next/head";
import { AlertBar } from "../components/AlertBar";
import { AlgorithmConfirmationSnackbar } from "../components/AlgorithmConfirmationSnackbar";
import { FloatingTutorial } from "../components/FloatingTutorial";
import { Grid } from "../components/Grid";
import { Legend } from "../components/Legend";
import Navigation from "../components/Navigation";
import { TutorialModal } from "../components/TutorialModal";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Pathfinding Visualizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Navigation />
        <Legend />
        <AlertBar />
        <Grid />
        <AlgorithmConfirmationSnackbar />
        <TutorialModal />
        <FloatingTutorial />
      </main>

      <footer className="flex h-24 w-full items-center justify-center"></footer>
    </div>
  );
};

export default Home;
