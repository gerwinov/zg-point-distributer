import React from 'react';
import styles from './RadioButton.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class RadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput() {
    this.props.onInput(this.props.value);
  }

  render() {
    let className = cx({
      wrapper: true,
      checked: this.props.checked,
    });

    return (
      <div className={className}>
        <input
          type="radio"
          id={`${this.props.name}-${this.props.value}`}
          name={this.props.name}
          value={this.props.value}
          defaultChecked={this.props.checked}
          className={styles.input}
          onClick={this.handleInput} />
        <label htmlFor={`${this.props.name}-${this.props.value}`} className={styles.label}>
          <img className={styles.icon} src={this.props.icon} alt="peeps_logo" />
          <h2 className={styles.text}>{ this.props.displayValue }</h2>
          <span className={styles.circle} />
        </label>
      </div>
    );
  }
}

export default RadioButton;
