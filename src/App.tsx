import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { playersState } from "./atoms/states";

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
  const [points, setPoints] = React.useState<PlayerPoints[]>([]);

  return (
    <Container>
      <Hero />
      <CardsContainer className="px-5">
        {players.map((player) => (
          <Card
            key={player}
            player={player}
            playerPoints={points.filter(
              (playerPoints) => playerPoints.playerName === player
            )}
            setPoints={setPoints}
          />
        ))}
      </CardsContainer>
      <Footer points={points} />
    </Container>
  );
}

export default App;
