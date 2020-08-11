import React from 'react';
import styles from './Metric.module.scss';
import helpIcon from '../../assets/help.svg';
import Toast from '../toast/Toast';
import Slider from '../slider/Slider';

class Metric extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);

    this.state = {
      step: 0,
      showDescription: false
    };

    this.explanation = [
      'Nooit', 'Af en toe', 'Wekelijks', 'Dagelijks', 'Meerdere keren per dag', 'Constant'
    ];
  }

  handleInput(e) {
    this.setState({
      step: e.target.value
    });
    this.props.onInput(this.props.id, e.target.value);
  }

  toggleDescription() {
    const value = !this.state.showDescription;

    this.setState({
      showDescription: value
    });
  }

  render() {
    return (
      <div>
        <div className={styles.wrapper}>
          <img className={styles.image} src={this.props.icon} alt="icon" />
          <div className={styles.contentwrapper}>
            <label className={styles.label} htmlFor={`slider-${this.props.name}`}>
              <span>
                <strong>{this.props.name}</strong>
                <button className={styles.helpbutton} onClick={this.toggleDescription}>
                  <img className={styles.helpimage} src={helpIcon} alt="help" />
                </button>
              </span>
              <span>({`${this.explanation[this.state.step]} ${(this.props.max / 5) * this.state.step}`} punten)</span>
            </label>
            <Slider id={`slider-${this.props.name}`} name={`slider-${this.props.name}`} onChange={this.handleInput} />
          </div>
        </div>
        {this.state.showDescription &&
          <Toast message={this.props.description} triangleAbove onClose={this.toggleDescription} />
        }
      </div>
    );
  }
}

export default Metric;
