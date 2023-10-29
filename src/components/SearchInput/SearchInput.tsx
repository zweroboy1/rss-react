import React, { Component } from 'react';
import styles from './SearchInput.module.scss';

type Props = {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getInputValue: () => void;
};

class SearchInput extends Component<Props> {
  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.props.getInputValue();
    }
  };

  render() {
    return (
      <input
        className={styles.search}
        type="text"
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.props.onChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default SearchInput;
