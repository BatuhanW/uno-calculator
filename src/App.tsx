import React from "react";
import { useRecoilValue, useRecoilTransactionObserver_UNSTABLE } from "recoil";
import styled from "styled-components";

import { playersState, roundState, pointsState } from "./atoms/states";

import Card from "./components/Card";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

import "bulma/css/bulma.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;

const CardsContainer = styled.div`
  overflow-y: scroll;
  padding-top: 3rem;
  padding-bottom: 15rem;
`;

export interface PlayerPoints {
  key: string;
  playerName: string;
  round: number;
  score: number;
}

function App() {
  const players = useRecoilValue(playersState);

  useRecoilTransactionObserver_UNSTABLE(({ snapshot, previousSnapshot }) => {
    const players = snapshot.getLoadable(playersState);
    const round = snapshot.getLoadable(roundState);
    const points = snapshot.getLoadable(pointsState);

    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("round", JSON.stringify(round));
    localStorage.setItem("points", JSON.stringify(points));
  });

  return (
    <Container>
      <Hero />
      <CardsContainer className="px-5">
        {players.map((player) => (
          <Card key={player} player={player} />
        ))}
      </CardsContainer>
      <Footer />
    </Container>
  );
}

export default App;
