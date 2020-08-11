import React from 'react';
import styles from './Toast.module.scss';
import infoIcon from '../../assets/info.svg'
import closeIcon from '../../assets/close.svg'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.onClose(this.props.message);
  }

  componentDidMount() {
    if (this.props.timer) {
      this.timeout = setTimeout(() => this.close(), 5000);
    }
  }

  componentWillUnmount() {
    if (this.props.timer) {
      clearTimeout(this.timeout);
      this.timeout = 0;
    }
  }

  render() {
    let className = cx({
      container: true,
      triangle: this.props.triangleAbove,
    });

    return (
      <div className={className}>
        <div className={styles.frame}>
          <img className={styles.img} src={infoIcon} alt="info" />
          <span className={styles.message}>{ this.props.message }</span>
          <button className={styles.close} onClick={this.close}>
            <img className={styles.closeImg} src={closeIcon} alt="sluiten" />
          </button>
        </div>
        {this.props.timer && <div className={styles.timer} /> }
      </div>
    );
  }
}

export default Toast;
