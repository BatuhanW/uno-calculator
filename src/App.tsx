import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Card from "./components/Card";
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

const Footer = styled.div`
  padding: 1.5rem;
  background-color: #fafafa;
  position: sticky;
  bottom: 0;
`;

interface RegisterUserForm {
  playerName: string;
}

export interface PlayerPoints {
  key: string;
  playerName: string;
  round: number;
  score: number;
}

function App() {
  const { handleSubmit, register, setValue } = useForm<RegisterUserForm>();
  const onSubmit = (values: RegisterUserForm) => {
    setPlayers((players) => [...players, values.playerName]);
    setValue("playerName", "");
  };
  const [players, setPlayers] = React.useState([
    "Player 1",
    "Player 2",
    "Player 3",
    "Player 4",
    "Player 5",
  ]);
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
          {round === 0 && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="field has-addons">
                <div className="control">
                  <input
                    className="input"
                    placeholder="Add new player"
                    type="text"
                    name="playerName"
                    ref={register({
                      required: "Required",
                      validate: (value) =>
                        players.findIndex(
                          (element) =>
                            element.toLowerCase() === value.toLowerCase()
                        ) === -1,
                    })}
                  />
                </div>
                <div className="control">
                  <input className="button is-primary block" type="submit" />
                </div>
              </div>
            </form>
          )}
          <div className="my-3" />
          <span>Player Count: {players.length}</span>
          <div className="my-3" />
          <span>
            Round: {round}
            <span className="mx-1" />
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
            Winner:{" "}
            {JSON.stringify(
              points.reduce((acc: { [key: string]: number }, cumm) => {
                return {
                  ...acc,
                  [cumm.playerName]: (acc[cumm.playerName] || 0) + cumm.score,
                };
              }, {})
            )}
          </div>
        </div>
      </Footer>
    </Container>
  );
}

export default App;
