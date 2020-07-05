import { atom } from "recoil";
import { PlayerPoints } from "../App";

export const playersState = atom<string[]>({ key: "players", default: [] });

export const roundState = atom<number>({ key: "round", default: 0 });

export const pointsState = atom<PlayerPoints[]>({
  key: "points",
  default: [],
});

export const stateMap = {
  players: playersState,
  round: roundState,
  points: pointsState,
};
