import React from "react";
import styled from "styled-components";
import Card from "./components/Card";
import "bulma/css/bulma.css";
import Footer from "./components/Footer";

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
  const [players, setPlayers] = React.useState<string[]>([]);
  const [round, setRound] = React.useState(0);
  const [points, setPoints] = React.useState<PlayerPoints[]>([]);

  return (
    <Container>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">UNO Calculator</h1>
          </div>
        </div>
      </section>
      <CardsContainer className="px-5">
        {players.map((player) => (
          <Card
            key={player}
            player={player}
            setPlayers={setPlayers}
            playerPoints={points.filter(
              (playerPoints) => playerPoints.playerName === player
            )}
            setPoints={setPoints}
            round={round}
          />
        ))}
      </CardsContainer>
      <Footer
        round={round}
        players={players}
        setRound={setRound}
        points={points}
        setPlayers={setPlayers}
      />
    </Container>
  );
}

export default App;
