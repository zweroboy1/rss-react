import React from 'react';
import styles from './Message.module.scss';

interface MessageProps {
  message: string;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return <div className={styles['message']}>{message}</div>;
};

export default Message;
