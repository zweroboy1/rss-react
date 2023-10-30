import { Component } from 'react';
import styles from './Message.module.scss';

interface MessageProps {
  message: string;
}

class Message extends Component<MessageProps> {
  render() {
    return <div className={styles['message']}>{this.props.message}</div>;
  }
}

export default Message;
