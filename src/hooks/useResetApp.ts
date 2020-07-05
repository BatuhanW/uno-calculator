import { useResetRecoilState } from "recoil";
import { playersState, roundState, pointsState } from "../atoms/states";

export const useResetApp = () => {
  const playerReset = useResetRecoilState(playersState);
  const roundReset = useResetRecoilState(roundState);
  const pointsReset = useResetRecoilState(pointsState);

  return {
    reset() {
      playerReset();
      roundReset();
      pointsReset();
      localStorage.clear();
    },
  };
};
