import React from 'react';
import styles from './Toast.module.scss';
import infoIcon from '../../assets/info.svg'
import closeIcon from '../../assets/close.svg'

function Toast(props) {
  if (!props.message) {
    return null;
  }

  function close() {
    clearTimeout(timeout);
    props.onClose();
  }

  const timeout = setTimeout(() => close(), 5000);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.frame}>
          <img className={styles.img} src={infoIcon} alt="info" />
          <span className={styles.message}>{ props.message }</span>
          <button className={styles.close} onClick={close}>
            <img className={styles.closeImg} src={closeIcon} alt="sluiten" />
          </button>
        </div>
        <div className={styles.timer} />
      </div>
    </div>
  );
}

export default Toast;
