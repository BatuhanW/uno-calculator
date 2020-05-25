import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Card from "./components/Card";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  height: 100vh;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  overflow: scroll;
`;

const BottomContainer = styled.div`
  background-color: #13b4ff;
  position: sticky;
  bottom: 0;
  padding: 20px 15px;
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
  const [players, setPlayers] = React.useState(["Player 1"]);
  const [round, setRound] = React.useState(0);
  const [points, setPoints] = React.useState<PlayerPoints[]>([]);

  return (
    <Container>
      <CardsContainer>
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
      <BottomContainer>
        <div>Player Count: {players.length}</div>
        <div>
          Round: {round} ||{" "}
          <button
            onClick={() => {
              if (round > 0) {
                setRound((round) => round - 1);
              }
            }}
          >
            -
          </button>{" "}
          ||{" "}
          <button
            onClick={() => {
              setRound((round) => round + 1);
            }}
          >
            +
          </button>
        </div>
        <div>
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
        {round === 0 && (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              Add new player
              <input
                type="text"
                name="playerName"
                ref={register({
                  required: "Required",
                  validate: (value) =>
                    players.findIndex(
                      (element) => element.toLowerCase() === value.toLowerCase()
                    ) === -1,
                })}
              />
              <input type="submit" />
            </form>
          </div>
        )}
      </BottomContainer>
    </Container>
  );
}

export default App;
