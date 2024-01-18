import React from "react";
import s from './Button.module.scss'

export const Button = ({ onClick, children }) => {
  return <button onClick={onClick} className={s.button}>{children}</button>;
};
