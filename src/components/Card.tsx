import React, { SetStateAction, Dispatch } from "react";
import styled from "styled-components";
import { PlayerPoints } from "../App";

interface CardProps {
  player: string;
  setPlayers: Dispatch<SetStateAction<string[]>>;
  playerPoints: PlayerPoints[];
  round: number;
  setPoints: Dispatch<SetStateAction<PlayerPoints[]>>;
}

const CardHeader = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const NumberInput = styled.input`
  font-size: inherit;
`;

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { player, setPlayers, playerPoints, round, setPoints } = props;

  return (
    <div className="card mb-5">
      <CardHeader className="card-header">
        <div>
          <p className="card-header-title">{player}</p>
        </div>
        <div>
          <div className="card-header-title">
            <button
              className="button is-danger is-small"
              onClick={() => {
                setPlayers((players) =>
                  players.filter((value) => value !== player)
                );
              }}
            >
              X
            </button>
          </div>
        </div>
      </CardHeader>
      <div className="card-content">
        <div className="subtitle">
          {playerPoints?.map((playerPoint) => (
            <div key={playerPoint.key}>
              Round {playerPoint.round}: <b>{playerPoint.score}</b>
            </div>
          ))}
        </div>

        {round > 0 && (
          <NumberInput
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={
              playerPoints.filter(
                (point) => point.key === `${player}-${round}`
              )[0]?.score ?? 0
            }
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const score = Number(event.target.value);

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
        <div className="card-footer">
          <div className="card-footer-item">
            Total Score:{" "}
            {playerPoints?.reduce((acc, curr) => acc + curr.score, 0) || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
