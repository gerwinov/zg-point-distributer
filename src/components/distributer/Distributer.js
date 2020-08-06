import React from 'react';
import ProgressBar from '../progressbar/ProgressBar'
import styles from './Distributer.module.scss';

class Distributer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pointsDistributed: 20
    };
  }

  render() {
    return (
      <div className={styles.distributer}>
        <p className={styles.description}>
          Door bij onderstaande categorie&euml;n aan te geven in hoeverre je hier gebruik van wilt maken kunnen we bepalen of dit pakket bij je past.
          Op basis van jouw antwoorden op onderstaande vragen verzamel je punten. <br />
          In ons <strong>{this.props.packageName}</strong> pakket kun je maximaal <strong>{this.props.points}</strong> gebruiken.
        </p>
        <ProgressBar max={this.props.points} value={this.state.pointsDistributed} />
      </div>
    );
  }
}

export default Distributer;
