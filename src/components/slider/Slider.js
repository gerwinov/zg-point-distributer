import React from 'react';
import styles from './Slider.module.scss';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);

    this.state = {
      value: 0
    };
  }

  handleInput(e) {
    const newValue = parseInt(e.target.value, 10);

    if (newValue - this.state.value > this.props.maxPossibleIncrease) {
      alert('hier een melding dat je beter het volgende pakket kunt nemen!')
      return;
    }

    this.setState({
      value: newValue
    });
    this.props.onInput(this.props.name, newValue);
  }

  render() {
    return (
      <div>
        <label htmlFor={`slider-${this.props.name}`}><strong>{this.props.name}</strong></label>
        <p className={styles.description}>{this.props.description}</p>
        0 <input
          type="range"
          id={`slider-${this.props.name}`}
          className={styles.slider}
          name={`slider-${this.props.name}`}
          min="0"
          max={this.props.max}
          step={this.props.max / 5}
          value={this.state.value}
          onChange={this.handleInput} /> {this.props.max}
      </div>
    );
  }
}

export default Slider;
