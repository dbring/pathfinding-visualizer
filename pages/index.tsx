import type { NextPage } from "next";
import Head from "next/head";
import { AlertBar } from "../components/AlertBar";
import { AlgorithmConfirmationSnackbar } from "../components/AlgorithmConfirmationSnackbar";
import { Grid } from "../components/Grid";
import Navigation from "../components/Navigation";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Pathfinding Visualizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Navigation />
        <AlertBar />
        <Grid />
        <AlgorithmConfirmationSnackbar />
      </main>

      <footer className="flex h-24 w-full items-center justify-center"></footer>
    </div>
  );
};

export default Home;
