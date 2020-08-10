import React from 'react';
import styles from './Toast.module.scss';
import infoIcon from '../../assets/info.svg'
import closeIcon from '../../assets/close.svg'

class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.onClose(this.props.message);
  }

  componentDidMount() {
    this.timeout = setTimeout(() => this.close(), 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = 0;
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          <div className={styles.frame}>
            <img className={styles.img} src={infoIcon} alt="info" />
            <span className={styles.message}>{ this.props.message }</span>
            <button className={styles.close} onClick={this.close}>
              <img className={styles.closeImg} src={closeIcon} alt="sluiten" />
            </button>
          </div>
          <div className={styles.timer} />
        </div>
      </div>
    );
  }
}

export default Toast;
