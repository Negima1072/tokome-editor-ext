import type { ButtonHTMLAttributes } from "react";
import styled from "./Button.module.scss";

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`${props.className || ""} ${styled.button}`}
    />
  );
};
