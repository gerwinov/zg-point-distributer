import React from 'react';

import styles from './Slider.module.scss';

function Slider(props) {
  return (
    <input
      type="range"
      id={props.id}
      className={styles.slider}
      name={props.name}
      min="0"
      max="5"
      step="1"
      defaultValue="0"
      onChange={props.onChange} />
  );
}

export default Slider;
