import React from 'react';

import styles from './FixedMessage.module.scss';

function Slider(props) {
  return (
    <div className={styles.fixed}>
      {props.content}
    </div>
  );
}

export default Slider;
