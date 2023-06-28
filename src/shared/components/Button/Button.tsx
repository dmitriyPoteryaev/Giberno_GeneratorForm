import React from "react";

export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
  loading?: boolean;
  ButtonClass: any;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, disabled, ButtonClass, ...rest } = props;

  return (
    <ButtonClass disabled={disabled} {...rest}>
      {children}
    </ButtonClass>
  );
};

export default Button;
