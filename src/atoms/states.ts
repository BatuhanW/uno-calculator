import { atom } from "recoil";

export const playersState = atom<string[]>({ key: "players", default: [] });

export const roundState = atom<number>({ key: "round", default: 0 });
