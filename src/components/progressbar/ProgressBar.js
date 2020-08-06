import React from 'react';
import styles from './ProgressBar.module.scss';

function ProgressBar(props) {
    return (
      <div>
        <label for="progressbar">Punten: <strong>{props.value}</strong>/<strong>{props.max}</strong></label>
        <progress
          id="progressbar"
          className={styles.progressbar}
          name="progressbar"
          max={props.max}
          value={props.value}/>
      </div>
    );
}

export default ProgressBar;
