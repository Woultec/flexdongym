import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  ...rest
}) => {
  return (
    <button className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
