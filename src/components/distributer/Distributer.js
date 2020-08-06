import React from 'react';
import ProgressBar from '../progressbar/ProgressBar'
import Slider from '../slider/Slider'
import metrics from '../../globals/metrics';
import styles from './Distributer.module.scss';

class Distributer extends React.Component {
  constructor(props) {
    super(props);
    this.calculatePoints = this.calculatePoints.bind(this);

    this.state = {
      pointsDistributed: 0,
      pointsPerMetric: metrics.map((metrid) => metrid.name).reduce((acc, curr) => {
        acc[curr] = 0;
        return acc;
      }, {})
    };

    this.sliders = metrics.map((metric) =>
      <Slider
        key={metric.id}
        name={metric.name}
        description={metric.description}
        max={metric.points}
        onInput={this.calculatePoints} />
    );
  }

  calculatePoints(name, points) {
    const newPoinstPerMetric = {
      ...this.state.pointsPerMetric,
      [name]: points
    }

    this.setState({
      pointsPerMetric: newPoinstPerMetric,
      pointsDistributed: Object.values(newPoinstPerMetric).reduce((a, b) => a + b)
    });
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
        <div className={styles.sliders}>{this.sliders}</div>
      </div>
    );
  }
}

export default Distributer;
