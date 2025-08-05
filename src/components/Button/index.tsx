import './index.css';
import React from 'react';

type TProps = {
  children: React.ReactNode;
} & React.HTMLProps<HTMLButtonElement>;

const Button: React.FC<TProps> = ({ children, ...props }) => {
  return (
    <button {...props} id="change-scene" type="button">
      {children}
    </button>
  );
};

export default Button;
