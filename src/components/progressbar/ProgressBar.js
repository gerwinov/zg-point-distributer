import React from 'react';
import styles from './ProgressBar.module.scss';

function ProgressBar(props) {
    return (
      <div>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Verdeelde punten</h2>
          <label htmlFor="progressbar"><strong>{props.value}</strong>/<strong>{props.max}</strong> punten</label>
        </div>
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
