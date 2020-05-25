import React, { SetStateAction, Dispatch } from "react";
import styled from "styled-components";
import { PlayerPoints } from "../App";

const Container = styled.div`
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Section = styled.div`
  padding: 15px;
`;

interface CardProps {
  player: string;
  setPlayers: Dispatch<SetStateAction<string[]>>;
  playerPoints: PlayerPoints[];
  round: number;
  setPoints: Dispatch<SetStateAction<PlayerPoints[]>>;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { player, setPlayers, playerPoints, round, setPoints } = props;
  const [score, setScore] = React.useState<number | undefined>();
  React.useEffect(() => {
    console.log(round);
    setScore(undefined);
  }, [round]);

  return (
    <Container>
      <Section>{player}</Section>
      {playerPoints?.map((playerPoint) => (
        <div key={playerPoint.key}>
          Round {playerPoint.round}: <b>{playerPoint.score}</b>
        </div>
      ))}

      {round > 0 && (
        <input
          type="number"
          value={score || 0}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const score = Number(event.target.value);

            setScore(score);

            const newPoints: PlayerPoints = {
              key: `${player}-${round}`,
              playerName: player,
              score: score,
              round: round,
            };

            setPoints((existingPoints) => [
              ...existingPoints.filter((asd) => asd.key !== newPoints.key),
              newPoints,
            ]);
          }}
        />
      )}

      <br />
      <Section>
        Total Score:{" "}
        {playerPoints?.reduce((acc, curr) => acc + curr.score, 0) || 0}
      </Section>
      <button
        onClick={() => {
          setPlayers((players) => players.filter((value) => value !== player));
        }}
      >
        XXX
      </button>
    </Container>
  );
};

export default Card;
