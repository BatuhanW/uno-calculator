import React, { useMemo } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";

import { playersState, roundState } from "../atoms/states";
import PlayerForm from "./PlayerForm";
import { PlayerPoints } from "../App";
import RoundButton from "./RoundButton";

interface FooterProps {
  points: PlayerPoints[];
}

const Container = styled.div`
  padding: 1.5rem;
  background-color: #fafafa;
  position: sticky;
  bottom: 0;
`;

const Footer: React.FC<FooterProps> = ({ points }) => {
  const players = useRecoilValue(playersState);
  const [round, setRound] = useRecoilState(roundState);

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

  const topPlayers = Object.entries(pointsChart)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2);
  const topScore = topPlayers[topPlayers.length - 1]?.[1] | 0;

  return (
    <Container className="is-family-monospace is-size-5">
      <div className="content">
        {round === 0 && <PlayerForm />}
        <div className="my-3" />
        <span>Player Count: {players.length}</span>
        <div className="my-3" />
        <span>
          Round: {round}
          <span className="mx-1" />
          <RoundButton
            condition={round > 0}
            action={() => {
              if (round > 0) {
                setRound((round) => round - 1);
              }
            }}
            text={"<< previous round"}
          />
          <span className="mx-1" />
          <RoundButton
            condition={players.length > 1}
            action={() => {
              setRound((round) => round + 1);
            }}
            text={"next round >>"}
          />
        </span>
        <div className="mt-3">
          {pointsChart &&
            topPlayers
              .map((topPlayer) => topPlayer[0])
              .map((playerName) => (
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
    </Container>
  );
};

export default Footer;
