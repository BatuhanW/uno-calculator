import React, { useMemo } from "react";
import styled from "styled-components";
import Card from "./components/Card";
import "bulma/css/bulma.css";
import PlayerForm from "./components/PlayerForm";

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

const Footer = styled.div`
  padding: 1.5rem;
  background-color: #fafafa;
  position: sticky;
  bottom: 0;
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
  const pointsChart = useMemo(
    () =>
      points.reduce((acc: { [key: string]: number }, cumm) => {
        return {
          ...acc,
          [cumm.playerName]: (acc[cumm.playerName] || 0) + cumm.score,
        };
      }, {}),
    [points]
  );

  const topScore = Object.values(pointsChart).sort((a, b) => b - a)[0];

  return (
    <Container>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">UNO Calculator</h1>
          </div>
        </div>
      </section>
      <div>
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
      </div>
      <Footer className="is-family-monospace is-size-5">
        <div className="content">
          {round === 0 && <PlayerForm players={players} setPlayers={setPlayers} />}
          <div className="my-3" />
          <span>Player Count: {players.length}</span>
          <div className="my-3" />
          <span>
            Round: {round}
            <span className="mx-1" />
            {round > 0 && (
              <button
                className="button is-primary is-small"
                onClick={() => {
                  if (round > 0) {
                    setRound((round) => round - 1);
                  }
                }}
              >
                {"<< previous round"}
              </button>
            )}
            <span className="mx-1" />
            {players.length > 1 && (
              <button
                className="button is-primary is-small"
                onClick={() => {
                  setRound((round) => round + 1);
                }}
              >
                {"next round >>"}
              </button>
            )}
          </span>
          <div className="mt-3">
            {pointsChart &&
              Object.keys(pointsChart).map((playerName) => (
                <div key={`player-${playerName}`}>
                  <span className="is-size-6">{playerName}</span>
                  <progress
                    className="progress is-success is-small"
                    value={pointsChart[playerName]}
                    max={topScore}
                  >
                    playerName
                  </progress>
                </div>
              ))}
          </div>
        </div>
      </Footer>
    </Container>
  );
}

export default App;
