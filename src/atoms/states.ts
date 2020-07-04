import { atom } from "recoil";

export const playersState = atom<string[]>({ key: "players", default: [] });
