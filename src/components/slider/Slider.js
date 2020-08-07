import React from 'react';
import styles from './Slider.module.scss';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);

    this.state = {
      step: 0
    };

    this.explanation = [
      'Dit wordt niet gebruikt', 'Dit wordt af en toe gebruikt', 'Dit wordt wekelijks gebruikt', 'Dit wordt dagelijks gebruikt', 'Dit wordt meerdere keren per dag gebruikt', 'Dit wordt constant gebruikt'
    ];
  }

  handleInput(e) {
    const newStep = e.target.value;

    const pointsPerStep = this.props.max / 5

    if ((newStep * pointsPerStep) - (this.state.step * pointsPerStep) > this.props.maxPossibleIncrease) {
      alert('hier een melding dat je beter het volgende pakket kunt nemen!')
      return;
    }

    this.setState({
      step: newStep
    });
    this.props.onInput(this.props.id, newStep);
  }

  render() {
    return (
      <div>
        <label htmlFor={`slider-${this.props.name}`}><strong>{this.props.name}</strong></label>
        <p className={styles.description}>{this.props.description}</p>
        Nooit (0 punten) <input
          type="range"
          id={`slider-${this.props.name}`}
          className={styles.slider}
          name={`slider-${this.props.name}`}
          min="0"
          max="5"
          step="1"
          defaultValue="0"
          onChange={this.handleInput} /> Elke dag ({this.props.max} punten)
          <span className={styles.explanation}>{this.explanation[this.state.step]}</span>
      </div>
    );
  }
}

export default Slider;
