import React from 'react';
import styles from './App.module.scss';
import packages from '../../globals/packages';
import Card from '../card/Card';
import Distributer from '../distributer/Distributer';
import Header from '../header/Header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setActiveCard = this.setActiveCard.bind(this);
    this.state = {
      activeCard: 'start'
    };
  }

  setActiveCard(name) {
    const packageId = name.toLowerCase();
    if (packages[packageId]) {
      this.setState({
        activeCard: packageId
      });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className={styles.app}>
          <div className={styles.packages}>
            <Card
              package={packages.start}
              active={this.state.activeCard === 'start'}
              onCardClick={this.setActiveCard} />
            <Card
              package={packages.complete}
              active={this.state.activeCard === 'complete'}
              onCardClick={this.setActiveCard} />
            <Card
              package={packages.max}
              active={this.state.activeCard === 'max'}
              onCardClick={this.setActiveCard} />
            <Card
              package={packages.giga}
              active={this.state.activeCard === 'giga'}
              onCardClick={this.setActiveCard} />
          </div>
          <Distributer
            points={packages[this.state.activeCard].points}
            packageName={packages[this.state.activeCard].name} />
        </div>
      </div>
    );
  }
}

export default App;