import React, { useRef } from "react";

import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { playersState } from "../atoms/states";

interface PlayerFormProps {}

interface RegisterUserForm {
  playerName: string;
}

const PlayerForm: React.FC<PlayerFormProps> = () => {
  const [players, setPlayers] = useRecoilState(playersState);

  const { handleSubmit, register, setValue } = useForm<RegisterUserForm>();
  const onSubmit = (values: RegisterUserForm) => {
    setPlayers((oldPlayers) => [...oldPlayers, values.playerName]);
    setValue("playerName", "");
    playerNameRef.current?.focus();
  };
  const playerNameRef = useRef<HTMLInputElement>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            placeholder="Add new player"
            type="text"
            name="playerName"
            ref={(e: HTMLInputElement) => {
              register(e, {
                required: "Required",
                validate: (value) =>
                  players.findIndex(
                    (element) => element.toLowerCase() === value.toLowerCase()
                  ) === -1,
              });
              playerNameRef.current = e;
            }}
          />
        </div>
        <div className="control">
          <input className="button is-primary block" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default PlayerForm;
