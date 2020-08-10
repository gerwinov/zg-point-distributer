import React from 'react';
import styles from './App.module.scss';
import packages from '../../globals/packages';
import Card from '../card/Card';
import Distributer from '../distributer/Distributer';
import Header from '../header/Header';
import Toast from '../toast/Toast';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setActiveCard = this.setActiveCard.bind(this);
    this.determinePackage = this.determinePackage.bind(this);
    this.clearToast = this.clearToast.bind(this);
    this.state = {
      activeCard: 'start',
      pointsDistributed: 0,
      toastMessage: ''
    };
  }

  setActiveCard(name) {
    const packageId = name.toLowerCase();
    if (packages[packageId]) {
      this.setState({
        activeCard: packageId
      });

      this.pointsWarning(packages[packageId].points, this.state.pointsDistributed);
    }
  }

  determinePackage(points) {
    this.pointsWarning(packages[this.state.activeCard].points, points);

    this.setState({
      pointsDistributed: points
    });
  }

  pointsWarning(packagePoints, distributedPoints) {
    // To do: set nextPackage based on Id after refactor of packages / cards.
    const nextPackage = 'Giga';
    if (packagePoints < distributedPoints) {
      this.setActiveCard(nextPackage);
      this.setState({
        toastMessage: `We hebben je pakket aangepast naar "${nextPackage}" zodat je genoeg punten hebt om te verdelen.`
      });
      return true;
    }
    return false;
  }

  clearToast() {
    this.setState({
      toastMessage: ''
    });
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
            packageName={packages[this.state.activeCard].name}
            pointsDistributed={this.state.pointsDistributed}
            onPointsUpdate={this.determinePackage} />
          <Toast message={this.state.toastMessage} onClose={this.clearToast} />
        </div>
      </div>
    );
  }
}

export default App;
