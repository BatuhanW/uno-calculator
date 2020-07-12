import React from "react";

import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";

import { PlayerPoints } from "../App";

import { playersState, roundState, pointsState } from "../atoms/states";

interface CardProps {
  player: string;
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
  const { player } = props;

  const round = useRecoilValue(roundState);
  const setPlayers = useSetRecoilState(playersState);
  const [points, setPoints] = useRecoilState(pointsState);

  const playerPoints = points.filter((pp) => pp.playerName === player);

  return (
    <div className="card mb-5">
      <CardHeader className="card-header">
        <div>
          <p className="card-header-title" data-cy="playerName">
            {player}
          </p>
        </div>
        <div>
          <div className="card-header-title">
            <button
              data-cy="removePlayer"
              className="button is-danger is-small"
              onClick={() => {
                setPlayers((players) =>
                  players.filter((value) => value !== player)
                );
                setPoints((points) =>
                  points.filter((value) => value.playerName !== player)
                );
              }}
            >
              X
            </button>
          </div>
        </div>
      </CardHeader>
      <div className="card-content">
        <div className="subtitle" data-cy="roundScore">
          {playerPoints?.map((playerPoint) => (
            <div key={playerPoint.key}>
              Round {playerPoint.round}: <b>{playerPoint.score}</b>
            </div>
          ))}
        </div>

        {round > 0 && (
          <NumberInput
            data-cy="scoreInput"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={
              playerPoints.filter(
                (point) => point.key === `${player}-${round}`
              )[0]?.score ?? ""
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
          <div className="card-footer-item" data-cy="totalScore">
            Total Score:{" "}
            {playerPoints?.reduce((acc, curr) => acc + curr.score, 0) || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
