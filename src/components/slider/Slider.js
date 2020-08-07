import React from 'react';
import styles from './Slider.module.scss';

function Slider(props) {
    function handleInput(e) {
      props.onInput(props.name, parseInt(e.target.value, 10));
    }

    return (
      <div>
        <label htmlFor={`slider-${props.name}`}><strong>{props.name}</strong></label>
        <p className={styles.description}>{props.description}</p>
        0 <input
          type="range"
          id={`slider-${props.name}`}
          className={styles.slider}
          name={`slider-${props.name}`}
          min="0"
          max={props.max}
          step={props.max / 5}
          defaultValue="0"
          onChange={handleInput} /> {props.max}
      </div>
    );
}

export default Slider;
