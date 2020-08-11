import React from 'react';
import classNames from 'classnames/bind';
import styles from './Card.module.scss';

const cx = classNames.bind(styles);

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onCardClick(this.props.package.name);
  }

  render() {
    const className = cx({
      card: true,
      active: this.props.active,
    });

    return (
      <button className={className} onClick={this.handleClick}>
        <div className={styles.cardcontent}>
          <h1 className={styles.cardtype}>Internet</h1>
          <h2 className={styles.cardtitle}>{this.props.package.name}</h2>
          <hr className={styles.cardruler} />
          <p><strong>{this.props.package.downloadSpeed}</strong> Mbit/s download</p>
          <p><strong>{this.props.package.uploadSpeed} </strong>Mbit/s upload</p>
          <p>Internetbeveiliging</p>
          <p>Gegarandeerd perfecte wifi</p>
        </div>
        <span className={styles.cardcircle} />
      </button>
    );
  }
}

export default Card;
