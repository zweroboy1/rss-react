import React, { Component, ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

class Button extends Component<MyButtonProps> {
  render() {
    const { children, ...props } = this.props;
    return (
      <button {...props} className={styles.button}>
        {children}
      </button>
    );
  }
}

export default Button;
