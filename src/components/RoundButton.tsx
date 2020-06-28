import React from "react";

interface RoundButtonProps {
  condition: boolean;
  action: () => void;
  text: string;
}

const RoundButton: React.FC<RoundButtonProps> = ({
  condition,
  action,
  text,
}) => {
  return condition ? (
    <button className="button is-primary is-small" onClick={action}>
      {text}
    </button>
  ) : (
    <span />
  );
};

export default RoundButton;
