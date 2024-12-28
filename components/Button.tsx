import type { ButtonHTMLAttributes } from "react";
import styled from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorType?: "normal" | "blue" | "red";
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      type="button"
      {...props}
      className={`${props.className || ""} ${styled.button} ${styled[props.colorType || "normal"]}`.trim()}
    />
  );
};
