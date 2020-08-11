import React from 'react';
import ProgressBar from '../progressbar/ProgressBar';
import RadioButton from '../radiobutton/RadioButton';
import Slider from '../slider/Slider';
import metrics from '../../globals/metrics';
import styles from './Distributer.module.scss';

import iconPeople1 from '../../assets/people-1.svg'
import iconPeople2 from '../../assets/people-2.svg'
import iconPeople3 from '../../assets/people-3.svg'
import iconPeople4 from '../../assets/people-4.svg'

import iconStream from '../../assets/streaming.png'
import iconGaming from '../../assets/gaming.png'

class Distributer extends React.Component {
  constructor(props) {
    super(props);
    this.calculatePoints = this.calculatePoints.bind(this);
    this.setPeopleAmount = this.setPeopleAmount.bind(this);
    this.setSteps = this.setSteps.bind(this);

    this.state = {
      stepsPerMetric: metrics.map((metrid) => metrid.id).reduce((acc, curr) => {
        acc[curr] = 0
        return acc;
      }, {}),
      amountOfPeople: 1
    };

    this.icons = [
      iconPeople1, iconPeople2, iconPeople3, iconPeople4
    ];

    this.sliderIcons = {
      streaming: iconStream,
      gaming: iconGaming
    }
  }

  setSteps(id, step) {
    const newStepsPerMetric = {
      ...this.state.stepsPerMetric,
      [id]: parseInt(step,10)
    };

    this.setState({
      stepsPerMetric: newStepsPerMetric,
    });

    this.calculatePoints(newStepsPerMetric, this.state.amountOfPeople);
  }

  calculatePoints(steps, people) {
    let total = 0;

    metrics.forEach((metric) => {
      total += (metric.points / 5) * (people * 0.5) * steps[metric.id]
    });

    this.props.onPointsUpdate(total);
  }

  setPeopleAmount(amount) {
    this.setState({
      amountOfPeople: amount
    });

    this.calculatePoints(this.state.stepsPerMetric, amount);
  }

  render() {
    const sliders = metrics.map((metric) =>
      <Slider
        key={metric.id}
        id={metric.id}
        name={metric.name}
        description={metric.description}
        max={metric.points * (this.state.amountOfPeople * 0.5)}
        icon={this.sliderIcons[metric.id]}
        onInput={this.setSteps} />
    );

    let radioButtons = [];
    for (let i = 0; i < 4; i++) {
      radioButtons.push(
        <RadioButton
          key={`radio-${i}`}
          name="people"
          value={i+1}
          displayValue={i === 3 ? `${i+1}+` : i+1}
          icon={this.icons[i]}
          checked={i+1 === this.state.amountOfPeople}
          onInput={this.setPeopleAmount} />
      )
    }

    return (
      <div className={styles.distributer}>
        <p className={styles.description}>
          Door bij onderstaande categorie&euml;n aan te geven in hoeverre je hier gebruik van wilt maken kunnen we bepalen of dit pakket bij je past.
          Op basis van jouw antwoorden op onderstaande vragen verzamel je punten. <br />
          In ons <strong>{this.props.packageName}</strong> pakket kun je maximaal <strong>{this.props.points}</strong> punten gebruiken.
        </p>
        <h2 className={styles.title}>Met hoeveel personen ben je thuis?</h2>
        <div className={styles.people}>
          {radioButtons}
        </div>
        <div className={styles.progress}>
          <ProgressBar max={this.props.points} value={this.props.pointsDistributed} />
        </div>
        <div className={styles.sliders}>
          <h1 className={styles.title}>Wat {this.state.amountOfPeople > 1 ? 'doen jullie' : 'doe je'} graag online?</h1>
          {sliders}
        </div>
      </div>
    );
  }
}

export default Distributer;
