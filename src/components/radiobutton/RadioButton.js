import React from 'react';
import styles from './RadioButton.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function RadioButton(props) {
  function handleInput() {
    props.onInput(props.value);
  }

  let className = cx({
    wrapper: true,
    checked: props.checked,
  });

  return (
    <div className={className}>
      <input
        type="radio"
        id={`${props.name}-${props.value}`}
        name={props.name}
        value={props.value}
        defaultChecked={props.checked}
        className={styles.input}
        onClick={handleInput} />
      <label htmlFor={`${props.name}-${props.value}`} className={styles.label}>
        <img className={styles.icon} src={props.icon} alt="peeps_logo" />
        <h2 className={styles.text}>{ props.displayValue }</h2>
        <span className={styles.circle} />
      </label>
    </div>
  );
}

export default RadioButton;
